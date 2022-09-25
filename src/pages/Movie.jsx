import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import MovieCard from '../components/MovieCard'
import InfoMovie from '../components/InfoMovie'
import API from '../services/API'
import './Movie.css'


const Movie = () => {
  const [movie, setMovie] = useState()
  const {id} = useParams()
  const {getMovie} = API()

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  useEffect(() => {
    getMovie(id, setMovie)
  }, [])

  return (
    <div className='movie-page'>
      {movie && <>
        <MovieCard movieInfo={movie} showLink={false}/>
        <p className='tagline'>{movie.tagline}</p>
        <InfoMovie titleInfo='Orçamento' info={formatCurrency(movie.budget)} icon={<BsWallet2/>} />
        <InfoMovie titleInfo='Receita' info={formatCurrency(movie.revenue)} icon={<BsGraphUp/>} />
        <InfoMovie titleInfo='Duração' info={movie.runtime} icon={<BsHourglassSplit/>} />
        <InfoMovie titleInfo='Descrição' info={movie.overview} icon={<BsFillFileEarmarkTextFill/>} descriptionClass='description'/>

      </>}
      
    </div>
  )
}

export default Movie