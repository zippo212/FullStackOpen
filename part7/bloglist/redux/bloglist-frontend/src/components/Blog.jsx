import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

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

  const handleRemove = () => {
    if (!confirm(`Are you sure you want to remove ${blog.title}`)) return
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ type: true, message: 'blog was removed successfully' }))
    } catch (err) {
      dispatch(setNotification({ type: false, message: err }))
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    const message = e.target.addComment.value
    dispatch(addComment({ message, id: blog.id }))
    e.target.addComment.value = ''
  }

  if (!blog || !user) {
    return <div>Loading ..</div>
  }

  const removeBtnStatus = user.username === blog.user?.username

  return (
    <div data-blog className="max-w-7xl p-5">
      <div data-test-blog-default>
        <h2 className="text-lg font-bold">
          {blog.title} {blog.author}
        </h2>
      </div>
      <div data-test-blog-extra>
        <a href={blog.url} className="underline">
          {blog.url}
        </a>
        <div>
          <span data-like className="pr-2 font-semibold">
            {blog.likes}
          </span>
          <Button onClick={() => handleUpdate()} className="h-4 px-2">
            like
          </Button>
        </div>
        <div className="text-gray-500">added by {blog.user?.name}</div>
        {removeBtnStatus && (
          <Button onClick={() => handleRemove()} className="h-6 px-3">
            remove
          </Button>
        )}
      </div>
      <h4 className="font-bold">Comments</h4>
      <form onSubmit={handleAddComment} className="flex items-center space-x-1">
        <Input type="text" name="addComment" id="addComment" className="max-w-sm h-8" />
        <Button type="submit" className="h-8 px-3">
          add comment
        </Button>
      </form>
      <ul className="list-none max-w-7xl space-y-0.5 py-2">
        {blog.messages.map((comment, i) => (
          <li key={i} className="font-medium">
            {comment}
          </li>
        ))}
      </ul>
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
