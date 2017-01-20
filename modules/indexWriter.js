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

  generateScriptTag (scriptPath) {
    return `<script src="${scriptPath}"></script>\n`;
  }

  addHotReloadScript () {
    this.indexContent = fs.readFileSync(this.path, 'utf8');
    let socketIO = this.generateScriptTag('/socket.io/socket.io.js'),
        hotReloadScript = this.generateScriptTag('/scripts/hot-reload-client.js'),
        position = this.indexContent.indexOf('</body>');

    this.indexContent = this.indexContent.substr(0, position) + socketIO + hotReloadScript + this.indexContent.substr(position)
  }
}
