'use strict';

const adjustFile = require('./adjust-file');

module.exports = (files, adjuster) => files.forEach(file => adjustFile(file, adjuster));
