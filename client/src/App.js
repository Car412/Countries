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
        <Route exact path='/home' element={<Home/>}/>
{/*         <Route exact path='/activity' element={<CreateActivity/>}/>
        <Route exact path='/countries/:id' element={<Detail/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
