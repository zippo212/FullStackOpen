import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationProvider } from './NotificationReducer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './UserReducer'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
