const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, item) => sum + item.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {

  const max = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })

  return max

}

module.exports = {
  dummy, totalLikes,favoriteBlog
}