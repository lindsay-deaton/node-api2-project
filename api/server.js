// implement your server here
const express = require('express')
//pulling in the express library and storing it in express.

const postsRouter = require("./posts/posts-router")
//name the exported routed to use below.

const server = express()
//server is equal to express invoked.

server.use(express.json())
//allows us to receive and convert json objects

server.use("/api/posts/", postsRouter)
//import in the broken down routers

server.get('/', (req, res) => {
  res.send(`<h2>Posts Below</h2>`)
})
//ensuring the get is active.

module.exports = server;
//exporting server so other locations have access.

