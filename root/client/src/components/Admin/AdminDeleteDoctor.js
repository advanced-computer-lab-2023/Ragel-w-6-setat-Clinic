import { useState } from 'react';

const AdminDeleteDoctor = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/admins/deleteDoctor/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // Pass the username in the request body
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Deleted admin:', json);
      } else {
        throw new Error('Failed to delete doctor');
      }
    } catch (err) {
      console.error('Error deleting doctor:', err.message);
      setError('Error deleting doctor');
    }
  };

  return (
    <form className="delete" onSubmit={handleClick}>
      <h3>Delete a Doctor</h3>
      <label>Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
      <button>Delete Doctor</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdminDeleteDoctor;
