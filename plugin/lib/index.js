/**
 * @fileoverview This plugin sort detect import length to be sorted
 * @author Igor Brasileiro
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
  'import-sort': {
    meta: {
      fixable: 'code',
    },
    create: function(context) {
      return {
        Program(node) {
          node.body
            .filter(no => no.type === 'ImportDeclaration')
            .forEach((currentNode, ind, ar) => {
              if (currentNode && ind < ar.length - 1) {
                const auxNode = ar[ind + 1];
                if (currentNode.end - currentNode.start > auxNode.end - auxNode.start) {
                  context.report({
                    node: currentNode,
                    message: 'Swap import with next one',
                    fix: function(fixer) {
                      const sourceCode = context.getSourceCode();
                      const currentImportCode = sourceCode.getText(currentNode);
                      const auxNodeCode = sourceCode.getText(auxNode);
                      const newImport = auxNodeCode.concat('\n').concat(currentImportCode);
                      return fixer.replaceTextRange([currentNode.start, auxNode.end], newImport);
                    },
                  });
                }
              }
            });
        },
      };
    },
  },
};
