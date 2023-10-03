import NewBlogForm from './NewBlogForm'
import BlogList from './BlogList'

const Home = () => {
  return (
    <div className="max-w-7xl p-5">
      <NewBlogForm />
      <BlogList />
    </div>
  )
}

export default Home
