const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const commentController = require('../controller/comment')

// create a comment
router.post('/', async (req, res) => {
	try {
		console.log('request received to create comment')
		const { content, userId, postId } = req.body
		if (!content) {
			return res.status(400).json({ message: 'Please provide content' })
		}
		if (!userId) {
			return res.status(400).json({ message: 'Please provide userId' })
		}
		if (!postId) {
			return res.status(400).json({ message: 'Please provide postId' })
		}
		const comment = await commentController.createComment(
			content,
			userId,
			postId
		)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error while creating comment: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get all comments
router.get('/', async (req, res) => {
	try {
		const comments = await commentController.getAllComments()
		return res.status(200).json(comments)
	} catch (error) {
		console.log(`error while fetching all comments: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get a comment by commentId
router.get('/:commentId', async (req, res) => {
	try {
		const commentId = req.params.commentId
		if (!commentId) {
			return res.status(400).json({ message: 'Please provide commentId' })
		}
		const comment = await commentController.getCommentById(commentId)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error while fethcing a comment: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get all comments by postId
router.get('/:postId/commentsByPostId', async (req, res) => {
	try {
		const postId = req.params.postId
		if (!postId) {
			return res.status(400).json({ message: 'Please provide postId' })
		}
		const comments = await commentController.getCommentsByPostId(postId)
		return res.status(200).json(comments)
	} catch (error) {
		console.log(`error while fetching all comments by postId: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get all comments by userId
router.get('/:userId/commentsByUserId', async (req, res) => {
	try {
		const userId = req.params.userId
		if (!userId) {
			return res.status(400).json({ message: 'Please provide userId' })
		}
		const comments = await commentController.getCommentsByUserId(userId)
		return res.status(200).json(comments)
	} catch (error) {
		console.log(`error while fetching all comments by userId: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// update comment
router.patch('/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide id' })
		}
		const comment = await commentController.updateComment(id, req.body)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

router.delete('/:id', async (req, res) => {
	try {
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// like a comment by id
router.patch('/like/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide id' })
		}
		const { likedByUser } = req.body
		if (!likedByUser) {
			return res.status(400).json({ message: 'Please provide likedByUser' })
		}
		const comment = await commentController.likeComment(id, likedByUser)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// dilike a comment by id
router.patch('/dislike/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide id' })
		}
		const { dislikedByUser } = req.body
		if (!dislikedByUser) {
			return res.status(400).json({ message: 'Please provide dislikedByUser' })
		}
		const comment = await commentController.dislikeComment(id, dislikedByUser)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// reply on a comment by id
router.put('/reply/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide id' })
		}
		const { content, userId, postId } = req.body
		if (!content) {
			return res.status(400).json({ message: 'Please provide content' })
		}
		if (!userId) {
			return res.status(400).json({ message: 'Please provide userId' })
		}
		if (!postId) {
			return res.status(400).json({ message: 'Please provide postId' })
		}
		const comment = await commentController.replyComment(
			id,
			content,
			userId,
			postId
		)
		return res.status(200).json(comment)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

module.exports = router
