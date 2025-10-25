// Chờ cho đến khi toàn bộ tài liệu (DOM) được tải xong
$(document).ready(function() {

    // Yêu cầu: Sử dụng jQuery
    // Ví dụ 1: Thay đổi giao diện Navbar khi cuộn trang
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var navbar = $('.navbar');
        var navbarHeight = navbar.outerHeight();

        // Nếu cuộn qua 100px
        if (scroll > 100) {
            // Thêm lớp 'scrolled' vào navbar
            navbar.addClass('scrolled shadow-lg');
            navbar.removeClass('bg-primary');
            navbar.css('background-color', 'rgba(0, 104, 74, 0.9)'); /* Màu xanh mờ */
            navbar.css('backdrop-filter', 'blur(5px)'); /* Hiệu ứng mờ kính (CSS3) */
        } else {
            // Xóa lớp 'scrolled'
            navbar.removeClass('scrolled shadow-lg');
            navbar.css('background-color', ''); /* Trả về màu gốc */
            navbar.css('backdrop-filter', 'none');
            navbar.addClass('bg-primary');
        }
    });

    // Ví dụ 2: Hiệu ứng cuộn mượt khi nhấn vào link (Smooth Scrolling)
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault(); // Ngăn hành vi nhảy trang mặc định

        var target = $(this.hash); // Lấy target từ href
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 60 // Trừ 60px chiều cao navbar
            }, 800); // Tốc độ cuộn 800ms
        }
    });

    // Yêu cầu: Sử dụng JavaScript (thuần)
    // Ví dụ 3: Log ra console khi một card được click
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').innerText;
            console.log('Bạn đã click vào card: ' + cardTitle);
        });
    });

});

// Chờ cho đến khi toàn bộ tài liệu (DOM) được tải xong
$(document).ready(function() {

    // --- PHẦN NAVBAR (Giữ nguyên code của bạn) ---
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var navbar = $('.navbar');
        var navbarHeight = navbar.outerHeight();

        if (scroll > 100) {
            navbar.addClass('scrolled shadow-lg');
            navbar.removeClass('bg-primary');
            navbar.css('background-color', 'rgba(0, 104, 74, 0.9)'); 
            navbar.css('backdrop-filter', 'blur(5px)');
        } else {
            navbar.removeClass('scrolled shadow-lg');
            navbar.css('background-color', '');
            navbar.css('backdrop-filter', 'none');
            navbar.addClass('bg-primary');
        }
    });

    // --- PHẦN XỬ LÝ BÌNH LUẬN (Đã cập nhật) ---
    // Chỉ chạy code này nếu trang có form bình luận
    if ($('#comment-form').length) {
        
        // ID duy nhất cho mỗi bài blog (có thể lấy từ URL, nhưng ở đây ta đặt cố định)
        const POST_ID = 'blog_post_sai_gon_food';

        // 1. HÀM TẢI MẢNG BÌNH LUẬN TỪ STORAGE
        function getComments() {
            return JSON.parse(localStorage.getItem(POST_ID)) || [];
        }

        // 2. HÀM LƯU MẢNG BÌNH LUẬN VÀO STORAGE
        function saveComments(comments) {
            localStorage.setItem(POST_ID, JSON.stringify(comments));
        }

        // 3. HÀM HIỂN THỊ (RENDER) BÌNH LUẬN RA GIAO DIỆN
        function renderComments() {
            let comments = getComments();
            let commentList = $('#comment-list');
            
            commentList.empty(); // Xóa sạch danh sách cũ
            
            if (comments.length === 0) {
                commentList.html('<p class="text-muted">Chưa có bình luận nào.</p>');
            } else {
                // Sắp xếp: bình luận mới nhất lên đầu
                comments.sort((a, b) => b.id - a.id); 

                comments.forEach(function(comment) {
                    // Chuyển đổi ID (timestamp) thành ngày giờ
                    let commentDate = new Date(comment.id).toLocaleString('vi-VN');
                    
                    // Tạo HTML cho mỗi bình luận
                    let commentHtml = `
                        <div class="card bg-light mb-2 comment-card" data-id="${comment.id}">
                            <div class="card-body">
                                <h6 class="card-title fw-bold">${comment.name}</h6>
                                <p class="card-text">${comment.text}</p>
                                <small class="text-muted">${commentDate}</small>
                                <div class="mt-2 action-buttons">
                                    <button class="btn btn-sm btn-outline-primary edit-btn">Sửa</button>
                                    <button class="btn btn-sm btn-outline-danger delete-btn">Xóa</button>
                                </div>
                            </div>
                        </div>
                    `;
                    commentList.append(commentHtml); // Thêm vào danh sách
                });
            }
            // Cập nhật số lượng bình luận
            $('#comment-count').text(comments.length);
        }

        // 4. XỬ LÝ GỬI FORM (TẠO BÌNH LUẬN MỚI)
        $('#comment-form').on('submit', function(e) {
            e.preventDefault(); 

            let userName = $('#comment-name').val().trim();
            let userText = $('#comment-text').val().trim();
            
            if (!userName || !userText) {
                alert("Vui lòng nhập đầy đủ tên và nội dung!");
                return;
            }

            let newComment = {
                // Dùng Date.now() làm ID duy nhất
                id: Date.now(), 
                name: userName,
                text: userText
            };

            let comments = getComments();
            comments.push(newComment);
            saveComments(comments);
            
            renderComments(); // Hiển thị lại danh sách
            $('#comment-form')[0].reset(); // Xóa form
        });

        // 5. XỬ LÝ NÚT XÓA (Sử dụng Event Delegation)
        $('#comment-list').on('click', '.delete-btn', function() {
            if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
                // Lấy ID từ data-id của thẻ cha
                let commentId = $(this).closest('.comment-card').data('id');
                
                let comments = getComments();
                // Lọc ra mảng mới, bỏ đi bình luận có ID trùng
                let newComments = comments.filter(comment => comment.id != commentId);
                
                saveComments(newComments);
                renderComments(); // Hiển thị lại
            }
        });

        // 6. XỬ LÝ NÚT SỬA (Sử dụng Event Delegation)
        $('#comment-list').on('click', '.edit-btn', function() {
            let card = $(this).closest('.comment-card');
            let commentId = card.data('id');
            let currentText = card.find('.card-text').text();

            // Sử dụng prompt để sửa nhanh (Giải pháp đơn giản cho project)
            let newText = prompt("Sửa bình luận của bạn:", currentText);

            // Nếu người dùng nhập và không nhấn "Cancel"
            if (newText !== null && newText.trim() !== '') {
                let comments = getComments();
                
                // Tìm bình luận cần sửa và cập nhật
                let commentToEdit = comments.find(comment => comment.id == commentId);
                if (commentToEdit) {
                    commentToEdit.text = newText.trim();
                    saveComments(comments);
                    renderComments(); // Hiển thị lại
                }
            }
        });

        // TẢI BÌNH LUẬN KHI TRANG VỪA MỞ LẦN ĐẦU
        renderComments();
    }
    
});