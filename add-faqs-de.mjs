#!/usr/bin/env node
/** German FAQs を extras/de.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DE_PATH = resolve(__dirname, "app", "content", "extras", "de.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Welche Saison eignet sich am besten für Hokkaido-Fotografie?", a: "Februar für das Sapporo-Schneefestival und Treibeis, Juli für Lavendel in Furano, Oktober für Herbstlaub und Januar-März für Treibeis in Shiretoko. Passe dein Motiv mit der jeweiligen Hochsaison." },
    { q: "Welches sind die wichtigsten Fotospots in Hokkaido?", a: "Stadtbild von Sapporo, Otaru-Kanal, Blumenfelder von Furano, Mashu-See, Toya-See, Shiretoko-Halbinsel, Höllental von Noboribetsu, Asahiyama-Zoo und die sanften Hügel von Biei – jede Region bietet einen eigenen visuellen Charakter." },
  ],
  "千葉県": [{ q: "Welche Fotografie bietet Chiba?", a: "Küsten, ländliche Boso-Landschaften und Wildtiere/Aquarien – eine vielfältige Mischung nahe der Metropole." }],
  "東京都": [{ q: "Tipps für Tokio-Nachtfotografie?", a: "Stativ, niedriger ISO und Langzeitbelichtung. Die blaue Stunde (30 min nach Sonnenuntergang) balanciert Himmel und Stadtlichter am besten." }],
  "神奈川県": [{ q: "Beste Art, Kamakura und Yokohama zu besuchen?", a: "Morgens in den Tempeln von Kamakura (Großer Buddha, Hasedera), nachmittags nach Yokohama für Sonnenuntergang in Minato Mirai und Nachtbilder am Red Brick Warehouse." }],
  "石川県": [{ q: "Welche Spots in Kanazawa an einem Tag?", a: "Früh morgens Kenrokuen (weiches Licht), dann Burg Kanazawa, Higashi Chaya (nachmittags/abends), Omicho-Markt, abschließend nachts das Tsuzumi-Tor am Bahnhof Kanazawa." }],
  "山梨県": [{ q: "Bester Ort für Mt. Fuji mit Kirschblüten?", a: "Die Aussichtsdeck der Chureito-Pagode im Arakurayama-Sengen-Park ist weltberühmt. Nach 398 Stufen reihen sich Pagode, Kirschblüten und Mt. Fuji in einem einzigen Bild. Vollblüte Anfang bis Mitte April, Sonnenaufgang gibt das magischste Licht." }],
  "長野県": [{ q: "Wann blühen die Kirschen im Takato-Burgpark?", a: "Anfang bis Mitte April. Etwa 1.500 «Takato Kohigan»-Kirschbäume blühen in zartem Rosa und tragen den Titel «beste Kirschblüten unter dem Himmel». Die Abendbeleuchtung ist traumhaft, früher Morgen vermeidet Menschenmengen am besten." }],
  "岐阜県": [{ q: "Wann ist die winterliche Beleuchtung von Shirakawa-go?", a: "An begrenzten Tagen (typisch ~6) im Januar und Februar. Reservierung erforderlich; planen Sie früh, um Gassho-Häuser im Schnee vom Aussichtspunkt zu fotografieren." }],
  "愛知県": [{ q: "Tipps fürs gute Fotografieren in Zoos?", a: "Eine schnelle Festbrennweite (z. B. 50 mm f/1.8) verschwimmt den Hintergrund; drücke das Objektiv gegen den Maschendraht, um ihn unsichtbar zu machen. Fokussiere auf die Augen des Tieres." }],
  "三重県": [
    { q: "Foto-Etikette in Ise Jingu?", a: "Innerhalb der Hauptheiligtümer ist Fotografie strikt verboten. Bleibe innerhalb der Torii diskret und vermeide direkte Aufnahmen von Gläubigen oder Priestern." },
    { q: "Wann geht die Sonne zwischen Meoto Iwa auf?", a: "Nur in der Nähe der Sommersonnenwende (Mai–Juli) geht die Sonne direkt zwischen den beiden Felsen auf. Anfang Juni hat die beste Klarwetter-Quote; vor Sonnenaufgang ankommen." },
  ],
  "京都府": [
    { q: "Beste Zeit für Kyotos Herbstlaub?", a: "Höhepunkt meist Ende November bis Anfang Dezember. Tofuku-ji (Tsuten-kyo-Brücke), Eikando, Kiyomizu-dera und Arashiyama wirken am besten im morgendlichen Frontlicht." },
    { q: "Wie vermeidet man Menschenmengen?", a: "Früh morgens (6–8 Uhr) ist mit Abstand am besten. Kiyomizu-dera öffnet 6 Uhr, gehe Kinkaku-jis Außenseite vor 9 Uhr, und sei in Byodoin pünktlich zur Öffnung." },
  ],
  "兵庫県": [{ q: "Beste Spots für Burg Himeji?", a: "Otemon-Front, Sannomaru-Plaza (mit Kirschblüten), Nishi-no-maru-Garten (Seitenansicht) und Otoko-yama-Park (erhöht) sind die vier Klassiker." }],
  "奈良県": [{ q: "Tipps zum Fotografieren von Hirschen in Nara?", a: "Shika senbei zu halten lockt sie an, aber sie gehen, wenn sie weg sind. Morgendliches Gegenlicht, das ihr Fell hervorhebt, ist klassische Komposition." }],
  "徳島県": [{ q: "Wann sind Narutos Strudel am größten?", a: "Bei Springfluten (nahe Neu- oder Vollmond) im Frühling/Herbst, um Hoch-/Niedrigwasser (±1-2 h). Tide-Tabellen prüfen; vom Boot oder Onaruto-Brückensteg aufnehmen." }],
  "香川県": [{ q: "Welche Bedingungen schaffen Chichibugahamas Spiegelreflexion?", a: "①Ebbe trifft Sonnenuntergang ②Nahezu null Wind ③Wolken am Himmel (klarer Himmel wirkt flach). Tourismus von Mitoyo veröffentlicht optimale Termine online." }],
  "愛媛県": [{ q: "Darf ich das Dogo Onsen Honkan fotografieren?", a: "Außenbereich vollständig offen; Hinteransichten und nächtliche Beleuchtung empfohlen. Einige Innenbereiche sind aus Privatsphäre-Gründen tabu." }],
  "高知県": [{ q: "Tipps für Niko-buchis Blau?", a: "Mittagsklare Tage (10-14 Uhr), wenn direktes Sonnenlicht das Wasser erreicht – das Blau ist am intensivsten. Ein Polfilter vertieft die Farbe durch Reduktion von Reflexen." }],
  "福岡県": [{ q: "Unverzichtbare Foto-Spots in Fukuoka?", a: "Der Zugangsweg und die Haupthalle des Dazaifu Tenmangu sowie der Nachtblick-Korridor Fukuoka Tower–Momochi-Strand–Bayside Place." }],
  "大分県": [{ q: "Wo erfassen sich Beppus Dampf-Skyline?", a: "Yukemuri-Aussichtspunkt in Kannawa Onsen. Wintermorgen produzieren die dichtesten Dampfsäulen wegen Temperaturkontrast." }],
  "沖縄県": [
    { q: "Beste Saison für Miyakojima?", a: "Mai–September für Wasserklarheit (besonders Juli–August). September ist Taifunsaison. Dezember–Februar ist kühl und weniger besucht, aber maritime Aktivitäten sind eingeschränkt." },
    { q: "Beste Tageszeit für klares Meer?", a: "10-14 Uhr, wenn die Sonne hoch steht und das Licht den Meeresboden erreicht – das stärkste Smaragdgrün. Polfilter ist essenziell." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Wie kommt man nach Shiretoko?", a: "Flug nach Memanbetsu; Utoro Onsen (2 h Bus) ist Tor. Treibeis-Touren im Winter, Schiffstouren und Five-Lakes-Wanderung im Sommer." }],
  "札幌": [{ q: "Beste Zeit, um Sapporo-Innenstadt zu besuchen?", a: "Februar (Schneefestival), Juni (Lila-Festival), Oktober (Herbstlaub), Dezember (White Illumination). Die Stadt wechselt das ganze Jahr ihr Gesicht." }],
  "さっぽろ雪まつり": [{ q: "Beste Tageszeit fürs Festival?", a: "Beleuchtung von Sonnenuntergang bis 21 Uhr ist am fotogensten – Stativ und niedriger ISO bewahren Schneestruktur. Tagsüber funktioniert mit blauem Himmel als Hintergrund." }],
  "小樽": [{ q: "Bester Foto-Spot am Kanal?", a: "Zwischen Asakusa-Brücke und Chuo-Brücke – Lager, Kanal und Gaslampen in einem Bild. Die blaue Stunde nach Sonnenuntergang ist ideal." }],
  "洞爺湖": [{ q: "Tipps zum Feuerwerk-Fotografieren?", a: "Stativ Pflicht. ISO 100, f/8, Bulb 4-8 s. Die Aussichtsplattform am See fängt Feuerwerk mit Spiegelung ein." }],
  "富良野": [{ q: "Beste Zeit für Lavendelfelder?", a: "Früh morgens vor 7 Uhr für weiches Licht und minimale Menschenmengen. Frontlicht lässt das Violett leuchten. Blühstatus vorher prüfen." }],
  "宮古島": [{ q: "Beste Saison für Miyakojima?", a: "Mai–September für Wasserklarheit (besonders Juli–August). September ist Taifunsaison. Dezember–Februar ist kühl und weniger besucht." }],
  "沖縄": [{ q: "Unverzichtbare Foto-Spots auf Okinawa-Hauptinsel?", a: "Shurijo-Burgruinen, Kap Zanpa, Manzamo, Kouri-Brücke, Churaumi-Aquarium, Yachimun-Töpferdorf und Kokusai-dori." }],
  "横浜": [{ q: "Bester Spot für Minato Mirai?", a: "Osanbashi für komplette Skyline beim Sonnenuntergang; Sakuragicho fürs Riesenrad; Yamashita-koen fürs Red Brick Warehouse. Blaue Stunde optimal." }],
  "鎌倉": [{ q: "Wann sind die Chrysanthemen am Hasedera?", a: "Etwa 1.-23. November, mit Abendbeleuchtung. Früh ankommen, um Schlangen zu vermeiden." }],
  "伊勢神宮": [{ q: "Foto-Etikette in Ise Jingu?", a: "Innenbereiche strikt tabu. Diskret innerhalb der Torii; keine Aufnahmen von Gläubigen oder Priestern." }],
  "夫婦岩": [{ q: "Wann geht die Sonne zwischen den Felsen auf?", a: "Nahe Sommersonnenwende (Mai–Juli). Anfang Juni hat die beste Klarwetter-Quote. Vor Sonnenaufgang ankommen." }],
  "おはらい町・おかげ横丁": [{ q: "Beste Zeit, um die Straße zu fotografieren?", a: "Morgen 8-10 Uhr, vor dem Besucheransturm. Das Seitenlicht auf Holzhäusern ist wunderschön." }],
  "朝熊山展望台": [{ q: "Wie zum Aussichtspunkt fahren?", a: "Über Ise-Shima Skyline (mautpflichtig). Leichter Zugang; Mt. Fuji-Sichtung an klaren Tagen möglich (selten)." }],
  "横山展望台": [{ q: "Beste Zeit für Yokoyama?", a: "Klarer Morgen für Inseldetails in der Ago-Bucht. Sonnenuntergang funktioniert auch; höhere Plattformen sind die besten." }],
  "清水寺": [{ q: "Wann ist die Herbstillumination?", a: "Mitte November bis Anfang Dezember, 17:30-21 Uhr. Blaue Stunde nach Öffnung am magischsten. Kein Stativ erlaubt." }],
  "金閣寺": [{ q: "Beste Zeit für den Goldenen Pavillon?", a: "Klare Wintermorgen mit Schnee sind ikonisch; Herbst und Spiegelung im Teich auch klassisch. Pünktlich zur Öffnung (9 Uhr) ankommen." }],
  "平等院鳳凰堂": [{ q: "Tipps für Spiegelung im Aji-Teich?", a: "Windstille Morgen geben Spiegeloberfläche. Pünktlich zur Öffnung (8:30) ankommen; Polfilter schwach für Spiegelung verwenden." }],
  "東福寺": [{ q: "Beste Zeit für Tsutenkyo-Brücke?", a: "Mitte November bis Anfang Dezember. Öffnung 8:30; folge dem Einbahnstrom von Norden. Nicht auf der Brücke stehen bleiben." }],
  "東寺": [{ q: "Tipps für die fünfstöckige Pagode?", a: "Hyotan-ike-Teich beim Sonnenuntergang für Spiegelung. Nachtbeleuchtung in Kirschblüten- und Herbstsaison." }],
  "八坂の塔": [{ q: "Bester Spot für Yasaka-Pagode?", a: "Von unten den Yasaka-dori-Hang hinaufschauen ist klassisch. 6-7 Uhr fast keine Touristen – ideal auch für Kimono-Porträts." }],
  "姫路城": [{ q: "Beste Zeit für die Burg mit Kirschen?", a: "Typisch Anfang April. Sannomaru-Plaza, Nishi-no-maru-Garten und Shirotopia-Gedenkpark sind klassisch." }],
  "法隆寺": [{ q: "Foto-Regeln?", a: "Gelände OK; Buddha-Statuen in Hallen meist verboten. Keine Stative oder Blitze auch im Freien. Früher Morgen und später Nachmittag sind ruhiger und weicher." }],
  "法隆寺 夢殿": [{ q: "Wann wird Guze Kannon gezeigt?", a: "Frühjahr: 11. April – 18. Mai; Herbst: 22. Oktober – 22. November. Fotografie der Statue verboten." }],
  "鳴門海峡": [{ q: "Boot oder Steg?", a: "Boot für Intensität, Steg für Sicherheit von oben. Uzu-no-Michis Glasboden zeigt Strudel direkt unten. Bootsfahrer rechnen mit Gischt." }],
  "大鳴門橋": [{ q: "Bester Spot für die Brücke?", a: "Michi-no-Eki Uzushio auf Awaji-Seite für beste Übersicht. Brücke und Meerenge im Sonnenuntergang sind wunderschön." }],
  "父母ヶ浜": [{ q: "Wie für den optimalen Tag buchen?", a: "Keine Reservierung, aber Tourismus von Mitoyo veröffentlicht «Sky Mirror Calendar» mit optimalen Tagen. Tage mit Ebbe-Sonnenuntergang-Übereinstimmung planen." }],
  "亀老山展望台": [{ q: "Wie hinkommen?", a: "Shimanami-Kaido-Bus von Imabari oder Fukuyama, oder per Rad. Parkplatz in Gipfelnähe." }],
  "来島海峡大橋": [{ q: "Bester Spot für die Brücke?", a: "Mt.-Kiro-Aussichtspunkt (Oshima, Imabari) bietet die definitive Übersicht. Erfasse die orange beleuchtete Brücke beim Sonnenuntergang und die blaue Stunde danach." }],
  "松山城": [{ q: "Seilbahn oder Sessellift?", a: "Wenn Wetter erlaubt, bietet der offene Sessellift bessere Panorama-Immersion (5 min). Kombi-Ticket für beide." }],
  "道後温泉": [{ q: "Darf ich Honkan fotografieren?", a: "Außenbereich offen; Hinteransichten und Nachtbeleuchtung empfohlen. Einige Innenbereiche tabu wegen Privatsphäre." }],
  "桂浜": [{ q: "Bester Winkel für Ryoma-Statue?", a: "Aus tiefem Winkel an der Meeresseite, über die Treppe hinter dem Sockel – verbindet Ryoma mit Pazifik im Hintergrund. Sonnenuntergang gibt eindrucksvolle Silhouette." }],
  "高知城": [{ q: "Wie lange zum Aufstieg?", a: "Etwa 15 min Treppen vom Eingang zum Bergfried. Das Otemon-Tor ist klassischer Kirschblüten-Rahmen. Stadt-Aussicht vom Bergfried nicht verpassen." }],
  "名越屋沈下橋": [{ q: "Beste Saison?", a: "Frisches Grün im Mai, Sommerbaden (Juli-August), Herbstlaub (Okt-Nov). Wintermorgen mit Nebel auch traumhaft." }],
  "にこ淵": [{ q: "Wann ist das Blau am stärksten?", a: "Klarer Mittag (10-14 Uhr), besonders Sommer bis Frühherbst. Nach Regen reduziert Trübung den Effekt – trockenes Wetter ideal. PL-Filter mitnehmen." }],
  "福岡": [{ q: "Foto-Etikette an Yatai?", a: "Personal/Kunden zuerst fragen. Nahaufnahmen nach Erlaubnis. Außenseiten und Straßen frei." }],
  "別府": [{ q: "Wie lange dauert die Höllen-Tour?", a: "Alle 7 Höllen 2-3 Stunden. Kombi-Ticket spart. Meereshölle, Blutteichhölle und Tatsumaki sind die Top-3." }],
  "湯布院": [{ q: "Bedingungen für Morgennebel am Kinrin-See?", a: "Klare Morgen November-März unter 5°C – Temperaturunterschied zwischen Thermalwasser und Luft erzeugt Nebel. Am dichtesten von vor Sonnenaufgang bis eine Stunde danach." }],
  "白川郷": [{ q: "Vom Aussichtspunkt fotografieren?", a: "Ogimachi-Burgruinen-Aussichtspunkt überblickt das ganze Dorf – der Klassiker. Herbst-Winter-Nebel, Januar-Februar-Schnee, Mai-Grün: jedes Meisterwerke." }],
  "美幌峠": [{ q: "Wann tritt das Wolkenmeer auf?", a: "Morgen September-November bei klaren, windstillen Tagen mit großen Temperaturunterschieden. Höhepunkt etwa 30 min um Sonnenaufgang." }],
  "摩周湖": [{ q: "Wie hoch ist die Chance, den See zu sehen?", a: "Jährliche Klarsicht-Quote ~30%. Sommer besonders neblig; Winter und Frühling bessere Klarheit. Mehrere Aussichtspunkte besuchen erhöht Chancen." }],
  "阿寒": [{ q: "Kann ich Marimo sehen?", a: "Im Marimo-Beobachtungszentrum auf der Insel Churui – per Touristenboot erreichbar." }],
  "三段滝公園": [{ q: "Wann sind die Eisfälle zu sehen?", a: "Nur Mitte Januar bis Ende Februar während großer Kälte. Vollständig gefroren wird er zur blauweißen Eisskulptur." }],
  "室蘭": [{ q: "Bester Fabriknacht-Spot?", a: "Iwaizumi-Aussichtspunkt, Mt. Sokuryo und Hakucho-Brücke sind die drei Klassiker. Erfasse die Brücke mit Fabriklichtern in der blauen Stunde." }],
  "美唄": [{ q: "Was ist Besonderes an Arte Piazza?", a: "Ein kostenloses Freiluft-Skulpturmuseum in einer umgenutzten Schule. Weiße Marmorwerke, Holzschulhaus und Schnee zusammen wirken malerisch." }],
  "登別": [{ q: "Beste Zeit für Jigokudani?", a: "Morgen für weiches Licht und sichtbaren Dampf. Die Nachtbeleuchtung (Mai-Oktober) ist atmosphärisch." }],
  "北竜町": [{ q: "Wann ist die Vollblüte?", a: "Typisch erste Woche bis ~10. August. Klassisches Bild: Vollfeld-Panorama vom Aussichtspunkt. Morgendliches Frontlicht ist am lebendigsten." }],
  "東京": [{ q: "Tipps für Nachtfotografie?", a: "Stativ, niedriger ISO und Langzeitbelichtung. Blaue Stunde (30 min nach Sonnenuntergang) balanciert Himmel und Stadtlichter am besten." }],
  "品川": [{ q: "Foto-Spots am Bahnhof Shinagawa?", a: "Shinkansen-Blick von der Fußgängerbrücke Takanawa-Seite, Wolkenkratzer Konan-Seite, Glas-Korridor des Shinagawa Intercity und Kanal-Nachtansicht auf Tennozu Isle." }],
  "東山動物園": [{ q: "Tipps zum Tierfotografieren?", a: "Eine schnelle Festbrennweite (50 mm f/1.8) verschwimmt den Hintergrund. Drücke Objektiv gegen Maschendraht, um ihn unsichtbar zu machen. Auf Augen fokussieren." }],
  "梅林公園": [{ q: "Wann ist die Vollblüte?", a: "Mitte Februar bis Anfang März. Mit früh- und spätblühenden Sorten bietet Ende Februar die größte Vielfalt." }],
  "鳥羽水族館": [{ q: "Wann ist der Dugong am aktivsten?", a: "Um die Fütterungszeiten (etwa 11 und 15 Uhr). Manchmal schwimmt er bis ans Glas – ein wertvoller Moment." }],
  "清水寺周辺": [{ q: "Bester Spot für Yasaka-Pagode?", a: "Von unten den Yasaka-dori-Hang hinaufschauen ist klassisch. 6-7 Uhr fast keine Touristen – ideal auch für Kimono-Porträts." }],
  "鴨川シーワールド": [{ q: "Tipps für Orca-Fotografie?", a: "Verschlusszeit 1/1000+ um Spritzer einzufrieren; Burst-Modus essentiell. Erste Reihen werden nass – Sitze sorgfältig wählen." }],
  "旭山動物園": [{ q: "Pinguin-Spaziergang-Plan?", a: "Zweimal täglich von Mitte Dezember bis März – nur Winter, wenn Schnee liegt. Königspinguin-Parade ist Winter-Klassiker." }],
  "金沢": [{ q: "Foto-Spots in Kanazawa an einem Tag?", a: "Kenrokuen bei Sonnenaufgang (weiches Licht), Burg Kanazawa, Higashi Chaya (nachmittags/abends), Omicho-Markt, Tsuzumi-Tor am Bahnhof Kanazawa nachts." }],
  "新倉山浅間公園": [{ q: "Wie zum Aussichtsdeck?", a: "Bahnhof Shimo-Yoshida (Fujikyu-Linie), 10 min zu Fuß zum Schrein, dann 398 Stufen (sanfterer Schrägpfad ebenfalls verfügbar). 5-6 Uhr ankommen, um Menschenmengen zu vermeiden und Sonnenaufgang auf Fuji einzufangen." }],
  "河口湖": [{ q: "Bester Spot für umgekehrten Fuji-Spiegel?", a: "Oishi-Park und Ubuyagasaki am Nordufer sind klassisch. Ziele auf windstille Morgen 6-8 Uhr, wenn der See spiegelt. Winter bietet die klarste Luft und beste Transparenz." }],
  "松本城": [{ q: "Wie Bergfried mit Kirschen und Alpen einrahmen?", a: "Um die Uzumi-Brücke nordwestlich des inneren Grabens am besten. Tele zur Komprimierung von Bergfried und Alpenkämmen, mit mittelaprilischen Kirschblüten als Vordergrund-Bokeh. Morgen weicher Gegenlicht." }],
  "高遠城址公園": [{ q: "Beste Tageszeit für Takato-Kirschen?", a: "Vor 6 Uhr bietet menschenleeres blaues Licht. Nachmittag wechselt durch blaue Stunde in Beleuchtung über, wenn warmes Laternenlicht auf rosa Blüten trifft." }],
  "駒つなぎの桜": [{ q: "Was wird für die Reisfeldspiegelung benötigt?", a: "Mitte bis Ende April, wenn Reisfelder zur Aussaat geflutet sind, an einem windstillen Morgengrauen. Stativ und Weitwinkel-Standard-Objektiv mitbringen; für Sterne+Blüten ist hochISO-fähiger Body empfohlen." }],
  "長野県天空の楽園": [{ q: "Beste Jahreszeit zum Sterne beobachten?", a: "Nahe Neumond. Winter (Nov-Feb) gibt schärfste Sterne (Milchstraße schwächer). Sommer ist am besten für Milchstraßen-Kern. Nachttour benötigt Vorausreservierung." }],
  "弘法山古墳": [{ q: "Wie zugreifen und wo fotografieren?", a: "Vom Bahnhof Matsumoto, ~20 min Bus + ~20 min Fußweg zum Wanderweg, dann 15-20 min bergauf zum Gipfel. Morgendämmerung gibt weiches Gegenlicht auf Nördliche Alpen und meidet Mengen." }],
  "安養寺": [{ q: "Wann ist die Vollblüte?", a: "Mitte April. Morgen bietet frontbeleuchtete, lebendige Blütenfarben. Abend gibt eindrucksvolle Silhouetten von Halle und Baum. Gelände ruhig – respektvoll fotografieren." }],
  "松本市新村": [{ q: "Was ist nahe Niimura-Bahnhof?", a: "Hölzerner ehemaliger Mitsumizo-Bahnhof, Reisfelder mit den Alpen, kirschgesäumte Wege, Morgennebel über Reisfeldern – ein versteckter Schatz, der Eisenbahn- und Landschaftsfotografie verbindet." }],
  "城山公園(松本市)": [{ q: "Beste Einrahmung vom Aussichtsplatz?", a: "Vertikale Einrahmung mit Kirschblüten im Vordergrund und Alpenkamm dahinter ist klassisch. Der morgendliche «Alpenglühen» (Schneegipfel rotwerden im Sonnenaufgang) mit Sakura ist absoluter Höhepunkt." }],
  "中町通り(松本市)": [{ q: "Beste Tageszeit zum Fotografieren?", a: "6-8 Uhr bietet leere Straßen und saubere Kompositionen der Kura-Wände. Abend, wenn Straßenlampen erleuchten und weiße Wände bernsteinwarm werden, gibt nostalgischste Stimmung." }],
  "高島公園(諏訪市)": [{ q: "Bester Spot für Graben-Spiegelung?", a: "Von der Südseite des Grabens, Tele zur Komprimierung von Bergfried und Kirschblüten. Windstille Morgen oder Abende geben Spiegelwasser. Während Beleuchtung ist blaue Stunde am magischsten." }],
  "諏訪湖": [{ q: "Beste Foto-Spots am Suwa-See?", a: "Tateishi-Park (Überblick), Seepromenade (See + Stadt), Geyser-Center-Bereich (Sonnenuntergang) und Ostufer, wo Yatsugatake spiegelt. Omiwatari-Eiskämme entstehen morgens Januar-Februar." }],
  "立石公園": [{ q: "Tipps für Nachtblick und Sternenhimmel?", a: "Stativ essenziell. Nachtblick: ISO 200, f/8, 10-30 s. Sterne: ISO 3200, f/2.8, ~15 s. Die 20-30 min nach Sonnenuntergang (magische Stunde) geben den schönsten Übergang zwischen Stadtlichtern und Dämmerungshimmel." }],
};

let content = readFileSync(DE_PATH, "utf-8");
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
writeFileSync(DE_PATH, content, "utf-8");
console.log(`✓ de.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
