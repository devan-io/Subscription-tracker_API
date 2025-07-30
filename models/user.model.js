import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: [true, "User's name is required"],
		trim: true,
		minLength: 3,
		maxLength: 50
	},
	email: {
		type: String,
		required: [true, "User's email is required"],
		unique: true,
		lowercase: true,
		trim: true,
		match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
	},
	password: {
		type: String,
		required: [true, "User's password is required"],
		minLength: 6,
		select: false // Exclude password from query results by default
	}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);


export default User;