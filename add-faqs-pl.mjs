#!/usr/bin/env node
/** Polish FAQs を extras/pl.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PL_PATH = resolve(__dirname, "app", "content", "extras", "pl.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Jaki sezon jest najlepszy do fotografii Hokkaido?", a: "Luty na Festiwal Śniegu w Sapporo i lód dryfujący, lipiec na lawendę w Furano, październik na jesienne liście, styczeń-marzec na lód dryfujący w Shiretoko. Dopasuj temat do jego szczytowego sezonu." },
    { q: "Jakie są główne miejsca fotograficzne na Hokkaido?", a: "Pejzaże miejskie Sapporo, kanał Otaru, pola kwiatowe Furano, jezioro Mashu, jezioro Toya, półwysep Shiretoko, Piekielna Dolina Noboribetsu, zoo Asahiyama i pofalowane wzgórza Biei — każdy obszar ma odrębny charakter wizualny." },
  ],
  "千葉県": [{ q: "Jaką fotografię oferuje Chiba?", a: "Wybrzeża, wiejskie krajobrazy Boso i fauna/akwaria — różnorodna mieszanka blisko metropolii." }],
  "東京都": [{ q: "Wskazówki dotyczące nocnej fotografii Tokio?", a: "Statyw, niskie ISO i długie naświetlanie. Niebieska godzina (30 min po zachodzie) najlepiej balansuje niebo i światła miasta." }],
  "神奈川県": [{ q: "Najlepszy sposób zwiedzania Kamakury i Jokohamy?", a: "Rano w świątyniach Kamakury (Wielki Budda, Hasedera), potem po południu do Jokohamy na zachód słońca w Minato Mirai i nocne widoki Czerwonego Magazynu Cegieł." }],
  "石川県": [{ q: "Co fotografować w Kanazawie w jeden dzień?", a: "Wczesny ranek w Kenrokuen (miękkie światło), potem zamek Kanazawa, Higashi Chaya (popołudnie/wieczór), targ Omicho, kończąc Bramą Bębnową przy stacji Kanazawa nocą." }],
  "山梨県": [{ q: "Najlepsze miejsce na fotografię Mt. Fuji z kwitnącymi wiśniami?", a: "Platforma widokowa Pagody Chureito w parku Arakurayama Sengen jest światowej sławy. Po 398 schodach pagoda, kwitnące wiśnie i Mt. Fuji ustawiają się w jednym kadrze. Pełnia kwitnienia początek-połowa kwietnia, wschód słońca daje najbardziej magiczne światło." }],
  "長野県": [{ q: "Kiedy kwitną wiśnie w parku zamku Takato?", a: "Początek-połowa kwietnia. Około 1500 wiśni «Takato Kohigan» kwitnie bladoróżowo, zdobywając tytuł «najlepszej wiśni pod niebem». Wieczorne oświetlenie jest jak ze snu, wczesny poranek najlepiej unika tłumów." }],
  "岐阜県": [{ q: "Kiedy jest zimowe oświetlenie Shirakawa-go?", a: "Odbywa się w ograniczonej liczbie dni (zwykle ~6) w styczniu-lutym. Wymagana rezerwacja; planuj wcześnie, by sfotografować domy gassho w śniegu z punktu widokowego." }],
  "愛知県": [{ q: "Wskazówki na dobre zdjęcia w zoo?", a: "Szybki obiektyw stałoogniskowy (np. 50mm f/1.8) rozmywa tło; przyciśnij obiektyw do siatki, aby zniknęła. Skup się na oczach zwierzęcia." }],
  "三重県": [
    { q: "Etykieta fotograficzna w Ise Jingu?", a: "Wewnątrz głównych sanktuariów ścisły zakaz. Zachowuj dyskrecję wewnątrz torii i unikaj bezpośredniego fotografowania wiernych lub kapłanów." },
    { q: "Kiedy słońce wschodzi między Meoto Iwa?", a: "Tylko w pobliżu przesilenia letniego (maj-lipiec) słońce wschodzi prosto między dwoma skałami. Początek czerwca ma najlepszy procent czystego nieba; przyjdź przed świtem." },
  ],
  "京都府": [
    { q: "Najlepszy czas na jesienne liście Kioto?", a: "Szczyt zwykle przypada koniec listopada-początek grudnia. Tofuku-ji (most Tsuten-kyo), Eikando, Kiyomizu-dera i Arashiyama wyglądają najlepiej w porannym świetle frontalnym." },
    { q: "Jak unikać tłumów?", a: "Wczesny poranek (6-8) zdecydowanie najlepszy. Kiyomizu-dera otwiera o 6, obejdź zewnętrze Kinkaku-ji przed 9, i przyjdź do Byodoin dokładnie na otwarcie." },
  ],
  "兵庫県": [{ q: "Najlepsze miejsca fotograficzne dla zamku Himeji?", a: "Front Otemon, plac Sannomaru (z kwitnącymi wiśniami), ogród Nishi-no-maru (widok z boku) i park Otoko-yama (widok z góry) — cztery klasyki." }],
  "奈良県": [{ q: "Wskazówki do fotografowania jeleni w Narze?", a: "Trzymanie shika senbei je przyciąga, ale odchodzą, gdy się skończy. Poranne podświetlenie podkreślające ich futro to klasyczna kompozycja." }],
  "徳島県": [{ q: "Kiedy wiry Naruto są największe?", a: "Podczas pływów syzygijnych (blisko nowiu lub pełni) wiosną/jesienią, wokół przypływu/odpływu (±1-2 godziny). Sprawdź tablice pływów; fotografuj z łodzi lub kładki mostu Onaruto." }],
  "香川県": [{ q: "Jakie warunki tworzą lustrzane odbicie Chichibugahama?", a: "①Niski przypływ pokrywający się z zachodem słońca ②Niemal zerowy wiatr ③Chmury na niebie (czyste niebo wygląda płasko). Turystyka Mitoyo publikuje optymalne daty online." }],
  "愛媛県": [{ q: "Czy mogę fotografować budynek Dogo Onsen Honkan?", a: "Zewnętrze całkowicie otwarte; tylne ujęcia i wieczorne oświetlenie zalecane. Niektóre obszary wewnętrzne zakazane ze względu na prywatność." }],
  "高知県": [{ q: "Wskazówki do uchwycenia błękitu Niko-buchi?", a: "W okolicach południa w pogodne dni, gdy bezpośrednie światło dociera do wody, błękit jest najmocniejszy. Filtr polaryzacyjny pogłębia kolor, tnąc odbicia powierzchniowe." }],
  "福岡県": [{ q: "Niezbędne miejsca fotograficzne w Fukuoce?", a: "Aleja dojazdowa i sala główna Dazaifu Tenmangu, plus nocna trasa Wieża Fukuoka–plaża Momochi–Bayside Place." }],
  "大分県": [{ q: "Gdzie uchwycić horyzont pary Beppu?", a: "Punkt widokowy Yukemuri w Kannawa Onsen. Zimowe poranki dają najgęstsze kolumny pary z powodu kontrastu temperatur." }],
  "沖縄県": [
    { q: "Najlepszy sezon dla Miyakojimy?", a: "Maj-wrzesień dla przejrzystości wody (zwłaszcza lipiec-sierpień). Wrzesień to sezon tajfunów. Grudzień-luty jest chłodno i mniej tłoczno, ale aktywności morskie ograniczone." },
    { q: "Najlepsza pora dnia na zdjęcia czystego morza?", a: "10-14, gdy słońce jest wysoko, a światło dociera do dna morskiego, tworzy najmocniejszy szmaragdowy kolor. Filtr polaryzacyjny niezbędny." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Jak dotrzeć do Shiretoko?", a: "Lot do Memanbetsu; Utoro Onsen (2 godz. autobusem) to brama. Wycieczki po lodzie dryfującym zimą, rejsy i spacer Pięcioma Jeziorami latem." }],
  "札幌": [{ q: "Najlepszy czas na zwiedzanie centrum Sapporo?", a: "Luty (Festiwal Śniegu), czerwiec (Festiwal Bzu), październik (liście), grudzień (White Illumination). Miasto zmienia oblicze przez cały rok." }],
  "さっぽろ雪まつり": [{ q: "Najlepsza pora dnia do fotografowania festiwalu?", a: "Iluminacja od zachodu słońca do 21 jest najbardziej fotogeniczna — używaj statywu i niskiego ISO, aby zachować teksturę śniegu. Dzień działa z błękitnym niebem w tle." }],
  "小樽": [{ q: "Najlepsze miejsce fotograficzne wzdłuż kanału?", a: "Między mostem Asakusa a mostem Chuo — magazyny, kanał i lampy gazowe w jednym kadrze. Niebieska godzina po zachodzie słońca jest idealna." }],
  "洞爺湖": [{ q: "Wskazówki do fotografii fajerwerków?", a: "Statyw obowiązkowy. ISO 100, f/8, B 4-8 sek. Platforma jeziorna łapie fajerwerki z odbiciem." }],
  "富良野": [{ q: "Najlepszy czas na pola lawendy?", a: "Wcześnie rano przed 7 dla miękkiego światła i minimalnego tłumu. Światło frontalne sprawia, że fioletowy świeci. Wcześniej sprawdź status kwitnienia." }],
  "宮古島": [{ q: "Najlepszy sezon dla Miyakojimy?", a: "Maj-wrzesień dla klarowności wody (zwłaszcza lipiec-sierpień). Wrzesień to sezon tajfunów. Grudzień-luty chłodno i mniej tłoczno." }],
  "沖縄": [{ q: "Niezbędne miejsca fotograficzne na głównej wyspie Okinawa?", a: "Ruiny zamku Shurijo, przylądek Zanpa, Manzamo, most Kouri, akwarium Churaumi, wioska ceramiki Yachimun i Kokusai-dori." }],
  "横浜": [{ q: "Najlepsze miejsce dla Minato Mirai?", a: "Osanbashi dla pełnej panoramy o zachodzie; Sakuragicho dla diabelskiego młyna; Yamashita-koen dla Czerwonego Magazynu Cegieł. Niebieska godzina optymalna." }],
  "鎌倉": [{ q: "Kiedy są chryzantemy w Hasedera?", a: "Około 1-23 listopada, z wieczornym oświetleniem. Przyjdź wcześnie, aby uniknąć kolejek." }],
  "伊勢神宮": [{ q: "Etykieta fotograficzna w Ise Jingu?", a: "Strefy wewnętrzne ścisły zakaz. Dyskrecja wewnątrz torii; nie fotografuj wiernych ani kapłanów." }],
  "夫婦岩": [{ q: "Kiedy słońce wschodzi między skałami?", a: "Blisko przesilenia (maj-lipiec). Początek czerwca ma najlepszy procent czystego nieba. Przyjdź przed świtem." }],
  "おはらい町・おかげ横丁": [{ q: "Najlepszy czas na fotografowanie ulicy?", a: "Rano 8-10, przed napływem turystów. Boczne światło na drewnianych domach jest piękne." }],
  "朝熊山展望台": [{ q: "Jak wjechać do punktu widokowego?", a: "Jazda Ise-Shima Skyline (płatna). Łatwy dostęp; obserwacja Mt. Fuji możliwa w pogodne dni (rzadkie)." }],
  "横山展望台": [{ q: "Najlepszy czas dla Yokoyamy?", a: "Pogodny poranek dla detali wysp w zatoce Ago. Zachód słońca też działa; najwyższe platformy są najlepsze." }],
  "清水寺": [{ q: "Kiedy jest jesienna iluminacja?", a: "Połowa listopada do początku grudnia, 17:30-21. Niebieska godzina po otwarciu jest najbardziej magiczna. Statywy nie dozwolone." }],
  "金閣寺": [{ q: "Najlepszy czas dla Złotego Pawilonu?", a: "Pogodne zimowe poranki ze śniegiem są ikoniczne; jesień i odbicie w stawie też klasyczne. Przyjdź na otwarcie (9)." }],
  "平等院鳳凰堂": [{ q: "Wskazówki do odbicia w stawie Aji?", a: "Bezwietrzne poranki dają lustrzaną powierzchnię. Przyjdź na otwarcie (8:30); użyj polaryzatora słabo, aby zachować odbicie." }],
  "東福寺": [{ q: "Najlepszy czas dla mostu Tsutenkyo?", a: "Połowa listopada do początku grudnia. Otwarcie 8:30; podążaj jednokierunkowym przepływem z północy. Nie zatrzymuj się na moście." }],
  "東寺": [{ q: "Wskazówki do fotografowania pięciopiętrowej pagody?", a: "Staw Hyotan-ike o zachodzie dla odbicia. Wieczorne oświetlenie podczas sezonów wiśni i jesieni." }],
  "八坂の塔": [{ q: "Najlepsze miejsce dla pagody Yasaka?", a: "Patrzenie w górę zbocza Yasaka-dori z dołu to klasyczny kąt. 6-7 prawie bez turystów — idealne też dla portretów w kimonie." }],
  "姫路城": [{ q: "Najlepszy czas dla zamku z kwitnącymi wiśniami?", a: "Zazwyczaj początek kwietnia. Plac Sannomaru, ogród Nishi-no-maru i park pamiątkowy Shirotopia są klasyczne." }],
  "法隆寺": [{ q: "Zasady fotografii?", a: "Teren OK; posągi Buddy w salach przeważnie zakazane. Bez statywów i flesza nawet na zewnątrz. Wczesny poranek i późne popołudnie spokojniejsze i bardziej miękkie." }],
  "法隆寺 夢殿": [{ q: "Kiedy wystawiany jest Guze Kannon?", a: "Wiosna: 11 kwietnia-18 maja; jesień: 22 października-22 listopada. Fotografia posągu zabroniona." }],
  "鳴門海峡": [{ q: "Łódź czy chodnik?", a: "Łódź dla intensywności, chodnik dla bezpieczeństwa z góry. Szklana podłoga Uzu-no-Michi pokazuje wiry w dole. Na łodzi spodziewaj się rozprysków." }],
  "大鳴門橋": [{ q: "Najlepsze miejsce dla mostu?", a: "Michi-no-Eki Uzushio po stronie Awaji daje najlepszy widok. Most i cieśnina rozświetlone o zachodzie są piękne." }],
  "父母ヶ浜": [{ q: "Jak zarezerwować optymalny dzień?", a: "Bez rezerwacji, ale Turystyka Mitoyo publikuje «Sky Mirror Calendar» z optymalnymi dniami. Planuj na dni, gdy odpływ i zachód słońca się pokrywają." }],
  "亀老山展望台": [{ q: "Jak się tam dostać?", a: "Autobus Shimanami Kaido z Imabari lub Fukuyamy, lub rowerem. Parking blisko szczytu." }],
  "来島海峡大橋": [{ q: "Najlepsze miejsce dla mostu?", a: "Punkt widokowy góry Kiro (Oshima, Imabari) zapewnia ostateczny widok. Uchwyć pomarańczowo oświetlony most o zachodzie i niebieską godzinę po nim." }],
  "松山城": [{ q: "Kolejka linowa czy krzesełkowa?", a: "Jeśli pogoda pozwala, otwarte krzesło daje lepsze panoramiczne zanurzenie (5 min). Bilet łączony pokrywa oba." }],
  "道後温泉": [{ q: "Czy mogę fotografować Honkan?", a: "Zewnętrze całkowicie otwarte; tylne ujęcia i wieczorne oświetlenie zalecane. Niektóre obszary wewnętrzne zakazane ze względu na prywatność." }],
  "桂浜": [{ q: "Najlepszy kąt dla pomnika Ryoma?", a: "Z niskiego kąta od strony morza, wchodząc po schodach za cokołem — łączy Ryomę z Pacyfikiem w tle. Zachód słońca daje uderzającą sylwetkę." }],
  "高知城": [{ q: "Ile zajmuje wejście?", a: "Około 15 min schodami od wejścia do wieży. Brama Otemon to klasyczna ramka dla wiśni. Nie przegap widoku miasta z wieży." }],
  "名越屋沈下橋": [{ q: "Najlepszy sezon?", a: "Świeża zieleń w maju, letnia kąpiel (lip-sie), jesienne liście (paź-lis). Zimowe poranki z mgłą też są jak ze snu." }],
  "にこ淵": [{ q: "Kiedy błękit jest najsilniejszy?", a: "Pogodne południe (10-14), zwłaszcza lato-wczesna jesień. Po deszczu mętność zmniejsza efekt — sucha pogoda idealna. Weź filtr PL." }],
  "福岡": [{ q: "Etykieta fotograficzna przy yatai?", a: "Najpierw zapytaj personel/klientów. Zbliżenia po pytaniu. Zewnętrza i ulice swobodne." }],
  "別府": [{ q: "Ile trwa wycieczka po Piekłach?", a: "Wszystkie 7 Piekieł zajmuje 2-3 godziny. Bilet łączony oszczędza. Piekło Morza, Krwawej Sadzawki i Tatsumaki są w top-3." }],
  "湯布院": [{ q: "Warunki dla porannej mgły nad jeziorem Kinrin?", a: "Pogodne poranki listopad-marzec poniżej 5°C — różnica temperatur między wodą onsen a powietrzem produkuje mgłę. Najgęstsza od przed świtem do godziny później." }],
  "白川郷": [{ q: "Fotografowanie z punktu widokowego?", a: "Punkt widokowy ruin zamku Ogimachi góruje nad całą wioską — klasyk. Mgła jesienno-zimowa, śnieg styczeń-luty, zieleń maj: każda arcydziełem." }],
  "美幌峠": [{ q: "Kiedy pojawia się morze chmur?", a: "Poranki wrzesień-listopad w pogodne, bezwietrzne dni z dużymi różnicami temperatur. Szczyt około 30 min wokół wschodu słońca." }],
  "摩周湖": [{ q: "Jakie są szanse zobaczenia jeziora?", a: "Roczny wskaźnik widoczności ~30%. Lato szczególnie mgliste; zima i wiosna oferują lepszą klarowność. Odwiedź kilka punktów widokowych, by zwiększyć szanse." }],
  "阿寒": [{ q: "Czy mogę zobaczyć marimo?", a: "W Centrum Obserwacji Marimo na wyspie Churui — dostępne łodzią turystyczną." }],
  "三段滝公園": [{ q: "Kiedy widać zamarznięte wodospady?", a: "Tylko od połowy stycznia do końca lutego podczas wielkiego mrozu. Całkowicie zamrożone stają się biało-niebieską rzeźbą lodową." }],
  "室蘭": [{ q: "Najlepsze miejsce dla nocnego widoku fabryk?", a: "Punkt widokowy Iwaizumi, góra Sokuryo i most Hakucho to trzy klasyki. Uchwyć most ze światłami fabryki w niebieskiej godzinie." }],
  "美唄": [{ q: "Co jest specjalnego w Arte Piazza?", a: "Bezpłatne plenerowe muzeum rzeźby w przebudowanej szkole. Białe marmurowe prace, drewniany budynek szkolny i śnieg razem wyglądają malowniczo." }],
  "登別": [{ q: "Najlepszy czas dla Jigokudani?", a: "Rano dla miękkiego światła i widocznej pary. Wieczorne oświetlenie (maj-październik) jest atmosferyczne." }],
  "北竜町": [{ q: "Kiedy jest pełnia kwitnienia?", a: "Zwykle pierwszy tydzień do ~10 sierpnia. Klasyczne ujęcie: pełna panorama pola z punktu widokowego. Poranne światło frontalne najbardziej żywe." }],
  "東京": [{ q: "Wskazówki do fotografii nocnej?", a: "Statyw, niskie ISO i długie naświetlanie. Niebieska godzina (30 min po zachodzie) najlepiej balansuje niebo i światła miasta." }],
  "品川": [{ q: "Miejsca w pobliżu stacji Shinagawa?", a: "Widok na Shinkansen z kładki dla pieszych po stronie Takanawa, wieżowce po stronie Konan, szklany korytarz Shinagawa Intercity i nocny widok kanału na Tennozu Isle." }],
  "東山動物園": [{ q: "Wskazówki do fotografii zwierząt?", a: "Szybki obiektyw stałoogniskowy (50mm f/1.8) rozmywa tło. Przyciśnij obiektyw do siatki, aby zniknęła. Skup się na oczach." }],
  "梅林公園": [{ q: "Kiedy jest pełnia kwitnienia?", a: "Od połowy lutego do początku marca. Z odmianami wczesnymi i późnymi koniec lutego oferuje największą różnorodność." }],
  "鳥羽水族館": [{ q: "Kiedy diugoń jest najbardziej aktywny?", a: "Wokół godzin karmienia (około 11 i 15). Czasami podpływa do szyby — cenny moment." }],
  "清水寺周辺": [{ q: "Najlepsze miejsce dla pagody Yasaka?", a: "Patrzenie w górę zbocza Yasaka-dori z dołu to klasyczny kąt. 6-7 prawie bez turystów — idealne też dla portretów w kimonie." }],
  "鴨川シーワールド": [{ q: "Wskazówki do fotografii orek?", a: "Czas migawki 1/1000+ do zamrożenia rozprysków; tryb seryjny niezbędny. Pierwsze rzędy moknają — wybieraj miejsca ostrożnie." }],
  "旭山動物園": [{ q: "Harmonogram spaceru pingwinów?", a: "Dwa razy dziennie od połowy grudnia do marca — tylko zima, gdy jest śnieg. Parada królewskich pingwinów to klasyk zimowy." }],
  "金沢": [{ q: "Miejsca fotograficzne w Kanazawie w jeden dzień?", a: "Kenrokuen o świcie (miękkie światło), zamek Kanazawa, Higashi Chaya (popołudnie/wieczór), targ Omicho, Brama Bębnowa przy stacji Kanazawa nocą." }],
  "新倉山浅間公園": [{ q: "Jak dojść do platformy widokowej?", a: "Stacja Shimo-Yoshida (linia Fujikyu), 10 min pieszo do sanktuarium, potem 398 stopni (dostępna też łagodniejsza pochylnia). Przybądź 5-6, aby uniknąć tłumu i uchwycić wschód słońca na Fuji." }],
  "河口湖": [{ q: "Najlepsze miejsce dla odbicia odwróconego Fuji?", a: "Park Oishi i Ubuyagasaki na północnym brzegu są klasyczne. Celuj w bezwietrzne poranki 6-8, gdy jezioro odbija. Zima daje najczystsze powietrze i najlepszą przejrzystość." }],
  "松本城": [{ q: "Jak skadrować twierdzę z wiśniami i Alpami?", a: "Wokół mostu Uzumi po północno-zachodniej stronie wewnętrznej fosy jest najlepiej. Teleobiektyw do skompresowania twierdzy i grzbietów Alp, z wiśniami z połowy kwietnia jako bokeh przedniego planu. Poranek daje miękkie podświetlenie." }],
  "高遠城址公園": [{ q: "Najlepsza pora dnia na zdjęcia wiśni Takato?", a: "Przed 6 rano oferuje niebieskie światło bez tłumów. Popołudnie przechodzi przez niebieską godzinę do iluminacji, gdzie ciepłe światło lampionów spotyka różowe kwiaty." }],
  "駒つなぎの桜": [{ q: "Co potrzeba dla odbicia w polu ryżowym?", a: "Połowa-koniec kwietnia, gdy pola są zalane do sadzenia, w bezwietrzny świt. Weź statyw i obiektyw szerokokątny do standardowego; dla gwiazd+wiśni zalecane ciało tolerancyjne na wysokie ISO." }],
  "長野県天空の楽園": [{ q: "Najlepsza pora roku do obserwacji gwiazd?", a: "Blisko nowiu. Zima (lis-lut) daje najostrzejsze gwiazdy (Droga Mleczna słabsza). Lato najlepsze dla rdzenia Drogi Mlecznej. Wycieczka nocna wymaga rezerwacji." }],
  "弘法山古墳": [{ q: "Jak dojść i gdzie fotografować?", a: "Ze stacji Matsumoto, ~20 min autobusem + ~20 min pieszo do szlaku, potem 15-20 min pod górę na szczyt. Świt daje miękkie podświetlenie na Alpach Północnych i unika tłumów." }],
  "安養寺": [{ q: "Kiedy jest pełnia kwitnienia?", a: "Połowa kwietnia. Poranek oferuje frontalnie oświetlone, żywe kolory kwiatów. Wieczór daje uderzające sylwetki sali i drzewa. Cichy teren — fotografuj z szacunkiem." }],
  "松本市新村": [{ q: "Co znajduje się w pobliżu stacji Niimura?", a: "Drewniana stara stacja Mitsumizo, pola ryżowe z Alpami, alejki obsadzone wiśniami, poranna mgła nad polami ryżowymi — ukryta perła łącząca kolej i krajobraz." }],
  "城山公園(松本市)": [{ q: "Najlepsze kadrowanie z placu widokowego?", a: "Pionowa kompozycja z wiśniami na pierwszym planie i grzbietem Alp w tle to klasyk. Poranny «alpenglow» (zaśnieżone szczyty czerwieniejące o wschodzie) z sakurą to absolutny szczyt." }],
  "中町通り(松本市)": [{ q: "Najlepsza pora dnia do fotografowania?", a: "6-8 oferuje puste ulice i czyste kompozycje ścian kura. Wieczór, gdy lampy uliczne się zapalają, a białe ściany ocieplają się do bursztynu, daje najbardziej nostalgiczny nastrój." }],
  "高島公園(諏訪市)": [{ q: "Najlepsze miejsce dla odbicia w fosie?", a: "Z południowej strony fosy użyj teleobiektywu, by skompresować twierdzę i wiśnie. Bezwietrzne poranki lub wieczory dają lustrzaną wodę. Podczas iluminacji niebieska godzina jest najbardziej magiczna." }],
  "諏訪湖": [{ q: "Najlepsze miejsca fotograficzne wokół jeziora Suwa?", a: "Park Tateishi (widok z góry), promenada nad jeziorem (jezioro + miasto), obszar Geyser Center (zachód), wschodni brzeg, gdzie odbija się Yatsugatake. Lodowe grzbiety Omiwatari pojawiają się w styczniowo-lutowych porankach." }],
  "立石公園": [{ q: "Wskazówki do widoku nocnego i gwiazd?", a: "Statyw niezbędny. Widok nocny: ISO 200, f/8, 10-30 sek. Gwiazdy: ISO 3200, f/2.8, ~15 sek. 20-30 min po zachodzie (magiczna godzina) daje najpiękniejszy gradient między światłami miasta a zmierzchem." }],
};

let content = readFileSync(PL_PATH, "utf-8");
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
writeFileSync(PL_PATH, content, "utf-8");
console.log(`✓ pl.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
