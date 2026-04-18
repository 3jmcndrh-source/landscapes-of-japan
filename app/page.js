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
  ja:{name:"日本語",nav:{map:"撮影地マップ"},hero:{t:"Landscapes of Japan",s:"ー 日本の風景 ー",d:"日本各地で撮影した風景写真を掲載しています"},mapL:"撮影地マップ",mapH:"色付きの都道府県をクリック → 写真へジャンプ",backMap:"撮影地マップに戻る",lang:"言語",ft:"質問、意見、要望等お気軽にご連絡ください。",scroll:"← スワイプ / スクロール →",oki:"沖縄",tapHint:"もう一度タップ → 写真",mapZoomOn:"ピンチで拡大",mapZoomOff:"拡大モード解除",mapZoomReset:"リセット",footer2:"無断転載・無断使用を禁止します。",contact:{title:"お問い合わせ",name:"お名前",email:"メールアドレス",msg:"メッセージ",send:"送信する",sent:"送信しました。ありがとうございます。",err:"送信に失敗しました。もう一度お試しください。"}},
  en:{name:"English",nav:{map:"Location Map"},hero:{t:"Landscapes of Japan",s:"ー Japan in Focus ー",d:"A collection of landscape photos taken across Japan"},mapL:"Shooting Locations",mapH:"Click a highlighted prefecture to see photos",backMap:"Back to Location Map",lang:"Language",ft:"Feel free to get in touch with any questions or feedback.",scroll:"← Swipe / Scroll →",oki:"Okinawa",tapHint:"Tap again → photos",mapZoomOn:"Pinch to zoom",mapZoomOff:"Exit zoom mode",mapZoomReset:"Reset",footer2:"Unauthorized reproduction prohibited.",contact:{title:"Contact",name:"Name",email:"Email",msg:"Message",send:"Send",sent:"Sent! Thank you.",err:"Failed to send. Please try again."}},
  zh:{name:"中文(简体)",nav:{map:"拍摄地图"},hero:{t:"日本风景",s:"ー 日本风景 ー",d:"收录了日本各地拍摄的风景照片"},mapL:"拍摄地点",mapH:"点击彩色都道府县 → 跳转至照片",backMap:"返回拍摄地图",lang:"语言",ft:"如有任何问题或建议，欢迎随时联系。",scroll:"← 滑动 / 滚动 →",oki:"冲绳",tapHint:"再次点击 → 照片",mapZoomOn:"双指缩放",mapZoomOff:"退出缩放",mapZoomReset:"重置",footer2:"禁止未经授权的转载和使用。",contact:{title:"联系方式",name:"姓名",email:"电子邮箱",msg:"留言",send:"发送",sent:"发送成功，感谢您的留言。",err:"发送失败，请重试。"}},
  "zh-tw":{name:"中文(繁體)",nav:{map:"拍攝地圖"},hero:{t:"日本風景",s:"ー 日本風景 ー",d:"收錄了日本各地拍攝的風景照片"},mapL:"拍攝地點",mapH:"點擊彩色都道府縣 → 跳轉至照片",backMap:"返回拍攝地圖",lang:"語言",ft:"如有任何問題或建議，歡迎隨時聯繫。",scroll:"← 滑動 / 捲動 →",oki:"沖繩",tapHint:"再次點擊 → 照片",mapZoomOn:"雙指縮放",mapZoomOff:"退出縮放",mapZoomReset:"重置",footer2:"禁止未經授權的轉載和使用。",contact:{title:"聯絡方式",name:"姓名",email:"電子郵件",msg:"留言",send:"發送",sent:"發送成功，感謝您的留言。",err:"發送失敗，請重試。"}},
  ko:{name:"한국어",nav:{map:"촬영지 지도"},hero:{t:"일본의 풍경",s:"ー 일본의 풍경 ー",d:"일본 각지에서 촬영한 풍경 사진을 소개합니다"},mapL:"촬영지 지도",mapH:"색칠된 도도부현을 클릭 → 사진으로 이동",backMap:"촬영지 지도로 돌아가기",lang:"언어",ft:"질문이나 의견이 있으시면 편하게 연락주세요.",scroll:"← 스와이프 / 스크롤 →",oki:"오키나와",tapHint:"다시 탭 → 사진",mapZoomOn:"핀치하여 확대",mapZoomOff:"확대 모드 해제",mapZoomReset:"초기화",footer2:"무단 전재 및 사용을 금합니다.",contact:{title:"문의",name:"이름",email:"이메일",msg:"메시지",send:"보내기",sent:"전송 완료! 감사합니다.",err:"전송 실패. 다시 시도해주세요."}},
  es:{name:"Español",nav:{map:"Mapa de ubicaciones"},hero:{t:"Paisajes de Japón",s:"ー Japón en foco ー",d:"Una colección de fotografías de paisajes tomadas por todo Japón"},mapL:"Ubicaciones de fotos",mapH:"Haz clic en una prefectura destacada → ver fotos",backMap:"Volver al mapa",lang:"Idioma",ft:"No dudes en contactarme si tienes preguntas o comentarios.",scroll:"← Deslizar / Desplazar →",oki:"Okinawa",tapHint:"Toca de nuevo → fotos",mapZoomOn:"Pellizcar para ampliar",mapZoomOff:"Salir del zoom",mapZoomReset:"Restablecer",footer2:"Queda prohibida la reproducción no autorizada.",contact:{title:"Contacto",name:"Nombre",email:"Correo electrónico",msg:"Mensaje",send:"Enviar",sent:"¡Enviado! Gracias.",err:"Error al enviar. Inténtalo de nuevo."}},
  fr:{name:"Français",nav:{map:"Carte des lieux"},hero:{t:"Paysages du Japon",s:"ー Le Japon en images ー",d:"Une collection de photos de paysages prises à travers le Japon"},mapL:"Lieux de prise de vue",mapH:"Cliquez sur une préfecture en couleur → voir les photos",backMap:"Retour à la carte",lang:"Langue",ft:"N'hésitez pas à me contacter pour toute question.",scroll:"← Glisser / Défiler →",oki:"Okinawa",tapHint:"Appuyez à nouveau → photos",mapZoomOn:"Pincer pour zoomer",mapZoomOff:"Quitter le zoom",mapZoomReset:"Réinitialiser",footer2:"Toute reproduction non autorisée est interdite.",contact:{title:"Contact",name:"Nom",email:"E-mail",msg:"Message",send:"Envoyer",sent:"Envoyé ! Merci.",err:"Échec de l'envoi. Veuillez réessayer."}},
  de:{name:"Deutsch",nav:{map:"Standortkarte"},hero:{t:"Landschaften Japans",s:"ー Japan im Fokus ー",d:"Eine Sammlung von Landschaftsfotos aus ganz Japan"},mapL:"Aufnahmeorte",mapH:"Klicke auf eine markierte Präfektur → Fotos ansehen",backMap:"Zurück zur Karte",lang:"Sprache",ft:"Bei Fragen oder Anregungen gerne Kontakt aufnehmen.",scroll:"← Wischen / Scrollen →",oki:"Okinawa",tapHint:"Nochmal tippen → Fotos",mapZoomOn:"Zum Zoomen zusammenziehen",mapZoomOff:"Zoom-Modus beenden",mapZoomReset:"Zurücksetzen",footer2:"Unerlaubte Vervielfältigung verboten.",contact:{title:"Kontakt",name:"Name",email:"E-Mail",msg:"Nachricht",send:"Senden",sent:"Gesendet! Vielen Dank.",err:"Senden fehlgeschlagen. Bitte erneut versuchen."}},
  pt:{name:"Português",nav:{map:"Mapa de locais"},hero:{t:"Paisagens do Japão",s:"ー Japão em foco ー",d:"Uma coleção de fotos de paisagens tiradas por todo o Japão"},mapL:"Locais de fotos",mapH:"Clique numa prefeitura destacada → ver fotos",backMap:"Voltar ao mapa",lang:"Idioma",ft:"Sinta-se à vontade para entrar em contato.",scroll:"← Deslizar / Rolar →",oki:"Okinawa",tapHint:"Toque novamente → fotos",mapZoomOn:"Pinça para ampliar",mapZoomOff:"Sair do zoom",mapZoomReset:"Redefinir",footer2:"Reprodução não autorizada proibida.",contact:{title:"Contato",name:"Nome",email:"E-mail",msg:"Mensagem",send:"Enviar",sent:"Enviado! Obrigado.",err:"Falha no envio. Tente novamente."}},
  it:{name:"Italiano",nav:{map:"Mappa dei luoghi"},hero:{t:"Paesaggi del Giappone",s:"ー Giappone a fuoco ー",d:"Una raccolta di fotografie paesaggistiche scattate in tutto il Giappone"},mapL:"Luoghi di scatto",mapH:"Clicca su una prefettura evidenziata → vedi le foto",backMap:"Torna alla mappa",lang:"Lingua",ft:"Non esitare a contattarmi per domande o suggerimenti.",scroll:"← Scorri / Scorrere →",oki:"Okinawa",tapHint:"Tocca di nuovo → foto",mapZoomOn:"Pizzica per ingrandire",mapZoomOff:"Esci dallo zoom",mapZoomReset:"Ripristina",footer2:"Riproduzione non autorizzata vietata.",contact:{title:"Contatti",name:"Nome",email:"E-mail",msg:"Messaggio",send:"Invia",sent:"Inviato! Grazie.",err:"Invio fallito. Riprova."}},
  ru:{name:"Русский",nav:{map:"Карта съёмок"},hero:{t:"Пейзажи Японии",s:"ー Япония в фокусе ー",d:"Коллекция пейзажных фотографий, снятых по всей Японии"},mapL:"Места съёмок",mapH:"Нажмите на выделенную префектуру → перейти к фото",backMap:"Вернуться к карте",lang:"Язык",ft:"Если есть вопросы или предложения — пишите.",scroll:"← Свайп / Прокрутка →",oki:"Окинава",tapHint:"Нажмите ещё раз → фото",mapZoomOn:"Увеличить щипком",mapZoomOff:"Выйти из режима",mapZoomReset:"Сбросить",footer2:"Несанкционированное копирование запрещено.",contact:{title:"Связаться",name:"Имя",email:"Эл. почта",msg:"Сообщение",send:"Отправить",sent:"Отправлено! Спасибо.",err:"Ошибка отправки. Попробуйте снова."}},
  ar:{name:"العربية",nav:{map:"خريطة المواقع"},hero:{t:"مناظر اليابان",s:"ー اليابان في صور ー",d:"مجموعة من صور المناظر الطبيعية الملتقطة في أنحاء اليابان"},mapL:"مواقع التصوير",mapH:"انقر على محافظة ملونة ← لعرض الصور",backMap:"العودة إلى الخريطة",lang:"اللغة",ft:"لا تترددوا في التواصل لأي استفسار أو ملاحظة.",scroll:"← مرر / اسحب →",oki:"أوكيناوا",tapHint:"انقر مرة أخرى ← صور",mapZoomOn:"قرص للتكبير",mapZoomOff:"إنهاء التكبير",mapZoomReset:"إعادة تعيين",footer2:"يُحظر النسخ أو الاستخدام غير المصرح به.",contact:{title:"تواصل معنا",name:"الاسم",email:"البريد الإلكتروني",msg:"الرسالة",send:"إرسال",sent:"تم الإرسال! شكراً لكم.",err:"فشل الإرسال. يرجى المحاولة مرة أخرى."}},
  hi:{name:"हिन्दी",nav:{map:"लोकेशन मैप"},hero:{t:"जापान के दृश्य",s:"ー जापान की झलक ー",d:"पूरे जापान में ली गई लैंडस्केप तस्वीरों का संग्रह"},mapL:"फोटो लोकेशन",mapH:"रंगीन प्रान्त पर क्लिक करें → फ़ोटो देखें",backMap:"मैप पर वापस जाएँ",lang:"भाषा",ft:"किसी भी सवाल या सुझाव के लिए संपर्क करें।",scroll:"← स्वाइप / स्क्रॉल →",oki:"ओकिनावा",tapHint:"फिर से टैप करें → फ़ोटो",mapZoomOn:"पिंच करके ज़ूम",mapZoomOff:"ज़ूम बंद करें",mapZoomReset:"रीसेट",footer2:"अनधिकृत पुनरुत्पादन प्रतिबंधित है।",contact:{title:"संपर्क",name:"नाम",email:"ईमेल",msg:"संदेश",send:"भेजें",sent:"भेज दिया! धन्यवाद।",err:"भेजने में विफल। कृपया पुनः प्रयास करें।"}},
  th:{name:"ไทย",nav:{map:"แผนที่ถ่ายภาพ"},hero:{t:"ทิวทัศน์ญี่ปุ่น",s:"ー ญี่ปุ่นในโฟกัส ー",d:"รวมภาพถ่ายทิวทัศน์จากทั่วญี่ปุ่น"},mapL:"สถานที่ถ่ายภาพ",mapH:"คลิกจังหวัดที่เน้นสี → ดูภาพถ่าย",backMap:"กลับไปที่แผนที่",lang:"ภาษา",ft:"หากมีคำถามหรือข้อเสนอแนะ ติดต่อได้เลย",scroll:"← ปัด / เลื่อน →",oki:"โอกินาวา",tapHint:"แตะอีกครั้ง → ดูภาพ",mapZoomOn:"บีบเพื่อซูม",mapZoomOff:"ออกจากโหมดซูม",mapZoomReset:"รีเซ็ต",footer2:"ห้ามทำซ้ำโดยไม่ได้รับอนุญาต",contact:{title:"ติดต่อ",name:"ชื่อ",email:"อีเมล",msg:"ข้อความ",send:"ส่ง",sent:"ส่งแล้ว! ขอบคุณครับ",err:"ส่งไม่สำเร็จ กรุณาลองใหม่"}},
  vi:{name:"Tiếng Việt",nav:{map:"Bản đồ chụp ảnh"},hero:{t:"Phong cảnh Nhật Bản",s:"ー Nhật Bản qua ống kính ー",d:"Bộ sưu tập ảnh phong cảnh chụp khắp Nhật Bản"},mapL:"Địa điểm chụp ảnh",mapH:"Nhấp vào tỉnh được tô màu → xem ảnh",backMap:"Quay lại bản đồ",lang:"Ngôn ngữ",ft:"Mọi câu hỏi hay góp ý, xin hãy liên hệ.",scroll:"← Vuốt / Cuộn →",oki:"Okinawa",tapHint:"Nhấn lần nữa → ảnh",mapZoomOn:"Chụm để phóng to",mapZoomOff:"Thoát phóng to",mapZoomReset:"Đặt lại",footer2:"Nghiêm cấm sao chép trái phép.",contact:{title:"Liên hệ",name:"Họ tên",email:"Email",msg:"Tin nhắn",send:"Gửi",sent:"Đã gửi! Cảm ơn bạn.",err:"Gửi thất bại. Vui lòng thử lại."}},
  id:{name:"Bahasa Indonesia",nav:{map:"Peta lokasi"},hero:{t:"Pemandangan Jepang",s:"ー Jepang dalam Fokus ー",d:"Kumpulan foto pemandangan dari seluruh Jepang"},mapL:"Lokasi pemotretan",mapH:"Klik prefektur berwarna → lihat foto",backMap:"Kembali ke peta",lang:"Bahasa",ft:"Jangan ragu untuk menghubungi jika ada pertanyaan.",scroll:"← Geser / Gulir →",oki:"Okinawa",tapHint:"Ketuk lagi → foto",mapZoomOn:"Cubit untuk memperbesar",mapZoomOff:"Keluar dari zoom",mapZoomReset:"Atur ulang",footer2:"Dilarang memperbanyak tanpa izin.",contact:{title:"Kontak",name:"Nama",email:"Email",msg:"Pesan",send:"Kirim",sent:"Terkirim! Terima kasih.",err:"Gagal mengirim. Silakan coba lagi."}},
  tr:{name:"Türkçe",nav:{map:"Konum haritası"},hero:{t:"Japonya Manzaraları",s:"ー Japonya Odakta ー",d:"Japonya genelinde çekilen manzara fotoğrafları koleksiyonu"},mapL:"Çekim noktaları",mapH:"Renkli bir ili tıklayın → fotoğrafları görün",backMap:"Haritaya dön",lang:"Dil",ft:"Soru veya önerileriniz için iletişime geçebilirsiniz.",scroll:"← Kaydır →",oki:"Okinawa",tapHint:"Tekrar dokun → fotoğraflar",mapZoomOn:"Yakınlaştırmak için sıkıştır",mapZoomOff:"Yakınlaştırmadan çık",mapZoomReset:"Sıfırla",footer2:"İzinsiz çoğaltma yasaktır.",contact:{title:"İletişim",name:"Ad",email:"E-posta",msg:"Mesaj",send:"Gönder",sent:"Gönderildi! Teşekkürler.",err:"Gönderilemedi. Lütfen tekrar deneyin."}},
  nl:{name:"Nederlands",nav:{map:"Locatiekaart"},hero:{t:"Landschappen van Japan",s:"ー Japan in beeld ー",d:"Een collectie landschapsfoto's gemaakt door heel Japan"},mapL:"Fotolocaties",mapH:"Klik op een gemarkeerde prefectuur → bekijk foto's",backMap:"Terug naar kaart",lang:"Taal",ft:"Neem gerust contact op bij vragen of opmerkingen.",scroll:"← Veeg / Scroll →",oki:"Okinawa",tapHint:"Tik opnieuw → foto's",mapZoomOn:"Knijp om te zoomen",mapZoomOff:"Zoom verlaten",mapZoomReset:"Herstellen",footer2:"Ongeautoriseerde reproductie verboden.",contact:{title:"Contact",name:"Naam",email:"E-mail",msg:"Bericht",send:"Verstuur",sent:"Verstuurd! Bedankt.",err:"Verzenden mislukt. Probeer opnieuw."}},
  pl:{name:"Polski",nav:{map:"Mapa lokalizacji"},hero:{t:"Krajobrazy Japonii",s:"ー Japonia w obiektywie ー",d:"Kolekcja zdjęć krajobrazowych z całej Japonii"},mapL:"Miejsca fotografii",mapH:"Kliknij wyróżnioną prefekturę → zobacz zdjęcia",backMap:"Wróć do mapy",lang:"Język",ft:"W razie pytań lub uwag zapraszam do kontaktu.",scroll:"← Przesuń / Przewiń →",oki:"Okinawa",tapHint:"Dotknij ponownie → zdjęcia",mapZoomOn:"Ściśnij, aby powiększyć",mapZoomOff:"Wyjdź z powiększenia",mapZoomReset:"Resetuj",footer2:"Nieautoryzowane kopiowanie zabronione.",contact:{title:"Kontakt",name:"Imię",email:"E-mail",msg:"Wiadomość",send:"Wyślij",sent:"Wysłano! Dziękuję.",err:"Wysyłanie nie powiodło się. Spróbuj ponownie."}},
  sv:{name:"Svenska",nav:{map:"Platskarta"},hero:{t:"Japans landskap",s:"ー Japan i fokus ー",d:"En samling landskapsfotografier tagna runt om i Japan"},mapL:"Fotoplatser",mapH:"Klicka på en markerad prefektur → se foton",backMap:"Tillbaka till kartan",lang:"Språk",ft:"Hör gärna av dig med frågor eller synpunkter.",scroll:"← Svep / Scrolla →",oki:"Okinawa",tapHint:"Tryck igen → foton",mapZoomOn:"Nyp för att zooma",mapZoomOff:"Avsluta zoom",mapZoomReset:"Återställ",footer2:"Otillåten reproduktion förbjuden.",contact:{title:"Kontakt",name:"Namn",email:"E-post",msg:"Meddelande",send:"Skicka",sent:"Skickat! Tack.",err:"Kunde inte skicka. Försök igen."}},
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
  "清水寺 三重塔":{ja:"清水寺 三重塔",en:"Kiyomizu-dera Pagoda",zh:"清水寺 三重塔",ko:"기요미즈데라 삼중탑","zh-tw":"清水寺 三重塔",es:"Pagoda de Kiyomizu-dera",fr:"Pagode de Kiyomizu-dera",de:"Kiyomizu-dera Pagode",pt:"Pagode de Kiyomizu-dera",it:"Pagoda di Kiyomizu-dera",ru:"Пагода Киёмидзу-дэра",ar:"باغودا كيوميزو-ديرا",hi:"कियोमिज़ु-देरा पैगोडा",th:"เจดีย์คิโยมิสึ",vi:"Chùa Kiyomizu-dera",id:"Pagoda Kiyomizu-dera",tr:"Kiyomizu-dera Pagodası",nl:"Kiyomizu-dera Pagode",pl:"Pagoda Kiyomizu-dera",sv:"Kiyomizu-dera Pagod"},
  "清水寺 本堂":{ja:"清水寺 本堂",en:"Kiyomizu-dera Main Hall",zh:"清水寺 本堂",ko:"기요미즈데라 본당","zh-tw":"清水寺 本堂",es:"Salón principal de Kiyomizu-dera",fr:"Pavillon principal de Kiyomizu-dera",de:"Kiyomizu-dera Haupthalle",pt:"Salão principal de Kiyomizu-dera",it:"Sala principale di Kiyomizu-dera",ru:"Главный зал Киёмидзу-дэра",ar:"القاعة الرئيسية لكيوميزو",hi:"कियोमिज़ु-देरा मुख्य हॉल",th:"ห้องโถงหลักคิโยมิสึ",vi:"Chánh điện Kiyomizu-dera",id:"Aula utama Kiyomizu-dera",tr:"Kiyomizu-dera Ana Salon",nl:"Kiyomizu-dera Hoofdhal",pl:"Główna sala Kiyomizu-dera",sv:"Kiyomizu-dera Huvudhall"},
  "清水寺 紅葉ライトアップ":{ja:"清水寺 紅葉ライトアップ",en:"Kiyomizu-dera Autumn Illumination",zh:"清水寺 红叶灯光秀",ko:"기요미즈데라 단풍 라이트업","zh-tw":"清水寺 紅葉點燈",es:"Iluminación otoñal de Kiyomizu-dera",fr:"Illumination automnale de Kiyomizu-dera",de:"Kiyomizu-dera Herbstbeleuchtung",pt:"Iluminação outonal de Kiyomizu-dera",it:"Illuminazione autunnale di Kiyomizu-dera",ru:"Осенняя подсветка Киёмидзу-дэра",ar:"إضاءة خريف كيوميزو",hi:"कियोमिज़ु-देरा शरद रोशनी",th:"ไฟประดับใบไม้แดงคิโยมิสึ",vi:"Ánh sáng mùa thu Kiyomizu-dera",id:"Iluminasi musim gugur Kiyomizu-dera",tr:"Kiyomizu-dera Sonbahar Aydınlatması",nl:"Kiyomizu-dera Herfstverlichting",pl:"Jesienna iluminacja Kiyomizu-dera",sv:"Kiyomizu-dera Höstbelysning"},
  "八坂の塔":{ja:"八坂の塔",en:"Yasaka Pagoda",zh:"八坂塔",ko:"야사카 탑","zh-tw":"八坂塔",es:"Pagoda Yasaka",fr:"Pagode Yasaka",de:"Yasaka-Pagode",pt:"Pagode Yasaka",it:"Pagoda Yasaka",ru:"Пагода Ясака",ar:"باغودا ياساكا",hi:"यासाका पैगोडा",th:"เจดีย์ยาซากะ",vi:"Tháp Yasaka",id:"Pagoda Yasaka",tr:"Yasaka Pagodası",nl:"Yasaka Pagode",pl:"Pagoda Yasaka",sv:"Yasaka Pagod"},
  "金閣寺":{ja:"金閣寺",en:"Kinkaku-ji",zh:"金阁寺",ko:"킨카쿠지","zh-tw":"金閣寺",es:"Kinkaku-ji",fr:"Kinkaku-ji",de:"Kinkaku-ji",pt:"Kinkaku-ji",it:"Kinkaku-ji",ru:"Кинкаку-дзи",ar:"كينكاكو-جي",hi:"किंकाकु-जी",th:"คินคาคุจิ",vi:"Kinkaku-ji",id:"Kinkaku-ji",tr:"Kinkaku-ji",nl:"Kinkaku-ji",pl:"Kinkaku-ji",sv:"Kinkaku-ji"},
  "法隆寺":{ja:"法隆寺",en:"Horyu-ji",zh:"法隆寺",ko:"호류지","zh-tw":"法隆寺",es:"Horyu-ji",fr:"Horyu-ji",de:"Horyu-ji",pt:"Horyu-ji",it:"Horyu-ji",ru:"Хорю-дзи",ar:"هوريوجي",hi:"होर्यू-जी",th:"โฮริวจิ",vi:"Chùa Horyu-ji",id:"Horyu-ji",tr:"Horyu-ji",nl:"Horyu-ji",pl:"Horyu-ji",sv:"Horyu-ji"},
  "法隆寺 夢殿":{ja:"法隆寺 夢殿",en:"Horyu-ji Yumedono",zh:"法隆寺 梦殿",ko:"호류지 유메도노","zh-tw":"法隆寺 夢殿",es:"Yumedono de Horyu-ji",fr:"Yumedono de Horyu-ji",de:"Horyu-ji Yumedono",pt:"Yumedono de Horyu-ji",it:"Yumedono di Horyu-ji",ru:"Юмэдоно Хорю-дзи",ar:"يوميدونو هوريوجي",hi:"होर्यू-जी युमेदोनो",th:"ยูเมโดโนะ โฮริวจิ",vi:"Yumedono Horyu-ji",id:"Yumedono Horyu-ji",tr:"Horyu-ji Yumedono",nl:"Horyu-ji Yumedono",pl:"Yumedono Horyu-ji",sv:"Horyu-ji Yumedono"},
  "東寺 五重塔":{ja:"東寺 五重塔",en:"To-ji Five-Story Pagoda",zh:"东寺 五重塔",ko:"도지 오중탑","zh-tw":"東寺 五重塔",es:"Pagoda de cinco pisos de To-ji",fr:"Pagode à cinq étages de To-ji",de:"To-ji Fünfstöckige Pagode",pt:"Pagode de cinco andares de To-ji",it:"Pagoda a cinque piani di To-ji",ru:"Пятиярусная пагода То-дзи",ar:"باغودا توجي",hi:"तो-जी पंचमंजिला पैगोडा",th:"เจดีย์ห้าชั้นโทจิ",vi:"Tháp năm tầng To-ji",id:"Pagoda lima lantai To-ji",tr:"To-ji Beş Katlı Pagoda",nl:"To-ji Vijfverdiepingen Pagode",pl:"Pięciopiętrowa pagoda To-ji",sv:"To-ji Femvånings Pagod"},
  "東寺":{ja:"東寺",en:"To-ji Temple",zh:"东寺",ko:"도지","zh-tw":"東寺",es:"Templo To-ji",fr:"Temple To-ji",de:"To-ji Tempel",pt:"Templo To-ji",it:"Tempio To-ji",ru:"Храм То-дзи",ar:"معبد توجي",hi:"तो-जी मंदिर",th:"วัดโทจิ",vi:"Chùa To-ji",id:"Kuil To-ji",tr:"To-ji Tapınağı",nl:"To-ji Tempel",pl:"Świątynia To-ji",sv:"To-ji Tempel"},
  "平等院鳳凰堂":{ja:"平等院鳳凰堂",en:"Byodo-in Phoenix Hall",zh:"平等院凤凰堂",ko:"뵤도인 봉황당","zh-tw":"平等院鳳凰堂",es:"Salón del Fénix de Byodo-in",fr:"Pavillon du Phénix de Byodo-in",de:"Byodo-in Phönixhalle",pt:"Salão da Fênix de Byodo-in",it:"Sala della Fenice di Byodo-in",ru:"Зал Феникса Бёдо-ин",ar:"قاعة الفينيق بيودو-إن",hi:"ब्योडो-इन फ़ीनिक्स हॉल",th:"ฟีนิกซ์ฮอลล์เบียวโดอิน",vi:"Phượng Hoàng Đường Byodo-in",id:"Aula Phoenix Byodo-in",tr:"Byodo-in Anka Kuşu Salonu",nl:"Byodo-in Fenixhal",pl:"Sala Feniksa Byodo-in",sv:"Byodo-in Fenixhallen"},
  "東福寺":{ja:"東福寺",en:"Tofuku-ji",zh:"东福寺",ko:"도후쿠지","zh-tw":"東福寺",es:"Tofuku-ji",fr:"Tofuku-ji",de:"Tofuku-ji",pt:"Tofuku-ji",it:"Tofuku-ji",ru:"Тофуку-дзи",ar:"معبد توفوكوجي",hi:"तोफ़ुकु-जी",th:"โทฟุกุจิ",vi:"Chùa Tofuku-ji",id:"Tofuku-ji",tr:"Tofuku-ji",nl:"Tofuku-ji",pl:"Tofuku-ji",sv:"Tofuku-ji"},
  "東福寺 通天橋":{ja:"東福寺 通天橋",en:"Tofuku-ji Tsutenkyo Bridge",zh:"东福寺 通天桥",ko:"도후쿠지 쓰텐교","zh-tw":"東福寺 通天橋",es:"Puente Tsutenkyo de Tofuku-ji",fr:"Pont Tsutenkyo de Tofuku-ji",de:"Tofuku-ji Tsutenkyo-Brücke",pt:"Ponte Tsutenkyo de Tofuku-ji",it:"Ponte Tsutenkyo di Tofuku-ji",ru:"Мост Цутэнкё Тофуку-дзи",ar:"جسر تسوتينكيو",hi:"तोफ़ुकु-जी सुतेन्क्यो पुल",th:"สะพานซูเทนเคียวโทฟุกุจิ",vi:"Cầu Tsutenkyo Tofuku-ji",id:"Jembatan Tsutenkyo Tofuku-ji",tr:"Tofuku-ji Tsutenkyo Köprüsü",nl:"Tofuku-ji Tsutenkyo Brug",pl:"Most Tsutenkyo Tofuku-ji",sv:"Tofuku-ji Tsutenkyo-bron"},
  "紅葉":{ja:"紅葉",en:"Autumn Foliage",zh:"红叶",ko:"단풍","zh-tw":"紅葉",es:"Follaje otoñal",fr:"Feuillage d'automne",de:"Herbstlaub",pt:"Folhagem outonal",it:"Fogliame autunnale",ru:"Осенняя листва",ar:"أوراق الخريف",hi:"शरद पर्णसमूह",th:"ใบไม้เปลี่ยนสี",vi:"Lá thu",id:"Dedaunan musim gugur",tr:"Sonbahar yaprakları",nl:"Herfstkleuren",pl:"Jesienne liście",sv:"Höstlöv"},
  "紅葉ライトアップ":{ja:"紅葉ライトアップ",en:"Autumn Illumination",zh:"红叶灯光秀",ko:"단풍 라이트업","zh-tw":"紅葉點燈",es:"Iluminación otoñal",fr:"Illumination automnale",de:"Herbstbeleuchtung",pt:"Iluminação outonal",it:"Illuminazione autunnale",ru:"Осенняя подсветка",ar:"إضاءة الخريف",hi:"शरद रोशनी",th:"ไฟประดับใบไม้แดง",vi:"Ánh sáng mùa thu",id:"Iluminasi musim gugur",tr:"Sonbahar aydınlatması",nl:"Herfstverlichting",pl:"Jesienna iluminacja",sv:"Höstbelysning"},
  "寺院建築":{ja:"寺院建築",en:"Temple Architecture",zh:"寺院建筑",ko:"사찰 건축","zh-tw":"寺院建築",es:"Arquitectura del templo",fr:"Architecture du temple",de:"Tempelarchitektur",pt:"Arquitetura do templo",it:"Architettura del tempio",ru:"Архитектура храма",ar:"عمارة المعبد",hi:"मंदिर स्थापत्य",th:"สถาปัตยกรรมวัด",vi:"Kiến trúc chùa",id:"Arsitektur kuil",tr:"Tapınak mimarisi",nl:"Tempelarchitectuur",pl:"Architektura świątyni",sv:"Tempelarkitektur"},
  "姫路城":{ja:"姫路城",en:"Himeji Castle",zh:"姬路城",ko:"히메지성","zh-tw":"姬路城",es:"Castillo de Himeji",fr:"Château de Himeji",de:"Burg Himeji",pt:"Castelo de Himeji",it:"Castello di Himeji",ru:"Замок Химэдзи",ar:"قلعة هيميجي",hi:"हिमेजी कैसल",th:"ปราสาทฮิเมจิ",vi:"Lâu đài Himeji",id:"Kastil Himeji",tr:"Himeji Kalesi",nl:"Kasteel Himeji",pl:"Zamek Himeji",sv:"Himeji slott"},
  "おはらい町・おかげ横丁":{ja:"おはらい町・おかげ横丁",en:"Oharai-machi & Okage-yokocho",zh:"御祓町・托福横丁",ko:"오하라이마치・오카게요코초","zh-tw":"御祓町・托福橫丁",es:"Oharai-machi y Okage-yokocho",fr:"Oharai-machi et Okage-yokocho",de:"Oharai-machi & Okage-yokocho",pt:"Oharai-machi e Okage-yokocho",it:"Oharai-machi e Okage-yokocho",ru:"Охараи-мати и Окагэ-ёкотё",ar:"أوهاراي ماتشي وأوكاغيه يوكوتشو",hi:"ओहाराई-माची और ओकागे-योकोचो",th:"โอฮาไรมาจิและโอคาเงะโยโกโช",vi:"Oharai-machi & Okage-yokocho",id:"Oharai-machi & Okage-yokocho",tr:"Oharai-machi ve Okage-yokocho",nl:"Oharai-machi & Okage-yokocho",pl:"Oharai-machi i Okage-yokocho",sv:"Oharai-machi & Okage-yokocho"},
  "さっぽろ雪まつり":{ja:"さっぽろ雪まつり",en:"Sapporo Snow Festival",zh:"札幌冰雪节",ko:"삿포로 눈축제","zh-tw":"札幌雪祭",es:"Festival de Nieve de Sapporo",fr:"Festival de la Neige de Sapporo",de:"Sapporo Schneefestival",pt:"Festival de Neve de Sapporo",it:"Festival della Neve di Sapporo",ru:"Снежный фестиваль в Саппоро",ar:"مهرجان سابورو للثلج",hi:"साप्पोरो बर्फ़ महोत्सव",th:"เทศกาลหิมะซัปโปโร",vi:"Lễ hội Tuyết Sapporo",id:"Festival Salju Sapporo",tr:"Sapporo Kar Festivali",nl:"Sapporo Sneeuwfestival",pl:"Festiwal Śniegu w Sapporo",sv:"Sapporo Snöfestival"},
  "にこ淵":{ja:"にこ淵",en:"Niko-buchi",zh:"仁淀蓝潭",ko:"니코부치","zh-tw":"仁淀藍潭",es:"Niko-buchi",fr:"Niko-buchi",de:"Niko-buchi",pt:"Niko-buchi",it:"Niko-buchi",ru:"Нико-бути",ar:"نيكو بوتشي",hi:"निको-बुची",th:"นิโกะบุจิ",vi:"Niko-buchi",id:"Niko-buchi",tr:"Niko-buchi",nl:"Niko-buchi",pl:"Niko-buchi",sv:"Niko-buchi"},
  "三段滝公園":{ja:"三段滝公園",en:"Sandan Falls Park",zh:"三段瀑布公园",ko:"산단타키 공원","zh-tw":"三段瀑布公園",es:"Parque de las Cascadas Sandan",fr:"Parc des Cascades Sandan",de:"Sandan-Wasserfall-Park",pt:"Parque das Cascatas Sandan",it:"Parco delle Cascate Sandan",ru:"Парк водопада Сандан",ar:"حديقة شلالات ساندان",hi:"सान्दान जलप्रपात पार्क",th:"สวนน้ำตกซันดัน",vi:"Công viên thác Sandan",id:"Taman Air Terjun Sandan",tr:"Sandan Şelalesi Parkı",nl:"Sandan Watervallenpark",pl:"Park Wodospadu Sandan",sv:"Sandan Vattenfall Park"},
  "亀老山展望台":{ja:"亀老山展望台",en:"Mt. Kiro Observatory",zh:"龟老山展望台",ko:"기로산 전망대","zh-tw":"龜老山展望台",es:"Observatorio del Monte Kiro",fr:"Observatoire du Mont Kiro",de:"Aussichtspunkt Kiro-san",pt:"Observatório do Monte Kiro",it:"Osservatorio del Monte Kiro",ru:"Обсерватория горы Киро",ar:"مرصد جبل كيرو",hi:"किरो पर्वत वेधशाला",th:"จุดชมวิวภูเขาคิโระ",vi:"Đài quan sát Kiro-san",id:"Observatorium Gunung Kiro",tr:"Kiro Dağı Gözlem Yeri",nl:"Kiro-berg Observatorium",pl:"Obserwatorium Kiro-san",sv:"Kiro-san Utsiktsplats"},
  "伊勢神宮":{ja:"伊勢神宮",en:"Ise Grand Shrine",zh:"伊势神宫",ko:"이세 신궁","zh-tw":"伊勢神宮",es:"Gran Santuario de Ise",fr:"Grand Sanctuaire d'Ise",de:"Ise-Großschrein",pt:"Grande Santuário de Ise",it:"Grande Santuario di Ise",ru:"Великое святилище Исэ",ar:"ضريح إيسه الكبير",hi:"इसे महामंदिर",th:"ศาลเจ้าอิเสะ",vi:"Đền lớn Ise",id:"Kuil Agung Ise",tr:"Ise Büyük Tapınağı",nl:"Ise Grootschrijn",pl:"Wielka Świątynia Ise",sv:"Ise Storhelgedom"},
  "別府":{ja:"別府",en:"Beppu",zh:"别府",ko:"벳푸","zh-tw":"別府",es:"Beppu",fr:"Beppu",de:"Beppu",pt:"Beppu",it:"Beppu",ru:"Бэппу",ar:"بيبو",hi:"बेप्पू",th:"เบปปุ",vi:"Beppu",id:"Beppu",tr:"Beppu",nl:"Beppu",pl:"Beppu",sv:"Beppu"},
  "北竜町":{ja:"北竜町",en:"Hokuryu Sunflower Fields",zh:"北龙町向日葵花田",ko:"호쿠류 해바라기 밭","zh-tw":"北龍町向日葵花田",es:"Campos de Girasoles de Hokuryu",fr:"Champs de Tournesols de Hokuryu",de:"Hokuryu Sonnenblumenfelder",pt:"Campos de Girassóis de Hokuryu",it:"Campi di Girasoli di Hokuryu",ru:"Подсолнуховые поля Хокурю",ar:"حقول عباد الشمس هوكوريو",hi:"होकुर्यू सूरजमुखी के खेत",th:"ทุ่งทานตะวันโฮคุริว",vi:"Cánh đồng hoa hướng dương Hokuryu",id:"Ladang Bunga Matahari Hokuryu",tr:"Hokuryu Ayçiçeği Tarlaları",nl:"Hokuryu Zonnebloemvelden",pl:"Pola słoneczników Hokuryu",sv:"Hokuryu Solfält"},
  "名越屋沈下橋":{ja:"名越屋沈下橋",en:"Nagoya Chinkabashi Bridge",zh:"名越屋沉下桥",ko:"나고야 침하교","zh-tw":"名越屋沉下橋",es:"Puente Sumergible Nagoya",fr:"Pont Submersible Nagoya",de:"Nagoya Chinkabashi-Brücke",pt:"Ponte Submersível Nagoya",it:"Ponte Sommergibile Nagoya",ru:"Мост Нагоя-Тинкабаси",ar:"جسر ناغويا تشينكاباشي",hi:"नागोया चिंकाबाशी पुल",th:"สะพานนาโกยะชินคาบาชิ",vi:"Cầu chìm Nagoya",id:"Jembatan Nagoya Chinkabashi",tr:"Nagoya Chinkabashi Köprüsü",nl:"Nagoya Chinkabashi Brug",pl:"Most Nagoya Chinkabashi",sv:"Nagoya Chinkabashi-bron"},
  "品川":{ja:"品川",en:"Shinagawa",zh:"品川",ko:"시나가와","zh-tw":"品川",es:"Shinagawa",fr:"Shinagawa",de:"Shinagawa",pt:"Shinagawa",it:"Shinagawa",ru:"Синагава",ar:"شيناغاوا",hi:"शिनागावा",th:"ชินากาวะ",vi:"Shinagawa",id:"Shinagawa",tr:"Shinagawa",nl:"Shinagawa",pl:"Shinagawa",sv:"Shinagawa"},
  "大鳴門橋":{ja:"大鳴門橋",en:"Onaruto Bridge",zh:"大鸣门大桥",ko:"오나루토 대교","zh-tw":"大鳴門大橋",es:"Puente Onaruto",fr:"Pont d'Onaruto",de:"Onaruto-Brücke",pt:"Ponte Onaruto",it:"Ponte Onaruto",ru:"Мост Онаруто",ar:"جسر أوناروتو",hi:"ओनारुतो पुल",th:"สะพานโอนารุโตะ",vi:"Cầu Onaruto",id:"Jembatan Onaruto",tr:"Onaruto Köprüsü",nl:"Onaruto-brug",pl:"Most Onaruto",sv:"Onaruto-bron"},
  "夫婦岩":{ja:"夫婦岩",en:"Meoto-iwa Wedded Rocks",zh:"夫妇岩",ko:"메오토이와","zh-tw":"夫婦岩",es:"Rocas Meoto-iwa",fr:"Rochers Mariés Meoto-iwa",de:"Meoto-iwa Vermählte Felsen",pt:"Rochas Meoto-iwa",it:"Rocce Sposate Meoto-iwa",ru:"Мэото-ива Скалы-супруги",ar:"صخرتا ميوتو إيوا",hi:"मेओतो-इवा विवाहित चट्टानें",th:"เมโอโตะอิวะ",vi:"Đá Meoto-iwa",id:"Batu Meoto-iwa",tr:"Meoto-iwa Evli Kayalar",nl:"Meoto-iwa Gehuwde Rotsen",pl:"Skały Meoto-iwa",sv:"Meoto-iwa Vigselklipporna"},
  "室蘭":{ja:"室蘭",en:"Muroran",zh:"室兰",ko:"무로란","zh-tw":"室蘭",es:"Muroran",fr:"Muroran",de:"Muroran",pt:"Muroran",it:"Muroran",ru:"Муроран",ar:"موروران",hi:"मुरोरान",th:"มุโรรัน",vi:"Muroran",id:"Muroran",tr:"Muroran",nl:"Muroran",pl:"Muroran",sv:"Muroran"},
  "宮古島":{ja:"宮古島",en:"Miyako-jima",zh:"宫古岛",ko:"미야코지마","zh-tw":"宮古島",es:"Isla Miyako",fr:"Île Miyako",de:"Miyako-jima",pt:"Ilha Miyako",it:"Isola Miyako",ru:"Мияко-дзима",ar:"جزيرة مياكو",hi:"मियाको-जीमा",th:"เกาะมิยาโกะ",vi:"Đảo Miyako",id:"Pulau Miyako",tr:"Miyako Adası",nl:"Miyako-eiland",pl:"Wyspa Miyako",sv:"Miyako-jima"},
  "富良野":{ja:"富良野",en:"Furano",zh:"富良野",ko:"후라노","zh-tw":"富良野",es:"Furano",fr:"Furano",de:"Furano",pt:"Furano",it:"Furano",ru:"Фурано",ar:"فورانو",hi:"फ़ुरानो",th:"ฟุราโนะ",vi:"Furano",id:"Furano",tr:"Furano",nl:"Furano",pl:"Furano",sv:"Furano"},
  "小樽":{ja:"小樽",en:"Otaru",zh:"小樽",ko:"오타루","zh-tw":"小樽",es:"Otaru",fr:"Otaru",de:"Otaru",pt:"Otaru",it:"Otaru",ru:"Отару",ar:"أوتارو",hi:"ओतारु",th:"โอตารุ",vi:"Otaru",id:"Otaru",tr:"Otaru",nl:"Otaru",pl:"Otaru",sv:"Otaru"},
  "摩周湖":{ja:"摩周湖",en:"Lake Mashu",zh:"摩周湖",ko:"마슈호","zh-tw":"摩周湖",es:"Lago Mashu",fr:"Lac Mashu",de:"Mashu-See",pt:"Lago Mashu",it:"Lago Mashu",ru:"Озеро Масю",ar:"بحيرة ماشو",hi:"माशू झील",th:"ทะเลสาบมาชู",vi:"Hồ Mashu",id:"Danau Mashu",tr:"Mashu Gölü",nl:"Mashumeer",pl:"Jezioro Mashu",sv:"Mashusjön"},
  "旭山動物園":{ja:"旭山動物園",en:"Asahiyama Zoo",zh:"旭山动物园",ko:"아사히야마 동물원","zh-tw":"旭山動物園",es:"Zoológico Asahiyama",fr:"Zoo d'Asahiyama",de:"Asahiyama Zoo",pt:"Zoológico Asahiyama",it:"Zoo di Asahiyama",ru:"Зоопарк Асахияма",ar:"حديقة حيوانات أساهيياما",hi:"आसाहियामा चिड़ियाघर",th:"สวนสัตว์อาซาฮิยามะ",vi:"Vườn thú Asahiyama",id:"Kebun Binatang Asahiyama",tr:"Asahiyama Hayvanat Bahçesi",nl:"Asahiyama Dierentuin",pl:"Zoo Asahiyama",sv:"Asahiyama Djurpark"},
  "朝熊山展望台":{ja:"朝熊山展望台",en:"Asakuma-yama Observatory",zh:"朝熊山展望台",ko:"아사쿠마야마 전망대","zh-tw":"朝熊山展望台",es:"Observatorio de Asakuma-yama",fr:"Observatoire d'Asakuma-yama",de:"Aussichtspunkt Asakuma-yama",pt:"Observatório de Asakuma-yama",it:"Osservatorio di Asakuma-yama",ru:"Обсерватория Асакума-яма",ar:"مرصد أساكوما ياما",hi:"आसाकुमा-यामा वेधशाला",th:"จุดชมวิวอาซาคุมะยามะ",vi:"Đài quan sát Asakuma-yama",id:"Observatorium Asakuma-yama",tr:"Asakuma-yama Gözlem Yeri",nl:"Asakuma-yama Observatorium",pl:"Obserwatorium Asakuma-yama",sv:"Asakuma-yama Utsiktsplats"},
  "札幌":{ja:"札幌",en:"Sapporo",zh:"札幌",ko:"삿포로","zh-tw":"札幌",es:"Sapporo",fr:"Sapporo",de:"Sapporo",pt:"Sapporo",it:"Sapporo",ru:"Саппоро",ar:"سابورو",hi:"साप्पोरो",th:"ซัปโปโร",vi:"Sapporo",id:"Sapporo",tr:"Sapporo",nl:"Sapporo",pl:"Sapporo",sv:"Sapporo"},
  "来島海峡大橋":{ja:"来島海峡大橋",en:"Kurushima-Kaikyo Bridge",zh:"来岛海峡大桥",ko:"구루시마 해협 대교","zh-tw":"來島海峽大橋",es:"Puente Kurushima-Kaikyo",fr:"Pont de Kurushima-Kaikyo",de:"Kurushima-Kaikyo-Brücke",pt:"Ponte Kurushima-Kaikyo",it:"Ponte Kurushima-Kaikyo",ru:"Мост Курусима-Кайкё",ar:"جسر كوروشيما كايكيو",hi:"कुरुशिमा-कैक्यो पुल",th:"สะพานคุรุชิมะไคเคียว",vi:"Cầu Kurushima-Kaikyo",id:"Jembatan Kurushima-Kaikyo",tr:"Kurushima-Kaikyo Köprüsü",nl:"Kurushima-Kaikyo-brug",pl:"Most Kurushima-Kaikyo",sv:"Kurushima-Kaikyo-bron"},
  "東京":{ja:"東京",en:"Tokyo",zh:"东京",ko:"도쿄","zh-tw":"東京",es:"Tokio",fr:"Tokyo",de:"Tokio",pt:"Tóquio",it:"Tokyo",ru:"Токио",ar:"طوكيو",hi:"टोक्यो",th:"โตเกียว",vi:"Tokyo",id:"Tokyo",tr:"Tokyo",nl:"Tokio",pl:"Tokio",sv:"Tokyo"},
  "東山動物園":{ja:"東山動物園",en:"Higashiyama Zoo",zh:"东山动物园",ko:"히가시야마 동물원","zh-tw":"東山動物園",es:"Zoológico Higashiyama",fr:"Zoo de Higashiyama",de:"Higashiyama Zoo",pt:"Zoológico Higashiyama",it:"Zoo di Higashiyama",ru:"Зоопарк Хигасияма",ar:"حديقة حيوانات هيغاشيياما",hi:"हिगाशियामा चिड़ियाघर",th:"สวนสัตว์ฮิกาชิยามะ",vi:"Vườn thú Higashiyama",id:"Kebun Binatang Higashiyama",tr:"Higashiyama Hayvanat Bahçesi",nl:"Higashiyama Dierentuin",pl:"Zoo Higashiyama",sv:"Higashiyama Djurpark"},
  "松山城":{ja:"松山城",en:"Matsuyama Castle",zh:"松山城",ko:"마쓰야마성","zh-tw":"松山城",es:"Castillo de Matsuyama",fr:"Château de Matsuyama",de:"Burg Matsuyama",pt:"Castelo de Matsuyama",it:"Castello di Matsuyama",ru:"Замок Мацуяма",ar:"قلعة ماتسوياما",hi:"मात्सुयामा कैसल",th:"ปราสาทมัตสึยามะ",vi:"Lâu đài Matsuyama",id:"Kastil Matsuyama",tr:"Matsuyama Kalesi",nl:"Kasteel Matsuyama",pl:"Zamek Matsuyama",sv:"Matsuyama slott"},
  "桂浜":{ja:"桂浜",en:"Katsurahama Beach",zh:"桂浜海滩",ko:"가쓰라하마 해변","zh-tw":"桂濱海灘",es:"Playa Katsurahama",fr:"Plage de Katsurahama",de:"Katsurahama-Strand",pt:"Praia de Katsurahama",it:"Spiaggia di Katsurahama",ru:"Пляж Кацурахама",ar:"شاطئ كاتسوراهاما",hi:"कात्सुराहामा समुद्र तट",th:"หาดคัตสึราฮามะ",vi:"Bãi biển Katsurahama",id:"Pantai Katsurahama",tr:"Katsurahama Plajı",nl:"Katsurahama Strand",pl:"Plaża Katsurahama",sv:"Katsurahama Strand"},
  "梅林公園":{ja:"梅林公園",en:"Plum Grove Park",zh:"梅林公园",ko:"매림공원","zh-tw":"梅林公園",es:"Parque del Bosque de Ciruelos",fr:"Parc des Pruniers",de:"Pflaumenblüten-Park",pt:"Parque das Ameixeiras",it:"Parco dei Pruni",ru:"Парк сливовых деревьев",ar:"حديقة أشجار البرقوق",hi:"बेर बाग़ पार्क",th:"สวนบ๊วย",vi:"Công viên vườn mận",id:"Taman Kebun Plum",tr:"Erik Bahçesi Parkı",nl:"Pruimenboomgaardpark",pl:"Park Śliwkowy",sv:"Plommonlundsparken"},
  "横山展望台":{ja:"横山展望台",en:"Yokoyama Observatory",zh:"横山展望台",ko:"요코야마 전망대","zh-tw":"橫山展望台",es:"Observatorio Yokoyama",fr:"Observatoire de Yokoyama",de:"Aussichtspunkt Yokoyama",pt:"Observatório Yokoyama",it:"Osservatorio Yokoyama",ru:"Обсерватория Ёкояма",ar:"مرصد يوكوياما",hi:"योकोयामा वेधशाला",th:"จุดชมวิวโยโกยามะ",vi:"Đài quan sát Yokoyama",id:"Observatorium Yokoyama",tr:"Yokoyama Gözlem Yeri",nl:"Yokoyama Observatorium",pl:"Obserwatorium Yokoyama",sv:"Yokoyama Utsiktsplats"},
  "横浜":{ja:"横浜",en:"Yokohama",zh:"横滨",ko:"요코하마","zh-tw":"橫濱",es:"Yokohama",fr:"Yokohama",de:"Yokohama",pt:"Yokohama",it:"Yokohama",ru:"Иокогама",ar:"يوكوهاما",hi:"योकोहामा",th:"โยโกฮามะ",vi:"Yokohama",id:"Yokohama",tr:"Yokohama",nl:"Yokohama",pl:"Jokohama",sv:"Yokohama"},
  "沖縄":{ja:"沖縄",en:"Okinawa",zh:"冲绳",ko:"오키나와","zh-tw":"沖繩",es:"Okinawa",fr:"Okinawa",de:"Okinawa",pt:"Okinawa",it:"Okinawa",ru:"Окинава",ar:"أوكيناوا",hi:"ओकिनावा",th:"โอกินาวะ",vi:"Okinawa",id:"Okinawa",tr:"Okinawa",nl:"Okinawa",pl:"Okinawa",sv:"Okinawa"},
  "洞爺湖":{ja:"洞爺湖",en:"Lake Toya",zh:"洞爷湖",ko:"도야호","zh-tw":"洞爺湖",es:"Lago Toya",fr:"Lac Toya",de:"Toya-See",pt:"Lago Toya",it:"Lago Toya",ru:"Озеро Тоя",ar:"بحيرة تويا",hi:"तोया झील",th:"ทะเลสาบโทยะ",vi:"Hồ Toya",id:"Danau Toya",tr:"Toya Gölü",nl:"Toyameer",pl:"Jezioro Toya",sv:"Toyasjön"},
  "湯布院":{ja:"湯布院",en:"Yufuin",zh:"汤布院",ko:"유후인","zh-tw":"湯布院",es:"Yufuin",fr:"Yufuin",de:"Yufuin",pt:"Yufuin",it:"Yufuin",ru:"Юфуин",ar:"يوفوين",hi:"युफ़ुइन",th:"ยูฟุอิน",vi:"Yufuin",id:"Yufuin",tr:"Yufuin",nl:"Yufuin",pl:"Yufuin",sv:"Yufuin"},
  "父母ヶ浜":{ja:"父母ヶ浜",en:"Chichibugahama Beach",zh:"父母滨",ko:"지치부가하마 해변","zh-tw":"父母濱",es:"Playa Chichibugahama",fr:"Plage de Chichibugahama",de:"Chichibugahama-Strand",pt:"Praia de Chichibugahama",it:"Spiaggia di Chichibugahama",ru:"Пляж Титибугахама",ar:"شاطئ تشيتشيبوغاهاما",hi:"चिचिबुगाहामा समुद्र तट",th:"หาดชิชิบุกาฮามะ",vi:"Bãi biển Chichibugahama",id:"Pantai Chichibugahama",tr:"Chichibugahama Plajı",nl:"Chichibugahama Strand",pl:"Plaża Chichibugahama",sv:"Chichibugahama Strand"},
  "登別":{ja:"登別",en:"Noboribetsu",zh:"登别",ko:"노보리베쓰","zh-tw":"登別",es:"Noboribetsu",fr:"Noboribetsu",de:"Noboribetsu",pt:"Noboribetsu",it:"Noboribetsu",ru:"Ноборибэцу",ar:"نوبوريبيتسو",hi:"नोबोरिबेत्सू",th:"โนโบริเบ็ตสึ",vi:"Noboribetsu",id:"Noboribetsu",tr:"Noboribetsu",nl:"Noboribetsu",pl:"Noboribetsu",sv:"Noboribetsu"},
  "白川郷":{ja:"白川郷",en:"Shirakawa-go",zh:"白川乡",ko:"시라카와고","zh-tw":"白川鄉",es:"Shirakawa-go",fr:"Shirakawa-go",de:"Shirakawa-go",pt:"Shirakawa-go",it:"Shirakawa-go",ru:"Сиракава-го",ar:"شيراكاوا-غو",hi:"शिराकावा-गो",th:"ชิราคาวาโกะ",vi:"Shirakawa-go",id:"Shirakawa-go",tr:"Shirakawa-go",nl:"Shirakawa-go",pl:"Shirakawa-go",sv:"Shirakawa-go"},
  "知床":{ja:"知床",en:"Shiretoko",zh:"知床",ko:"시레토코","zh-tw":"知床",es:"Shiretoko",fr:"Shiretoko",de:"Shiretoko",pt:"Shiretoko",it:"Shiretoko",ru:"Сирэтоко",ar:"شيريتوكو",hi:"शिरेतोको",th:"ชิเระโตโกะ",vi:"Shiretoko",id:"Shiretoko",tr:"Shiretoko",nl:"Shiretoko",pl:"Shiretoko",sv:"Shiretoko"},
  "福岡":{ja:"福岡",en:"Fukuoka",zh:"福冈",ko:"후쿠오카","zh-tw":"福岡",es:"Fukuoka",fr:"Fukuoka",de:"Fukuoka",pt:"Fukuoka",it:"Fukuoka",ru:"Фукуока",ar:"فوكوكا",hi:"फ़ुकुओका",th:"ฟุกุโอกะ",vi:"Fukuoka",id:"Fukuoka",tr:"Fukuoka",nl:"Fukuoka",pl:"Fukuoka",sv:"Fukuoka"},
  "美唄":{ja:"美唄",en:"Bibai",zh:"美唄",ko:"비바이","zh-tw":"美唄",es:"Bibai",fr:"Bibai",de:"Bibai",pt:"Bibai",it:"Bibai",ru:"Бибай",ar:"بيباي",hi:"बिबाई",th:"บิไบ",vi:"Bibai",id:"Bibai",tr:"Bibai",nl:"Bibai",pl:"Bibai",sv:"Bibai"},
  "美幌峠":{ja:"美幌峠",en:"Bihoro Pass",zh:"美幌峠",ko:"비호로 고개","zh-tw":"美幌峠",es:"Paso Bihoro",fr:"Col de Bihoro",de:"Bihoro-Pass",pt:"Passagem Bihoro",it:"Passo Bihoro",ru:"Перевал Бихоро",ar:"ممر بيهورو",hi:"बिहोरो दर्रा",th:"ช่องเขาบิโฮโระ",vi:"Đèo Bihoro",id:"Celah Bihoro",tr:"Bihoro Geçidi",nl:"Bihoro Pas",pl:"Przełęcz Bihoro",sv:"Bihoro Passet"},
  "道後温泉":{ja:"道後温泉",en:"Dogo Onsen",zh:"道后温泉",ko:"도고 온천","zh-tw":"道後溫泉",es:"Termas de Dogo",fr:"Thermes de Dogo",de:"Dogo Onsen",pt:"Termas de Dogo",it:"Terme di Dogo",ru:"Онсэн Дого",ar:"ينابيع دوغو الحارة",hi:"दोगो ओनसेन",th:"ด็อกโกะออนเซ็น",vi:"Suối nước nóng Dogo",id:"Pemandian Air Panas Dogo",tr:"Dogo Kaplıcası",nl:"Dogo Onsen",pl:"Dogo Onsen",sv:"Dogo Onsen"},
  "金沢":{ja:"金沢",en:"Kanazawa",zh:"金泽",ko:"가나자와","zh-tw":"金澤",es:"Kanazawa",fr:"Kanazawa",de:"Kanazawa",pt:"Kanazawa",it:"Kanazawa",ru:"Канадзава",ar:"كانازاوا",hi:"कानाज़ावा",th:"คานาซาวะ",vi:"Kanazawa",id:"Kanazawa",tr:"Kanazawa",nl:"Kanazawa",pl:"Kanazawa",sv:"Kanazawa"},
  "鎌倉":{ja:"鎌倉",en:"Kamakura",zh:"镰仓",ko:"가마쿠라","zh-tw":"鎌倉",es:"Kamakura",fr:"Kamakura",de:"Kamakura",pt:"Kamakura",it:"Kamakura",ru:"Камакура",ar:"كاماكورا",hi:"कामाकुरा",th:"คามาคุระ",vi:"Kamakura",id:"Kamakura",tr:"Kamakura",nl:"Kamakura",pl:"Kamakura",sv:"Kamakura"},
  "阿寒":{ja:"阿寒",en:"Akan",zh:"阿寒",ko:"아칸","zh-tw":"阿寒",es:"Akan",fr:"Akan",de:"Akan",pt:"Akan",it:"Akan",ru:"Акан",ar:"أكان",hi:"अकान",th:"อะคัง",vi:"Akan",id:"Akan",tr:"Akan",nl:"Akan",pl:"Akan",sv:"Akan"},
  "高知城":{ja:"高知城",en:"Kochi Castle",zh:"高知城",ko:"고치성","zh-tw":"高知城",es:"Castillo de Kochi",fr:"Château de Kochi",de:"Burg Kochi",pt:"Castelo de Kochi",it:"Castello di Kochi",ru:"Замок Коти",ar:"قلعة كوتشي",hi:"कोची कैसल",th:"ปราสาทโคจิ",vi:"Lâu đài Kochi",id:"Kastil Kochi",tr:"Kochi Kalesi",nl:"Kasteel Kochi",pl:"Zamek Kochi",sv:"Kochi slott"},
  "鳥羽水族館":{ja:"鳥羽水族館",en:"Toba Aquarium",zh:"鸟羽水族馆",ko:"도바 수족관","zh-tw":"鳥羽水族館",es:"Acuario de Toba",fr:"Aquarium de Toba",de:"Toba Aquarium",pt:"Aquário de Toba",it:"Acquario di Toba",ru:"Аквариум Тоба",ar:"حوض أسماك توبا",hi:"तोबा एक्वेरियम",th:"พิพิธภัณฑ์สัตว์น้ำโทบะ",vi:"Thủy cung Toba",id:"Akuarium Toba",tr:"Toba Akvaryumu",nl:"Toba Aquarium",pl:"Akwarium Toba",sv:"Toba Akvarium"},
  "鳴門海峡":{ja:"鳴門海峡",en:"Naruto Whirlpools",zh:"鸣门海峡",ko:"나루토 해협","zh-tw":"鳴門海峽",es:"Remolinos de Naruto",fr:"Tourbillons de Naruto",de:"Naruto-Strudel",pt:"Redemoinhos de Naruto",it:"Vortici di Naruto",ru:"Водовороты Наруто",ar:"دوامات ناروتو",hi:"नारुतो भँवर",th:"น้ำวนนารุโตะ",vi:"Xoáy nước Naruto",id:"Pusaran Naruto",tr:"Naruto Girdapları",nl:"Naruto Draaikolken",pl:"Wiry Naruto",sv:"Naruto Virvlar"},
  "鴨川シーワールド":{ja:"鴨川シーワールド",en:"Kamogawa Sea World",zh:"鸭川海洋世界",ko:"가모가와 시월드","zh-tw":"鴨川海洋世界",es:"Kamogawa Sea World",fr:"Kamogawa Sea World",de:"Kamogawa Sea World",pt:"Kamogawa Sea World",it:"Kamogawa Sea World",ru:"Камогава Си Ворлд",ar:"عالم بحار كاموغاوا",hi:"कामोगावा सी वर्ल्ड",th:"คาโมกาวะซีเวิลด์",vi:"Kamogawa Sea World",id:"Kamogawa Sea World",tr:"Kamogawa Sea World",nl:"Kamogawa Sea World",pl:"Kamogawa Sea World",sv:"Kamogawa Sea World"},
};
const getLocName = (jpName, lang) => {
  const m = LOC_I18N[jpName];
  return m ? (m[lang] || m.en || jpName) : jpName;
};
const PREFECTURES = [
  {
    pref: "北海道",
    lat: 43.06, lng: 141.35,
    photos: [
      { id: "softyjlanqcbgshlzo9w", loc: "札幌", year: 2026 },
      { id: "ubtkpbv0t0vqp6mmgww7", loc: "札幌", year: 2026 },
      { id: "jwati7zcdj7ctipmonwa", loc: "札幌", year: 2026 },
      { id: "yfkhhrtc4lzhtdsn0yk7", loc: "札幌", year: 2026 },
      { id: "bhkmoyskvqwypxp3gcuj", loc: "札幌", year: 2026 },
      { id: "y0vh9qsl6exl3cwjvp4n", loc: "札幌", year: 2026 },
      { id: "bx39jxhwcpjicx4mbif4", loc: "札幌", year: 2026 },
      { id: "ymfqvkrt8gpxhqlceo9w", loc: "札幌", year: 2026 },
      { id: "pttbtrtbyyqtrnxbugur", loc: "札幌", year: 2026 },
      { id: "fxe4nsjpar0tkocgjftf", loc: "札幌", year: 2026 },
      { id: "jgmcsj3io9kle9pvo5dx", loc: "札幌", year: 2026 },
      { id: "kwwsvawt7qpth5g0luhs", loc: "札幌", year: 2026 },
      { id: "twwgiayzit8kqxfmghtx", loc: "札幌", year: 2026 },
      { id: "sxmtareqehuc5nlr2wvf", loc: "札幌", year: 2026 },
      { id: "mjwdtvn6eaxh2wkpmvgs", loc: "札幌", year: 2026 },
      { id: "pixyahpx1kgkivfdefny", loc: "札幌", year: 2026 },
      { id: "pa02u0isj9xximnvp7bu", loc: "札幌", year: 2026 },
      { id: "rkmlqi18ra5o0dcutace", loc: "札幌", year: 2026 },
      { id: "usvnljzznwmqu93sftg1", loc: "さっぽろ雪まつり", year: 2026 },
      { id: "rqjb5xgid4vochyrrpie", loc: "さっぽろ雪まつり", year: 2026 },
      { id: "cgazaabjctzmga9yojla", loc: "さっぽろ雪まつり", year: 2026 },
      { id: "rj0whx4syklikykwjq6z", loc: "さっぽろ雪まつり", year: 2026 },
      { id: "gueqzi2t9iacfrcz9fxh", loc: "旭山動物園", year: 2025 },
      { id: "dayk8svfgi7qvyogccli", loc: "旭山動物園", year: 2025 },
      { id: "nynaw9ykoregt6zml4ob", loc: "旭山動物園", year: 2025 },
      { id: "o2mawg9skfvhayynvnio", loc: "旭山動物園", year: 2025 },
      { id: "tdn43okylfpfvipei9ct", loc: "旭山動物園", year: 2025 },
      { id: "vebkeapnmubqy4fkka6n", loc: "旭山動物園", year: 2025 },
      { id: "jlnmop3no0c6apanqg0j", loc: "美幌峠", year: 2025 },
      { id: "dulixcwj07zpcjlhdmtv", loc: "美幌峠", year: 2025 },
      { id: "w09z0y5dytwnhbqaa26n", loc: "美幌峠", year: 2025 },
      { id: "dciohyawhu4uwppull42", loc: "美幌峠", year: 2025 },
      { id: "dauymniifixeho9ewvaj", loc: "美幌峠", year: 2025 },
      { id: "bwg4daxogde6yg99ahfc", loc: "美幌峠", year: 2025 },
      { id: "bnbmrqj3s9ig3ap8yulh", loc: "美幌峠", year: 2025 },
      { id: "isy0pekq31wadfzoukdb", loc: "美幌峠", year: 2025 },
      { id: "bfkqyvkq33cnx9k98dx9", loc: "美幌峠", year: 2025 },
      { id: "v6n5rruvjocwtqif5cej", loc: "美幌峠", year: 2025 },
      { id: "ykop4xhde4uibnd3zotl", loc: "美幌峠", year: 2025 },
      { id: "cofy806dc83kq5kr9voy", loc: "知床", year: 2025 },
      { id: "rsg8i9kvy6dgk7zrbf03", loc: "知床", year: 2025 },
      { id: "ygixf3zg86txffk3rfdc", loc: "知床", year: 2025 },
      { id: "sgqomcwsuq18xc1oyr3g", loc: "知床", year: 2025 },
      { id: "ucywl4kzi2dyfnvvcqxs", loc: "知床", year: 2025 },
      { id: "ig54fdyrmd5i1nm0kkjw", loc: "知床", year: 2025 },
      { id: "ievzbaoy5zffokh9iye4", loc: "知床", year: 2025 },
      { id: "x8dzdtol6icmixl5elrc", loc: "知床", year: 2025 },
      { id: "y9gpq3cbjzxtbyope84v", loc: "知床", year: 2025 },
      { id: "icv9vzvxw5cfb7zw1j4f", loc: "知床", year: 2025 },
      { id: "l5u87lvqtypftfcjmbwj", loc: "知床", year: 2025 },
      { id: "ecrvsnz2nf3tdotj3p79", loc: "知床", year: 2025 },
      { id: "w5stev0e8hgyhlmfkgyi", loc: "知床", year: 2025 },
      { id: "hovzpx74azpzuflnsmpm", loc: "知床", year: 2025 },
      { id: "s2c5awvwr66iowp35h2c", loc: "知床", year: 2025 },
      { id: "fpolpty5arwxbpeq6gfo", loc: "知床", year: 2025 },
      { id: "ucoyzrjnu4jcaowchnyf", loc: "知床", year: 2025 },
      { id: "nvzuynx7xanlkdmtithn", loc: "知床", year: 2025 },
      { id: "avbnpuch4zqf2uggedeu", loc: "知床", year: 2025 },
      { id: "acalqxeajcchzvdrzkos", loc: "知床", year: 2025 },
      { id: "bxegtf9vgggrnwfqazvb", loc: "知床", year: 2025 },
      { id: "oqkdlmmlgir1yqqfyov7", loc: "知床", year: 2025 },
      { id: "ohoqrtxg97rup7g05ups", loc: "知床", year: 2025 },
      { id: "pu85sedyzf9nvt53rd4n", loc: "知床", year: 2025 },
      { id: "grehvbvz4bwun6atuibb", loc: "知床", year: 2025 },
      { id: "ywfdk96oy02x8qmdqa9d", loc: "知床", year: 2025 },
      { id: "drbam4ipptjc6ye3jnc9", loc: "知床", year: 2025 },
      { id: "g5zkvhiefql4b8npve9j", loc: "知床", year: 2025 },
      { id: "mlrekiokelsrjmoev8ru", loc: "知床", year: 2025 },
      { id: "ccwj6ftxoygltoalpqoq", loc: "知床", year: 2025 },
      { id: "hf5dr6ntuwcl9s9rawxe", loc: "摩周湖", year: 2025 },
      { id: "yzckpd6gdubpyhudubyl", loc: "摩周湖", year: 2025 },
      { id: "je8xkhzlsfbiqpryxdw5", loc: "摩周湖", year: 2025 },
      { id: "k5ctrte2solhpgtl1gfi", loc: "阿寒", year: 2025 },
      { id: "pewpzn9x8dxwtdf8yety", loc: "阿寒", year: 2025 },
      { id: "h8i0rxmcioxwbnfagiqm", loc: "阿寒", year: 2025 },
      { id: "lyvcmp5qignj3j8b04e3", loc: "阿寒", year: 2025 },
      { id: "evwlr6fgjoxbuaoshv3i", loc: "阿寒", year: 2025 },
      { id: "pjtr6rjgdlxvhxp8ehpr", loc: "阿寒", year: 2025 },
      { id: "s8tldtnav0mudikuyhci", loc: "阿寒", year: 2025 },
      { id: "pqj0meeyzbhve6mfb2q0", loc: "阿寒", year: 2025 },
      { id: "vrl4wjhzjwabtd2xinc9", loc: "阿寒", year: 2025 },
      { id: "h2vsed9dz1fj935lh9li", loc: "阿寒", year: 2025 },
      { id: "hvnlsmmmikzqkmooht8u", loc: "富良野", year: 2025 },
      { id: "byu71ylpugsuuphprww3", loc: "富良野", year: 2025 },
      { id: "m2d7xxomq41swkkbfw2f", loc: "富良野", year: 2025 },
      { id: "pxsovtxkmho2fczrlti3", loc: "富良野", year: 2025 },
      { id: "ifhfmrhwjcvmeijvskac", loc: "富良野", year: 2025 },
      { id: "ein3krfvgsxxzw4vhx48", loc: "富良野", year: 2025 },
      { id: "rxrntpbpqfl9adcm09oc", loc: "三段滝公園", year: 2025 },
      { id: "plljckjsj5zcuefw9pr8", loc: "三段滝公園", year: 2025 },
      { id: "lhhheuwpth3ljujvqyub", loc: "札幌", year: 2025 },
      { id: "fy9x8yjintsr8qsoujzb", loc: "札幌", year: 2025 },
      { id: "wkfty1tifq11h9pggdou", loc: "札幌", year: 2025 },
      { id: "totyxhutqqiwqtbdtl1d", loc: "札幌", year: 2025 },
      { id: "oozy0rqivqbygaivdoe5", loc: "札幌", year: 2025 },
      { id: "tlr1wtzxsppiruqg9unf", loc: "札幌", year: 2025 },
      { id: "iywyqspjifr0f0c1n9eq", loc: "室蘭", year: 2025 },
      { id: "egmtecz5qmasffkjvxsr", loc: "室蘭", year: 2025 },
      { id: "tabp9sbfbulnaybmlpss", loc: "室蘭", year: 2025 },
      { id: "yh7e0rhvhnzzxj5esa5f", loc: "小樽", year: 2025 },
      { id: "nk4jyu4dlzatzfgocyhr", loc: "小樽", year: 2025 },
      { id: "wqg1jgss7ruytfu6hxad", loc: "小樽", year: 2025 },
      { id: "heugkwts7mna2tb7okh0", loc: "小樽", year: 2025 },
      { id: "yvecem5fnp26jy6ipjau", loc: "小樽", year: 2025 },
      { id: "mftjoje8rvy6l9hd1uk4", loc: "札幌", year: 2025 },
      { id: "zxgxiqctoaz0zhmqgqx2", loc: "美唄", year: 2025 },
      { id: "pdatjgjwzr26f9bgdxmg", loc: "美唄", year: 2025 },
      { id: "zkq3u4coguskgyylylwc", loc: "札幌", year: 2025 },
      { id: "mfyb6epqbtpimoklolix", loc: "札幌", year: 2025 },
      { id: "ta1vbaimv7ybmnjsnvcu", loc: "室蘭", year: 2025 },
      { id: "zsstczmlufechxukd0at", loc: "洞爺湖", year: 2025 },
      { id: "zvcgkttawzj1drdzqhix", loc: "洞爺湖", year: 2025 },
      { id: "k8gyiyw1hosgg5ksnyqg", loc: "洞爺湖", year: 2025 },
      { id: "lxw7vgube4hgznoacxvp", loc: "洞爺湖", year: 2025 },
      { id: "ofe2ifgjpvsguty4udfh", loc: "登別", year: 2025 },
      { id: "qgcwoptede3vztwdxngv", loc: "登別", year: 2025 },
      { id: "rnlyiorswvgfwgyvu6uj", loc: "北竜町", year: 2024 },
      { id: "jlgnjbrolezvatmiu38c", loc: "北竜町", year: 2024 },
    ]
  },
  {
    pref: "千葉県",
    lat: 35.61, lng: 140.12,
    photos: [
      { id: "pwrg5vqnmt1uxmh07jhb", loc: "鴨川シーワールド", year: 2024 },
    ]
  },
  {
    pref: "東京都",
    lat: 35.68, lng: 139.69,
    photos: [
      { id: "hhuf0fqsgs4qdztehnzb", loc: "東京", year: 2024 },
      { id: "my7re28ckggxseludvlj", loc: "東京", year: 2024 },
      { id: "bemqqcwb710hhvrp5k1d", loc: "品川", year: 2024 },
      { id: "fzrsmhfr718rzcwptvws", loc: "品川", year: 2024 },
      { id: "zvioi0jy5xl3y85lw2sa", loc: "品川", year: 2024 },
      { id: "n9wv3krjeebsash5zvxv", loc: "東京", year: 2024 },
      { id: "irwultgwnqvfpj3ufrhq", loc: "東京", year: 2024 },
      { id: "voty0hrw6k95t7cq2nmp", loc: "東京", year: 2024 },
      { id: "fdatlwqk3m6b2auwxcra", loc: "東京", year: 2024 },
      { id: "wpnpqjmfgrpx0pkqq4wf", loc: "東京", year: 2024 },
      { id: "lokxylhdsiai3w8cjy6e", loc: "東京", year: 2024 },
      { id: "veheffiav3eqsnlyidg7", loc: "東京", year: 2024 },
      { id: "al0m8swfnbyrbkc9ebeo", loc: "東京", year: 2024 },
      { id: "n0e8xeyvaabkthqbjgoh", loc: "東京", year: 2024 },
    ]
  },
  {
    pref: "神奈川県",
    lat: 35.45, lng: 139.64,
    photos: [
      { id: "roeiwcd2bexzyq5eswsn", loc: "横浜", year: 2025 },
      { id: "dyejili3mrrizyvpwcvb", loc: "横浜", year: 2025 },
      { id: "aa9zrjl0dcnlulqjilee", loc: "横浜", year: 2025 },
      { id: "j3g8s2rcorimyusaf83i", loc: "横浜", year: 2025 },
      { id: "nvlttty0qgchzstxo6fb", loc: "横浜", year: 2025 },
      { id: "xghhx4hetbdgvw69ou9g", loc: "横浜", year: 2025 },
      { id: "prfajod3kbdxntzhooxt", loc: "横浜", year: 2025 },
      { id: "payoa5eewjukgzk7vrjk", loc: "横浜", year: 2025 },
      { id: "gj8s9sm7ixl9iz7aczew", loc: "横浜", year: 2025 },
      { id: "nzuvubaffkzjzeukta7f", loc: "鎌倉", year: 2025 },
      { id: "qaua9k8kdnrfl8pyomvg", loc: "鎌倉", year: 2025 },
      { id: "davjaitkmbgfzbuqqshb", loc: "鎌倉", year: 2025 },
      { id: "efujkjo4rcztbxdtulou", loc: "鎌倉", year: 2025 },
      { id: "p0yizyrijhwadznyouh1", loc: "鎌倉", year: 2025 },
      { id: "pegmqelz8hwemg8lmuem", loc: "鎌倉", year: 2025 },
      { id: "rksndawdacv4inhsoztc", loc: "鎌倉", year: 2025 },
      { id: "vi22klqfhpaxmua4uxio", loc: "鎌倉", year: 2025 },
      { id: "x7ceq5ilu9gumx7nnabs", loc: "鎌倉", year: 2025 },
      { id: "ztglq3cxaliezsq0048u", loc: "鎌倉", year: 2025 },
      { id: "wqnb6brxqwpwj7usjjcr", loc: "鎌倉", year: 2025 },
      { id: "ett0yifnekzzulxng4kf", loc: "鎌倉", year: 2025 },
      { id: "eajc1cik7jd8ykslva95", loc: "鎌倉", year: 2025 },
      { id: "jmf7rkrauxpwodnbuknb", loc: "鎌倉", year: 2025 },
      { id: "lrp0vksrbfnh2pwwgmmm", loc: "鎌倉", year: 2025 },
      { id: "tgoia6bco7damtvz2uox", loc: "鎌倉", year: 2025 },
      { id: "zyusbwjt7ijoithy2oe2", loc: "鎌倉", year: 2025 },
      { id: "cqtxfygczdtbulyypp2s", loc: "鎌倉", year: 2025 },
      { id: "fopphn6icofqso4t6ljm", loc: "鎌倉", year: 2025 },
      { id: "izaxlfrectinom3ni2kx", loc: "鎌倉", year: 2025 },
      { id: "lngonbizwjt65wb6cmud", loc: "鎌倉", year: 2025 },
      { id: "qad2jinoi3p0fdci2khl", loc: "鎌倉", year: 2025 },
      { id: "ew9qbkavirvi9dyk2y6c", loc: "鎌倉", year: 2025 },
      { id: "o0p2yvggitth4szsjodn", loc: "鎌倉", year: 2025 },
      { id: "hay0vuznehokdqiozajo", loc: "鎌倉", year: 2025 },
      { id: "ud4u7d9annvid0z34noc", loc: "鎌倉", year: 2025 },
      { id: "u3eexuf03etogvhckvu3", loc: "鎌倉", year: 2025 },
      { id: "qfv83n8hk5nwpp3onndu", loc: "鎌倉", year: 2025 },
      { id: "pdrekc0jdl2binzgjmqd", loc: "鎌倉", year: 2025 },
      { id: "anj9lwufynk4fthbn7ur", loc: "鎌倉", year: 2025 },
      { id: "ryqqaaawd3vhobvd4tnw", loc: "鎌倉", year: 2025 },
      { id: "kxezxlirlowgipdjeyv6", loc: "鎌倉", year: 2025 },
      { id: "huvbk5yghxxi9i7naju1", loc: "鎌倉", year: 2025 },
      { id: "kautbc4pnvlcfg9a1rdi", loc: "鎌倉", year: 2025 },
      { id: "y2wc5fgze6u1fuwxem26", loc: "鎌倉", year: 2025 },
      { id: "gy0zet9wn9wuu6araazo", loc: "鎌倉", year: 2025 },
      { id: "x6o5feqxgyw1d85jl8kl", loc: "鎌倉", year: 2025 },
      { id: "mnhvtt3jhn2aq4xwezkt", loc: "鎌倉", year: 2025 },
      { id: "cmf5zpinkqrdzmxyq7ol", loc: "鎌倉", year: 2025 },
      { id: "yw3azffdkstu48ih5tpt", loc: "鎌倉", year: 2025 },
      { id: "eih6ffrbddltvx3bjzgp", loc: "鎌倉", year: 2025 },
    ]
  },
  {
    pref: "石川県",
    lat: 36.59, lng: 136.63,
    photos: [
      { id: "tholpq2n9n3es1zbunl2", loc: "金沢", year: 2024 },
      { id: "fvmfopoju9j1afeyfmfq", loc: "金沢", year: 2024 },
      { id: "njkhpu1dsjnaqdpuibsl", loc: "金沢", year: 2024 },
      { id: "a7mrvz28s8bhljtvxerd", loc: "金沢", year: 2024 },
      { id: "iqzmqcxvlmzmpxb3e8nl", loc: "金沢", year: 2024 },
      { id: "vravjelowaeamknkqkte", loc: "金沢", year: 2024 },
      { id: "zip572vkpw2oinqbodt9", loc: "金沢", year: 2024 },
    ]
  },
  {
    pref: "岐阜県",
    lat: 35.39, lng: 136.72,
    photos: [
      { id: "qvsgt1aw6o4iwewvhmdc", loc: "白川郷", year: 2024 },
      { id: "ake8ymyn7d0qnybyzihw", loc: "白川郷", year: 2024 },
      { id: "y4l6gy5xwtz8d3fvvjb0", loc: "白川郷", year: 2024 },
      { id: "vnvzv0ztfpwvvrvl5lfn", loc: "白川郷", year: 2024 },
    ]
  },
  {
    pref: "愛知県",
    lat: 35.18, lng: 136.91,
    photos: [
      { id: "d9zzmvbrhcra5yiz7wf2", loc: "東山動物園", year: 2026 },
      { id: "esnwda2bmizzfkzz8wio", loc: "東山動物園", year: 2026 },
      { id: "d7kuuzdma3caurtxqnl2", loc: "東山動物園", year: 2026 },
      { id: "bmnvk4yvrdr0tbuy1mpu", loc: "東山動物園", year: 2026 },
      { id: "tdt6v72szvtnkkljprzo", loc: "東山動物園", year: 2026 },
      { id: "rpx3qhx4cetajlsvhbdf", loc: "東山動物園", year: 2026 },
      { id: "aggz4yfjjq5jb6ksmjas", loc: "東山動物園", year: 2026 },
      { id: "nvppjkkhgoidh24ilcri", loc: "東山動物園", year: 2026 },
      { id: "j8dccwqcudkzcjclwjdl", loc: "東山動物園", year: 2026 },
      { id: "gzzzjgl7zbppkkv5fafp", loc: "東山動物園", year: 2026 },
      { id: "oalpuwnwov6mqkdoxuxj", loc: "東山動物園", year: 2026 },
      { id: "ihvclom5aynceacv1b9c", loc: "東山動物園", year: 2026 },
      { id: "fmkvychabpy0nkfsy7ct", loc: "東山動物園", year: 2026 },
      { id: "iruajiykij2sfoqdxxgm", loc: "東山動物園", year: 2026 },
      { id: "yfbqyipnasg0ccxfn9c8", loc: "東山動物園", year: 2026 },
      { id: "smx4ztgstf905vdrbmvc", loc: "東山動物園", year: 2026 },
      { id: "q1mzddbwimo7vypffpak", loc: "東山動物園", year: 2026 },
      { id: "uwefhpwm7e85ewi68tgp", loc: "東山動物園", year: 2026 },
      { id: "cemg184iixgrlutqlkkr", loc: "東山動物園", year: 2026 },
      { id: "cfnt5wcgast0i0c9ha5h", loc: "東山動物園", year: 2026 },
      { id: "ciehvlktddmfmao1zhj4", loc: "東山動物園", year: 2026 },
      { id: "gswfddvq2q8c0t8saclg", loc: "東山動物園", year: 2026 },
      { id: "ezesf5vrqpli8znbvjpi", loc: "東山動物園", year: 2026 },
      { id: "wdlkpcyvsr5g4sklgd4w", loc: "東山動物園", year: 2026 },
    ]
  },
  {
    pref: "三重県",
    lat: 34.73, lng: 136.51,
    photos: [
      { id: "ngy6lud2tgbztbyf4jke", loc: "梅林公園", year: 2026 },
      { id: "urycxqz4g4k3vra6gzzw", loc: "梅林公園", year: 2026 },
      { id: "bb924wbc5x1ny5c8hxob", loc: "横山展望台", year: 2026 },
      { id: "ajf05ybnec7njy9ubaqi", loc: "横山展望台", year: 2026 },
      { id: "jdobpyucdfhouqrswhec", loc: "横山展望台", year: 2026 },
      { id: "rc4ukzba1zlsefhsfbz3", loc: "朝熊山展望台", year: 2026 },
      { id: "dhwplqr8k5e49mis89hz", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "n0prvjjho2nf5ucrsoil", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "queyyiuttwaei8kiznbc", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "zq5o5jklm6eehcprk5w4", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "vxpu71gd5qnd3g1ey91f", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "emfqpctrgkvremxuzxvj", loc: "おはらい町・おかげ横丁", year: 2026 },
      { id: "gzs6fz39kbyjlywoppuf", loc: "伊勢神宮", year: 2026 },
      { id: "w2h5cjtnpeekmtld3dmy", loc: "伊勢神宮", year: 2026 },
      { id: "wbdpz61p1xxcdumsr4ua", loc: "伊勢神宮", year: 2026 },
      { id: "r244rjurupipzhamaiuv", loc: "伊勢神宮", year: 2026 },
      { id: "lt1vn7wimwlslgwgv6qk", loc: "伊勢神宮", year: 2026 },
      { id: "lpspgxkqt5vekjyztt5g", loc: "伊勢神宮", year: 2026 },
      { id: "oa1yiaxflqbq3afxsggp", loc: "伊勢神宮", year: 2026 },
      { id: "pby91yxkkrxjdaflielh", loc: "夫婦岩", year: 2026 },
      { id: "elpprz829ghgpuvgh9c1", loc: "鳥羽水族館", year: 2026 },
      { id: "dbexqjaj5yoy7tugr6nv", loc: "鳥羽水族館", year: 2026 },
      { id: "nze6lvbizsyc2rdoeksi", loc: "鳥羽水族館", year: 2026 },
      { id: "v0pbwtscokak0sfnz9lc", loc: "鳥羽水族館", year: 2026 },
      { id: "gvswuk8pqczrhib2fo0d", loc: "鳥羽水族館", year: 2026 },
      { id: "lrn9jljffnnkiifl02jv", loc: "鳥羽水族館", year: 2026 },
      { id: "oxltiu41uiekga5zrdlc", loc: "鳥羽水族館", year: 2026 },
      { id: "hby2zcizym4q02kyplrs", loc: "鳥羽水族館", year: 2026 },
      { id: "zrtfurwejoxf4zdqoxe9", loc: "鳥羽水族館", year: 2026 },
      { id: "aiaqkp1bnrxmckphpowu", loc: "鳥羽水族館", year: 2026 },
      { id: "uvegilhugmzsppzt1i3n", loc: "鳥羽水族館", year: 2026 },
      { id: "pkfhxqbarnxusn6jdpdy", loc: "鳥羽水族館", year: 2026 },
      { id: "jjkfqca5ztizzngwxvy0", loc: "鳥羽水族館", year: 2026 },
      { id: "rfzr79edmgjca6opnljt", loc: "鳥羽水族館", year: 2026 },
      { id: "ndtofmydaitspbsburef", loc: "鳥羽水族館", year: 2026 },
      { id: "ysiak3am7dmste2sldb4", loc: "鳥羽水族館", year: 2026 },
      { id: "xbhrwavgo6wbsuu5jl9k", loc: "鳥羽水族館", year: 2026 },
      { id: "uouqy7tcwrewlt34ai6z", loc: "鳥羽水族館", year: 2026 },
    ]
  },
  {
    pref: "京都府",
    lat: 35.01, lng: 135.77,
    photos: [
      { id: "DSC07601_cocitq", loc: "清水寺周辺", year: 2025 },
      { id: "DSC07592_anjr5r", loc: "清水寺", year: 2025 },
      { id: "DSC07563_icizbb", loc: "清水寺", year: 2025 },
      { id: "DSC07546_gaplky", loc: "清水寺", year: 2025 },
      { id: "DSC07504_yxpbtk", loc: "平等院鳳凰堂", year: 2025 },
      { id: "DSC07495_qorawr", loc: "平等院鳳凰堂", year: 2025 },
      { id: "DSC07451_s1rhpd", loc: "東福寺", year: 2025 },
      { id: "DSC07425_zsvfno", loc: "東福寺", year: 2025 },
      { id: "DSC07417_dqlfwd", loc: "東福寺", year: 2025 },
      { id: "DSC07408_qarh4p", loc: "東福寺", year: 2025 },
      { id: "DSC07394_hhq8bw", loc: "東福寺", year: 2025 },
      { id: "DSC07393_xtp40k", loc: "清水寺", year: 2025 },
      { id: "DSC07386_vrsz1g", loc: "清水寺", year: 2025 },
      { id: "DSC07355_zyqovr", loc: "清水寺", year: 2025 },
      { id: "DSC07337_kaejdo", loc: "清水寺", year: 2025 },
      { id: "DSC07337_rjoogf", loc: "清水寺", year: 2025 },
      { id: "DSC07313_akiagf", loc: "金閣寺", year: 2025 },
      { id: "DSC07290_sz6x7s", loc: "金閣寺", year: 2025 },
    ]
  },
  {
    pref: "兵庫県",
    lat: 34.84, lng: 134.69,
    photos: [
      { id: "DSC07173_ogwql9", loc: "姫路城", year: 2025 },
      { id: "DSC07150_hlpfgz", loc: "姫路城", year: 2025 },
      { id: "DSC07139_h55edw", loc: "姫路城", year: 2025 },
      { id: "DSC07127_wo4ifg", loc: "姫路城", year: 2025 },
      { id: "DSC07121_fxsgn9", loc: "姫路城", year: 2025 },
    ]
  },
  {
    pref: "奈良県",
    lat: 34.69, lng: 135.83,
    photos: [
      { id: "DSC07266_ii8otn", loc: "法隆寺 夢殿", year: 2025 },
      { id: "DSC07249_ijee7w", loc: "法隆寺", year: 2025 },
      { id: "DSC07241_kxqtal", loc: "法隆寺", year: 2025 },
    ]
  },
  {
    pref: "徳島県",
    lat: 34.07, lng: 134.56,
    photos: [
      { id: "iy3ljfosdadc2xabf8ly", loc: "鳴門海峡", year: 2025 },
      { id: "psuhikljduldvl7jmox7", loc: "大鳴門橋", year: 2025 },
    ]
  },
  {
    pref: "香川県",
    lat: 34.34, lng: 134.04,
    photos: [
      { id: "qsn9a5qfmcav4ufkwehz", loc: "父母ヶ浜", year: 2025 },
      { id: "jpctlgps9n9yz7z2pefr", loc: "父母ヶ浜", year: 2025 },
    ]
  },
  {
    pref: "愛媛県",
    lat: 33.84, lng: 132.77,
    photos: [
      { id: "b3uqemt85nz8gcxz4mrs", loc: "亀老山展望台", year: 2025 },
      { id: "e55oicb01uyyhukixdss", loc: "来島海峡大橋", year: 2025 },
      { id: "wibx41ebmy2hxovs8wv1", loc: "松山城", year: 2025 },
      { id: "alukivsd5rv3gvo7c6sh", loc: "松山城", year: 2025 },
      { id: "ghweftqojjonv5zb6elq", loc: "松山城", year: 2025 },
      { id: "pebdpfzj17kk1ssl62dc", loc: "松山城", year: 2025 },
      { id: "jizpq9o0ag6bt1nmynv4", loc: "道後温泉", year: 2025 },
      { id: "kbsiyecqjwzzyzurmddz", loc: "道後温泉", year: 2025 },
      { id: "t4witz3if3ox7tl0vips", loc: "道後温泉", year: 2025 },
      { id: "milp580j3b6uspkm7l8z", loc: "道後温泉", year: 2025 },
    ]
  },
  {
    pref: "高知県",
    lat: 33.56, lng: 133.53,
    photos: [
      { id: "opof4iv0ksb7hyyxwd0g", loc: "にこ淵", year: 2025 },
      { id: "cpucwtmknaneef6uw8en", loc: "名越屋沈下橋", year: 2025 },
      { id: "ekyaldwcry9gqiy9tgre", loc: "高知城", year: 2025 },
      { id: "yhenlvvvz5kucqldydfm", loc: "高知城", year: 2025 },
      { id: "z5dppj2tdaf1ovyjq3id", loc: "高知城", year: 2025 },
      { id: "pk5nouibsptedo8wds3h", loc: "高知城", year: 2025 },
      { id: "pkszsvhktqyiwlyfurkd", loc: "高知城", year: 2025 },
      { id: "w43utexm5kjyu54hducu", loc: "高知城", year: 2025 },
      { id: "x7zziur8nq5gx2vksgzr", loc: "桂浜", year: 2025 },
      { id: "p0z0vmdnqz4ptqiwgtwl", loc: "桂浜", year: 2025 },
      { id: "zxpnph1zw30vn5ce3hws", loc: "桂浜", year: 2025 },
    ]
  },
  {
    pref: "福岡県",
    lat: 33.61, lng: 130.42,
    photos: [
      { id: "cherzayx1vksmmu12kfg", loc: "福岡", year: 2025 },
      { id: "zuytsm5uieakyzlj8mqa", loc: "福岡", year: 2025 },
    ]
  },
  {
    pref: "大分県",
    lat: 33.24, lng: 131.61,
    photos: [
      { id: "szm5n4mwwmmh3fksqukz", loc: "別府", year: 2025 },
      { id: "yuufchifryqi13eyyoor", loc: "別府", year: 2025 },
      { id: "qxfxsuorglm0r8fzfgcr", loc: "別府", year: 2025 },
      { id: "znmygcxoyxe7uihta2a3", loc: "別府", year: 2025 },
      { id: "nhcofuhnbijxmqf7heop", loc: "別府", year: 2025 },
      { id: "bwtpdo3ycszgiokdrkqz", loc: "別府", year: 2025 },
      { id: "nejr6pdgmudgjynjhpzl", loc: "別府", year: 2025 },
      { id: "gcjxpyk0fxof7we3ytqo", loc: "湯布院", year: 2025 },
    ]
  },
  {
    pref: "沖縄県",
    lat: 26.34, lng: 127.77,
    photos: [
      { id: "wt6ow9shewohl0dm0lnj", loc: "宮古島", year: 2025 },
      { id: "iw0ue8i6asslgwkredsv", loc: "宮古島", year: 2025 },
      { id: "noogzrhpbx4h8uk6wet5", loc: "宮古島", year: 2025 },
      { id: "ccthpmmrxzfv9fgctuws", loc: "宮古島", year: 2025 },
      { id: "asrmh4euv3ntt5saqm0o", loc: "宮古島", year: 2025 },
      { id: "zo1fxoj920zvxfgavwuo", loc: "宮古島", year: 2025 },
      { id: "vnduczpwqmgjkhll1l0z", loc: "宮古島", year: 2025 },
      { id: "jwirovp2d1kqfae6gqti", loc: "宮古島", year: 2025 },
      { id: "l1ihzzfw2lkah7rim3hk", loc: "宮古島", year: 2025 },
      { id: "hfyo4tn30ahh2xz3asnn", loc: "宮古島", year: 2025 },
      { id: "lcfe4zz4xvxjzruda1yo", loc: "宮古島", year: 2025 },
      { id: "pprmxtxaj53r93mkk7f3", loc: "宮古島", year: 2025 },
      { id: "gcmokjrl4gjekujs3sws", loc: "宮古島", year: 2025 },
      { id: "akk660cretzdipzyhoz1", loc: "宮古島", year: 2025 },
      { id: "iutfwnyuojdgmm3zvghl", loc: "宮古島", year: 2025 },
      { id: "ccggglphvsgibbj9bdmn", loc: "宮古島", year: 2025 },
      { id: "sd95do3wwohnsnevmfod", loc: "宮古島", year: 2025 },
      { id: "e3kwo6gyrnbspcplkmnc", loc: "宮古島", year: 2025 },
      { id: "ksrpgxpsgmiffx3krp8n", loc: "宮古島", year: 2025 },
      { id: "jg5yb3rx5vvn2c9v0jlv", loc: "宮古島", year: 2025 },
      { id: "iyxrkq7ojni4adbkd2id", loc: "宮古島", year: 2025 },
      { id: "oxgq7nub2ad0mixlkgdj", loc: "宮古島", year: 2025 },
      { id: "hu3psnou05kneq6nvna1", loc: "宮古島", year: 2025 },
      { id: "eb6mwk1ahcoubidkfh36", loc: "宮古島", year: 2025 },
      { id: "t3gq5xm4udnrgmnwyibs", loc: "宮古島", year: 2025 },
      { id: "k1eg8vwxkgjugoffr8mf", loc: "宮古島", year: 2025 },
      { id: "hx1ucufb7xc2hbcvpfsb", loc: "宮古島", year: 2025 },
      { id: "bti9ugmg2jr2874wglyy", loc: "宮古島", year: 2025 },
      { id: "yj9bzxco6ntjdxqfxvwe", loc: "宮古島", year: 2025 },
      { id: "uotk9tgqbswqr1ennalv", loc: "宮古島", year: 2025 },
      { id: "mztgcepivlstffevagwz", loc: "宮古島", year: 2025 },
      { id: "ovui6gb8bdpvlc2gd9gl", loc: "宮古島", year: 2025 },
      { id: "kgk6jnvbfx3wvqgjia9m", loc: "宮古島", year: 2025 },
      { id: "afjaenvla1eya7kiv5zh", loc: "宮古島", year: 2025 },
      { id: "oes9giyouydgsdqq0f4t", loc: "宮古島", year: 2025 },
      { id: "sgzeqvsvqk2whkqjlbbi", loc: "宮古島", year: 2025 },
      { id: "axgmmojhbauycrqe0ihk", loc: "宮古島", year: 2025 },
      { id: "jvxvv4qs8b5sot8hcaka", loc: "宮古島", year: 2025 },
      { id: "gmywadlhis8t8qq7qzad", loc: "沖縄", year: 2025 },
      { id: "wwegz4pphz9rqlbzcufj", loc: "沖縄", year: 2025 },
      { id: "sqga5qi1232ctbwiy9yg", loc: "沖縄", year: 2025 },
      { id: "mrrqu1cggsemlqpmivff", loc: "沖縄", year: 2025 },
      { id: "i09y2z1ym2i4gnccanrz", loc: "沖縄", year: 2025 },
      { id: "uogey3f0zr0sqnd6hnhe", loc: "沖縄", year: 2025 },
      { id: "j0yqruzfnhlvo71uvqlw", loc: "沖縄", year: 2025 },
      { id: "ufnlccnqlf5uhtq11dng", loc: "沖縄", year: 2025 },
      { id: "ypfqwllaxnyzquznta8g", loc: "沖縄", year: 2025 },
      { id: "yz0zk0vhgpb9gindz10d", loc: "沖縄", year: 2025 },
      { id: "fwufx8wdz5dzwyajob2n", loc: "沖縄", year: 2025 },
      { id: "s91ox51yhpumogn8hkwo", loc: "沖縄", year: 2025 },
      { id: "koq3wiap1lqqdthqltue", loc: "沖縄", year: 2025 },
      { id: "i36rj6ku3zowegj99l2o", loc: "沖縄", year: 2025 },
      { id: "fsbi0m8rqjnh3b5ip2ci", loc: "沖縄", year: 2025 },
      { id: "kx4tcd5ofly9wr00slek", loc: "沖縄", year: 2025 },
      { id: "eosimyutys8zgrwnolti", loc: "沖縄", year: 2025 },
      { id: "lk2f5q4sb8x8gtyetead", loc: "沖縄", year: 2025 },
      { id: "vcwbt8mzkznp8ky34awl", loc: "沖縄", year: 2025 },
      { id: "o79k95rgx51w398bouzg", loc: "沖縄", year: 2025 },
      { id: "bg8qrozxyqvokbgmgcei", loc: "沖縄", year: 2025 },
      { id: "ybe2noyobnmhpnrgtboh", loc: "沖縄", year: 2025 },
      { id: "zfxeserikfeqjzqe2skq", loc: "沖縄", year: 2025 },
      { id: "z8y0ijv4wdcxgwams241", loc: "沖縄", year: 2025 },
      { id: "ytopadczpa7puematekd", loc: "沖縄", year: 2025 },
      { id: "prpernet3o52fo34dupj", loc: "沖縄", year: 2025 },
      { id: "k52lizfrccqy0iebr2ow", loc: "沖縄", year: 2025 },
      { id: "dmucdvrhjhjwvatwrfip", loc: "沖縄", year: 2025 },
      { id: "xcpxauh33nsys4w3ij38", loc: "沖縄", year: 2025 },
      { id: "qk9bh31p4bhspwavb7el", loc: "沖縄", year: 2025 },
      { id: "yxotgv2k34lk3vxpacid", loc: "沖縄", year: 2025 },
      { id: "gnvfynyo0rpwekzj1y3i", loc: "沖縄", year: 2025 },
      { id: "ujgluuxpb7v5wxzijeok", loc: "沖縄", year: 2025 },
      { id: "wnp3s6tlu7zatmiin3as", loc: "沖縄", year: 2025 },
      { id: "wwa7xzb2qldnh7qwczci", loc: "沖縄", year: 2025 },
      { id: "hjutoisviwwj6ulptodt", loc: "沖縄", year: 2025 },
      { id: "eun1he1u4mpcl3hjfpba", loc: "沖縄", year: 2025 },
      { id: "gfznqpn18mawgeimrmyr", loc: "沖縄", year: 2025 },
      { id: "jrirgyo3urvp49udusvg", loc: "沖縄", year: 2025 },
      { id: "teo40vgijk8hodqm8871", loc: "沖縄", year: 2025 },
      { id: "h9setuefm4wxfu6udlrh", loc: "沖縄", year: 2025 },
      { id: "c4mljbvi3zl6e9nxwlrz", loc: "沖縄", year: 2025 },
      { id: "vdmsartx9qcs9w3f0snu", loc: "沖縄", year: 2025 },
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
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);
  const t = TR[lang];

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width:768px)").matches);
    const mq = window.matchMedia("(max-width:768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* D3 zoom for mobile pinch-to-zoom */
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .on("zoom", (e) => {
        g.attr("transform", e.transform);
        setZoomScale(e.transform.k);
      });
    zoomRef.current = zoom;
    if (isMobile && zoomEnabled) {
      svg.call(zoom);
      svg.style("touch-action", "none");
    } else {
      svg.on(".zoom", null);
      svg.style("touch-action", "pan-y");
      /* Reset zoom when disabling */
      if (gRef.current) {
        g.attr("transform", d3.zoomIdentity);
        svg.call(zoom.transform, d3.zoomIdentity);
        setZoomScale(1);
      }
    }
    return () => { svg.on(".zoom", null); };
  }, [isMobile, zoomEnabled]);

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
      /* External GeoJSON sources both failed — keep map hidden rather than show the
         English-named JP_GEO fallback which would mismatch prefMap keys and let
         taps land on the wrong prefecture. */
    }
    loadMap();
    return () => { cancelled = true; };
  }, []);

  /* Map zoom/pan disabled — prevents scroll hijack on both PC and mobile */

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
    if (typeof window !== "undefined") window.__debugMap = `tap pref=${prefName} prevTapped=${tapped} mapId=${prefMap[prefName]?.id}`;
    if (!prefMap[prefName]) return;
    if (isMobile) {
      if (tapped === prefName) {
        /* Second tap — navigate */
        if (typeof window !== "undefined") window.__debugMap = `NAV id=${prefMap[prefName].id} pref=${prefName}`;
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
      <svg ref={svgRef} viewBox={"0 0 " + MW + " " + MH} style={{ width: "100%", height: "auto", display: "block" }} onClick={handleSvgClick}>
        <defs>
          <radialGradient id="goldGrad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="rgba(240,205,130,0.58)" />
            <stop offset="55%" stopColor="rgba(220,190,100,0.38)" />
            <stop offset="100%" stopColor="rgba(150,120,60,0.18)" />
          </radialGradient>
          <radialGradient id="goldGradHover" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(255,225,160,0.78)" />
            <stop offset="60%" stopColor="rgba(232,200,120,0.55)" />
            <stop offset="100%" stopColor="rgba(180,150,80,0.25)" />
          </radialGradient>
          <linearGradient id="pathNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,228,223,0.22)" />
            <stop offset="100%" stopColor="rgba(232,228,223,0.10)" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="goldGlowStrong" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0.15  0 1 0 0 0.08  0 0 1 0 0.02  0 0 0 1 0" result="c" />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tipBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
          <linearGradient id="okiFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(220,190,100,0)" />
            <stop offset="20%" stopColor="rgba(220,190,100,0.28)" />
            <stop offset="80%" stopColor="rgba(220,190,100,0.22)" />
            <stop offset="100%" stopColor="rgba(220,190,100,0)" />
          </linearGradient>
        </defs>
        <g ref={gRef}>
        {paths.map(p => {
          if (!p.d) return null;
          const isHL = p.hasPhotos;
          const isHovered = activeHov === p.name;
          const isActive = hlId && prefMap[p.name] && prefMap[p.name].id === hlId;
          const fill = isHL
            ? (isHovered || isActive ? "url(#goldGradHover)" : "url(#goldGrad)")
            : (isHovered ? "rgba(232,228,223,0.30)" : "url(#pathNeutral)");
          const stroke = isHL
            ? (isHovered || isActive ? "rgba(255,225,160,0.9)" : "rgba(220,190,100,0.55)")
            : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
          const filter = isHL ? (isHovered || isActive ? "url(#goldGlowStrong)" : "url(#goldGlow)") : undefined;
          return (
            <path key={p.id} d={p.d}
              fill={fill}
              stroke={stroke}
              strokeWidth={isHL ? (isHovered || isActive ? 1.6 : 1.2) : 0.85}
              strokeLinejoin="round"
              filter={filter}
              style={{ cursor: isHL ? "pointer" : "default", transition: "fill .6s cubic-bezier(.2,.8,.2,1), stroke .5s, stroke-width .4s, filter .4s, opacity .4s", transformOrigin: "center", transformBox: "fill-box" }}
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
            const tipW = 168, tipH = 66;
            const flipX = pos.x + tipW > MW - 20;
            const tx = flipX ? pos.x - tipW - 10 : pos.x + 10;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            const clipId = "hovClip_" + activeHov;
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="rgba(14,12,10,.82)" stroke="rgba(220,190,100,.38)" strokeWidth=".6" />
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={10} fill="none" stroke="rgba(255,235,200,.15)" strokeWidth="1" filter="url(#tipBlur)" />
                <clipPath id={clipId}><rect x={tx + 7} y={ty + 8} width={46} height={32} rx={6} /></clipPath>
                <image href={pin.thumb} x={tx + 7} y={ty + 8} width={46} height={32} clipPath={"url(#" + clipId + ")"} preserveAspectRatio="xMidYMid slice" />
                <text x={tx + 62} y={ty + 24} fill="#f2ece2" fontSize="11.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" fontWeight="500" letterSpacing=".04em">{getPrefName(activeHov, lang)}</text>
                <text x={tx + 62} y={ty + 44} fill="rgba(220,190,100,.72)" fontSize="8.5" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" letterSpacing=".08em">{t.tapHint}</text>
              </g>
            );
          } else {
            /* Name-only tooltip for prefectures without photos */
            const tipW = 118, tipH = 32;
            const flipX = pos.x + tipW > MW - 20;
            const tx = flipX ? pos.x - tipW - 10 : pos.x + 10;
            const ty = Math.max(5, Math.min(MH - tipH - 5, pos.y - tipH / 2));
            return (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tx} y={ty} width={tipW} height={tipH} rx={8} fill="rgba(14,12,10,.76)" stroke="rgba(232,228,223,.18)" strokeWidth=".6" />
                <text x={tx + tipW / 2} y={ty + 20} fill="rgba(232,228,223,.7)" fontSize="10" fontFamily="var(--font-zen-kaku), 'Noto Sans JP', sans-serif" textAnchor="middle" letterSpacing=".06em">{getPrefName(activeHov, lang)}</text>
              </g>
            );
          }
        })()}
        {/* ── Okinawa Inset (soft gradient divider) ── */}
        <g>
          <defs>
            <clipPath id="okiClip"><rect x={0} y={0} width={OKI_BOX.w} height={OKI_BOX.h} /></clipPath>
          </defs>
          <line x1={OKI_BOX.x} y1={OKI_BOX.y + 6} x2={OKI_BOX.x + OKI_BOX.w} y2={OKI_BOX.y + 6}
            stroke="url(#okiFade)" strokeWidth=".8" />
          <text x={OKI_BOX.x + OKI_BOX.w / 2} y={OKI_BOX.y + 16} fill="rgba(232,228,223,.42)" fontSize="9"
            fontFamily="var(--font-playfair), 'Playfair Display', serif" fontStyle="italic" textAnchor="middle" letterSpacing=".18em">{t.oki}</text>
          <g transform={"translate(" + OKI_BOX.x + "," + OKI_BOX.y + ")"} clipPath="url(#okiClip)">
            <rect
              x={0} y={0} width={OKI_BOX.w} height={OKI_BOX.h}
              fill="#000" fillOpacity={0.001}
              pointerEvents="all"
              style={{ cursor: prefMap["沖縄県"] ? "pointer" : "default" }}
              onClick={(e) => { e.stopPropagation(); if (prefMap["沖縄県"]) handlePrefInteraction("沖縄県"); }}
            />
            {okiPaths.map(p => {
              if (!p.d) return null;
              const isHL = p.hasPhotos;
              const isHovered = activeHov === p.name;
              const fill = isHL
                ? (isHovered ? "url(#goldGradHover)" : "url(#goldGrad)")
                : (isHovered ? "rgba(232,228,223,0.30)" : "url(#pathNeutral)");
              const stroke = isHL
                ? (isHovered ? "rgba(255,225,160,0.9)" : "rgba(220,190,100,0.55)")
                : (isHovered ? "rgba(232,228,223,0.55)" : "rgba(232,228,223,0.32)");
              return (
                <path key={"oki" + p.id} d={p.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHL ? (isHovered ? 1.4 : 1.0) : 0.75}
                  strokeLinejoin="round"
                  filter={isHL ? (isHovered ? "url(#goldGlowStrong)" : "url(#goldGlow)") : undefined}
                  style={{ cursor: isHL ? "pointer" : "default", transition: "fill .6s cubic-bezier(.2,.8,.2,1), stroke .5s, filter .4s" }}
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
      {isMobile && (
        <div className="map-zoom-controls">
          <button
            className={"map-zoom-btn" + (zoomEnabled ? " map-zoom-btn-active" : "")}
            onClick={() => setZoomEnabled(z => !z)}
            aria-label={zoomEnabled ? t.mapZoomOff : t.mapZoomOn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              {!zoomEnabled && <><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></>}
            </svg>
            <span>{zoomEnabled ? t.mapZoomOff : t.mapZoomOn}</span>
          </button>
          {zoomEnabled && zoomScale > 1 && (
            <button
              className="map-zoom-btn"
              onClick={() => {
                if (svgRef.current && zoomRef.current) {
                  const svg = d3.select(svgRef.current);
                  svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
                }
              }}
              aria-label={t.mapZoomReset}
            >
              {t.mapZoomReset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const [lang, setLang] = useState("ja");
  const [lightbox, setLightbox] = useState(null);
  const [lbClosing, setLbClosing] = useState(false);
  const closeLightbox = useCallback(() => {
    setLbClosing(true);
    setTimeout(() => { setLightbox(null); setLbClosing(false); }, 340);
  }, []);

  /* Responsive image sizes (default to desktop for SSR, update on client) */
  const [imgSizes, setImgSizes] = useState({ thumbW: 1200, lbW: 2400 });
  useEffect(() => {
    if (window.innerWidth <= 768) setImgSizes({ thumbW: 600, lbW: 800 });
  }, []);
  const { thumbW, lbW } = imgSizes;

  /* Flat list of all photos for lightbox navigation */
  const allPhotos = useMemo(() => {
    const list = [];
    PREFECTURES.forEach(pf => {
      pf.photos.forEach(photo => {
        list.push({ url: getUrl(photo, lbW), pref: pf.pref, loc: photo.loc || "", year: photo.year || null });
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
  const navigatingRef = useRef(false);
  const [debugMsg, setDebugMsg] = useState("");
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

  /* Reset all horizontal scrolls to left (newest photo) on mount */
  useEffect(() => {
    const scrollers = document.querySelectorAll(".cin-hscroll");
    scrollers.forEach(el => { el.scrollLeft = 0; });
  }, []);

  /* Scroll-linked fade-in for sections (IntersectionObserver) */
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const targets = document.querySelectorAll(".reveal");
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") lbPrev();
      else if (e.key === "ArrowRight") lbNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, lbPrev, lbNext]);

  /* Preload adjacent lightbox images (±2 for faster swipe) */
  useEffect(() => {
    if (lightbox === null || !allPhotos.length) return;
    const len = allPhotos.length;
    const indices = [-2, -1, 1, 2].map(d => ((lightbox + d) % len + len) % len);
    indices.forEach(i => { const img = new Image(); img.src = allPhotos[i].url; });
  }, [lightbox, allPhotos]);

  /* Lock body scroll while lightbox is open (iOS-safe via position:fixed) */
  useEffect(() => {
    if (lightbox === null) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => { html.style.scrollBehavior = prevBehavior; });
    };
  }, [lightbox === null]);

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      if (mapRef.current) setPastMap(mapRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToMap = useCallback(() => { mapRef.current && mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }, []);
  const scrollToContact = useCallback(() => { contactRef.current && contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);
  const handlePin = useCallback(id => {
    const el = photoRefs.current[id];
    const targetPref = el?.querySelector('.cin-pref span')?.textContent;
    if (!el) { setDebugMsg(`handlePin id=${id} NO_EL`); return; }
    document.querySelectorAll('.cin-pref-group.reveal, .cin-map-wrap.reveal').forEach(r => {
      if (!r.classList.contains('is-visible')) {
        r.style.transition = 'none';
        r.classList.add('is-visible');
        void r.offsetHeight;
        r.style.transition = '';
      }
    });
    navigatingRef.current = true;
    setTimeout(() => { navigatingRef.current = false; }, 1200);
    const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: targetY, behavior: "smooth" });
    setDebugMsg(`id=${id} pref=${targetPref} targetY=${Math.round(targetY)} curY=${Math.round(window.scrollY)}`);
    setTimeout(() => {
      const finalPref = document.elementFromPoint(window.innerWidth/2, 100)?.closest('.cin-pref-group')?.querySelector('.cin-pref span')?.textContent;
      setDebugMsg(`DONE id=${id} pref=${targetPref} → finalY=${Math.round(window.scrollY)} expectedY=${Math.round(targetY)} atTop=${finalPref}`);
    }, 1500);
    setHlPhoto(id);
    setTimeout(() => setHlPhoto(null), 2500);
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif", position: "relative" }}>
      {debugMsg && (
        <div style={{ position: "fixed", top: 4, left: 4, right: 4, zIndex: 99999, background: "rgba(220,40,40,.92)", color: "#fff", padding: "6px 8px", fontSize: 11, borderRadius: 4, fontFamily: "monospace", wordBreak: "break-all" }}>
          {debugMsg}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", name: "Landscapes of Japan", url: "https://landscapes-of-japan.vercel.app", description: "日本全国の風景写真ポートフォリオ。北海道から沖縄まで380枚以上の写真を20言語対応で公開。", inLanguage: "ja" },
          { "@type": "ImageGallery", name: "Landscapes of Japan — 日本の風景", url: "https://landscapes-of-japan.vercel.app", description: "Cinematic photography portfolio showcasing landscapes across 18 prefectures of Japan",
            about: { "@type": "Country", name: "Japan" },
            image: PREFECTURES.flatMap(pf => pf.photos.slice(0, 3).map(p => ({
              "@type": "Photograph", name: p.loc + " - " + pf.pref, contentLocation: { "@type": "Place", name: p.loc, address: { "@type": "PostalAddress", addressRegion: pf.pref, addressCountry: "JP" } },
              image: "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/" + encodeURIComponent(p.id) + ".jpg",
              dateCreated: p.year ? String(p.year) : undefined
            })))
          }
        ]
      }) }} />

      <div ref={cRef}>
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
          <div className="cin-hero-content" style={{ zIndex: 2 }}>
            <h1 className="cin-hero-title">{t.hero.t}</h1>
            <p className="cin-hero-desc">{t.hero.d}</p>
          </div>
        </div>
        <section className="cin-section">
          <div className="cin-map-wrap reveal" ref={mapRef}>
            <div className="cin-map-box">
              <JapanMap lang={lang} photos={MAP_PINS} onPinClick={handlePin} hlId={hlPhoto} />
            </div>
          </div>
          <div className="cin-gallery">
            {PREFECTURES.map((pf, pi) => (
              <div key={pf.pref} ref={el => { photoRefs.current["p" + pi] = el; }} className="cin-pref-group reveal">
                <div className="cin-pref">
                  <span>{getPrefName(pf.pref, lang)}</span>
                  {lang !== "en" && getPrefName(pf.pref, "en") !== getPrefName(pf.pref, lang) && (
                    <span className="cin-pref-jp">{getPrefName(pf.pref, "en")}</span>
                  )}
                </div>
                <div className="cin-hscroll">
                  {pf.photos.map((photo, idx) => (
                    <div key={pf.pref + idx} className="cin-hcard" onClick={() => { if (navigatingRef.current) return; openLightbox(getUrl(photo, lbW)); }} onContextMenu={e => e.preventDefault()}>
                      <div className="cin-hcard-img-wrap">
                        <img src={getUrl(photo, thumbW)} alt={photo.loc + " - " + pf.pref + " | Landscapes of Japan"} loading="lazy" draggable="false" />
                        {photo.loc && <div className="cin-hcard-loc"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{getLocName(photo.loc, lang)}</div>}
                        {photo.year && <div className="cin-hcard-year">{photo.year}</div>}
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
        <div className="contact-section reveal" ref={contactRef}>
          <h2 className="contact-title">{t.contact.title}</h2>
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
        if (!cur) return null;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchCount = 0;
        const onTouchStart = (e) => { touchCount = e.touches.length; touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; };
        const onTouchEnd = (e) => {
          if (touchCount > 1) return;
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;
          if (diffX > 60 && Math.abs(diffX) > Math.abs(diffY)) { lbPrev(); return; }
          if (diffX < -60 && Math.abs(diffX) > Math.abs(diffY)) { lbNext(); return; }
          // Small movement = tap → close (controls stopPropagate their own touchend so won't reach here).
          if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20) closeLightbox();
        };
        const stopTouch = (fn) => (e) => { e.stopPropagation(); e.preventDefault(); fn(); };
        return (
          <div
            className={"cin-lb" + (lbClosing ? " closing" : "")}
            onContextMenu={e => e.preventDefault()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            <button
              className="cin-lb-close"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              onTouchEnd={stopTouch(closeLightbox)}
              aria-label="Close"
            >×</button>
            <div className="cin-lb-info">
              <div className="cin-lb-pref">{getPrefName(cur.pref, lang)}</div>
              {cur.loc && <div className="cin-lb-loc">{getLocName(cur.loc, lang)}</div>}
              {cur.year && <div className="cin-lb-year">{cur.year}</div>}
            </div>
            <button
              className="cin-lb-arrow left"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              onTouchEnd={stopTouch(lbPrev)}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="cin-lb-inner" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
              <img src={cur.url} alt={cur.loc + " - " + cur.pref + " | Landscapes of Japan"} draggable="false" />
              <div className="cin-lb-wm">Landscapes of Japan</div>
            </div>
            <button
              className="cin-lb-arrow right"
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              onTouchEnd={stopTouch(lbNext)}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        );
      })()}
    </div>
  );
}
