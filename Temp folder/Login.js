import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(false);
    }, []);

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    } else {
        return <Navigate to ="/Lockedout" />;
    }
};

export default Login;