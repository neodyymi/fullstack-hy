import axios from 'axios'

const getId = () => (100000*Math.random()).toFixed(0)
const url = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content, votes=0) => {
  const response = await axios.post(url, { content, votes, id: getId() })
  return response.data
}

const updateOne = async (anecdote) => {
  const response = await axios.put(`${url}${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  return response.data
}

export default { getAll, createNew, updateOne }
