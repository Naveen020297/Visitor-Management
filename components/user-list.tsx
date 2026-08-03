import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  const { toast } = useToast();

  React.useEffect(() => {
    // Fetch users from backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust the endpoint as necessary
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast({ title: 'Error fetching users', description: error.message, variant: 'destructive' });
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2 className="user-list-title">User List</h2>
      <ul className="user-list-items">
        {users.map((user) => (
          <li key={user.id} className="user-list-item">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;