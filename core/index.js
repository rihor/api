const express = require('express')
const { resolve } = require('path')

const routes = require('./routes/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port = process.env.PORT, () => {
  console.log(`Server running on port ${port}`)
})