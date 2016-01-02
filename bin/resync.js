#!/usr/bin/env node

'use strict';

const fs = require('fs');
const log = require('../lib/log');
const chalk = require('chalk');
const adjust = require('../lib/adjust');
const path = require('path');

const charset = 'utf-8';

const beginFrom = Number(process.argv[2]);
const beginTo = Number(process.argv[3]);
const delta = Number(process.argv[4]);
const files = process.argv.slice(5);

files.forEach(file => {
  log.info('Read [%s]', chalk.blue(file));
  const content = fs.readFileSync(file, charset);
  const adjusted = adjust(
    content,
    begin => (beginFrom <= begin && begin <= beginTo) ? delta : 0
  );
  const stat = path.parse(file);
  const fileOutput = stat.name + '[resynced]' + stat.ext;
  log.info('Write [%s]', chalk.blue(fileOutput));
  fs.writeFileSync(fileOutput, adjusted, charset);
});
