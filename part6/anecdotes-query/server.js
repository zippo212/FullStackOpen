import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST' && req.body.content.length < 5) {
    return res.status(400).json({ error: 'to short anecdote, must be at least 5 characters' })
  }
  // Continue to JSON Server router
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
