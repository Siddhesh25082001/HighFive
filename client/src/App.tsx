// Required imports
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// File Imports
import './static/css/App.css';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

function App() {  
  return (
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path = '/' element = { <Home/> } />
          <Route path = '/room/:roomId' element = { <Room/> } />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  );
}

export default App;