import { createAnecdote } from "../services/requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotification } from "../services/notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()  
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`you created a new anecdote: '${anecdote.content}'`)
    },
    onError: () => {
      showNotification("too short anecdote, must have length 5 or more");
    },
    })

  const onSubmitCreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})   

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onSubmitCreateAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
