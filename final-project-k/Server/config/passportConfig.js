// @ts-nocheck

const passport = require('passport'),
      localStrategy = require('passport-local').Strategy,
      mongoose = require('mongoose');

let Member = mongoose.model('Member');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Member.findOne({ email: username },
                (err, member) => {
                    if (err)
                        return done(err);
                    // unknown member
                    else if (!member)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!member.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, member);
                });
        }) 
);