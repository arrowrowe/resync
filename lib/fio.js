const fs = require('fs');
const iconv = require('iconv-lite');

module.exports = {
  charset: 'utf-8',
  read: function (file) {
    return iconv.decode(fs.readFileSync(file), this.charset);
  },
  write: function (file, data) {
    fs.writeFileSync(file, iconv.encode(data, this.charset));
  }
};
