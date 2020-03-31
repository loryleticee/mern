import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';

const personSchema = new Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', function (next) {
  let person = this;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(person.password, salt, function (err, hash) {
      person.password = hash;
      next();
    });
  });
});

export default personSchema;
