import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'rollup';

export interface RollNoExportNamedDefaultFromOptions {
  /**
   * A minimatch pattern, or array of patterns, of files that should be
   * processed by this plugin (if omitted, all files are included by default)
   */
  include?: FilterPattern;
  /**
   * Files that should be excluded, if `include` is otherwise too permissive.
   */
  exclude?: FilterPattern;
}

/**
 * Avoid export named default from.
 */
export default function noExportNamedDefaultFrom(options?: RollNoExportNamedDefaultFromOptions): Plugin;
