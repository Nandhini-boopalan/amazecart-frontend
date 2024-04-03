import React from "react"
import { Link, useNavigate } from "react-router-dom";
import Search from "./search"
import { useDispatch, useSelector } from "react-redux";
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';


const Header=()=>{
  const {isAuthenticate,user}=useSelector(state=>state.authState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logoutHandler=()=>{
    dispatch(logout)
  }
    return(
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
        <Link to="/">
      <img width="150px" alt="jvlcart logo" src="/images/logo.png" />
    </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticate?(
          <Dropdown className='d-inline' >
          <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
            
            <span>{user.name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{navigate('/myprofile')}} className="dark">profile</Dropdown.Item>
            <Dropdown.Item onClick={logoutHandler}>logout</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
            ):
        <Link to="/login" className="btn" id="login_btn">Login</Link>
        }
      

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
    )
}
export default Header