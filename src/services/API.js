const useAPI = () => {
  
  const apiKey = import.meta.env.VITE_API_KEY
  const moviesURL = import.meta.env.VITE_API_URL
  const searchURL = import.meta.env.VITE_SEARCH

  return {
    async getMovie(id, setData){
  
      const movieInfoURL = `${moviesURL}${id}?${apiKey}`

      const res = await fetch(movieInfoURL)
      const data = await res.json()
      setData(data)
    },
    
    async getTopRateMovies(setData, page_id = 1){
      const topRatedUrl = `${moviesURL}top_rated?${apiKey}&page=${page_id}`
      
      const res = await fetch(topRatedUrl)
      const data = await res.json()
      const pages = data.total_pages
  
      setData(data.results)
    },

    async getSearchedMovies(setData, query, page_id = 1){
      
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&page=${page_id}`
      console.log(searchWithQueryURL)

      const res = await fetch(searchWithQueryURL)
      const data = await res.json()
      setData(data.results)


    }
  }
}

export default useAPI