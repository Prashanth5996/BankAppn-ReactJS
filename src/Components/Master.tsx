import { Routes, Route} from "react-router-dom";
import UserLogin from "./UserLogin";
import UserDashboard from "./UserDashboard";
import Error from "./Error";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { AccountOpening } from "./AccountOpening";
import { Image } from "./Image";
const Master = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/userdashboard"element={<UserDashboard/>}/>
      <Route path="/error" element={<Error />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admindashboard"element={<AdminDashboard/>}/>
      <Route path="/accountopening" element={<AccountOpening />} />
      <Route path="/image"element={<Image/>}/>
    </Routes>
    </>
  );
};
export default Master;
