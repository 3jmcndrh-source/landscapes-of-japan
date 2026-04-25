#!/usr/bin/env node
/** Turkish FAQs を extras/tr.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TR_PATH = resolve(__dirname, "app", "content", "extras", "tr.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Hokkaido fotoğrafçılığı için en iyi mevsim?", a: "Şubat Sapporo Kar Festivali ve sürüklenen buz için, Temmuz Furano lavantası, Ekim sonbahar yaprakları ve Ocak-Mart Shiretoko sürüklenen buzu için. Konunuzu en iyi mevsimle eşleştirin." },
    { q: "Hokkaido'daki ana fotoğraf mekânları?", a: "Sapporo şehir manzaraları, Otaru kanalı, Furano çiçek tarlaları, Mashu Gölü, Toya Gölü, Shiretoko Yarımadası, Noboribetsu Cehennem Vadisi, Asahiyama Hayvanat Bahçesi ve dalgalı Biei tepeleri — her bölgenin farklı görsel karakteri var." },
  ],
  "千葉県": [{ q: "Chiba ne tür fotoğrafçılık sunar?", a: "Sahiller, kırsal Boso manzaraları ve vahşi yaşam/akvaryumlar — metropol yakınında çeşitli karışım." }],
  "東京都": [{ q: "Tokyo gece fotoğrafçılığı ipuçları?", a: "Tripod, düşük ISO ve uzun pozlama. Mavi saat (gün batımından 30 dk sonra) gökyüzü ile şehir ışıklarını en iyi dengeler." }],
  "神奈川県": [{ q: "Kamakura ve Yokohama'yı ziyaret etmenin en iyi yolu?", a: "Sabah Kamakura tapınakları (Büyük Buda, Hasedera), sonra öğleden sonra Yokohama'da Minato Mirai gün batımı ve Kırmızı Tuğla Deposu gece manzaraları için." }],
  "石川県": [{ q: "Bir günde Kanazawa'da ne fotoğraflanır?", a: "Sabah erken Kenrokuen (yumuşak ışık), sonra Kanazawa Kalesi, Higashi Chaya (öğleden sonra/akşam), Omicho Pazarı, Kanazawa istasyonunda Davul Kapısı ile geceyle bitirin." }],
  "山梨県": [{ q: "Kiraz çiçeğiyle Fuji Dağı için en iyi yer?", a: "Arakurayama Sengen Parkı'ndaki Chureito Pagoda gözlem güvertesi dünyaca ünlü. 398 basamak sonrası pagoda, kiraz ve Fuji tek karede sıralanır. Pik açılış nisan başı-ortası, gün doğumu en sihirli ışığı verir." }],
  "長野県": [{ q: "Takato Kale Parkı'nda kiraz çiçekleri ne zaman?", a: "Nisan başı-ortası. Yaklaşık 1.500 «Takato Kohigan» kirazı soluk pembe açar, «göğün altındaki en iyi kiraz» unvanını alır. Akşam aydınlatması rüya gibi, sabah erken kalabalıkları en iyi engeller." }],
  "岐阜県": [{ q: "Shirakawa-go kış aydınlatması ne zaman?", a: "Ocak-Şubat'ta sınırlı sayıda günde (genellikle ~6) düzenlenir. Rezervasyon zorunlu; gözlemevinden karda gassho evleri çekmek için erken planlayın." }],
  "愛知県": [{ q: "Hayvanat bahçesinde iyi fotoğraflama ipuçları?", a: "Hızlı bir prime (örn. 50mm f/1.8) arka planı bulanıklaştırır; teli kaybetmek için lensi tele bastırın. Hayvanın gözlerine odaklanın." }],
  "三重県": [
    { q: "Ise Jingu fotoğraf etiketi?", a: "Ana türbelerin içi kesinlikle yasaktır. Torii içinde sade kalın ve müminleri veya rahipleri doğrudan fotoğraflamayın." },
    { q: "Meoto Iwa arasında güneş ne zaman doğar?", a: "Yalnızca yaz gündönümü yakınlarında (Mayıs-Temmuz) güneş iki kayanın tam arasında doğar. Haziran başı en iyi açık gökyüzü oranına sahip; şafaktan önce gelin." },
  ],
  "京都府": [
    { q: "Kyoto sonbahar yaprakları için en iyi zaman?", a: "Pik genellikle Kasım sonu-Aralık başı. Tofuku-ji (Tsuten-kyo köprüsü), Eikando, Kiyomizu-dera ve Arashiyama sabah ön ışığında en iyi." },
    { q: "Kalabalıklardan nasıl kaçınılır?", a: "Sabah erken (6-8) açık ara en iyi. Kiyomizu-dera 6'da açılır, Kinkaku-ji'nin dışını 9'dan önce dolaşın ve Byodoin'e açılışta gelin." },
  ],
  "兵庫県": [{ q: "Himeji Kalesi için en iyi fotoğraf noktaları?", a: "Otemon ön cephe, Sannomaru Meydanı (kirazlarla), Nishi-no-maru Bahçesi (yan görünüm) ve Otoko-yama Parkı (yüksek görünüm) dört klasik." }],
  "奈良県": [{ q: "Nara'da geyik fotoğraflama ipuçları?", a: "Shika senbei tutmak onları çeker, ama bittiğinde giderler. Tüylerini öne çıkaran sabah arka ışığı klasik kompozisyon." }],
  "徳島県": [{ q: "Naruto girdapları en büyük ne zaman?", a: "Yeni veya dolunay yakınında ilkbahar/sonbahar gel-gitlerinde, gel-git/cezir civarında (±1-2 saat). Gel-git tablolarını kontrol edin; teknelerden veya Onaruto köprü yürüyüş yolundan çekin." }],
  "香川県": [{ q: "Chichibugahama'nın ayna yansıması hangi koşulları yaratır?", a: "①Düşük gel-git günbatımıyla çakışır ②Neredeyse sıfır rüzgâr ③Gökyüzünde bulutlar (açık gökyüzü düz görünür). Mitoyo turizmi optimal tarihleri çevrimiçi yayınlar." }],
  "愛媛県": [{ q: "Dogo Onsen Honkan binasını fotoğraflayabilir miyim?", a: "Dış mekan tamamen açık; arka açılar ve akşam aydınlatması önerilir. Bazı iç alanlar mahremiyet için yasaktır." }],
  "高知県": [{ q: "Niko-buchi'nin mavisini yakalamak için ipuçları?", a: "Açık günlerde öğlen civarı, doğrudan güneş ışığı suya ulaştığında, mavi en yoğundur. Polarize filtre yüzey yansımalarını keserek rengi derinleştirir." }],
  "福岡県": [{ q: "Fukuoka'da kaçırılmaz fotoğraf yerleri?", a: "Dazaifu Tenmangu'nun yaklaşım yolu ve ana salonu, ayrıca Fukuoka Kulesi–Momochi Plajı–Bayside Place gece manzara koridoru." }],
  "大分県": [{ q: "Beppu'nun buhar gökyüzünü nerede yakalayabilirim?", a: "Kannawa Onsen'deki Yukemuri Gözlemevi. Kış sabahları sıcaklık zıtlığı nedeniyle en yoğun buhar sütunlarını üretir." }],
  "沖縄県": [
    { q: "Miyakojima için en iyi mevsim?", a: "Mayıs-Eylül su şeffaflığı için (özellikle Temmuz-Ağustos). Eylül tayfun mevsimi. Aralık-Şubat serin ve daha az kalabalık ama deniz aktiviteleri sınırlı." },
    { q: "Berrak deniz çekimleri için günün en iyi zamanı?", a: "10-14, güneş yüksek olduğunda ve ışık deniz tabanına ulaştığında, en yoğun zümrüt yeşilini oluşturur. Polarize filtre şart." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Shiretoko'ya nasıl ulaşılır?", a: "Memanbetsu'ya uçun; Utoro Onsen (otobüsle 2 saat) kapıdır. Kış sürüklenen buz turları, yaz seyir gemileri ve Beş Göl yürüyüşü." }],
  "札幌": [{ q: "Sapporo merkezini ziyaret etmek için en iyi zaman?", a: "Şubat (Kar Festivali), Haziran (Lila Festivali), Ekim (yapraklar), Aralık (White Illumination). Şehir yıl boyunca yüz değiştirir." }],
  "さっぽろ雪まつり": [{ q: "Festivali fotoğraflamak için günün en iyi zamanı?", a: "Gün batımından 21'e kadar aydınlatma en fotojenik — kar dokusunu korumak için tripod ve düşük ISO kullanın. Gündüz mavi gökyüzü arka planıyla çalışır." }],
  "小樽": [{ q: "Kanal boyunca en iyi fotoğraf noktası?", a: "Asakusa Köprüsü ile Chuo Köprüsü arası — depolar, kanal ve gaz lambaları tek karede. Gün batımından sonra mavi saat ideal." }],
  "洞爺湖": [{ q: "Havai fişek fotoğrafı ipuçları?", a: "Tripod zorunlu. ISO 100, f/8, B 4-8 sn. Göl platformu havai fişekleri yansımasıyla yakalar." }],
  "富良野": [{ q: "Lavanta tarlaları için en iyi zaman?", a: "Yumuşak ışık ve minimum kalabalık için sabah 7'den önce. Ön ışık moru parlatır. Çiçeklenme durumunu önceden kontrol edin." }],
  "宮古島": [{ q: "Miyakojima için en iyi mevsim?", a: "Mayıs-Eylül su berraklığı için (özellikle Temmuz-Ağustos). Eylül tayfun mevsimi. Aralık-Şubat serin ve daha az kalabalık." }],
  "沖縄": [{ q: "Okinawa ana adasında kaçırılmaz fotoğraf yerleri?", a: "Shurijo Kalesi kalıntıları, Zanpa Burnu, Manzamo, Kouri Köprüsü, Churaumi Akvaryumu, Yachimun çömlek köyü ve Kokusai-dori." }],
  "横浜": [{ q: "Minato Mirai için en iyi nokta?", a: "Osanbashi gün batımında tam silüet için; Sakuragicho dönme dolap için; Yamashita-koen Kırmızı Tuğla Deposu için. Mavi saat optimal." }],
  "鎌倉": [{ q: "Hasedera'da krizantemler ne zaman?", a: "Yaklaşık 1-23 Kasım, akşam aydınlatmalarıyla. Kuyrukları engellemek için erken gelin." }],
  "伊勢神宮": [{ q: "Ise Jingu fotoğraf etiketi?", a: "İç bölgeler kesinlikle yasak. Torii içinde sağduyulu; mümin veya rahipleri fotoğraflamayın." }],
  "夫婦岩": [{ q: "Kayaların arasında güneş ne zaman doğar?", a: "Gündönümü yakınında (Mayıs-Temmuz). Haziran başı en iyi açık gökyüzü oranına sahip. Şafaktan önce gelin." }],
  "おはらい町・おかげ横丁": [{ q: "Sokağı fotoğraflamak için en iyi zaman?", a: "Sabah 8-10, ziyaretçi dalgasından önce. Ahşap evler üzerindeki yan ışık güzeldir." }],
  "朝熊山展望台": [{ q: "Gözlemeevine nasıl çıkılır?", a: "Ise-Shima Skyline (ücretli) ile sürün. Kolay erişim; açık günlerde Fuji Dağı gözlemi mümkün (nadir)." }],
  "横山展望台": [{ q: "Yokoyama için en iyi zaman?", a: "Ago Körfezi'ndeki ada ayrıntıları için açık sabah. Gün batımı da işe yarar; en yüksek platformlar en iyisidir." }],
  "清水寺": [{ q: "Sonbahar aydınlatması ne zaman?", a: "Kasım ortası ila Aralık başı, 17:30-21. Açılıştan sonra mavi saat en sihirlidir. Tripoda izin verilmez." }],
  "金閣寺": [{ q: "Altın Pavyon için en iyi zaman?", a: "Karla açık kış sabahları ikoniktir; sonbahar ve havuz yansıması da klasik. Açılışta (9) gelin." }],
  "平等院鳳凰堂": [{ q: "Aji Havuzu'nda yansıma için ipuçları?", a: "Rüzgârsız sabahlar ayna yüzeyi verir. Açılışta (8:30) gelin; yansımayı korumak için polarizörü zayıf kullanın." }],
  "東福寺": [{ q: "Tsutenkyo köprüsü için en iyi zaman?", a: "Kasım ortası ila Aralık başı. Açılış 8:30; kuzeyden tek yönlü akışı izleyin. Köprüde durmayın." }],
  "東寺": [{ q: "Beş katlı pagoda fotoğrafı için ipuçları?", a: "Yansıma için gün batımında Hyotan-ike Havuzu. Kiraz ve sonbahar mevsimlerinde gece aydınlatması." }],
  "八坂の塔": [{ q: "Yasaka pagodası için en iyi nokta?", a: "Aşağıdan Yasaka-dori yokuşuna bakmak klasik açıdır. 6-7 neredeyse turist yok — kimono portreleri için de ideal." }],
  "姫路城": [{ q: "Kiraz çiçeğiyle kale için en iyi zaman?", a: "Tipik olarak Nisan başı. Sannomaru Meydanı, Nishi-no-maru Bahçesi ve Shirotopia Anıt Parkı klasik." }],
  "法隆寺": [{ q: "Fotoğraf kuralları?", a: "Avlu OK; salonlardaki Buda heykelleri çoğunlukla yasak. Açık havada bile tripod veya flaş yok. Sabah erken ve öğleden sonra geç daha sakin ve yumuşak." }],
  "法隆寺 夢殿": [{ q: "Guze Kannon ne zaman sergilenir?", a: "İlkbahar: 11 Nisan-18 Mayıs; sonbahar: 22 Ekim-22 Kasım. Heykel fotoğrafı yasak." }],
  "鳴門海峡": [{ q: "Tekne mi yürüyüş yolu mu?", a: "Yoğunluk için tekne, yukarıdan güvenlik için yürüyüş yolu. Uzu-no-Michi'nin cam zemini girdapları altta gösterir. Teknede sıçramalar bekleyin." }],
  "大鳴門橋": [{ q: "Köprü için en iyi nokta?", a: "Awaji tarafındaki Michi-no-Eki Uzushio en iyi genel görünüm için. Gün batımında parlayan köprü ve boğaz güzeldir." }],
  "父母ヶ浜": [{ q: "Optimal günü nasıl rezerve ederim?", a: "Rezervasyon yok, ama Mitoyo turizmi optimal günlerle «Sky Mirror Calendar» yayınlar. Düşük gel-git ile gün batımının çakıştığı günleri planlayın." }],
  "亀老山展望台": [{ q: "Oraya nasıl gidilir?", a: "Imabari veya Fukuyama'dan Shimanami Kaido otobüsü veya bisikletle. Park yeri zirveye yakın." }],
  "来島海峡大橋": [{ q: "Köprü için en iyi nokta?", a: "Kiro Dağı Gözlemevi (Oshima, Imabari) kesin görünümü sunar. Gün batımında turuncu aydınlatılmış köprüyü ve sonra mavi saati yakalayın." }],
  "松山城": [{ q: "Teleferik mi sandalye lift mi?", a: "Hava izin verirse, açık sandalye daha iyi panoramik daldırma sunar (5 dk). Birleştirilmiş bilet her ikisini kapsar." }],
  "道後温泉": [{ q: "Honkan'ı fotoğraflayabilir miyim?", a: "Dış mekan tamamen açık; arka açılar ve akşam aydınlatması önerilir. Bazı iç alanlar mahremiyet için yasaktır." }],
  "桂浜": [{ q: "Ryoma heykeli için en iyi açı?", a: "Deniz tarafından alçak açıdan, kaide arkasındaki merdivenleri çıkarak — Ryoma'yı Pasifik arka planıyla eşleştirir. Gün batımı çarpıcı silüet verir." }],
  "高知城": [{ q: "Tırmanış ne kadar sürer?", a: "Girişten kuleye yaklaşık 15 dk merdiven. Otemon kapısı kirazlar için klasik çerçeve. Kuleden şehir manzarasını kaçırmayın." }],
  "名越屋沈下橋": [{ q: "En iyi mevsim?", a: "Mayıs'ta taze yeşil, yaz yüzme (Tem-Ağu), sonbahar yaprakları (Eki-Kas). Sisli kış sabahları da rüya gibidir." }],
  "にこ淵": [{ q: "Mavi en güçlü ne zaman?", a: "Açık öğlen (10-14), özellikle yaz-erken sonbahar. Yağmurdan sonra bulanıklık etkiyi azaltır — kuru hava ideal. PL filtre getirin." }],
  "福岡": [{ q: "Yatai fotoğraf etiketi?", a: "Önce personel/müşterilere sorun. Yakın çekimler izin sonrası. Dış mekanlar ve sokaklar serbest." }],
  "別府": [{ q: "Cehennem turu ne kadar sürer?", a: "7 Cehennem 2-3 saat alır. Birleştirilmiş bilet tasarruf sağlar. Deniz Cehennemi, Kan Havuzu Cehennemi ve Tatsumaki ilk-3." }],
  "湯布院": [{ q: "Kinrin Gölü'nde sabah sisi koşulları?", a: "5°C altında Kasım-Mart açık sabahlar — kaplıca suyu ve hava arasındaki sıcaklık farkı sis üretir. Şafaktan bir saat sonrasına kadar en yoğun." }],
  "白川郷": [{ q: "Gözlemevinden çekim?", a: "Ogimachi Kale Kalıntıları Gözlemevi tüm köye hakim — klasik. Sonbahar-kış sisi, Ocak-Şubat karı, Mayıs yeşili: her biri başyapıt." }],
  "美幌峠": [{ q: "Bulut denizi ne zaman görünür?", a: "Eylül-Kasım'da büyük sıcaklık farklarıyla açık ve rüzgârsız sabahlar. Gün doğumu civarında yaklaşık 30 dk pik." }],
  "摩周湖": [{ q: "Gölü görme olasılığı?", a: "Yıllık görünürlük oranı ~30%. Yaz özellikle sisli; kış-bahar daha iyi netlik sunar. Şansı artırmak için birden fazla gözlemevi ziyaret edin." }],
  "阿寒": [{ q: "Marimo görebilir miyim?", a: "Churui Adası'ndaki Marimo Gözlem Merkezi'nde — turist teknesiyle erişilebilir." }],
  "三段滝公園": [{ q: "Donmuş şelaleler ne zaman görülür?", a: "Sadece derin soğuk sırasında Ocak ortası-Şubat sonu. Tamamen donmuş, beyaz-mavi buz heykeli olur." }],
  "室蘭": [{ q: "Fabrika gece manzarası için en iyi nokta?", a: "Iwaizumi Gözlemevi, Sokuryo Dağı ve Hakucho Köprüsü üç klasik. Köprüyü mavi saatte fabrika ışıklarıyla yakalayın." }],
  "美唄": [{ q: "Arte Piazza'nın özelliği nedir?", a: "Yeniden kullanılan bir okulda ücretsiz açık hava heykel müzesi. Beyaz mermer eserler, ahşap okul ve kar birlikte resimsel görünür." }],
  "登別": [{ q: "Jigokudani için en iyi zaman?", a: "Yumuşak ışık ve görünür buhar için sabah. Gece aydınlatması (Mayıs-Ekim) atmosferiktir." }],
  "北竜町": [{ q: "Pik açılış ne zaman?", a: "Tipik olarak ilk hafta ila ~10 Ağustos. Klasik kare: gözlemevinden tam alan panoraması. Sabah ön ışığı en canlısı." }],
  "東京": [{ q: "Gece fotoğrafçılığı ipuçları?", a: "Tripod, düşük ISO ve uzun pozlama. Mavi saat (gün batımından 30 dk sonra) gökyüzü ile şehir ışıklarını en iyi dengeler." }],
  "品川": [{ q: "Shinagawa İstasyonu yakınındaki noktalar?", a: "Takanawa tarafı yaya köprüsünden Shinkansen manzarası, Konan tarafı gökdelenler, Shinagawa Intercity'nin cam koridoru ve Tennozu Isle'da kanal gece manzarası." }],
  "東山動物園": [{ q: "Hayvanları fotoğraflama ipuçları?", a: "Hızlı prime lens (50mm f/1.8) arka planı bulanıklaştırır. Teli kaybetmek için lensi tele bastırın. Gözlere odaklanın." }],
  "梅林公園": [{ q: "Pik açılış ne zaman?", a: "Şubat ortası-Mart başı. Erken ve geç açan çeşitlerle, Şubat sonu en büyük çeşitliliği sunar." }],
  "鳥羽水族館": [{ q: "Dugong en aktif ne zaman?", a: "Beslenme saatleri civarında (yaklaşık 11 ve 15). Bazen cama kadar yüzer — değerli bir an." }],
  "清水寺周辺": [{ q: "Yasaka pagodası için en iyi nokta?", a: "Aşağıdan Yasaka-dori yokuşuna bakmak klasik açıdır. 6-7 neredeyse turist yok — kimono portreleri için de ideal." }],
  "鴨川シーワールド": [{ q: "Orca fotoğraf ipuçları?", a: "Sıçramaları dondurmak için 1/1000+ deklanşör hızı; burst modu şart. Ön sıralar ıslanır — koltukları dikkatli seçin." }],
  "旭山動物園": [{ q: "Penguen yürüyüşü programı?", a: "Aralık ortasından Marta kadar günde iki kez — sadece kar olduğu kış. Kral penguen geçit töreni kış klasiği." }],
  "金沢": [{ q: "Bir günde Kanazawa fotoğraf noktaları?", a: "Şafakta Kenrokuen (yumuşak ışık), Kanazawa Kalesi, Higashi Chaya (öğleden sonra/akşam), Omicho pazarı, gece Kanazawa istasyonunda Davul Kapısı." }],
  "新倉山浅間公園": [{ q: "Gözlem güvertesine nasıl ulaşılır?", a: "Shimo-Yoshida istasyonu (Fujikyu hattı), tapınağa 10 dk yürüyüş, sonra 398 basamak (daha yumuşak rampa yolu da mevcut). Kalabalıkları engellemek ve Fuji üzerinde gün doğumunu yakalamak için 5-6'da gelin." }],
  "河口湖": [{ q: "Ters Fuji yansıması için en iyi yer?", a: "Kuzey kıyısındaki Oishi Park ve Ubuyagasaki klasik. Göl yansıttığında 6-8 rüzgârsız sabahları hedefleyin. Kış en açık havayı ve en iyi şeffaflığı sunar." }],
  "松本城": [{ q: "Kiraz ve Alplerle kuleyi nasıl çerçevelerim?", a: "İç hendeğin kuzeybatı tarafındaki Uzumi Köprüsü en iyisi. Kule ve Alp sırtlarını sıkıştırmak için telefoto, ön plan bokeh olarak Nisan ortası kirazları. Sabah yumuşak arka ışık verir." }],
  "高遠城址公園": [{ q: "Takato kirazları için günün en iyi zamanı?", a: "6 öncesi kalabalıksız mavi ışık sunar. Öğleden sonra mavi saat üzerinden aydınlatmaya geçer, sıcak fener ışığı pembe çiçeklerle buluşur." }],
  "駒つなぎの桜": [{ q: "Pirinç tarlası yansıması için ne gerekir?", a: "Tarlalar dikim için sular altında bırakıldığında Nisan ortası-sonu, rüzgârsız bir şafakta. Tripod ve geniş-standart lens getirin; yıldız+çiçekler için yüksek ISO toleranslı bir gövde önerilir." }],
  "長野県天空の楽園": [{ q: "Yıldız izleme için yılın en iyi zamanı?", a: "Yeni ay yakın. Kış (Kas-Şub) en keskin yıldızları verir (Samanyolu daha zayıf). Yaz Samanyolu'nun çekirdeği için en iyi. Gece turu önceden rezervasyon gerektirir." }],
  "弘法山古墳": [{ q: "Nasıl erişilir ve nerede çekilir?", a: "Matsumoto istasyonundan ~20 dk otobüs + ~20 dk yürüyerek izleğe, sonra zirveye 15-20 dk yokuş yukarı. Şafak Kuzey Alpler'de yumuşak arka ışık verir ve kalabalıkları engeller." }],
  "安養寺": [{ q: "Pik açılış ne zaman?", a: "Nisan ortası. Sabah ön aydınlatmalı, canlı çiçek renkleri sunar. Akşam salonun ve ağacın çarpıcı silüetlerini verir. Sessiz avlu — saygıyla çekin." }],
  "松本市新村": [{ q: "Niimura İstasyonu yakınında ne var?", a: "Eski ahşap Mitsumizo İstasyonu, Alplerle pirinç tarlaları, kiraz dizili yollar, pirinç tarlaları üzerinde sabah sisi — tren ve manzara fotoğrafçılığını birleştiren gizli mücevher." }],
  "城山公園(松本市)": [{ q: "Gözlem meydanından en iyi çerçeveleme?", a: "Ön planda kirazlar ve arkada Alp sırtıyla dikey çerçeve klasiktir. Sakura ile sabah «alpenglow» (gün doğumunda kırmızıya dönen kar zirveleri) mutlak zirvedir." }],
  "中町通り(松本市)": [{ q: "Fotoğraflamak için günün en iyi zamanı?", a: "6-8 boş sokaklar ve kura duvarlarının temiz kompozisyonlarını sunar. Akşam, sokak lambaları yandığında ve beyaz duvarlar amber sıcaklığa döndüğünde, en nostaljik atmosferi verir." }],
  "高島公園(諏訪市)": [{ q: "Hendek yansıması için en iyi nokta?", a: "Hendeğin güney tarafından, kule ve kirazları sıkıştırmak için telefoto kullanın. Rüzgârsız sabahlar veya akşamlar ayna su verir. Aydınlatma sırasında, mavi saat en sihirlisidir." }],
  "諏訪湖": [{ q: "Suwa Gölü çevresindeki en iyi fotoğraf yerleri?", a: "Tateishi Parkı (yukarıdan görünüm), göl kenarı promenadı (göl + şehir), Geyser Center alanı (gün batımı) ve Yatsugatake'nin yansıdığı doğu kıyısı. Omiwatari buz sırtları Ocak-Şubat sabahlarında oluşur." }],
  "立石公園": [{ q: "Gece manzarası ve yıldızlı gökyüzü için ipuçları?", a: "Tripod şart. Gece manzaraları: ISO 200, f/8, 10-30 sn. Yıldızlar: ISO 3200, f/2.8, ~15 sn. Gün batımından 20-30 dk sonra (sihirli saat) şehir ışıkları ve alacakaranlık arasında en güzel gradyanı verir." }],
};

let content = readFileSync(TR_PATH, "utf-8");
const marker = "  },\n};";
const lastIdx = content.lastIndexOf(marker);
const prefBlock = Object.entries(PREF_FAQS).map(([k, faqs]) => {
  const items = faqs.map(f => `      { q: \`${f.q.replace(/`/g, "\\`")}\`, a: \`${f.a.replace(/`/g, "\\`")}\` }`).join(",\n");
  return `    "${k}": [\n${items},\n    ]`;
}).join(",\n");
const locBlock = Object.entries(LOC_FAQS).map(([k, faqs]) => {
  const items = faqs.map(f => `      { q: \`${f.q.replace(/`/g, "\\`")}\`, a: \`${f.a.replace(/`/g, "\\`")}\` }`).join(",\n");
  return `    "${k}": [\n${items},\n    ]`;
}).join(",\n");
const inject = `  },\n  prefectureFaqs: {\n${prefBlock},\n  },\n  locationFaqs: {\n${locBlock},\n  },\n};`;
content = content.slice(0, lastIdx) + inject + content.slice(lastIdx + marker.length);
writeFileSync(TR_PATH, content, "utf-8");
console.log(`✓ tr.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
