const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(

  
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    imageUrl:String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },
  {
    username: {
      type: String,
      require:'Your Username'
      }
    }
);

const User = model("User", userSchema);

module.exports = User;
