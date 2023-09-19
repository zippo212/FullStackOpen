import { useState } from "react"

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const buttonContent = isVisible ? "hide" : "show"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible(!isVisible)}>{buttonContent}</button>
      </div>
      <div style={{display: isVisible ? "" : "none"}}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
)}

export default Blog