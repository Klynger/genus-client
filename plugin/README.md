# eslint-plugin-sort-import-length

This plugin sort detect import length to be sorted

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-import-length`:

```
$ npm install eslint-plugin-sort-import-length --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-sort-import-length` globally.

## Usage

Add `sort-import-length` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sort-import-length"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "sort-import-length/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





