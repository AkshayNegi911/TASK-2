const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const Task2 = mongoose.model("Task2", UserSchema);

module.exports = Task2;
