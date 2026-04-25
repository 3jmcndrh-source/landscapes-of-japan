#!/usr/bin/env node
/** Italian FAQs を extras/it.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IT_PATH = resolve(__dirname, "app", "content", "extras", "it.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Qual è la migliore stagione per fotografare Hokkaido?", a: "Febbraio per il Festival della Neve di Sapporo e il ghiaccio alla deriva, luglio per la lavanda di Furano, ottobre per il fogliame autunnale e gennaio-marzo per il ghiaccio alla deriva di Shiretoko. Abbina il soggetto alla sua stagione di punta." },
    { q: "Quali sono i principali luoghi fotografici di Hokkaido?", a: "Paesaggi urbani di Sapporo, canale di Otaru, campi di Furano, Lago Mashu, Lago Toya, penisola di Shiretoko, Valle dell'Inferno di Noboribetsu, Zoo di Asahiyama e colline ondulate di Biei: ogni zona offre un carattere distinto." },
  ],
  "千葉県": [{ q: "Che tipo di fotografia offre Chiba?", a: "Coste, paesaggi rurali del Boso e fauna/acquari — un mix vario vicino alla metropoli." }],
  "東京都": [{ q: "Consigli per la fotografia notturna a Tokyo?", a: "Treppiede, ISO basso e lunga esposizione. L'ora blu (30 min dopo il tramonto) bilancia meglio cielo e luci urbane." }],
  "神奈川県": [{ q: "Modo migliore per visitare Kamakura e Yokohama?", a: "Mattina nei templi di Kamakura (Grande Buddha, Hasedera), poi pomeriggio a Yokohama per tramonto a Minato Mirai e paesaggi notturni del Red Brick Warehouse." }],
  "石川県": [{ q: "Cosa fotografare a Kanazawa in un giorno?", a: "Mattina presto a Kenrokuen (luce morbida), poi Castello di Kanazawa, Higashi Chaya (pomeriggio/sera), mercato Omicho, e finire con la Porta del Tamburo alla stazione di Kanazawa di notte." }],
  "山梨県": [{ q: "Miglior posto per fotografare il Monte Fuji con i ciliegi?", a: "Il deck panoramico della Pagoda Chureito al Parco Arakurayama Sengen è famoso nel mondo. Dopo 398 gradini, pagoda, ciliegi e Monte Fuji si allineano in un'unica inquadratura. Piena fioritura inizio-metà aprile, alba per la luce più magica." }],
  "長野県": [{ q: "Quando fioriscono i ciliegi al Parco del Castello di Takato?", a: "Inizio-metà aprile. Circa 1.500 ciliegi «Takato Kohigan» fioriscono in rosa pallido, guadagnando il titolo di «miglior ciliegio sotto il cielo». L'illuminazione serale è onirica, mattina presto evita meglio le folle." }],
  "岐阜県": [{ q: "Quando è l'illuminazione invernale di Shirakawa-go?", a: "Si tiene in un numero limitato di giorni (tipicamente ~6) in gennaio-febbraio. Prenotazione obbligatoria; pianifica in anticipo per fotografare le case gassho nella neve dall'osservatorio." }],
  "愛知県": [{ q: "Consigli per fotografare bene negli zoo?", a: "Un'ottica fissa luminosa (es. 50mm f/1.8) sfoca lo sfondo; premi l'obiettivo contro la rete per farla sparire. Metti a fuoco gli occhi dell'animale." }],
  "三重県": [
    { q: "Etichetta fotografica a Ise Jingu?", a: "L'interno dei santuari principali è severamente vietato. Mantieni discrezione dentro i torii ed evita di fotografare fedeli o sacerdoti direttamente." },
    { q: "Quando il sole sorge tra le Meoto Iwa?", a: "Solo vicino al solstizio d'estate (maggio-luglio) il sole sorge direttamente tra le due rocce. Inizio giugno ha la migliore percentuale di cielo limpido; arriva prima dell'alba." },
  ],
  "京都府": [
    { q: "Miglior momento per il fogliame autunnale di Kyoto?", a: "Il picco cade di solito tra fine novembre e inizio dicembre. Tofuku-ji (ponte Tsuten-kyo), Eikando, Kiyomizu-dera e Arashiyama sono al meglio nella luce frontale mattutina." },
    { q: "Come evitare le folle?", a: "Mattina presto (6-8) è di gran lunga il meglio. Kiyomizu-dera apre alle 6, percorri l'esterno di Kinkaku-ji prima delle 9, e arriva a Byodoin all'apertura." },
  ],
  "兵庫県": [{ q: "Migliori spot per il Castello di Himeji?", a: "Fronte Otemon, Piazza Sannomaru (con ciliegi), Giardino Nishi-no-maru (vista laterale) e Parco Otoko-yama (vista elevata) sono i quattro classici." }],
  "奈良県": [{ q: "Consigli per fotografare i cervi a Nara?", a: "Tenere shika senbei li attira, ma se ne vanno quando finisce. La luce controluce mattutina che evidenzia il pelo è composizione classica." }],
  "徳島県": [{ q: "Quando i vortici di Naruto sono più grandi?", a: "Durante le maree sigiziali (vicino a luna nuova o piena) in primavera/autunno, intorno a alta/bassa marea (±1-2 ore). Controlla le tabelle delle maree; fotografa da barche o dalla passerella del ponte Onaruto." }],
  "香川県": [{ q: "Quali condizioni creano il riflesso a specchio di Chichibugahama?", a: "①Bassa marea che coincide con il tramonto ②Vento quasi nullo ③Nuvole nel cielo (cielo limpido sembra piatto). Turismo di Mitoyo pubblica le date ottimali online." }],
  "愛媛県": [{ q: "Posso fotografare l'edificio Dogo Onsen Honkan?", a: "Esterno totalmente aperto; angoli posteriori e illuminazione serale consigliati. Alcune aree interne sono off-limits per la privacy." }],
  "高知県": [{ q: "Consigli per catturare il blu di Niko-buchi?", a: "Verso mezzogiorno nei giorni limpidi, quando la luce solare diretta raggiunge l'acqua, il blu è più intenso. Un filtro polarizzatore approfondisce il colore tagliando i riflessi." }],
  "福岡県": [{ q: "Spot fotografici imperdibili a Fukuoka?", a: "Il sentiero d'accesso e la sala principale del Dazaifu Tenmangu, e il corridoio notturno Torre di Fukuoka–Spiaggia Momochi–Bayside Place." }],
  "大分県": [{ q: "Dove catturare lo skyline di vapore di Beppu?", a: "L'Osservatorio Yukemuri a Kannawa Onsen. Le mattine invernali producono le colonne di vapore più dense per il contrasto termico." }],
  "沖縄県": [
    { q: "Migliore stagione per Miyakojima?", a: "Maggio-settembre per la trasparenza dell'acqua (specialmente luglio-agosto). Settembre è stagione dei tifoni. Dicembre-febbraio è fresco e meno affollato ma con attività marine limitate." },
    { q: "Migliore ora del giorno per scatti di mare cristallino?", a: "10-14, quando il sole è alto e la luce penetra fino al fondale, crea il verde smeraldo più intenso. Il filtro polarizzatore è essenziale." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Come si arriva a Shiretoko?", a: "Volo per Memanbetsu; Utoro Onsen (2h in bus) è la porta. Tour di ghiaccio alla deriva in inverno, crociere e camminata ai Cinque Laghi in estate." }],
  "札幌": [{ q: "Migliore periodo per visitare il centro di Sapporo?", a: "Febbraio (Festival della Neve), giugno (Festival del Lillà), ottobre (fogliame), dicembre (White Illumination). La città cambia volto tutto l'anno." }],
  "さっぽろ雪まつり": [{ q: "Migliore ora del giorno per fotografare il festival?", a: "L'illuminazione dal tramonto alle 21 è la più fotogenica — usa treppiede e ISO basso per mantenere la texture della neve. Diurno funziona con cielo blu sullo sfondo." }],
  "小樽": [{ q: "Miglior punto fotografico lungo il canale?", a: "Tra il ponte Asakusa e il ponte Chuo — magazzini, canale e lampioni a gas in un'unica inquadratura. L'ora blu dopo il tramonto è ideale." }],
  "洞爺湖": [{ q: "Consigli per fotografare i fuochi d'artificio?", a: "Treppiede obbligatorio. ISO 100, f/8, posa B 4-8 s. La piattaforma sul lago cattura i fuochi con il loro riflesso." }],
  "富良野": [{ q: "Migliore ora per i campi di lavanda?", a: "Mattina presto prima delle 7 per luce morbida e folle minime. La luce frontale fa brillare il viola. Verifica lo stato di fioritura prima." }],
  "宮古島": [{ q: "Migliore stagione per Miyakojima?", a: "Maggio-settembre per la chiarezza dell'acqua (specialmente luglio-agosto). Settembre è stagione dei tifoni. Dicembre-febbraio è fresco e meno affollato." }],
  "沖縄": [{ q: "Spot fotografici imperdibili sull'isola principale di Okinawa?", a: "Rovine del Castello Shurijo, Capo Zanpa, Manzamo, Ponte Kouri, Acquario Churaumi, villaggio di ceramica Yachimun e Kokusai-dori." }],
  "横浜": [{ q: "Miglior punto per Minato Mirai?", a: "Osanbashi per lo skyline completo al tramonto; Sakuragicho per la ruota panoramica; Yamashita-koen per il Red Brick Warehouse. Ora blu ottimale." }],
  "鎌倉": [{ q: "Quando ci sono i crisantemi all'Hasedera?", a: "Approssimativamente 1-23 novembre, con illuminazioni serali. Arriva presto per evitare code." }],
  "伊勢神宮": [{ q: "Etichetta fotografica a Ise Jingu?", a: "Aree interne severamente off-limits. Discrezione dentro i torii; non fotografare fedeli o sacerdoti." }],
  "夫婦岩": [{ q: "Quando il sole sorge tra le rocce?", a: "Vicino al solstizio (maggio-luglio). Inizio giugno offre la migliore percentuale di cielo limpido. Arriva prima dell'alba." }],
  "おはらい町・おかげ横丁": [{ q: "Migliore ora per fotografare la strada?", a: "Mattina 8-10, prima dell'ondata di visitatori. La luce laterale sulle case di legno è bellissima." }],
  "朝熊山展望台": [{ q: "Come salire all'osservatorio?", a: "Guidare lungo Ise-Shima Skyline (a pagamento). Accesso facile; osservazione del Monte Fuji possibile in giorni limpidi (rari)." }],
  "横山展望台": [{ q: "Migliore ora per Yokoyama?", a: "Mattina limpida per i dettagli delle isole nella baia di Ago. Il tramonto funziona anche; le piattaforme più alte sono le migliori." }],
  "清水寺": [{ q: "Quando è l'illuminazione autunnale?", a: "Metà novembre a inizio dicembre, 17:30-21. L'ora blu dopo l'apertura è la più magica. Treppiedi non permessi." }],
  "金閣寺": [{ q: "Migliore momento per il Padiglione d'Oro?", a: "Mattine limpide d'inverno con neve sono iconiche; autunno e riflesso nello stagno anche classici. Arriva all'apertura (9)." }],
  "平等院鳳凰堂": [{ q: "Consigli per il riflesso nello stagno Aji?", a: "Mattine senza vento offrono superficie a specchio. Arriva all'apertura (8:30); usa il polarizzatore debolmente per preservare il riflesso." }],
  "東福寺": [{ q: "Migliore momento per il ponte Tsutenkyo?", a: "Metà novembre a inizio dicembre. Apertura 8:30; segui il flusso unidirezionale da nord. Non fermarsi sul ponte." }],
  "東寺": [{ q: "Consigli per fotografare la pagoda a cinque piani?", a: "Stagno Hyotan-ike al tramonto per il riflesso. Illuminazione serale durante le stagioni di ciliegi e autunno." }],
  "八坂の塔": [{ q: "Miglior punto per la pagoda Yasaka?", a: "Guardare la salita Yasaka-dori dal basso è l'angolo classico. 6-7 quasi nessun turista — ideale anche per ritratti in kimono." }],
  "姫路城": [{ q: "Migliore momento per il castello con ciliegi?", a: "Tipicamente inizio aprile. Piazza Sannomaru, Giardino Nishi-no-maru e Parco Memorial Shirotopia sono classici." }],
  "法隆寺": [{ q: "Regole fotografiche?", a: "Recinto OK; statue di Buddha nelle sale per lo più vietate. No treppiedi né flash anche all'aperto. Mattina presto e tardo pomeriggio sono più calmi e morbidi." }],
  "法隆寺 夢殿": [{ q: "Quando è esposto Guze Kannon?", a: "Primavera: 11 aprile-18 maggio; autunno: 22 ottobre-22 novembre. Fotografia della statua proibita." }],
  "鳴門海峡": [{ q: "Barca o passerella?", a: "Barca per intensità, passerella per sicurezza dall'alto. Il pavimento di vetro di Uzu-no-Michi mostra i vortici sotto. In barca aspettati spruzzi." }],
  "大鳴門橋": [{ q: "Miglior punto per il ponte?", a: "Michi-no-Eki Uzushio sul lato Awaji per la migliore vista d'insieme. Il ponte e lo stretto illuminati al tramonto sono bellissimi." }],
  "父母ヶ浜": [{ q: "Come prenotare il giorno ottimale?", a: "Nessuna prenotazione, ma Turismo di Mitoyo pubblica un «Sky Mirror Calendar» con date ottimali. Pianifica per giorni in cui bassa marea e tramonto coincidono." }],
  "亀老山展望台": [{ q: "Come arrivare?", a: "Bus Shimanami Kaido da Imabari o Fukuyama, o in bici. Parcheggio vicino alla cima." }],
  "来島海峡大橋": [{ q: "Miglior punto per il ponte?", a: "Osservatorio del Monte Kiro (Oshima, Imabari) offre la vista definitiva. Cattura il ponte arancione al tramonto e l'ora blu dopo." }],
  "松山城": [{ q: "Funivia o seggiovia?", a: "Se il tempo permette, la seggiovia aperta offre migliore immersione panoramica (5 min). Biglietto combinato copre entrambi." }],
  "道後温泉": [{ q: "Posso fotografare l'Honkan?", a: "Esterno completamente aperto; angoli posteriori e illuminazione serale consigliati. Alcune aree interne off-limits per la privacy." }],
  "桂浜": [{ q: "Miglior angolo per la statua di Ryoma?", a: "Da angolo basso lato mare, salendo le scale dietro al piedistallo — abbina Ryoma al Pacifico sullo sfondo. Tramonto dà silhouette d'impatto." }],
  "高知城": [{ q: "Quanto tempo per salire?", a: "Circa 15 min di scale dall'ingresso al mastio. La porta Otemon è una cornice classica per ciliegi. Non perdere la vista sulla città dal mastio." }],
  "名越屋沈下橋": [{ q: "Migliore stagione?", a: "Verdi freschi a maggio, balneazione estiva (luglio-ago), fogliame autunnale (ott-nov). Mattine invernali con nebbia anche oniriche." }],
  "にこ淵": [{ q: "Quando il blu è più forte?", a: "Mezzogiorno limpido (10-14), specialmente estate-inizio autunno. Dopo la pioggia, la torbidità riduce l'effetto — clima secco ideale. Porta filtro PL." }],
  "福岡": [{ q: "Etichetta fotografica negli yatai?", a: "Chiedi prima al personale/clienti. Primi piani solo dopo aver chiesto. Esterni e strade liberi." }],
  "別府": [{ q: "Quanto dura il tour degli Inferni?", a: "Tutti i 7 Inferni richiedono 2-3 ore. Il biglietto combinato fa risparmiare. Inferno del Mare, dello Stagno di Sangue e Tatsumaki sono i top-3." }],
  "湯布院": [{ q: "Condizioni per la nebbia mattutina al lago Kinrin?", a: "Mattine limpide novembre-marzo sotto i 5°C — la differenza termica tra acqua termale e aria produce nebbia. Più densa dall'alba a un'ora dopo." }],
  "白川郷": [{ q: "Fotografare dall'osservatorio?", a: "L'Osservatorio delle Rovine del Castello Ogimachi domina l'intero villaggio — il classico. Nebbia autunno-inverno, neve gennaio-febbraio, verde di maggio: ognuno un capolavoro." }],
  "美幌峠": [{ q: "Quando appare il mare di nuvole?", a: "Mattine settembre-novembre in giorni limpidi e senza vento con grandi differenze termiche. Picco a circa 30 min intorno all'alba." }],
  "摩周湖": [{ q: "Probabilità di vedere il lago?", a: "Tasso annuale di visibilità ~30%. L'estate è particolarmente nebbiosa; inverno-primavera offrono migliore chiarezza. Visita più osservatori per aumentare le probabilità." }],
  "阿寒": [{ q: "Posso vedere i marimo?", a: "Al Centro di Osservazione dei Marimo sull'isola Churui — accessibile in barca turistica." }],
  "三段滝公園": [{ q: "Quando vedere le cascate ghiacciate?", a: "Solo metà gennaio-fine febbraio durante il grande freddo. Completamente ghiacciate, diventano una scultura di ghiaccio bianco-azzurro." }],
  "室蘭": [{ q: "Miglior punto per la vista notturna delle fabbriche?", a: "Osservatorio Iwaizumi, Monte Sokuryo e Ponte Hakucho sono i tre classici. Cattura il ponte con le luci delle fabbriche nell'ora blu." }],
  "美唄": [{ q: "Cosa rende speciale Arte Piazza?", a: "Un museo di sculture all'aperto gratuito in una scuola riconvertita. Opere in marmo bianco, scuola in legno e neve insieme sembrano pittoriche." }],
  "登別": [{ q: "Migliore momento per Jigokudani?", a: "Mattina per luce morbida e vapore visibile. L'illuminazione serale (maggio-ottobre) è atmosferica." }],
  "北竜町": [{ q: "Quando è la fioritura di picco?", a: "Tipicamente la prima settimana fino al ~10 agosto. Scatto classico: panorama completo dall'osservatorio. Luce frontale mattutina più vivida." }],
  "東京": [{ q: "Consigli per fotografia notturna?", a: "Treppiede, ISO basso e lunga esposizione. Ora blu (30 min dopo il tramonto) bilancia meglio cielo e luci urbane." }],
  "品川": [{ q: "Spot vicini alla stazione di Shinagawa?", a: "Vista dello Shinkansen dal ponte pedonale lato Takanawa, grattacieli lato Konan, corridoio di vetro di Shinagawa Intercity e vista notturna del canale a Tennozu Isle." }],
  "東山動物園": [{ q: "Consigli per fotografare gli animali?", a: "Un'ottica fissa luminosa (50mm f/1.8) sfoca lo sfondo. Premi l'obiettivo contro la rete per farla sparire. Metti a fuoco gli occhi." }],
  "梅林公園": [{ q: "Quando è la fioritura di picco?", a: "Metà febbraio a inizio marzo. Con varietà precoci e tardive, fine febbraio offre la maggiore diversità." }],
  "鳥羽水族館": [{ q: "Quando il dugongo è più attivo?", a: "Vicino agli orari di alimentazione (circa 11 e 15). A volte nuota fino al vetro — un momento prezioso." }],
  "清水寺周辺": [{ q: "Miglior punto per la pagoda Yasaka?", a: "Guardare la salita Yasaka-dori dal basso è l'angolo classico. 6-7 quasi nessun turista — ideale anche per ritratti in kimono." }],
  "鴨川シーワールド": [{ q: "Consigli per fotografare le orche?", a: "Velocità otturatore 1/1000+ per congelare gli spruzzi; raffica essenziale. Le prime file vengono bagnate — scegli i posti con cura." }],
  "旭山動物園": [{ q: "Orario della passeggiata dei pinguini?", a: "Due volte al giorno da metà dicembre a marzo — solo inverno, quando c'è neve. La parata dei pinguini reali è classica invernale." }],
  "金沢": [{ q: "Spot fotografici a Kanazawa in un giorno?", a: "Kenrokuen all'alba (luce morbida), Castello di Kanazawa, Higashi Chaya (pomeriggio/sera), mercato Omicho, Porta del Tamburo alla stazione Kanazawa di notte." }],
  "新倉山浅間公園": [{ q: "Come raggiungere il deck panoramico?", a: "Stazione Shimo-Yoshida (linea Fujikyu), 10 min a piedi al santuario, poi 398 gradini (rampa più dolce disponibile). Arriva 5-6 per evitare folle e cogliere l'alba sul Fuji." }],
  "河口湖": [{ q: "Miglior posto per il riflesso del Fuji invertito?", a: "Parco Oishi e Ubuyagasaki sulla riva nord sono classici. Mira a mattine senza vento 6-8 quando il lago specchia. L'inverno offre l'aria più limpida e migliore trasparenza." }],
  "松本城": [{ q: "Come inquadrare il mastio con ciliegi e Alpi?", a: "Intorno al ponte Uzumi, lato nord-ovest del fossato interno, è il meglio. Tele per comprimere mastio e creste alpine, con ciliegi di metà aprile come bokeh frontale. Mattina offre controluce morbido." }],
  "高遠城址公園": [{ q: "Migliore ora del giorno per fotografare i ciliegi di Takato?", a: "Prima delle 6 offre luce blu senza folle. Il pomeriggio transita per l'ora blu fino all'illuminazione, dove la luce calda delle lanterne incontra i ciliegi rosa." }],
  "駒つなぎの桜": [{ q: "Cosa serve per il riflesso della risaia?", a: "Metà-fine aprile, quando le risaie sono allagate per la semina, in un'alba senza vento. Porta treppiede e obiettivo grandangolare-standard; per stelle+ciliegi, corpo tollerante ad alto ISO consigliato." }],
  "長野県天空の楽園": [{ q: "Migliore periodo dell'anno per osservare le stelle?", a: "Vicino alla luna nuova. L'inverno (nov-feb) dà le stelle più nitide (Via Lattea più debole). L'estate è la migliore per il cuore della Via Lattea. Il tour notturno richiede prenotazione anticipata." }],
  "弘法山古墳": [{ q: "Come accedere e dove fotografare?", a: "Dalla stazione di Matsumoto, ~20 min in bus + ~20 min a piedi al sentiero, poi 15-20 min in salita alla cima. Alba dà controluce morbido sulle Alpi del Nord ed evita le folle." }],
  "安養寺": [{ q: "Quando è la fioritura di picco?", a: "Metà aprile. Mattina offre colori frontali e vividi. Sera dà silhouette d'impatto della sala e dell'albero. Recinto silenzioso — fotografa con rispetto." }],
  "松本市新村": [{ q: "Cosa c'è vicino alla stazione di Niimura?", a: "L'antica stazione in legno Mitsumizo, risaie con le Alpi, vie costellate di ciliegi, nebbia mattutina sui campi di riso — gioiello nascosto che combina ferrovia e paesaggio." }],
  "城山公園(松本市)": [{ q: "Migliore inquadratura dalla piazza dell'osservatorio?", a: "Inquadratura verticale con ciliegi in primo piano e cresta alpina dietro è classica. L'«alpenglow» mattutino (cime innevate che diventano rosse all'alba) con sakura è il picco assoluto." }],
  "中町通り(松本市)": [{ q: "Migliore ora del giorno per fotografare?", a: "6-8 offre strade vuote e composizioni pulite delle pareti kura. Sera, quando i lampioni si accendono e le pareti bianche si scaldano in ambra, dà l'atmosfera più nostalgica." }],
  "高島公園(諏訪市)": [{ q: "Miglior punto per il riflesso nel fossato?", a: "Dal lato sud del fossato, usa il tele per comprimere mastio e ciliegi. Mattine o serate senza vento danno acqua a specchio. Durante l'illuminazione, l'ora blu è la più magica." }],
  "諏訪湖": [{ q: "Migliori spot fotografici intorno al Lago Suwa?", a: "Parco Tateishi (vista dall'alto), passeggiata lacustre (lago + città), area del Geyser Center (tramonto), e la riva est dove Yatsugatake si riflette. Le creste di ghiaccio Omiwatari appaiono in mattine di gennaio-febbraio." }],
  "立石公園": [{ q: "Consigli per vista notturna e cielo stellato?", a: "Treppiede essenziale. Vista notturna: ISO 200, f/8, 10-30 s. Stelle: ISO 3200, f/2.8, ~15 s. I 20-30 min dopo il tramonto (ora magica) danno il più bel gradiente tra luci della città e crepuscolo." }],
};

let content = readFileSync(IT_PATH, "utf-8");
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
writeFileSync(IT_PATH, content, "utf-8");
console.log(`✓ it.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
