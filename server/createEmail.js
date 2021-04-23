const fs = require('fs');
const Path = require('path');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const { ServerStyleSheet } = require('styled-components');
var inlineCss = require('inline-css');

/**
 *
 * Get the file from a relative path
 * @param {String} relativePath
 * @return {Promise.<string>}
 */
function getFile(relativePath) {
  return new Promise((resolve, reject) => {
    const path = Path.join(__dirname, relativePath);

    return fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    });
  });
}

/**
 * Renders the React app with the passed data.
 * Returns a promise that resolves to the full email HTML.
 * @param {Object} data
 * @return {Promise.<String>}
 */

async function createEmail(TEMPLATES, options) {
  let defaulteTemplate;

  if (!options.emailTemplatePathName.includes('<head>')) {
    const [template] = await Promise.all([
      getFile(options.emailTemplatePathName),
    ]);
    defaulteTemplate = template;
  }
  defaulteTemplate = options.emailTemplatePathName;

  const result = TEMPLATES.map(async emailTemplate => {
    const emailElement = React.createElement(emailTemplate.component);
    const sheet = new ServerStyleSheet();
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(emailElement)
    );

    const styleTags = sheet.getStyleTags();
    console.log(styleTags);
    const x = { url: 'xxx' };

    const content = await new Promise(resolve => {
      inlineCss(html + styleTags, x).then(function (html) {
        resolve(html);
      });
    });

    let emailHTML = defaulteTemplate;

    emailHTML = emailHTML.replace(options.emailTemplateContentTag, content);

    emailTemplate.headInsertionString = emailTemplate.headInsertionString
      ? emailTemplate.headInsertionString
      : '';

    emailHTML = emailHTML.replace(
      options.headInsertionTag,
      emailTemplate.headInsertionString
    );
    /* emailHTML = emailHTML.replace(options.emailTemplateStyleTag, style); */
    /* const content = ReactDOMServer.renderToStaticMarkup(emailElement); */

    // Replace the template tags with the content

    return { fileName: emailTemplate.fileName, emailHTML: emailHTML };
  });
  return await Promise.all(result);
}

module.exports = createEmail;
