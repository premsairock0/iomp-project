import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';

const roles = [
  { name: 'Admin', icon: '👤', description: 'Login as administrator' },
  { name: 'Student', icon: '🎓', description: 'Login as student' },
  { name: 'Warden', icon: '🧑‍✈️', description: 'Login as warden' },
  { name: 'Chef', icon: '🍔', description: 'Login as chef' },
];

export default function LoginOptions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="grid grid-cols-2 gap-6 p-10 bg-white bg-opacity-90 rounded-xl shadow-2xl">
        {roles.map((role) => (
          <div
            key={role.name}
            onClick={() => navigate(`/login/${role.name.toLowerCase()}`)}
            className="p-6 bg-white rounded-lg shadow-md text-center hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-2">{role.icon}</div>
            <h2 className="text-xl font-bold">{role.name}</h2>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
