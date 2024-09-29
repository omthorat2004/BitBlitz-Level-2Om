import { ethers } from 'ethers';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectWallet } from '../features/wallet/walletSlice';
import { storage } from '../firebase';
import './UserRegister.css';
import VoterABI from './VoterABI.json';

const UserRegister = () => {
    const { account } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        pass: '',
        cpass: '',
        add: '',
        image: null,
    });

    const handleClick = () => {
        dispatch(connectWallet());
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!account) {
                return;
            }

            let imageUrl = '';
            if (formData.image) {
                const storageRef = ref(storage, `images/${account}/${formData.image.name}`);
                await uploadBytes(storageRef, formData.image);
                imageUrl = await getDownloadURL(storageRef);
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); 
            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            const contract = new ethers.Contract(contractAddress, VoterABI, signer);

            const transaction = await contract.registerVoter(
                formData.name,
                formData.mobile,
                formData.add,
                imageUrl
            );

            await transaction.wait(); 
            console.log("Voter registered:", transaction);

        } catch (error) {
            console.error("Error registering voter:", error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <h2 className="text-center mb-4">User Registration</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="pass"
                        name="pass"
                        className="form-control"
                        value={formData.pass}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpass" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="cpass"
                        name="cpass"
                        className="form-control"
                        value={formData.cpass}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="add" className="form-label">Address:</label>
                    <input
                        type="text"
                        id="add"
                        name="add"
                        className="form-control"
                        value={formData.add}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Profile Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="form-control"
                        accept="image/*" 
                        onChange={handleFileChange}
                        required 
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Connect Wallet</button>
                    <button type="submit" className="btn btn-success">Register</button>
                    <Link to='/voter/login'  className="btn btn-success">Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;
