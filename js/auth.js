// Supabase client oluştur
const supabaseUrl = 'https://rwobzqpedtphuxvkzkbq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3b2J6cXBlZHRwaHV4dmt6a2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MDU3MjYsImV4cCI6MjA2OTM4MTcyNn0.ga3lHSx8ufgCtXcpC7cuQZ4PcJurUhXdPNh3gKFNj0U';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Kayıt ol
async function signUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

// Giriş yap
async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

// Çıkış yap
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        return { error };
    }
}

// Kullanıcı durumunu kontrol et
async function getUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { data: { user }, error: null };
    } catch (error) {
        return { data: { user: null }, error };
    }
}