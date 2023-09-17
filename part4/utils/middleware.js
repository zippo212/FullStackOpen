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
  const decodedToken = jwt.verify(tokenExtractor(request), process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  userExtractor,
}
