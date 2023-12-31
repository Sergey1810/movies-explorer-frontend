import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const [mySavedMovies, setMySavedMovies] = useState([])
  const [infoMessage, setInfoMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [width, setWidth] = useState(window.innerWidth);
  const [addMovies, setAddMovies] = useState(0)
  const [isAddButton, setIsAddButton] = useState(false)
  const [saveErrorMessage, setSaveErrorMessage] = useState('')


  const navigate = useNavigate()
  const location = useLocation()

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


  const onRegister = (email, password, name) => {
    mainApi.register(email, password, name)
      .then((data) => {
        if (data) {
          mainApi.authorize(password, email)
            .then((data) => {
              if (data.token) {
                localStorage.setItem('token', data.token);
                handleLogin();
                navigate('/movies', { replace: true });
              }
            })
            .catch((e) => console.log(`Произошла ошибка`));
        }
        navigate('/movies', { replace: true });

      })
      .catch((e) => console.log(`Произошла ошибка`))
  }

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
      if (location.pathname === '/movie') {
        isAddButtons()
      }
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [width, navigate, location, isAddButton, isLoading, errorMessage]);


  const handleResize = () => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    if (moviesLocalStorage === null) {
      setMovies(null)
      return
    } else if (width > 1160) {
      setMovies(moviesLocalStorage.slice(0, 16))
      setAddMovies(4)
    } else if (width > 890 && width < 1160) {
      setMovies(moviesLocalStorage.slice(0, 12))
      setAddMovies(3)
    } else if (width > 480 && width < 890) {
      setMovies(moviesLocalStorage.slice(0, 8))
      setAddMovies(2)
    } else if (width <= 480) {
      setMovies(moviesLocalStorage.slice(0, 5))
      setAddMovies(2)
    }
    isAddButtons()
    return
  }

  const isAddButtons = () => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    if (moviesLocalStorage === null) {
      setMovies(moviesLocalStorage)
      return
    } else if (width > 1160 && moviesLocalStorage.length <= 16) {
      setIsAddButton(true)
    } else if (width > 890 && width < 1160 && moviesLocalStorage.length <= 12) {
      setIsAddButton(true)
    } else if (width > 480 && width < 890 && moviesLocalStorage.length <= 8) {
      setIsAddButton(true)
    } else if (width <= 480 && moviesLocalStorage.length <= 4) {
      setIsAddButton(true)
    } else {
      setIsAddButton(false)
    }
  }

  const handleAddMovies = () => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    setMovies(moviesLocalStorage.slice(0, movies.length + addMovies))
    if (moviesLocalStorage.length <= movies.length) {
      setIsAddButton(true)
    }
    setIsAddButton(false)
  }

  useEffect(() => {
    handleTokenCheck();
    mainApi.getUserInfo().then((users) => {
      setCurrentUser(users)
    })
      .catch((e) => console.log(e))
  }, [navigate])

  const getMyMovies = () => {
    mainApi.getMyMovies().then((movies) => {
      setMySavedMovies(movies)
      setMyMovies(movies)

    })
      .catch((e) => console.log(e))
    setSaveErrorMessage('')
  }

  useEffect(() => {
    handleTokenCheck();
    getMyMovies()
  }, [navigate])

  const handleSearchMovies = (isShorts, movieName) => {
    setIsLoading(true)
    setErrorMessage('')
    moviesApi.getAllMovies()
      .then((movies) => {
        if (!movies) {
          setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        } else if (movies) {
          localStorage.setItem('moviesShorts', JSON.stringify(movies))
          const searchMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
          if (searchMovies.length === 0 || searchMovies === null) {
            setIsLoading(false)
            setErrorMessage('Ничего не найдено')
            localStorage.setItem('movies', null)
            localStorage.setItem('moviesShorts', null)
            localStorage.setItem('searchText', movieName)
            localStorage.setItem('isShort', isShorts)
            handleResize()
            setIsLoading(false)
            return
          } else if (isShorts) {
            const shortsMovies = searchMovies.filter((movie) => movie.duration <= 40)
            if (shortsMovies.length === 0 || shortsMovies === null) {
              setIsLoading(false)
              setErrorMessage('Ничего не найдено')
              localStorage.setItem('movies', null)
              handleResize()
              setIsLoading(false)
              return
            } else {
              localStorage.setItem('movies', JSON.stringify(shortsMovies))
              localStorage.setItem('searchText', movieName)
              localStorage.setItem('isShort', isShorts)
              handleResize()
              setIsLoading(false)
              return
            }
          }
          localStorage.setItem('movies', JSON.stringify(searchMovies))
          localStorage.setItem('moviesShorts', JSON.stringify(searchMovies))
          localStorage.setItem('searchText', movieName)
          localStorage.setItem('isShort', isShorts)
          handleResize()
          setIsLoading(false)
          return
        }
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e.message)
      })
    handleResize()
    setIsLoading(false)
  }

  const toggleSearchMovies = (isShorts, movieName) => {
    setErrorMessage('')
    const moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))
    const moviesLocalStorageShorts = JSON.parse(localStorage.getItem('moviesShorts'))
    if (moviesLocalStorage || moviesLocalStorageShorts) {
      if (isShorts) {
        const shortsMovies = moviesLocalStorage.filter((movie) => movie.duration <= 40)
        if (shortsMovies.length === 0) {
          setErrorMessage('Ничего не найдено')
          localStorage.setItem('movies', JSON.stringify(shortsMovies))
          localStorage.setItem('isShort', isShorts)
          localStorage.setItem('searchText', movieName)
          handleResize()
          isAddButtons()
          return
        }
        localStorage.setItem('movies', JSON.stringify(shortsMovies))
        localStorage.setItem('searchText', movieName)
        localStorage.setItem('isShort', isShorts)
        handleResize()
        isAddButtons()
        return
      } else {
        const searchMovies = moviesLocalStorageShorts.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
        localStorage.setItem('movies', JSON.stringify(searchMovies))
        localStorage.setItem('searchText', movieName)
        localStorage.setItem('isShort', isShorts)
        isAddButtons()
      }
      handleResize()
      isAddButtons()
    } else {
      setErrorMessage('Ничего не найдено')
    }
  }

  const searchMovies = (isShorts, movieName) => {
    setSaveErrorMessage('')
    const searchMovies = myMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (searchMovies.length === 0 || searchMovies === null) {
      setSaveErrorMessage('Ничего не найдено')
      setMySavedMovies(null)
    } else {
      if (isShorts) {
        const shortsMovies = searchMovies.filter((movie) => movie.duration <= 40)
        if (shortsMovies.length === 0 || shortsMovies === null) {
          setSaveErrorMessage('Ничего не найдено')
          setMySavedMovies(null)
        } else {
          setMySavedMovies(shortsMovies)
        }
      } else {
        setMySavedMovies(searchMovies)
      }
    }
  }

  const toggleSaveSearchMovies = (isShorts, movieName) => {
    setSaveErrorMessage('')
    const searchMovies = myMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (searchMovies.length === 0 || searchMovies === null) {
      setSaveErrorMessage('Ничего не найдено')
      setMySavedMovies(null)
    } else {
      if (isShorts) {
        const shortsMovies = searchMovies.filter((movie) => movie.duration <= 40)
        if (shortsMovies.length === 0 || shortsMovies === null) {
          setSaveErrorMessage('Ничего не найдено')
          setMySavedMovies(null)
        } else {
          setMySavedMovies(shortsMovies)
        }
      } else {
        setMySavedMovies(searchMovies)
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
         const deleteMoves = mySavedMovies.filter(item => item._id !== id)
         const deleteMoves1 = myMovies.filter(item => item._id !== id)
         setMySavedMovies(deleteMoves)
         setMyMovies(deleteMoves1)
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
    localStorage.removeItem('searchSaveText')
    localStorage.removeItem('isShortSave')
    localStorage.removeItem('saveMovies')
    setUserData('')
    setMovies([])
    setMyMovies([])
    setMySavedMovies([])
    setIsAuth(false)
    navigate('/')
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
              toggleSearchMovies={toggleSearchMovies}
            />} />
          <Route
            path='/saved-movies'
            element={<ProtectedRouteElement
              element={SavedMovies}
              isLoading={isLoading}
              isAuth={isAuth}
              errorMessage={saveErrorMessage}
              myMovies={mySavedMovies}
              handleDeleteMovies={handleDeleteMovies}
              searchMovies={searchMovies}
              toggleSaveSearchMovies={toggleSaveSearchMovies}
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
          {isAuth ? <Route path='/' element={<Main isAuth={isAuth} />} /> : <Route path='/signin' element={<Login handleLogin={handleLogin} />} />}
          {isAuth ? <Route path='/' element={<Main isAuth={isAuth} />} /> : <Route path='/signup' element={<Register handleLogin={handleLogin} onRegister={onRegister} />} />}
          <Route path='*' element={<Errors />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
