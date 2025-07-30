import express from 'express';
import {PORT} from './Subscription-tracker_API/config/env.js';
import userRouter from './Subscription-tracker_API/routes/user.routes.js';
import authRouter from './Subscription-tracker_API/routes/auth.routes.js';
import subscriptionRouter from './Subscription-tracker_API/routes/subscription.routes.js';
import connectToDatabase from './Subscription-tracker_API/database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the Subscription tracker API!');
});

app.listen(PORT, async() => {
	console.log(`Server is running on http://localhost:${PORT}`);
	await connectToDatabase();
});

export default app;