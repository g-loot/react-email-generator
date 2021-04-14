# React to html-template

Node script to server side render your react component into a html file locally. That can be used for example email building.

Supports [styled-components](https://styled-components.com/) use and turns the styling into inline style.

## Short example

```
const { ReactToHtml } = require("@g-loot/react-email-generator");

/*
    Your imports for the components
*/

const TEMPLATES = [
    { fileName: "deposit-confirmation", component: depositConfirmation },
    { fileName: "withdrawal-confirmation", component: withdrawalConfirmation },
];

const options = {
    path: "templates",
    emailTemplatePathName: "./email.html",
    emailTemplateContentTag: "%CONTENT%",
    emailTemplateStyleTag: "%STYLE%",
    emailStylePathName: "./src/inlined.css",
};

ReactToHtml(TEMPLATES, options)
```

## Installation

Install this npm package:
`npm i @g-loot/react-email-generator

In your code:

```
const { ReactToHtml } = require("@g-loot/react-email-generator");
```

## Api

### ReactToHtml(component, options)

#### options.path

Type: 'String'
Default: './'

Target folder to save the generated files to

#### options.emailTemplateContentTag

Type: 'String'
Default: '%CONTENT%'

Identifier where to target the generated content.

#### options.emailTemplateStyleTag

Type: 'String'
Default: '%STYLE'

Identifier where to target the generated styles.

#### options.emailStylePathName

Coming soon. Provide css files to be embedded in <head></head>

#### options.emailTemplatePathName
