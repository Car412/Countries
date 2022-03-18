import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from './components/LandingPage/landingPage';
import Home from './components/Home/home.jsx';
import Detail from './components/Detail/detail.jsx';
import CreateActivity from './components/CreateActivity/createActivity.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/activity' element={<CreateActivity/>}/>
        <Route exact path='/home/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
