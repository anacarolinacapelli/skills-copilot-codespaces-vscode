// Create web server

const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

// Create app
const app = express()
app.use(bodyParser.json())
app.use(cors())

// Store comments
const commentsByPostId = {}

// Get comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

// Create comments
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
})

// Listen
app.listen(4001, () => {
    console.log('Listening on 4001')
})
