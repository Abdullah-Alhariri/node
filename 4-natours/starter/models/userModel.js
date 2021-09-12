const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide us your password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async (Cpassword, Upassword) =>
  await bcrypt.compare(Cpassword, Upassword);

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) return JWTTimestamp < parseInt(this.passwordChangedAt.getTime() / 1000, 10);
};

userSchema.methods.createPasswordResetoken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Random digits (send to the email)
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex"); // Random digits in databased (fully hashed) for compairing it with the "resetToken"
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log({
    resetToken,
    passwordResetToken: this.passwordResetToken,
    passwordResetExpires: this.passwordResetExpires,
    now: new Date(),
  });

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
