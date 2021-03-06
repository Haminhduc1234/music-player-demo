const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const header = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const playBtn = $('.btn-toggle-play');
const player = $('.player');

const progress = $('#progress');

const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    songs: [
        {
            name: 'Reality',
            singer: 'Janieck-Devy',
            path: 'assets/music/Reality-Lost-Frequencies-Janieck-Devy.mp3',
            image: 'assets/img/reality.jpg'
        },
        {
            name: 'The River',
            singer: 'Axel-Johansson',
            path: 'assets/music/The-River-Axel-Johansson.mp3',
            image: 'assets/img/photo-1557315360-6a350ab4eccd.jpg'
        },
        {
            name: 'I Do',
            singer: 'Ale Smith',
            path: 'assets/music/I-Do-911.mp3',
            image: 'assets/img/photo-1421217336522-861978fdf33a.jpg'
        },
        {
            name: 'Save Me',
            singer: 'DEAMN',
            path: 'assets/music/Save-Me-DEAMN.mp3',
            image: 'assets/img/photo-1487180144351-b8472da7d491.jpg'
        },
        {
            name: 'My Love',
            singer: 'WestLife',
            path: 'assets/music/My-Love-Westlife.mp3',
            image: 'assets/img/photo-1518609878373-06d740f60d8b.jpg'
        },
        {
            name: 'I Do',
            singer: 'Ale Smith',
            path: 'assets/music/I-Do-911.mp3',
            image: 'assets/img/1119ea1646729831f21aa14b4a14419d.jpg'
        },
        {
            name: 'Save Me',
            singer: 'DEAMN',
            path: 'assets/music/Save-Me-DEAMN.mp3',
            image: 'assets/img/b99471efd3468a598083b854ceb79db1.jpg'
        },
        {
            name: 'Reality',
            singer: 'Janieck-Devy',
            path: 'assets/music/Reality-Lost-Frequencies-Janieck-Devy.mp3',
            image: 'assets/img/reality.jpg'
        },
        {
            name: 'The River',
            singer: 'Axel-Johansson',
            path: 'assets/music/The-River-Axel-Johansson.mp3',
            image: 'assets/img/photo-1557315360-6a350ab4eccd.jpg'
        },
        {
            name: 'I Do',
            singer: 'Ale Smith',
            path: 'assets/music/I-Do-911.mp3',
            image: 'assets/img/photo-1421217336522-861978fdf33a.jpg'
        },
        {
            name: 'Save Me',
            singer: 'DEAMN',
            path: 'assets/music/Save-Me-DEAMN.mp3',
            image: 'assets/img/photo-1487180144351-b8472da7d491.jpg'
        },
        {
            name: 'My Love',
            singer: 'WestLife',
            path: 'assets/music/My-Love-Westlife.mp3',
            image: 'assets/img/photo-1518609878373-06d740f60d8b.jpg'
        },
        {
            name: 'I Do',
            singer: 'Ale Smith',
            path: 'assets/music/I-Do-911.mp3',
            image: 'assets/img/1119ea1646729831f21aa14b4a14419d.jpg'
        },
        {
            name: 'Save Me',
            singer: 'DEAMN',
            path: 'assets/music/Save-Me-DEAMN.mp3',
            image: 'assets/img/b99471efd3468a598083b854ceb79db1.jpg'
        }
    ],
    render: function () {
        const htmlList = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmlList.join('');

    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvent: function () {

        const _this = this;
        // X??? l?? ph??ng to / thu nh??? CD 
        const cdWidth = cd.offsetWidth;

        //X??? l?? CD quay/d???ng
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, //quay trong 10 seconds
            iterations: Infinity // quay v?? h???n

        });

        cdThumbAnimate.pause();

        document.onscroll = function () {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        // X??? l?? khi play th?? ?????i icon 
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }

        }
        // Khi song ???????c play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // Khi song ???????c pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        // Khi ti???n ????? b??i h??t thay ?????i 
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }
        // X??? l?? khi tua (thay ?????i ti???n ?????) b??i h??t 
        progress.onchange = function (e) {
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
        }
        // X??? l?? khi next Song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        // X??? l?? khi prev Song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        //X??? l?? khi repeat b??i h??t

        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // X??? l?? n??t nh???n random
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.randomBtn);
        }

        //X??? l?? next song khi b??i h??t hi???n t???i k???t th??c
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        // L???ng nghe click v??o playlist
        playlist.onclick = function(e) {
            // X??? l?? khi click v??o b??i ????
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option'))
            {
                //Khi ??ang click v??o song
                if(songNode) {
                    //console.log(songNode.getAttribute('data-index'));
                    //console.log(songNode.dataset.index);
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                else{
                    // Khi ??ang click v??o option
                }
            }
        }


    },
    loadCurrentSong: function () {
        header.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'center',// k??o ?????n v??? tr?? gi???a m??n h??nh
                inline : 'center'
            });
        }, 200);
    },

    start: function () {
        // ?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();
        // L???ng nghe v?? x??? l?? c??c s??? ki???n DOM events
        this.handleEvent();
        //T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng 
        this.loadCurrentSong();
        this.render();
    }
}
app.start();