document.getElementById('createAccountForm').addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        event.preventDefault(); // Ngăn chặn gửi biểu mẫu
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block'; 
    }
});