import './App.css';
import Login from './Components/Login/Login';
import Info from './Components/Info/Info';
import { BrowserRouter , Routes,  Route , Navigate } from "react-router-dom";
import PrivateRoute from './Helpers/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/info' element={<PrivateRoute/>}>
            <Route path='/info' element={<Info/>}/>
          </Route>
          <Route path='*' element={<Navigate to={{ pathname: "/" }}/>}/>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
