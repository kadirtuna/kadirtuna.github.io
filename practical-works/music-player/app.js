const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const audio = document.querySelector("#audio");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const playTag = document.querySelector("#controls #play i");
const next = document.querySelector("#controls #next");
const currentTime = document.querySelector("#progress .times #current-time");
const duration = document.querySelector("#progress .times #duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const collapseSongs = document.querySelector("#collapse__songs");

const player = new MusicPlayer(musicList);
const collapseSongBg = "bg-warning";
let collapseATag;

window.addEventListener("load", () => {    
    let music = player.getMusic();
    fillCollapseSongs();
    collapseATag = collapseSongs.querySelector(`#collapse__a-0`);
    collapseATag.classList.add(collapseSongBg);
    displayMusic(music, player.index);
});


function displayMusic(music, index){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
    collapseATag.classList.remove(collapseSongBg);
    collapseATag = collapseSongs.querySelector(`#collapse__a-${index}`);

    collapseATag.classList.add(collapseSongBg);
}

const fillCollapseSongs = () => {
    let collapseSongsHTML = ``;

    for(let i = 0; i < player.musicList.length; i++){
        collapseSongsHTML = `
        <div id="collapse__a-${i}">
            <a href="#" onclick="changeMusic(${i})" class="collapse__music text-decoration-none text-black">
                <div class="d-flex justify-content-between align-items-center py-2 px-3">
                    <p class="m-0">${player.musicList[i].getName()}</p>
                    <span id="music-${i}" class="bg-primary text-white rounded-pill px-3">3:40</span>
                    <audio class="music-${i}" src="mp3/${player.musicList[i].file}"></audio>
                </div>
            </a>
        </div>
        <div class="border-bottom"></div>`;

        collapseSongs.insertAdjacentHTML("beforeend", collapseSongsHTML);

        let audioTag = collapseSongs.querySelector(`.music-${i}`); 
        let audioSpanTag = collapseSongs.querySelector(`#music-${i}`); 

        audioTag.addEventListener("loadeddata", () => {
            audioSpanTag.textContent = calculateTime(audioTag.duration);
        });
    }
};

play.addEventListener("click", () => {
    const isMusicPlaying = container.classList.contains("playing");
    isMusicPlaying ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => { prevMusic(); });

next.addEventListener("click", () => { nextMusic(); });

const pauseMusic = () => {
    audio.pause();
    playTag.classList.remove("fa-pause");
    playTag.classList.add("fa-play");
    container.classList.remove("playing");
}

const playMusic = () => {
    audio.play();
    playTag.classList.remove("fa-play");
    playTag.classList.add("fa-pause");
    container.classList.add("playing");
}

const prevMusic = () => {
    player.prev();
    displayMusic(player.getMusic(), player.index);
    playMusic();
}

const changeMusic = (index) => {
    player.index = index;
    displayMusic(player.getMusic(), player.index);
    playMusic();
}

const nextMusic = () => {
    player.next();
    displayMusic(player.getMusic(), player.index);
    playMusic();
}

const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60);
    const second = Math.floor(totalSeconds % 60);
    const updatedSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updatedSecond}`;
    
    return result;
};

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
    next.click();
});

progressBar.addEventListener("input", () =>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted";
let volumeValue = 100;

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    let audioValue = value / 100;
    audio.volume = audioValue;
    volumeValue = volumeBar.value;

    if(audioValue == 0){
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark me-2";
        volumeValue = 10;
    }
    else{
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high me-2";

        if (audio.volume < 0.1){
            volumeValue = 10;
        }
    }

});

volume.addEventListener("click", () => {
    if(muteState === "unmuted"){
        volumeValue = volumeBar.value;
        muteState = "muted";
        volumeBar.value = 0;
        audio.muted = true;
        volume.classList = "fa-solid fa-volume-xmark me-2";
    }
    else {
        muteState = "unmuted";
        audio.muted = false;
        volumeBar.value = volumeValue;
        audio.volume = volumeValue / 100;
        volume.classList = "fa-solid fa-volume-high me-2";
    }
});