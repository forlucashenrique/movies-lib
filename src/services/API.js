const useAPI = () => {
  
  const apiKey = import.meta.env.VITE_API_KEY
  const moviesURL = import.meta.env.VITE_API_URL
  const searchURL = import.meta.env.VITE_SEARCH

  return {

    async getTotalPages(setData, url) {

      
      const urlTopRated = url || 'https://api.themoviedb.org/3/movie/top_rated?api_key=fc39de80b27fbee5fdd0cb397974ab16'

      const res = await fetch(urlTopRated)
      const data = await res.json()
      setData(data.total_pages)
    },

    async getMovie(id, setData){
  
      const movieInfoURL = `${moviesURL}${id}?${apiKey}`

      const res = await fetch(movieInfoURL)
      const data = await res.json()
      setData(data)
    },
    
    async getTopRateMovies(setData, genre_id , page_id){

      const url = import.meta.env.VITE_API_URL_DISCOVER

      const topRatedUrl = genre_id === 'all' ? 
        `${moviesURL}top_rated?${apiKey}&page=${page_id}` : 
        `${url}${apiKey}&with_genres=${genre_id}&sort_by=vote_count.desc&page=${page_id || 1}`
     
      console.log(topRatedUrl)
      const res = await fetch(topRatedUrl)
      const data = await res.json()
  
      setData(data.results)
    },

    async getSearchedMovies(setData, query, page_id = 1){
      
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&page=${page_id}`
      const res = await fetch(searchWithQueryURL)
      const data = await res.json()
      setData(data.results)


    }
  }
}

export default useAPI