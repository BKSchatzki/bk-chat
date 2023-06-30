import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Room from './pages/Room';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/' element={<Room/>} />
      </Routes>
    </Router>
  )
}

export default App;
