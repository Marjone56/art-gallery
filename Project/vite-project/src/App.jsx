import Signup from "./pages/auth/signup"
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from "./pages/auth/login";
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import Forgot from "./pages/forgot";
import VenueDashboard from "./pages/VenueDashboard";
import UserFilter from "./pages/UserFilter";
import Messenger from "./pages/messenger";
import LogOut from "./pages/auth/logout";
import AddVenue from './pages/AddVenue';
import AddActivity from './pages/AddActivity';
import ActivityFilter from "./pages/ActivityFilter";
import VenueFilter from "./pages/VenueFilter";



function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/forgot" element={<Forgot/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/addactivity" element={<AddActivity/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/venuedashboard" element={<VenueDashboard/>}></Route>
          <Route path="/UserFilter" element={<UserFilter/>}></Route>
          <Route path="/messenger" element={<Messenger/>}></Route>
          <Route path="/logout" element={<LogOut/>}></Route>
          <Route path="/addVenue" element={<AddVenue/>}></Route>
          <Route path="/ActivityFilter" element={<ActivityFilter/>}></Route>
          <Route path="/VenueFilter" element={<VenueFilter/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
