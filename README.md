# 🍕 Yemek Sepeti - Online Yemek Sipariş Sistemi

## 📋 Proje Açıklaması

 **Batuhan Dündar**

## 🚀 Özellikler

### 👤 Kullanıcı Özellikleri
- **Kullanıcı Kaydı & Girişi** - Güvenli authentication sistemi(email doğrulamalı)
- **Ürün Kataloğu** - Kategorilere ayrılmış ürün listesi  
- **Sepet Sistemi** - Dinamik sepet yönetimi
- **Sipariş Verme** - Detaylı spet süreci
- **Sipariş Takibi** - Gerçek zamanlı sipariş durumu
- **Profil Yönetimi** - Kişisel bilgi düzenleme

### 🔧 Admin Özellikleri  
- **Admin Paneli** - Güvenli yönetici erişimi
- **Ürün Yönetimi** - CRUD işlemleri
- **Sipariş Yönetimi** - Sipariş durumu güncelleme
- **Kullanıcı Yönetimi** - Kullanıcı listesi ve yönetimi

### 💻 Teknik Özellikler
- **Responsive Tasarım** - Mobile-first yaklaşım
- **Modern UI/UX** - CSS Grid, Flexbox kullanımı
- **Veritabanı** - Supabase PostgreSQL
- **Authentication** - Row Level Security (RLS)
- **Real-time** - Canlı veri güncelleme

## 🛠️ Teknolojiler

- **Frontend:** HTML5, CSS3, Vanilla JavaScript kısmi tailwindcss
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **UI Framework:** Custom CSS (Grid, Flexbox)
- **Icons:** Font Awesome
- **Version Control:** Git

## 📁 Proje Yapısı

```
Yemek Sepeti/
├── index.html              # Ana sayfa
├── login.html              # Giriş sayfası  
├── signup.html             # Kayıt sayfası
├── checkout.html           # Ödeme sayfası
├── orders.html             # Sipariş takip
├── profile.html            # Profil sayfası
├── admin.html              # Admin ana sayfa
├── admin-orders.html       # Sipariş yönetimi
├── admin-menu.html         # Ürün yönetimi
├── admin-users.html        # Kullanıcı yönetimi
├── styles/
│   ├── style.css           # Ana stil dosyası
│   ├── auth.css            # Authentication stilleri
│   └── profile.css         # Profil stilleri
├── js/
│   ├── script.js           # Ana JavaScript
│   ├── auth.js             # Authentication
│   ├── login.js            # Giriş işlemleri
│   ├── signup.js           # Kayıt işlemleri
│   └── supabase.js         # Veritabanı bağlantısı
├── images/                 # Görsel dosyalar
└── README.md              # 
```

## 🔐 Güvenlik Özellikleri

- **Row Level Security (RLS)** - Veritabanı seviyesinde güvenlik
- **Authentication** - Güvenli kullanıcı doğrulama
- **Admin Protection** - Yetkisiz erişim engellemesi  
- **SQL Injection Protection** - Prepared statements
- **XSS Protection** - Input sanitization

## 📊 Veritabanı Şeması

### Ana Tablolar:
- `profiles` - Kullanıcı profilleri
- `categories` - Ürün kategorileri
- `products` - Ürün bilgileri
- `orders` - Sipariş kayıtları
- `order_items` - Sipariş detayları
- `reviews` - Ürün yorumları

## 🎯 Sipariş Akışı

1. **Kullanıcı Kaydı/Girişi** → Authentication
2. **Ürün Seçimi** → Sepete ekleme
3. **Checkout** → Adres/ödeme bilgileri
4. **Sipariş Onayı** → Veritabanına kayıt
5. **Admin Onayı** → Sipariş durumu güncelleme
6. **Takip** → Real-time durum takibi

## 💡 Kod Kalitesi

- **Clean Code** - Anlaşılır ve sürdürülebilir kod
- **Modular Yapı** - Ayrı dosyalarda organize edilmiş
- **Error Handling** - Kapsamlı hata yönetimi
- **Performance** - Optimize edilmiş sorgular
- **Responsive** - Tüm cihazlarda uyumlu

## 👨‍💻 Geliştirici

**Batuhan Dundar**
- GitHub: dundarbatuhan@icloud.com
- Email: dundarbatuhan@icloud.com

---





---

**© 2025 Batuhan Dundar - Tüm hakları saklıdır**
