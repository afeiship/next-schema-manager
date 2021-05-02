(function () {
  const NxSchemaManager = require('../src');

  describe('NxSchemaManager.methods', function () {
    test('nx.SchemaManager set normal with null value', function () {
      var manager = new NxSchemaManager();
      manager.define('users', {
        fields: {
          title: null,
          description: null,
          code: '取值',
          name: '名称'
        }
      });

      expect(manager.get('users')).toEqual({
        title: '标题',
        description: '描述',
        code: '取值',
        name: '名称'
      });
    });
  });
})();
