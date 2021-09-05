
const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanScore = document.querySelector('.papan-score');
const pop = document.getElementById('pop');

let tanahSebelumnya;
let selesai;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const rand = tanah[t];
  return (rand == tanahSebelumnya ? rand : tanahSebelumnya = rand);
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const rand = randomTanah(tanah);
  const wRand = randomWaktu(300, 600);
  rand.classList.add('muncul');
  setTimeout(() => {
    rand.classList.remove('muncul');
    if (!selesai) munculkanTikus();
  }, wRand);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanScore.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 10000);
}

function pukul() {
  skor++
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanScore.textContent = skor;
}


tikus.forEach(t => {
  t.addEventListener('click', pukul);
});