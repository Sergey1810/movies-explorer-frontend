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
import { moviesApi } from '../../utils/MoviesApi';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuth, setIsAuth] = useState(true)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [newMovieData, setNewMovieData] = useState({})

  const [width, setWidth] = useState(window.innerWidth);

  const checkWidth = () => {
    setWidth(window.innerWidth)
  }

  function handleResize() {
    // const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    if (movies === null) {
      return
    }
    if (width >= 1280) {
      setMovies(movies.slice(0, 16))
    } else if (width > 480 && width < 1280) {
      setMovies(movies.slice(0, 8))
    } else if (width <= 480) {
      setMovies(movies.slice(0, 5))
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkWidth)
    handleResize()
  }, [width])

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
    api.getMyMovies().then((movies) => {
      setMyMovies(movies)
      console.log(movies)
    })
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    moviesApi.getAllMovies()
      .then((movies) => {
        setMovies(movies.slice(0, 25))
      })
      .catch((e) => console.log(e.message))
  }, [])

  const handleLikeMovies = (movie) => {
    
    setNewMovieData({
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      country: movie.country || 'Неизвестно',
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }) 
    api.setAddMovies(newMovieData)
      .then((data) => {
        setMyMovies([...myMovies, data])
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  const handleDeleteMovies = (id) => {
    api.setDeleteMovies(id)
    .then((data) => {
      setMyMovies(myMovies.filter(item => item._id !== id))
    })
    .catch((e) => {
      console.log(e.message)
    })
  }

  const handleLogin = () => {
    setIsAuth(true);
  }

  const handleLoginOut = () => {
    setUserData('')
    setIsAuth(false)
  }

  const handleSearchMovies = (movie, isShorts) => {
    setIsLoading(true)
    moviesApi.getApiMovies()
      .then((movies) => {
        const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movie.toLowerCase()))
        const shortMovies = isShorts ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
        localStorage.setItem('foundMovies', JSON.stringify(shortMovies))
        localStorage.setItem('searchMovieName', movie)
        localStorage.setItem('shortFilms', isShorts)
        setIsLoading(false)
        handleResize()
      })
      .catch((err) => {
        console.log(err.message)
        isLoading(false)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main isAuth={isAuth} />} />
          <Route path='/movies' element={<ProtectedRouteElement element={Movies} isAuth={isAuth} movies={movies} handleSearchMovies={handleSearchMovies} handleLikeMovies={handleLikeMovies} />} />
          <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} isAuth={isAuth} myMovies={myMovies} handleDeleteMovies={handleDeleteMovies} />} />
          <Route path='/profile' element={<ProtectedRouteElement element={Profile} isAuth={isAuth} />} />
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<Errors />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
