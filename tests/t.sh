#!/bin/bash

# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
# https://stackoverflow.com/questions/7665/how-to-resolve-symbolic-links-in-a-shell-script
# Move to the folder where this script lives (should be `**/tenko/tests/t.sh`)
cd "$( dirname $(realpath "${BASH_SOURCE[0]}") )" >/dev/null 2>&1
# Some recursive calls assume to be in project root. This makes it work when not called from there (like npm .bin/tenko)
cd ..

# Can override this through `--node-bin path/here`
# I need to override this path when calling `./t p` through `sudo` for perf (`cset` & `chrt`), which mandate root.
NODE_BIN=$(which node) # This may exit non-zero. That's fine.

set -e # Exit on error

ACTION=''
ARG=''
MODE=''
PARSER=''               # See PARSER_NAME, this is the `--parser` prefixed version for teeing
PARSER_NAME='tenko'     # For `./t p6 --parser foo`. Use `all` to cycle all parsers, or one of tenko, acorn, babel, meriy, ghost
INPUT_FILE_ARG=''       # ./t p6 --input-file foo/bar.js --input-mode web
INPUT_MODE_ARG=''       # For `./t p6 --input-mode foo`, one of: sloppy strict module web
OUTPUT_FILE_ARG=''      # For `./t p6 --output-file foo`, this is where results are written to
ACORN=''
BABEL=''
EXTRA=''
ES=''
NODE=''
ANNEXB=''
BUILD=''
NO_BUILDING=''
PSFIX=''
HF=''
NOCOMP=''
NOAST=''
MINIFY=''
NO_MANGLE=''
INSPECT=''
DEVTOOLS=''
PRETTIER=''
PERFONE=''
RESET=''
RECORD=''
NATIVESYMBOLS=''
MAX_ARG=''
NODE_PROF=''            # For --node-prof, generates a flame chart using nodejs builtins
ORG_ARGS="${@}"         # This is used to restart this process with cset for cpu shielding and at RT priority (=> sudo)
STABLE=''               # Used with `./t stable`, `./t ??? --stable`, and `./t ??? --stabled`
STABLE_ONLY_SETUP=''    # Used with `./t stable` (so not as flag)
STABLE_NO_SETUP=''      # Used with `./t ??? --stabled`, which skips the setup (still need to restart in `cset` and `crt`)
WRITE_ONLY=''           # Used in `./t coverag` to prevent generating and opening the html
EXPOSE_SCOPE=''         # Add scopes to AST

BOLD="\e[;1;1m";
BOLD_RED="\e[1;31m";
BOLD_GREEN="\e[1;32m";
DIM="\e[30;1m";
RED="\e[31m";
GREEN="\e[32m";
DIM_ORANGE="\e[0;31m"
NOCOLOR="\e[0m"

ARROW_UP='▲'
ARROW_DOWN='▼'

if [[ $# = 0 ]]; then
  ./t --help
  exit $!
fi

while [[ $# > 0 ]] ; do
  case "$1" in
    --help)
        echo "
Tenko CLI Toolkit help:

 Shortcuts for common tools I use to work on Tenko.
 Note that tests or anything depending on node_modules will not work on an npm checkout, that'd need a git clone.

 i <code>      Run test with custom input. Runs sloppy and sloppy webcompat by default. (stdin not supported)
 f <path>      Run a specific .md parser test file (the a/ b/ \"diff\" prefix is checked)
 F <path>      Run a specific file and consider its entire contents to be test input
 g             Regenerate _all_ auto generated files
 G             Autogenerate only files that don't already exist
 u             Run all test files and just write output
 U             Run all test files and force write output (ignores ASSERT failures)
 m             Run all tests and ask for update one-by-one
 n             Run all tests, don't generate new test files or write anything (for coverage)
 s             Search for needles (call \`HIT()\` or \`HITS()\` to place a needle and report all tests that hit them)
 t             Run test262 suite (only). Assumes repo is cloned to \`./ignore/test262\`
 T <path>      Run specified test262 file only (path relative to root, so \`./t T ignore/test262/...\`
 a             Alias for ./t m --test-acorn, to verify Tenko output against the Acorn AST
 b             Alias for ./t m --test-babel, to verify Tenko output against the Babel AST
 fu <path>     This is \`./t m\` for one file
 fuzz          Run fuzzer
 hf            Log stats through HeatFiler (private wip), can be used in conjunction with almost anything
 p             [Deprecated: use p6 for proper stable benchmarking.] Run benchmarks (everything in same node instance)
 p6            Tightly controlled benchmarking tool. Run target parser against target input for n times and report stats.
 z             Create build
 tb            Test build (checks whether exports work as intended for parameters etc)
 devtools      Alias for \`./t p --inspect --devtools --build\` which can be used to debug the parser in chrome devtools
 c8            Run c8 on \`./t u\` to get test code coverage. Generates text and html output, runs server to view html.
 coverage      Alias for c8
 deoptigate    Run deoptigate (see doptie.js for file config)
 --sloppy      Enable sloppy script mode, do not auto-enable other modes
 --strict      Enable strict script mode, do not auto-enable other modes
 --module      Enable module goal mode, do not auto-enable other modes
 --annexb      Enable the syntax extensions under Annex B, regardless of mode
 --web         Alias for --sloppy and --web
 --min         Only for f and i, for invalid input; minify the test case while keeping same error
 --min-printer Only for f and i, for inputs that cause bad printer behavior; minify the test case while keeping same error
 --no-printer  Do not run the printer-step (helps with debugging in certain cases)
 --scope       Add the scope objects that the parser generates as \`.\$scope\` property to any AST node that created one
 --parser <ab> Run test with given parser (any of 'tenko', 'acorn', 'babel', 'ghost'). Only for selected commands.
 --acorn       Run in Acorn compat mode
 --test-acorn  Also compare AST of test cases to Acorn output
 --babel       Run in Babel compat mode
 --test-babel  Also compare AST of test cases to Babel output
 --no-fatals   Do not abort test run for (test) any assertion errors
 --node        Fuzzer: compare pass/fail to node by creating a new function and checking if it throws
 --consise     Do not dump AST and printer output to stdout. Only works with -i or -f (or anything that uses those)
 --build       Use the build (./t z) instead of dev sources for Tenko in this call
 --nb          Don't actually create a build for cases where this otherwise would happen (prevents sudo trouble :)
 --no-compat   For \`z\`; Replace the compat flags for Acorn and Babel to \`false\` so the minifier eliminates the dead code
 --no-ast      For \`z\`; Strip all AST code when creating a build
 --minify      For \`z\`; Run Terser (minifier) on build output (warning: this can significantly degrade performance)
 --no-mangle   For \`z\`; Run Terser but tell it not to mangle identifiers (use together with \`--pretty\`)
 --pretty      For \`z\`; Run prettier on the build afterwards
 --native-symbols For \`z\`; Special build step turns \`PERF_\$\` prefixed functions into \`%\` to enable v8 internal functions.
 --inspect     Run with \`node --inspect\` to debug node in the chrome devtools. Use this if you don't want chrome to pause
 --inspect-brk Run with \`node --inspect-brk\` to debug node in the chrome devtools. Use this to pause devtools before running
 --devtools    Call \`console.profile()\` before and after the core parse step (not all actions support this)
 --reset       For perf, force resets baseline to whatever the current result
 --record      For perf, updates baseline if better
 --node-bin <path> Specify the path to the node binary to run, defaults to the answer of \`which node\`
 --concise     Just parse and exit. No post processing, printing, or anything else.
 --node-prof   Calls nodejs with \`--prof\` and generates a flamechart afterwards with \`npx pflames\`. Only for selected commands.
 --stable      Requires sudo! For benchmarking, try to setup a stable environment by disabling cpu turbo, RT prio, and cpu shielding on 1,2,3 (works on my machine, ymmv)
 --max n       Max number of iterations for \`./t p6\` (per parser per input). Default is 100.
 --input-file <path>   For p6, this overrides the test file to benchmark
 --input-mde <mode>    For p6, this tells the parser in what mode to parse the input file (sloppy, strict, module, web)
 --output-file <path>  For p6, this is where the report is written
 --write-only  For code coverage, just update the COVERAGE.md file, don't open the html in a browser
 6 ... 11      Parse according to the rules of this particular version of the spec
        "
      exit
      ;;

    i)
      # Custom input
      ACTION='-i'
      shift
      ARG=$1
      ;;
    f)
      # Target specific md test file
      ACTION='-f'
      shift
      ARG=$1

      # I frequently get file names from git diff, which prefixes the paths with a/ and b/ so this fixed that problem :)
      echo "Checking input file ${ARG}"
      if [[ ! -f "${ARG}" && ( "${ARG}" == a/* || "${ARG}" == b/* ) && -f "${ARG:2}" ]]; then
        ARG="${ARG:2}"
        echo "Assuming the file name is prefixed with a/ or b/ from a git diff, slicing off the first two chars"
        echo "Will use input file: ${ARG}"
      fi
      ;;
    F)
      # Use (entire) contents of given file as input
      ACTION='-F'
      shift
      ARG=$1
      ;;
    g)
      # Regenerate anything from autogen files
      ACTION='-g'
      ;;
    G)
      # Regenerate only new files from autogen files
      ACTION='-G'
      ;;
    u)
      # Update all test files with their current output (fast)
      ACTION='-u'
      ;;
    U)
      # Force update all test files with their current output
      ACTION='-u --force-write'
      ;;
    m)
      # Run all files and ask for any test case that needs updating (slower)
      ACTION='-q -U'
      ;;
    n)
      # Just run all tests, no error reporting, no writing (used for code coverage)
      ACTION='-q -n'
      ;;
    s)
      # Add `HIT()` to zeparser src and this will report all inputs that trigger that call in a very concise list
      if [[ "${ACTION}" = "" ]]; then
          ACTION='-s'
      fi
      EXTRA='-s'
      ;;
    fu)
      # Update all test files with their current output (fast)
      ACTION='-U -f'
      shift
      ARG=$1
      ;;
    t)
      # Run all test262 tests
      ACTION='test262'
      ;;
    T)
      # Run one test262 test
      ACTION='test262'
      shift
      ARG=$1
      ;;
    fuzz)
      # Run the fuzzer
      ACTION='fuzz'
      ;;
    hf)
      # Run in HeatFiler
      HF='yes'
      ACTION='hf'
      ;;
    a)
      # Alias for `m --test-acorn` because I'm lazy
      if [[ "${ACTION}" = "" ]]; then
          ACTION='-q -U'
      fi
      ACORN='--test-acorn'
      ;;
    b)
      # Alias for `m --test-acorn` because I'm lazy
      if [[ "${ACTION}" = "" ]]; then
          ACTION='-q -U'
      fi
      BABEL='--test-babel'
      ;;
    z)
      # Calls the build script
      ACTION='build'
      ;;
    tb)
      ACTION='test-build'
      ;;
    p)
      ACTION='perf'
      ;;
    p6)
      ACTION='perf6'
      ;;
    c8);&
    coverage):
      ACTION='coverage'
      ;;
    d);&
    deoptigate)
      ACTION='doptigate'
      ;;
    devtools)
      # ./t p --inspect --devtools --build
      ACTION='perf'
      INSPECT_NODE='--inspect'
      INSPECT_ZEPAR='--devtools'
      DEVTOOLS='--devtools'
      BUILD='-b'
    ;;
    stable)
      # Setup the stabilization and exit
      echo 'Stabalizing system. Run `./t ??? -stabled` after this completes.'
      STABLE='--stable'
      STABLE_ONLY_SETUP='yes'
      ;;

    --sloppy)       MODE='--sloppy'       ;;
    --strict)       MODE='--strict'       ;;
    --module)       MODE='--module'       ;;
    --annexb)       ANNEXB='--annexb'     ;;
    --force-web)    ANNEXB='--annexb'     ;; # Already added this new before realizing the functionality already existed
    --web)          MODE='--web'          ;;
    --acorn)        ACORN='--acorn'       ;;
    --test-acorn)   ACORN='--test-acorn'  ;;
    --babel)        BABEL='--babel'       ;;
    --test-babel)   BABEL='--test-babel'  ;;
    --min)          EXTRA='--min'         ;;
    --min-printer)  EXTRA='--min-printer' ;;
    --no-printer)   EXTRA='--no-printer'  ;;
    --scope)        EXPOSE_SCOPE='--expose-scope';;
    --no-fatals)    EXTRA='--no-fatals'   ;;
    --concise)      EXTRA='--concise'     ;;
    -q)             EXTRA='-q'            ;;
    -b);&
    --build)        BUILD='-b'            ;;
    --nb)           NO_BUILDING='--nb'    ;;
    --no-compat)    NOCOMP='--no-compat'  ;;
    --no-ast)       NOAST='--no-ast'      ;;
    --minify)       MINIFY='--min'        ;;
    --no-mangle)    NO_MANGLE='--no-mangle' ;;
    --pretty)       PRETTIER='yes'        ;;
    --prettier)     PRETTIER='yes'        ;;
    --native-symbols) NATIVESYMBOLS='--native-symbols' ;;
    --reset)        RESET='--reset'       ;;
    --record)       RECORD='--record'     ;;
    --track)        RECORD='--record'     ;; # Clearly I picked a bad name if I can't remember it myself
    --prefix)
        PSFIX='--prefix'
        shift
        ARG=$1
        ;;
    --suffix)
        PSFIX='--suffix'
        shift
        ARG=$1
        ;;
    --inspect)
        INSPECT_NODE='--inspect'
        INSPECT_ZEPAR='--devtools'
        ;;
    --inspect-brk)
        INSPECT_NODE='--inspect-brk'
        INSPECT_ZEPAR='--devtools'
        ;;
    --devtools)
        DEVTOOLS='--devtools' ;;
    --node-bin)
        shift
        NODE_BIN=$1
        echo "Using '${NODE_BIN}' as node binary"
        ;;
    --parser)
        shift
        PARSER="--parser $1"
        PARSER_NAME=$1
        echo "Using '${PARSER}' where supported"
        ;;
    --max)
        shift
        MAX_ARG=$1
        echo "Force stopping after ${MAX_ARG} iterations"
        ;;
    --node-prof)
      # ht https://twitter.com/bengl/status/1147244698496425984
      if [[ -f v8.log ]]; then
        rm v8.log
      fi
      NODE_PROF='--prof --no-logfile-per-isolate' # Dumps profile info to predictable v8.log, rather than some random isolate-0x48f1e00-9432-v8.log file
      # To be continued ...
      ;;
    --stable)
      echo 'Will stabilize system once and tear that down after running it. You can run `./t stable` and then `./t ??? --stabled` for a permanent setup.';
      STABLE='1'
      ;;
    --stable-recur)
      # This arg should be set by this script when using --stable and prevents infinite loop.
      # It should appear after the --stable flag and would then reset the STABLE var
      STABLE=''
      ;;
    --stabled)
      echo 'Assuming the system is stable (`./t stable`), will run ./t in shielded RT mode';
      STABLE='1'
      STABLE_NO_SETUP='1'
      ;;
    --input-file)
      shift
      INPUT_FILE_ARG=$1
      ;;
    --input-mode)
      shift
      INPUT_MODE_ARG=$1
      ;;
    --output-file)
      shift
      OUTPUT_FILE_ARG=$1
    ;;
    --write-only)
      WRITE_ONLY='yes'
      ;;

    6)  ES='--es6'  ;;
    7)  ES='--es7'  ;;
    8)  ES='--es8'  ;;
    9)  ES='--es9'  ;;
    10) ES='--es10' ;;
    11) ES='--es11' ;;

    # special flags for fuzzer

    --node)
      NODE='--node'
      ;;

    *)
      echo "t: Unsupported action or option... \`$1\` Use --help for options"
      exit 1
      ;;
  esac
  shift
done

# Confirm node version is 12+ because the `import`/`export` syntax was not supported before
if [[ "$("${NODE_BIN}" --version | sed 's/[^0-9]*\([0-9]\+\).*/\1/')" -lt "12" ]]; then
  echo "
Tenko CLI Toolkit:

  Error: Using NodeJS version $(node --version)

  The Tenko CLI toolkit requires NodeJS 12+ because it uses ESM (import/export) without Babel.

  You can supply a custom node binary through the arg (\`./t --node-bin ~/.nvm/versions/node/v12.14.1/bin/node i 'x'\`)
  "
  exit 1
fi

#    ██╗    ██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗██████╗     ██╗
#   ██╔╝    ██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝██╔══██╗    ╚██╗
#  ██╔╝     ██║  ██║███████║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝     ╚██╗
#  ╚██╗     ██║  ██║██╔══██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗     ██╔╝
#   ╚██╗    ██████╔╝██║  ██║██║ ╚████║╚██████╔╝███████╗██║  ██║    ██╔╝
#    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝
# The "stable" script attempts to stabilize a (ubuntu) Intel linux system by disabling stuff,
# remapping irqs, shielding off cpus, disabling logical cpu cores, running the benchmark thread in
# real-time priority, disabling cpu/power scaling, etc. It works on MY MACHINE. It may SCREW WITH
# YOUR MACHINE. It shouldn't damage it and all the settings applied by this script should be gone
# after a reboot, but you never know. DO NOT just run this without carefully checking
# whether you can at all. DO NOT run this without being okay with a forced reboot for some reason.
# I run this on a dedicated throw-away (sort of) benchmark machine. If it dies, I don't care. You might!
# That said, your hardware should be fine. I might be a little worried about unsaved state of docs / apps.
# (ht http://patorjk.com/software/taag/ for the ascii art, this is "ANSI Shadow")

if [[ ! -z "${STABLE}" && -z "${STABLE_NO_SETUP}" ]]; then

  # This part will attempt to stabilize a ubuntu intel linux system by reserving three physical cores
  # and turning off 3 logical cores and disabling a bunch of stuff that causes variation in benchmarks.
  # These settings are not permanent and should reset after a reboot. I give zero guarantees about that.

  # It will use sudo to execute commands that require root so you may be prompted for sudo access :)

  # Well, technically we only need to know whether we _can_ sudo, not whether we are.
  #  if [[ $EUID > 0 ]]; then
  #    echo "The --stable mode requires root as it changes cpu / system level settings"
  #    exit 1
  #  fi

  # This path will assume an intel octo core (with 4 physical and 4 logical cores)
  # It will ultimately "shield" cpu cores 1-2-3 (offset 0) using "cset" and disable
  # hyper threaded sibling cores 5-6-7. It will restart the same command with RT
  # priority. On exit it should undo these steps (Note: that's not necessarily
  # "restore", it just applies the inverse)

  # Note: in my dedicated benchmark machine I have additional things setup which can not be done at runtime
  # These are boot parameters set in grub
  # - isolcpus=1,2,3           (Prevents interuptions, confirm with `cat /sys/devices/system/cpu/isolated`)
  # - rcu_nocbs=1,2,3          (Prevent certain interupts)
  # - intel_pstate=disable     (Force disable ghz scaling of the cpu, uses acpi cpu driver)

  # Note on NOHZ_FULL
  # This mode which prevents task switcher on our target cpus.
  # Confirm if enabled with `cat /sys/devices/system/cpu/nohz_full`
  # https://pyperf.readthedocs.io/en/latest/system.html
  # > The intel_pstate drive is incompatible with nohz_full
  # But we can disable pstate through a boot option, potentially
  # It won't work in ubuntu out of the box anyways. We'd have to recompile the kernel
  # - nohz_full=1,2,3          (Won't work on Ubuntu out without manual recompiling of kernel. Sets nohz mode,

  # We are not disabling ASLR because that effect is unpredictable, se https://vstinner.github.io/journey-to-stable-benchmark-average.html
  # Verify: `/proc/sys/kernel/randomize_va_space` should be `2`

  # https://unix.stackexchange.com/questions/349908/how-to-get-all-processes-running-on-each-cpu-core-in-ubuntu

  # Set cpu affinity for systemd:
  # https://raspberrypi.stackexchange.com/questions/27832/rpi-2-unable-to-change-irq-affinity
  # Update `sudo nano /etc/systemd/system.conf` and find the cpu affinity line, uncomment it and set it to 0
  # While you may be able t restart some service, I just rebooted for effect.

  if [[ -z "${STABLE_ONLY_SETUP}" ]]; then
    set -x
    trap "
      echo 'Tearing down the --stable config';
      # Disable clockspeed scaling (cpu will run at variable ghz)
      sudo su -c 'echo 0 > /sys/devices/system/cpu/intel_pstate/no_turbo';
#      # Restore access control of low level telemetry while running this benchmark
#      sudo su -c 'echo 3 > /proc/sys/kernel/perf_event_paranoid';

      # Turn the cores back on :)
      sudo su -c \"echo 1 > /sys/devices/system/cpu/cpu5/online\" || true
      sudo su -c \"echo 1 > /sys/devices/system/cpu/cpu6/online\" || true
      sudo su -c \"echo 1 > /sys/devices/system/cpu/cpu7/online\" || true
      # Turn boost back on
      sudo su -c 'echo 1 > /sys/devices/system/cpu/cpufreq/boost' || true
      sudo wrmsr --all 0x1a0 0x850089 || true
      # Restore swappiness. The default is 60 on my (and most?) systems so just setting it to 60...
      sudo sysctl -w vm.swappiness=0
      # Drop the cpu shield
      sudo cset shield -r;
      echo 'System should be normal again. What is, normal, anyways.';
      echo -e '\nThe end.';
    " EXIT
    set +x
  fi

  #  # Allow access to low level telemetry while running this benchmark
  #  sudo su -c "echo -1 > /proc/sys/kernel/perf_event_paranoid"

  # Disable clockspeed scaling (cpu will run at fixed ghz)
  # (Should be redundant with intel_pstats=disable)
  sudo su -c "echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo" || true

  # "My" intel octo core is hypoerthreaded and since I want to work on core 1-3, I want to disable 5-7
  # ... But on my dedicated machine these sibling cores don't even exist anymore :)
  sudo su -c "echo 0 > /sys/devices/system/cpu/cpu5/online" || true
  sudo su -c "echo 0 > /sys/devices/system/cpu/cpu6/online" || true
  sudo su -c "echo 0 > /sys/devices/system/cpu/cpu7/online" || true

  # Do not scale down cpu freq to save power. Run at a fixed hz
  # Assert this is enabled by `watch grep \"cpu MHz\" /proc/cpuinfo`. It should show a nearly fixed value these cores
  sudo su -c "echo 'performance' > /sys/devices/system/cpu/cpu1/cpufreq/scaling_governor" || true
  sudo su -c "echo 'performance' > /sys/devices/system/cpu/cpu2/cpufreq/scaling_governor" || true
  sudo su -c "echo 'performance' > /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor" || true

  # Disable "intel boost". Source: https://gist.github.com/Dieterbe/a52c95a9603507670eb39274544ee1a8
  # (Should be redundant with intel_pstats=disable)
  # https://www.kernel.org/doc/html/v4.14/admin-guide/pm/cpufreq.html#the-boost-file-in-sysfs
  # > This file is located under /sys/devices/system/cpu/cpufreq/ and controls the “boost” setting for the whole system. It is not present if the underlying scaling driver does not support the frequency boost mechanism (or supports it, but provides a driver-specific interface for controlling it, like intel_pstate).
  # https://askubuntu.com/questions/619875/disabling-intel-turbo-boost-in-ubuntu/620114#comment876189_619879
  # > if the frequency scaling driver is acpi-cpufreq
  sudo su -c "echo 0 > /sys/devices/system/cpu/cpufreq/boost" || true
  # From https://askubuntu.com/questions/619875/disabling-intel-turbo-boost-in-ubuntu/620114
  # This requires `apt-get install msr-tools` and `sudo modprobe msr`
  # Read the status:
  #  sudo rdmsr -p1 0x1a0 -f 38:38
  #  sudo rdmsr -p2 0x1a0 -f 38:38
  #  sudo rdmsr -p3 0x1a0 -f 38:38
  # This is the way to do it if the above is not the way. Not sure how to do it with files in this case
  sudo modprobe msr # I have to do this. Can probably just enable this on boot or smth
  # Now disable boost on 1, 2, 3
  sudo wrmsr -p1 0x1a0 0x4000850089
  sudo wrmsr -p2 0x1a0 0x4000850089
  sudo wrmsr -p3 0x1a0 0x4000850089

  # Disable swappiness (unlikely to be relevant for us but meh). Default is 60 (for my system), 0 is off.
  # https://linuxhint.com/understanding_vm_swappiness/
  sudo sysctl -w vm.swappiness=0

  # Disable all swapping (I have enough RAM)
  sudo swapoff -a

  # Flush and the write caches
  sync;
  sudo sysctl vm.drop_caches=1

  # Set irc affinity
  # The config for irqbalancer should be updated (/etc/default/irqbalance) to have `IRQBALANCE_BANNED_CPUS=e`, which is
  # a bitwise mask which should have 1 for each cpu disabled. In this case we use 11111110 which is 0xe.
  # Additionally we can try to update all the irc affinities to cpu 0. It won't work for every irq :(
  for x in $(find /proc/irq/ -name smp_affinity) ; do
    sudo sh -c "echo 0 > $x" || true;
  done
  sudo service irqbalance stop
  source /etc/default/irqbalance
  sudo service irqbalance start
  # Get a quick overview through: `find /proc/irq/ -name smp_affinity | xargs cat`
  # See up-to-date (cummulative) irq stats: `watch -n1 -d "cat /proc/interrupts"`
  # In my case, the NMI, LOC, IWI, RES, CA, and TLB irqs are still firing on that cpu. Perhaps due to my benchmark io?

  # Allocate physical cores for nodejs, "shielding" it from anything else. The first core is the OS "housekeeping" core.
  # This works fairly generically, but even more so on a headless dedicated machine
  # All children of this process (including spawned by nodejs) should stay on these shielded cores.
  sudo cset shield -r || true; # Just in case.
  sudo cset shield --cpu=1,2,3 -k on

  # Move all RCU tasks to the first core. This step should be redundant
  for i in `pgrep rcu` ; do
    sudo taskset -pc 0 $i || true;
  done

  # From https://webcache.googleusercontent.com/search?q=cache:XjmvsH4FOnYJ:https://jeremyeder.com/2013/11/15/nohz_fullgodmode/+&cd=1&hl=en&ct=clnk&gl=nl
  # > To get rid of the xfs_log_worker interference, you can use the tunable workqueues feature of the kernel’s bdi-flush writeback threads
  # Use `mpstat -P 0,1,2,3 1` to track cpu congestion, just in case. Fine on my benchmark machine.
  sudo sh -c "echo 1 > /sys/bus/workqueue/devices/writeback/cpumask"

  if [[ ! -z "${STABLE_ONLY_SETUP}" ]]; then
    echo 'Setup complete. System _should_ be stable now. Run `./t` with `--stabled` to skip this setup part. You will need to reboot to reset this state.';
    exit 0;
  fi

  # Wait a second for most processes to move out
  sleep 1;
fi

if [[ ! -z "${STABLE}" ]]; then
  # Invoke the same command but force it into the shield
  # Have to pass on the node binary as otherwise it'll be different in sudo (-> nvm). This arg propagates throughout ./t
  # Pass on --stable-recur to prevent applying --stable over and over again (easier than removing the arg from the list)
  echo "###### Restarting ./t in shielded RT mode now"
  # `cset` locks the process to the shielded cpus while `chrt` puts the priority of the root process in RT (utmost highest)
  sudo cset shield --exec -- chrt --rr 99 sh -c "./t --node-bin ${NODE_BIN} ${ORG_ARGS} --stable-recur"
  XIT=$?
  echo "###### End of shielded ./t"

  # This _should_ use the same exit code as the ./t above ...
  exit ${XIT}
fi

#    ██╗        ██╗    ██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗██████╗     ██╗
#   ██╔╝       ██╔╝    ██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝██╔══██╗    ╚██╗
#  ██╔╝       ██╔╝     ██║  ██║███████║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝     ╚██╗
#  ╚██╗      ██╔╝      ██║  ██║██╔══██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗     ██╔╝
#   ╚██╗    ██╔╝       ██████╔╝██║  ██║██║ ╚████║╚██████╔╝███████╗██║  ██║    ██╔╝
#    ╚═╝    ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝

HFPID=''
if [[ "${HF}" = "yes" ]]; then
    # Note: the build is self-hosted so we should start this before transforming with HF. Use actual dev source with --nb
    if [[ ! -z "${BUILD}" ]] || [[ ! -z "${NO_BUILDING}" ]]; then
      echo "Running on build"
      set -x

      if [[ -z "${NO_BUILDING}" ]]; then
        echo "Creating pretty build without compat code and without minification"
        ./t z --no-compat --pretty ${NATIVESYMBOLS} ${NOAST} ${MINIFY} ${NO_MANGLE} --node-bin ${NODE_BIN}
      fi

      # Transform the build file inline
      ${NODE_BIN} --experimental-modules ../heatfiler/bin/cli.mjs --file ../tenko/build/tenko.prod.mjs --inline --post-node --interval-sync 1000000
    else
      echo "Running on src"
      HAS_SRC_CHANGES=$(git diff src)
      if [[ ! -z "${HAS_SRC_CHANGES}" ]]; then
          git status -s src
          echo 'There are changes pending to ./src, please commit/stash them first. Exiting now.';
          exit 1;
      fi

      set -x

      # Transform the code inline (rely on git to restore it)
      ${NODE_BIN} --experimental-modules ../heatfiler/bin/cli.mjs --dir ../tenko/src --inline --post-node --interval-sync 1000000
    fi

    # Start the HF server which accepts stats, serves stats, and serves the HF UI as a tiny webserver
    ${NODE_BIN} --experimental-modules ../heatfiler/bin/cli.mjs --serve --shhh &

    # Get pid of server, it should be running in the background and we want to kill it when this script exits
    HFPID=$!

    set +x

    trap "echo '###### HF killing server #####'; kill ${HFPID}" SIGINT SIGTERM EXIT

    xdg-open http://localhost:3000/index.html || open http://localhost:3000/index.html || start http://localhost:3000/index.html

    echo '###### HF setup complete #####'
fi

set -x

case "${ACTION}" in
    test262)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules tests/test262.mjs -f "${ARG}" ${ACORN} ${BABEL} ${ANNEXB} ${BUILD} ${INSPECT_ZEPAR}
    ;;

    fuzz)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/fuzz.mjs ${EXTRA} ${EXPOSE_SCOPE} ${NODE} ${ANNEXB} ${BUILD} ${PSFIX} "${ARG}" ${INSPECT_ZEPAR}
    ;;

    build)
      mkdir -p build
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules cli/build.mjs ${NOCOMP} ${NOAST} ${MINIFY} ${INSPECT_ZEPAR} ${NATIVESYMBOLS}
      if [[ ! -z "${PRETTIER}" ]]; then
          node_modules/.bin/prettier build/tenko.prod.mjs --write
          node_modules/.bin/prettier build/tenko.prod.js --write
      fi
    ;;

    test-build)
      if [[ -z "${NO_BUILDING}" ]]; then
        ./t z --node-bin ${NODE_BIN} ${MINIFY} ${NO_MANGLE}
      fi
      ${NODE_BIN} --experimental-modules --max-old-space-size=8192 tests/build.mjs ${ANNEXB}
      ;;

    perf6)
      # This will run a parser against an input for a fixed amount of times and reports the stats
      # All stats housekeeping is done in this bash script, rather than in nodejs. This helps to
      # stabilize the benchmarking process (which says a lot about nodejs).
      # Unfortunately bash only supports basic integer math so we have to shell out to `bc` for various
      # things. Ultimately the idea is to keep the nodejs overhead as light as possible and handle all
      # the benchmarking meta stuff from this script.
      # That's not a big deal as I'm assuming p6 runs on a dedicated machine with dedicated cores.
      # You can control the parser, input file/mode, output file, and loop counter through `./t` flags.

      set +x;

      if [[ -z "${NO_BUILDING}" && "${PARSER_NAME}" = "tenko" ]]; then
        ./t z --node-bin ${NODE_BIN} --no-compat ${MINIFY} ${NO_MANGLE}
      fi

      # Setup for if we want to compare a build of Tenko to the current build
      # (The idea is that you build master, supply it as a param, and take the current build in /build
      # and start benchmarking one after the other in repeat while tracking and comparing the results)

      # Note: paths are relative to tenko/ignore/ because the generated template is written and run from there
      declare -A PARSERS # This required for associative arrays in bash (otherwise it won't do what you expect it to)
      PARSERS=(
        [tenko]='../tests/run_tenko_build.mjs' # This is the default :)
        [acorn]='../tests/run_acorn.mjs'
        [babel]='../tests/run_babel.mjs'
        [ghost]='../tests/run_ghost.mjs'
        [meriy]='../tests/run_meriyah.mjs'
      )

      COMPARE_MODE=''

      if [[ "${PARSER_NAME}" == "all" ]]; then
        echo -e "Using ${BOLD}all${NOCOLOR} parsers"
      elif [[ "${PARSER_NAME}" == ignore/* ]]; then
        BACKUP_NAME_FOR_PRINT=$PARSER_NAME
        # Assuming this is a build of Tenko that we want to compare against the build in the regular build/ location
        TENKO=${PARSERS[tenko]}
        PARSERS=(
          [custom]="./${PARSER_NAME:7}" # slice off the `ignore/` prefix because the generated script imports from that folder
          [tenko]=${TENKO}
        )
        COMPARE_MODE='1'
        OUTPUT_FILE_COMPARE="/tmp/tenko.p6.compare.log"
        echo "Start" > ${OUTPUT_FILE_COMPARE}
        echo "Comparing a custom build of Tenko (presumably) in ${PARSERS[custom]} to the current build in ${PARSERS[tenko]}";
      else
        echo "Checking for parser=${PARSER_NAME}"
        PARSER_PATH=${PARSERS[$PARSER_NAME]}
        if [[ -z "${PARSERS[$PARSER_NAME]}" ]]; then
          # TODO: auto build Tenko from commit hash
          echo "Unknown parser: ${PARSER_NAME}. Known parsers: ${!PARSERS[@]}"
          exit 1
        fi
        echo "Using ${PARSER_NAME} @ ${PARSER_PATH}"
        PARSERS=(
          [${PARSER_NAME}]=${PARSER_PATH}
        )
      fi

      INPUT_PATHS=()
      INPUT_MODES=()

      # Sanity test and quick overhead baseline check.
      INPUT_PATHS+=( 'ignore/perf/es6.tiny.js' )
      INPUT_MODES+=( 'module' )

      # Large js file rom fb (es3, public minified build output, 3+ y/o)
      INPUT_PATHS+=( 'ignore/perf/es3.fb.newsfeed.min.js' )
      INPUT_MODES+=( 'web' )

      # All js1k demos dumped into one file. This might actually contain some es6 ...
      INPUT_PATHS+=( 'ignore/perf/es5.js1k.js' )
      INPUT_MODES+=( 'web' )

      # From babel repo
      INPUT_PATHS+=( 'ignore/perf/es6.material-ui-core.js' )
      INPUT_MODES+=( 'web' )
      INPUT_PATHS+=( 'ignore/perf/es6.angular-compiler.js' )
      INPUT_MODES+=( 'module' )

      # Random
      INPUT_PATHS+=( 'ignore/perf/es5.moment-with-locales.js' )
      INPUT_MODES+=( 'web' )
      INPUT_PATHS+=( 'ignore/perf/es6.mljs.js' )
      INPUT_MODES+=( 'module' )

      # Specific regex test case (testing unicode escapes in regex)
      INPUT_PATHS+=( 'ignore/perf/es5.5mb.node-unicode-data-regexes.js' )            # (concat of all regexes generated by node-unicode-data)
      INPUT_MODES+=( 'module' )
      INPUT_PATHS+=( 'ignore/perf/es5.5mb.node-unicode-data-regexes-noclass.js' )    # (same except all `[` are removed which promotes all escapes to atoms)
      INPUT_MODES+=( 'module' )
      INPUT_PATHS+=( 'ignore/perf/es6.5mb.node-unicode-data-regexes.js' )            # (same except replaced unicode quad with unicode variables)
      INPUT_MODES+=( 'module' )
      INPUT_PATHS+=( 'ignore/perf/es5.5mb.node-unicode-data-regexes-as-strings.js' ) # (same except replaced regexes with strings)
      INPUT_MODES+=( 'web' )
      INPUT_PATHS+=( 'ignore/perf/es6.5mb.node-unicode-data-regexes-as-templates.js' ) # (same except replaced regexes with templates)
      INPUT_MODES+=( 'web' )

      # Old huge zeparser2 benchmarks
      INPUT_PATHS+=( 'ignore/perf/es5.8mb-bench.js' )
      INPUT_MODES+=( 'web' )
      INPUT_PATHS+=( 'ignore/perf/es5.16mb-bench.js' )
      INPUT_MODES+=( 'web' )
      INPUT_PATHS+=( 'ignore/perf/es5.webkit.npm.1.0.0.js' )
      INPUT_MODES+=( 'web' )
#      INPUT_PATHS+=( 'ignore/perf/es5.35mb-kate.js.jo.js' )
#      INPUT_MODES+=( 'web' )

      REPORT_INTERVAL=100

      # Or just use the arg supplied name
      if [[ ! -z "${INPUT_FILE_ARG}" ]]; then
        INPUT_PATHS=( ${INPUT_FILE_ARG} )
        INPUT_MODES=( ${INPUT_MODE_ARG} )
      fi

      for PARSER_NAME in "${!PARSERS[@]}" ; do
        OUTPUT_FILE="/tmp/tenko.p6.${PARSER_NAME}.log"
        if [[ ! -z "${OUTPUT_FILE_OVERRIDE}" ]]; then
          OUTPUT_FILE=${OUTPUT_FILE_OVERRIDE}
        fi
        # Clear logs
        echo -e "Start of log\n" > ${OUTPUT_FILE}
      done

      # Note: we loop files first so we can easily loop the parsers on the same file and print comparisons per file
      # This has the downside of having to write out the template every time again but that's no big deal

      for INPUT_I in ${!INPUT_PATHS[@]} ; do
        INPUT_FILE=${INPUT_PATHS[$INPUT_I]}
        INPUT_MODE=${INPUT_MODES[$INPUT_I]}

        # If we're comparing builds then we need to track the metrics for each parser individually. Since Bash has
        # severe struct limits we'll just store the last N100 stats for one file for two parsers to compare them.
        AB_MIN_A=1000000
        AB_MIN_B=1000000
        AB_MEAN_A=0
        AB_MEAN_B=0
        AB_MEDIAN_A=0
        AB_MEDIAN_B=0
        AB_SD_A=0
        AB_SD_B=0

        MEH=''
        while [[ $MEH == '' || $MAX_ARG == 0 ]]; do # This only passes more than once when comparing two parsers at max=0
          MEH='1'
          for PARSER_NAME in "${!PARSERS[@]}" ; do

            PARSER_PATH=${PARSERS[$PARSER_NAME]}
            OUTPUT_FILE="/tmp/tenko.p6.${PARSER_NAME}.log"
            if [[ ! -z "${OUTPUT_FILE_OVERRIDE}" ]]; then
              OUTPUT_FILE=${OUTPUT_FILE_OVERRIDE}
            fi

            # Generate the script we'll use (this circumvents the requirement of using async to import a parser by param)
            # Note: sed doesn ot support non-greedy so we use perl directly
            TPL_START='s|/\* <TPL PARSER_PATH>.*?</TPL> \*/' # Store here so we don't have to escape twice
            perl -pe "${TPL_START}|'${PARSER_PATH}'|" ./tests/p6.tpl.mjs > ignore/p6.generated.mjs

            MAX=100
            if [[ ! -z "${MAX_ARG}" ]]; then
              MAX=${MAX_ARG}
              if [[ "${MAX}" == "0" ]]; then
                MAX="-1" # Infinite loop
              fi
            fi

            echo -e "\n# Input file: ${INPUT_FILE}" >> ${OUTPUT_FILE}

            echo "#################################"
            echo -e "### Parsing file # ${INPUT_I}: ${INPUT_FILE} with mode ${INPUT_MODE}"
            echo -e "### Using ${BOLD}${PARSER_PATH}${NOCOLOR} as the parser"
            echo -e "### Writing results to ${BOLD}${OUTPUT_FILE}${NOCOLOR}"
            echo -e "### To repeat this run: ${BOLD}\`./t p6 --stabled --input-file ${INPUT_FILE} --input-mode ${INPUT_MODE} --parser $([[ ${PARSER_NAME} == "custom" ]] && echo ${BACKUP_NAME_FOR_PRINT} || echo ${PARSER_NAME}) --output-file ${OUTPUT_FILE} --max ${MAX}\`${NOCOLOR}"
            echo "###########"

            # Now run the benchmark in an infinite loop
            # Stats are tracked in this shell script. It's proven to destabilize nodejs to track and report on a large number of runs.
            # So instead p6.mjs will print the time taken (or crash) and this script will collect them and tdo the reporting

            COUNT=${MAX};
            RUNS=0
            NUMBAS=()
            NUMBAS100=()
            SUM=0.0
            PREVMEAN="0"
            PREVMEDIAN="0"
            LAST_LINE=''
            LAST_LINE100=100
            while [ $COUNT != 0 ]; do

              # ignore/p6.generated.mjs is generated in an earlier step above
              PARSE_TIME=$( NODE_NO_WARNINGS=1 ${NODE_BIN} --experimental-modules --max-old-space-size=8192 ignore/p6.generated.mjs --target-file ${INPUT_FILE} --target-mode ${INPUT_MODE} ) || true

              set +x; # Just in case

              IS_NUM='^[0-9.]+$' # Over-accepts for dots. Do. Not. Care.
              if [[ ! ${PARSE_TIME} =~ ${IS_NUM} ]] ; then
                # Assuming we won't have negative parse times this means the command failed
                # We expect stable parses so this should happen ever parse attempt so so we will continue with next file
                echo $PARSE_TIME
                echo "Parser crashed. Skipping this file."
                NUMBAS=(1)
                NUMBAS100=(1)
                LAST_LINE="Error: ${PARSE_TIME}"
                LAST_LINE100="Error: ${PARSE_TIME}"
                break
              fi

              COUNT=$(( $COUNT - 1 ));
              RUNS=$(( $RUNS + 1 ));

              printf -v PARSE_TIME_FLOORED "%01d" ${PARSE_TIME/.*} # Flooring in bash seems unnecessarily hard otherwise :'( Using printif in the unlikely event of a sub-ms event
              NUMBAS+=( ${PARSE_TIME_FLOORED} ) # Store the floored numbers. We use a different var for calculating avg and there's no other need for the fraction
              NUMBAS100+=( ${PARSE_TIME_FLOORED} )

              # https://stackoverflow.com/questions/7442417/how-to-sort-an-array-in-bash
              readarray -t NUMBAS < <(printf '%s\n' "${NUMBAS[@]}" | sort -n)

              # No need to min/max since I order the array so I can just take the first and last element
              MIN=${NUMBAS[0]}   # This is an int
              MAX=${NUMBAS[-1]}  # This is an int
              test ${MIN} -eq ${MAX} || test ${MIN} -lt ${MAX} || { echo "fail: array= ${NUMBAS[@]}"; exit 1; } # Assetion: Array be sorted and contain ints.

              # Using bc for the maths since bash does not do floats
              SUM=$( echo "${SUM} + ${PARSE_TIME}" | bc -l )
              MEAN_FLOORED=$( echo "${SUM} / ${RUNS}" | bc -l )
              printf -v MEAN_FLOORED "%01d" ${MEAN_FLOORED/.*} # Note: the value may be a fraction without leading zero, if we didnt printf here it would lead to an empty var

              # Bash does integer logic and the number of elements in NUMBAS should equal that of RUNS so RUNS/2 should be Math.floor(NUMBAS.length/2)
              MEDIAN="${NUMBAS[ $(( ${RUNS} / 2 )) ]}";

              # Note: Back to bc for determining the int % delta between the current time and the lowest time for graph plots
              LOWDIST=$( echo "((${PARSE_TIME} / ${MIN})) * 100 - 100" | bc -l )
              # Ok bc actually doesn't floor so we abuse printf for that :(
              printf -v LOWDIST "%01d" ${LOWDIST/.*} # Note: the value may be a fraction without leading zero, if we didnt printf here it would lead to an empty var

              # Create a small plot ranging 0 to 9% to indicate how many % the current time is from the lowest measured time so far
              # This creates a visual aid to see how stable the generated numbers are, roughly
              PERCPLOT=(. . . . . . . . . .)
              PERCPLOT_INDEX=LOWDIST
              test $LOWDIST -gt 9 && PERCPLOT_INDEX=10 # We will smash PERCPLOT[10] explicitly later so trunc it to there
              PERCPLOT[PERCPLOT_INDEX]=$LOWDIST
              PERCPLOT[10]='%'
              test $LOWDIST -lt 2 && PERCPLOT[10]="${GREEN}%"
              test $LOWDIST -gt 5 && PERCPLOT[10]="${RED}%"
              printf -v PERCPLOT '%s' "${PERCPLOT[@]}" # https://stackoverflow.com/questions/13470413/converting-a-bash-array-into-a-delimited-string

              # Plot of 50 dots between low and high to indicate where the current hit lies
              # While a little misleading due to a moving center, the median is plotted as | and current is o
              # Build up the plot similar to the percentage plot; start with an array of dots then overwrite steps
              MEDPLOT=(. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .)
              # Figure out where the median is on this scale. If it exceeds the scale then it becomes the end.
              test $MIN -lt $MAX && MEDPLOT_MEDIAN=$( echo "((${MEDIAN} - ${MIN}) / (${MAX} - ${MIN})) * 50" | bc -l ) || MEDPLOT_MEDIAN=24
              printf -v MEDPLOT_MEDIAN "%01d" ${MEDPLOT_MEDIAN/.*} # Note: the value may be a fraction without leading zero, if we didnt printf here it would lead to an empty var
              test ${MEDPLOT_MEDIAN} -gt 49 && MEDPLOT_MEDIAN=49
              MEDPLOT[${MEDPLOT_MEDIAN}]='|'
              test $MIN -lt $MAX && MEDPLOT_NOW=$( echo "(((${PARSE_TIME} - ${MIN}) / (${MAX} - ${MIN}))) * 50" | bc -l ) || MEDPLOT_NOW=0
              printf -v MEDPLOT_NOW "%01d" ${MEDPLOT_NOW/.*} # Note: the value may be a fraction without leading zero, if we didnt printf here it would lead to an empty var
              test ${MEDPLOT_NOW} -gt 49 && MEDPLOT_NOW=49
              MEDPLOT[${MEDPLOT_NOW}]='o'
              printf -v MEDPLOT '%s' "${MEDPLOT[@]}" # https://stackoverflow.com/questions/13470413/converting-a-bash-array-into-a-delimited-string
              # Dim the dots, they should not add too much to the noise
              MEDPLOT=$( echo ${MEDPLOT} | sed 's/\(\.\+\)/\\e[30;1m\1\\e[0m/g' )

              # Print delta indicators when mean or median changes (animation wooo!)
              ARROW_MEDIAN=' '
              test ${PREVMEDIAN} -gt 0 && test ${PREVMEDIAN} -lt ${MEDIAN} && ARROW_MEDIAN="${RED}${ARROW_UP}${DIM}"
              test ${PREVMEDIAN} -gt 0 && test ${PREVMEDIAN} -gt ${MEDIAN} && ARROW_MEDIAN="${GREEN}${ARROW_DOWN}${DIM}"
              PREVMEDIAN=${MEDIAN}
              ARROW_MEAN=' '
              test ${PREVMEAN} -gt 0 && test ${PREVMEAN} -lt ${MEAN_FLOORED} && ARROW_MEAN="${RED}${ARROW_UP}${DIM}"
              test ${PREVMEAN} -gt 0 && test ${PREVMEAN} -gt ${MEAN_FLOORED} && ARROW_MEAN="${GREEN}${ARROW_DOWN}${DIM}"
              PREVMEAN=${MEAN_FLOORED}

              # Pad the timestamps for nice lineups. Use MAX to pad to prevent pingpongs when benchmarks twiddle around 100 or 1000
              printf -v PAD_RUNS "%*s" 3 ${RUNS} # Prevent jumping within 1000 iterations. Allow for a jump beyond that.
              printf -v PAD_PT "%${#MAX}g" ${PARSE_TIME_FLOORED}
              printf -v PAD_MEAN "%${#MAX}.0f" ${MEAN_FLOORED}
              printf -v PAD_MEDIAN "%${#MAX}.0f" ${MEDIAN}

              TIMECOLOR=${BOLD_GREEN}
              PRINT_MIN="${GREEN}${MIN}${NOCOLOR}"
              if [ ${PARSE_TIME_FLOORED} -gt ${MIN} ]; then
                TIMECOLOR=${NOCOLOR}
                PRINT_MIN=${MIN}
              fi
              PRINT_MAX="${RED}${MAX}${NOCOLOR}"
              if [ ${PARSE_TIME_FLOORED} -lt ${MAX} ]; then
                PRINT_MAX=${MAX}
              fi

              # Compute the delta of the mean and each value
              SD=0
              for N in "${NUMBAS[@]}"; do
                T=$(( (N - MEAN_FLOORED) * (N - MEAN_FLOORED) ))
                SD=$(( SD + T ))
              done
              SD=$( echo "scale=3; sqrt(${SD}) / ${#NUMBAS[@]}" | bc )

              # The padding is dropped in LAST_LINE somehow ... probably a weird rule I don't know
              LAST_LINE="${PERCPLOT}${DIM} ${PAD_RUNS}:${TIMECOLOR} ${PAD_PT} ${DIM}ms${NOCOLOR}   ${DIM}(median${ARROW_MEDIAN}${BOLD}${MEDIAN}${DIM} mean${ARROW_MEAN}${PAD_MEAN})${NOCOLOR} ${DIM}[${NOCOLOR}${PRINT_MIN} ${MEDPLOT} ${PRINT_MAX}${DIM}]${NOCOLOR}   ${DIM}<$(( $MEDIAN - $MIN ))>${NOCOLOR} sd=${SD}"
              echo -e "${PERCPLOT}${DIM} ${PAD_RUNS}:${TIMECOLOR} ${PAD_PT} ${DIM}ms${NOCOLOR}   ${DIM}(median${ARROW_MEDIAN}${BOLD}${MEDIAN}${DIM} mean${ARROW_MEAN}${PAD_MEAN})${NOCOLOR} ${DIM}[${NOCOLOR}${PRINT_MIN} ${MEDPLOT} ${PRINT_MAX}${DIM}]${NOCOLOR}   ${DIM}<$(( $MEDIAN - $MIN ))>${NOCOLOR} sd=${SD}"

              N100=${#NUMBAS100[@]}
              if [[ "${N100}" = "${REPORT_INTERVAL}" || $COUNT == 0 ]]; then
                TOTAL100=0
                MIN100=10000000
                for N in "${NUMBAS100[@]}"; do
                  TOTAL100=$(( TOTAL100 + N ))
                  test $N -lt $MIN100 && MIN100=$N
                done

                # https://stackoverflow.com/questions/7442417/how-to-sort-an-array-in-bash
                readarray -t NUMBAS100 < <(printf '%s\n' "${NUMBAS100[@]}" | sort -n)

                MEAN100=$( echo "scale=0; ${TOTAL100} / ${N100}" | bc -l )
                MEDIAN100=$(( ${NUMBAS100[ $(( ${N100} / 2 )) ]} ))

                SD100=0
                for N in "${NUMBAS100[@]}"; do
                  T100=$(( (N - MEAN100) * (N - MEAN100) ))
                  SD100=$(( SD100 + T100 ))
                done
                SD100=$( echo "scale=3; sqrt(${SD100}) / ${N100}" | bc )

                LAST_LINE100="### Last ${N100} iterations (only):${BOLD}
    Mean = ${MEAN100}
    Median = ${MEDIAN100}
    SD = ${SD100}, Lowest = ${MIN100}
  ${NOCOLOR}###"
                echo -e "${LAST_LINE100}"

                if [[ ! -z "${COMPARE_MODE}" ]]; then
                  if [[ "${PARSER_NAME}" == "custom" ]]; then
                    test $MIN100 -lt $AB_MIN_A && AB_MIN_A=$MIN100
                    AB_MEAN_A=$MEAN100
                    AB_MEDIAN_A=$MEDIAN100
                    AB_SD_A=$SD100
                  else
                    test $MIN100 -lt $AB_MIN_B && AB_MIN_B=$MIN100
                    AB_MEAN_B=$MEAN100
                    AB_MEDIAN_B=$MEDIAN100
                    AB_SD_B=$SD100
                  fi
                  # Start printing deltas after at least one full cycle of the same file
                  if [[ ${AB_MEAN_B} -gt 0 ]]; then
                    DUMP="
  Delta, new (${PARSERS[tenko]}) minus old (${PARSERS[custom]}) for ${INPUT_FILE} (negative means the new is faster):
  Minimum: $(printf "%20s" "${AB_MIN_B} - ${AB_MIN_A} = ")$( [[ $AB_MIN_B > $AB_MIN_A ]] && echo ${BOLD_RED} || echo ${BOLD_GREEN} )$(printf "%10s" "$(( $AB_MIN_B - $AB_MIN_A ))")${NOCOLOR} ${DIM}($(printf "%7s" "$(echo "scale=3; (${AB_MIN_A} / ${AB_MIN_B} * 100) - 100" | bc)")%)${NOCOLOR}
  Mean:    $(printf "%20s" "${AB_MEAN_B} - ${AB_MEAN_A} = ")${BOLD}$(printf "%10s" "$(( $AB_MEAN_B - $AB_MEAN_A ))")${NOCOLOR} ${DIM}($(printf "%7s" "$(echo "scale=3; (${AB_MEAN_A} / ${AB_MEAN_B} * 100) - 100" | bc)")%)${NOCOLOR}
  Median:  $(printf "%20s" "${AB_MEDIAN_B} - ${AB_MEDIAN_A} = ")$( [[ $AB_MEDIAN_B > $AB_MEDIAN_A ]] && echo ${BOLD_RED} || echo ${BOLD_GREEN} )$(printf "%10s" "$(( $AB_MEDIAN_B - $AB_MEDIAN_A ))")${NOCOLOR} ${DIM}($(printf "%7s" "$(echo "scale=3; (${AB_MEDIAN_A} / ${AB_MEDIAN_B} * 100) - 100" | bc)")%)${NOCOLOR}
  SD:      $(printf "%20s" "${AB_SD_B} vs ${AB_SD_A}")
                    "
                    echo -e "${DUMP}"
                    echo -e "${DUMP}" >> ${OUTPUT_FILE_COMPARE}
                  fi
                fi

                NUMBAS100=()

                if [[ ! -z "${COMPARE_MODE}" ]]; then
                  # Stop this loop and switch to the other parser
                  COUNT=0
                fi
              fi
            done
            echo "### This was ${INPUT_FILE} for ${PARSER_PATH} ###"

            # Only dump the last printed line to the log. It should contain all the data we need.
            # If need be we can later also dump the individual data points ... not sure we need this.
            echo -e "${LAST_LINE}" >> ${OUTPUT_FILE}
            echo -e "${LAST_LINE100}" >> ${OUTPUT_FILE}

          done # End of parser loop
        done # End of infinite parser switching loop (when comparing and max=0)

      done # End of input file loop

      # TODO: print final report

      echo "End of run. Find stats in ${OUTPUT_FILE}"
      if [[ ! -z "${OUTPUT_FILE_COMPARE}" ]]; then
        echo "Comparison stats in ${OUTPUT_FILE_COMPARE}}"
      fi

      ;;

    perf)
      # This mode is deprecated. Too many things wrong. See p6 in stable mode for real benchmarking.
      echo -e "\nYay, perf! :D Automatically creates an uses a build. Use --record to update times, --reset to reset baselines\n"

      if [[ -z "${NO_BUILDING}" ]]; then
        echo "Creating build without compat for perf"
        ./t z --no-compat ${NATIVESYMBOLS} ${NOAST} ${MINIFY} ${NO_MANGLE} --node-bin ${NODE_BIN}
      fi

      # Infinite loop through all benchmarks. Once the end is reached, start over.
      # A new node process is called for each individual parse step. This attempts to eliminate cross test gc polution
      if [[ -z "${INSPECT_NODE}" ]]; then
        STABLE_V8=
        if [[ ! -z "${PERFONE}" ]]; then # Regular node invokes
          STABLE_V8="--single-threaded --single-threaded-gc --predictable --predictable-gc-schedule --compilation-cache"
        fi
        NODE_NO_WARNINGS=1 "${NODE_BIN}" ${INSPECT_NODE} ${STABLE_V8} --experimental-modules --max-old-space-size=8192 tests/perf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS} ${RESET} ${RECORD} ${EXTRA} ${EXPOSE_SCOPE} n 1
        set +x
        I=1
        while true
        do
          # The process will exit 1 when the last benchmark is executed and the n param is given. Let's hope so :D
          NODE_NO_WARNINGS=1 "${NODE_BIN}" ${INSPECT_NODE} ${STABLE_V8} --experimental-modules --max-old-space-size=8192 tests/perf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS} ${RESET} ${RECORD} ${EXTRA} ${EXPOSE_SCOPE} n "${I}" || I=0
          if [[ "${I}" -eq "0" ]]; then
            RESET=''
          fi
          I=$(( $I + 1 ))
          sleep 0.1 # Yield for OS to cleanup (adds stability to the data)
        done
        set +x
      else
        NODE_NO_WARNINGS=1 ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/hf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS}
      fi
    ;;

    hf)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/hf.mjs ${BUILD} ${NO_BUILDING} ${INSPECT_ZEPAR} ${EXPOSE_SCOPE} ${ANNEXB}
    ;;

    coverage)
      node_modules/.bin/c8 --include src --reporter html --reports-dir ignore/coverage ./t n
      node_modules/.bin/c8 report --reporter text --reports-dir ignore/coverage

      # Just log the coverage, better than nothing. Hopefully I can do my due diligence to never commit a dirty repo :)
      echo "Last generated: $(date)" > COVERAGE.md
      # Note: clear the top of the generated table because github refuses to render the table otherwise
      node_modules/.bin/c8 report --reporter text --reports-dir ignore/coverage | sed '1 s/^.*$//' >> COVERAGE.md
      echo "Updated COVERAGE.md"

      if [[ -z "${WRITE_ONLY}" ]]; then
        python -m SimpleHTTPServer 8005 &
        LOCAL_SERVER_PID=$!
        trap "echo '###### killing web server #####'; kill ${LOCAL_SERVER_PID}" SIGINT SIGTERM EXIT
        xdg-open http://localhost:8005/ignore/coverage/index.html || open http://localhost:8005/ignore/coverage/index.html || start http://localhost:8005/ignore/coverage/index.html
        set +x
        echo "ctrl+c to stop webserver"
        while true;
        do
          sleep 10
        done
      fi
      ;;

    doptigate)
      if [[ -z "${NO_BUILDING}" ]]; then
        ./t z --no-compat --pretty ${NATIVESYMBOLS} ${NOAST} ${MINIFY} ${NO_MANGLE} --node-bin ${NODE_BIN}
      fi
      set -x
      # First generate the v8 log
      echo "Creating log"
      ${NODE_BIN} --experimental-modules --max-old-space-size=8192 --trace-ic --logfile='ignore/v8.log' --no-logfile-per-isolate tests/doptie.mjs
      # Next scrub the log file because deoptigate can't handle some of the newly added information
      echo "Scrubbing log"
      ${NODE_BIN} tests/doptie_scrub_v8log.js
      # Now run doptie itself from within the ignore folder
      echo "Running deoptigate"
      cd ignore
      ../node_modules/.bin/deoptigate
      #rm v8.log
      cd ..
      ;;

    *)
      ${NODE_BIN} ${INSPECT_NODE} ${NODE_PROF} --experimental-modules --max-old-space-size=8192 tests/run_tests.mjs ${ACTION} "${ARG}" ${MODE} ${ACORN} ${BABEL} ${EXTRA} ${EXPOSE_SCOPE} ${ES} ${ANNEXB} ${BUILD} ${INSPECT_ZEPAR}
    ;;
esac
set +x

if [[ ! -z "${NODE_PROF}" ]]; then
  echo "generating flamechart now"
  if [[ -f v8.log ]]; then
    npx pflames v8.log
    rm v8.log
  fi
fi

if [[ "${HF}" = "yes" ]]; then
    echo '###### END OF PARSER #####'
fi
