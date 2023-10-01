import { useState } from 'react'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)

  const removeBtnStatus = user.username === blog.user?.username
  const buttonContent = isVisible ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleUpdate = () => {
    try {
      const updatedBlogData = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      dispatch(likeBlog(updatedBlogData))
    } catch (err) {
      dispatch(setNotification({ type: false, message: err.response.data.error }))
    }
  }

  const handleRemove = async () => {
    if (!confirm(`Are you sure you want to remove ${blog.title}`)) return
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ type: true, message: 'blog was removed successfully' }))
    } catch (err) {
      dispatch(setNotification({ type: false, message: err }))
    }
  }

  return (
    <div style={blogStyle} data-blog>
      <div data-test-blog-default>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{buttonContent}</button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }} data-test-blog-extra>
        <div>{blog.url}</div>
        <div>
          <span data-like>{blog.likes}</span>
          <button onClick={() => handleUpdate()}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {removeBtnStatus && <button onClick={() => handleRemove()}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.exact({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.exact({
      username: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    id: PropTypes.string,
  }),
  user: PropTypes.exact({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
  }),
}

export default Blog
