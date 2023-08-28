import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Errors from '../Errors/Errors';
import Profile from '../Profile/Profile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { api, auth } from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [movies, setMovies] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    handleTokenCheck();
  }, [navigate])

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserData(res.data.email)
            setIsAuth(true);
            navigate("/", { replace: true })
          }
        })
        .catch((e) => console.log(e));
    }
  }

  useEffect(() => {
    api.getUserInfo().then((users) => {
      setCurrentUser(users)

    })
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    api.getInitialMovies().then((movies) => {
      setMovies(movies)
    })
      .catch((e) => console.log(e))
  }, [])

  const handleLogin = () => {
    setIsAuth(true);
  }

  const handleLoginOut = () => {
    setUserData('')
    setIsAuth(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<ProtectedRouteElement element={Movies} isAuth={isAuth} />} />
          <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} isAuth={isAuth} />} />
          <Route path='/profile' element={<ProtectedRouteElement element={Profile} isAuth={isAuth} />} />
          <Route path='/signin' element={<Login handleLogin={handleLogin}/>} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<Errors />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
