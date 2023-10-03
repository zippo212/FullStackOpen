import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2 className="font-bold text-lg">Users</h2>
      <Table>
        <TableCaption>list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Blogs created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => {
            return (
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
