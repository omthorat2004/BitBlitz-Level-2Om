import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ElectionContractABI from './ElectionContractABI.json';
// Here is contract address of electioncontract
const EventDetail = () => {
    const { id } = useParams();
    const [eventDetail, setEventDetail] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [candidateId, setCandidateId] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetail = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
            const contract = new ethers.Contract(contractAddress, ElectionContractABI.abi, signer);

            const details = await contract.elections(id);
            const userHasVoted = await contract.elections(id).hasVoted(signer.getAddress());
            setEventDetail(details);
            setHasVoted(userHasVoted);
            setLoading(false);
        };

        fetchEventDetail();
    }, [id]);

    const handleVote = async (candidateId) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
            const contract = new ethers.Contract(contractAddress, ElectionContractABI.abi, signer);

            const transaction = await contract.vote(id, candidateId);
            await transaction.wait(); 
            setHasVoted(true); 
            console.log("Vote successful:", transaction);
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <p>Loading event details...</p>
            ) : (
                <div>
                    <h2>{eventDetail.title}</h2>
                    <p><strong>Start Date:</strong> {new Date(eventDetail.startDate * 1000).toLocaleString()}</p>
                    <p><strong>End Date:</strong> {new Date(eventDetail.endDate * 1000).toLocaleString()}</p>
                    <p><strong>Status:</strong> {eventDetail.isActive ? 'Active' : 'Closed'}</p>

                    {hasVoted ? (
                        <p>You have already voted</p>
                    ) : (
                        <div>
                            <h3>Vote for a Candidate</h3>
                            <ul>
                                {Array.from({ length: eventDetail.candidateCount }).map((_, index) => (
                            <li key={index}>
                          <button onClick={() => handleVote(index + 1)}>
                                          Vote for Candidate {index + 1}
                                 </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventDetail;
