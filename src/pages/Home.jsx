import {useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard'
import useAPI from '../services/API'

import './MoviesGrid.css'


const Home = () => {
  
  const [topMovies, setTopMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [genres, setGenres] = useState([])
  const [genreSelected, setGenreSelected] = useState('all')
  const {getTopRateMovies, getTotalPages} = useAPI()
  
  const [totalPages, setTotalPages] = useState()

  
  const getGenres = async () => {
    const url = import.meta.env.VITE_API_URL_GENRES
    const apiKey = import.meta.env.VITE_API_KEY
    const fullUrl = `${url}${apiKey}&language=pt-BR`

    const res = await fetch(fullUrl)
    const data = await res.json()
    // console.log(data)
    setGenres(data.genres)
  }

  const findMovies = async (event) => {
    const selectedIndexOpt = event.target.options.selectedIndex
    const optSelected = event.target.options[selectedIndexOpt]
    // console.log(optSelected.id)

    const url = import.meta.env.VITE_API_URL_DISCOVER
    const apiKey = import.meta.env.VITE_API_KEY
    const fullUrl = `${url}${apiKey}&with_genres=${optSelected.id}&sort_by=vote_count.desc`
    const res = await fetch(fullUrl)
    const data = await res.json()

    getTotalPages(setTotalPages, fullUrl)

    // console.log(data)
    setTopMovies(data.results)
  }

  const changeGenre = (event) => {
    const selectedIndexOpt = event.target.options.selectedIndex
    const optSelected = event.target.options[selectedIndexOpt]
    console.log(optSelected.id)
    setGenreSelected(optSelected.id)
    setPageNumber(1)

  }

  const nextPage = () => {
    if(pageNumber <= totalPages){
      const newPage = pageNumber + 1
      setPageNumber(newPage)
      // getTopRateMovies(setTopMovies, pageNumber)
    }
  }

  const backPage = () => {
    if(pageNumber > 1){
      const newPage = pageNumber - 1
      setPageNumber(newPage)
    }
  }

  
  useEffect(() => {
    getTotalPages(setTotalPages, genreSelected)
    getGenres()
    getTopRateMovies(setTopMovies, genreSelected, pageNumber)
  }, [pageNumber, genreSelected])


  return (
    <div className='container'>
      <h2 className='title'>Melhores filmes</h2>
      <select onChange={changeGenre}>
        <option value="todos" id="all" selected>Todos</option>
        {genres && (
          genres.map(genre => (
            <option key={genre.id} id={genre.id} value={genre.name.toLowerCase()}>{genre.name}</option>
          ))
        )

        }

        
      </select>
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