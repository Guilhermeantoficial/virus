document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Initialize Gallery Swiper
    const gallerySwiper = new Swiper('.gallerySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Gallery navigation
    document.querySelector('.gallery-prev').addEventListener('click', () => {
        gallerySwiper.slidePrev();
    });

    document.querySelector('.gallery-next').addEventListener('click', () => {
        gallerySwiper.slideNext();
    });

    // Poetry navigation
    const poems = document.querySelectorAll('.poem');
    let currentPoem = 0;

    function showPoem(index) {
        poems.forEach(poem => poem.style.display = 'none');
        poems[index].style.display = 'block';
    }

    showPoem(currentPoem);

    document.querySelector('.poetry-prev').addEventListener('click', () => {
        currentPoem = (currentPoem - 1 + poems.length) % poems.length;
        showPoem(currentPoem);
    });

    document.querySelector('.poetry-next').addEventListener('click', () => {
        currentPoem = (currentPoem + 1) % poems.length;
        showPoem(currentPoem);
    });

    // Music Player Functionality
    const musicPlayer = {
        audio: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
        isPlaying: false,
        currentTime: 0,
        duration: 0,

        init: function () {
            this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
            this.audio.addEventListener('loadedmetadata', () => {
                this.duration = this.audio.duration;
                document.querySelector('.duration').textContent = this.formatTime(this.duration);
            });

            document.getElementById('play').addEventListener('click', this.togglePlay.bind(this));
            document.getElementById('prev').addEventListener('click', this.prevSong.bind(this));
            document.getElementById('next').addEventListener('click', this.nextSong.bind(this));
            document.getElementById('repeat').addEventListener('click', this.toggleRepeat.bind(this));
            document.getElementById('shuffle').addEventListener('click', this.toggleShuffle.bind(this));

            document.querySelector('.progress-area').addEventListener('click', this.setProgress.bind(this));
        },

        togglePlay: function () {
            if (this.isPlaying) {
                this.audio.pause();
                document.getElementById('play').classList.remove('fa-pause');
                document.getElementById('play').classList.add('fa-play');
            } else {
                this.audio.play();
                document.getElementById('play').classList.remove('fa-play');
                document.getElementById('play').classList.add('fa-pause');
            }
            this.isPlaying = !this.isPlaying;
        },

        updateProgress: function () {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
            document.querySelector('.current').textContent = this.formatTime(this.audio.currentTime);
        },

        formatTime: function (seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        },

        setProgress: function (e) {
            const width = this.progressArea.clientWidth;
            const clickX = e.offsetX;
            const duration = this.audio.duration;

            this.audio.currentTime = (clickX / width) * duration;
        },

        prevSong: function () {
            alert('Música anterior selecionada!');
        },

        nextSong: function () {
            alert('Próxima música selecionada!');
        },

        toggleRepeat: function () {
            this.audio.loop = !this.audio.loop;
            document.getElementById('repeat').classList.toggle('active');
        },

        toggleShuffle: function () {
            document.getElementById('shuffle').classList.toggle('active');
        }
    };

    // Initialize the music player
    musicPlayer.init();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .gallery-item, .player-container, .poetry-container').forEach(el => {
        observer.observe(el);
    });

    // Gallery hover effect for mobile
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        });
    }
});