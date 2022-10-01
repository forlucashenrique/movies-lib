import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {BiCameraMovie, BiSearchAlt2} from 'react-icons/bi'

import './Navbar.css'

const Navbar = () => {
  const [search, setSearch] = useState('')
  
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!search) return 

    
    navigate(`search?q=${search}`)
    setSearch('')
  }


  return (
    <div>
        <nav id="navbar">
            <h2>
                <Link to='/'>
                    <BiCameraMovie />MoviesLib
                </Link>
            </h2>
            
            
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Busque um filme' />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
      </nav>
    </div>
  )
}

export default Navbar