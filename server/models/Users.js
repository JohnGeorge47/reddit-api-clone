import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
let SALT_WORK_FACTOR = 10;
mongoose.Promise = global.Promise;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [4, "Username should be atleast 4 characters long"]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be atleast 8 characters long"]
  }
});

userSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
export default User;
