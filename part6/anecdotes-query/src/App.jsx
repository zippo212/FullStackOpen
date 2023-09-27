import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query' 
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useSetNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const mutation = useMutation(voteAnecdote,{
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
      setNotification(`anecdote '${anecdote.content}' voted`)
    }
  })

  const handleVote = (anecdote) => {
    mutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const query = useQuery({queryKey: ['anecdotes'], queryFn: getAnecdotes, retry: 1})
  const anecdotes = query.data


  if (query.status === 'error') {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
