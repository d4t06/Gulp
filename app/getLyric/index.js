// import { lyrics, speed } from "./config/lyrics";
import {lyricsString, speed} from './lyrics.js'

const $ = document.querySelector.bind(document)

const audio = $('.audio');
const startBtn = $('.start-btn');
const pauseBtn = $('.pause-btn');
const addBtn = $('.add-btn');
const container = $('.lyrics-container');
const resultContainer = $('.result-container');
const copyBtn = $('.copy-btn');

audio.playbackRate = speed;


let lyricsArr = lyricsString.split((/\r?\n/));
let result = [];

let index = 0;

let start = 0;
let end = 0;

const handleScroll = () => {
   const lyrics = document.querySelectorAll('.lyric');
   const current = lyrics[index]

   if (index > 0) {
      lyrics[index - 1].classList.remove("active")
   }
   if (current) {
      current.classList.add("active")
      current.scrollIntoView({ block: "center", behavior: "smooth" })
   }

   // result scroll
   const resultLyrics = document.querySelectorAll('.result-container .lyric');
   const currentResultLyric = resultLyrics[index-1]

   if (currentResultLyric) {
      currentResultLyric.scrollIntoView({ block: "center", behavior: "smooth" })
   }
}

const writeData = (arr) => {
   let string = '';
   for (let item of arr) {
      string += `<p class="lyric"> ${JSON.stringify(item.text || item)} <p/>`
   }
   return string;
}

pauseBtn.addEventListener("click", () => audio.pause())

copyBtn.addEventListener("click", () => navigator.clipboard.writeText(JSON.stringify(result)))

startBtn.addEventListener("click", () => {
   start = +audio.currentTime.toFixed(0);

   startBtn.style.display = 'none'
})

addBtn.addEventListener("click", () => {
   end = +audio.currentTime.toFixed(0);
   result.push({ start, end, text: lyricsArr[index] })
   index++;

   if (index == lyricsArr.length) {
      addBtn.style.display = 'none'
      return;
   }

   // update start
   start = end;
   end = 0;

   const htmlString = writeData(result);

   resultContainer.innerHTML = htmlString;
   handleScroll();

   
})

const run = () => {
   const baseLyrics = writeData(lyricsArr);
   container.innerHTML = baseLyrics;

   handleScroll();
}

run();


