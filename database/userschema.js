const mongoose = require('mongoose');

  const { Schema } = mongoose;
  const userSchema = new Schema({
    userid: String,
    first_name:  String, // String is shorthand for {type: String}
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: String  
  });

  module.exports = userSchema;