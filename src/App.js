
import './App.css';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/layouts/home';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/products/productdetail';

function App() {
  return (
    <Router>
    <div className="App">
    <HelmetProvider>
      <Header/>
      <div className='container container-fluid'>
        <ToastContainer theme='dark'/>
          <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/product/:id" element={<ProductDetail/>}/>
          </Routes>
      </div>
      
    
      <Footer/>
    </HelmetProvider>
     
      
    
    </div>
    </Router>
  );
}

export default App;
