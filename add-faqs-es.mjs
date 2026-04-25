#!/usr/bin/env node
/** Spanish FAQs を extras/es.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ES_PATH = resolve(__dirname, "app", "content", "extras", "es.js");

const PREF_FAQS = {
  "北海道": [
    { q: "¿Cuál es la mejor estación para fotografiar Hokkaido?", a: "Febrero para el Festival de la Nieve de Sapporo y el hielo a la deriva, julio para la lavanda en Furano, octubre para el follaje otoñal y enero-marzo para el hielo a la deriva en Shiretoko. Combina tu sujeto con su temporada estrella." },
    { q: "¿Cuáles son los principales lugares fotográficos en Hokkaido?", a: "Paisajes urbanos de Sapporo, canal de Otaru, campos floridos de Furano, Lago Mashu, Lago Toya, península de Shiretoko, Valle del Infierno de Noboribetsu, Zoo de Asahiyama y las colinas onduladas de Biei: cada zona ofrece un carácter visual distinto." },
  ],
  "千葉県": [
    { q: "¿Qué tipo de fotografía ofrece Chiba?", a: "Costas, paisajes rurales de Boso y fauna/acuarios — una mezcla diversa cerca de la metrópoli." },
  ],
  "東京都": [
    { q: "¿Consejos para fotografía nocturna en Tokio?", a: "Usa trípode, ISO bajo y exposición larga. La hora azul (30 min tras el ocaso) equilibra mejor el cielo y las luces de la ciudad." },
  ],
  "神奈川県": [
    { q: "¿Mejor manera de visitar Kamakura y Yokohama?", a: "Mañana en los templos de Kamakura (Gran Buda, Hasedera), luego por la tarde a Yokohama para el atardecer en Minato Mirai y los paisajes nocturnos del Almacén de Ladrillo Rojo." },
  ],
  "石川県": [
    { q: "¿Qué lugares puedo fotografiar en Kanazawa en un día?", a: "Temprano por la mañana en Kenrokuen (luz suave), luego el Castillo de Kanazawa, Higashi Chaya (tarde/noche), mercado Omicho y, al final, la Puerta del Tambor en la estación de Kanazawa de noche." },
  ],
  "山梨県": [
    { q: "¿Mejor lugar para fotografiar el Monte Fuji con cerezos?", a: "El mirador de la Pagoda Chureito, en el Parque Arakurayama Sengen, es famoso mundialmente. Tras subir 398 escalones, la pagoda, los cerezos y el Monte Fuji se alinean en un solo encuadre. La floración pico es a principios-mediados de abril, con el amanecer dando la luz más mágica." },
  ],
  "長野県": [
    { q: "¿Cuándo florecen los cerezos en el Parque del Castillo de Takato?", a: "Inicio-mediados de abril. Unos 1.500 cerezos «Takato Kohigan» florecen en rosa pálido, ganando el título de «mejor cerezo bajo el cielo». La iluminación nocturna es onírica, y la mañana temprano evita las multitudes." },
  ],
  "岐阜県": [
    { q: "¿Cuándo es la iluminación invernal de Shirakawa-go?", a: "Se celebra en un número limitado de días (típicamente ~6) en enero y febrero. Reservas obligatorias; planea con antelación para fotografiar las casas gassho en la nieve desde el observatorio." },
  ],
  "愛知県": [
    { q: "¿Consejos para fotografiar bien en zoológicos?", a: "Una óptica fija rápida (p. ej., 50 mm f/1.8) desenfoca el fondo; presiona la lente contra la malla para hacerla desaparecer. Enfoca los ojos del animal." },
  ],
  "三重県": [
    { q: "¿Etiqueta fotográfica en Ise Jingu?", a: "El interior de los santuarios principales está estrictamente prohibido. Mantén la fotografía discreta dentro de los torii y evita fotografiar a fieles o sacerdotes directamente." },
    { q: "¿Cuándo puedo fotografiar el amanecer entre las Meoto Iwa?", a: "Solo cerca del solsticio de verano (mayo-julio) el sol sale directamente entre las dos rocas. Principios de junio tiene la mejor tasa de cielo despejado; llega antes del amanecer." },
  ],
  "京都府": [
    { q: "¿Mejor momento para fotografiar el follaje otoñal de Kioto?", a: "El pico suele caer entre finales de noviembre y principios de diciembre. Tofuku-ji (puente Tsuten-kyo), Eikando, Kiyomizu-dera y Arashiyama lucen mejor con la luz frontal de la mañana." },
    { q: "¿Cómo evitar las multitudes?", a: "Madrugar (6-8 AM) es por mucho lo mejor. Kiyomizu-dera abre a las 6, recorre el exterior de Kinkaku-ji antes de las 9 y llega a Byodoin justo en la apertura." },
  ],
  "兵庫県": [
    { q: "¿Mejores puntos fotográficos para el Castillo de Himeji?", a: "Frente Otemon, Plaza Sannomaru (con cerezos), Jardín Nishi-no-maru (vista lateral) y Parque Otoko-yama (vista elevada) son los cuatro clásicos." },
  ],
  "奈良県": [
    { q: "¿Consejos para fotografiar con ciervos en Nara?", a: "Llevar shika senbei los atrae, pero se van cuando se acaba. La luz matinal a contraluz que resalta su pelaje es una composición clásica." },
  ],
  "徳島県": [
    { q: "¿Cuándo son más grandes los remolinos de Naruto?", a: "En las mareas vivas de primavera/otoño cercanas a luna nueva o llena, alrededor de pleamar/bajamar (±1-2 h). Consulta tablas de mareas; dispara desde barcos o desde la pasarela del puente Onaruto." },
  ],
  "香川県": [
    { q: "¿Qué condiciones crean el reflejo espejo de Chichibugahama?", a: "①Marea baja coincidiendo con el atardecer ②Viento casi nulo ③Nubes en el cielo (un cielo despejado luce plano). Turismo de Mitoyo publica las fechas óptimas en línea." },
  ],
  "愛媛県": [
    { q: "¿Puedo fotografiar el edificio Dogo Onsen Honkan?", a: "El exterior es totalmente abierto; ángulos traseros y tomas con iluminación nocturna se recomiendan. Algunas zonas interiores están restringidas para respetar la privacidad de los bañistas." },
  ],
  "高知県": [
    { q: "¿Consejos para captar el azul de Niko-buchi?", a: "Hacia mediodía en días despejados, cuando la luz solar directa alcanza el agua, el azul es más intenso. Un filtro polarizador profundiza el color cortando reflejos superficiales." },
  ],
  "福岡県": [
    { q: "¿Lugares fotográficos imprescindibles en Fukuoka?", a: "El sendero de aproximación y el salón principal del Dazaifu Tenmangu, además del corredor de vista nocturna Torre de Fukuoka–Playa Momochi–Bayside Place." },
  ],
  "大分県": [
    { q: "¿Dónde captar el horizonte de vapor de Beppu?", a: "El Mirador Yukemuri en Kannawa Onsen. Las mañanas de invierno producen las columnas de vapor más densas por el contraste térmico." },
  ],
  "沖縄県": [
    { q: "¿Mejor temporada para Miyakojima?", a: "Mayo-septiembre por la transparencia del agua (especialmente julio-agosto). Septiembre es temporada de tifones. Diciembre-febrero es fresco y poco concurrido pero con actividades marinas limitadas." },
    { q: "¿Mejor hora del día para tomas de mar transparente?", a: "10 AM-2 PM, cuando el sol está alto y la luz penetra hasta el lecho marino, crea el verde esmeralda más intenso. Un filtro polarizador es esencial." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "¿Cómo se accede a Shiretoko?", a: "Vuelo a Memanbetsu; Utoro Onsen (2 h en bus) es la puerta. Tours de hielo a la deriva en invierno, cruceros y caminata por los Cinco Lagos en verano." }],
  "札幌": [{ q: "¿Mejor época para visitar el centro de Sapporo?", a: "Febrero (Festival de la Nieve), junio (Festival de la Lila), octubre (follaje), diciembre (White Illumination). La ciudad cambia de cara todo el año." }],
  "さっぽろ雪まつり": [{ q: "¿Mejor hora del día para fotografiar el festival?", a: "La iluminación de la puesta de sol a las 21:00 es la más fotogénica — usa trípode e ISO bajo para retener la textura de la nieve. Diurno funciona con cielo azul de fondo." }],
  "小樽": [{ q: "¿Mejor punto fotográfico del canal?", a: "Entre el puente Asakusa y el puente Chuo — almacenes, canal y faroles de gas en un solo encuadre. La hora azul tras el atardecer es ideal." }],
  "洞爺湖": [{ q: "¿Consejos para fotografiar fuegos artificiales?", a: "Trípode obligatorio. ISO 100, f/8, exposición bulb 4-8 s. La plataforma del lago capta los fuegos con su reflejo." }],
  "富良野": [{ q: "¿Mejor hora para los campos de lavanda?", a: "Madrugada antes de las 7 AM por luz suave y multitudes mínimas. La luz frontal hace brillar el púrpura. Consulta el estado de floración antes." }],
  "宮古島": [{ q: "¿Mejor temporada para Miyakojima?", a: "Mayo-septiembre por claridad del agua (especialmente julio-agosto). Septiembre es temporada de tifones. Diciembre-febrero es fresco y menos concurrido." }],
  "沖縄": [{ q: "¿Lugares fotográficos imprescindibles en la isla principal de Okinawa?", a: "Ruinas del Castillo Shurijo, Cabo Zanpa, Manzamo, Puente Kouri, Acuario Churaumi, aldea de cerámica Yachimun y Kokusai-dori." }],
  "横浜": [{ q: "¿Mejor punto para Minato Mirai?", a: "Osanbashi para la línea del horizonte completa al atardecer; Sakuragicho para la noria; Yamashita-koen para el Almacén de Ladrillo Rojo. Hora azul es óptima." }],
  "鎌倉": [{ q: "¿Cuándo son los crisantemos del Hasedera?", a: "Aproximadamente del 1 al 23 de noviembre, con iluminaciones nocturnas. Llega temprano para evitar colas." }],
  "伊勢神宮": [{ q: "¿Etiqueta fotográfica en Ise Jingu?", a: "Áreas internas estrictamente fuera de límites. Discreto dentro de los torii; no fotografíes fieles ni sacerdotes." }],
  "夫婦岩": [{ q: "¿Cuándo sale el sol entre las rocas?", a: "Cerca del solsticio (mayo-julio). Principios de junio ofrece mejor tasa de cielo despejado. Llega antes del amanecer." }],
  "おはらい町・おかげ横丁": [{ q: "¿Mejor hora para fotografiar la calle?", a: "Mañana 8-10 AM, antes de la avalancha de visitantes. La luz lateral en las casas de madera es preciosa." }],
  "朝熊山展望台": [{ q: "¿Cómo subir al observatorio?", a: "Conducir por Ise-Shima Skyline (de pago). Acceso fácil; observación del Monte Fuji posible en días claros (raros)." }],
  "横山展望台": [{ q: "¿Mejor hora para Yokoyama?", a: "Mañana clara para detalles de las islas en la bahía Ago. Atardecer también funciona; las plataformas más altas son las mejores." }],
  "清水寺": [{ q: "¿Cuándo es la iluminación de otoño?", a: "Mediados de noviembre a primeros de diciembre, 17:30-21:00. La hora azul tras la apertura es lo más mágico. Sin trípode permitido." }],
  "金閣寺": [{ q: "¿Mejor momento para fotografiar el Pabellón Dorado?", a: "Mañanas claras de invierno con nieve son icónicas; otoño y reflejo en el estanque también clásicos. Llega justo a la apertura (9 AM)." }],
  "平等院鳳凰堂": [{ q: "¿Consejos para el reflejo en el estanque Aji?", a: "Mañanas sin viento ofrecen una superficie espejo. Llega a la apertura (8:30 AM); usa polarizador débilmente para preservar el reflejo." }],
  "東福寺": [{ q: "¿Mejor momento para fotografiar el puente Tsutenkyo?", a: "Mediados de noviembre a principios de diciembre. La apertura es a las 8:30; sigue el flujo unidireccional desde el norte. No pares en el puente." }],
  "東寺": [{ q: "¿Consejos para fotografiar la pagoda de cinco pisos?", a: "Estanque Hyotan-ike al atardecer para el reflejo. Iluminación nocturna durante temporadas de cerezo y otoño." }],
  "八坂の塔": [{ q: "¿Mejor punto para la pagoda Yasaka?", a: "Mirando hacia arriba la pendiente Yasaka-dori desde abajo es el ángulo clásico. 6-7 AM tiene casi cero turistas — ideal también para retratos en kimono." }],
  "姫路城": [{ q: "¿Mejor momento para el castillo con cerezos?", a: "Típicamente principios de abril. Plaza Sannomaru, Jardín Nishi-no-maru y Parque Memorial Shirotopia son clásicos." }],
  "法隆寺": [{ q: "¿Reglas de fotografía?", a: "Recinto OK; estatuas de Buda en las salas mayoritariamente prohibidas. Sin trípodes ni flashes incluso al aire libre. Madrugada y atardecer son más tranquilos y suaves." }],
  "法隆寺 夢殿": [{ q: "¿Cuándo se exhibe el Guze Kannon?", a: "Primavera: 11 abril-18 mayo; otoño: 22 octubre-22 noviembre. Prohibida la fotografía de la estatua." }],
  "鳴門海峡": [{ q: "¿Barco o pasarela?", a: "Barco para intensidad, pasarela para seguridad. El piso de cristal de Uzu-no-Michi muestra los remolinos abajo. En barco hay rocío." }],
  "大鳴門橋": [{ q: "¿Mejor punto para el puente?", a: "Michi-no-Eki Uzushio en el lado Awaji. El puente y el estrecho brillando al atardecer es bellísimo." }],
  "父母ヶ浜": [{ q: "¿Cómo reservar el día óptimo?", a: "Sin reserva, pero Turismo de Mitoyo publica un «Sky Mirror Calendar» con días óptimos. Planea para días en que coinciden marea baja y atardecer." }],
  "亀老山展望台": [{ q: "¿Cómo llegar?", a: "Bus Shimanami Kaido desde Imabari o Fukuyama, o en bicicleta. Estacionamiento cercano a la cima." }],
  "来島海峡大橋": [{ q: "¿Mejor punto para el puente?", a: "Mirador del Monte Kiro (Oshima, Imabari) ofrece la vista definitiva. Capta el puente naranja al atardecer y la hora azul después." }],
  "松山城": [{ q: "¿Funicular o silla?", a: "Si el clima permite, la silla abierta ofrece mejor inmersión panorámica (5 min). Un boleto combinado cubre ambos." }],
  "道後温泉": [{ q: "¿Puedo fotografiar el Honkan?", a: "Exterior abierto; ángulos traseros e iluminación nocturna recomendados. Algunas áreas interiores prohibidas por privacidad." }],
  "桂浜": [{ q: "¿Mejor ángulo para la estatua de Ryoma?", a: "Desde ángulo bajo en la orilla, subiendo escaleras tras el pedestal — combina a Ryoma con el Pacífico de fondo. Atardecer da una silueta impactante." }],
  "高知城": [{ q: "¿Cuánto se tarda en subir?", a: "Unos 15 min de escaleras desde la entrada al torreón. La puerta Otemon es un marco clásico para cerezos. No te pierdas la vista de la ciudad desde el torreón." }],
  "名越屋沈下橋": [{ q: "¿Mejor temporada?", a: "Verdes frescos en mayo, baño veraniego (julio-ago), follaje otoñal (oct-nov). Mañanas invernales con niebla también oníricas." }],
  "にこ淵": [{ q: "¿Cuándo es más fuerte el azul?", a: "Mediodía claro (10 AM-2 PM), especialmente verano-principios de otoño. Tras lluvia, la turbidez reduce el efecto — clima seco ideal. Usa filtro PL." }],
  "福岡": [{ q: "¿Etiqueta fotográfica en yatai?", a: "Pregunta primero al personal/clientes. Primeros planos solo tras pedir permiso. Exteriores y calles libres." }],
  "別府": [{ q: "¿Cuánto dura el tour de los Infiernos?", a: "Los 7 Infiernos toman 2-3 horas. El boleto combinado ahorra dinero. Infierno del Mar, del Estanque de Sangre y Tatsumaki son los top-3." }],
  "湯布院": [{ q: "¿Condiciones para la niebla matinal en el lago Kinrin?", a: "Mañanas claras de noviembre-marzo con menos de 5°C — la diferencia térmica entre agua termal y aire produce niebla. Más densa desde antes del amanecer hasta una hora después." }],
  "白川郷": [{ q: "¿Disparar desde el observatorio?", a: "El Mirador de las Ruinas del Castillo Ogimachi domina toda la aldea — el clásico. Niebla otoño-invierno, nieve enero-febrero, verde de mayo: cada uno una obra maestra." }],
  "美幌峠": [{ q: "¿Cuándo aparece el mar de nubes?", a: "Mañanas septiembre-noviembre en días claros y sin viento con grandes brechas térmicas. Pico aproximadamente 30 min alrededor del amanecer." }],
  "摩周湖": [{ q: "¿Probabilidad de ver el lago?", a: "Tasa anual de visibilidad ~30%. Verano especialmente brumoso; invierno-primavera mejor claridad. Visita varios miradores para aumentar oportunidades." }],
  "阿寒": [{ q: "¿Puedo ver marimo?", a: "En el Centro de Observación de Marimo en la isla Churui — accesible por barco turístico." }],
  "三段滝公園": [{ q: "¿Cuándo ver las cataratas heladas?", a: "Solo de mediados de enero a finales de febrero, durante el frío extremo. Totalmente congeladas, se vuelven escultura de hielo blanquiazul." }],
  "室蘭": [{ q: "¿Mejor punto para vista nocturna de fábricas?", a: "Mirador Iwaizumi, Monte Sokuryo y Puente Hakucho son los tres clásicos. Capta el puente con luces de fábrica en hora azul." }],
  "美唄": [{ q: "¿Qué tiene de especial Arte Piazza?", a: "Museo al aire libre gratuito en una escuela reconvertida. Obras en mármol blanco, escuela de madera y nieve juntas lucen pictóricas." }],
  "登別": [{ q: "¿Mejor momento para Jigokudani?", a: "Mañana por luz suave y vapor visible. La iluminación nocturna (mayo-octubre) es atmosférica." }],
  "北竜町": [{ q: "¿Cuándo es la floración pico?", a: "Típicamente la primera semana hasta ~10 de agosto. Toma clásica: panorámica completa desde el observatorio. Luz frontal matinal es la más vívida." }],
  "東京": [{ q: "¿Consejos para fotografía nocturna?", a: "Trípode, ISO bajo y larga exposición. Hora azul (30 min tras el ocaso) equilibra mejor el cielo y las luces de la ciudad." }],
  "品川": [{ q: "¿Lugares cerca de Shinagawa Station?", a: "Vista del Shinkansen desde el puente peatonal lado Takanawa, rascacielos lado Konan, corredor de cristal de Shinagawa Intercity y vista nocturna del canal en Tennozu Isle." }],
  "東山動物園": [{ q: "¿Consejos para fotografiar animales?", a: "Una óptica fija rápida (50 mm f/1.8) desenfoca el fondo. Presiona la lente contra la malla para hacerla desaparecer. Enfoca los ojos." }],
  "梅林公園": [{ q: "¿Cuándo es la floración pico?", a: "Mediados de febrero a principios de marzo. Con variedades tempranas y tardías, finales de febrero ofrece la mayor diversidad." }],
  "鳥羽水族館": [{ q: "¿Cuándo es más activo el dugongo?", a: "Cerca de horas de alimentación (aprox. 11 AM y 3 PM). A veces nada hasta el cristal — un momento preciado." }],
  "清水寺周辺": [{ q: "¿Mejor punto para la pagoda Yasaka?", a: "Mirando hacia arriba la pendiente Yasaka-dori desde abajo es el ángulo clásico. 6-7 AM casi sin turistas — ideal también para retratos en kimono." }],
  "鴨川シーワールド": [{ q: "¿Consejos para fotografiar orcas?", a: "Velocidad de obturación 1/1000+ para congelar salpicaduras; modo ráfaga esencial. Las primeras filas se mojan — elige asientos con cuidado." }],
  "旭山動物園": [{ q: "¿Horario del paseo de pingüinos?", a: "Dos veces al día de mediados de diciembre a marzo — solo invierno, cuando hay nieve. El desfile de pingüinos rey es un clásico invernal." }],
  "金沢": [{ q: "¿Lugares fotográficos en Kanazawa en un día?", a: "Kenrokuen al amanecer (luz suave), Castillo de Kanazawa, Higashi Chaya (tarde/noche), mercado Omicho, Puerta del Tambor de la estación Kanazawa de noche." }],
  "新倉山浅間公園": [{ q: "¿Cómo llegar al mirador?", a: "Estación Shimo-Yoshida (línea Fujikyu), 10 min a pie hasta el santuario, luego 398 escalones (rampa más suave también disponible). Llega 5-6 AM para evitar multitudes y captar el amanecer en Fuji." }],
  "河口湖": [{ q: "¿Mejor lugar para el reflejo del Fuji invertido?", a: "Parque Oishi y Ubuyagasaki en la orilla norte son clásicos. Mañanas sin viento 6-8 AM cuando el lago refleja. El invierno ofrece el aire más claro y mejor transparencia." }],
  "松本城": [{ q: "¿Cómo encuadrar el torreón con cerezos y los Alpes?", a: "Alrededor del puente Uzumi, lado noroeste del foso interior, es el mejor. Usa teleobjetivo para comprimir torreón y crestas alpinas, con cerezos de mediados de abril como bokeh frontal. Mañana ofrece contraluz suave." }],
  "高遠城址公園": [{ q: "¿Mejor hora para fotografiar los cerezos de Takato?", a: "Antes de las 6 AM ofrece luz azul sin multitudes. La tarde transita por la hora azul a la iluminación, donde la luz cálida de los faroles encuentra los cerezos rosados." }],
  "駒つなぎの桜": [{ q: "¿Qué se necesita para el reflejo en el arrozal?", a: "Mediados-finales de abril, cuando los arrozales están inundados para sembrar, en un amanecer sin viento. Lleva trípode y lente gran angular-estándar; para estrellas+cerezos, un cuerpo tolerante a alto ISO se recomienda." }],
  "長野県天空の楽園": [{ q: "¿Mejor época del año para observación de estrellas?", a: "Cerca de luna nueva. El invierno (nov-feb) da las estrellas más nítidas (Vía Láctea más débil). El verano es mejor para el núcleo de la Vía Láctea. El tour nocturno requiere reserva previa." }],
  "弘法山古墳": [{ q: "¿Cómo acceder y dónde disparar?", a: "Desde la estación Matsumoto, ~20 min en bus + ~20 min a pie hasta el sendero, luego 15-20 min cuesta arriba. Amanecer ofrece contraluz suave en los Alpes Norte y evita las multitudes." }],
  "安養寺": [{ q: "¿Cuándo es la floración pico?", a: "Mediados de abril. La mañana ofrece colores frontales y vivos. La tarde da siluetas impresionantes del salón y el árbol. Recinto silencioso — fotografía con respeto." }],
  "松本市新村": [{ q: "¿Qué hay cerca de la estación Niimura?", a: "La antigua estación de madera Mitsumizo, arrozales con los Alpes, caminos con cerezos, niebla matinal sobre los campos — joya escondida que combina ferrocarril y paisaje." }],
  "城山公園(松本市)": [{ q: "¿Mejor encuadre desde la plaza del mirador?", a: "Encuadre vertical con cerezos en primer plano y la cresta alpina detrás es clásico. El «alpenglow» matinal (cumbres nevadas tornándose rojas al amanecer) con sakura es la cima absoluta." }],
  "中町通り(松本市)": [{ q: "¿Mejor hora del día para fotografiar?", a: "6-8 AM ofrece calles vacías y composiciones limpias de muros kura. Tarde, cuando los faroles se encienden y los muros blancos se calientan ámbar, da el ambiente más nostálgico." }],
  "高島公園(諏訪市)": [{ q: "¿Mejor punto para el reflejo en el foso?", a: "Desde el lado sur del foso, usa teleobjetivo para comprimir torreón y cerezos. Mañanas o tardes sin viento dan agua espejo. Durante iluminación, la hora azul es la más mágica." }],
  "諏訪湖": [{ q: "¿Mejores lugares fotográficos del Lago Suwa?", a: "Parque Tateishi (vista aérea), paseo lacustre (lago + ciudad), zona del Centro del Géiser (atardecer) y la orilla este donde se refleja Yatsugatake. Las crestas de hielo Omiwatari aparecen en mañanas de enero-febrero." }],
  "立石公園": [{ q: "¿Consejos para vista nocturna y estrellas?", a: "Trípode esencial. Para vistas nocturnas: ISO 200, f/8, 10-30 s. Para estrellas: ISO 3200, f/2.8, ~15 s. Los 20-30 min tras el atardecer (hora mágica) dan el degradado más bello entre luces de la ciudad y crepúsculo." }],
};

let content = readFileSync(ES_PATH, "utf-8");
const marker = "  },\n};";
const lastIdx = content.lastIndexOf(marker);

const prefBlock = Object.entries(PREF_FAQS)
  .map(([k, faqs]) => {
    const items = faqs.map(f => `      { q: \`${f.q.replace(/`/g, "\\`")}\`, a: \`${f.a.replace(/`/g, "\\`")}\` }`).join(",\n");
    return `    "${k}": [\n${items},\n    ]`;
  })
  .join(",\n");

const locBlock = Object.entries(LOC_FAQS)
  .map(([k, faqs]) => {
    const items = faqs.map(f => `      { q: \`${f.q.replace(/`/g, "\\`")}\`, a: \`${f.a.replace(/`/g, "\\`")}\` }`).join(",\n");
    return `    "${k}": [\n${items},\n    ]`;
  })
  .join(",\n");

const inject = `  },\n  prefectureFaqs: {\n${prefBlock},\n  },\n  locationFaqs: {\n${locBlock},\n  },\n};`;
content = content.slice(0, lastIdx) + inject + content.slice(lastIdx + marker.length);
writeFileSync(ES_PATH, content, "utf-8");
console.log(`✓ es.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
