#!/usr/bin/env node
/** Swedish FAQs を extras/sv.js に追加 (15/15 — 最終言語) */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SV_PATH = resolve(__dirname, "app", "content", "extras", "sv.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Vilken är bästa säsongen för att fotografera Hokkaido?", a: "Februari för Sapporo Snöfestivalen och drivis, juli för lavendel i Furano, oktober för höstlöv och januari-mars för drivis i Shiretoko. Para ihop ditt motiv med dess toppsäsong." },
    { q: "Vilka är de viktigaste fotoplatserna i Hokkaido?", a: "Stadslandskap i Sapporo, Otarus kanal, Furanos blomsterfält, Mashusjön, Toyasjön, Shiretoko-halvön, Noboribetsus Helvetesdal, Asahiyamas djurpark och Bieis böljande kullar — varje område har sin egen visuella karaktär." },
  ],
  "千葉県": [{ q: "Vilken sorts fotografi erbjuder Chiba?", a: "Kustlinjer, lantliga Boso-landskap och vilda djur/akvarier — en mångsidig blandning nära storstaden." }],
  "東京都": [{ q: "Tips för nattfotografering i Tokyo?", a: "Stativ, låg ISO och lång exponering. Den blå timmen (30 min efter solnedgång) balanserar himmel och stadsljus bäst." }],
  "神奈川県": [{ q: "Bästa sättet att besöka Kamakura och Yokohama?", a: "Morgon i Kamakuras tempel (stora Buddha, Hasedera), sedan eftermiddag till Yokohama för solnedgång vid Minato Mirai och nattvyer av Röda Tegelmagasinet." }],
  "石川県": [{ q: "Vad fotograferar man i Kanazawa på en dag?", a: "Tidig morgon i Kenrokuen (mjukt ljus), sedan Kanazawa slott, Higashi Chaya (eftermiddag/kväll), Omichomarknaden, och avsluta med Trumporten vid Kanazawa station på natten." }],
  "山梨県": [{ q: "Bästa platsen att fotografera Mt. Fuji med körsbärsblommor?", a: "Chureito-pagodens utsiktsdäck i Arakurayama Sengen-parken är världsberömd. Efter 398 trappsteg linjerar pagoden, körsbärsblommorna och Mt. Fuji upp i en enda bildruta. Full blom början-mitten av april, soluppgång ger det mest magiska ljuset." }],
  "長野県": [{ q: "När blommar körsbärsträden i Takato slottspark?", a: "Början-mitten av april. Cirka 1.500 «Takato Kohigan»-körsbärsträd blommar i ljusrosa och vinner titeln «bästa körsbärsblom under himlen». Kvällsbelysning är drömlik, tidig morgon undviker folkmängderna bäst." }],
  "岐阜県": [{ q: "När är Shirakawa-gos vinterupplysning?", a: "Hålls under begränsat antal dagar (vanligtvis ~6) i januari-februari. Bokning krävs; planera tidigt för att fotografera gassho-hus i snön från utsiktsplatsen." }],
  "愛知県": [{ q: "Tips för bra djurparksfotografering?", a: "En snabb fast (t.ex. 50mm f/1.8) suddar bakgrunden; tryck linsen mot nätet för att få det att försvinna. Fokusera på djurets ögon." }],
  "三重県": [
    { q: "Fotoetikett vid Ise Jingu?", a: "Inuti huvudhelgedomarna är strikt förbjudet. Var diskret innanför torii och undvik att fotografera troende eller präster direkt." },
    { q: "När går solen upp mellan Meoto Iwa?", a: "Endast nära sommarsolståndet (maj-juli) går solen upp rakt mellan de två klipporna. Början av juni har bästa procenten klar himmel; kom före gryningen." },
  ],
  "京都府": [
    { q: "Bästa tiden för Kyotos höstlöv?", a: "Toppen ligger oftast slutet av november-början av december. Tofuku-ji (Tsuten-kyo bron), Eikando, Kiyomizu-dera och Arashiyama ser bäst ut i morgonens framljus." },
    { q: "Hur undviker man folkmassor?", a: "Tidig morgon (6-8) är klart bäst. Kiyomizu-dera öppnar 6, gå runt utsidan av Kinkaku-ji före 9 och kom till Byodoin precis vid öppning." },
  ],
  "兵庫県": [{ q: "Bästa fotoplatserna för Himeji slott?", a: "Otemons framsida, Sannomaru-torget (med körsbärsträd), Nishi-no-maru-trädgården (sidovy) och Otoko-yama-parken (förhöjd) är de fyra klassikerna." }],
  "奈良県": [{ q: "Tips för att fotografera hjortar i Nara?", a: "Att hålla shika senbei lockar dem, men de går när det är slut. Morgonens motljus som lyfter fram pälsen är klassisk komposition." }],
  "徳島県": [{ q: "När är Narutos virvlar som störst?", a: "Vid springflod (nära ny eller fullmåne) under vår/höst, runt hög-/lågvatten (±1-2 timmar). Kontrollera tidvattentabeller; fotografera från båtar eller Onaruto-brons gångväg." }],
  "香川県": [{ q: "Vilka villkor skapar Chichibugahamas spegelreflektion?", a: "①Lågvatten som sammanfaller med solnedgång ②Nästan ingen vind ③Moln på himlen (klar himmel ser platt ut). Mitoyo-turismen publicerar optimala datum online." }],
  "愛媛県": [{ q: "Får jag fotografera Dogo Onsen Honkan-byggnaden?", a: "Yttre helt öppet; bakre vinklar och kvällsbelysning rekommenderas. Vissa innerområden förbjudna av integritetsskäl." }],
  "高知県": [{ q: "Tips för att fånga Niko-buchis blå?", a: "Runt mitt på dagen klara dagar, när direkt solljus når vattnet, är det blå starkast. Ett polariseringsfilter fördjupar färgen genom att skära ytreflektioner." }],
  "福岡県": [{ q: "Måste-se fotoplatser i Fukuoka?", a: "Tillfartsvägen och huvudhallen vid Dazaifu Tenmangu, plus nattkorridoren Fukuoka Tower–Momochi-stranden–Bayside Place." }],
  "大分県": [{ q: "Var fångar man Beppus ångskyline?", a: "Yukemuri-utsiktsplatsen i Kannawa Onsen. Vintermornar producerar de tätaste ångpelarna på grund av temperaturkontrast." }],
  "沖縄県": [
    { q: "Bästa säsongen för Miyakojima?", a: "Maj-september för vattenklarhet (särskilt juli-augusti). September är tyfonsäsong. December-februari är svalt och mindre folk men marina aktiviteter är begränsade." },
    { q: "Bästa tid på dagen för klart hav-bilder?", a: "10-14 när solen är hög och ljuset når havsbotten skapas det starkaste smaragdgröna. Polariseringsfilter är väsentligt." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Hur når man Shiretoko?", a: "Flyg till Memanbetsu; Utoro Onsen (2 tim med buss) är porten. Drivisturer på vintern, kryssningar och vandring vid Fem sjöar på sommaren." }],
  "札幌": [{ q: "Bästa tiden att besöka centrala Sapporo?", a: "Februari (Snöfestival), juni (Liljakonvalj-festival), oktober (lövverk), december (White Illumination). Staden byter ansikte året runt." }],
  "さっぽろ雪まつり": [{ q: "Bästa tiden på dagen för att fotografera festivalen?", a: "Belysning från solnedgång till 21 är mest fotogen — använd stativ och låg ISO för att behålla snöstrukturen. Dagtid fungerar med blå himmel som bakgrund." }],
  "小樽": [{ q: "Bästa fotoplats längs kanalen?", a: "Mellan Asakusabron och Chuobron — magasin, kanal och gaslampor i en bildruta. Den blå timmen efter solnedgång är idealisk." }],
  "洞爺湖": [{ q: "Tips för fyrverkerifoto?", a: "Stativ obligatoriskt. ISO 100, f/8, B 4-8 sek. Sjöplattformen fångar fyrverkerier med deras spegling." }],
  "富良野": [{ q: "Bästa tiden för lavendelfält?", a: "Tidig morgon före 7 för mjukt ljus och minimal trängsel. Framljus får violett att lysa. Kontrollera blomstatus i förväg." }],
  "宮古島": [{ q: "Bästa säsongen för Miyakojima?", a: "Maj-september för vattenklarhet (särskilt juli-augusti). September är tyfonsäsong. December-februari är svalt och mindre folk." }],
  "沖縄": [{ q: "Måste-se fotoplatser på Okinawa-huvudön?", a: "Shurijos slottsruiner, Kap Zanpa, Manzamo, Kouri-bron, Churaumi-akvariet, Yachimun-keramikbyn och Kokusai-dori." }],
  "横浜": [{ q: "Bästa platsen för Minato Mirai?", a: "Osanbashi för fullständig skyline vid solnedgång; Sakuragicho för pariserhjul; Yamashita-koen för Röda Tegelmagasinet. Blå timme optimal." }],
  "鎌倉": [{ q: "När är krysantemerna vid Hasedera?", a: "Ungefär 1-23 november, med kvällsbelysning. Kom tidigt för att undvika köer." }],
  "伊勢神宮": [{ q: "Fotoetikett vid Ise Jingu?", a: "Innerområden strikt förbjudna. Diskretion innanför torii; fotografera inte troende eller präster." }],
  "夫婦岩": [{ q: "När går solen upp mellan klipporna?", a: "Nära solståndet (maj-juli). Början av juni har bästa procenten klar himmel. Kom före gryningen." }],
  "おはらい町・おかげ横丁": [{ q: "Bästa tiden att fotografera gatan?", a: "Morgon 8-10, före besökarvågen. Sidoljus på trähus är vackert." }],
  "朝熊山展望台": [{ q: "Hur tar man sig till utsiktsplatsen?", a: "Kör via Ise-Shima Skyline (avgift). Lätt åtkomst; Mt. Fuji-utsikt möjlig på klara dagar (sällsynta)." }],
  "横山展望台": [{ q: "Bästa tiden för Yokoyama?", a: "Klar morgon för ödetaljer i Ago-bukten. Solnedgång fungerar också; de högsta plattformarna är bäst." }],
  "清水寺": [{ q: "När är höstbelysningen?", a: "Mitten av november till början av december, 17:30-21. Blå timme efter öppning är mest magisk. Stativ ej tillåtna." }],
  "金閣寺": [{ q: "Bästa tiden för Gyllene paviljongen?", a: "Klara vintermornar med snö är ikoniska; höst och dammspegling också klassiska. Kom vid öppning (9)." }],
  "平等院鳳凰堂": [{ q: "Tips för spegling i Aji-dammen?", a: "Vindstilla mornar ger spegelyta. Kom vid öppning (8:30); använd polarisator svagt för att bevara speglingen." }],
  "東福寺": [{ q: "Bästa tiden för Tsutenkyo-bron?", a: "Mitten av november till början av december. Öppning 8:30; följ enkelriktat flöde från norr. Stanna inte på bron." }],
  "東寺": [{ q: "Tips för femvånings-pagoden?", a: "Hyotan-ike-dammen vid solnedgång för spegling. Kvällsbelysning under körsbärs- och höstsäsonger." }],
  "八坂の塔": [{ q: "Bästa platsen för Yasaka-pagoden?", a: "Att titta upp Yasaka-dori-backen från botten är den klassiska vinkeln. 6-7 nästan inga turister — idealiskt också för kimono-porträtt." }],
  "姫路城": [{ q: "Bästa tiden för slottet med körsbärsträd?", a: "Vanligtvis början av april. Sannomaru-torget, Nishi-no-maru-trädgården och Shirotopia-minnesparken är klassiska." }],
  "法隆寺": [{ q: "Fotoregler?", a: "Området OK; Buddha-statyer i hallarna mest förbjudna. Inga stativ eller blixtar ens utomhus. Tidig morgon och sen eftermiddag lugnare och mjukare." }],
  "法隆寺 夢殿": [{ q: "När visas Guze Kannon?", a: "Vår: 11 april-18 maj; höst: 22 oktober-22 november. Fotografi av statyn förbjuden." }],
  "鳴門海峡": [{ q: "Båt eller gångväg?", a: "Båt för intensitet, gångväg för säkerhet uppifrån. Uzu-no-Michis glasgolv visar virvlar nedanför. På båten räkna med skvätt." }],
  "大鳴門橋": [{ q: "Bästa platsen för bron?", a: "Michi-no-Eki Uzushio på Awaji-sidan för bästa översikten. Bron och sundet glödande vid solnedgång är vackra." }],
  "父母ヶ浜": [{ q: "Hur bokar man optimal dag?", a: "Ingen bokning, men Mitoyo-turismen publicerar en «Sky Mirror Calendar» med optimala dagar. Planera för dagar då lågvatten och solnedgång sammanfaller." }],
  "亀老山展望台": [{ q: "Hur tar man sig dit?", a: "Shimanami Kaido-buss från Imabari eller Fukuyama, eller cykel. Parkering nära toppen." }],
  "来島海峡大橋": [{ q: "Bästa platsen för bron?", a: "Mt. Kiro-utsiktsplatsen (Oshima, Imabari) ger den definitiva översikten. Fånga den orange-belysta bron vid solnedgång och blå timme efteråt." }],
  "松山城": [{ q: "Linbana eller stollift?", a: "Om vädret tillåter ger den öppna stolen bättre panoramisk fördjupning (5 min). Kombinationsbiljett täcker båda." }],
  "道後温泉": [{ q: "Får jag fotografera Honkan?", a: "Yttre helt öppet; bakre vinklar och kvällsbelysning rekommenderas. Vissa innerområden förbjudna av integritetsskäl." }],
  "桂浜": [{ q: "Bästa vinkeln för Ryoma-statyn?", a: "Från låg vinkel på havssidan, upp för trapporna bakom sockeln — parar Ryoma med Stilla havet som bakgrund. Solnedgång ger slående siluett." }],
  "高知城": [{ q: "Hur lång tid tar uppstigningen?", a: "Cirka 15 min trappor från ingången till tornet. Otemon-porten är klassisk ram för körsbärsträd. Missa inte stadsutsikten från tornet." }],
  "名越屋沈下橋": [{ q: "Bästa säsongen?", a: "Färska gröna toner i maj, sommarbad (juli-aug), höstlöv (okt-nov). Vintermornar med dimma också drömlika." }],
  "にこ淵": [{ q: "När är blått starkast?", a: "Klar middag (10-14), särskilt sommar-tidig höst. Efter regn minskar grumligheten effekten — torrt väder idealiskt. Ta med PL-filter." }],
  "福岡": [{ q: "Fotoetikett vid yatai?", a: "Fråga personalen/kunderna först. Närbilder efter förfrågan. Yttre och gator fria." }],
  "別府": [{ q: "Hur lång tid tar Helvetesturen?", a: "Alla 7 Helveten tar 2-3 timmar. Kombinationsbiljett sparar pengar. Havshelvete, Blodbassängshelvete och Tatsumaki är top-3." }],
  "湯布院": [{ q: "Förhållanden för morgondimma vid Kinrin-sjön?", a: "Klara mornar november-mars under 5°C — temperaturskillnaden mellan onsen-vatten och luft producerar dimma. Tätast från före gryningen till en timme efter." }],
  "白川郷": [{ q: "Fotografera från utsiktsplatsen?", a: "Ogimachi slottsruin-utsiktsplats överblickar hela byn — klassikern. Höst-vinterdimma, januari-februari snö, maj-grönska: var och en mästerverk." }],
  "美幌峠": [{ q: "När uppträder molnhavet?", a: "Mornar september-november på klara, vindstilla dagar med stora temperaturskillnader. Topp omkring 30 min runt soluppgång." }],
  "摩周湖": [{ q: "Vad är chansen att se sjön?", a: "Årlig sikt-procent ~30%. Sommar särskilt dimmig; vinter och vår erbjuder bättre klarhet. Besök flera utsiktsplatser för att öka chanserna." }],
  "阿寒": [{ q: "Kan jag se marimo?", a: "På Marimo-utställningens observationscenter på Churui-ön — tillgängligt med turistbåt." }],
  "三段滝公園": [{ q: "När ses frusna vattenfall?", a: "Endast mitten av januari till slutet av februari under den djupa kylan. Helt frusna blir de en blåvit isskulptur." }],
  "室蘭": [{ q: "Bästa platsen för fabriksvy på natten?", a: "Iwaizumi-utsiktsplats, Mt. Sokuryo och Hakucho-bron är de tre klassikerna. Fånga bron med fabriksljus i den blå timmen." }],
  "美唄": [{ q: "Vad är speciellt med Arte Piazza?", a: "Ett kostnadsfritt utomhusskulpturmuseum i en omfunktionerad skola. Vita marmorverk, träskolbyggnaden och snö tillsammans ser pittoreska ut." }],
  "登別": [{ q: "Bästa tiden för Jigokudani?", a: "Morgon för mjukt ljus och synlig ånga. Kvällsbelysningen (maj-oktober) är atmosfärisk." }],
  "北竜町": [{ q: "När är toppblom?", a: "Vanligtvis första veckan till ~10 augusti. Klassisk bild: panorama över hela fältet från utsiktsplatsen. Morgonens framljus är mest levande." }],
  "東京": [{ q: "Tips för nattfotografi?", a: "Stativ, låg ISO och lång exponering. Blå timme (30 min efter solnedgång) balanserar himmel och stadsljus bäst." }],
  "品川": [{ q: "Platser nära Shinagawa station?", a: "Shinkansen-vy från gångbron Takanawa-sidan, skyskrapor Konan-sidan, glaskorridor i Shinagawa Intercity och kanalnattvy på Tennozu Isle." }],
  "東山動物園": [{ q: "Tips för djurfotografering?", a: "En snabb fast (50mm f/1.8) suddar bakgrunden. Tryck linsen mot nätet för att få det att försvinna. Fokusera på ögonen." }],
  "梅林公園": [{ q: "När är toppblom?", a: "Mitten av februari till början av mars. Med tidigt och sent blommande sorter erbjuder slutet av februari största variationen." }],
  "鳥羽水族館": [{ q: "När är dugongen mest aktiv?", a: "Runt utfodringstider (cirka 11 och 15). Den simmar ibland ända till glaset — ett värdefullt ögonblick." }],
  "清水寺周辺": [{ q: "Bästa platsen för Yasaka-pagoden?", a: "Att titta upp Yasaka-dori-backen från botten är den klassiska vinkeln. 6-7 nästan inga turister — idealiskt också för kimono-porträtt." }],
  "鴨川シーワールド": [{ q: "Tips för orkafotografi?", a: "Slutartid 1/1000+ för att frysa stänk; burst-läge väsentligt. Främre raderna blir blöta — välj platser noga." }],
  "旭山動物園": [{ q: "Schema för pingvinpromenaden?", a: "Två gånger om dagen från mitten av december till mars — endast vintern, när det är snö. Kungspingvinparaden är en vinterklassiker." }],
  "金沢": [{ q: "Fotoplatser i Kanazawa på en dag?", a: "Kenrokuen vid soluppgång (mjukt ljus), Kanazawa slott, Higashi Chaya (eftermiddag/kväll), Omichomarknaden, Trumporten vid Kanazawa station på natten." }],
  "新倉山浅間公園": [{ q: "Hur når man utsiktsdäcket?", a: "Shimo-Yoshida station (Fujikyu-linjen), 10 min till fots till helgedomen, sedan 398 trappsteg (mjukare ramp också tillgänglig). Kom 5-6 för att undvika folk och fånga soluppgången på Fuji." }],
  "河口湖": [{ q: "Bästa platsen för den omvända Fuji-reflektionen?", a: "Oishi Park och Ubuyagasaki på norra stranden är klassiska. Sikta på vindstilla mornar 6-8 när sjön speglar. Vintern erbjuder klarast luft och bästa transparens." }],
  "松本城": [{ q: "Hur ramar man in tornet med körsbärsträd och Alperna?", a: "Runt Uzumi-bron på den nordvästra sidan av den inre vallgraven är bäst. Tele för att komprimera tornet och Alpernas åsar, med körsbärsblommor från mitten av april som förgrundsbokeh. Morgon ger mjukt motljus." }],
  "高遠城址公園": [{ q: "Bästa tiden på dagen för att fotografera Takato-körsbär?", a: "Före 6 erbjuder folkfritt blått ljus. Eftermiddagen övergår genom blå timme till belysning, där varmt lyktljus möter rosa blommor." }],
  "駒つなぎの桜": [{ q: "Vad behövs för risfältsspegling?", a: "Mitten-slutet av april när risfälten är översvämmade för plantering, i en vindstilla gryning. Ta med stativ och vidvinkel-till-standard-objektiv; för stjärnor+körsbärsblommor rekommenderas en hög-ISO-tolerant kamerahus." }],
  "長野県天空の楽園": [{ q: "Bästa tiden på året för stjärnskådning?", a: "Nära nymåne. Vintern (nov-feb) ger skarpaste stjärnor (Vintergatan svagare). Sommaren är bäst för Vintergatans kärna. Nattturen kräver förbokning." }],
  "弘法山古墳": [{ q: "Hur tar man sig dit och var fotograferar man?", a: "Från Matsumoto station, ~20 min buss + ~20 min till fots till leden, sedan 15-20 min uppåt till toppen. Gryningen ger mjukt motljus på Norra Alperna och undviker folkmassorna." }],
  "安養寺": [{ q: "När är toppblom?", a: "Mitten av april. Morgon erbjuder framåtbelyst, levande blomfärger. Kväll ger slående siluetter av hallen och trädet. Tyst område — fotografera respektfullt." }],
  "松本市新村": [{ q: "Vad finns nära Niimura station?", a: "Den gamla träbyggda Mitsumizo-stationen, risfält med Alperna, körsbärsklädda gränder, morgondimma över risfält — en gömd pärla som kombinerar järnväg och landskap." }],
  "城山公園(松本市)": [{ q: "Bästa inramningen från utsiktstorget?", a: "Vertikal inramning med körsbärsträd i förgrunden och Alpåsen bakom är klassisk. Morgonens «alpenglow» (snöiga toppar som blir röda vid soluppgång) med sakura är den absoluta toppen." }],
  "中町通り(松本市)": [{ q: "Bästa tiden på dagen för att fotografera?", a: "6-8 erbjuder tomma gator och rena kompositioner av kura-väggarna. Kvällen, när gatlamporna tänds och vita väggar värms till bärnsten, ger mest nostalgisk stämning." }],
  "高島公園(諏訪市)": [{ q: "Bästa platsen för vallgravsspegling?", a: "Från södra sidan av vallgraven, använd tele för att komprimera tornet och körsbärsblommor. Vindstilla mornar eller kvällar ger spegelvatten. Under belysning är blå timme mest magisk." }],
  "諏訪湖": [{ q: "Bästa fotoplatserna runt Suwasjön?", a: "Tateishi-parken (vy ovanifrån), strandpromenaden (sjö + stad), Geyser Center-området (solnedgång) och östra stranden där Yatsugatake speglar sig. Omiwatari-isåsar bildas på morgonen i januari-februari." }],
  "立石公園": [{ q: "Tips för nattvy och stjärnhimmel?", a: "Stativ väsentligt. Nattvy: ISO 200, f/8, 10-30 sek. Stjärnor: ISO 3200, f/2.8, ~15 sek. De 20-30 min efter solnedgång (magisk timme) ger den vackraste gradienten mellan stadsljus och skymning." }],
};

let content = readFileSync(SV_PATH, "utf-8");
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
writeFileSync(SV_PATH, content, "utf-8");
console.log(`✓ sv.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs (15/15 — FINAL)`);
