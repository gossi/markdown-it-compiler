import MarkdownIt from 'markdown-it';

type PluginDescriptor = string | [string, object];

export interface MarkdownDocument {
  attributes: Record<string, unknown>;
  toc: Array<{ content: string; slug: string; level: number }>;
  body: string;
  html: string;
}

export interface MarkdownItCompilerConfig {
  /**
   * Select markdown flavor
   */
  preset?:  'commonmark' | 'default' | 'zero';
  /**
   * MarkdownIt Options
   * 
   * {@link https://markdown-it.github.io/markdown-it/#MarkdownIt.new}
   */
  options?: MarkdownIt.Options;

  /**
   * A list of plugins to load into `markdown-it`
   */
  plugins?: PluginDescriptor[];

  /** 
   * Manual configuration with used markdown-it instance
   */
  configure?: (md: MarkdownIt) => void;

  /**
   * Format the HTML based on information of the whole document
   */
  format?: (doc: MarkdownDocument) => string | object;
}

export default class MarkdownItCompiler { 
  constructor(config: MarkdownItCompilerConfig);

  compile(source: string): MarkdownDocument;
}