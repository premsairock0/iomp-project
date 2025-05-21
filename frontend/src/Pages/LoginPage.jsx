import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/${role}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('Authorization', `Bearer ${data.token}`);
      navigate(`/${role}/dashboard`);
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  const getPlaceholder = () => {
    return role === 'student' ? 'Email' : 'Username';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Login as {role}
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {role === 'student' && (
          <p className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
