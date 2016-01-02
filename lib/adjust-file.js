'use strict';

const log = require('./log');
const chalk = require('chalk');
const fio = require('./fio');
const adjust = require('./adjust');
const path = require('path');

module.exports = (file, adjuster) => {
  log.info('Reading [%s]...', chalk.blue(file));
  const content = fio.read(file);
  log.info('Done. Adjusting...');
  const adjusted = adjust(content, adjuster);
  const stat = path.parse(file);
  const fileOutput = stat.name + '[resynced]' + stat.ext;
  log.info('Done. Writing [%s]...', chalk.blue(fileOutput));
  fio.write(fileOutput, adjusted);
  log.info('Done.');
};
