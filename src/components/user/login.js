import { Fragment, useEffect, useState } from "react";
import Metadata from "../layouts/metadata";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userActions";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { loading, error,isAuthenticate} = useSelector(state => state.authState);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(isAuthenticate){
          navigate('/')
        }

        if (error) {
            toast(error, {
                //position: toast.POSITION.BOTTOM_CENTER
                type:'error',
                onOpen:()=>{
                    dispatch(clearAuthError)
                }
            });
            
        }
    }, [error,isAuthenticate]);

    return (
        <>
            <Metadata title={'login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
