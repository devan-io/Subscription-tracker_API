import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Subscription name is required"],
		trim: true,
		minLength: 3,
		maxLength: 100
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: true
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
		min: 0
	},
	frequency: {
		type: String,
		enum: ['daily', 'weekly' , 'monthly', 'yearly'],
		required: [true, "Frequency is required"]
	},
	category: {
		type: String,
		enum: ['sports', 'news', 'lifestyle', 'technology', 'entertainment', 'utilities', 'food', 'health', 'other'],
		default: 'other'
	},
	paymentMethod: {
		type: String,
		enum: ['Credit Card', 'Debit Card', 'Paypal', 'NEFT', 'UPI', 'Cash'],
		required: [true, "Payment method is required"]
	},
	status: {
		type: String,
		enum: ['active', 'inactive', 'cancelled'],
		default: 'active'
	},
	startDate:  {
		type: Date,
		required: [true, "Start date is required"],
		validate:{
			validator: (value) => value <= new Date(),
			message: "Start date cannot be in the future"
		}
	},
	renewalDate:  {
		type: Date,
		validate:{
			validator: function (value) {
				return value > this.startDate;
			},
			message: "Renewal date must be after the start date"
		}
	}

}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
	if(!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
	}
	if(this.renewalDate < new Date()) {
		this.status = 'inactive';
	}

	next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;