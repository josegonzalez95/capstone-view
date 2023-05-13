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
import CalendarP from "./components/Calendar/Calendar.js"
import RegisterForm from "./components/RegisterForm/RegisterForm.js";
// import DropdownButton from "./components/DropdownButton/DropdownButton.js";
// import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate()
  const pathName = window.location.pathname





  // const [showMenu, setShowMenu] = useState(false)


  // useEffect(()=>{
  //   if(window.innerWidth < 450){
  //     setShowMenu(true)
  //   }
  //   const handleResize = ()=>{
  //     if(window.innerWidth < 450){
  //       setShowMenu(true)
  //     }else{
  //       setShowMenu(false)
  //     }
  //   }
    
  //   window.addEventListener('resize', handleResize)
  // },[])



  // console.log(pathName)
  console.log(localStorage.getItem('user'))
  return (
    <>
      {pathName !=="/login" && pathName!=="/signup"?(<nav className="navBar">
          <a className="title" href="/">PURCycling</a>
          <div className="btns">
          { pathName!=="/calendar" && <Button className= "calendarbtn" onClick={()=> {navigate("calendar")}}>Calendar</Button>}
          { pathName!=="/" && <Button className= "calendarbtn" onClick={()=> {navigate("/")}}>Events</Button>}
          {/* { pathName!=="/" && pathName.split("registerParticipant").length === 1 && pathName!=="/calendar"  */}
          {JSON.parse(localStorage.getItem('user')) !==null ? <>
            {/* <Button className="btn" onClick={()=>{navigate("signup")}}>SignUp</Button> */}
            <Button className="myevntsbtn" onClick={()=>{navigate("promoters")}}>MyEvents</Button>
            <Button className="profile" onClick={()=>{navigate("profile")}}>Profile</Button>
            <Button className="signout" onClick={()=>{localStorage.clear(); window.location.reload()}}>SignOut</Button>
          </>:null}
          {/* {showMenu && <DropdownButton className="menu" buttons={[{title: "Profile", onClick: ()=>navigate("profile")},
    {title: "SignOut", onClick: ()=>{localStorage.clear(); window.location.reload()}}]} />} */}
          </div>
      </nav>):null}
      <Routes>
        {/* <Route path="/" element={<></>} /> */}
        <Route path="/" element={<Participants/>} />
        <Route path="/profile" element={<ProtectedRoute><PromoterProfile/></ProtectedRoute>} />
        <Route path="/promoters" element={<ProtectedRoute><Promoters /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarP />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:id" element={<ProtectedRoute><Event/></ProtectedRoute>}/>
        <Route path="/registerParticipant/:eventId" element={<Register/>} />
        <Route path="/registerParticipant/:eventId/registerForm" element={<RegisterForm/>} />
      </Routes>
    </>
  );
}

export default App;
