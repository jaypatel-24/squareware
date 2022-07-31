const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema(
	{
		title: { type: String },
		content: { type: String },
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		//comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
	},
	{ timestamp: true }
)

module.exports = mongoose.model('post', PostSchema)
