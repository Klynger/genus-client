const rule = require('./index').rules['import-sort'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('import-sort', rule, {
  valid: [],
  invalid: [
    {
      code: "import { as } from 'fs'; import { bs } from 'fss'; import b from 'fs';",
      errors: [{ message: 'Swap import with next one' }],
    },
  ],
});
