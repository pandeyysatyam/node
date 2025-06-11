const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });
userSchema.methods.changePassword = async function (newPassword) {
  this.password = newPassword;
  await this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
