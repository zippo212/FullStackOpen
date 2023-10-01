import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const resetForm = () => {
    setTitle(''), setAuthor(''), setUrl('')
  }

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      const createdBlog = { title, author, url }
      dispatch(createBlog(createdBlog))
      resetForm()
      setIsVisible(false)
      setNotification({
        type: true,
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      })
    } catch (err) {
      dispatch(setNotification({ type: false, message: err.response.data.error }))
    }
  }

  return (
    <>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <button onClick={() => setIsVisible(true)}>new blog</button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              id="title-input"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author-input"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url-input"
              type="url"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit" id="create-blog">
            Create
          </button>
        </form>
        <button onClick={() => setIsVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default NewBlogForm
