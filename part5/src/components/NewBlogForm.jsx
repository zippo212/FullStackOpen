import { useState } from "react"
import blogService from '../services/blogs'


const NewBlogForm = ({updateBlogs,handleError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const resetForm = () => {setTitle(""),setAuthor(""),setUrl("")}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const createdBlog = await blogService.createBlog({title,author,url})
      updateBlogs(createdBlog)
    } catch (err) {
      handleError(err.response.data.error)
    }
    resetForm()
    setIsVisible(false)
  }

  return (
    <>
      <div style={{display: isVisible ? "none" : ""}}>
        <button onClick={() => setIsVisible(true)}>new blog</button>
      </div>
      <div style={{display: isVisible ? "" : "none"}}>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
        </form>      
        <button onClick={() => setIsVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default NewBlogForm