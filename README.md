# project-management-server

project module
  type: String,
  contact: String,
  location: String,
  description: String,
  imageUrl: String,
task module
  type: String,
  contact: String,
  location: String,
  description: String
user module
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
    
    
auth route
task route
user route


