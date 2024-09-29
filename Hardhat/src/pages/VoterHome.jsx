import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoterNavbar from '../components/VoterNavbar';
import ElectionContractABI from './ElectionContractABI.json';
// election contract address
const VoterHome = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
         
            const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
            const contract = new ethers.Contract(contractAddress, ElectionContractABI.abi, provider);
            
            const eventCount = await contract.electionCount();
            const fetchedEvents = [];

            for (let i = 1; i <= eventCount; i++) {
                const eventDetails = await contract.elections(i);
                fetchedEvents.push({
                    id: i,
                    title: eventDetails.title,
                    startDate: new Date(eventDetails.startDate * 1000).toLocaleString(), // Convert from timestamp
                    endDate: new Date(eventDetails.endDate * 1000).toLocaleString(),
                    isActive: eventDetails.isActive
                });
            }

            setEvents(fetchedEvents);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <VoterNavbar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Upcoming Elections</h2>
                <div className="row">
                    {events.map((event) => (
                        <div className="col-md-4 mb-3" key={event.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">
                                        <strong>Start Date:</strong> {event.startDate}<br />
                                        <strong>End Date:</strong> {event.endDate}<br />
                                        <strong>Status:</strong> {event.isActive ? 'Active' : 'Closed'}
                                    </p>
                                    <Link to={`/event/${event.id}`} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VoterHome;
