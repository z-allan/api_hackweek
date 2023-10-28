const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const JSON_FILE = path.join(__dirname, process.env.JSON_PATH);

const server = jsonServer.create()
const router = jsonServer.router(JSON_FILE)
const middlewares = jsonServer.defaults()
const PORT = process.env.API_PORT
const HOST = process.env.API_HOST
jsonServer.path = HOST

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {
   if (req.method === 'POST') {
      if (req.url.substring(1) === process.env.ENDPOINT_TO_CHECK) {
        if (req.body['return'] != null) {
          res.status(req.body['return']).send(null);
          return;
        } 
      } 
   } 
   next()
})

server.use(router)

server.listen(PORT, () => {
  console.log(`JSON File: ${JSON_FILE}\nJSON Server is running on http://${HOST}:${PORT}`)
})