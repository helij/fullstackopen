
const app = require('./controllers/bloglist')
const config = require('./utils/config')

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})