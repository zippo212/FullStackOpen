import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, handleError, removeBlogs, user }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const removeBtnStatus = user.username === blog.user.username
  const buttonContent = isVisible ? "hide" : "show"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdate = async () => {
    setUpdatedBlog({...updatedBlog, likes:updatedBlog.likes +1})
    const updatedBlogData = {...updatedBlog, likes:updatedBlog.likes +1, user:updatedBlog.user.id}
    try {
      const response = await blogService.update(updatedBlogData, updatedBlog.id)
      setUpdatedBlog(response)
    } catch (err) {
      handleError(err.response.data.error)
    }
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
    <div style={blogStyle}>
      <div>
        {updatedBlog.title} {updatedBlog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{buttonContent}</button>
      </div>
      <div style={{display: isVisible ? "" : "none"}}>
        <div>{updatedBlog.url}</div>
        <div>
          {updatedBlog.likes}
          <button onClick={() => handleUpdate()}>like</button>
        </div>
        <div>{updatedBlog.user.name}</div>
        {removeBtnStatus && <button onClick={() => handleRemove()}>remove</button>}
      </div>
    </div>
)}

export default Blog