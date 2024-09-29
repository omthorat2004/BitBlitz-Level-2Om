import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';

const AdminPrivateRoute = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const account = localStorage.getItem('account');

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!account) {
                setLoading(false);
                return;
            }
            
            try {
               
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
                const contract = new ethers.Contract(contractAddress, ElectionContractABI.abi, signer);
                
               
                const adminStatus = await contract.isAdmin(account); 
                setIsAdmin(adminStatus);
            } catch (error) {
                console.error('Error checking admin status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [account]);

 
    if (loading) {
        return <div>Loading...</div>;
    }


    if (!isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return (
        <div>
            <AdminNavbar />
            <Outlet />
        </div>
    );
};

export default AdminPrivateRoute;
