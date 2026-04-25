#!/usr/bin/env node
/** Indonesian FAQs を extras/id.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ID_PATH = resolve(__dirname, "app", "content", "extras", "id.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Musim apa terbaik untuk memotret Hokkaido?", a: "Februari untuk Festival Salju Sapporo dan es mengapung, Juli untuk lavender Furano, Oktober untuk dedaunan musim gugur, dan Januari-Maret untuk es mengapung Shiretoko. Cocokkan subjek dengan musim puncaknya." },
    { q: "Lokasi foto utama di Hokkaido?", a: "Lanskap kota Sapporo, kanal Otaru, ladang bunga Furano, Danau Mashu, Danau Toya, Semenanjung Shiretoko, Lembah Neraka Noboribetsu, Kebun Binatang Asahiyama, dan bukit-bukit Biei — tiap area memiliki karakter visual berbeda." },
  ],
  "千葉県": [{ q: "Jenis fotografi apa yang ditawarkan Chiba?", a: "Garis pantai, lanskap pedesaan Boso, dan satwa liar/akuarium — keragaman dekat metropolis." }],
  "東京都": [{ q: "Tips fotografi malam Tokyo?", a: "Tripod, ISO rendah, dan eksposur panjang. Jam biru (30 menit setelah matahari terbenam) menyeimbangkan langit dan lampu kota terbaik." }],
  "神奈川県": [{ q: "Cara terbaik mengunjungi Kamakura dan Yokohama?", a: "Pagi di kuil Kamakura (Buddha Besar, Hasedera), sore ke Yokohama untuk matahari terbenam Minato Mirai dan pemandangan malam Red Brick Warehouse." }],
  "石川県": [{ q: "Apa yang bisa difoto di Kanazawa dalam sehari?", a: "Pagi awal di Kenrokuen (cahaya lembut), lalu Kastil Kanazawa, Higashi Chaya (siang/sore), Pasar Omicho, ditutup dengan Gerbang Drum di Stasiun Kanazawa malam hari." }],
  "山梨県": [{ q: "Tempat terbaik memotret Gunung Fuji dengan bunga sakura?", a: "Dek pengamatan Pagoda Chureito di Taman Arakurayama Sengen terkenal dunia. Setelah 398 tangga, pagoda, sakura, dan Gunung Fuji sejajar dalam satu bingkai. Mekar penuh awal-pertengahan April, matahari terbit memberi cahaya paling magis." }],
  "長野県": [{ q: "Kapan sakura mekar di Taman Kastil Takato?", a: "Awal-pertengahan April. Sekitar 1.500 sakura «Takato Kohigan» mekar merah muda lembut, mendapat gelar «sakura terbaik di bawah langit». Iluminasi malam seperti mimpi, pagi awal terbaik untuk menghindari keramaian." }],
  "岐阜県": [{ q: "Kapan iluminasi musim dingin Shirakawa-go?", a: "Diadakan dalam jumlah hari terbatas (biasanya ~6) di Januari-Februari. Reservasi diperlukan; rencanakan lebih awal untuk memotret rumah gassho di salju dari observatorium." }],
  "愛知県": [{ q: "Tips memotret di kebun binatang?", a: "Lensa fix cepat (mis. 50mm f/1.8) memburamkan latar belakang; tekan lensa pada jaring agar hilang. Fokus pada mata hewan." }],
  "三重県": [
    { q: "Etika fotografi di Ise Jingu?", a: "Di dalam tempat suci utama dilarang keras. Tetap diskret di dalam torii dan hindari memotret jamaah atau pendeta langsung." },
    { q: "Kapan matahari terbit di antara Meoto Iwa?", a: "Hanya dekat solstis musim panas (Mei-Juli) matahari terbit langsung di antara dua batu. Awal Juni memiliki tingkat langit cerah terbaik; tiba sebelum fajar." },
  ],
  "京都府": [
    { q: "Waktu terbaik untuk dedaunan musim gugur Kyoto?", a: "Puncak biasanya akhir November-awal Desember. Tofuku-ji (jembatan Tsuten-kyo), Eikando, Kiyomizu-dera, dan Arashiyama terbaik dalam cahaya depan pagi." },
    { q: "Bagaimana menghindari keramaian?", a: "Pagi awal (6-8) jauh terbaik. Kiyomizu-dera buka jam 6, jelajahi luar Kinkaku-ji sebelum 9, dan tiba di Byodoin tepat saat buka." },
  ],
  "兵庫県": [{ q: "Spot foto terbaik untuk Kastil Himeji?", a: "Depan Otemon, Plaza Sannomaru (dengan sakura), Taman Nishi-no-maru (sisi), dan Taman Otoko-yama (atas) adalah empat klasik." }],
  "奈良県": [{ q: "Tips memotret rusa di Nara?", a: "Memegang shika senbei menarik mereka, tapi mereka pergi saat habis. Cahaya backlit pagi yang menyoroti bulu adalah komposisi klasik." }],
  "徳島県": [{ q: "Kapan pusaran Naruto terbesar?", a: "Saat air pasang besar (dekat bulan baru atau purnama) di musim semi/gugur, sekitar pasang/surut (±1-2 jam). Periksa tabel pasang surut; foto dari kapal atau jembatan Onaruto." }],
  "香川県": [{ q: "Kondisi apa yang menciptakan refleksi cermin Chichibugahama?", a: "①Surut bertepatan dengan matahari terbenam ②Angin hampir nol ③Awan di langit (langit cerah terlihat datar). Pariwisata Mitoyo menerbitkan tanggal optimal online." }],
  "愛媛県": [{ q: "Bisa memotret bangunan Dogo Onsen Honkan?", a: "Eksterior sepenuhnya terbuka; sudut belakang dan iluminasi malam disarankan. Beberapa area dalam dilarang demi privasi." }],
  "高知県": [{ q: "Tips menangkap biru Niko-buchi?", a: "Sekitar tengah hari pada hari cerah, ketika cahaya langsung mencapai air, biru paling intens. Filter polarisasi memperdalam warna dengan memotong refleksi permukaan." }],
  "福岡県": [{ q: "Spot foto wajib di Fukuoka?", a: "Jalur masuk dan aula utama Dazaifu Tenmangu, plus koridor pemandangan malam Menara Fukuoka–Pantai Momochi–Bayside Place." }],
  "大分県": [{ q: "Di mana menangkap cakrawala uap Beppu?", a: "Observatorium Yukemuri di Kannawa Onsen. Pagi musim dingin menghasilkan kolom uap terpadat karena kontras suhu." }],
  "沖縄県": [
    { q: "Musim terbaik untuk Miyakojima?", a: "Mei-September untuk transparansi air (terutama Juli-Agustus). September musim topan. Desember-Februari sejuk dan kurang ramai tapi aktivitas laut terbatas." },
    { q: "Waktu terbaik dalam sehari untuk foto laut jernih?", a: "10-14, ketika matahari tinggi dan cahaya menembus dasar laut, menciptakan hijau zamrud terkuat. Filter polarisasi penting." }],
};

const LOC_FAQS = {
  "知床": [{ q: "Bagaimana akses ke Shiretoko?", a: "Terbang ke Memanbetsu; Utoro Onsen (2 jam bus) adalah pintu gerbang. Tur es mengapung musim dingin, pelayaran dan jalan Lima Danau musim panas." }],
  "札幌": [{ q: "Waktu terbaik mengunjungi pusat Sapporo?", a: "Februari (Festival Salju), Juni (Festival Lilac), Oktober (dedaunan), Desember (White Illumination). Kota berubah wajah sepanjang tahun." }],
  "さっぽろ雪まつり": [{ q: "Waktu terbaik untuk memotret festival?", a: "Iluminasi dari matahari terbenam hingga 21 paling fotogenik — gunakan tripod dan ISO rendah untuk tekstur salju. Siang bekerja dengan latar langit biru." }],
  "小樽": [{ q: "Spot foto terbaik di kanal?", a: "Antara Jembatan Asakusa dan Jembatan Chuo — gudang, kanal, dan lampu gas dalam satu bingkai. Jam biru setelah matahari terbenam ideal." }],
  "洞爺湖": [{ q: "Tips memotret kembang api?", a: "Tripod wajib. ISO 100, f/8, B 4-8 detik. Platform danau menangkap kembang api dengan refleksinya." }],
  "富良野": [{ q: "Waktu terbaik untuk ladang lavender?", a: "Pagi awal sebelum 7 untuk cahaya lembut dan keramaian minimum. Cahaya depan membuat ungu bersinar. Periksa status mekar sebelumnya." }],
  "宮古島": [{ q: "Musim terbaik untuk Miyakojima?", a: "Mei-September untuk kejernihan air (terutama Juli-Agustus). September musim topan. Desember-Februari sejuk dan kurang ramai." }],
  "沖縄": [{ q: "Spot foto wajib di pulau utama Okinawa?", a: "Reruntuhan Kastil Shurijo, Tanjung Zanpa, Manzamo, Jembatan Kouri, Akuarium Churaumi, desa keramik Yachimun, dan Kokusai-dori." }],
  "横浜": [{ q: "Spot terbaik untuk Minato Mirai?", a: "Osanbashi untuk skyline lengkap saat matahari terbenam; Sakuragicho untuk bianglala; Yamashita-koen untuk Red Brick Warehouse. Jam biru optimal." }],
  "鎌倉": [{ q: "Kapan bunga krisan di Hasedera?", a: "Sekitar 1-23 November, dengan iluminasi malam. Tiba lebih awal untuk menghindari antrean." }],
  "伊勢神宮": [{ q: "Etika fotografi di Ise Jingu?", a: "Area dalam dilarang keras. Diskret di dalam torii; jangan memotret jamaah atau pendeta." }],
  "夫婦岩": [{ q: "Kapan matahari terbit di antara batu?", a: "Dekat solstis (Mei-Juli). Awal Juni memiliki tingkat langit cerah terbaik. Tiba sebelum fajar." }],
  "おはらい町・おかげ横丁": [{ q: "Waktu terbaik untuk memotret jalan?", a: "Pagi 8-10, sebelum gelombang pengunjung. Cahaya samping pada rumah kayu indah." }],
  "朝熊山展望台": [{ q: "Bagaimana naik ke observatorium?", a: "Berkendara melalui Ise-Shima Skyline (berbayar). Akses mudah; pengamatan Gunung Fuji mungkin di hari cerah (jarang)." }],
  "横山展望台": [{ q: "Waktu terbaik untuk Yokoyama?", a: "Pagi cerah untuk detail pulau di Teluk Ago. Matahari terbenam juga bekerja; platform tertinggi adalah yang terbaik." }],
  "清水寺": [{ q: "Kapan iluminasi musim gugur?", a: "Pertengahan November sampai awal Desember, 17:30-21. Jam biru setelah buka paling magis. Tripod tidak diizinkan." }],
  "金閣寺": [{ q: "Waktu terbaik untuk Paviliun Emas?", a: "Pagi musim dingin cerah dengan salju ikonik; musim gugur dan refleksi di kolam juga klasik. Tiba saat buka (9)." }],
  "平等院鳳凰堂": [{ q: "Tips untuk refleksi di kolam Aji?", a: "Pagi tanpa angin memberikan permukaan cermin. Tiba saat buka (8:30); gunakan polarisasi lemah untuk mempertahankan refleksi." }],
  "東福寺": [{ q: "Waktu terbaik untuk jembatan Tsutenkyo?", a: "Pertengahan November sampai awal Desember. Buka 8:30; ikuti aliran searah dari utara. Jangan berhenti di jembatan." }],
  "東寺": [{ q: "Tips memotret pagoda lima tingkat?", a: "Kolam Hyotan-ike saat matahari terbenam untuk refleksi. Iluminasi malam selama musim sakura dan musim gugur." }],
  "八坂の塔": [{ q: "Spot terbaik untuk pagoda Yasaka?", a: "Memandang ke atas lereng Yasaka-dori dari bawah adalah sudut klasik. 6-7 hampir tanpa turis — ideal juga untuk potret kimono." }],
  "姫路城": [{ q: "Waktu terbaik untuk kastil dengan sakura?", a: "Biasanya awal April. Plaza Sannomaru, Taman Nishi-no-maru, dan Taman Memorial Shirotopia adalah klasik." }],
  "法隆寺": [{ q: "Aturan fotografi?", a: "Pekarangan OK; patung Buddha di aula sebagian besar dilarang. Tanpa tripod atau flash bahkan di luar ruangan. Pagi awal dan sore tenang dan lembut." }],
  "法隆寺 夢殿": [{ q: "Kapan Guze Kannon dipajang?", a: "Musim semi: 11 April-18 Mei; musim gugur: 22 Oktober-22 November. Fotografi patung dilarang." }],
  "鳴門海峡": [{ q: "Perahu atau jalan setapak?", a: "Perahu untuk intensitas, jalan setapak untuk keamanan dari atas. Lantai kaca Uzu-no-Michi menunjukkan pusaran di bawah. Di perahu harap terkena cipratan." }],
  "大鳴門橋": [{ q: "Spot terbaik untuk jembatan?", a: "Michi-no-Eki Uzushio sisi Awaji untuk gambaran terbaik. Jembatan dan selat bersinar saat matahari terbenam indah." }],
  "父母ヶ浜": [{ q: "Cara memesan hari optimal?", a: "Tidak ada reservasi, tapi Pariwisata Mitoyo menerbitkan «Sky Mirror Calendar» dengan hari optimal. Rencanakan untuk hari pasang surut dan matahari terbenam bertepatan." }],
  "亀老山展望台": [{ q: "Bagaimana ke sana?", a: "Bus Shimanami Kaido dari Imabari atau Fukuyama, atau bersepeda. Parkir dekat puncak." }],
  "来島海峡大橋": [{ q: "Spot terbaik untuk jembatan?", a: "Observatorium Gunung Kiro (Oshima, Imabari) menyediakan pandangan definitif. Tangkap jembatan oranye saat matahari terbenam dan jam biru sesudahnya." }],
  "松山城": [{ q: "Kabel atau kursi?", a: "Jika cuaca memungkinkan, kursi terbuka memberikan pencerapan panorama lebih baik (5 menit). Tiket gabungan mencakup keduanya." }],
  "道後温泉": [{ q: "Bisa memotret Honkan?", a: "Eksterior sepenuhnya terbuka; sudut belakang dan iluminasi malam disarankan. Beberapa area dalam dilarang demi privasi." }],
  "桂浜": [{ q: "Sudut terbaik untuk patung Ryoma?", a: "Dari sudut rendah sisi laut, naik tangga di belakang alas — memasangkan Ryoma dengan Pasifik sebagai latar. Matahari terbenam memberi siluet mencolok." }],
  "高知城": [{ q: "Berapa lama mendaki?", a: "Sekitar 15 menit tangga dari pintu masuk ke benteng. Gerbang Otemon adalah bingkai klasik untuk sakura. Jangan lewatkan pemandangan kota dari benteng." }],
  "名越屋沈下橋": [{ q: "Musim terbaik?", a: "Hijau segar di Mei, berenang musim panas (Juli-Ags), dedaunan musim gugur (Okt-Nov). Pagi musim dingin dengan kabut juga seperti mimpi." }],
  "にこ淵": [{ q: "Kapan biru terkuat?", a: "Tengah hari cerah (10-14), terutama musim panas-awal musim gugur. Setelah hujan, kekeruhan mengurangi efek — cuaca kering ideal. Bawa filter PL." }],
  "福岡": [{ q: "Etika fotografi di yatai?", a: "Tanya staf/pelanggan dulu. Close-up setelah meminta. Eksterior dan jalan bebas." }],
  "別府": [{ q: "Berapa lama tur Neraka?", a: "Semua 7 Neraka memakan waktu 2-3 jam. Tiket gabungan menghemat. Neraka Laut, Kolam Darah, dan Tatsumaki adalah top-3." }],
  "湯布院": [{ q: "Kondisi untuk kabut pagi di Danau Kinrin?", a: "Pagi cerah November-Maret di bawah 5°C — selisih suhu antara air pemandian air panas dan udara menghasilkan kabut. Terpadat dari sebelum fajar hingga sejam setelah." }],
  "白川郷": [{ q: "Memotret dari observatorium?", a: "Observatorium Reruntuhan Kastil Ogimachi mendominasi seluruh desa — klasik. Kabut musim gugur-musim dingin, salju Januari-Februari, hijau Mei: masing-masing mahakarya." }],
  "美幌峠": [{ q: "Kapan lautan awan muncul?", a: "Pagi September-November di hari cerah tanpa angin dengan selisih suhu besar. Puncak sekitar 30 menit di sekitar matahari terbit." }],
  "摩周湖": [{ q: "Berapa peluang melihat danau?", a: "Tingkat tampak tahunan ~30%. Musim panas sangat berkabut; musim dingin-semi memberikan kejernihan lebih baik. Kunjungi beberapa observatorium untuk meningkatkan peluang." }],
  "阿寒": [{ q: "Bisa melihat marimo?", a: "Di Pusat Pengamatan Marimo di pulau Churui — diakses dengan kapal wisata." }],
  "三段滝公園": [{ q: "Kapan melihat air terjun beku?", a: "Hanya pertengahan Januari-akhir Februari selama dingin ekstrem. Sepenuhnya beku, menjadi patung es putih-biru." }],
  "室蘭": [{ q: "Spot terbaik untuk pemandangan malam pabrik?", a: "Observatorium Iwaizumi, Gunung Sokuryo, dan Jembatan Hakucho adalah tiga klasik. Tangkap jembatan dengan lampu pabrik di jam biru." }],
  "美唄": [{ q: "Apa yang istimewa tentang Arte Piazza?", a: "Museum patung luar ruangan gratis di sekolah yang dialihfungsikan. Karya marmer putih, sekolah kayu, dan salju bersama terlihat seperti lukisan." }],
  "登別": [{ q: "Waktu terbaik untuk Jigokudani?", a: "Pagi untuk cahaya lembut dan uap terlihat. Iluminasi malam (Mei-Oktober) atmosferik." }],
  "北竜町": [{ q: "Kapan puncak mekar?", a: "Biasanya minggu pertama hingga ~10 Agustus. Tembakan klasik: panorama ladang penuh dari observatorium. Cahaya depan pagi paling hidup." }],
  "東京": [{ q: "Tips fotografi malam?", a: "Tripod, ISO rendah, dan eksposur panjang. Jam biru (30 menit setelah matahari terbenam) menyeimbangkan langit dan lampu kota." }],
  "品川": [{ q: "Spot dekat Stasiun Shinagawa?", a: "Pemandangan Shinkansen dari jembatan pejalan kaki sisi Takanawa, gedung pencakar langit sisi Konan, koridor kaca Shinagawa Intercity, dan pemandangan malam kanal di Tennozu Isle." }],
  "東山動物園": [{ q: "Tips memotret hewan?", a: "Lensa fix cepat (50mm f/1.8) memburamkan latar. Tekan lensa pada jaring agar hilang. Fokus pada mata." }],
  "梅林公園": [{ q: "Kapan puncak mekar?", a: "Pertengahan Februari sampai awal Maret. Dengan varietas awal dan akhir, akhir Februari menawarkan keragaman terbesar." }],
  "鳥羽水族館": [{ q: "Kapan dugong paling aktif?", a: "Sekitar waktu makan (sekitar 11 dan 15). Kadang berenang sampai kaca — momen berharga." }],
  "清水寺周辺": [{ q: "Spot terbaik untuk pagoda Yasaka?", a: "Memandang ke atas lereng Yasaka-dori dari bawah adalah sudut klasik. 6-7 hampir tanpa turis — ideal juga untuk potret kimono." }],
  "鴨川シーワールド": [{ q: "Tips memotret orca?", a: "Kecepatan rana 1/1000+ untuk membekukan percikan; mode burst penting. Baris depan basah — pilih tempat duduk dengan hati-hati." }],
  "旭山動物園": [{ q: "Jadwal jalan penguin?", a: "Dua kali sehari dari pertengahan Desember hingga Maret — hanya musim dingin saat ada salju. Parade penguin raja klasik musim dingin." }],
  "金沢": [{ q: "Spot foto di Kanazawa dalam sehari?", a: "Kenrokuen saat fajar (cahaya lembut), Kastil Kanazawa, Higashi Chaya (siang/sore), Pasar Omicho, Gerbang Drum di Stasiun Kanazawa malam." }],
  "新倉山浅間公園": [{ q: "Bagaimana mencapai dek pengamatan?", a: "Stasiun Shimo-Yoshida (jalur Fujikyu), 10 menit jalan kaki ke kuil, kemudian 398 tangga (jalur landai juga tersedia). Tiba 5-6 untuk menghindari keramaian dan menangkap matahari terbit di Fuji." }],
  "河口湖": [{ q: "Tempat terbaik untuk refleksi Fuji terbalik?", a: "Taman Oishi dan Ubuyagasaki di pantai utara klasik. Targetkan pagi tanpa angin 6-8 ketika danau memantulkan. Musim dingin memberikan udara terjernih dan transparansi terbaik." }],
  "松本城": [{ q: "Cara membingkai benteng dengan sakura dan Alpen?", a: "Sekitar Jembatan Uzumi sisi barat laut parit dalam adalah terbaik. Telefoto untuk memampatkan benteng dan punggungan Alpen, dengan sakura pertengahan April sebagai bokeh depan. Pagi memberikan backlight lembut." }],
  "高遠城址公園": [{ q: "Waktu terbaik dalam sehari memotret sakura Takato?", a: "Sebelum 6 menawarkan cahaya biru tanpa keramaian. Sore beralih melalui jam biru ke iluminasi, di mana cahaya hangat lentera bertemu bunga merah muda." }],
  "駒つなぎの桜": [{ q: "Apa yang dibutuhkan untuk refleksi sawah?", a: "Pertengahan-akhir April ketika sawah dibanjiri untuk penanaman, di fajar tanpa angin. Bawa tripod dan lensa wide-to-standar; untuk bintang+sakura, body toleran ISO tinggi disarankan." }],
  "長野県天空の楽園": [{ q: "Waktu terbaik dalam setahun untuk pengamatan bintang?", a: "Sekitar bulan baru. Musim dingin (Nov-Feb) memberikan bintang paling tajam (Bima Sakti lebih lemah). Musim panas terbaik untuk inti Bima Sakti. Tur malam membutuhkan reservasi." }],
  "弘法山古墳": [{ q: "Cara akses dan di mana memotret?", a: "Dari Stasiun Matsumoto, ~20 menit bus + ~20 menit jalan kaki ke jalur, lalu 15-20 menit naik ke puncak. Fajar memberikan backlight lembut di Alpen Utara dan menghindari keramaian." }],
  "安養寺": [{ q: "Kapan puncak mekar?", a: "Pertengahan April. Pagi menawarkan warna depan yang hidup. Sore memberikan siluet menakjubkan dari aula dan pohon. Pekarangan tenang — foto dengan hormat." }],
  "松本市新村": [{ q: "Apa yang ada di dekat Stasiun Niimura?", a: "Stasiun kayu Mitsumizo lama, sawah dengan Alpen, jalan beraisle sakura, kabut pagi di sawah — permata tersembunyi yang memadukan kereta api dan lanskap." }],
  "城山公園(松本市)": [{ q: "Bingkai terbaik dari plaza pengamatan?", a: "Bingkai vertikal dengan sakura di depan dan punggungan Alpen di belakang adalah klasik. «Alpenglow» pagi (puncak salju memerah saat fajar) dengan sakura adalah puncak absolut." }],
  "中町通り(松本市)": [{ q: "Waktu terbaik dalam sehari untuk memotret?", a: "6-8 menawarkan jalan kosong dan komposisi bersih dinding kura. Sore, ketika lampu jalan menyala dan dinding putih menghangat ke amber, memberikan suasana paling nostalgia." }],
  "高島公園(諏訪市)": [{ q: "Spot terbaik untuk refleksi parit?", a: "Dari sisi selatan parit, gunakan telefoto untuk memampatkan benteng dan sakura. Pagi atau sore tanpa angin memberikan air cermin. Selama iluminasi, jam biru paling magis." }],
  "諏訪湖": [{ q: "Spot foto terbaik di sekitar Danau Suwa?", a: "Taman Tateishi (pemandangan atas), promenade tepi danau (danau + kota), area Geyser Center (matahari terbenam), dan tepi timur tempat Yatsugatake memantulkan. Punggungan es Omiwatari muncul di pagi Januari-Februari." }],
  "立石公園": [{ q: "Tips untuk pemandangan malam dan langit berbintang?", a: "Tripod penting. Pemandangan malam: ISO 200, f/8, 10-30 detik. Bintang: ISO 3200, f/2.8, ~15 detik. 20-30 menit setelah matahari terbenam (jam ajaib) memberikan gradien terindah antara lampu kota dan senja." }],
};

let content = readFileSync(ID_PATH, "utf-8");
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
writeFileSync(ID_PATH, content, "utf-8");
console.log(`✓ id.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
