import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

const create = (obj) => {
  return axios.post(baseUrl, obj).then((res) => res.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  deletePerson,
}
