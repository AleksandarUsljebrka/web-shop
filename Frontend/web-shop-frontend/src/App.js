
import './App.css';
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Layout from './components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>

   </Routes>
  );
}

export default App;
