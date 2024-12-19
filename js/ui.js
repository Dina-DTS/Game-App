
                    /******************class has functions for displaying data*******************/


export default class GameUI {
  constructor(gameData) {
    this.container = gameData;
    this.detailsContainer = document.querySelector("#detailsContent");
  }

//  function for displaying games in section games
  displayGames(games) {
    this.container.innerHTML = "";

    if (games.length === 0) {
      this.container.innerHTML = `<p class="text-center">No games found for this category.</p>`;
      return;
    }

    games.forEach((game) => {
      const descriptionWords = game.short_description.split(" ").slice(0, 10).join(" ");
      const gameCard = `
        <div class="col-md-3">
          <div class="card h-100 shadow-sm" data-id="${game.id}">
            <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center body-main">
                <h5 class="card-title">${game.title}</h5>
                 <button class="btn btn-primary details-btn" data-id="${game.id}">Free</button>
              </div>
              <p class="card-text">${descriptionWords}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <small>${game.genre}</small>
              <small>${game.platform}</small>
            </div>
          </div>
        </div>
      `;
      this.container.innerHTML += gameCard;
    });
  }


 //  function for displaying details of game clicked in section details
  displayGameDetails(gameDetails) {
    this.detailsContainer.innerHTML = `
      <div class="col-md-4 mt-5">
        <img src="${gameDetails.thumbnail}" class="img-fluid" alt="${gameDetails.title}">
      </div>
      <div class="col-md-8 mt-5 detail-div">

        <h2>${gameDetails.title}</h2>
        <p><strong>Category:</strong><small class="badge text-bg-info">${gameDetails.genre}</small></p>
        <p><strong>Plateform:</strong><small class="badge text-bg-info">${gameDetails.platform}</small></p>
        <p><strong>Status:</strong><small class="badge text-bg-info">${gameDetails.status}</small></p>
        <p>${gameDetails.description}</p>
        <a href="${gameDetails.game_url}" target="_blank" class="btn btn-outline-warning">Show Game</a>
      </div>
    `;
  }


}



