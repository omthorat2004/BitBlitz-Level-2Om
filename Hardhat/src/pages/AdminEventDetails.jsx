import React from 'react';
// here use electioncontract address
const AdminEventDetails = () => {
    const { id } = useParams();
    const [eventDetail, setEventDetail] = useState(null);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
            const contract = new ethers.Contract(contractAddress, ElectionContractABI.abi, signer);

            const details = await contract.elections(id);
            setEventDetail(details);

            const candidatePromises = [];
            for (let i = 1; i <= details.candidateCount; i++) {
                candidatePromises.push(contract.candidates(i));
            }
            const candidateDetails = await Promise.all(candidatePromises);
            setCandidates(candidateDetails);
        };

        fetchEventDetail();
    }, [id]);
  return (
    <div className="container mt-4">
    {eventDetail ? (
        <div>
            <h2>{eventDetail.title}</h2>
            <p><strong>Start Date:</strong> {new Date(eventDetail.startDate * 1000).toLocaleString()}</p>
            <p><strong>End Date:</strong> {new Date(eventDetail.endDate * 1000).toLocaleString()}</p>
            <p><strong>Status:</strong> {eventDetail.isActive ? 'Active' : 'Closed'}</p>

            <h3>Candidates</h3>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        {candidate.name}: {candidate.voteCount} votes
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <p>Loading event details...</p>
    )}
</div>
  );
}

export default AdminEventDetails;
