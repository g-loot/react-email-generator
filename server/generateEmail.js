const fs = require('fs');
const createEmail = require('./createEmail');

function saveEmail(email, FILE_NAME = 'test', options) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${options.path}/${FILE_NAME}.html`, email, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

/* 
emails contains emailHTML and fileName
*/
const defaultOptions = {
  path: 'templates',
  emailTemplatePathName: './email.html',
  emailTemplateContentTag: '%CONTENT%',
  emailTemplateStyleTag: '%STYLE%',
  emailStylePathName: './src/inlined.css',
};
function ReactToHtml(TEMPLATES = [], options = {}) {
  const combinedOptions = { ...defaultOptions, ...options };
  return createEmail(TEMPLATES, combinedOptions).then(emails =>
    emails.forEach(email => {
      saveEmail(email.emailHTML, email.fileName, combinedOptions);
    })
  );
}

module.exports = { ReactToHtml };
