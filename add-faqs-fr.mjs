#!/usr/bin/env node
/** French FAQs を extras/fr.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FR_PATH = resolve(__dirname, "app", "content", "extras", "fr.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Quelle est la meilleure saison pour photographier Hokkaido ?", a: "Février pour le Festival de la neige de Sapporo et la glace dérivante, juillet pour la lavande de Furano, octobre pour le feuillage automnal, et janvier-mars pour la glace dérivante de Shiretoko. Adaptez votre sujet à sa saison phare." },
    { q: "Quels sont les principaux lieux photographiques à Hokkaido ?", a: "Paysages urbains de Sapporo, canal d'Otaru, champs de fleurs de Furano, lac Mashu, lac Toya, péninsule de Shiretoko, vallée de l'Enfer de Noboribetsu, zoo d'Asahiyama et collines ondulées de Biei : chaque zone offre un caractère visuel distinct." },
  ],
  "千葉県": [{ q: "Quels types de photographie offre Chiba ?", a: "Côtes, paysages ruraux de Boso et faune/aquariums : un mélange diversifié près de la métropole." }],
  "東京都": [{ q: "Conseils pour la photographie nocturne à Tokyo ?", a: "Trépied, ISO bas et longue exposition. L'heure bleue (30 min après le coucher) équilibre le mieux ciel et lumières urbaines." }],
  "神奈川県": [{ q: "Meilleure façon de visiter Kamakura et Yokohama ?", a: "Le matin dans les temples de Kamakura (Grand Bouddha, Hasedera), puis l'après-midi à Yokohama pour le coucher de soleil sur Minato Mirai et les paysages nocturnes du Red Brick Warehouse." }],
  "石川県": [{ q: "Que photographier à Kanazawa en une journée ?", a: "Tôt le matin à Kenrokuen (lumière douce), puis le château de Kanazawa, Higashi Chaya (après-midi/soir), le marché Omicho, et terminer la journée avec la porte du tambour à la gare de Kanazawa la nuit." }],
  "山梨県": [{ q: "Meilleur endroit pour photographier le mont Fuji avec les cerisiers ?", a: "Le belvédère de la pagode Chureito au parc Arakurayama Sengen est mondialement célèbre. Après 398 marches, la pagode, les cerisiers et le mont Fuji s'alignent en un seul cadre. Pleine floraison début-mi-avril, le lever de soleil offrant la lumière la plus magique." }],
  "長野県": [{ q: "Quand fleurissent les cerisiers du parc du château de Takato ?", a: "Début à mi-avril. Environ 1 500 cerisiers «Takato Kohigan» fleurissent en rose pâle, gagnant le titre de «meilleur cerisier sous le ciel». L'illumination nocturne est onirique, et le matin tôt évite les foules." }],
  "岐阜県": [{ q: "Quand est l'illumination hivernale de Shirakawa-go ?", a: "Tenue sur un nombre limité de jours (typiquement ~6) en janvier-février. Réservation obligatoire ; planifiez à l'avance pour photographier les maisons gassho dans la neige depuis l'observatoire." }],
  "愛知県": [{ q: "Conseils pour bien photographier dans les zoos ?", a: "Une focale fixe rapide (p. ex. 50 mm f/1.8) floute l'arrière-plan ; appuyez l'objectif contre le grillage pour le faire disparaître. Faites la mise au point sur les yeux de l'animal." }],
  "三重県": [
    { q: "Étiquette photographique à Ise Jingu ?", a: "L'intérieur des sanctuaires principaux est strictement interdit. Restez discret dans les torii, et évitez de photographier les fidèles ou prêtres directement." },
    { q: "Quand le soleil se lève-t-il entre les Meoto Iwa ?", a: "Seulement près du solstice d'été (mai-juillet) le soleil se lève directement entre les deux rochers. Début juin offre le meilleur taux de ciel dégagé ; arrivez avant l'aube." },
  ],
  "京都府": [
    { q: "Meilleur moment pour le feuillage automnal de Kyoto ?", a: "Le pic se situe généralement fin novembre-début décembre. Tofuku-ji (pont Tsuten-kyo), Eikando, Kiyomizu-dera et Arashiyama sont au mieux avec la lumière frontale du matin." },
    { q: "Comment éviter les foules ?", a: "Le matin tôt (6-8 h) est de loin le mieux. Kiyomizu-dera ouvre à 6 h, parcourez l'extérieur de Kinkaku-ji avant 9 h, et arrivez à Byodoin dès l'ouverture." },
  ],
  "兵庫県": [{ q: "Meilleurs spots pour le château de Himeji ?", a: "Façade Otemon, place Sannomaru (avec cerisiers), jardin Nishi-no-maru (vue latérale) et parc Otoko-yama (vue surélevée) sont les quatre classiques." }],
  "奈良県": [{ q: "Conseils pour photographier les cerfs à Nara ?", a: "Tenir un shika senbei les attire, mais ils partent une fois fini. La lumière à contre-jour matinale qui souligne leur pelage est une composition classique." }],
  "徳島県": [{ q: "Quand les tourbillons de Naruto sont-ils les plus grands ?", a: "Aux marées de vives-eaux (proche de la nouvelle ou pleine lune) en printemps/automne, autour de la haute/basse mer (±1-2 h). Vérifiez les tables des marées ; photographiez depuis les bateaux ou la passerelle du pont Onaruto." }],
  "香川県": [{ q: "Quelles conditions créent le miroir de Chichibugahama ?", a: "①Marée basse coïncidant avec le coucher du soleil ②Vent quasi nul ③Nuages au ciel (un ciel dégagé semble plat). Le tourisme de Mitoyo publie les dates optimales en ligne." }],
  "愛媛県": [{ q: "Puis-je photographier le bâtiment Dogo Onsen Honkan ?", a: "L'extérieur est totalement ouvert ; angles arrière et illumination nocturne recommandés. Certaines zones intérieures sont interdites pour la vie privée des baigneurs." }],
  "高知県": [{ q: "Conseils pour capter le bleu de Niko-buchi ?", a: "Vers midi par temps clair, quand la lumière directe atteint l'eau, le bleu est le plus intense. Un filtre polarisant approfondit la couleur en coupant les reflets de surface." }],
  "福岡県": [{ q: "Spots photo incontournables à Fukuoka ?", a: "Le chemin d'approche et le hall principal du Dazaifu Tenmangu, ainsi que le couloir de vues nocturnes Tour de Fukuoka–Plage Momochi–Bayside Place." }],
  "大分県": [{ q: "Où capter l'horizon de vapeur de Beppu ?", a: "L'observatoire Yukemuri à Kannawa Onsen. Les matins d'hiver produisent les colonnes de vapeur les plus denses grâce au contraste thermique." }],
  "沖縄県": [
    { q: "Meilleure saison pour Miyakojima ?", a: "Mai-septembre pour la transparence de l'eau (surtout juillet-août). Septembre est la saison des typhons. Décembre-février est frais et peu fréquenté mais avec des activités marines limitées." },
    { q: "Meilleure heure pour des prises de mer cristalline ?", a: "10 h-14 h, quand le soleil est haut et la lumière atteint le fond marin, crée le vert émeraude le plus intense. Un filtre polarisant est essentiel." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Comment accéder à Shiretoko ?", a: "Vol vers Memanbetsu ; Utoro Onsen (2 h en bus) est la porte d'entrée. Tours de glace dérivante en hiver, croisières et randonnée des Cinq Lacs en été." }],
  "札幌": [{ q: "Meilleure période pour visiter le centre de Sapporo ?", a: "Février (Festival de la neige), juin (Festival du lilas), octobre (feuillage), décembre (White Illumination). La ville change de visage toute l'année." }],
  "さっぽろ雪まつり": [{ q: "Meilleure heure pour photographier le festival ?", a: "L'illumination du coucher du soleil à 21 h est la plus photogénique — utilisez trépied et ISO bas pour conserver la texture de la neige. Le jour fonctionne avec un fond de ciel bleu." }],
  "小樽": [{ q: "Meilleur point photo le long du canal ?", a: "Entre le pont Asakusa et le pont Chuo — entrepôts, canal et lampes à gaz dans un seul cadre. L'heure bleue après le coucher est idéale." }],
  "洞爺湖": [{ q: "Conseils pour photographier les feux d'artifice ?", a: "Trépied obligatoire. ISO 100, f/8, pose B 4-8 s. La plate-forme du lac capte les feux avec leur reflet." }],
  "富良野": [{ q: "Meilleure heure pour les champs de lavande ?", a: "Tôt le matin avant 7 h pour une lumière douce et des foules minimales. La lumière frontale fait briller le violet. Vérifiez le statut de floraison auparavant." }],
  "宮古島": [{ q: "Meilleure saison pour Miyakojima ?", a: "Mai-septembre pour la clarté de l'eau (surtout juillet-août). Septembre est saison des typhons. Décembre-février est frais et moins fréquenté." }],
  "沖縄": [{ q: "Spots photo incontournables sur l'île principale d'Okinawa ?", a: "Ruines du château Shurijo, cap Zanpa, Manzamo, pont Kouri, aquarium Churaumi, village de poterie Yachimun et Kokusai-dori." }],
  "横浜": [{ q: "Meilleur point pour Minato Mirai ?", a: "Osanbashi pour la skyline complète au coucher ; Sakuragicho pour la grande roue ; Yamashita-koen pour le Red Brick Warehouse. L'heure bleue est optimale." }],
  "鎌倉": [{ q: "Quand sont les chrysanthèmes du Hasedera ?", a: "Environ du 1er au 23 novembre, avec illuminations nocturnes. Arrivez tôt pour éviter les files d'attente." }],
  "伊勢神宮": [{ q: "Étiquette photographique à Ise Jingu ?", a: "Zones intérieures strictement interdites. Discrétion dans les torii ; ne photographiez ni fidèles ni prêtres." }],
  "夫婦岩": [{ q: "Quand le soleil se lève-t-il entre les rochers ?", a: "Près du solstice (mai-juillet). Début juin offre le meilleur taux de ciel dégagé. Arrivez avant l'aube." }],
  "おはらい町・おかげ横丁": [{ q: "Meilleure heure pour photographier la rue ?", a: "Matin 8-10 h, avant l'afflux de visiteurs. La lumière latérale sur les maisons en bois est magnifique." }],
  "朝熊山展望台": [{ q: "Comment monter à l'observatoire ?", a: "Conduire par Ise-Shima Skyline (payant). Accès facile ; observation du mont Fuji possible par temps clair (rares)." }],
  "横山展望台": [{ q: "Meilleure heure pour Yokoyama ?", a: "Matin clair pour les détails des îles dans la baie d'Ago. Le coucher fonctionne aussi ; les plates-formes les plus hautes sont les meilleures." }],
  "清水寺": [{ q: "Quand a lieu l'illumination d'automne ?", a: "Mi-novembre à début décembre, 17 h 30-21 h. L'heure bleue après l'ouverture est la plus magique. Pas de trépied autorisé." }],
  "金閣寺": [{ q: "Meilleur moment pour photographier le Pavillon d'Or ?", a: "Matins clairs d'hiver avec neige sont iconiques ; automne et reflet dans l'étang aussi classiques. Arrivez à l'ouverture (9 h)." }],
  "平等院鳳凰堂": [{ q: "Conseils pour le reflet dans l'étang Aji ?", a: "Matins sans vent offrent une surface miroir. Arrivez à l'ouverture (8 h 30) ; utilisez le polarisant faiblement pour préserver le reflet." }],
  "東福寺": [{ q: "Meilleur moment pour photographier le pont Tsutenkyo ?", a: "Mi-novembre à début décembre. Ouverture à 8 h 30 ; suivez le flux unidirectionnel depuis le nord. Ne vous arrêtez pas sur le pont." }],
  "東寺": [{ q: "Conseils pour photographier la pagode à cinq étages ?", a: "Étang Hyotan-ike au coucher pour le reflet. Illumination nocturne pendant les saisons de cerisiers et automne." }],
  "八坂の塔": [{ q: "Meilleur point pour la pagode Yasaka ?", a: "Regarder la pente Yasaka-dori d'en bas est l'angle classique. 6-7 h presque sans touristes — idéal aussi pour portraits en kimono." }],
  "姫路城": [{ q: "Meilleur moment pour le château avec cerisiers ?", a: "Typiquement début avril. Place Sannomaru, jardin Nishi-no-maru et parc commémoratif Shirotopia sont classiques." }],
  "法隆寺": [{ q: "Règles de photographie ?", a: "Enceinte OK ; statues de Bouddha dans les halls majoritairement interdites. Pas de trépieds ni de flashes même en extérieur. Tôt le matin et fin d'après-midi sont plus calmes et doux." }],
  "法隆寺 夢殿": [{ q: "Quand est exposé le Guze Kannon ?", a: "Printemps : 11 avril-18 mai ; automne : 22 octobre-22 novembre. Photographie de la statue interdite." }],
  "鳴門海峡": [{ q: "Bateau ou passerelle ?", a: "Bateau pour l'intensité, passerelle pour la sécurité aérienne. Le sol vitré d'Uzu-no-Michi montre les tourbillons en dessous. En bateau, attendez-vous à des embruns." }],
  "大鳴門橋": [{ q: "Meilleur point pour le pont ?", a: "Michi-no-Eki Uzushio côté Awaji pour la meilleure vue d'ensemble. Le pont et le détroit illuminés au coucher sont magnifiques." }],
  "父母ヶ浜": [{ q: "Comment réserver le jour optimal ?", a: "Pas de réservation, mais le tourisme de Mitoyo publie un «Sky Mirror Calendar» avec les jours optimaux. Planifiez les jours où marée basse et coucher coïncident." }],
  "亀老山展望台": [{ q: "Comment s'y rendre ?", a: "Bus Shimanami Kaido depuis Imabari ou Fukuyama, ou à vélo. Parking proche du sommet." }],
  "来島海峡大橋": [{ q: "Meilleur point pour le pont ?", a: "Observatoire du mont Kiro (Oshima, Imabari) offre la vue définitive. Capturez le pont orangé au coucher et l'heure bleue après." }],
  "松山城": [{ q: "Funiculaire ou télésiège ?", a: "Si la météo le permet, le télésiège ouvert offre une meilleure immersion panoramique (5 min). Un billet combiné couvre les deux." }],
  "道後温泉": [{ q: "Puis-je photographier le Honkan ?", a: "Extérieur ouvert ; angles arrière et illumination nocturne recommandés. Certaines zones intérieures interdites pour la vie privée." }],
  "桂浜": [{ q: "Meilleur angle pour la statue de Ryoma ?", a: "Depuis un angle bas côté mer, en montant les marches derrière le piédestal — associe Ryoma au Pacifique en arrière-plan. Le coucher donne une silhouette saisissante." }],
  "高知城": [{ q: "Combien de temps pour monter ?", a: "Environ 15 min d'escaliers de l'entrée au donjon. La porte Otemon est un cadre classique pour cerisiers. Ne manquez pas la vue sur la ville depuis le donjon." }],
  "名越屋沈下橋": [{ q: "Meilleure saison ?", a: "Verts frais en mai, baignade estivale (juillet-août), feuillage automnal (oct-nov). Matins d'hiver avec brume aussi oniriques." }],
  "にこ淵": [{ q: "Quand le bleu est-il le plus fort ?", a: "Midi clair (10 h-14 h), surtout été-début automne. Après la pluie, la turbidité réduit l'effet — temps sec idéal. Apportez un filtre PL." }],
  "福岡": [{ q: "Étiquette photographique aux yatai ?", a: "Demandez d'abord aux personnels/clients. Gros plans après accord. Extérieurs et rues libres." }],
  "別府": [{ q: "Combien de temps pour le tour des Enfers ?", a: "Les 7 Enfers prennent 2-3 heures. Le billet combiné économise. Enfer de la Mer, du Bassin Sanguin et Tatsumaki sont les top-3." }],
  "湯布院": [{ q: "Conditions pour la brume matinale au lac Kinrin ?", a: "Matins clairs de novembre-mars sous 5°C — l'écart thermique entre eau thermale et air produit la brume. Plus dense de l'aube à une heure après." }],
  "白川郷": [{ q: "Photographier depuis l'observatoire ?", a: "L'observatoire des ruines du château Ogimachi domine tout le village — le classique. Brume automne-hiver, neige janvier-février, verts de mai : chacun un chef-d'œuvre." }],
  "美幌峠": [{ q: "Quand apparaît la mer de nuages ?", a: "Matins de septembre-novembre par jours clairs et sans vent avec grandes différences thermiques. Pic à environ 30 min autour du lever." }],
  "摩周湖": [{ q: "Quelles chances de voir le lac ?", a: "Taux annuel de visibilité ~30%. L'été est particulièrement brumeux ; hiver-printemps offrent une meilleure clarté. Visitez plusieurs observatoires pour augmenter vos chances." }],
  "阿寒": [{ q: "Puis-je voir des marimo ?", a: "Au Centre d'observation des marimo sur l'île Churui — accessible par bateau touristique." }],
  "三段滝公園": [{ q: "Quand voir les chutes gelées ?", a: "Mi-janvier à fin février uniquement, pendant le grand froid. Entièrement gelées, elles deviennent une sculpture de glace blanc-bleu." }],
  "室蘭": [{ q: "Meilleur point pour la vue nocturne d'usines ?", a: "Observatoire Iwaizumi, mont Sokuryo et pont Hakucho sont les trois classiques. Capturez le pont avec les lumières d'usine à l'heure bleue." }],
  "美唄": [{ q: "Qu'a de spécial Arte Piazza ?", a: "Musée de sculptures en plein air gratuit dans une école reconvertie. Œuvres en marbre blanc, école en bois et neige ensemble paraissent picturaux." }],
  "登別": [{ q: "Meilleur moment pour Jigokudani ?", a: "Matin pour lumière douce et vapeur visible. L'illumination nocturne (mai-octobre) est atmosphérique." }],
  "北竜町": [{ q: "Quand est la pleine floraison ?", a: "Typiquement de la première semaine au ~10 août. Cliché classique : panorama complet depuis l'observatoire. Lumière frontale matinale la plus vive." }],
  "東京": [{ q: "Conseils pour la photographie nocturne ?", a: "Trépied, ISO bas et longue exposition. L'heure bleue (30 min après le coucher) équilibre le mieux ciel et lumières urbaines." }],
  "品川": [{ q: "Spots près de la gare de Shinagawa ?", a: "Vue du Shinkansen depuis le pont piétonnier côté Takanawa, gratte-ciel côté Konan, couloir de verre Shinagawa Intercity et vue nocturne du canal à Tennozu Isle." }],
  "東山動物園": [{ q: "Conseils pour photographier les animaux ?", a: "Une focale fixe rapide (50 mm f/1.8) floute l'arrière-plan. Appuyez l'objectif contre le grillage pour le faire disparaître. Mise au point sur les yeux." }],
  "梅林公園": [{ q: "Quand est la pleine floraison ?", a: "Mi-février à début mars. Avec variétés précoces et tardives, fin février offre la plus grande diversité." }],
  "鳥羽水族館": [{ q: "Quand le dugong est-il le plus actif ?", a: "Près des heures de nourrissage (env. 11 h et 15 h). Il nage parfois jusqu'à la vitre — un moment précieux." }],
  "清水寺周辺": [{ q: "Meilleur point pour la pagode Yasaka ?", a: "Regarder la pente Yasaka-dori d'en bas est l'angle classique. 6-7 h presque sans touristes — idéal aussi pour portraits en kimono." }],
  "鴨川シーワールド": [{ q: "Conseils pour photographier les orques ?", a: "Vitesse 1/1000+ pour figer les éclaboussures ; mode rafale essentiel. Les premiers rangs se font tremper — choisissez les sièges avec soin." }],
  "旭山動物園": [{ q: "Horaires de la promenade des manchots ?", a: "Deux fois par jour de mi-décembre à mars — uniquement l'hiver, quand il y a de la neige. Le défilé des manchots royaux est un classique hivernal." }],
  "金沢": [{ q: "Spots photo à Kanazawa en une journée ?", a: "Kenrokuen à l'aube (lumière douce), château de Kanazawa, Higashi Chaya (après-midi/soir), marché Omicho, porte du tambour à la gare Kanazawa la nuit." }],
  "新倉山浅間公園": [{ q: "Comment atteindre le belvédère ?", a: "Gare Shimo-Yoshida (ligne Fujikyu), 10 min à pied jusqu'au sanctuaire, puis 398 marches (rampe plus douce disponible aussi). Arrivez 5-6 h pour éviter les foules et capter le lever sur Fuji." }],
  "河口湖": [{ q: "Meilleur endroit pour le reflet du Fuji inversé ?", a: "Parc Oishi et Ubuyagasaki sur la rive nord sont classiques. Visez les matins sans vent 6-8 h quand le lac est miroir. L'hiver offre l'air le plus clair et la meilleure transparence." }],
  "松本城": [{ q: "Comment cadrer le donjon avec les cerisiers et les Alpes ?", a: "Autour du pont Uzumi, côté nord-ouest des douves intérieures, est le mieux. Téléobjectif pour comprimer donjon et crêtes alpines, avec cerisiers de mi-avril en bokeh frontal. Matin offre un contre-jour doux." }],
  "高遠城址公園": [{ q: "Meilleure heure pour photographier les cerisiers de Takato ?", a: "Avant 6 h offre une lumière bleue sans foules. L'après-midi transite par l'heure bleue jusqu'à l'illumination, où la lumière chaude des lanternes rencontre les cerisiers roses." }],
  "駒つなぎの桜": [{ q: "Que faut-il pour le reflet dans la rizière ?", a: "Mi-fin avril, quand les rizières sont inondées pour la plantation, à un aube sans vent. Apportez trépied et objectif grand-angle à standard ; pour étoiles+cerisiers, un boîtier tolérant à haut ISO recommandé." }],
  "長野県天空の楽園": [{ q: "Meilleure période de l'année pour observer les étoiles ?", a: "Près de la nouvelle lune. L'hiver (nov-fév) donne les étoiles les plus nettes (Voie lactée plus faible). L'été est le meilleur pour le cœur de la Voie lactée. La visite nocturne nécessite réservation." }],
  "弘法山古墳": [{ q: "Comment accéder et où photographier ?", a: "Depuis la gare de Matsumoto, ~20 min en bus + ~20 min à pied jusqu'au sentier, puis 15-20 min de montée. L'aube offre un contre-jour doux sur les Alpes du Nord et évite les foules." }],
  "安養寺": [{ q: "Quand est la pleine floraison ?", a: "Mi-avril. Le matin offre des couleurs frontales et vives. Le soir donne des silhouettes saisissantes du hall et de l'arbre. Enceinte calme — photographiez avec respect." }],
  "松本市新村": [{ q: "Que voir près de la gare Niimura ?", a: "L'ancienne gare en bois Mitsumizo, rizières avec les Alpes, allées de cerisiers, brume matinale sur les champs — joyau caché alliant ferroviaire et paysage." }],
  "城山公園(松本市)": [{ q: "Meilleur cadrage depuis la place du belvédère ?", a: "Cadrage vertical avec cerisiers au premier plan et la crête alpine derrière est classique. L'«alpenglow» matinal (sommets enneigés rougissant à l'aube) avec sakura est le summum absolu." }],
  "中町通り(松本市)": [{ q: "Meilleure heure du jour pour photographier ?", a: "6-8 h offre des rues vides et des compositions propres des murs kura. Le soir, quand les lampadaires s'allument et les murs blancs se réchauffent en ambré, donne l'ambiance la plus nostalgique." }],
  "高島公園(諏訪市)": [{ q: "Meilleur point pour le reflet dans les douves ?", a: "Depuis le côté sud des douves, utilisez un téléobjectif pour comprimer donjon et cerisiers. Matins ou soirées sans vent donnent une eau miroir. Pendant l'illumination, l'heure bleue est la plus magique." }],
  "諏訪湖": [{ q: "Meilleurs spots photo autour du lac Suwa ?", a: "Parc Tateishi (vue aérienne), promenade lacustre (lac + ville), zone du Geyser Center (coucher), et la rive est où Yatsugatake se reflète. Les crêtes de glace Omiwatari apparaissent les matins de janvier-février." }],
  "立石公園": [{ q: "Conseils pour vue nocturne et étoiles ?", a: "Trépied essentiel. Vues nocturnes : ISO 200, f/8, 10-30 s. Étoiles : ISO 3200, f/2.8, ~15 s. Les 20-30 min après le coucher (heure magique) donnent le plus beau dégradé entre lumières urbaines et crépuscule." }],
};

let content = readFileSync(FR_PATH, "utf-8");
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
writeFileSync(FR_PATH, content, "utf-8");
console.log(`✓ fr.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
