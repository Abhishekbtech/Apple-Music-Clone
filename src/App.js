import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Navbar/Sidebar';
import TopNavBar from './Components/Navbar/TopNavBar';
import HomePage from './Components/HomePage/HomePage';
import BrowsePage from './Components/BrowsePage/BrowsePage';
import RadioPage from './Components/RadioPage/RadioPage';
import { MusicProvider } from './Components/Context/MusicContext';
import Details from './Components/Details/Details';
import Artist from './Components/Artist/Artist';
import AuthForm from './Components/SingINpage/AuthForm';
import ResetPassword from './Components/SingINpage/ResetPassword'
import MusicPlans from './Components/HomePage/MusicPlans';

function App() {
  
  return (
    <MusicProvider className="bg-gradient-to-r from-red-600 via-red-900 to-black">
      <Router>
        <div className="flex flex-col h-screen mb-10">
          <TopNavBar />
          <div className="flex flex-grow">
            <Sidebar />
            <div className="flex-grow p-6 overflow-y-auto md:ml-64 md:pt-16 pt-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/browse/details" element={<Details />} />
                <Route path="/favouritesong" element={<RadioPage />} />
                <Route path='/artist/:id' element={<Artist/>}/>
                <Route path='/signup' element={<AuthForm/>}/>
                <Route path='/updatepassword' element={<ResetPassword/>}/>
                <Route path='/plans' element={<MusicPlans/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;