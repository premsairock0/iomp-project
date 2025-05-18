import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-light border-end"
      style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}
    >
      <div className="list-group list-group-flush">
        <button className="list-group-item list-group-item-action" onClick={() => navigate('/warden/dashboard')}>
          Students
        </button>
        <button className="list-group-item list-group-item-action" onClick={() => navigate('/warden/leave-letters')}>
          Leave Letters
        </button>
        <button className="list-group-item list-group-item-action" onClick={() => navigate('/warden/voting')}>
          Voting
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
