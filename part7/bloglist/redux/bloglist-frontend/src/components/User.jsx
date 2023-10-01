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
    <div>
      <h2>{userInfo.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userInfo.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
