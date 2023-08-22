import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Errors from '../Errors/Errors';
import Profile from '../Profile/Profile';

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
