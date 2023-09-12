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
    console.log(max, current)
    if (Object.keys(max).length === 0) return current
    return current.likes > max.likes ? current : max
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
