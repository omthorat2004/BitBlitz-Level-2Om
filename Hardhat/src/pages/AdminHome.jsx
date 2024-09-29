import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ElectionContractABI from './ElectionContract.json'
// election contract address
const AdminHome = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' 
      const contract = new ethers.Contract(
        contractAddress,
        ElectionContractABI.abi,
        signer
      )
      const eventCount = await contract.electionCount()

      const eventPromises = []
      for (let i = 1; i <= eventCount; i++) {
        eventPromises.push(contract.elections(i))
      }

      const eventDetails = await Promise.all(eventPromises)
      setEvents(eventDetails)
    }

    fetchEvents()
  }, [])

  return (
    <div className='container mt-4'>
      <h2>All Events</h2>
      <div className='row'>
        {events.map((event, index) => (
          <div className='col-md-4 mb-3' key={index}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{event.title}</h5>
                <p>
                  <strong>Start Date:</strong>{' '}
                  {new Date(event.startDate * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {new Date(event.endDate * 1000).toLocaleString()}
                </p>
                <Link
                  to={`/event-detail/${index + 1}`}
                  className='btn btn-primary'
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminHome
