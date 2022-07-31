class BadRequestError extends Error {
	constructor(message) {
		super(message)
		this.statusCode = 400
		this.isOperational = true
		Error.captureStackTrace(this, this.constructor)
	}
}

class InternalServerError extends Error {
	constructor(message) {
		super(message)
		this.statusCode = 500
		this.isOperational = true
		Error.captureStackTrace(this, this.constructor)
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message)
		this.statusCode = 404
		this.isOperational = true
		Error.captureStackTrace(this, this.constructor)
	}
}

module.exports = {
	BadRequestError: BadRequestError,
	InternalServerError: InternalServerError,
	NotFoundError: NotFoundError,
}
