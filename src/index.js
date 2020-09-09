import { createFilter } from '@rollup/pluginutils';
import { visit, types, print } from 'recast';

export default function noExportNamedDefaultFrom(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'no-export-named-default-from',
    renderChunk(code, chuck) {
      const id = chuck.fileName;
      if (!filter(id)) return null;

      let ast = null;
      try {
        ast = this.parse(code);
      } catch (err) {
        this.warn({
          code: 'PARSE_ERROR',
          message: `rollup-plugin-no-export-named-default-from: failed to parse ${id}.`
        });
      }
      if (!ast) {
        return null;
      }

      let flag, spec;

      visit(ast, {
        visitExportNamedDeclaration(path) {
          if (path.node.source) {
            spec = path.node.specifiers.find((value) => value.exported.name == 'default')
            if (spec) {
              flag = path.node;
            }
          }
          return false;
        }
      });

      if (!flag) return null;

      const b = types.builders;

      flag.specifiers.splice(flag.specifiers.indexOf(spec), 1);
      if (flag.specifiers.length == 0) {
        ast.body.splice(ast.body.indexOf(flag), 1);
      }
      ast.body.push(b.importDeclaration([b.importSpecifier(b.identifier(spec.local.name))], b.literal(flag.source.value)));
      ast.body.push(b.exportDefaultDeclaration(b.identifier(spec.local.name)));

      const res = print(ast);

      return {
        code: res.code,
        map: res.map
      };
    }
  }
}
