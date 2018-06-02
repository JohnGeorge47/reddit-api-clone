import mongoose from "mongoose";
const { Schema } = mongoose;

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
const User = mongoose.model("User", userSchema);
export default User;
