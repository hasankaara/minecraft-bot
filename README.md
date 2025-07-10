Minecraft Bot Projesi
Bu proje, Mineflayer kullanarak istenildiği kadar otomatik Minecraft botu çalıştırmak için geliştirilmiştir.
Varsayılan olarak 2 bot konfigüre edilmiştir ancak istediğiniz gibi sayı artırabilirsiniz.
Windows’un eski makineleri veya Windows sunucularda da rahatlıkla çalışır.

Botlar sadece Aternos değil, tüm Minecraft sunucularına bağlanabilir.

Özellikler
Çoklu bot desteği (varsayılan 2 bot, istediğiniz kadar artırılabilir)

Rastgele hareket ve dönüş yapar

Bot ölünce otomatik yeniden doğar

Sunucu kapanınca Pushover ve Discord webhook üzerinden bildirim gönderir

PM2 ile arka planda sürekli çalıştırılabilir

Gereksinimler
Windows işletim sistemi

Node.js (14 ve üzeri önerilir)

PM2 (Node.js süreç yöneticisi)

Kurulum ve Çalıştırma
1. Node.js kurulumu
Node.js'i nodejs.org sitesinden indirin ve talimatlara göre kurun.

ÖNEMLİ: Node.js kurulmadan kod çalışmaz!

2. Kütüphane yüklemesi
Projede bulunan kütüphane yükleyicisi.bat dosyasını açarak gerekli tüm kütüphaneleri yükleyin.

3. PM2 ile botları başlatma
Projeyi açtığınız klasörde terminali açın ve şu komutları sırasıyla çalıştırın:

bash
Kopyala
Düzenle
pm2 start index.js --name botlar
pm2 save
4. Botları durdurma ve açma
Botları durdurmak için bot kapat.bat dosyasını çalıştırın.

Botları tekrar açmak için bot ac.bat dosyasını kullanın.

Eğer komut satırından başlattıysanız, aynı komutları terminalde kullanabilirsiniz.

Bildirim Ayarları
index.js dosyasında Pushover ve Discord webhook bilgilerinizi girmeniz gerekmektedir.

Önemli Notlar
Sunucunuzun crackli (offline mode) başlatıcılardan girişe izin vermesi gerekir, aksi takdirde botlar bağlanamaz.

Bu kod kendi sunucunuzda çalışması için tasarlanmıştır.

Büyük sunucularda kullanılan gelişmiş anti-cheat sistemleri botları engelleyebilir.

Sorumluluk Reddi
Bu proje sadece eğitim ve kişisel kullanım amaçlıdır.
Yazılım kullanımı sonucu doğabilecek yasal sorunlar, hesap kısıtlamaları veya zararlar kullanıcının sorumluluğundadır.
Projeyi etik ve yasal sınırlar içinde kullanmanızı önemle tavsiye ederiz.

Lisans
Bu proje açık kaynaklıdır ve kişisel, akademik veya hobi amaçlı kullanım için ücretsizdir.
Ticari kullanım, şirketler veya ticari projelerde ancak proje sahibinin yazılı izniyle mümkündür.
İzin olmadan ticari amaçla kullanımı kesinlikle yasaktır.

İletişim
Projeyle ilgili soru, öneri veya destek için lütfen GitHub yorumları kısmını kullanın.
Burada doğrudan kişisel iletişim bilgileri paylaşılmamaktadır.
