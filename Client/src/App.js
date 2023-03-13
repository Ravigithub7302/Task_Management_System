import './App.css';
import Assigntask from './components/task/Assigntask';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Status from './components/status/Status';
import UserTask from './components/task/UserTask';
import { Route, Routes } from "react-router-dom";
import LoginState from './context/login/LoginStates';
import Profile from './components/profile/Profile';

function App() {
  return (
    <LoginState>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path="assigntask" element={<Assigntask />} />
          <Route path='usertask' element={<UserTask />} />
          <Route path="profile" element={<Profile />} />
          <Route path="status" element={<Status />} />
        </Route>
        <Route index path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </LoginState>

  );
}
export default App;



{/* <Routes>
  <Route path="/*">
    <Route index element={<ComponentA />} />
    <Route path="pathB" element={<ComponentB />} />
    <Route path="pathC" element={<ComponentC />} />
  </Route>
</Routes> */}
