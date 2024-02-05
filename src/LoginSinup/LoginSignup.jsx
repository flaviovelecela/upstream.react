import React, {useState} from 'react';
import './LoginSignup.css'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className="input">
                    <input type="email" placeholder="Email"/>
                </div>
            </div>
            <div className='inputs'>
                <div className="input">
                    <input type="text" placeholder="Username/SteamID"/>
                </div>
            </div>
            <div className='inputs'>
                <div className="input">
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}
export default LoginSignup