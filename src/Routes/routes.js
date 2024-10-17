import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../Pages/home";
import Menu from "../Pages/menu"
import ContactUs from "../Pages/contact-us";
import AboutUs from "../Pages/about-us";
import SignupValidation from "../Pages/signup-validation";
import Signup from "../Pages/signup";
import Signin from "../Pages/signin";
import AdminPage from '../Pages/admin/adminDashboard';
import ReceptionPage from "../components/reception/receptionPage";
import receptionDashboard from '../Pages/reception/receptionDashboard';
import CreateReception from '../components/admin/createReception'
import DeleteReception from '../components/admin/deleteReception'
import DeleteUser from '../components/admin/deleteUser'
import InfoReception from '../components/admin/receptionInfo'
import InfoUser from '../components/admin/userInfo'
import HotelAnalysis from '../components/admin/hotelAnalysis'
import InfoDish from '../components/admin/dishInfo'
import DeleteDish from '../components/admin/deleteDish'
import AddDish from '../components/admin/addDish'
import PendingPage from "../components/reception/pendingPage";
import CookingPage from '../components/reception/cookingPage';
import PreparedPage from '../components/reception/preparedPage';
import ServedPage from '../components/reception/servedPage';
import DeclinedPage from "../components/reception/declinedPage";
import CreateAdmin from "../components/admin/createAdmin";
const AppRoutes = () => {
    return (

      <Router>
        <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Contact-us" element={<ContactUs />} />
            <Route path="/About-us" element={<AboutUs />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup-validation" element={<SignupValidation />} />
            <Route path="/Admin-Dashboard" element={<AdminPage />} >
                <Route path="/Admin-Dashboard/Create-Reception" element={<CreateReception />} />
                <Route path="/Admin-Dashboard/Delete-Reception" element={<DeleteReception />} />
                <Route path="/Admin-Dashboard/Delete-User" element={<DeleteUser />} />
                <Route path="/Admin-Dashboard/Reception-Info" element={<InfoReception />} />
                <Route path="/Admin-Dashboard/User-Info" element={<InfoUser />} />
                <Route path="/Admin-Dashboard/Analytics" element={<HotelAnalysis />} />
                <Route path="/Admin-Dashboard/Dish-Info" element={<InfoDish />} />
                <Route path="/Admin-Dashboard/Delete-Dish" element={<DeleteDish />} />
                <Route path="/Admin-Dashboard/Add-Dish" element={<AddDish />} />
                <Route path="/Admin-Dashboard/Pending-Orders" element={<PendingPage />} />
                <Route path="/Admin-Dashboard/Under-Cooking" element={<CookingPage />} />
                <Route path="/Admin-Dashboard/Prepared-Orders" element={<PreparedPage />} />
                <Route path="/Admin-Dashboard/Create-Admin" element={<CreateAdmin />} />
            </Route>
            <Route path="/Reception-Dashboard" element={<ReceptionPage />} >
                <Route path="/Reception-Dashboard/Pending-Orders" element={<PendingPage />} />
                <Route path="/Reception-Dashboard/Under-Cooking" element={<CookingPage />} />
                <Route path="/Reception-Dashboard/Prepared-Orders" element={<PreparedPage />} />
                <Route path="/Reception-Dashboard/Served" element={<ServedPage />} />
                <Route path="/Reception-Dashboard/Declined-Orders" element={<DeclinedPage />} />

            </Route>

            <Route path="*" element={<Navigate to="/" />} />
  
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;