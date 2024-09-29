import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateLike } from './services/requests'
import { useNotification } from './services/notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const updateLikeMutation = useMutation({
    mutationFn: updateLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateLikeMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })  
    showNotification(`you voted '${anecdote.content}'`)
    console.log(`you voted '${anecdote.content}'`)

  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>fetching data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service is not available due to a problem on the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
