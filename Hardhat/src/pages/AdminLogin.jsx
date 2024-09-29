import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                navigate('/admin'); 
            } catch (error) {
                console.error("Failed to connect wallet:", error);
            }
        } else {
            alert("Please install MetaMask or another Ethereum wallet provider.");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Admin Login</h2>
            <button className="btn btn-primary" onClick={handleConnectWallet}>
                Connect Wallet
            </button>
        </div>
    );
};

export default AdminLogin;
