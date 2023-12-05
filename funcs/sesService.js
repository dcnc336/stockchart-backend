const AWS_SES = require('./sesConnect');

const sendEmail = (recipientEmail, passcode, username) => {
    let params = {
      Source: 'superadmin@klustering.io',
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<h2>Welcome ${username}</h2><p>Here is passcode. ${passcode}</p></br>
                  <span> Shoot us a message at info@presswashing.io to share your feedback.</span>
            `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Here is passcode from Caudill Pressure Washing`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = sendEmail;