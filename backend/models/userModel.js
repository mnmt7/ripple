const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  role: {
    type: String,
    enum: ['creator', 'brand'],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.passwordChangedAt = Date.now();
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.methods.changedPasswordAfter = function (
  passwordChangedAt,
  JWTTimestamp,
) {
  const changedTimestamp = parseInt(passwordChangedAt.getTime() / 1000, 10);

  return changedTimestamp > JWTTimestamp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
