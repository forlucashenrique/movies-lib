import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'


const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({movieInfo, showLink = true}) => {

  return (
    <div className='movie-card'>
      <img src={`${imageUrl}${movieInfo.poster_path}`} alt={movieInfo.title} />

      <h2>{movieInfo.title}</h2>
      <p>
        <FaStar /> {movieInfo.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movieInfo.id}`}>Detalhes</Link>}
    </div>
  )

}

export default MovieCard