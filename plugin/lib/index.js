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
    create: function(context) {
      return {
        Program(node) {
          node.body
            .filter(no => no.type === 'ImportDeclaration')
            .forEach((imp, ind, ar) => {
              if (imp && ind < ar.length - 1) {
                if (imp.end - imp.start > ar[ind + 1].end - ar[ind + 1].start) {
                  context.report(imp, 'Swap import with next one');
                }
              }
            });
        },
      };
    },
  },
};
