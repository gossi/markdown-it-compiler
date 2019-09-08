'use strict';

const fm = require('front-matter');
const MarkdownIt = require('markdown-it');
const toc = require('markdown-toc');

class MarkdownItCompiler {
  constructor(config) {
    this.config = config;

    const preset = config.preset || 'default';
    const md = new MarkdownIt(preset, config.options);

    const plugins = config.plugins || [];

    for (let plugin of plugins) {
      if (typeof plugin === 'string') {
        plugin = [plugin];
      }

      plugin[0] = require(plugin[0]);
      md.use(...plugin);
    }

    if (config.configure) {
      config.configure(md);
    }

    this.md = md;
  }

  compile(source) {
    const content = fm(source);

    let html = this.md.render(content.body);

    content.html = html;
    content.toc = toc(content.body).json;

    if (this.config.format) {
      html = this.config.format(content);
    }
    return html;
  }
}

module.exports = MarkdownItCompiler;
