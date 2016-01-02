#!/usr/bin/env node

'use strict';

const resync = require('../index');

const beginFrom = Number(process.argv[2]);
const beginTo = Number(process.argv[3]);
const delta = Number(process.argv[4]);
const files = process.argv.slice(5);

resync.adjustFiles(files, begin => (beginFrom <= begin && begin <= beginTo) ? delta : 0);
