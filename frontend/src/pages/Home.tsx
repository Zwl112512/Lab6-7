import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3000/special', {
        auth: {
          username,
          password,
        },
      });
      setMessage(`✅ Welcome ${response.data.user.username}, Role: ${response.data.role}`);
    } catch (error: any) {
      setMessage(`❌ Login failed: ${error.response?.statusText || 'Unknown error'}`);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>🔐 Basic Auth Login</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Home;
