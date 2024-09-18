import mongoose from "mongoose";

const schema = mongoose.Schema;
const UsersSchema = new schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required : true,
  },
});
const Users = mongoose.model("Users", UsersSchema);
export default Users;