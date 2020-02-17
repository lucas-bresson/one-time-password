const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body).replace(/[^\d]/g, '');

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      return twilio.messages.create(
        {
          body: `Your code is {code}`,
          to: phone,
          from: '+16017214074',
        },
        err => {
          if (err) {
            return res.state(422).send(err);
          }

          return admin
            .database()
            .ref('users/' + phone)
            .update({ code, codeValid: true }, () => {
              res.send({ success: true });
            });
        },
      );
    })
    .catch(err => {
      // res.status(422).send({ error: 'User not found' });
      res.status(422).send({ error: err });
    });
};
