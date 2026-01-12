const audio = document.getElementById('myAudio');
const lyricText = document.getElementById('lyric-text');
const toggleBtn = document.getElementById('toggleBtn');
const endScreen = document.getElementById('end-screen');

// --- DỮ LIỆU LYRIC ---
// Bạn chỉnh sửa 'time' (giây) và 'text' (lời bài hát) ở đây
const lyrics = [
    { time: 0, text: "Giai điệu bắt đầu..." },
    { time: 5, text: "Vẫn như thường lệ là cùng đám bạn đi vào trong lớp..." },
    { time: 10, text: "Ngỡ như ngày bình thường đã cặp sách nhìn quanh trong thoáng chốc..." },
    { time: 15, text: "Ánh mắt chợt dừng lại, bóng dáng nhỏ nhắn làm căn phòng như được điểm tô hơn..." },
    { time: 20, text: "Tim vô tình đập thêm một nhịp, như tìm được kết chùm cô đơn..." },
    { time: 25, text: "Lời bài hát tiếp theo sẽ hiện ở đây..." }
];

// Xử lý nút Play/Pause
toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        toggleBtn.innerText = "PAUSE";
    } else {
        audio.pause();
        toggleBtn.innerText = "PLAY";
    }
});

// Cập nhật Lyric theo thời gian
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    
    // Tìm lyric phù hợp nhất với thời gian hiện tại
    const activeLyric = lyrics.reduce((prev, curr) => {
        return (curr.time <= currentTime) ? curr : prev;
    });

    if (lyricText.innerText !== activeLyric.text) {
        lyricText.style.opacity = 0; // Hiệu ứng fade out
        setTimeout(() => {
            lyricText.innerText = activeLyric.text;
            lyricText.style.opacity = 1; // Hiệu ứng fade in
        }, 500);
    }
});

// Xử lý khi kết thúc bài hát
audio.addEventListener('ended', () => {
    endScreen.classList.remove('hidden');
    setTimeout(() => {
        endScreen.classList.add('visible');
    }, 100);
});
