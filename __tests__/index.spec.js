(function () {
  const NxSchemaManager = require('../src');

  describe('NxSchemaManager.methods', function () {
    test('nx.SchemaManager', function () {
      var manager = new NxSchemaManager();
      manager.define('users', {
        fields: {
          title: null,
          description: null,
          code: '取值',
          name: '名称'
        }
      });

      console.log(manager.gets());
    });
  });
})();
