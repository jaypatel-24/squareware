const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, index: true, unique: true },
		friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
		location: {
			type: { type: String },
			coordinates: [Number],
		},
	},
	{ timestamp: true }
)

module.exports = mongoose.model('user', UserSchema)
