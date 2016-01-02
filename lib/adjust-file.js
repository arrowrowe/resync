'use strict';

const log = require('./log');
const chalk = require('chalk');
const fs = require('fs');
const adjust = require('./adjust');
const path = require('path');

const charset = 'utf-8';

module.exports = (file, adjuster) => {
  log.info('Reading [%s]...', chalk.blue(file));
  const content = fs.readFileSync(file, charset);
  log.info('Done. Adjusting...');
  const adjusted = adjust(content, adjuster);
  const stat = path.parse(file);
  const fileOutput = stat.name + '[resynced]' + stat.ext;
  log.info('Done. Writing [%s]...', chalk.blue(fileOutput));
  fs.writeFileSync(fileOutput, adjusted, charset);
  log.info('Done.');
};
