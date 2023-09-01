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
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [infoMessage, setInfoMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [width, setWidth] = useState(window.innerWidth);
  const [addMovies, setAddMovies] = useState(0)
  const [isAddButton, setIsAddButton] = useState(false)

  const navigate = useNavigate()

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsAuth(true);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [navigate])



  const handleSubmitUpdateUsers = (name, email) => {
    mainApi.setUserInfo(name, email).then((data) => {
      setCurrentUser(data)
      setInfoMessage('Данные успешно изменены!');
    })
      .catch((e) => {
        setInfoMessage(`Что-то пошло не так!`);
      });
  }

  useEffect(() => {
    const resize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', resize);
    if (isAuth) {
      handleResize()
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [width, navigate]);


  const handleResize = () => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    if (width > 1160) {
      setMovies(moviesLocalStorage.slice(0, 16))
      setAddMovies(4)
    } else if (width > 890 && width < 1160) {
      setMovies(moviesLocalStorage.slice(0, 12))
      setAddMovies(3)
    } else if (width > 680 && width < 890) {
      setMovies(moviesLocalStorage.slice(0, 8))
      setAddMovies(2)
    } else if (width <= 680) {
      setMovies(moviesLocalStorage.slice(0, 5))
      setAddMovies(2)
    }
  }

  const handleAddMovies = () => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    setMovies(moviesLocalStorage.slice(0, movies.length + addMovies))
    if (moviesLocalStorage.length === movies.length) {
      setIsAddButton(true)
    }
  }

  useEffect(() => {
    mainApi.getUserInfo().then((users) => {
      setCurrentUser(users)
    })
      .catch((e) => console.log(e))
  }, [navigate])

  useEffect(() => {
    mainApi.getMyMovies().then((movies) => {
      setMyMovies(movies)
    })
      .catch((e) => console.log(e))
  }, [navigate])

  const handleSearchMovies = (isShorts, movieName) => {
    setIsLoading(true)
    moviesApi.getAllMovies()
      .then((movies) => {
        const searchMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
        if (searchMovies.length === 0) {
          setErrorMessage('Ничего не найдено')
          localStorage.removeItem('movies')
        }
        localStorage.setItem('movies', JSON.stringify(searchMovies))
        localStorage.setItem('searchText', movieName)
        localStorage.setItem('isShort', isShorts)
        if (isShorts) {
          const shortsMovies = searchMovies.filter((movie) => movie.duration <= 40)
          if (!shortsMovies) {
            setErrorMessage('Ничего не найдено')
          }
          localStorage.setItem('movies', JSON.stringify(shortsMovies))
          localStorage.setItem('searchText', movieName)
          localStorage.setItem('isShort', isShorts)
          setIsLoading(false)
        }
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        if (e) {
          localStorage.removeItem('movies')
          setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        }
      })
  }

  const searchMovies = (isShorts, movieName) => {
    const searchMovies = myMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if(!searchMovies){
      setErrorMessage('Ничего не найдено')
    }
    if (isShorts) {
      const shortsMovies = searchMovies.filter((movie) => movie.duration <= 40)
      if (!shortsMovies) {
        setErrorMessage('Ничего не найдено')
      }
    }
  }

  useEffect(() => {
    const moviesLocalStorage = localStorage.getItem('movies')
    if (moviesLocalStorage) {
      setMovies(JSON.parse(moviesLocalStorage))
    }
  }, [isLoading])


  const handleLikeMovies = (movie) => {
    mainApi.setAddMovies({
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
      .then((data) => {
        setMyMovies([...myMovies, data])
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  const handleDeleteMovies = (id) => {
    mainApi.setDeleteMovies(id)
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
    localStorage.removeItem('token')
    localStorage.removeItem('movies')
    localStorage.removeItem('searchText')
    localStorage.removeItem('isShort')
    setUserData('')
    setIsAuth(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main isAuth={isAuth} />} />
          <Route
            path='/movies'
            element={<ProtectedRouteElement
              element={Movies}
              isAuth={isAuth}
              isLoading={isLoading}
              errorMessage={errorMessage}
              movies={movies}
              myMovies={myMovies}
              handleSearchMovies={handleSearchMovies}
              handleLikeMovies={handleLikeMovies}
              handleAddMovies={handleAddMovies}
              handleDeleteMovies={handleDeleteMovies}
              isAddButton={isAddButton}
            />} />
          <Route
            path='/saved-movies'
            element={<ProtectedRouteElement
              element={SavedMovies}
              isAuth={isAuth}
              myMovies={myMovies}
              handleDeleteMovies={handleDeleteMovies}
              searchMovies={searchMovies}
            />} />
          <Route
            path='/profile'
            element={<ProtectedRouteElement
              element={Profile}
              isAuth={isAuth}
              handleLoginOut={handleLoginOut}
              infoMessage={infoMessage}
              handleSubmitUpdateUsers={handleSubmitUpdateUsers}
            />} />
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<Errors />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
