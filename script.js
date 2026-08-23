const API = "https://nofneyinfo-api.lukemilky143.workers.dev";

const visits = document.getElementById("visits");
const players = document.getElementById("players");
const favorites = document.getElementById("favorites");
const leaderboard = document.getElementById("leaderboard");

function format(n){
  if(n>=1e9) return (n/1e9).toFixed(2)+"B";
  if(n>=1e6) return Math.round(n/1e6)+"M";
  if(n>=1e3) return Math.round(n/1e3)+"K";
  return Math.round(n).toString();
}

function animate(el,target){
  const start=performance.now();
  const duration=850;

  function step(t){
    const p=Math.min((t-start)/duration,1);
    const e=1-Math.pow(1-p,3);
    el.textContent=format(target*e);
    if(p<1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

async function load(){
  const res=await fetch(API+"?t="+Date.now());
  const data=await res.json();

  animate(visits,data.totals.visits);
  animate(players,data.totals.players);
  animate(favorites,data.totals.favorites);

  leaderboard.innerHTML="";

  data.leaderboard.forEach((g,i)=>{
    leaderboard.innerHTML += `
      <div class="row">
        <div class="leftRow">
          <div class="rank">#${i+1}</div>
          <img src="${g.thumbnail}">
          <div>${g.name}</div>
        </div>
        <strong>${format(g.playing)}</strong>
      </div>
    `;
  });
}

load();
setInterval(load,60000);
