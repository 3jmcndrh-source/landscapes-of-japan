#!/usr/bin/env node
/** Portuguese FAQs を extras/pt.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PT_PATH = resolve(__dirname, "app", "content", "extras", "pt.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Qual é a melhor estação para fotografar Hokkaido?", a: "Fevereiro para o Festival da Neve de Sapporo e gelo flutuante, julho para a lavanda em Furano, outubro para folhagem outonal e janeiro-março para gelo flutuante em Shiretoko. Combine seu sujeito com sua época auge." },
    { q: "Quais são os principais locais fotográficos em Hokkaido?", a: "Paisagens urbanas de Sapporo, canal de Otaru, campos de flores de Furano, Lago Mashu, Lago Toya, península de Shiretoko, Vale do Inferno de Noboribetsu, Zoo de Asahiyama e colinas onduladas de Biei: cada zona oferece um caráter visual distinto." },
  ],
  "千葉県": [{ q: "Que tipos de fotografia oferece Chiba?", a: "Costas, paisagens rurais de Boso e fauna/aquários — uma mistura diversa perto da metrópole." }],
  "東京都": [{ q: "Dicas para fotografia noturna em Tóquio?", a: "Tripé, ISO baixo e exposição longa. A hora azul (30 min após o pôr do sol) equilibra melhor o céu e luzes urbanas." }],
  "神奈川県": [{ q: "Melhor forma de visitar Kamakura e Yokohama?", a: "Manhã nos templos de Kamakura (Grande Buda, Hasedera), depois à tarde para Yokohama, com pôr do sol em Minato Mirai e paisagens noturnas no Red Brick Warehouse." }],
  "石川県": [{ q: "O que fotografar em Kanazawa em um dia?", a: "Manhã cedo em Kenrokuen (luz suave), depois Castelo de Kanazawa, Higashi Chaya (tarde/noite), mercado Omicho, e finalizar com a Porta do Tambor da estação Kanazawa à noite." }],
  "山梨県": [{ q: "Melhor local para fotografar o Monte Fuji com cerejeiras?", a: "O deque do Pagode Chureito, no Parque Arakurayama Sengen, é mundialmente famoso. Após 398 degraus, pagode, cerejeiras e Monte Fuji se alinham num único enquadramento. Pico em meados de abril, com nascer do sol dando a luz mais mágica." }],
  "長野県": [{ q: "Quando florescem as cerejeiras no Parque do Castelo Takato?", a: "Início a meados de abril. Cerca de 1.500 cerejeiras «Takato Kohigan» florescem em rosa pálido, ganhando o título de «melhor cerejeira sob o céu». Iluminação noturna onírica, e madrugada evita as multidões." }],
  "岐阜県": [{ q: "Quando é a iluminação invernal de Shirakawa-go?", a: "Em número limitado de dias (tipicamente ~6) em janeiro-fevereiro. Reserva obrigatória; planeje cedo para fotografar casas gassho na neve do observatório." }],
  "愛知県": [{ q: "Dicas para fotografar bem em zoológicos?", a: "Uma lente fixa rápida (e.g., 50mm f/1.8) desfoca o fundo; pressione a lente contra a tela para fazê-la desaparecer. Foque nos olhos do animal." }],
  "三重県": [
    { q: "Etiqueta fotográfica em Ise Jingu?", a: "Interior dos santuários principais é estritamente proibido. Mantenha discrição dentro dos torii e evite fotografar fiéis ou sacerdotes diretamente." },
    { q: "Quando posso fotografar o nascer do sol entre as Meoto Iwa?", a: "Apenas próximo ao solstício de verão (maio-julho) o sol nasce diretamente entre as duas rochas. Início de junho tem a melhor taxa de céu limpo; chegue antes do amanhecer." },
  ],
  "京都府": [
    { q: "Melhor momento para folhagem outonal de Quioto?", a: "Pico geralmente entre fim de novembro e início de dezembro. Tofuku-ji (ponte Tsuten-kyo), Eikando, Kiyomizu-dera e Arashiyama ficam melhores na luz frontal matinal." },
    { q: "Como evitar multidões?", a: "Madrugada (6-8h) é de longe o melhor. Kiyomizu-dera abre às 6h; passeie pela parte externa do Kinkaku-ji antes das 9h, e chegue ao Byodoin na abertura." },
  ],
  "兵庫県": [{ q: "Melhores pontos para o Castelo de Himeji?", a: "Frente Otemon, Praça Sannomaru (com cerejeiras), Jardim Nishi-no-maru (vista lateral) e Parque Otoko-yama (vista elevada) são os quatro clássicos." }],
  "奈良県": [{ q: "Dicas para fotografar com cervos em Nara?", a: "Segurar shika senbei os atrai, mas eles vão embora quando acaba. Luz contra-luz matinal que destaca a pelagem é composição clássica." }],
  "徳島県": [{ q: "Quando os redemoinhos de Naruto são maiores?", a: "Em marés vivas (próximas à lua nova ou cheia) na primavera/outono, em torno da preamar/baixa-mar (±1-2h). Verifique tabelas de marés; fotografe de barcos ou da passarela da ponte Onaruto." }],
  "香川県": [{ q: "Que condições criam o reflexo espelhado de Chichibugahama?", a: "①Maré baixa coincidindo com pôr do sol ②Vento quase zero ③Nuvens no céu (céu limpo parece plano). Turismo de Mitoyo publica datas ótimas online." }],
  "愛媛県": [{ q: "Posso fotografar o edifício Dogo Onsen Honkan?", a: "Exterior totalmente aberto; ângulos traseiros e iluminação noturna recomendados. Algumas áreas internas restritas para privacidade." }],
  "高知県": [{ q: "Dicas para captar o azul de Niko-buchi?", a: "Próximo ao meio-dia em dias claros, quando luz solar direta atinge a água, o azul é mais intenso. Filtro polarizador aprofunda a cor cortando reflexos superficiais." }],
  "福岡県": [{ q: "Pontos fotográficos imperdíveis em Fukuoka?", a: "O caminho de aproximação e salão principal do Dazaifu Tenmangu, e o corredor noturno Torre de Fukuoka–Praia Momochi–Bayside Place." }],
  "大分県": [{ q: "Onde captar o horizonte de vapor de Beppu?", a: "O Mirante Yukemuri em Kannawa Onsen. Manhãs de inverno produzem as colunas de vapor mais densas pelo contraste térmico." }],
  "沖縄県": [
    { q: "Melhor temporada para Miyakojima?", a: "Maio-setembro pela transparência da água (especialmente julho-agosto). Setembro é temporada de tufões. Dezembro-fevereiro é fresco e menos lotado, mas com atividades marinhas limitadas." },
    { q: "Melhor hora do dia para fotos de mar transparente?", a: "10h-14h, quando o sol está alto e a luz penetra até o leito marinho, cria o verde esmeralda mais intenso. Filtro polarizador é essencial." },
  ],
};

const LOC_FAQS = {
  "知床": [{ q: "Como acessar Shiretoko?", a: "Voe para Memanbetsu; Utoro Onsen (2h de ônibus) é a porta. Tours de gelo flutuante no inverno, cruzeiros e caminhada dos Cinco Lagos no verão." }],
  "札幌": [{ q: "Melhor época para visitar centro de Sapporo?", a: "Fevereiro (Festival da Neve), junho (Festival do Lilás), outubro (folhagem), dezembro (White Illumination). A cidade muda de cara o ano todo." }],
  "さっぽろ雪まつり": [{ q: "Melhor hora para fotografar o festival?", a: "Iluminação do pôr do sol às 21h é a mais fotogênica — use tripé e ISO baixo para reter a textura da neve. Diurno funciona com céu azul de fundo." }],
  "小樽": [{ q: "Melhor ponto fotográfico ao longo do canal?", a: "Entre a ponte Asakusa e a ponte Chuo — armazéns, canal e lampiões a gás num só enquadramento. A hora azul após o pôr do sol é ideal." }],
  "洞爺湖": [{ q: "Dicas para fotografar fogos de artifício?", a: "Tripé obrigatório. ISO 100, f/8, B 4-8s. A plataforma do lago capta os fogos com seu reflexo." }],
  "富良野": [{ q: "Melhor hora para os campos de lavanda?", a: "Madrugada antes das 7h para luz suave e multidões mínimas. Luz frontal faz brilhar o roxo. Verifique status de floração antes." }],
  "宮古島": [{ q: "Melhor temporada para Miyakojima?", a: "Maio-setembro pela claridade da água (especialmente julho-agosto). Setembro é temporada de tufões. Dezembro-fevereiro é fresco e menos lotado." }],
  "沖縄": [{ q: "Pontos fotográficos imperdíveis na ilha principal de Okinawa?", a: "Ruínas do Castelo Shurijo, Cabo Zanpa, Manzamo, Ponte Kouri, Aquário Churaumi, vila de cerâmica Yachimun e Kokusai-dori." }],
  "横浜": [{ q: "Melhor ponto para Minato Mirai?", a: "Osanbashi para o skyline completo no pôr do sol; Sakuragicho para a roda gigante; Yamashita-koen para o Red Brick Warehouse. Hora azul ideal." }],
  "鎌倉": [{ q: "Quando são os crisântemos do Hasedera?", a: "Aproximadamente 1-23 de novembro, com iluminações noturnas. Chegue cedo para evitar filas." }],
  "伊勢神宮": [{ q: "Etiqueta fotográfica em Ise Jingu?", a: "Áreas internas estritamente proibidas. Discrição dentro dos torii; não fotografe fiéis ou sacerdotes." }],
  "夫婦岩": [{ q: "Quando o sol nasce entre as rochas?", a: "Próximo ao solstício (maio-julho). Início de junho tem melhor taxa de céu limpo. Chegue antes do amanhecer." }],
  "おはらい町・おかげ横丁": [{ q: "Melhor hora para fotografar a rua?", a: "Manhã 8-10h, antes da onda de visitantes. Luz lateral nas casas de madeira é linda." }],
  "朝熊山展望台": [{ q: "Como subir ao mirante?", a: "Dirigir pela Ise-Shima Skyline (paga). Acesso fácil; observação do Monte Fuji possível em dias claros (raros)." }],
  "横山展望台": [{ q: "Melhor hora para Yokoyama?", a: "Manhã clara para detalhes das ilhas na baía Ago. Pôr do sol também funciona; plataformas mais altas são as melhores." }],
  "清水寺": [{ q: "Quando é a iluminação outonal?", a: "Meados de novembro a início de dezembro, 17h30-21h. Hora azul após abertura é a mais mágica. Tripé não permitido." }],
  "金閣寺": [{ q: "Melhor momento para o Pavilhão Dourado?", a: "Manhãs claras de inverno com neve são icônicas; outono e reflexo no lago também clássicos. Chegue na abertura (9h)." }],
  "平等院鳳凰堂": [{ q: "Dicas para reflexo no lago Aji?", a: "Manhãs sem vento dão superfície espelho. Chegue na abertura (8h30); use polarizador fracamente para preservar reflexo." }],
  "東福寺": [{ q: "Melhor momento para a ponte Tsutenkyo?", a: "Meados de novembro a início de dezembro. Abertura 8h30; siga o fluxo unidirecional do norte. Não pare na ponte." }],
  "東寺": [{ q: "Dicas para fotografar o pagode de cinco andares?", a: "Lago Hyotan-ike no pôr do sol para reflexo. Iluminação noturna em temporadas de cerejeiras e outono." }],
  "八坂の塔": [{ q: "Melhor ponto para o pagode Yasaka?", a: "Olhar a subida Yasaka-dori de baixo é o ângulo clássico. 6-7h quase sem turistas — ideal também para retratos em quimono." }],
  "姫路城": [{ q: "Melhor momento para o castelo com cerejeiras?", a: "Tipicamente início de abril. Praça Sannomaru, Jardim Nishi-no-maru e Parque Memorial Shirotopia são clássicos." }],
  "法隆寺": [{ q: "Regras de fotografia?", a: "Pátio OK; estátuas de Buda nos salões majoritariamente proibidas. Sem tripé ou flash mesmo ao ar livre. Madrugada e fim de tarde mais calmos e suaves." }],
  "法隆寺 夢殿": [{ q: "Quando o Guze Kannon é exibido?", a: "Primavera: 11 abril-18 maio; outono: 22 outubro-22 novembro. Fotografia da estátua proibida." }],
  "鳴門海峡": [{ q: "Barco ou passarela?", a: "Barco para intensidade, passarela para segurança aérea. O piso de vidro de Uzu-no-Michi mostra os redemoinhos abaixo. No barco, espere borrifos." }],
  "大鳴門橋": [{ q: "Melhor ponto para a ponte?", a: "Michi-no-Eki Uzushio do lado Awaji para a melhor vista geral. A ponte e o estreito iluminados ao pôr do sol são lindos." }],
  "父母ヶ浜": [{ q: "Como reservar o dia ótimo?", a: "Sem reserva, mas Turismo de Mitoyo publica «Sky Mirror Calendar» com dias ótimos. Planeje para dias em que maré baixa e pôr do sol coincidem." }],
  "亀老山展望台": [{ q: "Como chegar?", a: "Ônibus Shimanami Kaido de Imabari ou Fukuyama, ou de bicicleta. Estacionamento próximo ao topo." }],
  "来島海峡大橋": [{ q: "Melhor ponto para a ponte?", a: "Mirante do Monte Kiro (Oshima, Imabari) oferece a vista definitiva. Capture a ponte alaranjada no pôr do sol e a hora azul depois." }],
  "松山城": [{ q: "Bondinho ou cadeira aérea?", a: "Se o tempo permitir, a cadeira aérea aberta oferece melhor imersão panorâmica (5min). Bilhete combinado cobre ambos." }],
  "道後温泉": [{ q: "Posso fotografar o Honkan?", a: "Exterior totalmente aberto; ângulos traseiros e iluminação noturna recomendados. Algumas áreas internas proibidas por privacidade." }],
  "桂浜": [{ q: "Melhor ângulo para a estátua de Ryoma?", a: "De ângulo baixo no lado do mar, subindo escadas atrás do pedestal — combina Ryoma com o Pacífico ao fundo. Pôr do sol dá silhueta marcante." }],
  "高知城": [{ q: "Quanto tempo para subir?", a: "Cerca de 15 min de escadas da entrada ao torreão. O portão Otemon é moldura clássica para cerejeiras. Não perca a vista da cidade do torreão." }],
  "名越屋沈下橋": [{ q: "Melhor temporada?", a: "Verdes frescos em maio, banho de verão (julho-ago), folhagem outonal (out-nov). Manhãs de inverno com neblina também oníricas." }],
  "にこ淵": [{ q: "Quando o azul é mais forte?", a: "Meio-dia claro (10h-14h), especialmente verão até início do outono. Após chuva, turbidez reduz o efeito — clima seco ideal. Traga filtro PL." }],
  "福岡": [{ q: "Etiqueta fotográfica em yatai?", a: "Pergunte ao pessoal/clientes primeiro. Closes só após pedir. Exteriores e ruas livres." }],
  "別府": [{ q: "Quanto dura o tour dos Infernos?", a: "Os 7 Infernos levam 2-3 horas. Bilhete combinado economiza. Inferno do Mar, do Lago de Sangue e Tatsumaki são os top-3." }],
  "湯布院": [{ q: "Condições para neblina matinal no lago Kinrin?", a: "Manhãs claras de novembro-março com menos de 5°C — diferença térmica entre água termal e ar produz neblina. Mais densa do amanhecer até uma hora depois." }],
  "白川郷": [{ q: "Fotografar do mirante?", a: "Mirante das Ruínas do Castelo Ogimachi domina toda a vila — o clássico. Neblina outono-inverno, neve janeiro-fevereiro, verde de maio: cada um obras-primas." }],
  "美幌峠": [{ q: "Quando aparece o mar de nuvens?", a: "Manhãs setembro-novembro em dias claros sem vento com grandes diferenças térmicas. Pico cerca de 30 min em torno do amanhecer." }],
  "摩周湖": [{ q: "Probabilidade de ver o lago?", a: "Taxa anual de visibilidade ~30%. Verão especialmente nebuloso; inverno-primavera oferecem melhor claridade. Visite múltiplos miradores para aumentar chances." }],
  "阿寒": [{ q: "Posso ver marimo?", a: "No Centro de Observação de Marimo na ilha Churui — acessível por barco turístico." }],
  "三段滝公園": [{ q: "Quando ver as quedas congeladas?", a: "Apenas meados de janeiro a fim de fevereiro, durante o frio profundo. Totalmente congeladas, viram escultura de gelo branco-azulada." }],
  "室蘭": [{ q: "Melhor ponto para vista noturna de fábricas?", a: "Mirante Iwaizumi, Monte Sokuryo e Ponte Hakucho são os três clássicos. Capture a ponte com luzes de fábrica na hora azul." }],
  "美唄": [{ q: "O que é especial em Arte Piazza?", a: "Museu de esculturas ao ar livre gratuito numa escola reaproveitada. Obras em mármore branco, escola de madeira e neve juntas parecem pictóricas." }],
  "登別": [{ q: "Melhor momento para Jigokudani?", a: "Manhã para luz suave e vapor visível. A iluminação noturna (maio-outubro) é atmosférica." }],
  "北竜町": [{ q: "Quando é a floração de pico?", a: "Tipicamente a primeira semana até ~10 de agosto. Foto clássica: panorâmica completa do mirante. Luz frontal matinal é a mais vívida." }],
  "東京": [{ q: "Dicas para fotografia noturna?", a: "Tripé, ISO baixo e exposição longa. Hora azul (30 min após o pôr do sol) equilibra melhor o céu e luzes urbanas." }],
  "品川": [{ q: "Pontos perto da estação Shinagawa?", a: "Vista do Shinkansen da passarela lado Takanawa, arranha-céus lado Konan, corredor de vidro de Shinagawa Intercity e vista noturna do canal em Tennozu Isle." }],
  "東山動物園": [{ q: "Dicas para fotografar animais?", a: "Lente fixa rápida (50mm f/1.8) desfoca o fundo. Pressione a lente contra a tela para fazê-la desaparecer. Foque nos olhos." }],
  "梅林公園": [{ q: "Quando é a floração de pico?", a: "Meados de fevereiro a início de março. Com variedades precoces e tardias, fim de fevereiro oferece a maior diversidade." }],
  "鳥羽水族館": [{ q: "Quando o dugongo é mais ativo?", a: "Próximo aos horários de alimentação (aprox. 11h e 15h). Às vezes nada até o vidro — momento valioso." }],
  "清水寺周辺": [{ q: "Melhor ponto para o pagode Yasaka?", a: "Olhar a subida Yasaka-dori de baixo é o ângulo clássico. 6-7h quase sem turistas — ideal também para retratos em quimono." }],
  "鴨川シーワールド": [{ q: "Dicas para fotografar orcas?", a: "Velocidade do obturador 1/1000+ para congelar respingos; modo rajada essencial. Primeiras fileiras se molham — escolha assentos com cuidado." }],
  "旭山動物園": [{ q: "Horário do passeio dos pinguins?", a: "Duas vezes por dia de meados de dezembro a março — só no inverno, quando há neve. O desfile dos pinguins-rei é clássico de inverno." }],
  "金沢": [{ q: "Pontos fotográficos em Kanazawa em um dia?", a: "Kenrokuen ao amanhecer (luz suave), Castelo de Kanazawa, Higashi Chaya (tarde/noite), mercado Omicho, Porta do Tambor da estação Kanazawa à noite." }],
  "新倉山浅間公園": [{ q: "Como chegar ao mirante?", a: "Estação Shimo-Yoshida (linha Fujikyu), 10 min a pé até o santuário, depois 398 degraus (rampa mais suave também disponível). Chegue 5-6h para evitar multidões e pegar o nascer do sol em Fuji." }],
  "河口湖": [{ q: "Melhor local para o reflexo do Fuji invertido?", a: "Parque Oishi e Ubuyagasaki na margem norte são clássicos. Mire em manhãs sem vento 6-8h quando o lago espelha. Inverno oferece o ar mais claro e melhor transparência." }],
  "松本城": [{ q: "Como enquadrar o torreão com cerejeiras e os Alpes?", a: "Em torno da ponte Uzumi, lado noroeste do fosso interno, é o melhor. Teleobjetiva para comprimir torreão e cumes alpinos, com cerejeiras de meados de abril como bokeh frontal. Manhã oferece contraluz suave." }],
  "高遠城址公園": [{ q: "Melhor hora do dia para fotografar as cerejeiras de Takato?", a: "Antes das 6h oferece luz azul sem multidões. Tarde transita pela hora azul até a iluminação, quando luz quente das lanternas encontra cerejeiras rosas." }],
  "駒つなぎの桜": [{ q: "O que é necessário para o reflexo no arrozal?", a: "Meados a fim de abril, quando arrozais estão inundados para plantio, em amanhecer sem vento. Traga tripé e lente grande-angular a padrão; para estrelas+cerejeiras, corpo tolerante a alto ISO recomendado." }],
  "長野県天空の楽園": [{ q: "Melhor época do ano para observação de estrelas?", a: "Próximo à lua nova. Inverno (nov-fev) dá as estrelas mais nítidas (Via Láctea mais fraca). Verão é melhor para o núcleo da Via Láctea. O tour noturno requer reserva antecipada." }],
  "弘法山古墳": [{ q: "Como acessar e onde fotografar?", a: "Da estação Matsumoto, ~20 min de ônibus + ~20 min a pé até a trilha, depois 15-20 min subindo até o cume. Amanhecer dá contraluz suave nos Alpes do Norte e evita multidões." }],
  "安養寺": [{ q: "Quando é a floração de pico?", a: "Meados de abril. Manhã oferece cores frontais e vívidas. Noite dá silhuetas marcantes do salão e da árvore. Pátio silencioso — fotografe com respeito." }],
  "松本市新村": [{ q: "O que há perto da estação Niimura?", a: "A antiga estação de madeira Mitsumizo, arrozais com os Alpes, caminhos de cerejeiras, neblina matinal sobre campos de arroz — joia escondida combinando ferrovia e paisagem." }],
  "城山公園(松本市)": [{ q: "Melhor enquadramento da praça do mirante?", a: "Enquadramento vertical com cerejeiras em primeiro plano e cume alpino atrás é clássico. O «alpenglow» matinal (picos nevados ficando vermelhos no amanhecer) com sakura é o pico absoluto." }],
  "中町通り(松本市)": [{ q: "Melhor hora do dia para fotografar?", a: "6-8h oferece ruas vazias e composições limpas das paredes kura. Noite, quando lampiões acendem e paredes brancas esquentam em âmbar, dá o clima mais nostálgico." }],
  "高島公園(諏訪市)": [{ q: "Melhor ponto para o reflexo no fosso?", a: "Do lado sul do fosso, use teleobjetiva para comprimir torreão e cerejeiras. Manhãs ou noites sem vento dão água espelhada. Durante iluminação, a hora azul é a mais mágica." }],
  "諏訪湖": [{ q: "Melhores pontos fotográficos do Lago Suwa?", a: "Parque Tateishi (vista aérea), passeio lacustre (lago + cidade), área do Geyser Center (pôr do sol), e a margem leste onde Yatsugatake reflete. Cumes de gelo Omiwatari aparecem em manhãs de janeiro-fevereiro." }],
  "立石公園": [{ q: "Dicas para vista noturna e estrelas?", a: "Tripé essencial. Vistas noturnas: ISO 200, f/8, 10-30s. Estrelas: ISO 3200, f/2.8, ~15s. Os 20-30 min após o pôr do sol (hora mágica) dão o gradiente mais belo entre luzes da cidade e crepúsculo." }],
};

let content = readFileSync(PT_PATH, "utf-8");
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
writeFileSync(PT_PATH, content, "utf-8");
console.log(`✓ pt.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
