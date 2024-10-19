const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  user.passwordChangedAt = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  createAndSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    '+password',
  );

  if (
    !user ||
    !(await user.isCorrectPassword(req.body.password, user.password))
  ) {
    return next(new AppError('Email or password is wrong', 401));
  }

  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordOld, passwordNew } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.isCorrectPassword(passwordOld, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = passwordNew;
  await user.save();

  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!'));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('+passwordChangedAt');

  if (!user) {
    return next(
      new AppError('User belonging to this token no longer exist', 401),
    );
  }

  if (user.changedPasswordAfter(user.passwordChangedAt, decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please login again!', 401),
    );
  }

  user.changedPasswordAfter = undefined;
  req.user = user;

  next();
});
