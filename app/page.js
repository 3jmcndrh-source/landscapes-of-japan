"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as d3 from "d3";

/* ── Embedded Japan GeoJSON — real lat/lng, D3 projects accurately ── */
/* Format: GeoJSON [longitude, latitude] per spec */
const JP_GEO = {type:"FeatureCollection",features:[
{type:"Feature",properties:{name:"Hokkaido"},geometry:{type:"Polygon",coordinates:[[
[140.07,41.43],[140.10,41.50],[140.05,41.58],[140.08,41.65],[140.15,41.70],[140.25,41.74],
[140.40,41.76],[140.58,41.77],[140.73,41.77],[140.82,41.78],[140.95,41.80],[141.05,41.80],
[141.17,41.80],[141.20,41.75],[141.10,41.70],[140.95,41.72],[140.80,41.73],[140.60,41.72],
[140.45,41.78],[140.30,41.82],[140.25,41.80],[140.18,41.88],[140.12,42.00],[140.10,42.08],
[140.15,42.15],[140.20,42.25],[140.13,42.38],[140.10,42.50],[140.20,42.60],[140.32,42.72],
[140.45,42.82],[140.55,42.92],[140.68,43.00],[140.78,43.08],[140.85,43.15],[140.95,43.20],
[140.72,43.25],[140.52,43.28],[140.35,43.30],[140.32,43.25],[140.45,43.18],[140.55,43.05],
[140.72,42.98],[140.60,42.90],[140.38,42.85],[140.25,42.80],[140.38,42.68],[140.15,42.55],
[140.08,42.45],[140.12,42.35],[140.22,42.30],[140.15,42.20],[140.10,42.10],[140.08,42.00],
[140.55,43.08],[140.75,43.12],[140.90,43.18],[141.00,43.25],[141.05,43.32],[141.10,43.40],
[141.18,43.48],[141.30,43.58],[141.42,43.68],[141.50,43.78],[141.58,43.85],[141.65,43.95],
[141.70,44.08],[141.72,44.20],[141.73,44.35],[141.70,44.50],[141.72,44.65],[141.75,44.80],
[141.78,44.92],[141.80,45.05],[141.75,45.18],[141.78,45.28],[141.93,45.42],[142.08,45.50],
[142.22,45.48],[142.42,45.42],[142.60,45.33],[142.78,45.22],[142.95,45.10],[143.12,44.95],
[143.28,44.82],[143.48,44.68],[143.68,44.52],[143.85,44.40],[144.10,44.28],[144.35,44.18],
[144.55,44.15],[144.78,44.18],[144.95,44.25],[145.12,44.35],[145.22,44.38],[145.35,44.33],
[145.48,44.25],[145.55,44.12],[145.58,43.98],[145.60,43.85],[145.65,43.72],[145.78,43.55],
[145.80,43.40],[145.60,43.33],[145.42,43.28],[145.22,43.18],[145.05,43.08],[144.85,43.00],
[144.60,42.95],[144.38,42.90],[144.12,42.82],[143.85,42.72],[143.60,42.58],[143.38,42.45],
[143.22,42.32],[143.15,42.18],[143.08,42.05],[143.20,41.92],[143.15,42.00],[142.85,42.05],
[142.55,42.18],[142.25,42.32],[141.95,42.45],[141.70,42.55],[141.50,42.60],[141.35,42.58],
[141.15,42.52],[140.98,42.45],[141.05,42.38],[140.95,42.30],[140.82,42.25],[140.72,42.18],
[140.60,42.08],[140.48,42.00],[140.35,41.90],[140.28,41.82],[140.20,41.72],[140.15,41.60],
[140.10,41.50],[140.07,41.43]
]]}},
{type:"Feature",properties:{name:"Honshu"},geometry:{type:"Polygon",coordinates:[[
[140.20,41.25],[140.35,41.15],[140.48,41.08],[140.65,41.02],[140.85,41.02],[140.95,41.08],
[141.05,41.15],[141.18,41.25],[141.28,41.30],[141.35,41.25],[141.28,41.15],[141.18,41.08],
[141.08,41.00],[141.15,40.92],[141.30,40.82],[141.42,40.68],[141.52,40.55],[141.62,40.40],
[141.72,40.25],[141.82,40.08],[141.88,39.90],[141.95,39.72],[142.05,39.55],[142.08,39.38],
[142.00,39.22],[141.92,39.05],[141.80,38.85],[141.65,38.70],[141.50,38.55],[141.35,38.42],
[141.15,38.32],[141.00,38.18],[140.95,38.05],[140.92,37.85],[140.95,37.65],[141.00,37.45],
[141.05,37.22],[141.02,37.05],[140.98,36.85],[140.92,36.65],[140.82,36.48],[140.72,36.35],
[140.62,36.25],[140.55,36.12],[140.65,35.98],[140.78,35.85],[140.85,35.75],[140.82,35.65],
[140.65,35.58],[140.42,35.55],[140.22,35.52],[140.05,35.55],[139.92,35.50],[139.85,35.42],
[139.82,35.30],[139.80,35.18],[139.85,35.05],[139.78,34.98],[139.65,35.02],[139.55,35.08],
[139.48,35.22],[139.50,35.38],[139.58,35.48],[139.68,35.55],[139.72,35.62],[139.65,35.68],
[139.55,35.60],[139.42,35.50],[139.32,35.40],[139.22,35.32],[139.12,35.18],[139.05,35.08],
[138.98,34.98],[138.92,34.88],[138.88,34.78],[138.82,34.70],[138.72,34.65],[138.55,34.62],
[138.32,34.62],[138.05,34.65],[137.78,34.68],[137.55,34.65],[137.25,34.62],[137.02,34.58],
[136.90,34.50],[136.82,34.40],[136.72,34.30],[136.60,34.18],[136.48,34.08],[136.35,34.00],
[136.15,33.90],[135.95,33.78],[135.82,33.65],[135.75,33.50],[135.65,33.45],[135.50,33.42],
[135.38,33.48],[135.22,33.55],[135.12,33.68],[135.05,33.82],[135.02,33.98],[135.08,34.12],
[135.10,34.28],[135.12,34.42],[135.15,34.52],[135.08,34.58],[135.02,34.65],[134.85,34.68],
[134.62,34.68],[134.38,34.68],[134.12,34.62],[133.88,34.55],[133.62,34.50],[133.35,34.42],
[133.08,34.35],[132.78,34.30],[132.48,34.22],[132.22,34.18],[131.95,34.08],[131.65,34.00],
[131.38,33.98],[131.08,33.95],[130.98,33.98],[130.95,34.05],[130.98,34.15],[131.02,34.28],
[131.12,34.42],[131.30,34.55],[131.48,34.65],[131.72,34.75],[131.92,34.85],[132.12,34.98],
[132.28,35.10],[132.52,35.22],[132.72,35.32],[132.95,35.42],[133.15,35.50],[133.35,35.55],
[133.55,35.55],[133.78,35.55],[133.98,35.60],[134.15,35.62],[134.32,35.60],[134.52,35.62],
[134.72,35.60],[134.88,35.58],[135.05,35.62],[135.22,35.68],[135.38,35.72],[135.55,35.68],
[135.72,35.65],[135.88,35.68],[135.98,35.78],[136.05,35.90],[136.18,36.02],[136.35,36.12],
[136.52,36.25],[136.62,36.38],[136.68,36.52],[136.72,36.68],[136.70,36.82],[136.68,36.95],
[136.72,37.05],[136.82,37.15],[136.95,37.25],[137.08,37.35],[137.22,37.45],[137.30,37.52],
[137.20,37.48],[137.05,37.38],[136.92,37.28],[136.85,37.18],[136.92,37.12],[137.05,37.12],
[137.18,37.22],[137.35,37.32],[137.58,37.42],[137.85,37.55],[138.08,37.68],[138.30,37.78],
[138.55,37.88],[138.78,37.95],[139.00,38.05],[139.22,38.15],[139.42,38.28],[139.55,38.38],
[139.65,38.50],[139.72,38.62],[139.80,38.78],[139.85,38.92],[139.90,39.08],[139.95,39.25],
[139.98,39.42],[140.02,39.58],[140.00,39.72],[139.98,39.88],[139.95,40.02],[139.95,40.18],
[139.98,40.35],[140.00,40.52],[140.00,40.68],[140.02,40.82],[140.05,40.95],[140.08,41.08],
[140.15,41.18],[140.20,41.25]
]]}},
{type:"Feature",properties:{name:"Shikoku"},geometry:{type:"Polygon",coordinates:[[
[134.62,34.28],[134.38,34.25],[134.18,34.22],[133.88,34.18],[133.62,34.12],[133.35,34.05],
[133.05,33.92],[132.88,33.78],[132.75,33.62],[132.68,33.48],[132.58,33.32],[132.55,33.18],
[132.60,33.05],[132.72,32.98],[132.82,32.95],[132.95,33.00],[133.12,33.02],[133.28,33.02],
[133.48,33.05],[133.65,33.02],[133.82,33.02],[133.98,33.08],[134.12,33.18],[134.22,33.28],
[134.35,33.40],[134.48,33.52],[134.58,33.62],[134.65,33.72],[134.72,33.82],[134.75,33.95],
[134.72,34.05],[134.68,34.15],[134.62,34.28]
]]}},
{type:"Feature",properties:{name:"Kyushu"},geometry:{type:"Polygon",coordinates:[[
[130.88,33.95],[130.72,33.82],[130.55,33.68],[130.40,33.55],[130.28,33.42],[130.18,33.28],
[130.05,33.15],[129.92,33.02],[129.82,32.88],[129.75,32.72],[129.78,32.55],[129.82,32.42],
[129.88,32.28],[129.95,32.15],[130.05,32.02],[130.18,31.88],[130.30,31.75],[130.42,31.62],
[130.55,31.50],[130.58,31.38],[130.52,31.25],[130.55,31.15],[130.68,31.08],[130.82,31.05],
[130.95,31.08],[131.02,31.18],[130.88,31.28],[130.78,31.38],[130.72,31.48],[130.85,31.55],
[131.02,31.42],[131.15,31.35],[131.28,31.38],[131.42,31.48],[131.48,31.62],[131.55,31.78],
[131.60,31.95],[131.65,32.12],[131.70,32.30],[131.75,32.48],[131.78,32.65],[131.72,32.82],
[131.62,32.98],[131.55,33.12],[131.58,33.25],[131.55,33.32],[131.42,33.42],[131.25,33.48],
[131.08,33.52],[130.95,33.62],[130.92,33.75],[130.88,33.95]
]]}},
{type:"Feature",properties:{name:"Sado"},geometry:{type:"Polygon",coordinates:[[
[138.22,38.35],[138.18,38.22],[138.25,38.08],[138.38,37.95],[138.48,37.90],[138.55,38.00],
[138.52,38.15],[138.42,38.28],[138.32,38.35],[138.22,38.35]
]]}},
{type:"Feature",properties:{name:"Awaji"},geometry:{type:"Polygon",coordinates:[[
[134.85,34.62],[134.80,34.52],[134.82,34.40],[134.90,34.32],[134.98,34.38],[134.98,34.52],
[134.92,34.60],[134.85,34.62]
]]}},
{type:"Feature",properties:{name:"Tsushima"},geometry:{type:"Polygon",coordinates:[[
[129.42,34.72],[129.30,34.60],[129.25,34.45],[129.30,34.28],[129.42,34.18],[129.52,34.28],
[129.55,34.45],[129.50,34.62],[129.42,34.72]
]]}},
{type:"Feature",properties:{name:"Yakushima"},geometry:{type:"Polygon",coordinates:[[
[130.35,30.45],[130.28,30.35],[130.30,30.25],[130.45,30.22],[130.55,30.30],[130.55,30.42],
[130.45,30.48],[130.35,30.45]
]]}},
{type:"Feature",properties:{name:"Tanegashima"},geometry:{type:"Polygon",coordinates:[[
[131.00,30.75],[130.92,30.62],[130.95,30.45],[131.02,30.40],[131.08,30.55],[131.08,30.68],
[131.00,30.75]
]]}},
{type:"Feature",properties:{name:"Okinawa"},geometry:{type:"Polygon",coordinates:[[
[128.25,26.88],[128.12,26.78],[127.95,26.62],[127.82,26.48],[127.75,26.35],[127.70,26.22],
[127.68,26.10],[127.72,26.08],[127.78,26.15],[127.85,26.28],[127.92,26.42],[128.00,26.55],
[128.08,26.68],[128.18,26.78],[128.25,26.88]
]]}},
{type:"Feature",properties:{name:"Miyako"},geometry:{type:"Polygon",coordinates:[[
[125.38,24.82],[125.22,24.75],[125.18,24.72],[125.28,24.72],[125.38,24.78],[125.42,24.82],
[125.38,24.82]
]]}},
{type:"Feature",properties:{name:"Ishigaki"},geometry:{type:"Polygon",coordinates:[[
[124.22,24.45],[124.12,24.38],[124.15,24.32],[124.28,24.35],[124.30,24.42],[124.22,24.45]
]]}},
]};

/* ── Location names (20 langs) ── */
const LOC = {
  ja:{l1:"富士山",l2:"京都・嵐山",l3:"厳島神社",l4:"奈良公園",l5:"白川郷",l6:"渋谷"},
  en:{l1:"Mt. Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  zh:{l1:"富士山",l2:"京都",l3:"严岛",l4:"奈良",l5:"白川乡",l6:"涩谷"},
  "zh-tw":{l1:"富士山",l2:"京都",l3:"嚴島",l4:"奈良",l5:"白川鄉",l6:"澀谷"},
  ko:{l1:"후지산",l2:"교토",l3:"이쓰쿠시마",l4:"나라",l5:"시라카와고",l6:"시부야"},
  es:{l1:"Monte Fuji",l2:"Kioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  fr:{l1:"Mont Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  de:{l1:"Berg Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  pt:{l1:"Monte Fuji",l2:"Quioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  it:{l1:"Monte Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  ru:{l1:"Фудзи",l2:"Киото",l3:"Ицукусима",l4:"Нара",l5:"Сиракава-го",l6:"Сибуя"},
  ar:{l1:"فوجي",l2:"كيوتو",l3:"إتسوكوشيما",l4:"نارا",l5:"شيراكاوا",l6:"شيبويا"},
  hi:{l1:"फूजी",l2:"क्योटो",l3:"इत्सुकुशिमा",l4:"नारा",l5:"शिराकावा-गो",l6:"शिबुया"},
  th:{l1:"ฟูจิ",l2:"เกียวโต",l3:"อิสึกุชิมะ",l4:"นารา",l5:"ชิราคาวา",l6:"ชิบุย่า"},
  vi:{l1:"Phú Sĩ",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  id:{l1:"G. Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  tr:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  nl:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  pl:{l1:"Fuji",l2:"Kioto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
  sv:{l1:"Fuji",l2:"Kyoto",l3:"Itsukushima",l4:"Nara",l5:"Shirakawa-go",l6:"Shibuya"},
};

/* ── Translations (20 langs, compact) ── */
const TR = {
  ja:{name:"日本語",nav:{map:"撮影地マップ"},hero:{t:"Landscapes of Japan",s:"ー 日本の風景 ー",d:"日本各地で撮影した風景写真を掲載しています"},mapL:"撮影地マップ",mapH:"色付きの都道府県をクリック → 写真へジャンプ",backMap:"撮影地マップに戻る",lang:"言語",ft:"質問、意見、要望等お気軽にご連絡ください。",scroll:"← スワイプ / スクロール →",oki:"沖縄",tapHint:"もう一度タップ → 写真",footer2:"無断転載・無断使用を禁止します。",contact:{title:"お問い合わせ",name:"お名前",email:"メールアドレス",msg:"メッセージ",send:"送信する",sent:"送信しました。ありがとうございます。",err:"送信に失敗しました。もう一度お試しください。"}},
  en:{name:"English",nav:{map:"Location Map"},hero:{t:"Landscapes of Japan",s:"ー Japan in Focus ー",d:"A collection of landscape photos taken across Japan"},mapL:"Shooting Locations",mapH:"Click a highlighted prefecture to see photos",backMap:"Back to Location Map",lang:"Language",ft:"Feel free to get in touch with any questions or feedback.",scroll:"← Swipe / Scroll →",oki:"Okinawa",tapHint:"Tap again → photos",footer2:"Unauthorized reproduction prohibited.",contact:{title:"Contact",name:"Name",email:"Email",msg:"Message",send:"Send",sent:"Sent! Thank you.",err:"Failed to send. Please try again."}},
  zh:{name:"中文(简体)",nav:{map:"拍摄地图"},hero:{t:"日本风景",s:"ー 日本风景 ー",d:"收录了日本各地拍摄的风景照片"},mapL:"拍摄地点",mapH:"点击彩色都道府县 → 跳转至照片",backMap:"返回拍摄地图",lang:"语言",ft:"如有任何问题或建议，欢迎随时联系。",scroll:"← 滑动 / 滚动 →",oki:"冲绳",tapHint:"再次点击 → 照片",footer2:"禁止未经授权的转载和使用。",contact:{title:"联系方式",name:"姓名",email:"电子邮箱",msg:"留言",send:"发送",sent:"发送成功，感谢您的留言。",err:"发送失败，请重试。"}},
  "zh-tw":{name:"中文(繁體)",nav:{map:"拍攝地圖"},hero:{t:"日本風景",s:"ー 日本風景 ー",d:"收錄了日本各地拍攝的風景照片"},mapL:"拍攝地點",mapH:"點擊彩色都道府縣 → 跳轉至照片",backMap:"返回拍攝地圖",lang:"語言",ft:"如有任何問題或建議，歡迎隨時聯繫。",scroll:"← 滑動 / 捲動 →",oki:"沖繩",tapHint:"再次點擊 → 照片",footer2:"禁止未經授權的轉載和使用。",contact:{title:"聯絡方式",name:"姓名",email:"電子郵件",msg:"留言",send:"發送",sent:"發送成功，感謝您的留言。",err:"發送失敗，請重試。"}},
  ko:{name:"한국어",nav:{map:"촬영지 지도"},hero:{t:"일본의 풍경",s:"ー 일본의 풍경 ー",d:"일본 각지에서 촬영한 풍경 사진을 소개합니다"},mapL:"촬영지 지도",mapH:"색칠된 도도부현을 클릭 → 사진으로 이동",backMap:"촬영지 지도로 돌아가기",lang:"언어",ft:"질문이나 의견이 있으시면 편하게 연락주세요.",scroll:"← 스와이프 / 스크롤 →",oki:"오키나와",tapHint:"다시 탭 → 사진",footer2:"무단 전재 및 사용을 금합니다.",contact:{title:"문의",name:"이름",email:"이메일",msg:"메시지",send:"보내기",sent:"전송 완료! 감사합니다.",err:"전송 실패. 다시 시도해주세요."}},
  es:{name:"Español",nav:{map:"Mapa de ubicaciones"},hero:{t:"Paisajes de Japón",s:"ー Japón en foco ー",d:"Una colección de fotografías de paisajes tomadas por todo Japón"},mapL:"Ubicaciones de fotos",mapH:"Haz clic en una prefectura destacada → ver fotos",backMap:"Volver al mapa",lang:"Idioma",ft:"No dudes en contactarme si tienes preguntas o comentarios.",scroll:"← Deslizar / Desplazar →",oki:"Okinawa",tapHint:"Toca de nuevo → fotos",footer2:"Queda prohibida la reproducción no autorizada.",contact:{title:"Contacto",name:"Nombre",email:"Correo electrónico",msg:"Mensaje",send:"Enviar",sent:"¡Enviado! Gracias.",err:"Error al enviar. Inténtalo de nuevo."}},
  fr:{name:"Français",nav:{map:"Carte des lieux"},hero:{t:"Paysages du Japon",s:"ー Le Japon en images ー",d:"Une collection de photos de paysages prises à travers le Japon"},mapL:"Lieux de prise de vue",mapH:"Cliquez sur une préfecture en couleur → voir les photos",backMap:"Retour à la carte",lang:"Langue",ft:"N'hésitez pas à me contacter pour toute question.",scroll:"← Glisser / Défiler →",oki:"Okinawa",tapHint:"Appuyez à nouveau → photos",footer2:"Toute reproduction non autorisée est interdite.",contact:{title:"Contact",name:"Nom",email:"E-mail",msg:"Message",send:"Envoyer",sent:"Envoyé ! Merci.",err:"Échec de l'envoi. Veuillez réessayer."}},
  de:{name:"Deutsch",nav:{map:"Standortkarte"},hero:{t:"Landschaften Japans",s:"ー Japan im Fokus ー",d:"Eine Sammlung von Landschaftsfotos aus ganz Japan"},mapL:"Aufnahmeorte",mapH:"Klicke auf eine markierte Präfektur → Fotos ansehen",backMap:"Zurück zur Karte",lang:"Sprache",ft:"Bei Fragen oder Anregungen gerne Kontakt aufnehmen.",scroll:"← Wischen / Scrollen →",oki:"Okinawa",tapHint:"Nochmal tippen → Fotos",footer2:"Unerlaubte Vervielfältigung verboten.",contact:{title:"Kontakt",name:"Name",email:"E-Mail",msg:"Nachricht",send:"Senden",sent:"Gesendet! Vielen Dank.",err:"Senden fehlgeschlagen. Bitte erneut versuchen."}},
  pt:{name:"Português",nav:{map:"Mapa de locais"},hero:{t:"Paisagens do Japão",s:"ー Japão em foco ー",d:"Uma coleção de fotos de paisagens tiradas por todo o Japão"},mapL:"Locais de fotos",mapH:"Clique numa prefeitura destacada → ver fotos",backMap:"Voltar ao mapa",lang:"Idioma",ft:"Sinta-se à vontade para entrar em contato.",scroll:"← Deslizar / Rolar →",oki:"Okinawa",tapHint:"Toque novamente → fotos",footer2:"Reprodução não autorizada proibida.",contact:{title:"Contato",name:"Nome",email:"E-mail",msg:"Mensagem",send:"Enviar",sent:"Enviado! Obrigado.",err:"Falha no envio. Tente novamente."}},
  it:{name:"Italiano",nav:{map:"Mappa dei luoghi"},hero:{t:"Paesaggi del Giappone",s:"ー Giappone a fuoco ー",d:"Una raccolta di fotografie paesaggistiche scattate in tutto il Giappone"},mapL:"Luoghi di scatto",mapH:"Clicca su una prefettura evidenziata → vedi le foto",backMap:"Torna alla mappa",lang:"Lingua",ft:"Non esitare a contattarmi per domande o suggerimenti.",scroll:"← Scorri / Scorrere →",oki:"Okinawa",tapHint:"Tocca di nuovo → foto",footer2:"Riproduzione non autorizzata vietata.",contact:{title:"Contatti",name:"Nome",email:"E-mail",msg:"Messaggio",send:"Invia",sent:"Inviato! Grazie.",err:"Invio fallito. Riprova."}},
  ru:{name:"Русский",nav:{map:"Карта съёмок"},hero:{t:"Пейзажи Японии",s:"ー Япония в фокусе ー",d:"Коллекция пейзажных фотографий, снятых по всей Японии"},mapL:"Места съёмок",mapH:"Нажмите на выделенную префектуру → перейти к фото",backMap:"Вернуться к карте",lang:"Язык",ft:"Если есть вопросы или предложения — пишите.",scroll:"← Свайп / Прокрутка →",oki:"Окинава",tapHint:"Нажмите ещё раз → фото",footer2:"Несанкционированное копирование запрещено.",contact:{title:"Связаться",name:"Имя",email:"Эл. почта",msg:"Сообщение",send:"Отправить",sent:"Отправлено! Спасибо.",err:"Ошибка отправки. Попробуйте снова."}},
  ar:{name:"العربية",nav:{map:"خريطة المواقع"},hero:{t:"مناظر اليابان",s:"ー اليابان في صور ー",d:"مجموعة من صور المناظر الطبيعية الملتقطة في أنحاء اليابان"},mapL:"مواقع التصوير",mapH:"انقر على محافظة ملونة ← لعرض الصور",backMap:"العودة إلى الخريطة",lang:"اللغة",ft:"لا تترددوا في التواصل لأي استفسار أو ملاحظة.",scroll:"← مرر / اسحب →",oki:"أوكيناوا",tapHint:"انقر مرة أخرى ← صور",footer2:"يُحظر النسخ أو الاستخدام غير المصرح به.",contact:{title:"تواصل معنا",name:"الاسم",email:"البريد الإلكتروني",msg:"الرسالة",send:"إرسال",sent:"تم الإرسال! شكراً لكم.",err:"فشل الإرسال. يرجى المحاولة مرة أخرى."}},
  hi:{name:"हिन्दी",nav:{map:"लोकेशन मैप"},hero:{t:"जापान के दृश्य",s:"ー जापान की झलक ー",d:"पूरे जापान में ली गई लैंडस्केप तस्वीरों का संग्रह"},mapL:"फोटो लोकेशन",mapH:"रंगीन प्रान्त पर क्लिक करें → फ़ोटो देखें",backMap:"मैप पर वापस जाएँ",lang:"भाषा",ft:"किसी भी सवाल या सुझाव के लिए संपर्क करें।",scroll:"← स्वाइप / स्क्रॉल →",oki:"ओकिनावा",tapHint:"फिर से टैप करें → फ़ोटो",footer2:"अनधिकृत पुनरुत्पादन प्रतिबंधित है।",contact:{title:"संपर्क",name:"नाम",email:"ईमेल",msg:"संदेश",send:"भेजें",sent:"भेज दिया! धन्यवाद।",err:"भेजने में विफल। कृपया पुनः प्रयास करें।"}},
  th:{name:"ไทย",nav:{map:"แผนที่ถ่ายภาพ"},hero:{t:"ทิวทัศน์ญี่ปุ่น",s:"ー ญี่ปุ่นในโฟกัส ー",d:"รวมภาพถ่ายทิวทัศน์จากทั่วญี่ปุ่น"},mapL:"สถานที่ถ่ายภาพ",mapH:"คลิกจังหวัดที่เน้นสี → ดูภาพถ่าย",backMap:"กลับไปที่แผนที่",lang:"ภาษา",ft:"หากมีคำถามหรือข้อเสนอแนะ ติดต่อได้เลย",scroll:"← ปัด / เลื่อน →",oki:"โอกินาวา",tapHint:"แตะอีกครั้ง → ดูภาพ",footer2:"ห้ามทำซ้ำโดยไม่ได้รับอนุญาต",contact:{title:"ติดต่อ",name:"ชื่อ",email:"อีเมล",msg:"ข้อความ",send:"ส่ง",sent:"ส่งแล้ว! ขอบคุณครับ",err:"ส่งไม่สำเร็จ กรุณาลองใหม่"}},
  vi:{name:"Tiếng Việt",nav:{map:"Bản đồ chụp ảnh"},hero:{t:"Phong cảnh Nhật Bản",s:"ー Nhật Bản qua ống kính ー",d:"Bộ sưu tập ảnh phong cảnh chụp khắp Nhật Bản"},mapL:"Địa điểm chụp ảnh",mapH:"Nhấp vào tỉnh được tô màu → xem ảnh",backMap:"Quay lại bản đồ",lang:"Ngôn ngữ",ft:"Mọi câu hỏi hay góp ý, xin hãy liên hệ.",scroll:"← Vuốt / Cuộn →",oki:"Okinawa",tapHint:"Nhấn lần nữa → ảnh",footer2:"Nghiêm cấm sao chép trái phép.",contact:{title:"Liên hệ",name:"Họ tên",email:"Email",msg:"Tin nhắn",send:"Gửi",sent:"Đã gửi! Cảm ơn bạn.",err:"Gửi thất bại. Vui lòng thử lại."}},
  id:{name:"Bahasa Indonesia",nav:{map:"Peta lokasi"},hero:{t:"Pemandangan Jepang",s:"ー Jepang dalam Fokus ー",d:"Kumpulan foto pemandangan dari seluruh Jepang"},mapL:"Lokasi pemotretan",mapH:"Klik prefektur berwarna → lihat foto",backMap:"Kembali ke peta",lang:"Bahasa",ft:"Jangan ragu untuk menghubungi jika ada pertanyaan.",scroll:"← Geser / Gulir →",oki:"Okinawa",tapHint:"Ketuk lagi → foto",footer2:"Dilarang memperbanyak tanpa izin.",contact:{title:"Kontak",name:"Nama",email:"Email",msg:"Pesan",send:"Kirim",sent:"Terkirim! Terima kasih.",err:"Gagal mengirim. Silakan coba lagi."}},
  tr:{name:"Türkçe",nav:{map:"Konum haritası"},hero:{t:"Japonya Manzaraları",s:"ー Japonya Odakta ー",d:"Japonya genelinde çekilen manzara fotoğrafları koleksiyonu"},mapL:"Çekim noktaları",mapH:"Renkli bir ili tıklayın → fotoğrafları görün",backMap:"Haritaya dön",lang:"Dil",ft:"Soru veya önerileriniz için iletişime geçebilirsiniz.",scroll:"← Kaydır →",oki:"Okinawa",tapHint:"Tekrar dokun → fotoğraflar",footer2:"İzinsiz çoğaltma yasaktır.",contact:{title:"İletişim",name:"Ad",email:"E-posta",msg:"Mesaj",send:"Gönder",sent:"Gönderildi! Teşekkürler.",err:"Gönderilemedi. Lütfen tekrar deneyin."}},
  nl:{name:"Nederlands",nav:{map:"Locatiekaart"},hero:{t:"Landschappen van Japan",s:"ー Japan in beeld ー",d:"Een collectie landschapsfoto's gemaakt door heel Japan"},mapL:"Fotolocaties",mapH:"Klik op een gemarkeerde prefectuur → bekijk foto's",backMap:"Terug naar kaart",lang:"Taal",ft:"Neem gerust contact op bij vragen of opmerkingen.",scroll:"← Veeg / Scroll →",oki:"Okinawa",tapHint:"Tik opnieuw → foto's",footer2:"Ongeautoriseerde reproductie verboden.",contact:{title:"Contact",name:"Naam",email:"E-mail",msg:"Bericht",send:"Verstuur",sent:"Verstuurd! Bedankt.",err:"Verzenden mislukt. Probeer opnieuw."}},
  pl:{name:"Polski",nav:{map:"Mapa lokalizacji"},hero:{t:"Krajobrazy Japonii",s:"ー Japonia w obiektywie ー",d:"Kolekcja zdjęć krajobrazowych z całej Japonii"},mapL:"Miejsca fotografii",mapH:"Kliknij wyróżnioną prefekturę → zobacz zdjęcia",backMap:"Wróć do mapy",lang:"Język",ft:"W razie pytań lub uwag zapraszam do kontaktu.",scroll:"← Przesuń / Przewiń →",oki:"Okinawa",tapHint:"Dotknij ponownie → zdjęcia",footer2:"Nieautoryzowane kopiowanie zabronione.",contact:{title:"Kontakt",name:"Imię",email:"E-mail",msg:"Wiadomość",send:"Wyślij",sent:"Wysłano! Dziękuję.",err:"Wysyłanie nie powiodło się. Spróbuj ponownie."}},
  sv:{name:"Svenska",nav:{map:"Platskarta"},hero:{t:"Japans landskap",s:"ー Japan i fokus ー",d:"En samling landskapsfotografier tagna runt om i Japan"},mapL:"Fotoplatser",mapH:"Klicka på en markerad prefektur → se foton",backMap:"Tillbaka till kartan",lang:"Språk",ft:"Hör gärna av dig med frågor eller synpunkter.",scroll:"← Svep / Scrolla →",oki:"Okinawa",tapHint:"Tryck igen → foton",footer2:"Otillåten reproduktion förbjuden.",contact:{title:"Kontakt",name:"Namn",email:"E-post",msg:"Meddelande",send:"Skicka",sent:"Skickat! Tack.",err:"Kunde inte skicka. Försök igen."}},
};

const CLOUD = "dr53c12fo";
const cldUrl = (id, w) => "https://res.cloudinary.com/" + CLOUD + "/image/upload/w_" + w + ",f_auto,q_auto/" + encodeURIComponent(id) + ".jpg";

/* ── Prefecture name translations (47 prefs × 20 langs) ── */
const PREF_I18N = {
  "北海道":{ja:"北海道",en:"Hokkaido",zh:"北海道","zh-tw":"北海道",ko:"홋카이도",es:"Hokkaido",fr:"Hokkaido",de:"Hokkaido",pt:"Hokkaido",it:"Hokkaido",nl:"Hokkaido",pl:"Hokkaido",sv:"Hokkaido",tr:"Hokkaido",id:"Hokkaido",vi:"Hokkaido",ru:"Хоккайдо",ar:"هوكايدو",hi:"होक्काइदो",th:"ฮอกไกโด"},
  "青森県":{ja:"青森県",en:"Aomori",zh:"青森县","zh-tw":"青森縣",ko:"아오모리현",es:"Aomori",fr:"Aomori",de:"Aomori",pt:"Aomori",it:"Aomori",nl:"Aomori",pl:"Aomori",sv:"Aomori",tr:"Aomori",id:"Aomori",vi:"Aomori",ru:"Аомори",ar:"أوموري",hi:"आओमोरी",th:"อาโอโมริ"},
  "岩手県":{ja:"岩手県",en:"Iwate",zh:"岩手县","zh-tw":"岩手縣",ko:"이와테현",es:"Iwate",fr:"Iwate",de:"Iwate",pt:"Iwate",it:"Iwate",nl:"Iwate",pl:"Iwate",sv:"Iwate",tr:"Iwate",id:"Iwate",vi:"Iwate",ru:"Иватэ",ar:"إيواتيه",hi:"इवाते",th:"อิวาเตะ"},
  "宮城県":{ja:"宮城県",en:"Miyagi",zh:"宫城县","zh-tw":"宮城縣",ko:"미야기현",es:"Miyagi",fr:"Miyagi",de:"Miyagi",pt:"Miyagi",it:"Miyagi",nl:"Miyagi",pl:"Miyagi",sv:"Miyagi",tr:"Miyagi",id:"Miyagi",vi:"Miyagi",ru:"Мияги",ar:"مياغي",hi:"मियागी",th:"มิยากิ"},
  "秋田県":{ja:"秋田県",en:"Akita",zh:"秋田县","zh-tw":"秋田縣",ko:"아키타현",es:"Akita",fr:"Akita",de:"Akita",pt:"Akita",it:"Akita",nl:"Akita",pl:"Akita",sv:"Akita",tr:"Akita",id:"Akita",vi:"Akita",ru:"Акита",ar:"أكيتا",hi:"अकिता",th:"อากิตะ"},
  "山形県":{ja:"山形県",en:"Yamagata",zh:"山形县","zh-tw":"山形縣",ko:"야마가타현",es:"Yamagata",fr:"Yamagata",de:"Yamagata",pt:"Yamagata",it:"Yamagata",nl:"Yamagata",pl:"Yamagata",sv:"Yamagata",tr:"Yamagata",id:"Yamagata",vi:"Yamagata",ru:"Ямагата",ar:"ياماغاتا",hi:"यामागाता",th:"ยามากาตะ"},
  "福島県":{ja:"福島県",en:"Fukushima",zh:"福岛县","zh-tw":"福島縣",ko:"후쿠시마현",es:"Fukushima",fr:"Fukushima",de:"Fukushima",pt:"Fukushima",it:"Fukushima",nl:"Fukushima",pl:"Fukushima",sv:"Fukushima",tr:"Fukushima",id:"Fukushima",vi:"Fukushima",ru:"Фукусима",ar:"فوكوشيما",hi:"फ़ुकुशिमा",th:"ฟุกุชิมะ"},
  "茨城県":{ja:"茨城県",en:"Ibaraki",zh:"茨城县","zh-tw":"茨城縣",ko:"이바라키현",es:"Ibaraki",fr:"Ibaraki",de:"Ibaraki",pt:"Ibaraki",it:"Ibaraki",nl:"Ibaraki",pl:"Ibaraki",sv:"Ibaraki",tr:"Ibaraki",id:"Ibaraki",vi:"Ibaraki",ru:"Ибараки",ar:"إيباراكي",hi:"इबाराकी",th:"อิบารากิ"},
  "栃木県":{ja:"栃木県",en:"Tochigi",zh:"栃木县","zh-tw":"栃木縣",ko:"도치기현",es:"Tochigi",fr:"Tochigi",de:"Tochigi",pt:"Tochigi",it:"Tochigi",nl:"Tochigi",pl:"Tochigi",sv:"Tochigi",tr:"Tochigi",id:"Tochigi",vi:"Tochigi",ru:"Тотиги",ar:"توتشيغي",hi:"तोचिगी",th:"โทจิงิ"},
  "群馬県":{ja:"群馬県",en:"Gunma",zh:"群马县","zh-tw":"群馬縣",ko:"군마현",es:"Gunma",fr:"Gunma",de:"Gunma",pt:"Gunma",it:"Gunma",nl:"Gunma",pl:"Gunma",sv:"Gunma",tr:"Gunma",id:"Gunma",vi:"Gunma",ru:"Гумма",ar:"غونما",hi:"गुम्मा",th:"กุมมะ"},
  "埼玉県":{ja:"埼玉県",en:"Saitama",zh:"埼玉县","zh-tw":"埼玉縣",ko:"사이타마현",es:"Saitama",fr:"Saitama",de:"Saitama",pt:"Saitama",it:"Saitama",nl:"Saitama",pl:"Saitama",sv:"Saitama",tr:"Saitama",id:"Saitama",vi:"Saitama",ru:"Сайтама",ar:"سايتاما",hi:"साइतामा",th:"ไซตามะ"},
  "千葉県":{ja:"千葉県",en:"Chiba",zh:"千叶县","zh-tw":"千葉縣",ko:"지바현",es:"Chiba",fr:"Chiba",de:"Chiba",pt:"Chiba",it:"Chiba",nl:"Chiba",pl:"Chiba",sv:"Chiba",tr:"Chiba",id:"Chiba",vi:"Chiba",ru:"Тиба",ar:"تشيبا",hi:"चिबा",th:"จิบะ"},
  "東京都":{ja:"東京都",en:"Tokyo",zh:"东京都","zh-tw":"東京都",ko:"도쿄도",es:"Tokio",fr:"Tokyo",de:"Tokio",pt:"Tóquio",it:"Tokyo",nl:"Tokio",pl:"Tokio",sv:"Tokyo",tr:"Tokyo",id:"Tokyo",vi:"Tokyo",ru:"Токио",ar:"طوكيو",hi:"टोक्यो",th:"โตเกียว"},
  "神奈川県":{ja:"神奈川県",en:"Kanagawa",zh:"神奈川县","zh-tw":"神奈川縣",ko:"가나가와현",es:"Kanagawa",fr:"Kanagawa",de:"Kanagawa",pt:"Kanagawa",it:"Kanagawa",nl:"Kanagawa",pl:"Kanagawa",sv:"Kanagawa",tr:"Kanagawa",id:"Kanagawa",vi:"Kanagawa",ru:"Канагава",ar:"كاناغاوا",hi:"कानागावा",th:"คานากาวา"},
  "新潟県":{ja:"新潟県",en:"Niigata",zh:"新潟县","zh-tw":"新潟縣",ko:"니가타현",es:"Niigata",fr:"Niigata",de:"Niigata",pt:"Niigata",it:"Niigata",nl:"Niigata",pl:"Niigata",sv:"Niigata",tr:"Niigata",id:"Niigata",vi:"Niigata",ru:"Ниигата",ar:"نييغاتا",hi:"नीगाता",th:"นีงาตะ"},
  "富山県":{ja:"富山県",en:"Toyama",zh:"富山县","zh-tw":"富山縣",ko:"도야마현",es:"Toyama",fr:"Toyama",de:"Toyama",pt:"Toyama",it:"Toyama",nl:"Toyama",pl:"Toyama",sv:"Toyama",tr:"Toyama",id:"Toyama",vi:"Toyama",ru:"Тояма",ar:"توياما",hi:"तोयामा",th:"โทยามะ"},
  "石川県":{ja:"石川県",en:"Ishikawa",zh:"石川县","zh-tw":"石川縣",ko:"이시카와현",es:"Ishikawa",fr:"Ishikawa",de:"Ishikawa",pt:"Ishikawa",it:"Ishikawa",nl:"Ishikawa",pl:"Ishikawa",sv:"Ishikawa",tr:"Ishikawa",id:"Ishikawa",vi:"Ishikawa",ru:"Исикава",ar:"إيشيكاوا",hi:"इशिकावा",th:"อิชิกาวา"},
  "福井県":{ja:"福井県",en:"Fukui",zh:"福井县","zh-tw":"福井縣",ko:"후쿠이현",es:"Fukui",fr:"Fukui",de:"Fukui",pt:"Fukui",it:"Fukui",nl:"Fukui",pl:"Fukui",sv:"Fukui",tr:"Fukui",id:"Fukui",vi:"Fukui",ru:"Фукуи",ar:"فوكوي",hi:"फ़ुकुई",th:"ฟุกุอิ"},
  "山梨県":{ja:"山梨県",en:"Yamanashi",zh:"山梨县","zh-tw":"山梨縣",ko:"야마나시현",es:"Yamanashi",fr:"Yamanashi",de:"Yamanashi",pt:"Yamanashi",it:"Yamanashi",nl:"Yamanashi",pl:"Yamanashi",sv:"Yamanashi",tr:"Yamanashi",id:"Yamanashi",vi:"Yamanashi",ru:"Яманаси",ar:"يامانشي",hi:"यामानाशी",th:"ยามานาชิ"},
  "長野県":{ja:"長野県",en:"Nagano",zh:"长野县","zh-tw":"長野縣",ko:"나가노현",es:"Nagano",fr:"Nagano",de:"Nagano",pt:"Nagano",it:"Nagano",nl:"Nagano",pl:"Nagano",sv:"Nagano",tr:"Nagano",id:"Nagano",vi:"Nagano",ru:"Нагано",ar:"ناغانو",hi:"नागानो",th:"นากาโน"},
  "岐阜県":{ja:"岐阜県",en:"Gifu",zh:"岐阜县","zh-tw":"岐阜縣",ko:"기후현",es:"Gifu",fr:"Gifu",de:"Gifu",pt:"Gifu",it:"Gifu",nl:"Gifu",pl:"Gifu",sv:"Gifu",tr:"Gifu",id:"Gifu",vi:"Gifu",ru:"Гифу",ar:"غيفو",hi:"गिफ़ु",th:"กิฟุ"},
  "静岡県":{ja:"静岡県",en:"Shizuoka",zh:"静冈县","zh-tw":"靜岡縣",ko:"시즈오카현",es:"Shizuoka",fr:"Shizuoka",de:"Shizuoka",pt:"Shizuoka",it:"Shizuoka",nl:"Shizuoka",pl:"Shizuoka",sv:"Shizuoka",tr:"Shizuoka",id:"Shizuoka",vi:"Shizuoka",ru:"Сидзуока",ar:"شيزوكا",hi:"शिज़ुओका",th:"ชิซูโอกะ"},
  "愛知県":{ja:"愛知県",en:"Aichi",zh:"爱知县","zh-tw":"愛知縣",ko:"아이치현",es:"Aichi",fr:"Aichi",de:"Aichi",pt:"Aichi",it:"Aichi",nl:"Aichi",pl:"Aichi",sv:"Aichi",tr:"Aichi",id:"Aichi",vi:"Aichi",ru:"Айти",ar:"آيتشي",hi:"आइची",th:"ไอจิ"},
  "三重県":{ja:"三重県",en:"Mie",zh:"三重县","zh-tw":"三重縣",ko:"미에현",es:"Mie",fr:"Mie",de:"Mie",pt:"Mie",it:"Mie",nl:"Mie",pl:"Mie",sv:"Mie",tr:"Mie",id:"Mie",vi:"Mie",ru:"Миэ",ar:"ميه",hi:"मिए",th:"มิเอะ"},
  "滋賀県":{ja:"滋賀県",en:"Shiga",zh:"滋贺县","zh-tw":"滋賀縣",ko:"시가현",es:"Shiga",fr:"Shiga",de:"Shiga",pt:"Shiga",it:"Shiga",nl:"Shiga",pl:"Shiga",sv:"Shiga",tr:"Shiga",id:"Shiga",vi:"Shiga",ru:"Сига",ar:"شيغا",hi:"शिगा",th:"ชิกะ"},
  "京都府":{ja:"京都府",en:"Kyoto",zh:"京都府","zh-tw":"京都府",ko:"교토부",es:"Kioto",fr:"Kyoto",de:"Kyoto",pt:"Quioto",it:"Kyoto",nl:"Kyoto",pl:"Kioto",sv:"Kyoto",tr:"Kyoto",id:"Kyoto",vi:"Kyoto",ru:"Киото",ar:"كيوتو",hi:"क्योटो",th:"เกียวโต"},
  "大阪府":{ja:"大阪府",en:"Osaka",zh:"大阪府","zh-tw":"大阪府",ko:"오사카부",es:"Osaka",fr:"Osaka",de:"Osaka",pt:"Osaka",it:"Osaka",nl:"Osaka",pl:"Osaka",sv:"Osaka",tr:"Osaka",id:"Osaka",vi:"Osaka",ru:"Осака",ar:"أوساكا",hi:"ओसाका",th:"โอซาก้า"},
  "兵庫県":{ja:"兵庫県",en:"Hyogo",zh:"兵库县","zh-tw":"兵庫縣",ko:"효고현",es:"Hyogo",fr:"Hyogo",de:"Hyogo",pt:"Hyogo",it:"Hyogo",nl:"Hyogo",pl:"Hyogo",sv:"Hyogo",tr:"Hyogo",id:"Hyogo",vi:"Hyogo",ru:"Хёго",ar:"هيوغو",hi:"ह्योगो",th:"เฮียวโงะ"},
  "奈良県":{ja:"奈良県",en:"Nara",zh:"奈良县","zh-tw":"奈良縣",ko:"나라현",es:"Nara",fr:"Nara",de:"Nara",pt:"Nara",it:"Nara",nl:"Nara",pl:"Nara",sv:"Nara",tr:"Nara",id:"Nara",vi:"Nara",ru:"Нара",ar:"نارا",hi:"नारा",th:"นารา"},
  "和歌山県":{ja:"和歌山県",en:"Wakayama",zh:"和歌山县","zh-tw":"和歌山縣",ko:"와카야마현",es:"Wakayama",fr:"Wakayama",de:"Wakayama",pt:"Wakayama",it:"Wakayama",nl:"Wakayama",pl:"Wakayama",sv:"Wakayama",tr:"Wakayama",id:"Wakayama",vi:"Wakayama",ru:"Вакаяма",ar:"واكاياما",hi:"वाकायामा",th:"วากายามะ"},
  "鳥取県":{ja:"鳥取県",en:"Tottori",zh:"鸟取县","zh-tw":"鳥取縣",ko:"돗토리현",es:"Tottori",fr:"Tottori",de:"Tottori",pt:"Tottori",it:"Tottori",nl:"Tottori",pl:"Tottori",sv:"Tottori",tr:"Tottori",id:"Tottori",vi:"Tottori",ru:"Тоттори",ar:"توتوري",hi:"तोत्तोरी",th:"ทตโตริ"},
  "島根県":{ja:"島根県",en:"Shimane",zh:"岛根县","zh-tw":"島根縣",ko:"시마네현",es:"Shimane",fr:"Shimane",de:"Shimane",pt:"Shimane",it:"Shimane",nl:"Shimane",pl:"Shimane",sv:"Shimane",tr:"Shimane",id:"Shimane",vi:"Shimane",ru:"Симанэ",ar:"شيمانيه",hi:"शिमाने",th:"ชิมาเนะ"},
  "岡山県":{ja:"岡山県",en:"Okayama",zh:"冈山县","zh-tw":"岡山縣",ko:"오카야마현",es:"Okayama",fr:"Okayama",de:"Okayama",pt:"Okayama",it:"Okayama",nl:"Okayama",pl:"Okayama",sv:"Okayama",tr:"Okayama",id:"Okayama",vi:"Okayama",ru:"Окаяма",ar:"أوكاياما",hi:"ओकायामा",th:"โอกายามะ"},
  "広島県":{ja:"広島県",en:"Hiroshima",zh:"广岛县","zh-tw":"廣島縣",ko:"히로시마현",es:"Hiroshima",fr:"Hiroshima",de:"Hiroshima",pt:"Hiroshima",it:"Hiroshima",nl:"Hiroshima",pl:"Hiroszima",sv:"Hiroshima",tr:"Hiroşima",id:"Hiroshima",vi:"Hiroshima",ru:"Хиросима",ar:"هيروشيما",hi:"हिरोशिमा",th:"ฮิโรชิมะ"},
  "山口県":{ja:"山口県",en:"Yamaguchi",zh:"山口县","zh-tw":"山口縣",ko:"야마구치현",es:"Yamaguchi",fr:"Yamaguchi",de:"Yamaguchi",pt:"Yamaguchi",it:"Yamaguchi",nl:"Yamaguchi",pl:"Yamaguchi",sv:"Yamaguchi",tr:"Yamaguchi",id:"Yamaguchi",vi:"Yamaguchi",ru:"Ямагути",ar:"ياماغوتشي",hi:"यामागुची",th:"ยามากุจิ"},
  "徳島県":{ja:"徳島県",en:"Tokushima",zh:"德岛县","zh-tw":"德島縣",ko:"도쿠시마현",es:"Tokushima",fr:"Tokushima",de:"Tokushima",pt:"Tokushima",it:"Tokushima",nl:"Tokushima",pl:"Tokushima",sv:"Tokushima",tr:"Tokushima",id:"Tokushima",vi:"Tokushima",ru:"Токусима",ar:"توكوشيما",hi:"तोकुशिमा",th:"โทกุชิมะ"},
  "香川県":{ja:"香川県",en:"Kagawa",zh:"香川县","zh-tw":"香川縣",ko:"가가와현",es:"Kagawa",fr:"Kagawa",de:"Kagawa",pt:"Kagawa",it:"Kagawa",nl:"Kagawa",pl:"Kagawa",sv:"Kagawa",tr:"Kagawa",id:"Kagawa",vi:"Kagawa",ru:"Кагава",ar:"كاغاوا",hi:"कागावा",th:"คากาวะ"},
  "愛媛県":{ja:"愛媛県",en:"Ehime",zh:"爱媛县","zh-tw":"愛媛縣",ko:"에히메현",es:"Ehime",fr:"Ehime",de:"Ehime",pt:"Ehime",it:"Ehime",nl:"Ehime",pl:"Ehime",sv:"Ehime",tr:"Ehime",id:"Ehime",vi:"Ehime",ru:"Эхимэ",ar:"إيهيميه",hi:"एहिमे",th:"เอฮิเมะ"},
  "高知県":{ja:"高知県",en:"Kochi",zh:"高知县","zh-tw":"高知縣",ko:"고치현",es:"Kochi",fr:"Kochi",de:"Kochi",pt:"Kochi",it:"Kochi",nl:"Kochi",pl:"Kochi",sv:"Kochi",tr:"Kochi",id:"Kochi",vi:"Kochi",ru:"Коти",ar:"كوتشي",hi:"कोची",th:"โคจิ"},
  "福岡県":{ja:"福岡県",en:"Fukuoka",zh:"福冈县","zh-tw":"福岡縣",ko:"후쿠오카현",es:"Fukuoka",fr:"Fukuoka",de:"Fukuoka",pt:"Fukuoka",it:"Fukuoka",nl:"Fukuoka",pl:"Fukuoka",sv:"Fukuoka",tr:"Fukuoka",id:"Fukuoka",vi:"Fukuoka",ru:"Фукуока",ar:"فوكوكا",hi:"फ़ुकुओका",th:"ฟุกุโอกะ"},
  "佐賀県":{ja:"佐賀県",en:"Saga",zh:"佐贺县","zh-tw":"佐賀縣",ko:"사가현",es:"Saga",fr:"Saga",de:"Saga",pt:"Saga",it:"Saga",nl:"Saga",pl:"Saga",sv:"Saga",tr:"Saga",id:"Saga",vi:"Saga",ru:"Сага",ar:"ساغا",hi:"सागा",th:"ซากะ"},
  "長崎県":{ja:"長崎県",en:"Nagasaki",zh:"长崎县","zh-tw":"長崎縣",ko:"나가사키현",es:"Nagasaki",fr:"Nagasaki",de:"Nagasaki",pt:"Nagasaki",it:"Nagasaki",nl:"Nagasaki",pl:"Nagasaki",sv:"Nagasaki",tr:"Nagasaki",id:"Nagasaki",vi:"Nagasaki",ru:"Нагасаки",ar:"ناغاساكي",hi:"नागासाकी",th:"นางาซากิ"},
  "熊本県":{ja:"熊本県",en:"Kumamoto",zh:"熊本县","zh-tw":"熊本縣",ko:"구마모토현",es:"Kumamoto",fr:"Kumamoto",de:"Kumamoto",pt:"Kumamoto",it:"Kumamoto",nl:"Kumamoto",pl:"Kumamoto",sv:"Kumamoto",tr:"Kumamoto",id:"Kumamoto",vi:"Kumamoto",ru:"Кумамото",ar:"كوماموتو",hi:"कुमामोटो",th:"คุมาโมโตะ"},
  "大分県":{ja:"大分県",en:"Oita",zh:"大分县","zh-tw":"大分縣",ko:"오이타현",es:"Oita",fr:"Oita",de:"Oita",pt:"Oita",it:"Oita",nl:"Oita",pl:"Oita",sv:"Oita",tr:"Oita",id:"Oita",vi:"Oita",ru:"Оита",ar:"أويتا",hi:"ओइता",th:"โออิตะ"},
  "宮崎県":{ja:"宮崎県",en:"Miyazaki",zh:"宫崎县","zh-tw":"宮崎縣",ko:"미야자키현",es:"Miyazaki",fr:"Miyazaki",de:"Miyazaki",pt:"Miyazaki",it:"Miyazaki",nl:"Miyazaki",pl:"Miyazaki",sv:"Miyazaki",tr:"Miyazaki",id:"Miyazaki",vi:"Miyazaki",ru:"Миядзаки",ar:"ميازاكي",hi:"मियाज़ाकी",th:"มิยาซากิ"},
  "鹿児島県":{ja:"鹿児島県",en:"Kagoshima",zh:"鹿儿岛县","zh-tw":"鹿兒島縣",ko:"가고시마현",es:"Kagoshima",fr:"Kagoshima",de:"Kagoshima",pt:"Kagoshima",it:"Kagoshima",nl:"Kagoshima",pl:"Kagoshima",sv:"Kagoshima",tr:"Kagoshima",id:"Kagoshima",vi:"Kagoshima",ru:"Кагосима",ar:"كاغوشيما",hi:"कागोशिमा",th:"คาโงชิมะ"},
  "沖縄県":{ja:"沖縄県",en:"Okinawa",zh:"冲绳县","zh-tw":"沖繩縣",ko:"오키나와현",es:"Okinawa",fr:"Okinawa",de:"Okinawa",pt:"Okinawa",it:"Okinawa",nl:"Okinawa",pl:"Okinawa",sv:"Okinawa",tr:"Okinawa",id:"Okinawa",vi:"Okinawa",ru:"Окинава",ar:"أوكيناوا",hi:"ओकिनावा",th:"โอกินาวา"},
};
const getPrefName = (jpName, lang) => {
  const m = PREF_I18N[jpName];
  return m ? (m[lang] || m.en || jpName) : jpName;
};

/* ── Location name translations ── */
const LOC_I18N = {
  "清水寺周辺":{ja:"清水寺周辺",en:"Around Kiyomizu-dera",zh:"清水寺周边",ko:"기요미즈데라 주변","zh-tw":"清水寺周邊",es:"Alrededores de Kiyomizu-dera",fr:"Autour de Kiyomizu-dera",de:"Umgebung von Kiyomizu-dera",pt:"Arredores de Kiyomizu-dera",it:"Dintorni di Kiyomizu-dera",ru:"Окрестности Киёмидзу-дэра",ar:"محيط كيوميزو",hi:"कियोमिज़ु-देरा के आसपास",th:"บริเวณรอบคิโยมิสึ",vi:"Quanh chùa Kiyomizu",id:"Sekitar Kiyomizu-dera",tr:"Kiyomizu-dera Çevresi",nl:"Omgeving Kiyomizu-dera",pl:"Okolice Kiyomizu-dera",sv:"Kring Kiyomizu-dera"},
  "清水寺":{ja:"清水寺",en:"Kiyomizu-dera",zh:"清水寺",ko:"기요미즈데라","zh-tw":"清水寺",es:"Kiyomizu-dera",fr:"Kiyomizu-dera",de:"Kiyomizu-dera",pt:"Kiyomizu-dera",it:"Kiyomizu-dera",ru:"Киёмидзу-дэра",ar:"معبد كيوميزو",hi:"कियोमिज़ु-देरा",th:"คิโยมิสึเดระ",vi:"Chùa Kiyomizu",id:"Kiyomizu-dera",tr:"Kiyomizu-dera",nl:"Kiyomizu-dera",pl:"Kiyomizu-dera",sv:"Kiyomizu-dera"},
  "清水寺 三重塔":{ja:"清水寺 三重塔",en:"Kiyomizu-dera Pagoda",zh:"清水寺 三重塔",ko:"기요미즈데라 삼중탑","zh-tw":"清水寺 三重塔",es:"Pagoda de Kiyomizu-dera",fr:"Pagode de Kiyomizu-dera",de:"Kiyomizu-dera Pagode",pt:"Pagode de Kiyomizu-dera",it:"Pagoda di Kiyomizu-dera",ru:"Пагода Киёмидзу-дэра",ar:"معبد كيوميزو",hi:"कियोमिज़ु-देरा पैगोडा",th:"เจดีย์คิโยมิสึ",vi:"Chùa Kiyomizu-dera",id:"Pagoda Kiyomizu-dera",tr:"Kiyomizu-dera Pagodası",nl:"Kiyomizu-dera Pagode",pl:"Pagoda Kiyomizu-dera",sv:"Kiyomizu-dera Pagod"},
  "清水寺 本堂":{ja:"清水寺 本堂",en:"Kiyomizu-dera Main Hall",zh:"清水寺 本堂",ko:"기요미즈데라 본당","zh-tw":"清水寺 本堂",es:"Salón principal de Kiyomizu-dera",fr:"Pavillon principal de Kiyomizu-dera",de:"Kiyomizu-dera Haupthalle",pt:"Salão principal de Kiyomizu-dera",it:"Sala principale di Kiyomizu-dera",ru:"Главный зал Киёмидзу-дэра",ar:"القاعة الرئيسية لكيوميزو",hi:"कियोमिज़ु-देरा मुख्य हॉल",th:"ห้องโถงหลักคิโยมิสึ",vi:"Chánh điện Kiyomizu-dera",id:"Aula utama Kiyomizu-dera",tr:"Kiyomizu-dera Ana Salon",nl:"Kiyomizu-dera Hoofdhal",pl:"Główna sala Kiyomizu-dera",sv:"Kiyomizu-dera Huvudhall"},
  "清水寺 紅葉ライトアップ":{ja:"清水寺 紅葉ライトアップ",en:"Kiyomizu-dera Autumn Illumination",zh:"清水寺 红叶灯光秀",ko:"기요미즈데라 단풍 라이트업","zh-tw":"清水寺 紅葉點燈",es:"Iluminación otoñal de Kiyomizu-dera",fr:"Illumination automnale de Kiyomizu-dera",de:"Kiyomizu-dera Herbstbeleuchtung",pt:"Iluminação outonal de Kiyomizu-dera",it:"Illuminazione autunnale di Kiyomizu-dera",ru:"Осенняя подсветка Киёмидзу-дэра",ar:"إضاءة خريف كيوميزو",hi:"कियोमिज़ु-देरा शरद रोशनी",th:"ไฟประดับใบไม้แดงคิโยมิสึ",vi:"Ánh sáng mùa thu Kiyomizu-dera",id:"Iluminasi musim gugur Kiyomizu-dera",tr:"Kiyomizu-dera Sonbahar Aydınlatması",nl:"Kiyomizu-dera Herfstverlichting",pl:"Jesienna iluminacja Kiyomizu-dera",sv:"Kiyomizu-dera Höstbelysning"},
  "八坂の塔":{ja:"八坂の塔",en:"Yasaka Pagoda",zh:"八坂塔",ko:"야사카 탑","zh-tw":"八坂塔",es:"Pagoda Yasaka",fr:"Pagode Yasaka",de:"Yasaka-Pagode",pt:"Pagode Yasaka",it:"Pagoda Yasaka",ru:"Пагода Ясака",ar:"باغودا ياساكا",hi:"यासाका पैगोडा",th:"เจดีย์ยาซากะ",vi:"Tháp Yasaka",id:"Pagoda Yasaka",tr:"Yasaka Pagodası",nl:"Yasaka Pagode",pl:"Pagoda Yasaka",sv:"Yasaka Pagod"},
  "金閣寺":{ja:"金閣寺",en:"Kinkaku-ji",zh:"金阁寺",ko:"킨카쿠지","zh-tw":"金閣寺",es:"Kinkaku-ji",fr:"Kinkaku-ji",de:"Kinkaku-ji",pt:"Kinkaku-ji",it:"Kinkaku-ji",ru:"Кинкаку-дзи",ar:"كينكاكو-جي",hi:"किंकाकु-जी",th:"คินคาคุจิ",vi:"Kinkaku-ji",id:"Kinkaku-ji",tr:"Kinkaku-ji",nl:"Kinkaku-ji",pl:"Kinkaku-ji",sv:"Kinkaku-ji"},
  "東寺 五重塔":{ja:"東寺 五重塔",en:"To-ji Five-Story Pagoda",zh:"东寺 五重塔",ko:"도지 오중탑","zh-tw":"東寺 五重塔",es:"Pagoda de cinco pisos de To-ji",fr:"Pagode à cinq étages de To-ji",de:"To-ji Fünfstöckige Pagode",pt:"Pagode de cinco andares de To-ji",it:"Pagoda a cinque piani di To-ji",ru:"Пятиярусная пагода То-дзи",ar:"باغودا توجي",hi:"तो-जी पंचमंजिला पैगोडा",th:"เจดีย์ห้าชั้นโทจิ",vi:"Tháp năm tầng To-ji",id:"Pagoda lima lantai To-ji",tr:"To-ji Beş Katlı Pagoda",nl:"To-ji Vijfverdiepingen Pagode",pl:"Pięciopiętrowa pagoda To-ji",sv:"To-ji Femvånings Pagod"},
  "東寺":{ja:"東寺",en:"To-ji Temple",zh:"东寺",ko:"도지","zh-tw":"東寺",es:"Templo To-ji",fr:"Temple To-ji",de:"To-ji Tempel",pt:"Templo To-ji",it:"Tempio To-ji",ru:"Храм То-дзи",ar:"معبد توجي",hi:"तो-जी मंदिर",th:"วัดโทจิ",vi:"Chùa To-ji",id:"Kuil To-ji",tr:"To-ji Tapınağı",nl:"To-ji Tempel",pl:"Świątynia To-ji",sv:"To-ji Tempel"},
  "平等院鳳凰堂":{ja:"平等院鳳凰堂",en:"Byodo-in Phoenix Hall",zh:"平等院凤凰堂",ko:"뵤도인 봉황당","zh-tw":"平等院鳳凰堂",es:"Salón del Fénix de Byodo-in",fr:"Pavillon du Phénix de Byodo-in",de:"Byodo-in Phönixhalle",pt:"Salão da Fênix de Byodo-in",it:"Sala della Fenice di Byodo-in",ru:"Зал Феникса Бёдо-ин",ar:"قاعة الفينيق بيودو-إن",hi:"ब्योडो-इन फ़ीनिक्स हॉल",th:"ฟีนิกซ์ฮอลล์เบียวโดอิน",vi:"Phượng Hoàng Đường Byodo-in",id:"Aula Phoenix Byodo-in",tr:"Byodo-in Anka Kuşu Salonu",nl:"Byodo-in Fenixhal",pl:"Sala Feniksa Byodo-in",sv:"Byodo-in Fenixhallen"},
  "東福寺":{ja:"東福寺",en:"Tofuku-ji",zh:"东福寺",ko:"도후쿠지","zh-tw":"東福寺",es:"Tofuku-ji",fr:"Tofuku-ji",de:"Tofuku-ji",pt:"Tofuku-ji",it:"Tofuku-ji",ru:"Тофуку-дзи",ar:"معبد توفوكوجي",hi:"तोफ़ुकु-जी",th:"โทฟุกุจิ",vi:"Chùa Tofuku-ji",id:"Tofuku-ji",tr:"Tofuku-ji",nl:"Tofuku-ji",pl:"Tofuku-ji",sv:"Tofuku-ji"},
  "東福寺 通天橋":{ja:"東福寺 通天橋",en:"Tofuku-ji Tsutenkyo Bridge",zh:"东福寺 通天桥",ko:"도후쿠지 쓰텐교","zh-tw":"東福寺 通天橋",es:"Puente Tsutenkyo de Tofuku-ji",fr:"Pont Tsutenkyo de Tofuku-ji",de:"Tofuku-ji Tsutenkyo-Brücke",pt:"Ponte Tsutenkyo de Tofuku-ji",it:"Ponte Tsutenkyo di Tofuku-ji",ru:"Мост Цутэнкё Тофуку-дзи",ar:"جسر تسوتينكيو",hi:"तोफ़ुकु-जी सुतेन्क्यो पुल",th:"สะพานซูเทนเคียวโทฟุกุจิ",vi:"Cầu Tsutenkyo Tofuku-ji",id:"Jembatan Tsutenkyo Tofuku-ji",tr:"Tofuku-ji Tsutenkyo Köprüsü",nl:"Tofuku-ji Tsutenkyo Brug",pl:"Most Tsutenkyo Tofuku-ji",sv:"Tofuku-ji Tsutenkyo-bron"},
  "紅葉":{ja:"紅葉",en:"Autumn Foliage",zh:"红叶",ko:"단풍","zh-tw":"紅葉",es:"Follaje otoñal",fr:"Feuillage d'automne",de:"Herbstlaub",pt:"Folhagem outonal",it:"Fogliame autunnale",ru:"Осенняя листва",ar:"أوراق الخريف",hi:"शरद पर्णसमूह",th:"ใบไม้เปลี่ยนสี",vi:"Lá thu",id:"Dedaunan musim gugur",tr:"Sonbahar yaprakları",nl:"Herfstkleuren",pl:"Jesienne liście",sv:"Höstlöv"},
  "紅葉ライトアップ":{ja:"紅葉ライトアップ",en:"Autumn Illumination",zh:"红叶灯光秀",ko:"단풍 라이트업","zh-tw":"紅葉點燈",es:"Iluminación otoñal",fr:"Illumination automnale",de:"Herbstbeleuchtung",pt:"Iluminação outonal",it:"Illuminazione autunnale",ru:"Осенняя подсветка",ar:"إضاءة الخريف",hi:"शरद रोशनी",th:"ไฟประดับใบไม้แดง",vi:"Ánh sáng mùa thu",id:"Iluminasi musim gugur",tr:"Sonbahar aydınlatması",nl:"Herfstverlichting",pl:"Jesienna iluminacja",sv:"Höstbelysning"},
  "寺院建築":{ja:"寺院建築",en:"Temple Architecture",zh:"寺院建筑",ko:"사찰 건축","zh-tw":"寺院建築",es:"Arquitectura del templo",fr:"Architecture du temple",de:"Tempelarchitektur",pt:"Arquitetura do templo",it:"Architettura del tempio",ru:"Архитектура храма",ar:"عمارة المعبد",hi:"मंदिर स्थापत्य",th:"สถาปัตยกรรมวัด",vi:"Kiến trúc chùa",id:"Arsitektur kuil",tr:"Tapınak mimarisi",nl:"Tempelarchitectuur",pl:"Architektura świątyni",sv:"Tempelarkitektur"},
  "姫路城":{ja:"姫路城",en:"Himeji Castle",zh:"姬路城",ko:"히메지성","zh-tw":"姬路城",es:"Castillo de Himeji",fr:"Château de Himeji",de:"Burg Himeji",pt:"Castelo de Himeji",it:"Castello di Himeji",ru:"Замок Химэдзи",ar:"قلعة هيميجي",hi:"हिमेजी कैसल",th:"ปราสาทฮิเมจิ",vi:"Lâu đài Himeji",id:"Kastil Himeji",tr:"Himeji Kalesi",nl:"Kasteel Himeji",pl:"Zamek Himeji",sv:"Himeji slott"},
};
const getLocName = (jpName, lang) => {
  const m = LOC_I18N[jpName];
  return m ? (m[lang] || m.en || jpName) : jpName;
};
const PREFECTURES = [
  {
    pref: "京都府",
    lat: 35.01, lng: 135.77,
    photos: [
      /* 清水寺エリア */
      { id: "DSC07601_cocitq", loc: "清水寺周辺" },
      { id: "DSC07592_anjr5r", loc: "清水寺" },
      { id: "DSC07563_icizbb", loc: "清水寺" },
      { id: "DSC07337_kaejdo", loc: "清水寺" },
      { id: "DSC07394_hhq8bw", loc: "清水寺" },
      { id: "DSC07393_xtp40k", loc: "清水寺" },
      { id: "DSC07386_vrsz1g", loc: "清水寺" },
      { id: "DSC07337_rjoogf", loc: "清水寺" },
      { id: "DSC07355_zyqovr", loc: "清水寺" },
      /* 金閣寺 */
      { id: "DSC07313_akiagf", loc: "金閣寺" },
      { id: "DSC07290_sz6x7s", loc: "金閣寺" },
      /* 東寺 */
      { id: "DSC07266_ii8otn", loc: "東寺 五重塔" },
      { id: "DSC07249_ijee7w", loc: "東寺" },
      /* 平等院（宇治） */
      { id: "DSC07504_yxpbtk", loc: "平等院鳳凰堂" },
      { id: "DSC07495_qorawr", loc: "平等院鳳凰堂" },
      /* 紅葉 */
      { id: "DSC07546_gaplky", loc: "東福寺" },
      { id: "DSC07425_zsvfno", loc: "東福寺" },
      { id: "DSC07417_dqlfwd", loc: "東福寺" },
      { id: "DSC07408_qarh4p", loc: "東福寺" },
      { id: "DSC07451_s1rhpd", loc: "東福寺" },
      { id: "DSC07241_kxqtal", loc: "東福寺" },
      { id: "DSC07173_ogwql9", loc: "東福寺" },
    ]
  },
  {
    pref: "兵庫県",
    lat: 34.84, lng: 134.69,
    photos: [
      { id: "DSC07150_hlpfgz", loc: "姫路城" },
      { id: "DSC07139_h55edw", loc: "姫路城" },
      { id: "DSC07127_wo4ifg", loc: "姫路城" },
      { id: "DSC07121_fxsgn9", loc: "姫路城" },
    ]
  },
];

/* Helper to get URL */
const getUrl = (p, w) => p.src === "unsplash"
  ? "https://images.unsplash.com/" + p.id + "?w=" + w + "&q=80"
  : cldUrl(p.id, w);

/* Flat list for map pins (first photo per prefecture) */
const MAP_PINS = PREFECTURES.map((pf, i) => ({
  id: "p" + i, lat: pf.lat, lng: pf.lng, pref: pf.pref,
  thumb: getUrl(pf.photos[0], 300),
}));

const MW = 560, MH = 720;

const GEOJSON_URLS = [
  "https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson",
  "https://raw.githubusercontent.com/smartnews-smri/japan-topography/main/data/municipality/geojson/s0010/N03-21_210101_simplified.geojson",
];

/* ── Japan Map — fetches accurate GeoJSON, falls back to embedded ── */
/* Prefectures with photos highlighted in gold; Tokyo islands excluded */
function JapanMap({ lang, photos, onPinClick, hlId }) {
  const [hov, setHov] = useState(null);
  const [tapped, setTapped] = useState(null); /* mobile: first tap shows name */
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const t = TR[lang];

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width:768px)").matches);
    const mq = window.matchMedia("(max-width:768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const photoPrefSet = useMemo(() => {
    const s = new Set();
    PREFECTURES.forEach(pf => s.add(pf.pref));
    return s;
  }, []);

  const prefMap = useMemo(() => {
    const m = {};
    photos.forEach(p => { m[p.pref] = p; });
    return m;
  }, [photos]);

  useEffect(() => {
    let cancelled = false;
    async function loadMap() {
      for (const url of GEOJSON_URLS) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) { setGeoData(data); setLoading(false); }
            return;
          }
        } catch (e) { /* try next */ }
      }
      if (!cancelled) { setGeoData(JP_GEO); setLoading(false); }
    }
    loadMap();
    return () => { cancelled = true; };
  }, []);

  /* Pinch-zoom and pan for the map */
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .on("zoom", (e) => { g.attr("transform", e.transform); });
    svg.call(zoom);
    return () => svg.on(".zoom", null);
  }, [loading]);

  /* Helper: compute centroid of a polygon ring */
  const ringCentroid = (ring) => {
    let sx = 0, sy = 0;
    ring.forEach(c => { sx += c[0]; sy += c[1]; });
    return [sx / ring.length, sy / ring.length];
  };

  /* Okinawa inset box dimensions within the SVG */
  const OKI_BOX = { x: 10, y: 140, w: 200, h: 130 };

  const { paths, okiPaths, project, okiProject } = useMemo(() => {
    if (!geoData) return { paths: [], okiPaths: [], project: () => ({ x: 0, y: 0 }), okiProject: () => ({ x: 0, y: 0 }) };

    /* Main projection */
    const projection = d3.geoMercator().center([137, 37.5]).scale(1800).translate([MW / 2, MH / 2]);
    const pathGen = d3.geoPath().projection(projection);

    /* Okinawa inset projection */
    const okiProj = d3.geoMercator().center([127.5, 26.5]).scale(3800).translate([OKI_BOX.w / 2, OKI_BOX.h / 2 + 8]);
    const okiPathGen = d3.geoPath().projection(okiProj);

    const ps = [];
    const ops = [];
    let idx = 0;

    const isOkinawaArea = (f) => {
      const name = f.properties.nam_ja || f.properties.name || "";
      if (name === "沖縄県") return true;
      /* Check centroid for unnamed features that might be Okinawa */
      try {
        const coords = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates[0][0] : f.geometry.coordinates[0];
        const cent = ringCentroid(coords);
        return cent[1] < 30 && cent[0] < 132;
      } catch (e) { return false; }
    };

    geoData.features.forEach((f) => {
      const name = f.properties.nam_ja || f.properties.name || "";
      const isPrefWithPhotos = photoPrefSet.has(name);

      if (isOkinawaArea(f)) {
        /* Okinawa goes to inset */
        ops.push({ d: okiPathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos });
      } else if (name === "東京都" && f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polyCoords) => {
          const cent = ringCentroid(polyCoords[0]);
          const isMainland = cent[1] > 34.5;
          const subFeature = { type: "Feature", properties: f.properties, geometry: { type: "Polygon", coordinates: polyCoords } };
          ps.push({ d: pathGen(subFeature), id: idx++, name: name, hasPhotos: isPrefWithPhotos && isMainland });
        });
      } else if (name === "東京都" && f.geometry.type === "Polygon") {
        const cent = ringCentroid(f.geometry.coordinates[0]);
        const isMainland = cent[1] > 34.5;
        ps.push({ d: pathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos && isMainland });
      } else {
        ps.push({ d: pathGen(f), id: idx++, name: name, hasPhotos: isPrefWithPhotos });
      }
    });

    const proj = (lat, lng) => { const p = projection([lng, lat]); return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 }; };
    const okiProjFn = (lat, lng) => { const p = okiProj([lng, lat]); return p ? { x: p[0] + OKI_BOX.x, y: p[1] + OKI_BOX.y } : { x: 0, y: 0 }; };
    return { paths: ps, okiPaths: ops, project: proj, okiProject: okiProjFn };
  }, [geoData, photoPrefSet]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ width: 20, height: 20, border: "2px solid rgba(232,228,223,.12)", borderTopColor: "rgba(232,228,223,.4)", borderRadius: "50%", margin: "0 auto 12px", animation: "mapSpin 1s linear infinite" }} />
      </div>
    );
  }

  const handlePrefInteraction = (prefName) => {
    if (!prefMap[prefName]) return;
    if (isMobile) {
      if (tapped === prefName) {
        /* Second tap — navigate */
        onPinClick(prefMap[prefName].id);
        setTapped(null);
      } else {
        /* First tap — show name */
        setTapped(prefName);
        setHov(prefName);
      }
    } else {
      onPinClick(prefMap[prefName].id);
    }
  };

  /* Clear tapped state when tapping outside */
  const handleSvgClick = (e) => {
    if (e.target.tagName === "svg") { setTapped(null); setHov(null); }
  };

  const activeHov = isMobile ? tapped : hov;

  return (
    <div className="cin-map-responsive">
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 20, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(232,228,223,.7)", fontWeight: 500, border: "1px solid rgba(232,228,223,.3)", padding: "8px 24px", display: "inline-block" }}>{t.mapL}</span>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 14, color: "rgba(220,190,100,.5)", letterSpacing: ".05em" }}>{t.mapH}</span>
        </div>
      </div>
      <svg ref={svgRef} viewBox={"0 0 " + MW + " " + MH} style={{ width: "100%", height: "auto", display: "block", touchAction: "none" }} onClick={handleSvgClick}>
        <g ref={gRef}>
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {paths.map(p => {
          if (!p.d) return null;
          const isHL = p.hasPhotos;
          const isHovered = activeHov === p.name;
          const isActive = hlId && prefMap[p.name] && prefMap[p.name].id === hlId;
          return (
            <path key={p.id} d={p.d}
              fill={isHovered && isHL ? "rgba(220,190,100,.55)" : isHovered && !isHL ? "rgba(232,228,223,0.28)" : isActive ? "rgba(220,190,100,.45)" : isHL ? "rgba(220,190,100,.32)" : "rgba(232,228,223,0.18)"}
              stroke={isHL ? "rgba(220,190,100,.65)" : isHovered ? "rgba(232,228,223,0.50)" : "rgba(232,228,223,0.40)"}
              strokeWidth={isHL ? "1.4" : "0.9"}
              strokeLinejoin="round"
              style={{ cursor: isHL ? "pointer" : "default", transition: "fill .3s, stroke .3s" }}
              onClick={(e) => { e.stopPropagation(); if (isHL) { handlePrefInteraction(p.name); } else if (isMobile) { setTapped(p.name); setHov(p.name); } }}
              onMouseEnter={() => !isMobile && p.name && setHov(p.name)}
              onMouseLeave={() => !isMobile && setHov(null)}
            />
          );
        })}
        {/* Tooltip — with photo (thumbnail + link) or name only */}
        {activeHov && (() => {
          const hasPhoto = !!prefMap[activeHov];
          const pin = prefMap[activeHov];
          /* Compute position: use pin lat/lng if available, otherwise find centroid from path data */
          let pos;
          if (pin) {
            pos = project(pin.lat, pin.lng);
          } else {
            /* Find the path for this prefecture and compute SVG centroid */
            const matchPath = paths.find(pp => pp.name === activeHov && pp.d);
            if (matchPath) {
              const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
              tmp.setAttribute("d", matchPath.d);
              const len = tmp.getTotalLength();
              let sx = 0, sy = 0, samples = 20;
              for (let s = 0; s < samples; s++) { const pt = tmp.getPointAtLength(len * s / samples); sx += pt.x; sy += pt.y; }
              pos = { x: sx / samples, y: sy / samples };
            } else {
              return null;
            }
          }

          if (hasPhoto) {
            const tipW = 155, tipH = 60;
            const flipX = pos.x + tipW > MW - 20;
            const tx = flipX ? pos.x - tipW - 8 : pos.x + 8;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={4} fill="rgba(20,18,16,.94)" stroke="rgba(220,190,100,.30)" strokeWidth=".5" />
                <clipPath id="hovClip"><rect x={tx + 5} y={ty + 6} width={42} height={28} rx={2} /></clipPath>
                <image href={pin.thumb} x={tx + 5} y={ty + 6} width={42} height={28} clipPath="url(#hovClip)" preserveAspectRatio="xMidYMid slice" />
                <text x={tx + 54} y={ty + 22} fill="#e8e4df" fontSize="11" fontFamily="'Noto Sans JP','Noto Sans',sans-serif">{getPrefName(activeHov, lang)}</text>
                <text x={tx + 54} y={ty + 40} fill="rgba(220,190,100,.5)" fontSize="8" fontFamily="'Noto Sans JP','Noto Sans',sans-serif">{t.tapHint}</text>
              </g>
            );
          } else {
            /* Name-only tooltip for prefectures without photos */
            const tipW = 110, tipH = 30;
            const flipX = pos.x + tipW > MW - 20;
            const tx = flipX ? pos.x - tipW - 8 : pos.x + 8;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={3} fill="rgba(20,18,16,.88)" stroke="rgba(232,228,223,.15)" strokeWidth=".5" />
                <text x={tx + tipW / 2} y={ty + 19} fill="rgba(232,228,223,.6)" fontSize="10" fontFamily="'Noto Sans JP','Noto Sans',sans-serif" textAnchor="middle">{getPrefName(activeHov, lang)}</text>
              </g>
            );
          }
        })()}
        {/* ── Okinawa Inset ── */}
        <g>
          <defs>
            <clipPath id="okiClip"><rect x={0} y={0} width={OKI_BOX.w} height={OKI_BOX.h} /></clipPath>
          </defs>
          <rect x={OKI_BOX.x} y={OKI_BOX.y} width={OKI_BOX.w} height={OKI_BOX.h} rx={4}
            fill="rgba(15,15,15,.6)" stroke="rgba(232,228,223,.15)" strokeWidth=".8" strokeDasharray="4 3" />
          <text x={OKI_BOX.x + OKI_BOX.w / 2} y={OKI_BOX.y + 14} fill="rgba(232,228,223,.35)" fontSize="9"
            fontFamily="'Noto Sans JP','Noto Sans',sans-serif" textAnchor="middle" letterSpacing=".1em">{t.oki}</text>
          <g transform={"translate(" + OKI_BOX.x + "," + OKI_BOX.y + ")"} clipPath="url(#okiClip)">
            {okiPaths.map(p => {
              if (!p.d) return null;
              const isHL = p.hasPhotos;
              const isHovered = activeHov === p.name;
              return (
                <path key={"oki" + p.id} d={p.d}
                  fill={isHovered && isHL ? "rgba(220,190,100,.55)" : isHovered && !isHL ? "rgba(232,228,223,0.28)" : isHL ? "rgba(220,190,100,.32)" : "rgba(232,228,223,0.18)"}
                  stroke={isHL ? "rgba(220,190,100,.65)" : isHovered ? "rgba(232,228,223,0.50)" : "rgba(232,228,223,0.40)"}
                  strokeWidth={isHL ? "1.2" : "0.8"}
                  strokeLinejoin="round"
                  style={{ cursor: isHL ? "pointer" : "default", transition: "fill .3s" }}
                  onClick={(e) => { e.stopPropagation(); if (isHL) { handlePrefInteraction(p.name); } else if (isMobile) { setTapped(p.name); setHov(p.name); } }}
                  onMouseEnter={() => !isMobile && p.name && setHov(p.name)}
                  onMouseLeave={() => !isMobile && setHov(null)}
                />
              );
            })}
          </g>
        </g>
        </g>
      </svg>
    </div>
  );
}

/* ── Fireworks Component ── */
function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const W = Math.floor(rect.width * dpr);
    const H = Math.floor(rect.height * dpr);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(dpr, dpr);
    const drawW = rect.width;
    const drawH = rect.height;

    const particles = [];
    const rockets = [];
    let frame = 0;

    const COLORS = [
      [255, 200, 100],
      [100, 200, 255],
      [255, 120, 160],
      [120, 255, 180],
      [200, 150, 255],
    ];

    function addRocket(x, targetY, delay, color, size, isMain) {
      rockets.push({ x, y: drawH, targetY, vy: -4.5 - Math.random() * 1.5, delay, color, size, isMain, trail: [] });
    }

    function explode(x, y, color, count, power) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = power * (0.4 + Math.random() * 0.4);
        const cr = Math.min(255, Math.max(0, color[0] + Math.floor((Math.random() - 0.5) * 40)));
        const cg = Math.min(255, Math.max(0, color[1] + Math.floor((Math.random() - 0.5) * 40)));
        const cb = Math.min(255, Math.max(0, color[2] + Math.floor((Math.random() - 0.5) * 40)));
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.004 + Math.random() * 0.004,
          r: cr, g: cg, b: cb,
          size: 1.5 + Math.random() * 1.5,
          gravity: 0.012 + Math.random() * 0.006,
          trail: [],
        });
      }
    }

    function scheduleShow() {
      addRocket(drawW * 0.5, drawH * 0.18, 60, [255, 140, 170], 300, true);
      const starY = drawH * 0.72;
      for (let i = 0; i < 5; i++) {
        const sx = drawW * (0.2 + i * 0.15) + (Math.random() - 0.5) * 30;
        addRocket(sx, starY - Math.random() * 40, 350 + i * 50 + Math.floor(Math.random() * 20), COLORS[i], 100, false);
      }
    }

    let pauseTimer = 0;
    scheduleShow();

    function loop() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, drawW, drawH);
      ctx.globalCompositeOperation = "lighter";
      frame++;

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (r.delay > 0) { r.delay--; continue; }
        r.y += r.vy;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 14) r.trail.shift();
        for (let j = 0; j < r.trail.length; j++) {
          const a = (j / r.trail.length) * 0.4;
          ctx.fillStyle = "rgba(" + r.color[0] + "," + r.color[1] + "," + r.color[2] + "," + a + ")";
          ctx.beginPath(); ctx.arc(r.trail[j].x, r.trail[j].y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
        if (r.y <= r.targetY) {
          if (r.isMain) {
            explode(r.x, r.y, [255, 140, 180], 200, 4.5);
            explode(r.x, r.y, [255, 180, 210], 80, 2.5);
            explode(r.x, r.y, [255, 220, 235], 40, 1.2);
          } else {
            explode(r.x, r.y, r.color, r.size, 3);
          }
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y, life: p.life });
        if (p.trail.length > 8) p.trail.shift();
        p.vx *= 0.992; p.vy += p.gravity; p.vy *= 0.992;
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        for (let j = 0; j < p.trail.length; j++) {
          const t = p.trail[j];
          const a = t.life * (j / p.trail.length) * 0.3;
          ctx.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + "," + a + ")";
          ctx.beginPath(); ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2); ctx.fill();
        }
        const al = p.life * 0.8;
        ctx.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + "," + al + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + "," + (al * 0.3) + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2); ctx.fill();
      }

      if (rockets.length === 0 && particles.length === 0) {
        pauseTimer++;
        if (pauseTimer > 60) { pauseTimer = 0; frame = 0; scheduleShow(); }
      }

      requestAnimationFrame(loop);
    }

    const raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
export default function Page() {
  const [lang, setLang] = useState("ja");
  const [lightbox, setLightbox] = useState(null);

  /* Responsive image sizes (default to desktop for SSR, update on client) */
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (window.innerWidth <= 768) setImgSizes({ thumbW: 600, lbW: 1200 });
  }, []);
  const { thumbW, lbW } = imgSizes;

  /* Flat list of all photos for lightbox navigation */
  const allPhotos = useMemo(() => {
    const list = [];
    PREFECTURES.forEach(pf => {
      pf.photos.forEach(photo => {
        list.push({ url: getUrl(photo, lbW), pref: pf.pref, loc: photo.loc || "" });
      });
    });
    return list;
  }, [lbW]);

  const openLightbox = useCallback((url) => {
    const idx = allPhotos.findIndex(p => p.url === url);
    setLightbox(idx >= 0 ? idx : 0);
  }, [allPhotos]);

  const lbPrev = useCallback(() => {
    setLightbox(i => (i <= 0 ? allPhotos.length - 1 : i - 1));
  }, [allPhotos]);

  const lbNext = useCallback(() => {
    setLightbox(i => (i >= allPhotos.length - 1 ? 0 : i + 1));
  }, [allPhotos]);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [hlPhoto, setHlPhoto] = useState(null);
  const [pastMap, setPastMap] = useState(false);
  const cRef = useRef(null);
  const mapRef = useRef(null);
  const contactRef = useRef(null);
  const photoRefs = useRef({});
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [formSending, setFormSending] = useState(false);
  const t = TR[lang];

  const handleSubmit = useCallback(() => {
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;
    setFormSending(true);
    fetch("https://formspree.io/f/xzdjzyeo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName, email: formEmail, message: formMsg }),
    })
      .then(r => { if (r.ok) { setFormStatus("ok"); setFormName(""); setFormEmail(""); setFormMsg(""); } else { setFormStatus("ng"); } })
      .catch(() => setFormStatus("ng"))
      .finally(() => setFormSending(false));
  }, [formName, formEmail, formMsg]);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") lbPrev();
      else if (e.key === "ArrowRight") lbNext();
      else if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, lbPrev, lbNext]);

  /* Preload adjacent lightbox images */
  useEffect(() => {
    if (lightbox === null || !allPhotos.length) return;
    const prev = (lightbox <= 0 ? allPhotos.length - 1 : lightbox - 1);
    const next = (lightbox >= allPhotos.length - 1 ? 0 : lightbox + 1);
    [prev, next].forEach(i => { const img = new Image(); img.src = allPhotos[i].url; });
  }, [lightbox, allPhotos]);

  useEffect(() => {
    const el = cRef.current;
    if (!el) return;
    const fn = () => {
      setScrollY(el.scrollTop);
      if (mapRef.current) setPastMap(mapRef.current.getBoundingClientRect().bottom < 0);
    };
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, []);

  const scrollToMap = useCallback(() => { mapRef.current && mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }, []);
  const scrollToContact = useCallback(() => { contactRef.current && contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);
  const handlePin = useCallback(id => { const el = photoRefs.current[id]; if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); setHlPhoto(id); setTimeout(() => setHlPhoto(null), 2500); } }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif", position: "relative" }}>
      {/* CSS moved to globals.css */}

      <div ref={cRef} style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth" }}>
        <div className={"top-bar" + (scrollY > 80 ? " scrolled" : "")}>
          <div className="top-langs">
            {Object.entries(TR).map(([c, v]) => (
              <button key={c} className={"top-lang-btn" + (lang === c ? " active" : "")} onClick={() => setLang(c)}>{v.name}</button>
            ))}
          </div>
        </div>
        <div className={"top-nav" + (scrollY > 80 ? " scrolled" : "")}>
          <button className="top-nav-link" onClick={scrollToMap}>{t.nav.map}</button>
          <button className="top-nav-link" onClick={scrollToContact}>{t.contact.title}</button>
        </div>
        <div className="cin-hero">
          <div className={"cin-hero-bg" + (loaded ? " loaded" : "")} />
          <Fireworks />
          <div className="cin-hero-content" style={{ zIndex: 2 }}>
            <h1 className="cin-hero-title">{t.hero.t}</h1>
            <p className="cin-hero-sub">{t.hero.s}</p>
            <p className="cin-hero-desc">{t.hero.d}</p>
          </div>
          <div className="cin-scroll-hint"><div className="cin-scroll-line" /></div>
        </div>
        <section className="cin-section">
          <div className="cin-map-wrap" ref={mapRef}>
            <div className="cin-map-box">
              <JapanMap lang={lang} photos={MAP_PINS} onPinClick={handlePin} hlId={hlPhoto} />
            </div>
          </div>
          <div className="cin-gallery">
            {PREFECTURES.map((pf, pi) => (
              <div key={pf.pref} ref={el => { photoRefs.current["p" + pi] = el; }} className={"cin-pref-group" + (hlPhoto === "p" + pi ? " flash" : "")}>
                <div className="cin-pref">{getPrefName(pf.pref, lang)}</div>
                <div className="cin-hscroll">
                  {pf.photos.map((photo, idx) => (
                    <div key={pf.pref + idx} className="cin-hcard" onClick={() => openLightbox(getUrl(photo, lbW))} onContextMenu={e => e.preventDefault()}>
                      <div className="cin-hcard-img-wrap">
                        <img src={getUrl(photo, thumbW)} alt="" loading="lazy" draggable="false" />
                        {photo.loc && <div className="cin-hcard-loc"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{getLocName(photo.loc, lang)}</div>}
                        <div className="cin-watermark">Landscapes of Japan</div>
                      </div>
                    </div>
                  ))}
                </div>
                {pf.photos.length > 1 && <div className="cin-scroll-indicator">{t.scroll}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <div style={{ width: "100%", height: 1, background: "rgba(232,228,223,.08)", maxWidth: 200, margin: "0 auto 60px" }} />
        <div className="contact-section" ref={contactRef}>
          <h2 className="contact-title">{t.contact.title}</h2>
          <p style={{ textAlign: "center", fontFamily: "'Noto Sans JP','Noto Sans',sans-serif", fontSize: 13, color: "rgba(232,228,223,.4)", marginBottom: 32, lineHeight: 1.8 }}>{t.ft}</p>
          <div className="contact-form">
            <div className="contact-field">
              <label className="contact-label">{t.contact.name}</label>
              <input className="contact-input" type="text" value={formName} onChange={e => setFormName(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label">{t.contact.email}</label>
              <input className="contact-input" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label">{t.contact.msg}</label>
              <textarea className="contact-textarea" value={formMsg} onChange={e => setFormMsg(e.target.value)} />
            </div>
            <button className="contact-send" disabled={formSending || !formName.trim() || !formEmail.trim() || !formMsg.trim()} onClick={handleSubmit}>
              {formSending ? "..." : t.contact.send}
            </button>
            {formStatus === "ok" && <div className="contact-msg ok">{t.contact.sent}</div>}
            {formStatus === "ng" && <div className="contact-msg ng">{t.contact.err}</div>}
          </div>
        </div>

        <footer className="cin-footer">© 2026 Landscapes of Japan<br/>{t.footer2}</footer>
      </div>
      {lightbox !== null && (() => {
        const cur = allPhotos[lightbox];
        let touchStartX = 0;
        const onTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
        const onTouchEnd = (e) => {
          const diff = e.changedTouches[0].clientX - touchStartX;
          if (diff > 60) lbPrev();
          else if (diff < -60) lbNext();
        };
        return (
          <div className="cin-lb" onContextMenu={e => e.preventDefault()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button className="cin-lb-close" onClick={() => setLightbox(null)}>×</button>
            <div className="cin-lb-info">
              <div className="cin-lb-pref">{getPrefName(cur.pref, lang)}</div>
              {cur.loc && <div className="cin-lb-loc">{getLocName(cur.loc, lang)}</div>}
            </div>
            <button className="cin-lb-arrow left" onClick={(e) => { e.stopPropagation(); lbPrev(); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="cin-lb-inner" onClick={() => setLightbox(null)}>
              <img src={cur.url} alt="" draggable="false" />
              <div className="cin-lb-wm">Landscapes of Japan</div>
            </div>
            <button className="cin-lb-arrow right" onClick={(e) => { e.stopPropagation(); lbNext(); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        );
      })()}
    </div>
  );
}
