import {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import useAPI from '../services/API'

import './MoviesGrid.css'

const Search = () => {
  const [movies, setMovies] = useState([])


  const {query} = useParams()
  const {getSearchedMovies} = useAPI()

  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const getTotalPages = async () => {
    const url = `https://api.themoviedb.org/3/search/movie/?api_key=fc39de80b27fbee5fdd0cb397974ab16&query=${query}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(url)
    setTotalPages(data.total_pages)
  }


  const nextPage = () => {
    if(pageNumber < totalPages){
      const newPage = pageNumber + 1
      setPageNumber(newPage)
    }
  }

  const backPage = () => {
    if(pageNumber > 1){
      const newPage = pageNumber - 1
      setPageNumber(newPage)
    }
  }

  useEffect(() => {  
    getTotalPages()
    getSearchedMovies(setMovies, query, pageNumber)
  }, [query, pageNumber])

  return (
    <div className='container'>
      <h2 className='title'>Resultados para: <span className='query-text'>{query}</span></h2>
      <div className="movies-container">
        {movies.length > 0 && 
          movies.map((movie) => (
          
            <MovieCard key={movie.id} movieInfo={movie}/>
           
          
        ))}
      </div>
      <p className='pages'>Page {pageNumber} de {totalPages}</p>
      <div className="">
        <button className='pages btn' onClick={backPage}>Back</button>
        <button className='pages btn' onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}

export default Search