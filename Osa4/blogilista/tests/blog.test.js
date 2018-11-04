const listHelper = require('../utils/list_helper')
const User = require('../models/user')
const {  blogsInDb, usersInDb, initialBlogs } = require('./test_helper')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { app, server } = require('../index')
const api = supertest(app)

test('dummy is called', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    { title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  const favoriteBlog =
    { title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }


  test('the favorite blog', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    expect(result).toEqual(favoriteBlog)
  })
})

describe('most blogs', () => {

  const expected =
    {
      author: 'Robert C. Martin',
      blogs: 3
    }


  test('most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual(expected)
  })

})


describe('most likes', () => {

  const expected =
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }


  test('most likes', () => {
    const result = listHelper.mostLikes(initialBlogs)
    console.log(result)
    expect(result).toEqual(expected)
  })

})

describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users short password', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'testi',
      name: 'Matti Luukkainen',
      password: 'sa',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"password lenght has to be bigger than three"}')

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('post tests', () => {

  beforeAll(async () => {
    await Blog.remove({})
    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('POST /api/blogs succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const title = blogsAfterOperation.map(r => r.title)
    expect(title).toContain('Type wars')
  })

  test('POST /api/blogs likes to zero', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'Test Zero',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
    const result = blogsAfterOperation.find(a => a.title === 'Test Zero')

    expect(result.likes).toBe(0)
  })

  test('POST /api/blogs succeeds missing title and url', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      author: 'Robert C. Martin',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

  })

  afterAll(() => {
    server.close()
  })
})