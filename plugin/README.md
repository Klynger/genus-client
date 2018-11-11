# eslint-plugin-genus

This plugin sort detect import length to be sorted

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-genus`:

**OBS**: this plugin isn't yet at npm

```
$ npm install eslint-plugin-genus --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-genus` globally.

## Usage

Add `eslint-plugin-genus` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-plugin-genus"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "genus/import-sort": "error"
    }
}
```

## Rule Example
* Import Sort: this rule requires that import declarations be ordered by the size of the import declaration

Example 1:
```
// Bad
import foo from 'xbto'; // length 23
import bar from 'bar'; // length 22

// Good
import bar from 'bar'; // length 22
import foo from 'xbto'; // length 23

```  

Example 2:
```
// Bad
import Xbto, {
    foo,
    bar,
    foobar
} from 'xbto'; // length 58
import bar from 'bar'; // length 22

// Good
import bar from 'bar'; // length 22
import Xbto, {
    foo,
    bar,
    foobar
} from 'xbto'; // length 58

```
