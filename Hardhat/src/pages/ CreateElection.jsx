import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ElectionContract from '../artifacts/ElectionContract.json';
import { connectWallet } from '../features/wallet/walletSlice';

const predefinedCandidates = [
    "Candidate A",
    "Candidate B",
    "Candidate C",
    "Candidate D",
    "Candidate E",
];

const CreateElection = () => {
    const { account } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
            const contract = new ethers.Contract(contractAddress, ElectionContract.abi, signer);

            const tx = await contract.createElection(
                formData.title,
                Math.floor(new Date(formData.startDate).getTime() / 1000),
                Math.floor(new Date(formData.endDate).getTime() / 1000)
            );
            await tx.wait();

            const candidatePromises = predefinedCandidates.map(async (candidateName) => {
                const candidateTx = await contract.addCandidate(electionId, candidateName);
                await candidateTx.wait();
            });
            await Promise.all(candidatePromises);

            console.log("Election created and candidates added");
        } catch (error) {
            console.error("Error creating election:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Election</h2>
            <label htmlFor="title">Election Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label htmlFor="startDate">Start Date:</label>
            <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
            />

            <label htmlFor="endDate">End Date:</label>
            <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
            />

            <button onClick={handleClick}>Connect Wallet</button>
            <button type="submit">Create Election</button>
        </form>
    );
};

export default CreateElection;
