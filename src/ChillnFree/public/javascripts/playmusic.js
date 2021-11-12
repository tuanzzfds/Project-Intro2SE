let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let btnPlayList = document.querySelector(".play-list");
let btnHome = document.querySelector(".go-home");
let playListBox = document.querySelector(".playlist-box");
let songs = document.querySelector(".list-song");



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
	{
		name: "first song",
		path: "http://localhost:3000/files/audio/4b8b72ee7e5f49e8119a6d77faa3c0a7.mp3",
		img: "/images/2.jpg",
		singer: "Son Tung MTP"
	},
	{
		name: "second song",
		path: "/music/2.mp3",
		img: "/images/2.jpg",
		singer: "2"
	},
	{
		name: "third song",
		path: "/music/3.mp3",
		img: "/images/3.png",
		singer: "3"
	},
	{
		name: "fourth song",
		path: "/music/4.mp3",
		img: "/images/4.jpg",
		singer: "4"
	},
	{
		name: "fifth song",
		path: "/music/5.mp3",
		img: "/images/5.jpg",
		singer: "5"
	},
	{
		name: "sixth song",
		path: "/music/6.mp3",
		img: "/images/6.jpg",
		singer: "6"
	}
];

let checkbtnPlaylist = false;
// All functions
btnPlayList.addEventListener("click", function () {
	if (!checkbtnPlaylist)
	{
		playListBox.classList.add("active");
		checkbtnPlaylist = true;
	}
	else {
		playListBox.classList.remove("active");
		checkbtnPlaylist = false;
	}
});
// handle hide playlist
btnHome.addEventListener("click", function () {
	playListBox.classList.remove("active");
});

function setSongs() {
	songs.innerHTML = "";

	for (let i = 0; i < All_song.length; i++) {
		const music = new Audio(`${All_song[i].path}`);
		songs.insertAdjacentHTML(
			"beforeend",
			`<div class="song-info">
					   	<div class="left">
							<span class="name-song">${All_song[i].name}<br></span>
					   		<span class="author">${All_song[i].singer}</span>
				 	  	</div>
            </div>`
		);
	}
}
setSongs();

songs.addEventListener("click", function (e) {
    const target = e.target;
    const nameSong = target.querySelector(".name-song").textContent;
	console.log(nameSong);
    const song = All_song.find((audio) => audio.name === nameSong);
	console.log(song);
	index_no = (All_song.findIndex(s => s === song));
	load_track(index_no);
    track.play();
    timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no;

    playListBox.classList.remove("active");
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  });
// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	// console.log("durationchange: " + track.duration);
	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#148F77";
	}
}

function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}

//==========================================================
var x = document.getElementById("Pomodoro");
document.getElementById('pomodoroTimer').onclick = function (e) {
	console.log(x.style.display);
	if (x.style.display == "none" || x.style.display=="") {
		x.style.display = "flex";
	} else {
		x.style.display = "none";
	}
}

let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
	var offset = - length - length * value / (timePercent);
	progressBar.style.strokeDashoffset = offset;
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
};


const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');

let intervalTimer;
let timeLeft;
let wholeTime = 0.5 * 60;
let isPaused = false;
let isStarted = false;


update(wholeTime, wholeTime);
displayTimeLeft(wholeTime);

document.getElementById('btn1').onclick = function (e) {
	wholeTime = timeLeft = 25 * 60;
	update(wholeTime, wholeTime);
	displayTimeLeft(wholeTime)
}

document.getElementById('btn2').onclick = function (e) {
	wholeTime = timeLeft = 5 * 60;
	update(wholeTime, wholeTime);
	displayTimeLeft(wholeTime)
}

document.getElementById('btn3').onclick = function (e) {
	wholeTime = timeLeft = 15 * 60;
	update(wholeTime, wholeTime);
	displayTimeLeft(wholeTime)
}
function changeWholeTime(seconds) {
	if ((wholeTime + seconds) > 0) {
		wholeTime += seconds;
		update(wholeTime, wholeTime);
	}
}

for (var i = 0; i < setterBtns.length; i++) {
	setterBtns[i].addEventListener("click", function (event) {
		var param = this.dataset.setter;
		switch (param) {
			case 'minutes-plus':
				changeWholeTime(1 * 60);
				break;
			case 'minutes-minus':
				changeWholeTime(-1 * 60);
				break;
			case 'seconds-plus':
				changeWholeTime(1);
				break;
			case 'seconds-minus':
				changeWholeTime(-1);
				break;
		}
		displayTimeLeft(wholeTime);
	});
}

function timers(seconds) {
	let remainTime = Date.now() + (seconds * 1000);
	displayTimeLeft(seconds);

	intervalTimer = setInterval(function () {
		timeLeft = Math.round((remainTime - Date.now()) / 1000);
		if (timeLeft < 0) {
			clearInterval(intervalTimer);
			isStarted = false;
			setterBtns.forEach(function (btn) {
				btn.disabled = false;
				btn.style.opacity = 1;
			});
			displayTimeLeft(wholeTime);
			pauseBtn.classList.remove('pause');
			pauseBtn.classList.add('play');
			return;
		}
		displayTimeLeft(timeLeft);
	}, 1000);
}

function pauseTimer(event) {
	if (isStarted === false) {
		timers(wholeTime);
		isStarted = true;
		this.classList.remove('play');
		this.classList.add('pause');

		setterBtns.forEach(function (btn) {
			btn.disabled = true;
			btn.style.opacity = 0.5;
		});

	} else if (isPaused) {
		this.classList.remove('play');
		this.classList.add('pause');
		timers(timeLeft);
		isPaused = isPaused ? false : true
	} else {
		this.classList.remove('pause');
		this.classList.add('play');
		clearInterval(intervalTimer);
		isPaused = isPaused ? false : true;
	}
}

function displayTimeLeft(timeLeft) {
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;
	let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	displayOutput.textContent = displayString;
	update(timeLeft, wholeTime);
}

pauseBtn.addEventListener('click', pauseTimer);