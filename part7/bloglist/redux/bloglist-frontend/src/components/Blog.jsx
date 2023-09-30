import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleError, removeBlogs, user, updateLike }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const removeBtnStatus = user.username === blog.user?.username
  const buttonContent = isVisible ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdate = () => {
    setUpdatedBlog({ ...updatedBlog, likes:updatedBlog.likes +1 })
    const updatedBlogData = { ...updatedBlog, likes:updatedBlog.likes +1, user:updatedBlog.user.id }
    updateLike(updatedBlogData, updatedBlog.id)
  }

  const handleRemove = async () => {
    if (!confirm(`Are you sure you want to remove ${updatedBlog.title}`)) return
    try {
      await blogService.remove(updatedBlog.id)
      removeBlogs(updatedBlog.id)
    } catch (err) {
      handleError(err.response.data.error)
    }
  }

  return (
    <div style={blogStyle} data-blog>
      <div data-test-blog-default>
        {updatedBlog.title} {updatedBlog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{buttonContent}</button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }} data-test-blog-extra>
        <div>{updatedBlog.url}</div>
        <div>
          <span data-like>{updatedBlog.likes}</span>
          <button onClick={() => handleUpdate()}>like</button>
        </div>
        <div>{updatedBlog.user?.name}</div>
        {removeBtnStatus && <button onClick={() => handleRemove()}>remove</button>}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.exact({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.exact({
      username: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string
    }),
    id: PropTypes.string
  }),
  handleError: PropTypes.func.isRequired,
  removeBlogs: PropTypes.func.isRequired,
  updateLike: PropTypes.func.isRequired,
  user: PropTypes.exact({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string
  }),
}

export default Blog