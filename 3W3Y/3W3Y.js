const audio = document.getElementById('myAudio');
const lyricText = document.getElementById('lyric-text');
const toggleBtn = document.getElementById('toggleBtn');
const endScreen = document.getElementById('end-screen');

// --- DỮ LIỆU LYRIC ---
// Bạn chỉnh sửa 'time' (giây) và 'text' (lời bài hát) ở đây
const lyrics = [
    { time: 0, text: "..." },
    { time: 16, text: "Một buổi sáng, như thường lệ, lại cùng đám bạn đi vào trong lớp học" },
    { time: 20, text: "Ngỡ như ngày bình thường, đặt cặp sách, nhìn quanh trong thoáng chốc" },
    { time: 24, text: "Ánh mắt chợt dừng lại, bóng dáng nhỏ nhắn làm căn phòng như được điểm tô hơn..." },
    { time: 28, text: "Tim vô tình đập thêm một nhịp, như tìm được cách trốn cô đơn" },
    { time: 31, text: "Lòng rối bời, vào chỗ ngồi, gương mặt vẫn nghiêng về bên đấy" },
    { time: 35, text: "Tự mình nhìn, tự mình ngắm như thể không gian này chẳng ai thấy" },
    { time: 39, text: "Sâu bên trong tâm hồn, nội tâm đang bắt mình phải bước đi:" },
    { time: 43, text: "\"Mày phải học được cách chủ động, đừng để sau này lại nói là:\"" },
    { time: 46, text: "\"Ước gì ngày ấy...\"" },
    { time: 50, text: "Ta ở bên nhau, giữ cho nhau ngàn vạn điều suy nghĩ" },
    { time: 54, text: "\"Ước gì tình ta...\"" },
    { time: 57, text: "Sẽ mãi đậm sâu, ngày tháng năm hay là cả thập kỷ" },
    { time: 61, text: "\"Thế gian đổi thay...\"" },
    { time: 64, text: "Anh vẫn ước lòng mình lặng im như ngày đầu bên em" },
    { time: 69, text: "Thời gian vẫn trôi..." },
    { time: 70, text: "3 tuần hay 3 năm, anh vẫn chấp nhận mình đánh đổi" },
    { time: 74, text: "..." },
    { time: 75, text: "Những chiếc bánh nho nhỏ để kéo mình về gần nhau" },
    { time: 78, text: "Những khoảnh khắc nhỏ nhoi đời thường khiến trái tim chẳng còn đau" },
    { time: 81, text: "Em cũng biết, khi bên em anh cảm thấy hạnh phúc thế nào" },
    { time: 85, text: "Dạo cùng em vào lúc nữa đêm thì bầu trời tối cũng thành đầy sao nhưng phải làm sao" },
    { time: 89, text: "Nhưng phải làm sao..." },
    { time: 90, text: "Khi đây chỉ mới là tự sự, của bản thân mình" },
    { time: 93, text: "Em có những nỗi lòng riêng, có cảm xúc và có cả tấm chân tình" },
    { time: 97, text: "Anh đã từng nói: \"Anh không nhận rằng mình là người tốt đâu\"" },
    { time: 100, text: "\"Nhưng lời yêu em anh không tạm bợ, để thời gian minh chứng sau\"" },
    { time: 105, text: "\"Ước gì ngày ấy...\"" },
    { time: 108, text: "Ta ở bên nhau, giữ cho nhau ngàn vạn điều suy nghĩ" },
    { time: 113, text: "\"Ước gì tình ta...\"" },
    { time: 116, text: "Sẽ mãi đậm sâu, ngày tháng năm hay là cả thập kỷ" },
    { time: 120, text: "\"Thế gian đổi thay...\"" },
    { time: 124, text: "Anh vẫn ước lòng mình lặng im như ngày đầu bên em" },
    { time: 129, text: "Thời gian vẫn trôi..." },
    { time: 130, text: "3 tuần hay 3 năm, anh vẫn chấp nhận mình đánh đổi" },
    { time: 134, text: "..." },
];

// Xử lý nút Play/Pause
toggleBtn.addEventListener('click', () => {
    toggleBtn.innerText = "Play";
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
