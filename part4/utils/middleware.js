const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const tokenExtractor = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(tokenExtractor(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).send({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).send({ error: "invalid token" })
    }
    request.user = user
  } catch (err) {
    next(err)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" })
  }
  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  userExtractor,
  errorHandler,
}
