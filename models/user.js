import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.set('toJSON', {
  transform: function (doc, json) {
    delete json.password;
  },
  virtuals: true
});

userSchema.virtual('passwordConfirmation').set(function (fieldValue) {
  this._passwordConfirmation = fieldValue;
});

userSchema.virtual('posts', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'addedBy'
});

userSchema.pre('validate', function (next) {
  if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Passwords do not match.');
  }
  next();
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

userSchema.methods.validatePassword = function (passwordText) {
  return bcrypt.compareSync(passwordText, this.password);
};

export default mongoose.model('User', userSchema);
