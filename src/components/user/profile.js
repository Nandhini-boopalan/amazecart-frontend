import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector(state => state.authState);

    // Check if user is undefined
    if (!user) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    {/* Use optional chaining (?.) to safely access nested properties */}
                    <img className="rounded-circle img-fluid" src="/images/products/images.png" alt='default_avatar' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 {/* Use optional chaining (?.) to safely access properties */}
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 {/* Use optional chaining (?.) to safely access properties */}
                 <p>{user.email}</p>

                 <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
                
                 <a href="#" className="btn btn-danger btn-block mt-5">
                    My Orders
                </a>

                <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    );
}

export default Profile;
