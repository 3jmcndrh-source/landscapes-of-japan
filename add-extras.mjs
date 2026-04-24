#!/usr/bin/env node
/**
 * extras/*.js × 15言語に山梨/長野とその6 locを一括追加
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXTRAS_DIR = resolve(__dirname, "app", "content", "extras");

const T = {
  es: {
    prefectures: {
      "山梨県": `Yamanashi se asienta al pie norte del Monte Fuji. Los Cinco Lagos del Fuji, la composición de tres niveles del Parque Arakurayama Sengen (pagoda + cerezos + Fuji), el santuario Takeda y los viñedos de Koshu definen su doble identidad: mejor mirador del Fuji y país de fruta y vino. 13 fotos.`,
      "長野県": `Nagano es el corazón de los Alpes japoneses. El Castillo de Matsumoto (Tesoro Nacional), el Parque del Castillo Takato (uno de los tres mejores cerezos de Japón), Kamikochi, los monos de las nieves de Jigokudani, Karuizawa y el «cielo más estrellado» de la aldea Achi reúnen montaña, historia y astronomía. 13 fotos.`,
    },
    locations: {
      "新倉山浅間公園": `El Parque Arakurayama Sengen, en Fujiyoshida, ofrece una de las vistas más icónicas de Japón: 398 escalones llevan a un mirador donde la pagoda Chureito, los cerezos y el Monte Fuji se alinean en un solo encuadre. Pleno florecimiento a mediados de abril.`,
      "河口湖": `El Lago Kawaguchi, uno de los Cinco Lagos del Fuji, es el lugar más famoso para el «Fuji invertido» reflejado en el agua. Cerezos en primavera, fuegos artificiales en verano, corredor de arces en otoño y Fuji nevado en invierno: belleza estacional plena.`,
      "松本城": `El Castillo de Matsumoto es Tesoro Nacional y uno de los 12 castillos originales de Japón. Sus muros negros le valieron el sobrenombre «Castillo del Cuervo». Las cumbres de los Alpes del Norte detrás y el foso espejado dan belleza a las cuatro estaciones.`,
      "高遠城址公園": `El Parque del Castillo Takato, en Ina, alberga unos 1.500 cerezos endémicos «Takato Kohigan» que florecen en rosa pálido a principios-mediados de abril, ganando el título de «mejor cerezo del cielo». La iluminación nocturna del «Sakura Matsuri» con los Alpes Centrales detrás es onírica.`,
      "駒つなぎの桜": `Cerezo Edohigan de más de 400 años en la aldea Achi. Según la leyenda, Minamoto no Yoshitsune ató aquí su caballo. Solitario junto a los arrozales en terraza, en plena floración de mediados-finales de abril, su reflejo bajo las estrellas es un emblemático cerezo solitario de Nagano.`,
      "長野県天空の楽園": `La aldea Achi en Nagano está certificada por el Ministerio de Medio Ambiente como el «cielo más estrellado de Japón». El tour nocturno «Tenku no Rakuen» sube en góndola al altiplano Fujimidai a 1.400 m, donde un cielo sin contaminación lumínica se llena de estrellas.`,
    },
  },
  fr: {
    prefectures: {
      "山梨県": `Yamanashi se trouve au pied nord du Mont Fuji. Les Cinq Lacs du Fuji, la composition à trois niveaux du Parc Arakurayama Sengen (pagode + cerisiers + Fuji), le sanctuaire Takeda et les vignobles de Koshu définissent sa double identité : meilleur point de vue sur le Fuji et terre de fruits et de vin. 13 photos.`,
      "長野県": `Nagano est le cœur des Alpes japonaises. Le château de Matsumoto (Trésor national), le parc du château de Takato (l'un des trois plus beaux cerisiers du Japon), Kamikochi, les singes des neiges de Jigokudani, Karuizawa et le « plus beau ciel étoilé du Japon » du village Achi réunissent montagne, histoire et astronomie. 13 photos.`,
    },
    locations: {
      "新倉山浅間公園": `Le Parc Arakurayama Sengen, à Fujiyoshida, offre l'une des vues les plus emblématiques du Japon : 398 marches mènent à une plateforme où la pagode Chureito, les cerisiers et le Mont Fuji s'alignent en un seul cadre. Pleine floraison mi-avril.`,
      "河口湖": `Le Lac Kawaguchi, l'un des Cinq Lacs du Fuji, est le lieu le plus célèbre pour le « Fuji inversé » reflété dans l'eau. Cerisiers au printemps, feux d'artifice en été, couloir d'érables en automne et Fuji enneigé en hiver : beauté saisonnière totale.`,
      "松本城": `Le Château de Matsumoto est Trésor national et l'un des 12 châteaux originaux du Japon. Ses murs noirs lui ont valu le surnom de « Château du Corbeau ». Les crêtes blanches des Alpes du Nord à l'arrière-plan et les douves miroir offrent une beauté quatre saisons.`,
      "高遠城址公園": `Le Parc du Château de Takato, à Ina, abrite environ 1 500 cerisiers endémiques « Takato Kohigan » qui fleurissent rose pâle début-mi-avril, gagnant le titre de « plus beau cerisier sous le ciel ». L'illumination nocturne du « Sakura Matsuri » avec les Alpes Centrales en arrière-plan est onirique.`,
      "駒つなぎの桜": `Cerisier Edohigan de plus de 400 ans dans le village Achi. Selon la légende, Minamoto no Yoshitsune y aurait attaché son cheval. Solitaire au bord des rizières en terrasses, en pleine floraison mi-fin avril, son reflet sous les étoiles est un cerisier solitaire emblématique de Nagano.`,
      "長野県天空の楽園": `Le village Achi à Nagano est certifié par le ministère de l'Environnement comme le « ciel étoilé n°1 du Japon ». La visite nocturne « Tenku no Rakuen » monte en télécabine au plateau Fujimidai à 1 400 m, où un ciel sans pollution lumineuse se remplit d'étoiles.`,
    },
  },
  de: {
    prefectures: {
      "山梨県": `Yamanashi liegt am Nordfuß des Berges Fuji. Die Fünf Fuji-Seen, die dreistufige Komposition des Arakurayama-Sengen-Parks (Pagode + Kirschblüten + Fuji), der Takeda-Schrein und die Koshu-Weingärten definieren seine duale Identität: bester Fuji-Aussichtspunkt und Frucht-Wein-Land. 13 Fotos.`,
      "長野県": `Nagano ist das Herz der japanischen Alpen. Burg Matsumoto (Nationalschatz), Takato-Burgpark (eine der drei schönsten Kirschblütenstätten Japans), Kamikochi, die Schneeaffen von Jigokudani, Karuizawa und der «sternenreichste Himmel Japans» im Dorf Achi vereinen Berge, Geschichte und Astronomie. 13 Fotos.`,
    },
    locations: {
      "新倉山浅間公園": `Der Arakurayama-Sengen-Park in Fujiyoshida bietet einen der ikonischsten Anblicke Japans: 398 Stufen führen zu einer Aussichtsplattform, wo die Chureito-Pagode, Kirschblüten und der Berg Fuji in einem Bild erscheinen. Volle Blüte Mitte April.`,
      "河口湖": `Der Kawaguchi-See, einer der Fünf Fuji-Seen, ist der berühmteste Ort für den «umgekehrten Fuji», gespiegelt im Wasser. Kirschblüten im Frühling, Feuerwerk im Sommer, Ahorn-Korridor im Herbst und schneebedeckter Fuji im Winter: volle Schönheit der Jahreszeiten.`,
      "松本城": `Burg Matsumoto ist Nationalschatz und eine der 12 originalen Burgen Japans. Ihre rabenschwarzen Mauern brachten ihr den Beinamen «Krähenburg» ein. Die weißen Kämme der Nördlichen Alpen im Hintergrund und der spiegelglatte Innengraben geben Vier-Jahreszeiten-Schönheit.`,
      "高遠城址公園": `Der Takato-Burgpark in Ina beherbergt etwa 1.500 endemische «Takato-Kohigan»-Kirschbäume, die Anfang bis Mitte April hellrosa blühen und den Titel «Kirschblüten Nr. 1 unter dem Himmel» tragen. Die Nachtbeleuchtung beim «Sakura Matsuri» mit den Zentralalpen im Hintergrund ist traumhaft.`,
      "駒つなぎの桜": `Edohigan-Kirschbaum, über 400 Jahre alt, im Dorf Achi. Der Legende nach band Minamoto no Yoshitsune hier sein Pferd an. Allein am Rand von Terrassenreisfeldern in voller Blüte Mitte bis Ende April spiegelt er sich im Wasser unter Sternen: ein ikonischer Solitärbaum Naganos.`,
      "長野県天空の楽園": `Das Dorf Achi in Nagano ist vom Umweltministerium als «sternenreichster Himmel Japans» zertifiziert. Die Nachttour «Tenku no Rakuen» fährt mit einer Gondel auf das Fujimidai-Hochland in 1.400 m Höhe, wo der lichtverschmutzungsfreie Himmel sich mit Sternen füllt.`,
    },
  },
  pt: {
    prefectures: {
      "山梨県": `Yamanashi situa-se aos pés norte do Monte Fuji. Os Cinco Lagos do Fuji, a composição em três níveis do Parque Arakurayama Sengen (pagode + cerejeiras + Fuji), o santuário Takeda e os vinhedos de Koshu definem sua dupla identidade: melhor mirante do Fuji e terra de frutas e vinho. 13 fotos.`,
      "長野県": `Nagano é o coração dos Alpes Japoneses. O Castelo de Matsumoto (Tesouro Nacional), o Parque do Castelo Takato (um dos três melhores cerejais do Japão), Kamikochi, os macacos das neves de Jigokudani, Karuizawa e o «céu mais estrelado do Japão» da aldeia Achi reúnem montanha, história e astronomia. 13 fotos.`,
    },
    locations: {
      "新倉山浅間公園": `O Parque Arakurayama Sengen, em Fujiyoshida, oferece uma das vistas mais icônicas do Japão: 398 degraus levam a um deque de observação onde o pagode Chureito, as cerejeiras e o Monte Fuji se alinham em um único enquadramento. Pico de floração em meados de abril.`,
      "河口湖": `O Lago Kawaguchi, um dos Cinco Lagos do Fuji, é o lugar mais famoso para o «Fuji invertido» refletido na água. Cerejeiras na primavera, fogos de artifício no verão, corredor de bordos no outono e Fuji nevado no inverno: beleza sazonal completa.`,
      "松本城": `O Castelo de Matsumoto é Tesouro Nacional e um dos 12 castelos originais do Japão. Suas paredes negras lhe valeram o apelido de «Castelo do Corvo». As cristas brancas dos Alpes do Norte ao fundo e o fosso espelhado dão beleza nas quatro estações.`,
      "高遠城址公園": `O Parque do Castelo Takato, em Ina, abriga cerca de 1.500 cerejeiras endêmicas «Takato Kohigan» que florescem em rosa pálido no início-meados de abril, conquistando o título de «melhor cerejeira sob o céu». A iluminação noturna do «Sakura Matsuri» com os Alpes Centrais ao fundo é onírica.`,
      "駒つなぎの桜": `Cerejeira Edohigan com mais de 400 anos na aldeia Achi. Segundo a lenda, Minamoto no Yoshitsune amarrou aqui seu cavalo. Sozinha à beira de arrozais em terraços, em plena floração de meados-final de abril, seu reflexo sob as estrelas é uma cerejeira solitária emblemática de Nagano.`,
      "長野県天空の楽園": `A aldeia Achi em Nagano é certificada pelo Ministério do Meio Ambiente como o «céu mais estrelado do Japão». O passeio noturno «Tenku no Rakuen» sobe de gôndola até o planalto Fujimidai a 1.400 m, onde um céu sem poluição luminosa se enche de estrelas.`,
    },
  },
  it: {
    prefectures: {
      "山梨県": `Yamanashi si trova ai piedi nord del Monte Fuji. I Cinque Laghi del Fuji, la composizione a tre livelli del Parco Arakurayama Sengen (pagoda + ciliegi + Fuji), il santuario Takeda e i vigneti di Koshu definiscono la sua doppia identità: miglior punto panoramico del Fuji e terra di frutta e vino. 13 foto.`,
      "長野県": `Nagano è il cuore delle Alpi giapponesi. Il Castello di Matsumoto (Tesoro Nazionale), il Parco del Castello Takato (uno dei tre migliori ciliegi del Giappone), Kamikochi, le scimmie delle nevi di Jigokudani, Karuizawa e il «cielo più stellato del Giappone» del villaggio Achi uniscono montagna, storia e astronomia. 13 foto.`,
    },
    locations: {
      "新倉山浅間公園": `Il Parco Arakurayama Sengen, a Fujiyoshida, offre una delle viste più iconiche del Giappone: 398 gradini portano a una piattaforma dove la pagoda Chureito, i ciliegi e il Monte Fuji si allineano in una singola inquadratura. Piena fioritura a metà aprile.`,
      "河口湖": `Il Lago Kawaguchi, uno dei Cinque Laghi del Fuji, è il luogo più famoso per il «Fuji rovesciato» riflesso nell'acqua. Ciliegi in primavera, fuochi d'artificio in estate, corridoio di aceri in autunno e Fuji innevato in inverno: piena bellezza stagionale.`,
      "松本城": `Il Castello di Matsumoto è Tesoro Nazionale e uno dei 12 castelli originali del Giappone. Le sue mura nere gli sono valse il soprannome di «Castello del Corvo». Le creste bianche delle Alpi del Nord sullo sfondo e il fossato a specchio offrono bellezza in tutte le stagioni.`,
      "高遠城址公園": `Il Parco del Castello Takato, a Ina, ospita circa 1.500 ciliegi endemici «Takato Kohigan» che fioriscono in rosa pallido a inizio-metà aprile, guadagnando il titolo di «miglior ciliegio sotto il cielo». L'illuminazione notturna del «Sakura Matsuri» con le Alpi Centrali sullo sfondo è onirica.`,
      "駒つなぎの桜": `Ciliegio Edohigan di oltre 400 anni nel villaggio Achi. Secondo la leggenda, Minamoto no Yoshitsune vi legò il suo cavallo. Solitario accanto alle risaie a terrazza, in piena fioritura a metà-fine aprile, il suo riflesso sotto le stelle è un ciliegio solitario emblematico di Nagano.`,
      "長野県天空の楽園": `Il villaggio Achi in Nagano è certificato dal Ministero dell'Ambiente come il «cielo più stellato del Giappone». Il tour notturno «Tenku no Rakuen» sale in gondola sull'altopiano Fujimidai a 1.400 m, dove un cielo senza inquinamento luminoso si riempie di stelle.`,
    },
  },
  ru: {
    prefectures: {
      "山梨県": `Яманаси расположена у северного подножия горы Фудзи. Пять озёр Фудзи, трёхуровневая композиция парка Аракураяма Сэнгэн (пагода + сакура + Фудзи), святилище Такэда и виноградники Косю определяют её двойственную идентичность: лучшая смотровая Фудзи и край фруктов и вина. 13 фото.`,
      "長野県": `Нагано — сердце Японских Альп. Замок Мацумото (Национальное сокровище), парк замка Такато (один из трёх лучших мест сакуры Японии), Камикоти, снежные обезьяны Дзигокудани, Каруидзава и «самое звёздное небо Японии» в деревне Ати объединяют горы, историю и астрономию. 13 фото.`,
    },
    locations: {
      "新倉山浅間公園": `Парк Аракураяма Сэнгэн в Фудзиёсиде предлагает один из самых знаковых видов Японии: 398 ступеней ведут на смотровую площадку, где пагода Тюрэйто, сакура и гора Фудзи выстраиваются в один кадр. Пик цветения в середине апреля.`,
      "河口湖": `Озеро Кавагути, одно из Пяти озёр Фудзи, — самое известное место для «перевёрнутого Фудзи», отражённого в воде. Сакура весной, фейерверки летом, коридор клёнов осенью и заснеженный Фудзи зимой — полная сезонная красота.`,
      "松本城": `Замок Мацумото — Национальное сокровище и один из 12 оригинальных замков Японии. Его чёрные стены принесли прозвище «Вороний замок». Белые гребни Северных Альп на заднем плане и зеркальный внутренний ров дарят красоту всех сезонов.`,
      "高遠城址公園": `Парк замка Такато в Ине вмещает около 1500 эндемичных сакур «Такато Кохиган», которые цветут бледно-розовым в начале-середине апреля, заслужив титул «лучшая сакура под небесами». Ночная подсветка «Сакура мацури» с Центральными Альпами на фоне сказочна.`,
      "駒つなぎの桜": `Сакура Эдохиган возрастом более 400 лет в деревне Ати. По легенде Минамото-но Ёсицунэ привязал здесь своего коня. Одинокая у террасных рисовых полей, в полном цветении в середине-конце апреля, её отражение под звёздами — знаковое одинокое дерево Нагано.`,
      "長野県天空の楽園": `Деревня Ати в Нагано сертифицирована Министерством окружающей среды как «самое звёздное небо Японии». Ночной тур «Тэнку но Ракуэн» поднимает на гондоле к плато Фудзимидай на высоте 1400 м, где небо без светового загрязнения наполняется звёздами.`,
    },
  },
  ar: {
    prefectures: {
      "山梨県": `تقع ياماناشي عند السفح الشمالي لجبل فوجي. بحيرات فوجي الخمس وتكوين حديقة أراكورايامة سينغن ثلاثي المستويات (الباغودا + أزهار الكرز + فوجي) ومعبد تاكيدا وكروم كوشو تحدد هويتها المزدوجة: أفضل إطلالة على فوجي وأرض الفواكه والنبيذ. 13 صورة.`,
      "長野県": `ناغانو قلب جبال الألب اليابانية. قلعة ماتسوموتو (كنز وطني)، حديقة قلعة تاكاتو (إحدى أفضل ثلاث مواقع كرز في اليابان)، كاميكوتشي، قرود الثلج في جيغوكوداني، كاروايزاوا و«السماء الأكثر نجوماً في اليابان» في قرية أتشي تجمع الجبل والتاريخ والفلك. 13 صورة.`,
    },
    locations: {
      "新倉山浅間公園": `حديقة أراكورايامة سينغن في فوجيوشيدا تقدم أحد أكثر مناظر اليابان شهرة: 398 درجة تؤدي إلى منصة مشاهدة حيث تتراصف باغودا تشوريتو وأزهار الكرز وجبل فوجي في إطار واحد. ذروة الإزهار في منتصف أبريل.`,
      "河口湖": `بحيرة كاواغوتشي، إحدى بحيرات فوجي الخمس، أشهر مكان لـ«فوجي المقلوبة» المنعكسة في الماء. أزهار الكرز ربيعاً، الألعاب النارية صيفاً، ممر القيقب خريفاً وفوجي المغطاة بالثلج شتاءً: جمال موسمي كامل.`,
      "松本城": `قلعة ماتسوموتو كنز وطني وإحدى 12 قلعة أصلية في اليابان. جدرانها السوداء أكسبتها لقب «قلعة الغراب». قمم جبال الألب الشمالية البيضاء وراءها والخندق المرآة يمنحانها جمال الفصول الأربعة.`,
      "高遠城址公園": `حديقة قلعة تاكاتو في إينا تضم نحو 1500 شجرة كرز محلية «تاكاتو كوهيغان» تتفتح بلون وردي شاحب في أوائل-منتصف أبريل، حائزة على لقب «أفضل كرز تحت السماء». إضاءة «ساكورا ماتسوري» الليلية مع جبال الألب الوسطى خلفية حلمية.`,
      "駒つなぎの桜": `شجرة كرز إيدوهيغان عمرها أكثر من 400 عام في قرية أتشي. تقول الأسطورة إن ميناموتو نو يوشيتسوني ربط حصانه هنا. وحيدة بجانب حقول الأرز المدرجة، في إزهارها الكامل منتصف-نهاية أبريل، انعكاسها تحت النجوم شجرة أيقونية لناغانو.`,
      "長野県天空の楽園": `قرية أتشي في ناغانو معتمدة من وزارة البيئة بأنها «أكثر سماء نجوماً في اليابان». جولة «تنكو نو راكوين» الليلية ترتفع بالتلفريك إلى هضبة فوجيميداي على ارتفاع 1400 م، حيث تمتلئ السماء الخالية من التلوث الضوئي بالنجوم.`,
    },
  },
  hi: {
    prefectures: {
      "山梨県": `यामानाशी माउंट फुजी के उत्तरी पाँव पर बसी है। फुजी पाँच झीलें, अराकुरायामा सेंगेन पार्क की त्रि-स्तरीय रचना (पगोडा + चेरी ब्लॉसम + फुजी), ताकेदा मंदिर और कोशू के अंगूर के बाग इसकी दोहरी पहचान बनाते हैं: फुजी का सर्वश्रेष्ठ दृश्य और फल-शराब की भूमि। 13 तस्वीरें।`,
      "長野県": `नागानो जापानी आल्प्स का दिल है। मात्सुमोतो कैसल (राष्ट्रीय खजाना), ताकातो कैसल पार्क (जापान के तीन सर्वश्रेष्ठ चेरी स्थलों में से एक), कामिकोची, जिगोकुदानी के स्नो मंकी, करुइज़ावा और आची गाँव का «जापान का सबसे सितारा-भरा आसमान» पर्वत, इतिहास और खगोल विज्ञान को एक साथ लाते हैं। 13 तस्वीरें।`,
    },
    locations: {
      "新倉山浅間公園": `फुजियोशिदा का अराकुरायामा सेंगेन पार्क जापान के सबसे प्रतिष्ठित दृश्यों में से एक प्रदान करता है: 398 सीढ़ियाँ एक व्यू डेक तक ले जाती हैं जहाँ चूरेइतो पगोडा, चेरी ब्लॉसम और माउंट फुजी एक ही फ्रेम में आते हैं। अप्रैल मध्य में पूर्ण खिलाव।`,
      "河口湖": `कावागुची झील, फुजी पाँच झीलों में से एक, पानी में प्रतिबिंबित «उल्टे फुजी» के लिए सबसे प्रसिद्ध स्थल है। वसंत में चेरी, गर्मियों में आतिशबाजी, शरद में मेपल कॉरिडोर और सर्दियों में बर्फीला फुजी: पूर्ण मौसमी सौंदर्य।`,
      "松本城": `मात्सुमोतो कैसल राष्ट्रीय खजाना और जापान के 12 मूल कैसलों में से एक है। काली दीवारों के कारण इसे «कौवा कैसल» कहते हैं। पीछे उत्तरी आल्प्स की सफेद चोटियाँ और दर्पण सी आंतरिक खाई इसे चारों मौसमों की सुंदरता देती हैं।`,
      "高遠城址公園": `इना का ताकातो कैसल पार्क लगभग 1500 स्थानीय «ताकातो कोहिगन» चेरी पेड़ों का घर है, जो अप्रैल आरम्भ-मध्य में हल्के गुलाबी खिलते हैं और «आसमान के नीचे सर्वश्रेष्ठ चेरी» की उपाधि पाते हैं। केंद्रीय आल्प्स की पृष्ठभूमि के साथ रात की रोशनी सपने जैसी।`,
      "駒つなぎの桜": `आची गाँव में 400+ साल पुराना एडोहिगन चेरी पेड़। किंवदंती है कि मिनामोतो नो योशित्सुने ने यहाँ अपना घोड़ा बाँधा था। सीढ़ीनुमा धान के खेतों के पास अकेला, अप्रैल मध्य-अंत में पूर्ण खिलाव में, तारों के नीचे इसका प्रतिबिंब नागानो का प्रतिष्ठित एकल वृक्ष।`,
      "長野県天空の楽園": `नागानो का आची गाँव पर्यावरण मंत्रालय द्वारा «जापान का सबसे सितारा-भरा आसमान» प्रमाणित। रात्रि टूर «तेन्कू नो राकूएन» गोंडोला से 1,400 मीटर ऊँचाई पर फुजिमिदाइ हाइलैंड्स ले जाता है, जहाँ प्रकाश-प्रदूषण रहित आसमान तारों से भर जाता है।`,
    },
  },
  th: {
    prefectures: {
      "山梨県": `ยามานาชิตั้งอยู่บริเวณเชิงเขาฟูจิทางทิศเหนือ ทะเลสาบฟูจิห้าสาย สามชั้นภาพของสวนอาราคุระยามะ เซ็งเก็น (เจดีย์ + ซากุระ + ฟูจิ) ศาลเจ้าทาเคดะ และไร่องุ่นโคชู กำหนดอัตลักษณ์คู่ขนาน: จุดชมฟูจิที่ดีที่สุด และดินแดนแห่งผลไม้และไวน์ 13 ภาพ`,
      "長野県": `นากาโน คือหัวใจของเทือกเขาแอลป์ญี่ปุ่น ปราสาทมัตสึโมโตะ (สมบัติของชาติ) สวนปราสาททาคาโตะ (หนึ่งในสามแหล่งซากุระที่ดีที่สุดของญี่ปุ่น) คามิโคจิ ลิงหิมะจิโกคุดานิ คารุอิซาวะ และ «ท้องฟ้าดาวที่สวยที่สุดในญี่ปุ่น» ของหมู่บ้านอาจิ รวมขุนเขา ประวัติศาสตร์ และดาราศาสตร์ 13 ภาพ`,
    },
    locations: {
      "新倉山浅間公園": `สวนอาราคุระยามะ เซ็งเก็น ในฟูจิโยชิดะ ให้ทัศนียภาพที่เป็นสัญลักษณ์ของญี่ปุ่นที่สุด: บันได 398 ขั้นนำสู่จุดชมวิวที่เจดีย์ชูเรอิโต ดอกซากุระ และภูเขาฟูจิเรียงตัวในเฟรมเดียว ดอกบานเต็มที่กลางเดือนเมษายน`,
      "河口湖": `ทะเลสาบคาวากุจิ หนึ่งในห้าทะเลสาบฟูจิ เป็นจุดที่โด่งดังที่สุดสำหรับ «ฟูจิกลับหัว» ที่สะท้อนในน้ำ ซากุระในฤดูใบไม้ผลิ ดอกไม้ไฟในฤดูร้อน ทางเดินเมเปิ้ลในฤดูใบไม้ร่วง และฟูจิหิมะในฤดูหนาว: ความงามแห่งฤดูกาลครบถ้วน`,
      "松本城": `ปราสาทมัตสึโมโตะเป็นสมบัติของชาติและหนึ่งใน 12 ปราสาทดั้งเดิมของญี่ปุ่น กำแพงสีดำสนิททำให้ได้ฉายา «ปราสาทอีกา» สันเขาขาวของแอลป์เหนือด้านหลังและคูเมืองสะท้อนภาพมอบความงามทั้งสี่ฤดู`,
      "高遠城址公園": `สวนปราสาททาคาโตะในอินะเป็นที่อยู่ของซากุระสายพันธุ์เฉพาะถิ่น «ทาคาโตะ โคฮิงัน» ราว 1,500 ต้น บานสีชมพูอ่อนต้นถึงกลางเมษายน ได้ฉายา «ซากุระอันดับหนึ่งใต้สวรรค์» การเปิดไฟยามค่ำคืนใน «เทศกาลซากุระ» กับเทือกเขาแอลป์กลางเป็นฉากหลังเหมือนความฝัน`,
      "駒つなぎの桜": `ต้นซากุระเอโดะฮิกังอายุกว่า 400 ปีในหมู่บ้านอาจิ ตำนานว่ามินาโมโตะ โนะ โยชิสึเนะผูกม้าไว้ที่นี่ โดดเดี่ยวข้างนาขั้นบันได ในยามบานเต็มที่กลางถึงปลายเมษายน เงาสะท้อนใต้แสงดาวทำให้เป็นต้นซากุระโดดเดี่ยวอันเป็นสัญลักษณ์ของนากาโน`,
      "長野県天空の楽園": `หมู่บ้านอาจิในนากาโนได้รับการรับรองจากกระทรวงสิ่งแวดล้อมว่าเป็น «ท้องฟ้าดาวที่สวยที่สุดในญี่ปุ่น» ทัวร์กลางคืน «เทนคุโนะระคุเอ็น» พาขึ้นกระเช้าสู่ที่ราบสูงฟูจิมิไดที่ 1,400 ม. ที่ท้องฟ้าปลอดมลภาวะแสงเต็มไปด้วยดาว`,
    },
  },
  vi: {
    prefectures: {
      "山梨県": `Yamanashi nằm ở chân phía bắc núi Phú Sĩ. Năm hồ Phú Sĩ, bố cục ba tầng của Công viên Arakurayama Sengen (chùa + hoa anh đào + Phú Sĩ), đền Takeda và vườn nho Koshu xác định danh tính kép: điểm ngắm Phú Sĩ tuyệt nhất và vùng đất trái cây và rượu vang. 13 ảnh.`,
      "長野県": `Nagano là trái tim của dãy Alps Nhật Bản. Lâu đài Matsumoto (Quốc bảo), Công viên thành Takato (một trong ba điểm ngắm hoa anh đào tuyệt nhất Nhật Bản), Kamikochi, khỉ tuyết Jigokudani, Karuizawa và «bầu trời sao đẹp nhất Nhật Bản» của làng Achi kết hợp núi non, lịch sử và thiên văn. 13 ảnh.`,
    },
    locations: {
      "新倉山浅間公園": `Công viên Arakurayama Sengen ở Fujiyoshida mang đến một trong những cảnh quan biểu tượng nhất của Nhật Bản: 398 bậc dẫn lên đài quan sát nơi chùa Chureito, hoa anh đào và núi Phú Sĩ thẳng hàng trong một khung hình. Đỉnh nở giữa tháng Tư.`,
      "河口湖": `Hồ Kawaguchi, một trong Năm hồ Phú Sĩ, là nơi nổi tiếng nhất cho «Phú Sĩ ngược» phản chiếu trên mặt nước. Hoa anh đào mùa xuân, pháo hoa mùa hè, hành lang phong mùa thu và Phú Sĩ tuyết mùa đông: vẻ đẹp bốn mùa trọn vẹn.`,
      "松本城": `Lâu đài Matsumoto là Quốc bảo và một trong 12 lâu đài nguyên bản của Nhật Bản. Tường đen tuyền khiến nó được gọi là «Lâu đài Quạ». Đỉnh trắng của Alps Bắc phía sau và hào nội phản chiếu mang lại vẻ đẹp bốn mùa.`,
      "高遠城址公園": `Công viên thành Takato ở Ina là nơi của khoảng 1.500 cây hoa anh đào bản địa «Takato Kohigan» nở hồng nhạt đầu-giữa tháng Tư, giành danh hiệu «hoa anh đào số một dưới bầu trời». Đèn đêm trong «Lễ hội Sakura» với Alps Trung làm phông nền như giấc mơ.`,
      "駒つなぎの桜": `Cây hoa anh đào Edohigan hơn 400 tuổi ở làng Achi. Truyền thuyết kể rằng Minamoto no Yoshitsune đã buộc ngựa ở đây. Cô đơn bên ruộng bậc thang, nở rộ giữa-cuối tháng Tư, bóng phản chiếu dưới sao là cây hoa anh đào đơn độc biểu tượng của Nagano.`,
      "長野県天空の楽園": `Làng Achi ở Nagano được Bộ Môi trường chứng nhận là «bầu trời sao đẹp nhất Nhật Bản». Tour đêm «Tenku no Rakuen» đi gondola lên cao nguyên Fujimidai cao 1.400 m, nơi bầu trời không ô nhiễm ánh sáng đầy sao.`,
    },
  },
  id: {
    prefectures: {
      "山梨県": `Yamanashi terletak di kaki utara Gunung Fuji. Lima Danau Fuji, komposisi tiga tingkat Taman Arakurayama Sengen (pagoda + sakura + Fuji), kuil Takeda dan kebun anggur Koshu mendefinisikan identitas gandanya: titik pandang Fuji terbaik dan negeri buah dan anggur. 13 foto.`,
      "長野県": `Nagano adalah jantung Pegunungan Alpen Jepang. Kastil Matsumoto (Pusaka Nasional), Taman Kastil Takato (salah satu dari tiga lokasi sakura terbaik Jepang), Kamikochi, monyet salju Jigokudani, Karuizawa dan «langit berbintang terbaik Jepang» di desa Achi menyatukan gunung, sejarah dan astronomi. 13 foto.`,
    },
    locations: {
      "新倉山浅間公園": `Taman Arakurayama Sengen di Fujiyoshida menawarkan salah satu pemandangan paling ikonik di Jepang: 398 anak tangga menuju dek pengamatan tempat pagoda Chureito, sakura dan Gunung Fuji sejajar dalam satu bingkai. Mekar penuh pertengahan April.`,
      "河口湖": `Danau Kawaguchi, salah satu Lima Danau Fuji, adalah tempat paling terkenal untuk «Fuji terbalik» yang terpantul di air. Sakura di musim semi, kembang api di musim panas, koridor maple di musim gugur dan Fuji bersalju di musim dingin: keindahan musiman lengkap.`,
      "松本城": `Kastil Matsumoto adalah Pusaka Nasional dan salah satu dari 12 kastil asli Jepang. Tembok hitamnya membuatnya dijuluki «Kastil Gagak». Punggungan putih Alpen Utara di latar belakang dan parit cermin memberinya keindahan empat musim.`,
      "高遠城址公園": `Taman Kastil Takato di Ina menampung sekitar 1.500 pohon sakura endemik «Takato Kohigan» yang mekar merah muda pucat awal-pertengahan April, menyandang gelar «sakura terbaik di bawah langit». Pencahayaan malam «Sakura Matsuri» dengan Alpen Tengah sebagai latar belakang bagai mimpi.`,
      "駒つなぎの桜": `Pohon sakura Edohigan berusia 400+ tahun di desa Achi. Menurut legenda, Minamoto no Yoshitsune mengikat kudanya di sini. Sendirian di tepi sawah berundak, dalam mekar penuh pertengahan-akhir April, pantulannya di bawah bintang adalah pohon sakura tunggal ikonik Nagano.`,
      "長野県天空の楽園": `Desa Achi di Nagano disertifikasi oleh Kementerian Lingkungan Hidup sebagai «langit berbintang terbaik Jepang». Tur malam «Tenku no Rakuen» naik gondola ke dataran tinggi Fujimidai pada 1.400 m, tempat langit bebas polusi cahaya dipenuhi bintang.`,
    },
  },
  tr: {
    prefectures: {
      "山梨県": `Yamanashi, Fuji Dağı'nın kuzey eteklerinde yer alır. Fuji Beş Gölü, Arakurayama Sengen Parkı'nın üç katmanlı kompozisyonu (pagoda + kiraz çiçeği + Fuji), Takeda Tapınağı ve Koshu üzüm bağları, çift kimliğini tanımlar: en iyi Fuji manzara noktası ve meyve-şarap diyarı. 13 fotoğraf.`,
      "長野県": `Nagano, Japon Alpleri'nin kalbidir. Matsumoto Kalesi (Ulusal Hazine), Takato Kalesi Parkı (Japonya'nın en iyi üç kiraz çiçeği yerinden biri), Kamikochi, Jigokudani'nin kar maymunları, Karuizawa ve Achi köyünün «Japonya'nın en yıldızlı göğü» dağ, tarih ve astronomiyi bir araya getirir. 13 fotoğraf.`,
    },
    locations: {
      "新倉山浅間公園": `Fujiyoshida'daki Arakurayama Sengen Parkı, Japonya'nın en ikonik manzaralarından birini sunar: 398 basamak, Chureito Pagodası, kiraz çiçekleri ve Fuji Dağı'nın tek bir karede hizalandığı bir gözetleme platformuna çıkar. Tam çiçeklenme Nisan ortası.`,
      "河口湖": `Fuji Beş Gölü'nden biri olan Kawaguchi Gölü, suya yansıyan «ters Fuji» için en ünlü yerdir. İlkbaharda kiraz çiçekleri, yazın havai fişek, sonbaharda akçaağaç koridoru ve kışın karlı Fuji: tam mevsimsel güzellik.`,
      "松本城": `Matsumoto Kalesi Ulusal Hazine ve Japonya'nın 12 orijinal kalesinden biridir. Siyah duvarları ona «Karga Kalesi» lakabını kazandırmıştır. Arka plandaki Kuzey Alpleri'nin beyaz sırtları ve ayna iç hendek, ona dört mevsim güzelliği verir.`,
      "高遠城址公園": `Ina'daki Takato Kalesi Parkı, Nisan başı-ortası soluk pembe açan yaklaşık 1.500 endemik «Takato Kohigan» kiraz ağacına ev sahipliği yapar; «göğün altındaki en iyi kiraz çiçeği» unvanını kazanır. Orta Alpler arka planda «Sakura Matsuri» nin gece aydınlatması rüya gibidir.`,
      "駒つなぎの桜": `Achi köyünde 400+ yıllık Edohigan kiraz ağacı. Efsaneye göre Minamoto no Yoshitsune atını burada bağlamıştır. Teraslı pirinç tarlalarının yanında yalnız, Nisan ortası-sonu tam çiçeklenmede, yıldızların altındaki yansıması Nagano'nun ikonik tek ağacıdır.`,
      "長野県天空の楽園": `Nagano'daki Achi köyü, Çevre Bakanlığı tarafından «Japonya'nın en yıldızlı göğü» olarak sertifikalandırılmıştır. Gece turu «Tenku no Rakuen» gondolla 1.400 m yükseklikteki Fujimidai yaylasına çıkar, ışık kirliliği olmayan gök yıldızlarla dolar.`,
    },
  },
  nl: {
    prefectures: {
      "山梨県": `Yamanashi ligt aan de noordvoet van de Fuji. De Vijf Fuji-meren, de drielaagse compositie van het Arakurayama Sengen Park (pagode + kersenbloesem + Fuji), het Takeda-heiligdom en de Koshu-wijngaarden definiëren zijn dubbele identiteit: beste Fuji-uitzicht en land van fruit en wijn. 13 foto's.`,
      "長野県": `Nagano is het hart van de Japanse Alpen. Matsumoto Kasteel (Nationale Schat), Takato Kasteelpark (een van de drie beste kersenbloesemplekken van Japan), Kamikochi, de sneeuwapen van Jigokudani, Karuizawa en de «sterrenhemel nr. 1 van Japan» van het dorp Achi verenigen berg, geschiedenis en astronomie. 13 foto's.`,
    },
    locations: {
      "新倉山浅間公園": `Het Arakurayama Sengen Park in Fujiyoshida biedt een van de meest iconische uitzichten van Japan: 398 traptreden leiden naar een uitkijkdek waar de Chureito-pagode, kersenbloesems en de Fuji in één frame uitlijnen. Volle bloei half april.`,
      "河口湖": `Het Kawaguchimeer, een van de Vijf Fuji-meren, is de beroemdste plek voor de «omgekeerde Fuji» weerspiegeld in het water. Kersenbloesems in de lente, vuurwerk in de zomer, esdoorncorridor in de herfst en besneeuwde Fuji in de winter: volledige seizoenspracht.`,
      "松本城": `Matsumoto Kasteel is Nationale Schat en een van de 12 originele kastelen van Japan. Zijn pikzwarte muren leverden de bijnaam «Kraaienkasteel» op. De witte kammen van de Noordelijke Alpen op de achtergrond en de spiegelende binnengracht geven het vierseizoenenpracht.`,
      "高遠城址公園": `Het Takato Kasteelpark in Ina herbergt zo'n 1.500 endemische «Takato Kohigan» kersenbomen die begin-half april zachtroze bloeien en de titel «beste kersenbloesem onder de hemel» verdienen. De avondverlichting van het «Sakura Matsuri» met de Centrale Alpen op de achtergrond is droomachtig.`,
      "駒つなぎの桜": `Edohigan-kersenboom van meer dan 400 jaar in het dorp Achi. Volgens de legende bond Minamoto no Yoshitsune hier zijn paard vast. Solitair naast terrasrijstvelden, in volle bloei half-eind april, weerspiegeld onder de sterren — een iconische solitaire boom van Nagano.`,
      "長野県天空の楽園": `Het dorp Achi in Nagano is door het Ministerie van Milieu gecertificeerd als de «sterrenhemel nr. 1 van Japan». De nachtrondleiding «Tenku no Rakuen» gaat met een gondel naar het Fujimidai-hoogland op 1.400 m, waar een hemel zonder lichtvervuiling vol sterren staat.`,
    },
  },
  pl: {
    prefectures: {
      "山梨県": `Yamanashi leży u północnego podnóża góry Fuji. Pięć Jezior Fuji, trzypoziomowa kompozycja Parku Arakurayama Sengen (pagoda + kwitnące wiśnie + Fuji), świątynia Takeda i winnice Koshu określają jego podwójną tożsamość: najlepszy punkt widokowy na Fuji oraz kraina owoców i wina. 13 zdjęć.`,
      "長野県": `Nagano to serce Alp Japońskich. Zamek Matsumoto (Skarb Narodowy), Park Zamku Takato (jedno z trzech najlepszych miejsc kwitnienia wiśni w Japonii), Kamikochi, śniegowe małpy z Jigokudani, Karuizawa i «najgwiezdniejsze niebo Japonii» wioski Achi łączą góry, historię i astronomię. 13 zdjęć.`,
    },
    locations: {
      "新倉山浅間公園": `Park Arakurayama Sengen w Fujiyoshidzie oferuje jedną z najbardziej ikonicznych panoram Japonii: 398 stopni prowadzi do platformy widokowej, gdzie pagoda Chureito, kwitnące wiśnie i Fuji ustawiają się w jednym kadrze. Pełnia kwitnienia w połowie kwietnia.`,
      "河口湖": `Jezioro Kawaguchi, jedno z Pięciu Jezior Fuji, to najsłynniejsze miejsce dla «odwróconej Fuji» odbijającej się w wodzie. Wiśnie wiosną, fajerwerki latem, korytarz klonów jesienią i ośnieżona Fuji zimą: pełnia sezonowego piękna.`,
      "松本城": `Zamek Matsumoto to Skarb Narodowy i jeden z 12 oryginalnych zamków Japonii. Jego smolisto czarne mury dały mu przydomek «Kruczy Zamek». Białe grzbiety Alp Północnych w tle i lustrzana fosa wewnętrzna nadają mu czteroporowe piękno.`,
      "高遠城址公園": `Park Zamku Takato w Inie mieści około 1.500 endemicznych wiśni «Takato Kohigan», które kwitną delikatnym różem na początku-w połowie kwietnia, zdobywając tytuł «najlepszej wiśni pod niebem». Nocne oświetlenie «Sakura Matsuri» z Alpami Centralnymi w tle jest jak ze snu.`,
      "駒つなぎの桜": `Wiśnia Edohigan licząca ponad 400 lat we wsi Achi. Według legendy Minamoto no Yoshitsune przywiązał tu konia. Samotna obok tarasowych pól ryżowych, w pełnym rozkwicie w połowie-końcu kwietnia, jej odbicie pod gwiazdami to ikoniczne pojedyncze drzewo Nagano.`,
      "長野県天空の楽園": `Wieś Achi w Nagano jest certyfikowana przez Ministerstwo Środowiska jako «najgwiezdniejsze niebo Japonii». Nocna wycieczka «Tenku no Rakuen» wyciągiem gondolowym na płaskowyż Fujimidai na wysokości 1.400 m, gdzie niebo bez zanieczyszczenia świetlnego wypełnia się gwiazdami.`,
    },
  },
  sv: {
    prefectures: {
      "山梨県": `Yamanashi ligger vid Fujis norra fot. Fujis fem sjöar, trenivåkompositionen i Arakurayama Sengen-parken (pagod + körsbärsblommor + Fuji), Takeda-helgedomen och Koshus vingårdar definierar dess dubbla identitet: bästa Fuji-utsikten och frukt- och vinland. 13 foton.`,
      "長野県": `Nagano är hjärtat av de japanska Alperna. Matsumoto slott (Nationalskatt), Takato slottspark (en av Japans tre bästa körsbärsplatser), Kamikochi, snöaporna i Jigokudani, Karuizawa och Achi-byns «Japans stjärnrikaste himmel» förenar berg, historia och astronomi. 13 foton.`,
    },
    locations: {
      "新倉山浅間公園": `Arakurayama Sengen-parken i Fujiyoshida erbjuder en av Japans mest ikoniska vyer: 398 trappsteg leder upp till en utsiktsplattform där Chureito-pagoden, körsbärsblommorna och berget Fuji linjerar i en enda bildruta. Full blom i mitten av april.`,
      "河口湖": `Kawaguchisjön, en av Fujis fem sjöar, är den mest kända platsen för den «omvända Fujin» som speglas i vattnet. Körsbärsblommor på våren, fyrverkerier på sommaren, lönnkorridor på hösten och snötäckt Fuji på vintern: full säsongsskönhet.`,
      "松本城": `Matsumoto slott är Nationalskatt och en av Japans 12 ursprungliga borgar. Dess kolsvarta murar gav det smeknamnet «Kråkborg». De vita kammarna av Norra Alperna i bakgrunden och den spegelblanka inre vallgraven ger det skönhet i alla fyra årstider.`,
      "高遠城址公園": `Takato slottspark i Ina huserar cirka 1.500 endemiska «Takato Kohigan»-körsbärsträd som blommar svagt rosa i början-mitten av april och vinner titeln «bästa körsbärsblom under himlen». Kvällsbelysningen vid «Sakura Matsuri» med Centrala Alperna i bakgrunden är drömlik.`,
      "駒つなぎの桜": `Edohigan-körsbärsträd över 400 år gammalt i byn Achi. Enligt legenden band Minamoto no Yoshitsune sin häst här. Ensamt vid terrasserade risfält, i full blom i mitten-slutet av april, dess spegling under stjärnorna är ett ikoniskt enskilt träd i Nagano.`,
      "長野県天空の楽園": `Byn Achi i Nagano är certifierad av Miljöministeriet som «Japans stjärnrikaste himmel». Nattturen «Tenku no Rakuen» åker gondol upp till Fujimidai-höglandet på 1.400 m, där en himmel utan ljusföroreningar fylls av stjärnor.`,
    },
  },
};

const LANGS = Object.keys(T);
let totalAdded = 0;

for (const lang of LANGS) {
  const path = resolve(EXTRAS_DIR, `${lang}.js`);
  let content = readFileSync(path, "utf-8");
  const data = T[lang];

  // Insert prefectures at end of prefectures section (before "  },\n  locations: {")
  const prefBlock = Object.entries(data.prefectures)
    .map(([k, v]) => `    "${k}": \`${v}\`,`)
    .join("\n");
  const prefMarker = "  },\n  locations: {";
  if (!content.includes(prefMarker)) {
    console.error(`✗ ${lang}: prefectures-end marker not found`);
    continue;
  }
  content = content.replace(prefMarker, `${prefBlock}\n  },\n  locations: {`);

  // Insert locations at end of locations section (before "  },\n};")
  const locBlock = Object.entries(data.locations)
    .map(([k, v]) => `    "${k}": \`${v}\`,`)
    .join("\n");
  const locMarker = "  },\n};";
  const lastIdx = content.lastIndexOf(locMarker);
  if (lastIdx === -1) {
    console.error(`✗ ${lang}: locations-end marker not found`);
    continue;
  }
  content = content.slice(0, lastIdx) + `${locBlock}\n  },\n};` + content.slice(lastIdx + locMarker.length);

  writeFileSync(path, content, "utf-8");
  const added = Object.keys(data.prefectures).length + Object.keys(data.locations).length;
  totalAdded += added;
  console.log(`✓ ${lang}.js: +${added} entries`);
}

console.log(`\n=== ${LANGS.length}言語 × 8エントリ = 計${totalAdded}エントリ追加 ===`);
