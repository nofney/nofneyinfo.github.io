const API = "https://nofneyinfo-api.lukemilky143.workers.dev/";

const leaderboard = document.getElementById("leaderboard");

const visits = document.getElementById("visits");
const players = document.getElementById("players");
const favorites = document.getElementById("favorites");

function format(value) {
  if (value >= 1_000_000_000)
    return (value / 1_000_000_000).toFixed(2) + "B";

  if (value >= 1_000_000)
    return Math.round(value / 1_000_000) + "M";

  if (value >= 1_000)
    return Math.round(value / 1_000) + "K";

  return Math.round(value).toString();
}

function animateNumber(element, endValue, duration = 900) {
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);

    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = endValue * eased;

    element.textContent = format(current);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      element.textContent = format(endValue);
    }
  }

  requestAnimationFrame(frame);
}

async function updateWebsite() {
  const response = await fetch(API + "?t=" + Date.now());
  const data = await response.json();

  animateNumber(visits, data.totals.visits);
  animateNumber(players, data.totals.players);
  animateNumber(favorites, data.totals.favorites);

  leaderboard.innerHTML = "";

  data.leaderboard.forEach((game, index) => {
    leaderboard.innerHTML += `
      <div class="leaderboard-row">
        <div class="leaderboard-left">
          <div class="rank">#${index + 1}</div>

          <img class="game-icon"
               src="${game.thumbnail}"
               alt="${game.name}">

          <span class="game-name">${game.name}</span>
        </div>

        <div class="player-count">
          ${format(game.playing)}
        </div>
      </div>
    `;
  });
}

updateWebsite();

// Refresh Roblox data every minute
setInterval(updateWebsite, 60000);
