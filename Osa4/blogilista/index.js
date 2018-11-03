
const app = require('./controllers/bloglist')

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})