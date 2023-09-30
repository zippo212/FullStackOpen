const { countBy, maxBy, toPairs, groupBy, mapValues, sumBy } = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => {
    return (total = total + current.likes)
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => {
    if (Object.keys(max).length === 0) return current
    return current.likes > max.likes ? current : max
  }, {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const authorBlogsCount = countBy(blogs, (blog) => blog.author)
  const mostBlogsAuthor = maxBy(toPairs(authorBlogsCount), ([, blogsCount]) => blogsCount)
  return {
    author: mostBlogsAuthor[0],
    blogs: mostBlogsAuthor[1],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const authorBlogsGroup = groupBy(blogs, "author")
  const authorTotalLikes = mapValues(authorBlogsGroup, (authorBlogs) => sumBy(authorBlogs, "likes"))
  const mostBlogsLikesAuthor = maxBy(toPairs(authorTotalLikes), ([, likesCount]) => likesCount)
  return {
    author: mostBlogsLikesAuthor[0],
    likes: mostBlogsLikesAuthor[1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
