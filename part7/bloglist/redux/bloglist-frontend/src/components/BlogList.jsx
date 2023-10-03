import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div id="blogs-container" className="space-y-2">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <p key={blog.id} className="border-2 p-2 text-md font-semibold hover:bg-slate-50">
            <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
          </p>
        ))}
    </div>
  )
}

export default BlogList
