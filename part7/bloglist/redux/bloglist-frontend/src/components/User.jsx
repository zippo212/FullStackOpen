import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const userInfo = users.filter((u) => u.id === id)[0]

  if (!userInfo) {
    return null
  }
  return (
    <div className="max-w-7xl p-5">
      <h2 className="font-bold text-xl">{userInfo.name}</h2>
      <h3 className="font-semibold">added blogs</h3>
      <ul className="list-none max-w-7xl space-y-0.5 py-2">
        {userInfo.blogs.map((blog) => {
          return (
            <li key={blog.id} className="font-medium">
              {blog.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default User
