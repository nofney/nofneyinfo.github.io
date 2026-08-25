const API = "https://nofneyinfo-api.lukemilky143.workers.dev";

const visits = document.getElementById("visits");
const players = document.getElementById("players");
const favorites = document.getElementById("favorites");
const leaderboard = document.getElementById("leaderboard");
const projects = document.getElementById("projects");

const gameLinks = {
  4777817887: "https://www.roblox.com/games/13772394625",
  3021395192: "https://www.roblox.com/games/994732206",
  5654670037: "https://www.roblox.com/games/15178321936"
};

const roles = {
  4777817887: [
    ["gold","Art Designer • Prince Blade"],
    ["purple","Art Designer • Haunted Harvester"],
    ["blue","Scripter & Designer • 2023 Halloween Battlepass"]
  ],

  3021395192: [
    ["gold","Moderator"],
    ["purple","Thumbnail Art Designer"]
  ],

  5654670037: [
    ["gold","Moderator"],
    ["purple","Thumbnail Art Designer"],
    ["blue","First Person Animator"]
  ]
};

function format(value){

  if(value >= 1000000000)
    return (value / 1000000000).toFixed(2) + "B";

  if(value >= 1000000)
    return Math.round(value / 1000000) + "M";

  if(value >= 1000)
    return Math.round(value / 1000) + "K";

  return Math.round(value).toString();

}

function animate(element,target){

  const start = performance.now();
  const duration = 850;

  function frame(now){

    const progress = Math.min((now-start)/duration,1);

    const eased = 1 - Math.pow(1-progress,3);

    element.textContent = format(target*eased);

    if(progress<1)
      requestAnimationFrame(frame);

    else
      element.textContent = format(target);

  }

  requestAnimationFrame(frame);

}

async function load(){

  const response = await fetch(API+"?t="+Date.now());

  const data = await response.json();

  animate(visits,data.totals.visits);
  animate(players,data.totals.players);
  animate(favorites,data.totals.favorites);

  leaderboard.innerHTML="";

  data.leaderboard.forEach((game,index)=>{

    leaderboard.innerHTML += `
      <div class="row">

        <div class="leftRow">

          <div class="rank">
            #${index+1}
          </div>

          <img src="${game.thumbnail}" alt="">

          <div>${game.name}</div>

        </div>

        <div class="playerCount">
          ${format(game.playing)}
        </div>

      </div>
    `;

  });

  projects.innerHTML="";

  data.leaderboard.forEach(game=>{

    const badgeHTML = (roles[game.id] || [])

      .map(role=>`
        <div class="badge ${role[0]}">
          ${role[1]}
        </div>
      `).join("");

    projects.innerHTML += `

      <a class="project"
         href="${gameLinks[game.id]}"
         target="_blank">

        <div class="thumb">

          <img src="${game.thumbnail}" alt="">

          <div class="roleOverlay">
            ${badgeHTML}
          </div>

        </div>

        <div class="projectBody">

          <h3>${game.name}</h3>

          <div class="metrics">

            <div class="metric">

              <div class="metricLabel">
                VISITS
              </div>

              <div class="metricValue">
                ${format(game.visits)}
              </div>

            </div>

            <div class="metric">

              <div class="metricLabel">
                PLAYING NOW
              </div>

              <div class="metricValue">

                <span class="metricDot"></span>

                ${format(game.playing)}

              </div>

            </div>

            <div class="metric">

              <div class="metricLabel">
                FAVORITES
              </div>

              <div class="metricValue">
                ${format(game.favorites)}
              </div>

            </div>

          </div>

        </div>

      </a>

    `;

  });

}

load();

setInterval(load,60000);
