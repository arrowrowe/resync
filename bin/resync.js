#!/usr/bin/env node

'use strict';

const resync = require('../index');

const option = require('command-line-args')([
  {name: 'verbose', alias: 'v', type: Boolean, defaultValue: false},
  {name: 'charset', alias: 'c', type: String, defaultValue: 'utf-8'},
  {name: 'from', alias: 'f', type: Number, defaultValue: -Infinity},
  {name: 'to', alias: 't', type: Number, defaultValue: Infinity},
  {name: 'delta', alias: 'd', type: Number},
  {name: 'src', type: String, multiple: true, defaultOption: true}
]).parse();

resync.fio.charset = option.charset;
resync.log.setLevel(option.verbose ? 'trace' : 'info');

resync.log.info('Launch with charset=%s, adjust [%d, %d] with %d for %j', option.charset, option.from, option.to, option.delta, option.src);

resync.adjustFiles(option.src, begin => (option.from <= begin && begin <= option.to) ? option.delta : 0);
