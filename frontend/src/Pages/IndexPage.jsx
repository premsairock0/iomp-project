import { useNavigate } from 'react-router-dom';
import image from '../assets/hostel.jpg';

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-[60%]">
        <img src={image} alt="Hostel" className="object-cover h-full w-full" />
      </div>

      {/* Right Buttons Section */}
      <div className="w-[40%] bg-gradient-to-br from-indigo-500 to-purple-700 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Hostel Management System</h1>
        <button
          className="px-6 py-3 m-2 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition-all"
          onClick={() => navigate('/login-options')}
        >
          Login
        </button>
        <button
          className="px-6 py-3 m-2 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition-all"
          onClick={() => navigate('/register')}
        >
          Student Register
        </button>
      </div>
    </div>
  );
}
