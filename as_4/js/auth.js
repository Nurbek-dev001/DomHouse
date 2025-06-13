
document.addEventListener("DOMContentLoaded", function() {
    // Инициализация хранилища
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }


    document.getElementById('login-tab').addEventListener('click', () => switchTab('login'));
    document.getElementById('register-tab').addEventListener('click', () => switchTab('register'));


    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('login-form').addEventListener('submit', handleLogin);


    updateAuthStatus();
});

function switchTab(tabName) {
    // Скрываем все формы и убираем активный класс со всех табов
    ['login', 'register'].forEach(tab => {
        document.getElementById(`${tab}-tab`).classList.toggle('active', tab === tabName);
        document.getElementById(`${tab}-form`).style.display = tab === tabName ? 'block' : 'none';
    });
}

function handleRegister(e) {
    e.preventDefault();
    console.log("Register form submitted!"); 
    
    const formData = {
        name: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        phone: document.getElementById('register-phone').value,
        role: document.getElementById('register-role').value,
        password: document.getElementById('register-password').value
    };

    if (Object.values(formData).some(val => !val)) {
        alert('Please fill all fields');
        return;
    }

    // Сохранение пользователя
    const users = JSON.parse(localStorage.getItem('users'));
    users.push({...formData, id: Date.now(), isVerified: true});
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful!');
    switchTab('login');
}

function handleLogin(e) {
    e.preventDefault();

}

function updateAuthStatus() {
 
}
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Сохраняем текущего пользователя
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Показываем кнопку Post Listing
        updateAuthStatus();
        
        // Перенаправляем на index.html
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

function updateAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const postListingBtn = document.querySelector('.btn-post-listing');
    
    if (user) {
        // Показываем кнопку если пользователь авторизован
        if (postListingBtn) postListingBtn.style.display = 'block';
    } else {
        // Скрываем кнопку если не авторизован
        if (postListingBtn) postListingBtn.style.display = 'none';
    }
}
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // 1. Сохраняем данные пользователя
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // 2. Обновляем интерфейс
        updateAuthStatus();
        
        // 3. Перенаправляем и обновляем страницу
        window.location.href = 'index.html';
        
        // 4. Принудительно обновляем (если нужно)
        setTimeout(() => window.location.reload(), 100);
    } else {
        alert('Invalid email or password');
    }
}