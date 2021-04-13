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
function ReactToHtml(TEMPLATES = [], options = {}) {
  return createEmail(TEMPLATES, options).then(emails =>
    emails.forEach(email => {
      saveEmail(email.emailHTML, email.fileName, options);
    })
  );
}

module.exports = { ReactToHtml };
