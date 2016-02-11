'use strict'

var _ = require('lodash');
var uuid = require('uuid');

var conformsTo;
(function() {
    var common = require('./Common');
    conformsTo = common.conformsTo;
}).call();

function Enum(name, values) {
    function jsmfEnum(x) {return _.includes(jsmfEnum, x)} ;
    jsmfEnum.__name = name;
    Object.defineProperty(jsmfEnum, '__meta__', {value: {uuid: uuid.v4(), conformsTo: Enum}});
    Object.defineProperty(jsmfEnum, 'getName', {value: getName});
    if (values instanceof Array) {
        _.forEach(values, function(v, k) {
            jsmfEnum[v] = k;
        });
    } else {
        _.forEach(values, function(v, k) {
            jsmfEnum[k] = v;
        });
    }
    return jsmfEnum;
}

function getName(o) {
  return _.findKey(this, function(v) { return v === o;});
}

function isJSMFEnum(o) {
    return conformsTo(o) === Enum;
}



module.exports = {Enum: Enum, isJSMFEnum: isJSMFEnum}
