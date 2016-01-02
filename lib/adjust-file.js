'use strict';

const log = require('./log');
const chalk = require('chalk');
const fs = require('fs');
const adjust = require('./adjust');
const path = require('path');

const charset = 'win1251';
const iconv = require('iconv-lite');
const read = file => iconv.decode(fs.readFileSync(file), charset);
const write = (file, data) => fs.writeFileSync(file, iconv.encode(data, charset));

module.exports = (file, adjuster) => {
  log.info('Reading [%s]...', chalk.blue(file));
  const content = read(file);
  log.info('Done. Adjusting...');
  const adjusted = adjust(content, adjuster);
  const stat = path.parse(file);
  const fileOutput = stat.name + '[resynced]' + stat.ext;
  log.info('Done. Writing [%s]...', chalk.blue(fileOutput));
  write(fileOutput, adjusted);
  log.info('Done.');
};
