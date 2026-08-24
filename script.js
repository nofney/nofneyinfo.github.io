const API = "https://nofneyinfo-api.lukemilky143.workers.dev";

const visits = document.getElementById("visits");
const players = document.getElementById("players");
const favorites = document.getElementById("favorites");
const leaderboard = document.getElementById("leaderboard");
const projects = document.getElementById("projects");

const roles = {
  4777817887: [
    ["gold","Art Designer","Prince Blade"],
    ["purple","Art Designer","Haunted Harvester"],
    ["blue","Scripter & Designer","2023 Halloween Battlepass"]
  ],

  3021395192: [
    ["gold","Moderator",""],
    ["purple","Thumbnail Art Designer",""]
  ],

  5654670037: [
    ["gold","Moderator",""],
    ["purple","Thumbnail Art Designer",""],
    ["blue","First Person Animator",""]
  ]
};

function format(value){
  if(value>=1e9) return (value/1e9).toFixed(2)+"B";
  if(value>=1e6) return Math.round(value/1e6)+"M";
  if(value>=1e3) return Math.round(value/1e3)+"K";
  return Math.round(value);
}

function animate(el,target){
  const start = performance.now();
  const duration = 900;

  function frame(now){
    const p = Math.min((now-start)/duration,1);
    const eased = 1-Math.pow(1-p,3);

    el.textContent = format(target*eased);

    if(p<1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

async function load(){

  const res = await fetch(API+"?"+Date.now());
  const data = await res.json();

  animate(visits,data.totals.visits);
  animate(players,data.totals.players);
  animate(favorites,data.totals.favorites);

  leaderboard.innerHTML="";

  data.leaderboard.forEach((game,index)=>{

    leaderboard.innerHTML += `
      <div class="row">

        <div class="leftRow">
          <div class="rank">#${index+1}</div>

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
          ${role[1]}${role[2] ? " • "+role[2] : ""}
        </div>
      `).join("");

    projects.innerHTML += `

      <div class="project">

        <img src="${game.thumbnail}" alt="">

        <div class="projectBody">

          <h3>${game.name}</h3>

          <div class="badges">
            ${badgeHTML}
          </div>

          <div class="metrics">

            <div>👥 ${format(game.playing)} Playing</div>

            <div>🎮 ${format(game.visits)} Visits</div>

            <div>⭐ ${format(game.favorites)} Favorites</div>

          </div>

        </div>

      </div>

    `;

  });

}

load();

setInterval(load,60000);
