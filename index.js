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
    const doc = fm(source);

    let html = this.md.render(doc.body);

    doc.html = html;
    doc.toc = toc(doc.body).json;

    if (this.config.format) {
      doc.html = this.config.format(doc);
    }

    return doc;
  }
}

module.exports = MarkdownItCompiler;
