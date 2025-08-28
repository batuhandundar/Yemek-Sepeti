// Supabase bağlantı bilgileri
window.SUPABASE_URL = 'https://rwobzqpedtphuxvkzkbq.supabase.co';
window.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3b2J6cXBlZHRwaHV4dmt6a2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MDU3MjYsImV4cCI6MjA2OTM4MTcyNn0.ga3lHSx8ufgCtXcpC7cuQZ4PcJurUhXdPNh3gKFNj0U';

// Supabase istemcisini oluştur - CDN yüklenme kontrolü ile
function initSupabase() {
    if (typeof window.supabaseJs !== 'undefined' && window.supabaseJs.createClient) {
        window.supabase = window.supabaseJs.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
        return true;
    }
    return false;
}

// Sayfa yüklendiğinde veya CDN yüklendiğinde Supabase'i başlat
if (!initSupabase()) {
    // CDN henüz yüklenmemişse bekle
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            if (!initSupabase()) {
                console.error('Supabase CDN yüklenemedi');
            }
        }, 1000);
    });
}

// Auth durumunu kontrol et
window.checkAuth = async function() {
    try {
        const { data: { session }, error } = await window.supabase.auth.getSession();
        if (!session) {
            window.location.href = 'login.html';
            return null;
        }
        return session;
    } catch (error) {
        console.error('Auth kontrolü hatası:', error);
        window.location.href = 'login.html';
        return null;
    }
};

// Admin kontrolü
window.checkAdmin = async function() {
    try {
        const session = await window.checkAuth();
        if (!session) return false;

        const { data: profile, error } = await window.supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

        if (error || !profile?.is_admin) {
            window.location.href = 'index.html';
            return false;
        }

        return true;
    } catch (error) {
        console.error('Admin kontrolü hatası:', error);
        window.location.href = 'index.html';
        return false;
    }
};