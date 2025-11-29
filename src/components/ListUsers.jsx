import { useFetch } from '../hooks/useFetch';

function ListUsers() {
  const userApiUrl = 'https://jsonplaceholder.typicode.com/users';

  const { data: users, loading, error } = useFetch(userApiUrl);

  return (
    <>
      {loading && (
        <div className='loading'>
          <h2>Loading users...</h2>
        </div>
      )}
      {error && (
        <div className='error'>
          <h2>{error}</h2>
        </div>
      )}
      {!loading && !error && users.length === 0 && <h2>Users not found.</h2>}
      {!loading && !error && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ListUsers;
