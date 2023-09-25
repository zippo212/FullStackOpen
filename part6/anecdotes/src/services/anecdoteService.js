import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (anecdoteObj) => {
  const newAnecdote = { ...anecdoteObj, votes: anecdoteObj.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, newAnecdote)
  return response.data
}

export default { getAll, createNew, update }
