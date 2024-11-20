document.addEventListener("DOMContentLoaded", function () {
    // Khởi tạo Bootstrap Popover
    const popoverTriggerList = [].slice.call(document.querySelectorAll('.delete-btn'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Xử lý khi người dùng bấm nút Cancel
    document.body.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('cancel-btn')) {
            // Đóng popover
            const popoverElement = bootstrap.Popover.getInstance(e.target.closest('.delete-btn'));
            if (popoverElement) {
                popoverElement.hide(); // Đóng popover khi người dùng nhấn Cancel
            }
        }
    });
});
