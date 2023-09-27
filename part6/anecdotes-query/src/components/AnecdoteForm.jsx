import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import { useSetNotification } from '../NotificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const mutation = useMutation(addAnecdote,{
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
      setNotification(`anecdote '${anecdote.content}' was created`)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
