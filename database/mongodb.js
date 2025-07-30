import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../Subscription-tracker_API/config/env.js';

if(!DB_URI) {
	throw new Error('Please provide a valid DB_URI  under the .env.development/production.local');
}

const connectToDatabase = async () => {
	try{
		await mongoose.connect(DB_URI);
		console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
	} catch (error){
		console.error('Error connecting to the database:', error);
		process.exit(1);
	}
}

export default connectToDatabase;