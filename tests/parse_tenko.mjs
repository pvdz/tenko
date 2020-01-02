function testTenko(tenko, code, testVariant, enableAnnexb, version) {
  return tenko(
    code,
    {
      goalMode: testVariant === 'module',
      collectTokens: 0,
      strictMode: testVariant === 'strict',
      webCompat: enableAnnexb || testVariant === 'web',
      // targetEsVersion: version,
      babelCompat: false,
      acornCompat: false,

      $log: () => {},
      $warn: () => {},
      $error: () => {},
    },
  );
}

export {
  testTenko,
};
