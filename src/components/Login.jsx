import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/users';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);
      navigate(user.role === 'admin' ? '/admin' : '/employee');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to your account</p>
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              style={{ color: 'black' }}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              style={{ color: 'black' }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Sign In</button>

          <div className="demo-credentials">
            <p>Sudhanshu Tiwari</p>
            <div className="credentials-list">
              <div>Admin: admin / admin123</div>
              <div>Employee: sudhanshu.tiwari / sudhanshu123</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;