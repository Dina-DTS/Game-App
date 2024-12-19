                /************************* Import Required Modules ****************************/
import GameFetcher from "./games.js";
import GameUI from "./ui.js"; 


/************************* Define and Initialize GameApp Class ****************************/
class GameApp {
  constructor(apiUrl) {
    this.apiUrl = apiUrl; 
    this.gameFetcher = new GameFetcher(this.apiUrl); 
    this.gameData = document.querySelector("#gameData"); 
    this.gameUI = new GameUI(this.gameData);
    this.navLinks = document.querySelectorAll(".nav-link"); 
    this.btnClose = document.querySelector("#btnClose"); 
    this.details = document.querySelector(".details");
    this.gamesSection = document.querySelector(".games"); 
    this.loader = document.querySelector(".loading"); 

    // Setup event listeners and initialize default category
    this.setupEventListeners();
    this.loadDefaultCategory();
    this.setupCloseButton();
  }

  // Setup event listeners for navigation to extract the active link and to get the id of card clicked
  setupEventListeners() {
    this.navLinks.forEach((activeLink) => {
      activeLink.addEventListener("click", (event) => {
        event.preventDefault();
        this.loadGames(activeLink);
      });
    });
    
    this.gameData.addEventListener("click", async (event) => {
      const card = event.target.closest(".card");
      if (card) {
        const gameId = card.dataset.id; 
        await this.loadGameDetails(gameId); 
      }
    });
  }

  // Function take the activeLink and extract category and the return response to function displaygames
    async loadGames(activeLink) {
      this.toggleLoader(true); 
      this.navLinks.forEach((link) => link.classList.remove("active")); 
      activeLink.classList.add("active"); 
  
      const category = activeLink.getAttribute("data-category");
  
      try {
        const games = await this.gameFetcher.fetchGames(category);
        this.details.classList.add("d-none");
        this.gamesSection.classList.remove("d-none"); 
        this.gameUI.displayGames(games); 
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        this.toggleLoader(false); 
      }
    }
  
  // Toggle loader visibility
  toggleLoader(show) {
    if (show) {
      this.loader.classList.remove("d-none");
    } else {
      this.loader.classList.add("d-none");
    }
  }


  // Load default category on page load
  loadDefaultCategory() {
    this.toggleLoader(true); 
    window.addEventListener("DOMContentLoaded", async () => {
      try {
        await this.loadGames(this.navLinks[0]); 
      } catch (error) {
        console.error("Error loading default category:", error);
      }
    });
  }

  // Close button function 
  setupCloseButton() {
    this.btnClose.addEventListener("click", () => {
      this.details.classList.add("d-none"); 
      this.gamesSection.classList.remove("d-none"); 
    });
  }


  // Function take the gameId and take the response to diplay in displayGameDetails Function
  async loadGameDetails(gameId) {
    this.toggleLoader(true); 
    try {
      const gameDetails = await this.gameFetcher.fetchGameDetails(gameId);
      this.gamesSection.classList.add("d-none"); 
      this.details.classList.remove("d-none"); 
      this.gameUI.displayGameDetails(gameDetails); 
    } catch (error) {
      console.error("Error fetching game details:", error);
    } finally {
      this.toggleLoader(false); 
    }
  }
}

                  /*************************** Initialize the App ************************************************/

const API_URL = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const gameApp = new GameApp(API_URL); 


                 /**************************************Done******************************************* */  