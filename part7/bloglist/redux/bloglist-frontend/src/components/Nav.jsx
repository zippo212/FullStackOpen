import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Button } from '@/components/ui/button'

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          backgroundColor: 'gray',
          padding: '5px',
        }}
      >
        <div>
          <Link to="/">Blogs</Link>
        </div>
        {user && (
          <>
            <div>
              <Link to="/users">Users</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{user.name} logged in</span>
              <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
            </div>
          </>
        )}
      </div>
      {user ? (
        <h2 className="text-xl font-bold">Blog app</h2>
      ) : (
        <h2 className="text-xl font-bold">Please login</h2>
      )}
    </div>
  )
}

export default Nav
