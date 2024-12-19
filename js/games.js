

                    /***************** class has functions for Fetching data****************** */

export default class GameFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }


  //  function for fetch data for games 
  async fetchGames(category) {
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "24fd7dd456msh231a7c68f622c6cp1644ecjsnde7d42b28e70",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(`${this.apiUrl}?category=${category}`, options);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error fetching game data:", error.message);
      return [];
    }
  }
  
  //  function for fetch details for game is clicked
  async fetchGameDetails(gameId) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '24fd7dd456msh231a7c68f622c6cp1644ecjsnde7d42b28e70',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
      if (!response.ok) throw new Error("Failed to fetch game details");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching game details:", error.message);
      return null;
    }
  }
}
