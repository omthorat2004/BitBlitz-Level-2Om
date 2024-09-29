import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-primary bg-primary'>
      <div className='container-fluid'>
        <Link className='navbar-brand text-white' to='/'>
          Admin Dashboard
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/create-event'>
                Create Event
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/admin-events'>
                All Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
