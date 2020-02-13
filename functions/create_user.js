const admin = require('firebase-admin');

module.exports = (req, res) => {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad input' });
  }

  // Format the phone number by replace any non-digits by ''
  // make sure phone is a string as replace cannot be called w/ a number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // Create a new user account using that phone number
  admin
    .auth()
    .createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  // Respond to the user request, saying the account was made
};
