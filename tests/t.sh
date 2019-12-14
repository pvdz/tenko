#!/usr/bin/env bash

# Can override this through `--node-bin path/here`
# I need to override this path when calling `./t p` through `sudo` for perf (`cset` & `chrt`), which mandate root.
NODE_BIN=$(which node) # This may exit non-zero. That's fine.

set -e # Exit on error

ACTION=''
ARG=''
MODE=''
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
NOMIN=''
INSPECT=''
DEVTOOLS=''
PRETTIER=''
PERFONE=''
RESET=''
RECORD=''
NATIVESYMBOLS=''

while [[ $# > 0 ]] ; do
  case "$1" in
    --help)
        echo "
Tenko test runner help:

 Shortcuts for common test runner setups I use:

 i <code>      Run test with custom input, by default only runs sloppy script
 f <path>      Run a specific .md parser test file, by default only runs sloppy script
 F <path>      Run a specific file and consider its entire contents to be test input
 g             Regenerate _all_ auto generated files
 G             Autogenerate only files that don't already exist
 u             Run all test files and just write output
 U             Run all test files and force write output
 m             Run all tests and ask for update one-by-one
 s             Search for needles (call HIT() to place a needle and find all tests that hit them)
 t             Run test262 suite (only)
 a             Alias for ./t m --test-acorn, to verify Tenko output against the Acorn AST
 b             Alias for ./t m --test-babel, to verify Tenko output against the Babel AST
 fu            Test file and ask to update it if necessary
 fuzz          Run fuzzer
 hf            Log stats through HeatFiler (wip), can be used in conjunction with almost anything
 p             Run benchmarks (everything in same node instance)
 p1            Same as ./t p except it attempts to run node as stable as possible (can run much slower than usual! With reduced variance)
 p2            My shortcut for working with p1 with sudo :p
 p3            Undo system settings applied in p3
 z             Create build
 tb            Test build (checks whether exports work as intended for parameters etc)
 devtools      Alias for `./t p --inspect --devtools --build` which can be used to debug the parser in chrome devtools
 deoptigate    Run deoptigate (see doptie.js for file config)
 --sloppy      Enable sloppy script mode, do not auto-enable other modes
 --strict      Enable strict script mode, do not auto-enable other modes
 --module      Enable module goal mode, do not auto-enable other modes
 --annexb      Enable the syntax extensions under Annex B
 --web         Alias for --sloppy and --web
 --min         Only for f and i, for invalid input; minify the test case while keeping same error
 --min-printer Only for f and i, for inputs that cause bad printer behavior; minify the test case while keeping same error
 --no-printer  Do not run the printer-step (helps with debugging in certain cases)
 --acorn       Run in Acorn compat mode
 --test-acorn  Also compare AST of test cases to Acorn output
 --babel       Run in Babel compat mode
 --test-babel  Also compare AST of test cases to Babel output
 --no-fatals   Do not abort test run for (test) any assertion errors
 --node        Fuzzer: compare pass/fail to node by creating a new function and checking if it throws
 --consise     Do not dump AST and printer output to stdout. Only works with -i or -f (or anything that uses those)
 --build       Use the build (./t z) instead of dev sources for Tenko in this call
 --nb          Don't actually create a build for cases where this otherwise would happen (prevents sudo trouble :)
 --no-compat   For `z`; Replace the compat flags for Acorn and Babel to `false` so the minifier eliminates the dead code
 --no-ast      For `z`; Strip all AST code when creating a build
 --no-min      For `z`; Do not run Terser (minifier) on build output
 --no-mangle   For `z`; Run Terser but tell it not to mangle identifiers (use together with `--pretty`)
 --pretty      For `z`; Run prettier on the build afterwards (useful with `--no-min`)
 --native-symbols For `z`; Special build step turns `PERF_$` prefixed functions into `%` to enable v8 internal functions.
 --inspect     Run with `node --inspect-brk` to debug node in the chrome devtools. Use `--devtools` to auto-profile.
 --devtools    Call `console.profile()` before and after the core parse step (not all actions support this)
 --reset       For perf, force resets baseline to whatever the current result
 --record      For perf, updates baseline if better
 --node-bin <path> Specify the path to the node binary to run, defaults to the answer of `which node`
 --concise     Just parse and exit. No post processing, printing, or anything else.
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
    p1)
      echo "Asking v8 to run single thread, no caching, etc"
      ACTION='perf'
      PERFONE='yes'
      ;;
    p2)
      ACTION='perf2'
      PERFONE='yes'
      ;;
    p3)
      ACTION='perf3'
      ;;
    p4)
      ACTION='perf2'
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

    --sloppy)       MODE='--sloppy'       ;;
    --strict)       MODE='--strict'       ;;
    --module)       MODE='--module'       ;;
    --annexb)       ANNEXB='--annexb'     ;;
    --web)          MODE='--web'          ;;
    --acorn)        ACORN='--acorn'       ;;
    --test-acorn)   ACORN='--test-acorn'  ;;
    --babel)        BABEL='--babel'       ;;
    --test-babel)   BABEL='--test-babel'  ;;
    --min)          EXTRA='--min'         ;;
    --min-printer)  EXTRA='--min-printer' ;;
    --no-printer)   EXTRA='--no-printer'  ;;
    --no-fatals)    EXTRA='--no-fatals'   ;;
    --concise)      EXTRA='--concise'     ;;
    -q)             EXTRA='-q'            ;;
    -b);&
    --build)        BUILD='-b'            ;;
    --nb)           NO_BUILDING='--nb'    ;;
    --no-compat)    NOCOMP='--no-compat'  ;;
    --no-ast)       NOAST='--no-ast'      ;;
    --no-min)       NOMIN='--no-min'      ;;
    --no-mangle)    NOMIN='--no-mangle'   ;;
    --pretty)       PRETTIER='yes'        ;;
    --prettier)     PRETTIER='yes'        ;;
    --native-symbols) NATIVESYMBOLS='--native-symbols' ;;
    --reset)        RESET='--reset'       ;;
    --record)       RECORD='--record'     ;;
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

    6)  ES='--es6'  ;;
    7)  ES='--es7'  ;;
    8)  ES='--es8'  ;;
    9)  ES='--es9'  ;;
    10) ES='--es10' ;;
    11) ES='--es11' ;;

    # special flags for fuzzer

    --node)         NODE='--node'         ;;

    *)
      echo "t: Unsupported action or option... \`$1\` Use --help for options"
      exit 1
      ;;
  esac
  shift
done

HFPID=''
if [[ "${HF}" = "yes" ]]; then
    # Note: the build is self-hosted so we should start this before transforming with HF. Use actual dev source with --nb
    if [[ ! -z "${BUILD}" ]] || [[ ! -z "${NO_BUILDING}" ]]; then
      echo "Running on build"
      set -x

      if [[ -z "${NO_BUILDING}" ]]; then
        echo "Creating pretty build without compat code and without minification"
        ./t z --no-compat --no-min --pretty ${NATIVESYMBOLS} ${NOAST} --node-bin ${NODE_BIN}
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

    echo '###### HF setup complete #####'
fi

set -x

case "${ACTION}" in
    test262)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules tests/test262.mjs ${ACORN} ${BABEL} ${ANNEXB} ${BUILD} ${INSPECT_ZEPAR}
    ;;

    fuzz)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/fuzz.mjs ${EXTRA} ${NODE} ${ANNEXB} ${BUILD} ${PSFIX} "${ARG}" ${INSPECT_ZEPAR}
    ;;

    build)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules cli/build.mjs ${NOCOMP} ${NOAST} ${NOMIN} ${INSPECT_ZEPAR} ${NATIVESYMBOLS}
      if [[ ! -z "${PRETTIER}" ]]; then
          node_modules/.bin/prettier build/tenko.prod.mjs --write
          node_modules/.bin/prettier build/tenko.prod.js --write
      fi
    ;;

    test-build)
      if [[ -z "${NO_BUILDING}" ]]; then
        ./t z --node-bin ${NODE_BIN}
      fi
      ${NODE_BIN} --experimental-modules --max-old-space-size=8192 tests/build.mjs
      ;;

    perf2)
      if [[ -z "${NO_BUILDING}" ]]; then
        ./t z --no-compat ${NATIVESYMBOLS} ${NOAST} --node-bin ${NODE_BIN}
      fi
      set -x
      # WARNING! DO NOT JUST USE UNLESS YOU VERIFIED THIS WORKS FOR YOU!
      # I use this to stabilize my system for perf.
      # - It turns off turbo mode
      # - It shuts down the 7th core, which is a fake core based on core 3
      # - It turns off power scaling
      # - It shields cpu 3 so I can use that core exclusively to spawn new node processes
      # (See https://easyperf.net/blog/2019/08/02/Perf-measurement-environment-on-Linux )
      sudo su -c "echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo"
      sudo su -c "echo 0 > /sys/devices/system/cpu/cpu7/online"
      sudo su -c "echo performance > /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor"
      sudo cset shield --cpu=3 -k on

      # https://unix.stackexchange.com/questions/349908/how-to-get-all-processes-running-on-each-cpu-core-in-ubuntu
      echo "Wainting 5 seconds so most processes hopefully leave the cpu core"
      sleep 5
      CORENUM=3; ps -e -o pid,psr,cpu,cmd | grep -E  "^[[:space:]][[:digit:]]+[[:space:]]+${CORENUM}"

      if [[ -z "${PERFONE}" ]]; then
        # Do not pass on params to node which disables JIT etc.
        # Gives it a more real world comparison which is less reliable.
        # Just don't trust the absolute numbers because the cpu is intentionally slowed down.
        sudo cset shield --exec -- chrt --rr 99 ./t p --build --node-bin '/home/qfox/.nvm/versions/node/v12.13.0/bin/node' --nb ${RECORD} ${RESET} ${EXTRA}
      else
        # This will disable jit etc and attempts to stabilize the v8 runtime as much as possible (perf wise)
        sudo cset shield --exec -- chrt --rr 99 ./t p1 --build --node-bin '/home/qfox/.nvm/versions/node/v12.13.0/bin/node' --nb ${RECORD} ${RESET} ${EXTRA}
      fi
      ;;
    perf3)
      sudo su -c "echo 0 > /sys/devices/system/cpu/intel_pstate/no_turbo"
      sudo su -c "echo 1 > /sys/devices/system/cpu/cpu7/online"
      sudo su -c "echo powersave > /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor"
      sudo cset shield -r
      ;;
    perf)
      echo "Yay, perf! :D"

      if [[ -z "${NO_BUILDING}" ]]; then
        echo "Creating build without compat for perf"
        ./t z --no-compat ${NATIVESYMBOLS} ${NOAST} --node-bin ${NODE_BIN}
      fi

      echo "Going to do a test run first..."

      # Infinite loop through all benchmarks. Once the end is reached, start over.
      # A new node process is called for each individual parse step. This attempts to eliminate cross test gc polution
      if [[ -z "${INSPECT_NODE}" ]]; then
        STABLE_V8=
        if [[ ! -z "${PERFONE}" ]]; then # Regular node invokes
          STABLE_V8="--single-threaded --single-threaded-gc --predictable --predictable-gc-schedule --compilation-cache"
        fi
        NODE_NO_WARNINGS=1 "${NODE_BIN}" ${INSPECT_NODE} ${STABLE_V8} --experimental-modules --max-old-space-size=8192 tests/perf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS} ${RESET} ${RECORD} ${EXTRA} n 1
        set +x
        I=1
        while true
        do
          # The process will exit 1 when the last benchmark is executed and the n param is given. Let's hope so :D
          NODE_NO_WARNINGS=1 "${NODE_BIN}" ${INSPECT_NODE} ${STABLE_V8} --experimental-modules --max-old-space-size=8192 tests/perf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS} ${RESET} ${RECORD} ${EXTRA} n "${I}" || I=0
          if [[ "${I}" -eq "0" ]]; then
            RESET=''
          fi
          I=$(( $I + 1 ))
          sleep 0.1 # Yield for OS to cleanup (adds stability to the data)
        done
        set +x
      else
        ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/hf.mjs ${BUILD} ${INSPECT_ZEPAR} ${DEVTOOLS}
      fi
    ;;

    hf)
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/hf.mjs ${BUILD} ${NO_BUILDING} ${INSPECT_ZEPAR}
    ;;

    doptigate)
      if [[ -z "${NO_BUILDING}" ]]; then
        ./t z --no-compat --no-min --pretty ${NATIVESYMBOLS} ${NOAST} --node-bin ${NODE_BIN}
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
      ${NODE_BIN} ${INSPECT_NODE} --experimental-modules --max-old-space-size=8192 tests/run_tests.mjs ${ACTION} "${ARG}" ${MODE} ${ACORN} ${BABEL} ${EXTRA} ${ES} ${ANNEXB} ${BUILD} ${INSPECT_ZEPAR}
    ;;
esac
set +x

if [[ "${HF}" = "yes" ]]; then
    echo '###### END OF PARSER #####'
fi
