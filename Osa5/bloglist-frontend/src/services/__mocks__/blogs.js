let token = null

const blogs = [
    {
        _id: "5bee9e7dc1794a26c478c517",
        likes: 0,
        author: "w",
        title: "w",
        url: "w",
        user: [
            {
                _id: "5bde856bed7a5d26c4bab4fd",
                username: "mluukkai",
                name: "Matti Luukkainen"
            }
        ]
    },
    {
        _id: "5bee9ebac1794a26c478c518",
        likes: 0,
        author: "",
        title: "",
        url: "",
        user: [
            {
                _id: "5bde856bed7a5d26c4bab4fd",
                username: "mluukkai",
                name: "Matti Luukkainen"
            }
        ]
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }