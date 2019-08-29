#!/usr/bin/env node
var babel = require('./compile');
var program = require('commander');
var pkgjson = require('../package.json');
var path = require('path');
var _ = require('lodash');


/**
 * The goal is to add the absolute minimum amount of options that are
 * unique to this program.  If a feature is good enough for one component
 * it ought to be good enough for all.  Babel features are not included in this
 * and will be passed through to Babel without complaint.  This is just options
 * to *this* file itself
 */

var config = {
  babelrc: true,
};

program
  .version(pkgjson.version)
  .parse(process.argv);

var directory_mapping = {};
var options = {};

program.args.forEach(function(arg) {
  var x = arg.split(':');
  if (x.length !== 2) {
    console.error('Arguments must be in the form src:dst, not ' + arg);
    process.exit(1);
  }
  directory_mapping[x[0]] = x[1];
});

console.log('Running babel compilation with config:\n' + JSON.stringify(config, null, 2));

babel.transformDirMapSync(directory_mapping, config);
