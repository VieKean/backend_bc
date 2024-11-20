function showUpdateButton(selectElement) {
    // Lấy giá trị trạng thái đã chọn
    const selectedStatus = selectElement.value;
    // Lấy trạng thái ban đầu
    const currentStatus = selectElement.querySelector('option[selected]').value;

    // Lấy nút submit và cancel dựa trên ID duy nhất
    const form = selectElement.closest('form');
    const updateButton = form.querySelector('input[type="submit"]');
    const cancelButton = form.querySelector('button[type="button"]');

    // Hiển thị nút Update và Cancel nếu trạng thái thay đổi
    if (selectedStatus !== currentStatus) {
        updateButton.style.display = 'inline-block';
        cancelButton.style.display = 'inline-block';
    } else {
        updateButton.style.display = 'none';
        cancelButton.style.display = 'none';
    }
}

function cancelUpdate(orderId) {
    // Khi nhấn Cancel, làm lại dropdown về trạng thái ban đầu
    const form = document.querySelector(`form[action="/order/update-status/${orderId}"]`);
    const select = form.querySelector('select');
    const currentStatus = form.querySelector('p').textContent.split(': ')[1].toLowerCase(); // Lấy trạng thái ban đầu
    select.value = currentStatus; // Đặt lại giá trị của dropdown về trạng thái cũ
    form.querySelector('input[type="submit"]').style.display = 'none'; // Ẩn nút Update
    form.querySelector('button[type="button"]').style.display = 'none'; // Ẩn nút Cancel
}