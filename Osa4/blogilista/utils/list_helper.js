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

const mostBlogs = (blogs) => {
  let result = blogs.map(a => a.author)
  var mf = 1
  var m = 0
  var item
  for (var i=0; i<result.length; i++)
  {
    for (var j=i; j<result.length; j++)
    {
      if (result[i] === result[j])
        m++
      if (mf<m)
      {
        mf=m
        item = result[i]
      }
    }
    m=0
  }
  return{
    author: item,
    blogs: mf
  }
}

const mostLikes = (blogs) => {
  const result = blogs.map(a => a.author)
  let mostLikes = 0
  let likes = 0
  let item
  for (var i=0; i<result.length; i++)
  {
    const array = blogs.filter(item => item.author === result[i])
    likes = totalLikes(array)
    if (mostLikes<likes)
    {
      mostLikes=likes
      item = result[i]
    }

    likes=0
  }
  return{
    author: item,
    likes: mostLikes
  }
}

module.exports = {
  dummy, totalLikes,favoriteBlog, mostBlogs, mostLikes
}