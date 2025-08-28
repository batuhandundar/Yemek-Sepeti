document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitButton = e.target.querySelector('button[type="submit"]');
    const statusMessage = document.createElement('p');
    statusMessage.style.textAlign = 'center';
    statusMessage.style.marginTop = '10px';
    
    try {
        // Butonu devre dışı bırak ve yükleniyor mesajı göster
        submitButton.disabled = true;
        submitButton.textContent = 'Kayıt olunuyor...';
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        
        if (error) {
            throw error;
        }

        // Başarılı kayıt
        statusMessage.style.color = '#00cc00';
        statusMessage.textContent = 'Kayıt başarılı! Email adresinize gönderilen linke tıklayarak hesabınızı onaylayın.';
        e.target.appendChild(statusMessage);
        
        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);

    } catch (error) {
        // Hata mesajlarını Türkçeleştir
        let errorMessage = 'Bir hata oluştu. Tekrar deneyin.';
        
        if (error.message.includes('password')) {
            errorMessage = 'Şifre en az 6 karakter olmalıdır.';
        } else if (error.message.includes('email')) {
            errorMessage = 'Geçerli bir email adresi girin.';
        } else if (error.message.includes('already exists')) {
            errorMessage = 'Bu email adresi zaten kayıtlı.';
        }
        
        statusMessage.style.color = '#ff4444';
        statusMessage.textContent = errorMessage;
        e.target.appendChild(statusMessage);
        
        // Butonu tekrar aktif et
        submitButton.disabled = false;
        submitButton.textContent = 'Kayıt Ol';
    }
});