import { useParams } from 'react-router-dom';

export default function LoginPage() {
  const { role } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Login as {role}</h2>
        <form>
          <input type="text" placeholder="ID" className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="password" placeholder="Password" className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <button className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
