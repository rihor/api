import express from 'express'
import routes from './routes'

import './database'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
