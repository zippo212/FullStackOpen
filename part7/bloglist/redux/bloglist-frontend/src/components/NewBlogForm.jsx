import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <div className="py-2">
      <div style={{ display: isVisible ? 'none' : '' }}>
        <Button onClick={() => setIsVisible(true)} className="p-3 h-6">
          new blog
        </Button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>
        <h2 className="font-semibold">Create new</h2>
        <form onSubmit={handleSubmit} className="max-w-sm py-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title-input"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author-input"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <Label htmlFor="url">Url</Label>
            <Input
              id="url-input"
              type="url"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button type="submit" id="create-blog" className="p-3 h-6">
            Create
          </Button>
        </form>
        <Button onClick={() => setIsVisible(false)} className="p-3 h-6">
          cancel
        </Button>
      </div>
    </div>
  )
}

export default NewBlogForm
