const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema(
	{
		content: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
		replies: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
		likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
		dislikes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	},
	{ timestamp: true }
)

module.exports = mongoose.model('comment', CommentSchema)
