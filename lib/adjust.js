'use strict';

const log = require('./log');
const chalk = require('chalk');

const time2int = s => Number(s.substr(0, 1)) * 3600 + Number(s.substr(2, 2)) * 60 + Number(s.substr(5));

const lfill = (s, width, fillwith) => (s.length >= width ? '' : (fillwith || '0').repeat(width - s.length)) + s;

const fr = (n, div, width) => lfill(Math.floor(n / div).toString(), width || 2);

const int2time = n => fr(n, 3600, 1) + ':' + fr(n % 3600, 60) + ':' + lfill((n % 60).toFixed(2), 5);

module.exports = (content, adjuster) => {
  return content.replace(/(^[a-z]+: \d,)(\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,2}),(\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,2}),/gmi, (rawWhole, rawBefore, sBegin, sEnd) => {
    let iBegin = time2int(sBegin);
    let iEnd = time2int(sEnd);
    const iAdjust = adjuster(iBegin, iEnd);
    log.trace('[%s -> %s] as [%s -> %s] move %s', chalk.red(sBegin), chalk.red(sEnd), chalk.blue(iBegin), chalk.blue(iEnd), chalk.green(iAdjust));
    if (iAdjust === 0) {
      return rawWhole;
    }
    return rawBefore + int2time(iBegin + iAdjust) + ',' + int2time(iEnd + iAdjust) + ',';
  });
};
