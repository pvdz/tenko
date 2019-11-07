// Enable this through `./t z --native-symbols`

// Create noops which the build script can turn into "v8 primitives", or drop entirely, while still working in dev
// Functions that start with `PERF_` are susceptible to this transform. Calls to `PERF_$` are unconditionally converted to `%`

// Node flags to work with this: --trace_opt --trace_deopt --allow-natives-syntax
/*
Test:
```
./t z --no-compat --native-symbols;
node --experimental-modules --max-old-space-size=8192 --trace_opt --trace_deopt --allow-natives-syntax --debug-code tests/v8internals.mjs
```
See v8internals for more information, and on how to do debug node build for even more information output
*/

// https://github.com/hilongjw/v8-RuntimeFunctions-list
// https://github.com/v8/v8/blob/master/src/runtime/runtime.h
// https://thlorenz.com/v8-dox/build/v8-3.25.30/html/d7/da2/classv8_1_1internal_1_1_j_s_object.html#a5af9231b53f45286a19b579904711c73
// https://thlorenz.com/v8-dox/build/v8-3.25.30/html/d4/dfe/objects-inl_8h_source.html

// %OptimizeFunctionOnNextCall
// %GetOptimizationStatus
// function printStatus(fn) {
//   switch(%GetOptimizationStatus(fn)) {
//   case 1: console.log("Function is optimized"); break;
//   case 2: console.log("Function is not optimized"); break;
//   case 3: console.log("Function is always optimized"); break;
//   case 4: console.log("Function is never optimized"); break;
//   case 6: console.log("Function is maybe deoptimized"); break;
//   case 7: console.log("Function is optimized by TurboFan"); break;
//   default: console.log("Unknown optimization status"); break;
//   }
// }
function PERF_OptimizeFunctionOnNextCall(func) { return PERF_$OptimizeFunctionOnNextCall(func); }
function PERF_$OptimizeFunctionOnNextCall(func) {
  // Note: func must have been called at least twice
  // Use PERF_getStatus to see result / status
}
function PERF_getStatus(func) {
  let s = PERF_$GetOptimizationStatus(func);
  switch(s) {
    case 1: return '';//"Function is optimized (1)";
    case 2: return "Function is not optimized (2)";
    case 3: return '';//"Function is always optimized (3)";
    case 4: return "Function is never optimized (4)";
    case 6: return "Function is maybe deoptimized (5)";
    case 7: return '';//"Function is optimized by TurboFan (6)";
    default: return "Unknown optimization status (s)";
  }
}
function PERF_$GetOptimizationStatus(func) {}

// %HasFastProperties
function PERF_HasFastProperties(obj) { return PERF_$HasFastProperties(obj); }
const IGNORE = {};
function PERF_$HasFastProperties(obj) { return IGNORE; }
function PERF_enforce_HasFastProperties(obj) {
  let state = PERF_HasFastProperties(obj);
  if (state === IGNORE) return;
  if (state !== true) {
    console.log('Offending object:', obj);
    throw new Error('ASSERTION error: object should have fast properties but doesnt; ' + state);
  }
}

// %HaveSameMap
function PERF_HaveSameMap(aObj, bObj) { return PERF_$HaveSameMap(aObj, bObj); }
function PERF_$HaveSameMap(aObj, bObj) {}

// %hasFastSmiElements
function PERF_hasFastSmiElements(obj){ return PERF_$hasFastSmiElements(obj); }
function PERF_$hasFastSmiElements(obj){}

// %hasFastObjectElements
function PERF_hasFastObjectElements(obj) { return PERF_$hasFastObjectElements(obj); }
function PERF_$hasFastObjectElements(obj) {}

// %hasFastDoubleElements
function PERF_hasFastDoubleElements(obj) { return PERF_$hasFastDoubleElements(obj); }
function PERF_$hasFastDoubleElements(obj) {}

// %hasDictionaryElements
// An object with slow properties has a self-contained dictionary as a properties store.
// Since inline caches don’t work with dictionary properties, the latter, are typically slower than fast properties.
function PERF_hasDictionaryElements(obj) { return PERF_$hasDictionaryElements(obj); }
function PERF_$hasDictionaryElements(obj) {}

// %hasFastHoleyElements
function PERF_hasFastHoleyElements(obj) { return PERF_$hasFastHoleyElements(obj); }
function PERF_$hasFastHoleyElements(obj) {}

// %haveSameMap
function PERF_haveSameMap(obj1, obj2) { return PERF_$haveSameMap(obj1, obj2); }
function PERF_$haveSameMap(obj1, obj2) {}

// %isValidSmi
function PERF_isValidSmi(obj) { return PERF_$isValidSmi(obj); }
function PERF_$isValidSmi(obj) {}

// %isSmi
function PERF_isSmi(obj) { return PERF_$isSmi(obj); }
function PERF_$isSmi(obj) {}

// %hasFastSmiOrObjectElements
function PERF_hasFastSmiOrObjectElements(obj) { return PERF_$hasFastSmiOrObjectElements(obj); }
function PERF_$hasFastSmiOrObjectElements(obj) {}

// %hasSloppyArgumentsElements
function PERF_hasSloppyArgumentsElements(obj) { return PERF_$hasSloppyArgumentsElements(obj); }
function PERF_$hasSloppyArgumentsElements(obj) {}

// %CollectGarbage()
function PERF_CollectGarbage() { return PERF_$CollectGarbage(); }
function PERF_$CollectGarbage() {}

// %DebugPrint(add)
function PERF_DebugPrint(func) { return PERF_$DebugPrint(func); }
function PERF_$DebugPrint() {}

export {
  PERF_OptimizeFunctionOnNextCall,
  PERF_getStatus,
  PERF_HasFastProperties,
  PERF_enforce_HasFastProperties,
  PERF_HaveSameMap,
  PERF_hasFastSmiElements,
  PERF_hasFastObjectElements,
  PERF_hasFastDoubleElements,
  PERF_hasDictionaryElements,
  PERF_hasFastHoleyElements,
  PERF_haveSameMap,
  PERF_isValidSmi,
  PERF_isSmi,
  PERF_hasFastSmiOrObjectElements,
  PERF_hasSloppyArgumentsElements,
  PERF_CollectGarbage,
  PERF_DebugPrint,
};
