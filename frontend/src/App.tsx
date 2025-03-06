import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <nav>Navbar</nav>
      <Outlet />
    </div>
  );
}

export default App;
