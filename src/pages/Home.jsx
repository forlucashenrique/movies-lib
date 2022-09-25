import {useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard'
import useAPI from '../services/API'

import './MoviesGrid.css'


const Home = () => {
  
  const [topMovies, setTopMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const {getTopRateMovies} = useAPI()
  
  const [totalPages, setTotalPages] = useState()

  const getTotalPages = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=fc39de80b27fbee5fdd0cb397974ab16'
    const res = await fetch(url)
    const data = await res.json()
    setTotalPages(data.total_pages)
  }


  const nextPage = () => {
    if(pageNumber <= totalPages){
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
    getTopRateMovies(setTopMovies, pageNumber)
  }, [pageNumber])


  return (
    <div className='container'>
      <h2 className='title'>Melhores filmes</h2>
     
      <div className="movies-container">
        {topMovies.length > 0 && 
            topMovies.map((movie) => (
            
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

export default Home