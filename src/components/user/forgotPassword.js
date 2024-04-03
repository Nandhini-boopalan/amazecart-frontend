import { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';

import { forgotPassword, clearAuthError } from "../../actions/userActions";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const { loading, error, user, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submitting form...');
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    };

    useEffect(() => {
        console.log('useEffect triggered');
    console.log('Message:', message);
    console.log('Error:', error);
    console.log('Dispatch:', dispatch);
        if (message) {
            toast('successfully send', {
                type: 'success'
            });
            setEmail("");
            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => {
                    dispatch(clearAuthError()); // Ensure dispatch is available here
                }
            });
            return;
        }
    }, [message, error, dispatch]); // Make sure dispatch is included in the dependency array

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Send Email
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
