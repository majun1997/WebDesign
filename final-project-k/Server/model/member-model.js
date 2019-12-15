'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt');

//mongodb schema
var memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name can\'t be empty'
  },
  email: {
    type: String,
    required: 'Email can\'t be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
    minLength: [6, 'Password must be at least 6 character long']
  },
  bio:{
    type: String,
  },
  location:{
    type: String,
  },
  //TODO:change url to local store
  profileImg: {
    type: String,
  },
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork'
    }
  ],
  liked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork'
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork'
    }
  ],
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Member'
    }
  ],
  following: [
    {
      type:Schema.Types.ObjectId,
      ref: 'Member'
    }
  ],
},{
  versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
memberSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
memberSchema.set('toJSON', {
  virtuals: true
});

//TODO: add email validation

//password verify and jwt
memberSchema.methods.verifyPassword = function(to_check_password){
  return bcrypt.compareSync(to_check_password, this.password);
}

/**
 *
 *
 * @returns
 */
memberSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id },
    "SECRET#123",
  {
      expiresIn: "60m",
  }
  );
}


module.exports = mongoose.model('Member', memberSchema);