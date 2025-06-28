import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Exclude password from queries by default
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    },
    profilePicture: {
        public_id: {
            type: String,
            required: [true, 'Profile picture public ID is required']
        },
        url: {
            type: String,
            required: [true, 'Profile picture URL is required']
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    resume:{
        public_id: {
            type: String,
            required: [true, 'Resume public ID is required']
        },
        url: {
            type: String,
            required: [true, 'Resume URL is required']
        }
    }
});

//for Hash the user password before save ----------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});


//for Compare user enterpassword to hash password------
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


//for Generating Json Web token----------------
UserSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export default model('User', UserSchema);
