# React to html-template

Node script to server side render your react component into a html file locally. That can be used for example email building.
Supports [styled-components](https://styled-components.com/) use and turns the styling into inline style.

## Short example

```js
const { ReactToHtml } = require(‘@g-loot/react-email-generator’);
/*
    Your imports for the components
*/
const TEMPLATES = [
  { fileName: ‘deposit-confirmation’, component: depositConfirmation },
  { fileName: ‘withdrawal-confirmation’, component: withdrawalConfirmation },
];
const options = {
  path: ‘templates’,
  styledComponents: true,
  emailTemplatePathName: ‘./email.html’,
  emailTemplateContentTag: ‘%CONTENT%‘,
  emailTemplateStyleTag: ‘%STYLE%‘,
  emailStylePathName: ‘./src/inlined.css’,
};
ReactToHtml(TEMPLATES, options);
```

## Installation

Install this npm package:
`npm i @g-loot/react-email-generator
In your code:

```js
const { ReactToHtml } = require(‘@g-loot/react-email-generator’);
```

## Api

### ReactToHtml(TEMPLATES, options)

`*` Features coming soon
| templates :[{}] | type | default | required | description |
| ----------------- | --------- | ------- | -------- | -------------------------------- |
| fileName | `String` | `“”` | `Yes` | Name of the generate file |
| component | `String` | `null` | `Yes` | JS bundled React component |
| \* componentStyle | `unknown` | `null` | `No` | Css file to be generated in head |

| options                            | Type     | default     | required | description                                       |
| ---------------------------------- | -------- | ----------- | -------- | ------------------------------------------------- |
| options.path                       | `String` | `./`        | `Yes`    | Target folder to save the generated files to      |
| \* options.styledComponents        | `Bool`   | `false`     | `No`     |                                                   |
| \* options.emailTemplatePathName   | `???`    | `???`       |          | Provide your own html-template                    |
| \* options.emailStylePathName      | `???`    | `???`       |          | Provide css files to be embedded in <head></head> |
| \* options.emailTemplateContentTag | `???`    | `%CONTENT%` |          | Identifier where to target the generated content. |
| \* options.emailTemplateStyleTag   | `???`    | `%STYLE%`   |          | Identifier where to target the generated styles.  |

## Extended example

Check out payments email repository
