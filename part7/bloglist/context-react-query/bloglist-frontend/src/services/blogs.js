import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setUpToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogInfo) => {
  const response = await axios.post(baseUrl, blogInfo, { headers: { Authorization: token } })
  return response.data
}

const update = async (blogInfo) => {
  const response = await axios.put(`${baseUrl}/${blogInfo.id}`, blogInfo, {
    headers: { Authorization: token },
  })
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
}

export default { getAll, setUpToken, createBlog, update, remove }
