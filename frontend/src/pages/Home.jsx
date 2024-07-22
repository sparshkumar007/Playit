import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    // const loadHome = async () => {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         if (!authToken) {
    //             console.log('Auth token not found in localstorage');
    //             navigate('/login');
    //             return;
    //         }
    //         const response = await fetch(`${url}/api/auth/getUser`);
    //     } catch (err) {
    //         console.log('Error detected in loading home page');
    //         navigate('/login');
    //     }
    // }
    // useEffect(() => {
    //     loadHome();
    // }, []);
    return (
        <>
            Home page
        </>
    )
}

export default Home