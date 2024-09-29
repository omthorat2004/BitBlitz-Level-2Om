import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/'); 
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="text-danger">Unauthorized Access</h2>
            <p>You do not have permission to view this page.</p>
            <button className="btn btn-primary" onClick={handleRedirect}>
                Go to Home
            </button>
        </div>
    );
};

export default Unauthorized;
