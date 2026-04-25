#!/usr/bin/env node
/** Dutch FAQs を extras/nl.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NL_PATH = resolve(__dirname, "app", "content", "extras", "nl.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Welk seizoen is het beste voor Hokkaido-fotografie?", a: "Februari voor het Sapporo Sneeuwfestival en drijfijs, juli voor lavendel in Furano, oktober voor herfstkleuren, en januari-maart voor drijfijs in Shiretoko. Combineer je onderwerp met zijn topseizoen." },
    { q: "Wat zijn de belangrijkste fotoplekken in Hokkaido?", a: "Sapporo stadsgezichten, Otaru-kanaal, Furano bloemenvelden, Mashumeer, Toyameer, Shiretoko-schiereiland, Noboribetsu Hellevallei, Asahiyama Dierentuin en de glooiende heuvels van Biei — elk gebied heeft een eigen visueel karakter." },
  ],
  "千葉県": [{ q: "Welk soort fotografie biedt Chiba?", a: "Kustlijnen, landelijke Boso-landschappen en wildlife/aquaria — diverse mix nabij de metropool." }],
  "東京都": [{ q: "Tips voor nachtfotografie in Tokio?", a: "Statief, lage ISO en lange belichting. Het blauwe uur (30 min na zonsondergang) balanceert hemel en stadslichten het best." }],
  "神奈川県": [{ q: "Beste manier om Kamakura en Yokohama te bezoeken?", a: "'s Ochtends in de tempels van Kamakura (Grote Boeddha, Hasedera), daarna 's middags naar Yokohama voor zonsondergang in Minato Mirai en avondbeelden van het Red Brick Warehouse." }],
  "石川県": [{ q: "Wat fotograferen in Kanazawa op één dag?", a: "Vroeg in Kenrokuen (zacht licht), dan Kasteel Kanazawa, Higashi Chaya (middag/avond), Omicho-markt, en eindigen met de Drumpoort bij Kanazawa-station 's nachts." }],
  "山梨県": [{ q: "Beste plek om Mount Fuji met kersenbloesem te fotograferen?", a: "Het uitkijkdek van de Chureito-pagode in het Arakurayama Sengen-park is wereldberoemd. Na 398 treden lijnen pagode, kersenbloesem en Mount Fuji uit in één frame. Volle bloei begin tot half april, zonsopgang geeft het meest magische licht." }],
  "長野県": [{ q: "Wanneer bloeien de kersen in Takato Castle Park?", a: "Begin tot half april. Ongeveer 1.500 «Takato Kohigan» kersenbomen bloeien zachtroze, met de titel «beste kersenbloesem onder de hemel». Avondverlichting is droomachtig, vroege ochtend vermijdt menigten het best." }],
  "岐阜県": [{ q: "Wanneer is de winterverlichting van Shirakawa-go?", a: "Op een beperkt aantal dagen (meestal ~6) in januari-februari. Reservering vereist; plan vroeg om gassho-huizen in de sneeuw vanaf de uitkijkpost te fotograferen." }],
  "愛知県": [{ q: "Tips voor goede dierentuinfotografie?", a: "Een snelle prime (bijv. 50mm f/1.8) vervaagt de achtergrond; druk de lens tegen het gaas om het te laten verdwijnen. Focus op de ogen van het dier." }],
  "三重県": [
    { q: "Foto-etiquette bij Ise Jingu?", a: "Binnen de hoofdheiligdommen is strikt verboden. Blijf bescheiden binnen de torii en vermijd directe foto's van gelovigen of priesters." },
    { q: "Wanneer komt de zon op tussen de Meoto Iwa?", a: "Alleen rond de zomerzonnewende (mei-juli) komt de zon recht tussen de twee rotsen op. Begin juni heeft de beste kans op heldere lucht; arriveer voor zonsopgang." },
  ],
  "京都府": [
    { q: "Beste tijd voor Kyoto's herfstkleuren?", a: "De piek valt meestal eind november-begin december. Tofuku-ji (Tsuten-kyo brug), Eikando, Kiyomizu-dera en Arashiyama zien er het best uit in ochtendlijk frontlicht." },
    { q: "Hoe vermijd je drukte?", a: "Vroeg in de ochtend (6-8) is verreweg het beste. Kiyomizu-dera opent om 6, loop voor 9 langs de buitenkant van Kinkaku-ji, en arriveer bij Byodoin precies bij opening." },
  ],
  "兵庫県": [{ q: "Beste fotoplekken voor Himeji-kasteel?", a: "Otemon-voorzijde, Sannomaru-plein (met kersen), Nishi-no-maru-tuin (zijaanzicht) en Otoko-yama-park (verhoogd) zijn de vier klassieken." }],
  "奈良県": [{ q: "Tips voor het fotograferen van herten in Nara?", a: "Een shika senbei vasthouden trekt ze aan, maar ze gaan weg als het op is. Ochtendlijk tegenlicht dat hun vacht accentueert is een klassieke compositie." }],
  "徳島県": [{ q: "Wanneer zijn de Naruto-draaikolken het grootst?", a: "Bij springtij (rond nieuwe of volle maan) in lente/herfst, rond eb/vloed (±1-2 uur). Controleer getijdetabellen; fotografeer vanaf boten of de Onaruto-bruglooppad." }],
  "香川県": [{ q: "Welke voorwaarden creëren Chichibugahama's spiegelreflectie?", a: "①Eb samenvallend met zonsondergang ②Bijna geen wind ③Wolken in de lucht (heldere lucht oogt vlak). Mitoyo-toerisme publiceert optimale data online." }],
  "愛媛県": [{ q: "Mag ik het Dogo Onsen Honkan-gebouw fotograferen?", a: "Buitenkant volledig open; achterhoeken en avondverlichting aanbevolen. Sommige binnenruimtes zijn verboden voor privacy." }],
  "高知県": [{ q: "Tips om het blauw van Niko-buchi vast te leggen?", a: "Rond het middaguur op heldere dagen, wanneer direct zonlicht het water bereikt, is het blauw het sterkst. Een polarisatiefilter verdiept de kleur door oppervlaktereflecties te beperken." }],
  "福岡県": [{ q: "Onmisbare fotoplekken in Fukuoka?", a: "De aanloop en hoofdhal van Dazaifu Tenmangu, plus de avondcorridor Fukuoka Tower–Momochi-strand–Bayside Place." }],
  "大分県": [{ q: "Waar leg je Beppu's stoomskyline vast?", a: "De Yukemuri-uitkijkpost in Kannawa Onsen. Winterochtenden produceren de dichtste stoomkolommen door temperatuurcontrast." }],
  "沖縄県": [
    { q: "Beste seizoen voor Miyakojima?", a: "Mei-september voor watertransparantie (vooral juli-augustus). September is taifoenseizoen. December-februari is fris en minder druk maar maritieme activiteiten zijn beperkt." },
    { q: "Beste tijdstip op de dag voor heldere zee?", a: "10-14 uur, wanneer de zon hoog staat en het licht de zeebodem bereikt, creëert het sterkste smaragdgroen. Polarisatiefilter is essentieel." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Hoe bereik je Shiretoko?", a: "Vlieg naar Memanbetsu; Utoro Onsen (2 uur per bus) is de toegangspoort. Drijfijstours in winter, cruises en wandeling van de Vijf Meren in zomer." }],
  "札幌": [{ q: "Beste tijd om Sapporo-centrum te bezoeken?", a: "Februari (Sneeuwfestival), juni (Lila Festival), oktober (gebladerte), december (White Illumination). De stad verandert het hele jaar van gezicht." }],
  "さっぽろ雪まつり": [{ q: "Beste tijdstip om het festival te fotograferen?", a: "Verlichting van zonsondergang tot 21 uur is het meest fotogeniek — gebruik statief en lage ISO om sneeuwtextuur te behouden. Overdag werkt met blauwe lucht als achtergrond." }],
  "小樽": [{ q: "Beste fotoplek langs het kanaal?", a: "Tussen de Asakusa-brug en Chuo-brug — pakhuizen, kanaal en gaslampen in één frame. Het blauwe uur na zonsondergang is ideaal." }],
  "洞爺湖": [{ q: "Tips voor vuurwerkfotografie?", a: "Statief verplicht. ISO 100, f/8, B 4-8 sec. Het meerplatform vangt vuurwerk met zijn reflectie." }],
  "富良野": [{ q: "Beste tijd voor lavendelvelden?", a: "Vroeg voor 7 uur voor zacht licht en minimale drukte. Frontlicht laat het paars stralen. Controleer vooraf de bloeistand." }],
  "宮古島": [{ q: "Beste seizoen voor Miyakojima?", a: "Mei-september voor waterhelderheid (vooral juli-augustus). September is taifoenseizoen. December-februari is fris en minder druk." }],
  "沖縄": [{ q: "Onmisbare fotoplekken op het Okinawa-hoofdeiland?", a: "Ruïnes van Shurijo-kasteel, Kaap Zanpa, Manzamo, Kouri-brug, Churaumi-aquarium, Yachimun-pottenbakkerijdorp en Kokusai-dori." }],
  "横浜": [{ q: "Beste plek voor Minato Mirai?", a: "Osanbashi voor de complete skyline bij zonsondergang; Sakuragicho voor het reuzenrad; Yamashita-koen voor het Red Brick Warehouse. Blauw uur is optimaal." }],
  "鎌倉": [{ q: "Wanneer zijn de chrysanten bij Hasedera?", a: "Ongeveer 1-23 november, met avondverlichting. Kom vroeg om wachtrijen te vermijden." }],
  "伊勢神宮": [{ q: "Foto-etiquette bij Ise Jingu?", a: "Binnenruimtes strikt verboden. Discreet binnen de torii; fotografeer geen gelovigen of priesters." }],
  "夫婦岩": [{ q: "Wanneer komt de zon op tussen de rotsen?", a: "Rond zonnewende (mei-juli). Begin juni heeft de beste kans op heldere lucht. Kom voor zonsopgang." }],
  "おはらい町・おかげ横丁": [{ q: "Beste tijd om de straat te fotograferen?", a: "Ochtend 8-10, voor de bezoekersstroom. Zijlicht op houten huizen is prachtig." }],
  "朝熊山展望台": [{ q: "Hoe naar het uitkijkpunt rijden?", a: "Rij via Ise-Shima Skyline (tol). Makkelijke toegang; Mount Fuji-zicht mogelijk op heldere dagen (zeldzaam)." }],
  "横山展望台": [{ q: "Beste tijd voor Yokoyama?", a: "Heldere ochtend voor eilanddetails in Ago-baai. Zonsondergang werkt ook; de hoogste platforms zijn het beste." }],
  "清水寺": [{ q: "Wanneer is de herfstverlichting?", a: "Half november tot begin december, 17:30-21. Het blauwe uur na opening is het meest magisch. Statief niet toegestaan." }],
  "金閣寺": [{ q: "Beste tijd voor het Gouden Paviljoen?", a: "Heldere winterochtenden met sneeuw zijn iconisch; herfst en vijverreflectie ook klassiek. Kom bij opening (9)." }],
  "平等院鳳凰堂": [{ q: "Tips voor reflectie in Aji-vijver?", a: "Windstille ochtenden geven een spiegeloppervlak. Kom bij opening (8:30); gebruik polarisator zwak om de reflectie te behouden." }],
  "東福寺": [{ q: "Beste tijd voor Tsutenkyo-brug?", a: "Half november tot begin december. Opening 8:30; volg de eenrichtingsstroom vanuit het noorden. Stop niet op de brug." }],
  "東寺": [{ q: "Tips voor de vijfverdiepingen-pagode?", a: "Hyotan-ike-vijver bij zonsondergang voor reflectie. Avondverlichting tijdens kers- en herfstseizoen." }],
  "八坂の塔": [{ q: "Beste plek voor Yasaka-pagode?", a: "Naar boven kijken op de Yasaka-dori-helling vanaf onderen is de klassieke hoek. 6-7 uur vrijwel zonder toeristen — ideaal ook voor kimonoportretten." }],
  "姫路城": [{ q: "Beste tijd voor het kasteel met kersen?", a: "Doorgaans begin april. Sannomaru-plein, Nishi-no-maru-tuin en Shirotopia-herdenkingspark zijn klassiek." }],
  "法隆寺": [{ q: "Foto-regels?", a: "Terrein OK; Boeddhabeelden in de zalen meestal verboden. Geen statieven of flits zelfs buiten. Vroege ochtend en late namiddag rustiger en zachter." }],
  "法隆寺 夢殿": [{ q: "Wanneer wordt Guze Kannon getoond?", a: "Lente: 11 april-18 mei; herfst: 22 oktober-22 november. Foto van het beeld verboden." }],
  "鳴門海峡": [{ q: "Boot of looppad?", a: "Boot voor intensiteit, looppad voor veiligheid van bovenaf. De glazen vloer van Uzu-no-Michi toont draaikolken eronder. In de boot moet je opspattend water verwachten." }],
  "大鳴門橋": [{ q: "Beste plek voor de brug?", a: "Michi-no-Eki Uzushio aan de Awaji-zijde voor het beste overzicht. Brug en straat oplichtend bij zonsondergang zijn prachtig." }],
  "父母ヶ浜": [{ q: "Hoe boek ik de optimale dag?", a: "Geen reservering, maar Mitoyo-toerisme publiceert een «Sky Mirror Calendar» met optimale dagen. Plan voor dagen waarop eb en zonsondergang samenvallen." }],
  "亀老山展望台": [{ q: "Hoe kom je er?", a: "Shimanami Kaido-bus vanuit Imabari of Fukuyama, of per fiets. Parkeren dichtbij de top." }],
  "来島海峡大橋": [{ q: "Beste plek voor de brug?", a: "Mt. Kiro-uitkijkpost (Oshima, Imabari) biedt het definitieve overzicht. Vang de oranje verlichte brug bij zonsondergang en het blauwe uur erna." }],
  "松山城": [{ q: "Kabelbaan of stoeltjeslift?", a: "Als het weer het toelaat, biedt de open stoel een betere panoramische ervaring (5 min). Een combikaartje dekt beide." }],
  "道後温泉": [{ q: "Mag ik Honkan fotograferen?", a: "Buitenkant volledig open; achterhoeken en avondverlichting aanbevolen. Sommige binnenruimtes verboden voor privacy." }],
  "桂浜": [{ q: "Beste hoek voor Ryoma-standbeeld?", a: "Vanuit lage hoek aan de zeekant, na de trap achter de sokkel — koppelt Ryoma met Pacific als achtergrond. Zonsondergang geeft een opvallend silhouet." }],
  "高知城": [{ q: "Hoe lang duurt de klim?", a: "Ongeveer 15 min trappen van de ingang tot de toren. De Otemon-poort is een klassiek frame voor kersen. Mis het stadsuitzicht vanaf de toren niet." }],
  "名越屋沈下橋": [{ q: "Beste seizoen?", a: "Frisgroen in mei, zomerzwemmen (juli-aug), herfstkleuren (okt-nov). Winterochtenden met mist ook droomachtig." }],
  "にこ淵": [{ q: "Wanneer is het blauw het sterkst?", a: "Heldere middag (10-14), vooral zomer-vroege herfst. Na regen vermindert troebelheid het effect — droog weer ideaal. Breng PL-filter mee." }],
  "福岡": [{ q: "Foto-etiquette bij yatai?", a: "Vraag personeel/klanten eerst. Close-ups na toestemming. Buitenkant en straten vrij." }],
  "別府": [{ q: "Hoe lang duurt de Hellen-tour?", a: "Alle 7 Hellen duren 2-3 uur. Het combikaartje bespaart. Zee-Hel, Bloedplas-Hel en Tatsumaki zijn de top-3." }],
  "湯布院": [{ q: "Voorwaarden voor ochtendmist bij Kinrin-meer?", a: "Heldere ochtenden november-maart onder 5°C — het temperatuurverschil tussen onsen-water en lucht produceert mist. Dichtst van voor zonsopgang tot een uur erna." }],
  "白川郷": [{ q: "Fotograferen vanaf de uitkijkpost?", a: "De Ogimachi-kasteelruïne-uitkijkpost overziet het hele dorp — de klassieker. Herfst-wintermist, januari-februari sneeuw, mei-groen: elk een meesterwerk." }],
  "美幌峠": [{ q: "Wanneer verschijnt de wolkenzee?", a: "Ochtenden september-november op heldere, windstille dagen met grote temperatuurverschillen. Piek ongeveer 30 min rond zonsopgang." }],
  "摩周湖": [{ q: "Wat is de kans om het meer te zien?", a: "Jaarlijks zichtbaarheidspercentage ~30%. Zomer vooral mistig; winter en lente bieden betere helderheid. Bezoek meerdere uitkijkposten om de kans te vergroten." }],
  "阿寒": [{ q: "Kan ik marimo zien?", a: "In het Marimo-tentoonstellings-observatiecentrum op Churui-eiland — bereikbaar per toeristische boot." }],
  "三段滝公園": [{ q: "Wanneer zie je bevroren watervallen?", a: "Alleen half januari tot eind februari tijdens diepe kou. Volledig bevroren wordt het een blauwwitte ijssculptuur." }],
  "室蘭": [{ q: "Beste plek voor fabrieksnachtzicht?", a: "Iwaizumi-uitkijkpost, Mt. Sokuryo en Hakucho-brug zijn de drie klassiekers. Vang de brug met fabriekslichten in het blauwe uur." }],
  "美唄": [{ q: "Wat is bijzonder aan Arte Piazza?", a: "Een gratis openluchtbeeldhouwwerkmuseum in een herbestemde school. Witte marmeren werken, houten schoolgebouw en sneeuw oogen samen schilderachtig." }],
  "登別": [{ q: "Beste tijd voor Jigokudani?", a: "'s Ochtends voor zacht licht en zichtbare stoom. De avondverlichting (mei-oktober) is sfeervol." }],
  "北竜町": [{ q: "Wanneer is de piekbloei?", a: "Doorgaans de eerste week tot ~10 augustus. Klassieke shot: panoramisch volveld vanaf de uitkijkpost. Ochtendlijk frontlicht het levendigst." }],
  "東京": [{ q: "Tips voor nachtfotografie?", a: "Statief, lage ISO en lange belichting. Het blauwe uur (30 min na zonsondergang) balanceert hemel en stadslichten het best." }],
  "品川": [{ q: "Plekken bij station Shinagawa?", a: "Shinkansen-zicht vanaf de voetgangersbrug Takanawa-zijde, wolkenkrabbers Konan-zijde, glazen corridor van Shinagawa Intercity en kanaalnachtzicht op Tennozu Isle." }],
  "東山動物園": [{ q: "Tips voor dierfotografie?", a: "Een snelle prime (50mm f/1.8) vervaagt de achtergrond. Druk de lens tegen het gaas om het te laten verdwijnen. Focus op de ogen." }],
  "梅林公園": [{ q: "Wanneer is de piekbloei?", a: "Half februari tot begin maart. Met vroege en late soorten biedt eind februari de grootste diversiteit." }],
  "鳥羽水族館": [{ q: "Wanneer is de doegong het actiefst?", a: "Rond voedertijden (ongeveer 11 en 15). Soms zwemt hij tot het glas — een waardevol moment." }],
  "清水寺周辺": [{ q: "Beste plek voor Yasaka-pagode?", a: "Naar boven kijken op de Yasaka-dori-helling vanaf onderen is de klassieke hoek. 6-7 vrijwel zonder toeristen — ideaal ook voor kimonoportretten." }],
  "鴨川シーワールド": [{ q: "Tips voor orca-fotografie?", a: "Sluitertijd 1/1000+ om spatten te bevriezen; burst-modus essentieel. Voorste rijen worden nat — kies stoelen zorgvuldig." }],
  "旭山動物園": [{ q: "Schema pinguïnwandeling?", a: "Tweemaal per dag van half december tot maart — alleen winter, wanneer er sneeuw ligt. De koningspinguïnoptocht is een wintervast." }],
  "金沢": [{ q: "Fotoplekken in Kanazawa op één dag?", a: "Kenrokuen bij zonsopgang (zacht licht), Kasteel Kanazawa, Higashi Chaya (middag/avond), Omicho-markt, Drumpoort bij Kanazawa-station 's nachts." }],
  "新倉山浅間公園": [{ q: "Hoe bereik je het uitkijkdek?", a: "Station Shimo-Yoshida (Fujikyu-lijn), 10 min lopen naar het heiligdom, dan 398 treden (zachtere helling ook beschikbaar). Kom 5-6 om drukte te vermijden en de zonsopgang op Fuji vast te leggen." }],
  "河口湖": [{ q: "Beste plek voor de omgekeerde Fuji-reflectie?", a: "Oishi Park en Ubuyagasaki op de noordoever zijn klassiek. Mik op windstille ochtenden 6-8 wanneer het meer spiegelt. Winter biedt de helderste lucht en beste transparantie." }],
  "松本城": [{ q: "Hoe kader je de toren met kersen en de Alpen?", a: "Rond de Uzumi-brug aan de noordwestkant van de binnenste gracht is het beste. Telelens om toren en Alpen-bergkammen samen te drukken, met half-aprilkersen als voorgrondbokeh. Ochtend geeft zacht tegenlicht." }],
  "高遠城址公園": [{ q: "Beste tijdstip op de dag voor Takato-kersen?", a: "Voor 6 uur biedt drukteloos blauw licht. Middag overgang via blauw uur naar verlichting, waar warm lantaarnlicht roze bloesems ontmoet." }],
  "駒つなぎの桜": [{ q: "Wat is nodig voor de rijstveld-reflectie?", a: "Half tot eind april als rijstvelden zijn ondergelopen voor planten, in een windstille dageraad. Breng statief en groothoek-tot-standaardlens; voor sterren+kersen wordt een hoog-ISO-tolerant lichaam aanbevolen." }],
  "長野県天空の楽園": [{ q: "Beste tijd van het jaar voor sterrenkijken?", a: "Rond nieuwe maan. Winter (nov-feb) geeft de scherpste sterren (Melkweg zwakker). Zomer is het beste voor de Melkwegkern. De nachttour vereist reservering." }],
  "弘法山古墳": [{ q: "Hoe komen en waar fotograferen?", a: "Vanaf station Matsumoto, ~20 min bus + ~20 min lopen naar het pad, dan 15-20 min omhoog naar de top. Dageraad geeft zacht tegenlicht op de Noord-Alpen en vermijdt drukte." }],
  "安養寺": [{ q: "Wanneer is de piekbloei?", a: "Half april. Ochtend biedt frontaal verlicht, levendige bloemkleuren. Avond geeft indrukwekkende silhouetten van zaal en boom. Stille terreinen — fotografeer met respect." }],
  "松本市新村": [{ q: "Wat is er bij station Niimura?", a: "Het oude houten Mitsumizo-station, rijstvelden met de Alpen, kersenrijke lanen, ochtendmist over rijstvelden — verborgen juweel dat trein- en landschapsfotografie combineert." }],
  "城山公園(松本市)": [{ q: "Beste kadrering vanaf het uitkijkplein?", a: "Verticaal frame met kersen op de voorgrond en Alpenkam erachter is klassiek. De ochtend «alpenglow» (besneeuwde toppen die rood worden bij zonsopgang) met sakura is het absolute hoogtepunt." }],
  "中町通り(松本市)": [{ q: "Beste tijdstip op de dag om te fotograferen?", a: "6-8 biedt lege straten en schone composities van kura-muren. Avond, wanneer straatlampen aangaan en witte muren amber-warm worden, geeft de meest nostalgische sfeer." }],
  "高島公園(諏訪市)": [{ q: "Beste plek voor grachtreflectie?", a: "Vanaf de zuidkant van de gracht, gebruik telelens om toren en kersen samen te drukken. Windstille ochtenden of avonden geven spiegelend water. Tijdens verlichting is het blauwe uur het meest magisch." }],
  "諏訪湖": [{ q: "Beste fotoplekken rond Suwa-meer?", a: "Tateishi-park (van bovenaf), promenade langs het meer (meer + stad), Geyser Center-gebied (zonsondergang) en de oostoever waar Yatsugatake reflecteert. Omiwatari-ijsruggen verschijnen in januari-februariochtenden." }],
  "立石公園": [{ q: "Tips voor nachtzicht en sterrenhemel?", a: "Statief essentieel. Nachtzicht: ISO 200, f/8, 10-30 sec. Sterren: ISO 3200, f/2.8, ~15 sec. De 20-30 min na zonsondergang (magisch uur) geven het mooiste verloop tussen stadslichten en schemering." }],
};

let content = readFileSync(NL_PATH, "utf-8");
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
writeFileSync(NL_PATH, content, "utf-8");
console.log(`✓ nl.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
