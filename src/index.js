(function () {
  // https://zhuanlan.zhihu.com/p/58401380
  // https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DICTIONARY = require('./dictionary.json');
  var DB_ = '_';
  var defaults = {
    prefix: '',
    generalKey: '__general__'
  };

  var NxSchemaManager = nx.declare('nx.SchemaManager', {
    properties: {
      generalFields: function () {
        return this.data[this.options.generalKey];
      }
    },
    methods: {
      init: function (inData, inOptions) {
        this.options = nx.mix(null, defaults, inOptions);
        this.data = {};
        this.data[this.options.generalKey] = this.__setPrefix(nx.mix(null, DICTIONARY, inData));
      },
      gets: function () {
        return this.data;
      },
      get: function (inName) {
        return this.data[inName];
      },
      set: function (inName, inKey, inValue) {
        var fields = this.data[inName];
        fields[inKey] = inValue;
      },
      sets: function (inName, inObject) {
        var self = this;
        var fields = this.data[inName];
        nx.forIn(inObject, function (key, value) {
          fields[self.__key(key)] = value;
        });
      },
      define: function (inName, inSchema) {
        this.data[inName] = this.defaults(inSchema.fields);
      },
      defaults: function (inObject) {
        var self = this;
        var generalFields = this.generalFields;
        console.log(generalFields);
        nx.forIn(inObject, function (key, value) {
          var gkey = self.__key(key);
          inObject[gkey] = value || generalFields[gkey];
        });
        return inObject;
      },
      __key: function (inKey) {
        var prefix = this.options.prefix;
        return prefix ? prefix + DB_ + inKey : inKey;
      },
      __setPrefix: function (inObject) {
        var self = this;
        nx.forIn(inObject, function (key, value) {
          inObject[self.__key(key)] = value;
        });
        return inObject;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSchemaManager;
  }
})();
