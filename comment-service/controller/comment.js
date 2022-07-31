const { InternalServerError } = require('../errors/error')
const Comment = require('../models/comment')

const createComment = async (content, userId, postId) => {
	try {
		console.log(`creating comment in controller`)
		const comment = new Comment({
			content,
			user: userId,
			post: postId,
			replies: [],
			likes: [],
			dislikes: [],
		})
		await comment.save()
		console.log(`comment created in db`)
		return comment
	} catch (error) {
		console.log(`error while creating comment: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const getAllComments = async () => {
	try {
		console.log(`getting all comments in controller`)
		const comments = await Comment.find()
		console.log(`fetched all comments`)
		return comments
	} catch (error) {
		console.log(`error while getting all comments: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const getCommentById = async (commentId) => {
	try {
		console.log(`getting comment by id in controller`)
		const comment = await Comment.findById(commentId)
		console.log(`fetched comment by id`)
		return comment
	} catch (error) {
		console.log(`error while getting comment by id: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const getCommentsByPostId = (postId) => {
	try {
		console.log(`getting comment by post id in controller`)
		const comment = Comment.find({ post: postId })
		console.log(`fetched comment by post id`)
		return comment
	} catch (error) {
		console.log(`error while getting comment by post id: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const getCommentsByUserId = async (userId) => {
	try {
		console.log(`getting comment by user id in controller`)
		const comment = await Comment.find({ user: userId })
		console.log(`fetched comment by user id`)
		return comment
	} catch (error) {
		console.log(`error while getting comment by user id: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const updateComment = (commentId, updateObj) => {
	try {
		console.log(`updating comment in controller`)
		const comment = Comment.findByIdAndUpdate(commentId, updateObj)
		console.log(`comment updated`)
		return comment
	} catch (error) {
		console.log(`error while updating comment: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const likeComment = async (id, likedByUser) => {
	try {
		console.log(`liking comment in controller`)
		const comment = await Comment.findById(id)
		if (comment.dislikes.indexOf(likedByUser) > -1) {
			comment.dislikes.splice(comment.dislikes.indexOf(likedByUser), 1)
		}
		comment.likes.push(likedByUser)
		await comment.save()
		console.log(`comment liked`)
		return comment
	} catch (error) {
		console.log(`error while liking comment: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const dislikeComment = async (id, dislikedByUser) => {
	try {
		console.log(`disliking comment in controller`)
		const comment = await Comment.findById(id)
		if (comment.likes.indexOf(dislikedByUser) > -1) {
			comment.likes.splice(comment.likes.indexOf(dislikedByUser), 1)
		}
		comment.dislikes.push(dislikedByUser)
		await comment.save()
		console.log(`comment disliked`)
		return comment
	} catch (error) {
		console.log(`error while disliking comment: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

const replyComment = async (id, content, userId, postId) => {
	try {
		console.log(`creating reply comment`)
		const replyComment = new Comment({
			content,
			user: userId,
			post: postId,
			replies: [],
			likes: [],
			dislikes: [],
		})

		await replyComment.save()
		console.log(`reply comment created`)

		console.log(`posting reply on existing comment`)
		const comment = await Comment.findById(id)
		comment.replies.push(replyComment._id)
		await comment.save()
		console.log(`reply posted on existing comment`)
		return comment
	} catch (error) {
		console.log(`error while replying comment: ${error.message}`)
		throw new InternalServerError(error.message)
	}
}

module.exports = {
	createComment,
	getAllComments,
	getCommentById,
	getCommentsByPostId,
	getCommentsByUserId,
	updateComment,
	likeComment,
	dislikeComment,
	replyComment,
}
