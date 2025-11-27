import { useParams } from 'react-router';

function Profile() {
  const { id } = useParams();
  return <h1>Profile Page for user {id || 'unknown'}</h1>;
}

export default Profile;
