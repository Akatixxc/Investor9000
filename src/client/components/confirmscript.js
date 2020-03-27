const password = document.getElementById('password');
const confirm = document.getElementById('confirm_password');

function validatePassword() {
    if (password.value !== confirm.value) {
        confirm.setCustomValidity('Salasana ei täsmää');
    } else {
        confirm.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm.onkeyup = validatePassword;
