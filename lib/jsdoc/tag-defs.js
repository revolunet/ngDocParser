'use strict';

var extractTypeTransform = require('../transforms/extract-type');
var extractNameTransform = require('../transforms/extract-name');
var _ = require('lodash');

module.exports = {

  //jsdoc,
  module: {},
  name: {},
  description: { isMultiLine : true },


  returns: {
    isMultiLine : true,
    parse: function (str) {

      // TODO use a cleaner solution
      /**
       * @type {typeExtractionResult}
       */
      var type = extractTypeTransform(str);
      str = type.next;
      delete type.next;

      return {
          type: type,
          description: str
      };
    }
  },
  param: {
    name: 'param',
    enableMultiTag: true,
    isMultiLine: true,
    docProperty: 'params',


    parse: function (str) {

      // TODO use a cleaner solution
      /**
       * @type {typeExtractionResult}
       */
      var type = extractTypeTransform(str);
      str = type.next;
      delete type.next;

      /**
       * @type {nameExtractionResult}
       */
      var name = extractNameTransform(str);
      str = name.next;
      delete name.next;

      return {
        key: name.name,
        value: {
          type: type,
          name: name,
          description: str
        }
      };
    }
  },

  // ngDoc
  ngdoc: {},
  restrict: { }

};

module.exports.property = _.extend({}, module.exports.param, {
  name: 'property'
});
