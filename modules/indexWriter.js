const fs = require('fs')

module.exports = class indexWriter {
  constructor(indexFilePath) {
    this.path = indexFilePath;
    this.addHotReloadScript();
  }

  getIndexContent () {
    this.addHotReloadScript()
    return this.indexContent;
  }

  addHotReloadScript () {
    this.indexContent = fs.readFileSync(this.path, 'utf8');
    let socketIO = '<script src="/socket.io/socket.io.js"></script>\n',
        script = socketIO + '<script src="/scripts/hot-reload-client.js"></script>\n',
        position = this.indexContent.indexOf('</body>');

    this.indexContent = this.indexContent.substr(0, position) + script + this.indexContent.substr(position)
  }
}
