
import './App.css';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/layouts/home';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/products/productdetail';
import ProductSearch from './components/products/productSearch';
import Login from './components/user/login';
import Register from './components/user/register';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/userActions';
import Profile from './components/user/profile';
import ProtectedRoute from './components/routes/protectedRoutes';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/updatePassword';
import ForgotPassword from './components/user/forgotPassword';
import ResetPassword from './components/user/resetPassword';

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);
  
  return (
    <Router>
    <div className="App">
    <HelmetProvider>
      <Header/>
      <div className='container container-fluid'>
        <ToastContainer theme='dark'/>
          <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/search/:keyword" element={<ProductSearch/>}/>
           <Route path="/product/:id" element={<ProductDetail/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/myprofile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
           <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
           <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
           <Route path="/password/forgot" element={<ForgotPassword/>}/>
           <Route path="/password/reset/:token" component={<ResetPassword/>} />

          </Routes>
      </div>
      
    
      <Footer/>
    </HelmetProvider>
     
      
    
    </div>
    </Router>
  );
}

export default App;
