import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Errors from './components/Errors/Errors';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Main/>} />
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/saved-movies'element={<SavedMovies/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/signin' element = {<Login/>}/>
        <Route path='/signup' element = {<Register/>}/>
        <Route path='*' element={<Errors/>}/>
      </Routes>
    </div>
  );
}

export default App;
