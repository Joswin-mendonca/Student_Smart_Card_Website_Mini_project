import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Canteen from './components/Canteen';
import Library_log from './components/Library_log';
import Stationary from './components/Stationary';
import LoginForm from './components/LoginForm';
import AdminHome from './components/Adminhome';
import Create_stud from './components/Create_stud';
import View_stud from './components/View_stud';
import Add_money from './components/Add_money';
import Delete_stud from './components/Delete_stud';
import Fill_stud from './components/Fill_stud';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Adminhome' element={<AdminHome/>}/>
          <Route path='/Canteen' element={<Canteen/>}/>
          <Route path='/Library_log' element={<Library_log/>}/>
          <Route path='/Stationary' element={<Stationary/>}/>
          <Route path='/LoginForm' element={<LoginForm/>}/>
          <Route path='/Create_stud' element={<Create_stud/>}/>
          <Route path='/View_stud' element={<View_stud/>}/>
          <Route path='/Add_money' element={<Add_money/>}/>
          <Route path='/Delete_stud' element={<Delete_stud/>}/>
          <Route path='/Fill_stud/' element={<Fill_stud/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;