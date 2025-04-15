import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Main from './pages/main'
import PlayerContextProvider from './context/PlayerContext'
import PlaylistContextProvider from './context/PlaylistContext'
import DisplayHome from "./Components/display-home";
import DisplayAlbum from "./Components/displayAlbum";
import MbPlaylist from './pages/mobilePlaylist'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main/*' element={
          <PlayerContextProvider>
            <PlaylistContextProvider>
              <Main />
            </PlaylistContextProvider>
          </PlayerContextProvider>
        } />
        <Route path='/main/mbPlaylist' element={
            <PlayerContextProvider>
            <PlaylistContextProvider>
              <MbPlaylist/>
            </PlaylistContextProvider>
          </PlayerContextProvider>
        } />
      </Routes>
    </Router>
    </>
  )
}

export default App
