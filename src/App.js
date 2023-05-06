import { Routes, Route, useNavigate } from "react-router-dom";
// import Promoters from './components/Promoters/Promoters.js'
import { Button } from "semantic-ui-react";
import Promoters from "./components/Promoters/Promoters.js";
import Participants from './components/Participants/Participants'
import Login  from "./components/Login/Login.js";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.js";
import Signup from "./components/Signup/Signup.js";
import "./App.css"
import Event from "./components/Event/Event.js";
import Register from "./components/Regitser/Register.js"
import PromoterProfile from "./components/PromoterProfile/PromoterProfile.js";
import RegisterForm from "./components/RegisterForm/RegisterForm.js";

function App() {
  const navigate = useNavigate()
  const pathName = window.location.pathname
  // console.log(pathName)
  return (
    <>
      {pathName !=="/login" && pathName!=="/signup"?(<nav className="navBar">
          <a className="title" href="/">PURCycling</a>
          { pathName!=="/" && pathName.split("registerParticipant").length === 1 ? <div className="btns">
            <Button className="btn" onClick={()=>{navigate("signup")}}>SignUp</Button>
            <Button className="myevntsbtn" onClick={()=>{navigate("promoters")}}>MyEvents</Button>
            <Button className="profile" onClick={()=>{navigate("profile")}}>Profile</Button>
            <Button className="signout" onClick={()=>{localStorage.clear(); window.location.reload()}}>SignOut</Button>
          </div>:null}
      </nav>):null}
      <Routes>
        {/* <Route path="/" element={<></>} /> */}
        <Route path="/" element={<Participants/>} />
        <Route path="/profile" element={<PromoterProfile/>} />
        <Route path="/promoters" element={<ProtectedRoute><Promoters /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:id" element={<ProtectedRoute><Event/></ProtectedRoute>}/>
        <Route path="/registerParticipant/:eventId" element={<Register/>} />
        <Route path="/registerParticipant/:eventId/registerForm" element={<RegisterForm/>} />
      </Routes>
    </>
  );
}

export default App;
