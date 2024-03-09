const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')

const app = express()
const PORT = 3000

// createPath function:
const createPath = (folder, page, ext) =>
	path.resolve(__dirname, folder, `${page}.${ext}`)

// middlewares:
app.use(express.static(__dirname + '/pages'))
app.use((req, res, next) => {
	console.log(req.path)
	console.log(req.method)
	next()
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes:
app.get('/page1', (req, res) => {
	res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page2', (req, res) => {
	res.sendFile(createPath('pages', 'page2', 'html'))
})
app.post('/page1', (req, res) => {
	console.log(req.body)
	res.send({ message: req.body })
})
app.get('/data', (req, res) => {
	const dataFromFile = JSON.parse(
		fs.readFileSync(createPath('data', 'data', 'json'))
	)
	res.send(dataFromFile)
})

// server listening
app.listen(PORT, error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`)
})
