const SUPABASE_URL = 'https://rwobzqpedtphuxvkzkbq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3b2J6cXBlZHRwaHV4dmt6a2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MDU3MjYsImV4cCI6MjA2OTM4MTcyNn0.ga3lHSx8ufgCtXcpC7cuQZ4PcJurUhXdPNh3gKFNj0U';

// Supabase istemcisini oluştur
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Sayfa yüklendiğinde
window.onload = async function() {
    try {
        // Kullanıcı kontrolü
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        // Kullanıcı bilgilerini göster
        document.getElementById('userEmail').textContent = user.email;
        
        // Profil bilgilerini çek
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        
        if (profileError) throw profileError;

        if (profile) {
            document.getElementById('userName').textContent = profile.full_name || 'İsimsiz Kullanıcı';
            document.getElementById('fullName').value = profile.full_name || '';
            document.getElementById('phone').value = profile.phone || '';
            document.getElementById('address').value = profile.address || '';
            
            // Son güncelleme tarihini göster
            if (profile.updated_at) {
                document.getElementById('lastUpdate').textContent = 
                    new Date(profile.updated_at).toLocaleString('tr-TR');
            }
        }

        // Sipariş istatistiklerini çek
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('user_id', user.id);

        if (ordersError) throw ordersError;

        if (orders) {
            document.getElementById('orderCount').textContent = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
            document.getElementById('totalSpent').textContent = totalSpent.toFixed(2) + '₺';
        }

    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        alert('Bilgiler yüklenirken bir hata oluştu.');
    }
};

// Profil güncelleme
document.getElementById('saveProfile').addEventListener('click', async () => {
    const button = document.getElementById('saveProfile');
    const originalText = button.innerHTML;
    
    try {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Kaydediliyor...</span>';

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!user) throw new Error('Kullanıcı bulunamadı');

        const updateData = {
            id: user.id,
            full_name: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            updated_at: new Date().toISOString()
        };

        const { error: updateError } = await supabase
            .from('profiles')
            .upsert(updateData);

        if (updateError) throw updateError;

        // Başarılı güncelleme
        button.innerHTML = '<i class="fas fa-check"></i> <span>Kaydedildi!</span>';
        button.classList.add('bg-green-500');
        
        // Sayfayı yenile
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (error) {
        console.error('Güncelleme hatası:', error);
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Hata Oluştu</span>';
        button.classList.add('bg-red-600');
        alert('Profil güncellenirken bir hata oluştu');
    } finally {
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
            button.classList.remove('bg-green-500', 'bg-red-600');
        }, 2000);
    }
});

// Çıkış yapma
document.getElementById('signOut').addEventListener('click', async () => {
    const button = document.getElementById('signOut');
    const originalText = button.innerHTML;
    
    try {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Çıkış yapılıyor...</span>';

        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        window.location.href = 'index.html';

    } catch (error) {
        console.error('Çıkış hatası:', error);
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Hata Oluştu</span>';
        alert('Çıkış yapılırken bir hata oluştu');
        
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
        }, 2000);
    }
});