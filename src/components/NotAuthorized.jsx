import { Link } from 'react-router-dom';
function NotAuthorized() {
  return (
    <div>
      <h1>Not Authorized</h1>
      <p>You do not have permission to access this page</p>
      <Link to='/'>Back to Home</Link>
    </div>
  );
}

export default NotAuthorized;
