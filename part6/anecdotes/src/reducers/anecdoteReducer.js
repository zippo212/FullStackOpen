import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map((a) => (a.id !== id ? a : action.payload))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (anecdoteObj) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(anecdoteObj)
    dispatch(updateAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
