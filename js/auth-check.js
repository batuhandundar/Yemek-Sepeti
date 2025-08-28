// Basit admin kontrolü - sadece şifre ile giriş
window.onload = function() {
    // Admin sayfasında mıyız kontrol et
    const isAdminPage = window.location.pathname.includes('admin');
    
    if (isAdminPage) {
        // Admin kontrolü - localStorage'da admin flag var mı?
        const isAdmin = localStorage.getItem('isAdmin');
        
        if (!isAdmin) {
            // Admin şifresi iste
            const password = prompt('Admin şifresi:');
            if (password === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                alert('Yanlış şifre!');
                window.location.href = 'index.html';
                return;
            }
        }
    }
    
    // Profile butonu ayarla - Supabase kontrolü ile
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.onclick = async () => {
            try {
                if (window.supabase) {
                    const { data: { session } } = await window.supabase.auth.getSession();
                    
                    if (session) {
                        // Kullanıcının admin olup olmadığını kontrol et
                        const { data: profile } = await window.supabase
                            .from('profiles')
                            .select('is_admin')
                            .eq('id', session.user.id)
                            .single();

                        if (profile && profile.is_admin) {
                            window.location.href = 'admin.html';
                            return;
                        }
                    }
                }
                
                // Admin değilse veya Supabase çalışmıyorsa localStorage kontrol et
                const isAdmin = localStorage.getItem('isAdmin');
                if (isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'profile.html';
                }
            } catch (error) {
                console.error('Profile butonu hatası:', error);
                window.location.href = 'profile.html';
            }
        };
    }
};