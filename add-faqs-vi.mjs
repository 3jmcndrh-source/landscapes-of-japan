#!/usr/bin/env node
/** Vietnamese FAQs を extras/vi.js に追加 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VI_PATH = resolve(__dirname, "app", "content", "extras", "vi.js");

const PREF_FAQS = {
  "北海道": [
    { q: "Mùa nào tốt nhất để chụp Hokkaido?", a: "Tháng Hai cho Lễ hội tuyết Sapporo và băng trôi, tháng Bảy cho oải hương Furano, tháng Mười cho lá thu, và tháng Một-Ba cho băng trôi Shiretoko. Hãy ghép chủ đề với mùa cao điểm." },
    { q: "Những địa điểm chụp ảnh chính ở Hokkaido?", a: "Cảnh quan Sapporo, kênh Otaru, đồng hoa Furano, hồ Mashu, hồ Toya, bán đảo Shiretoko, Thung lũng Địa ngục Noboribetsu, vườn thú Asahiyama và đồi Biei lượn sóng — mỗi vùng có đặc trưng thị giác riêng." },
  ],
  "千葉県": [{ q: "Chiba có loại nhiếp ảnh nào?", a: "Bờ biển, cảnh quan nông thôn Boso và động vật hoang dã/thủy cung — sự đa dạng gần đại đô thị." }],
  "東京都": [{ q: "Mẹo chụp đêm Tokyo?", a: "Chân máy, ISO thấp và phơi sáng dài. Giờ xanh (30 phút sau hoàng hôn) cân bằng tốt nhất bầu trời và ánh đèn thành phố." }],
  "神奈川県": [{ q: "Cách tốt nhất thăm Kamakura và Yokohama?", a: "Sáng ở chùa Kamakura (Đại Phật, Hasedera), sau đó chiều đến Yokohama cho hoàng hôn ở Minato Mirai và cảnh đêm Kho gạch đỏ." }],
  "石川県": [{ q: "Một ngày chụp gì ở Kanazawa?", a: "Sớm tinh mơ ở Kenrokuen (ánh sáng dịu), rồi lâu đài Kanazawa, Higashi Chaya (chiều/tối), chợ Omicho, kết thúc với Cổng Trống ở ga Kanazawa lúc đêm." }],
  "山梨県": [{ q: "Vị trí tốt nhất để chụp núi Phú Sĩ với hoa anh đào?", a: "Đài quan sát chùa Chureito ở Công viên Arakurayama Sengen nổi tiếng thế giới. Sau 398 bậc thang, chùa, hoa anh đào và Phú Sĩ thẳng hàng trong một khung. Đỉnh nở đầu-giữa tháng Tư, bình minh cho ánh sáng huyền ảo nhất." }],
  "長野県": [{ q: "Hoa anh đào ở Công viên thành Takato nở khi nào?", a: "Đầu-giữa tháng Tư. Khoảng 1.500 cây «Takato Kohigan» nở hồng nhạt, mệnh danh «hoa anh đào số một dưới trời». Đèn buổi tối như mơ, sáng sớm tránh đám đông tốt nhất." }],
  "岐阜県": [{ q: "Khi nào là đèn mùa đông Shirakawa-go?", a: "Tổ chức trong số ngày giới hạn (thường ~6) trong tháng Một-Hai. Yêu cầu đặt chỗ; lên kế hoạch sớm để chụp nhà gassho trong tuyết từ đài quan sát." }],
  "愛知県": [{ q: "Mẹo chụp tốt ở vườn thú?", a: "Một ống kính fixed nhanh (ví dụ 50mm f/1.8) làm mờ nền; ép ống kính sát lưới để nó biến mất. Lấy nét vào mắt động vật." }],
  "三重県": [
    { q: "Nghi thức chụp ảnh ở Ise Jingu?", a: "Bên trong các đền chính nghiêm cấm. Giữ thận trọng trong các torii và tránh chụp tín đồ hoặc giáo sĩ trực tiếp." },
    { q: "Khi nào mặt trời mọc giữa Meoto Iwa?", a: "Chỉ gần hạ chí (tháng Năm-Bảy) mặt trời mọc thẳng giữa hai tảng đá. Đầu tháng Sáu có tỷ lệ trời quang tốt nhất; đến trước bình minh." },
  ],
  "京都府": [
    { q: "Thời điểm tốt nhất cho lá thu Kyoto?", a: "Đỉnh thường cuối tháng Mười Một-đầu tháng Mười Hai. Tofuku-ji (cầu Tsuten-kyo), Eikando, Kiyomizu-dera và Arashiyama đẹp nhất dưới ánh sáng phía trước buổi sáng." },
    { q: "Làm sao tránh đám đông?", a: "Sáng sớm (6-8h) là tốt nhất. Kiyomizu-dera mở 6h, đi quanh ngoài Kinkaku-ji trước 9h, và đến Byodoin đúng giờ mở." },
  ],
  "兵庫県": [{ q: "Điểm chụp tốt nhất cho Lâu đài Himeji?", a: "Mặt trước Otemon, Quảng trường Sannomaru (với hoa anh đào), Vườn Nishi-no-maru (góc bên) và Công viên Otoko-yama (cao) là bốn cổ điển." }],
  "奈良県": [{ q: "Mẹo chụp hươu ở Nara?", a: "Cầm shika senbei thu hút chúng, nhưng chúng đi khi hết. Ánh sáng ngược buổi sáng làm nổi bật bộ lông là cấu trúc cổ điển." }],
  "徳島県": [{ q: "Khi nào xoáy nước Naruto lớn nhất?", a: "Vào triều cường (gần trăng non hoặc rằm) mùa xuân/thu, quanh thủy triều cao/thấp (±1-2 giờ). Kiểm tra bảng thủy triều; chụp từ tàu hoặc lối đi cầu Onaruto." }],
  "香川県": [{ q: "Điều kiện nào tạo phản chiếu gương của Chichibugahama?", a: "①Triều thấp trùng hoàng hôn ②Gió gần như không ③Mây trên trời (trời quang trông phẳng). Du lịch Mitoyo công bố ngày tối ưu trực tuyến." }],
  "愛媛県": [{ q: "Có thể chụp tòa nhà Dogo Onsen Honkan không?", a: "Bên ngoài hoàn toàn mở; góc sau và đèn buổi tối được khuyên. Một số khu vực bên trong cấm vì quyền riêng tư." }],
  "高知県": [{ q: "Mẹo bắt màu xanh Niko-buchi?", a: "Quanh trưa ngày trong, khi ánh sáng trực tiếp chạm nước, màu xanh đậm nhất. Filter phân cực làm sâu màu bằng cắt phản xạ bề mặt." }],
  "福岡県": [{ q: "Điểm chụp ảnh phải đến ở Fukuoka?", a: "Đường tiếp cận và đại sảnh Dazaifu Tenmangu, cùng hành lang cảnh đêm Tháp Fukuoka–Bãi biển Momochi–Bayside Place." }],
  "大分県": [{ q: "Bắt đường chân trời hơi nước Beppu ở đâu?", a: "Đài Yukemuri ở Kannawa Onsen. Sáng mùa đông tạo cột hơi dày nhất do tương phản nhiệt." }],
  "沖縄県": [
    { q: "Mùa tốt nhất cho Miyakojima?", a: "Tháng Năm-Chín cho độ trong của nước (đặc biệt tháng Bảy-Tám). Tháng Chín là mùa bão. Tháng Mười Hai-Hai mát và ít người nhưng hoạt động biển hạn chế." },
    { q: "Thời điểm trong ngày tốt nhất cho ảnh biển trong?", a: "10-14h, khi mặt trời cao và ánh sáng xuyên đến đáy biển, tạo xanh ngọc đậm nhất. Filter phân cực thiết yếu." }],
};

const LOC_FAQS = {
  "知床": [{ q: "Đến Shiretoko thế nào?", a: "Bay đến Memanbetsu; Utoro Onsen (2h xe buýt) là cổng. Tour băng trôi mùa đông, du thuyền và đi bộ Năm hồ mùa hè." }],
  "札幌": [{ q: "Thời điểm tốt nhất thăm trung tâm Sapporo?", a: "Tháng Hai (Lễ hội tuyết), tháng Sáu (Lễ hội Tử đinh hương), tháng Mười (lá), tháng Mười Hai (White Illumination). Thành phố thay đổi quanh năm." }],
  "さっぽろ雪まつり": [{ q: "Thời điểm tốt nhất chụp lễ hội?", a: "Đèn từ hoàng hôn đến 21h ấn tượng nhất — dùng chân máy và ISO thấp giữ kết cấu tuyết. Ban ngày hoạt động với trời xanh làm nền." }],
  "小樽": [{ q: "Vị trí chụp ảnh tốt nhất dọc kênh?", a: "Giữa cầu Asakusa và cầu Chuo — kho, kênh và đèn gas trong một khung. Giờ xanh sau hoàng hôn lý tưởng." }],
  "洞爺湖": [{ q: "Mẹo chụp pháo hoa?", a: "Chân máy bắt buộc. ISO 100, f/8, B 4-8 giây. Sàn quan sát hồ bắt pháo hoa với phản chiếu." }],
  "富良野": [{ q: "Thời điểm tốt nhất cho cánh đồng oải hương?", a: "Sáng sớm trước 7h cho ánh sáng dịu và ít người. Ánh sáng phía trước làm tím rực. Kiểm tra trạng thái nở trước." }],
  "宮古島": [{ q: "Mùa tốt nhất cho Miyakojima?", a: "Tháng Năm-Chín cho độ trong của nước (đặc biệt tháng Bảy-Tám). Tháng Chín mùa bão. Tháng Mười Hai-Hai mát và ít người." }],
  "沖縄": [{ q: "Điểm chụp ảnh phải đến trên đảo chính Okinawa?", a: "Phế tích lâu đài Shurijo, mũi Zanpa, Manzamo, cầu Kouri, thủy cung Churaumi, làng gốm Yachimun và Kokusai-dori." }],
  "横浜": [{ q: "Vị trí tốt nhất cho Minato Mirai?", a: "Osanbashi cho đường chân trời đầy đủ lúc hoàng hôn; Sakuragicho cho vòng đu quay; Yamashita-koen cho Kho gạch đỏ. Giờ xanh tối ưu." }],
  "鎌倉": [{ q: "Hoa cúc ở Hasedera khi nào?", a: "Khoảng 1-23 tháng Mười Một, với đèn buổi tối. Đến sớm để tránh xếp hàng." }],
  "伊勢神宮": [{ q: "Nghi thức chụp ảnh ở Ise Jingu?", a: "Khu vực bên trong nghiêm cấm. Thận trọng trong torii; không chụp tín đồ hoặc giáo sĩ." }],
  "夫婦岩": [{ q: "Mặt trời mọc giữa các tảng đá khi nào?", a: "Gần hạ chí (tháng Năm-Bảy). Đầu tháng Sáu có tỷ lệ trời quang tốt nhất. Đến trước bình minh." }],
  "おはらい町・おかげ横丁": [{ q: "Thời điểm tốt nhất chụp đường phố?", a: "Sáng 8-10h, trước làn sóng du khách. Ánh sáng bên trên nhà gỗ đẹp." }],
  "朝熊山展望台": [{ q: "Lên đài quan sát thế nào?", a: "Lái qua Ise-Shima Skyline (có phí). Tiếp cận dễ; có thể quan sát núi Phú Sĩ trong ngày trong (hiếm)." }],
  "横山展望台": [{ q: "Thời điểm tốt nhất cho Yokoyama?", a: "Sáng trong cho chi tiết các đảo trong vịnh Ago. Hoàng hôn cũng được; nền cao là tốt nhất." }],
  "清水寺": [{ q: "Đèn mùa thu khi nào?", a: "Giữa tháng Mười Một đến đầu tháng Mười Hai, 17:30-21h. Giờ xanh sau khi mở huyền ảo nhất. Cấm chân máy." }],
  "金閣寺": [{ q: "Thời điểm tốt nhất cho Kim Các Tự?", a: "Sáng đông trong với tuyết là biểu tượng; thu và phản chiếu trong ao cũng cổ điển. Đến lúc mở (9h)." }],
  "平等院鳳凰堂": [{ q: "Mẹo cho phản chiếu trong ao Aji?", a: "Sáng không gió cho mặt nước gương. Đến lúc mở (8:30); dùng phân cực nhẹ để giữ phản chiếu." }],
  "東福寺": [{ q: "Thời điểm tốt nhất cho cầu Tsutenkyo?", a: "Giữa tháng Mười Một đến đầu tháng Mười Hai. Mở 8:30; theo dòng một chiều từ phía bắc. Không dừng trên cầu." }],
  "東寺": [{ q: "Mẹo chụp tháp năm tầng?", a: "Ao Hyotan-ike lúc hoàng hôn cho phản chiếu. Đèn buổi tối trong mùa anh đào và mùa thu." }],
  "八坂の塔": [{ q: "Vị trí tốt nhất cho tháp Yasaka?", a: "Nhìn lên dốc Yasaka-dori từ dưới là góc cổ điển. 6-7h hầu như không có du khách — lý tưởng cho chân dung kimono." }],
  "姫路城": [{ q: "Thời điểm tốt nhất cho lâu đài với hoa anh đào?", a: "Thường đầu tháng Tư. Quảng trường Sannomaru, Vườn Nishi-no-maru và Công viên Tưởng niệm Shirotopia là cổ điển." }],
  "法隆寺": [{ q: "Quy tắc chụp ảnh?", a: "Khuôn viên OK; tượng Phật trong các sảnh chủ yếu cấm. Không chân máy hoặc đèn flash ngay cả ngoài trời. Sáng sớm và chiều muộn yên tĩnh và mềm hơn." }],
  "法隆寺 夢殿": [{ q: "Khi nào trưng bày Guze Kannon?", a: "Xuân: 11/4-18/5; thu: 22/10-22/11. Cấm chụp tượng." }],
  "鳴門海峡": [{ q: "Thuyền hay lối đi?", a: "Thuyền cho cường độ, lối đi cho an toàn từ trên cao. Sàn kính Uzu-no-Michi cho thấy xoáy nước bên dưới. Trên thuyền dự kiến có nước văng." }],
  "大鳴門橋": [{ q: "Vị trí tốt nhất cho cầu?", a: "Michi-no-Eki Uzushio bên Awaji cho cái nhìn tổng quan tốt nhất. Cầu và eo biển sáng lúc hoàng hôn rất đẹp." }],
  "父母ヶ浜": [{ q: "Đặt ngày tối ưu thế nào?", a: "Không đặt chỗ, nhưng Du lịch Mitoyo công bố «Sky Mirror Calendar» với ngày tối ưu. Lên kế hoạch cho ngày triều thấp và hoàng hôn trùng nhau." }],
  "亀老山展望台": [{ q: "Đến đó thế nào?", a: "Xe buýt Shimanami Kaido từ Imabari hoặc Fukuyama, hoặc xe đạp. Bãi đỗ gần đỉnh." }],
  "来島海峡大橋": [{ q: "Vị trí tốt nhất cho cầu?", a: "Đài quan sát núi Kiro (Oshima, Imabari) cho cái nhìn cuối cùng. Bắt cầu sáng cam lúc hoàng hôn và giờ xanh sau đó." }],
  "松山城": [{ q: "Cáp treo hay ghế nâng?", a: "Nếu thời tiết cho phép, ghế mở cho ngâm nhìn toàn cảnh tốt hơn (5 phút). Vé kết hợp bao gồm cả hai." }],
  "道後温泉": [{ q: "Có thể chụp Honkan không?", a: "Bên ngoài hoàn toàn mở; góc sau và đèn buổi tối được khuyên. Một số khu vực bên trong cấm vì quyền riêng tư." }],
  "桂浜": [{ q: "Góc tốt nhất cho tượng Ryoma?", a: "Từ góc thấp phía biển, leo cầu thang sau bệ — kết hợp Ryoma với Thái Bình Dương làm nền. Hoàng hôn cho bóng ấn tượng." }],
  "高知城": [{ q: "Mất bao lâu để leo lên?", a: "Khoảng 15 phút thang từ lối vào đến tháp. Cổng Otemon là khung cổ điển cho hoa anh đào. Đừng bỏ lỡ tầm nhìn thành phố từ tháp." }],
  "名越屋沈下橋": [{ q: "Mùa tốt nhất?", a: "Xanh tươi tháng Năm, bơi mùa hè (tháng 7-8), lá thu (tháng 10-11). Sáng đông với sương cũng như mơ." }],
  "にこ淵": [{ q: "Khi nào màu xanh đậm nhất?", a: "Giữa trưa trong (10-14h), đặc biệt hè đến đầu thu. Sau mưa, độ đục giảm hiệu ứng — thời tiết khô lý tưởng. Mang filter PL." }],
  "福岡": [{ q: "Nghi thức chụp ảnh tại yatai?", a: "Hỏi nhân viên/khách trước. Cận cảnh sau khi xin phép. Bên ngoài và đường phố tự do." }],
  "別府": [{ q: "Tour Địa ngục mất bao lâu?", a: "Cả 7 Địa ngục mất 2-3 giờ. Vé kết hợp tiết kiệm. Địa ngục Biển, Hồ Máu và Tatsumaki là top-3." }],
  "湯布院": [{ q: "Điều kiện cho sương sáng ở hồ Kinrin?", a: "Sáng trong tháng Mười Một-Ba dưới 5°C — chênh lệch nhiệt giữa nước suối nóng và không khí tạo sương. Dày nhất từ trước bình minh đến một giờ sau." }],
  "白川郷": [{ q: "Chụp từ đài quan sát?", a: "Đài Phế tích Lâu đài Ogimachi nhìn ra toàn ngôi làng — cổ điển. Sương thu-đông, tuyết tháng 1-2, xanh tháng Năm: mỗi cái là kiệt tác." }],
  "美幌峠": [{ q: "Khi nào xuất hiện biển mây?", a: "Sáng tháng Chín-Mười Một trong ngày quang không gió với chênh lệch nhiệt lớn. Đỉnh khoảng 30 phút quanh bình minh." }],
  "摩周湖": [{ q: "Khả năng nhìn thấy hồ?", a: "Tỷ lệ tầm nhìn năm ~30%. Hè đặc biệt sương; đông-xuân có độ trong tốt hơn. Thăm nhiều đài quan sát để tăng cơ hội." }],
  "阿寒": [{ q: "Có thể thấy marimo không?", a: "Tại Trung tâm Quan sát Marimo trên đảo Churui — tiếp cận bằng tàu du lịch." }],
  "三段滝公園": [{ q: "Khi nào thấy thác đóng băng?", a: "Chỉ giữa tháng Một đến cuối tháng Hai trong giá rét sâu. Đóng băng hoàn toàn, trở thành tác phẩm điêu khắc băng trắng-xanh." }],
  "室蘭": [{ q: "Vị trí tốt nhất cho cảnh đêm nhà máy?", a: "Đài Iwaizumi, núi Sokuryo và cầu Hakucho là ba cổ điển. Bắt cầu với đèn nhà máy trong giờ xanh." }],
  "美唄": [{ q: "Arte Piazza đặc biệt ở chỗ nào?", a: "Bảo tàng điêu khắc ngoài trời miễn phí trong trường được tái sử dụng. Tác phẩm đá hoa cương trắng, trường gỗ và tuyết cùng nhau trông như tranh." }],
  "登別": [{ q: "Thời điểm tốt nhất cho Jigokudani?", a: "Sáng cho ánh sáng dịu và hơi nước có thể nhìn thấy. Đèn buổi tối (tháng Năm-Mười) có không khí." }],
  "北竜町": [{ q: "Đỉnh nở khi nào?", a: "Thường tuần đầu đến ~10 tháng Tám. Khung cổ điển: toàn cánh đồng từ đài quan sát. Ánh sáng phía trước buổi sáng sống động nhất." }],
  "東京": [{ q: "Mẹo chụp đêm?", a: "Chân máy, ISO thấp và phơi sáng dài. Giờ xanh (30 phút sau hoàng hôn) cân bằng tốt nhất bầu trời và đèn thành phố." }],
  "品川": [{ q: "Điểm gần ga Shinagawa?", a: "Tầm nhìn Shinkansen từ cầu đi bộ phía Takanawa, các tòa nhà chọc trời phía Konan, hành lang kính của Shinagawa Intercity và cảnh đêm kênh ở Tennozu Isle." }],
  "東山動物園": [{ q: "Mẹo chụp động vật?", a: "Ống kính fixed nhanh (50mm f/1.8) làm mờ nền. Ép ống kính sát lưới để nó biến mất. Lấy nét vào mắt." }],
  "梅林公園": [{ q: "Đỉnh nở khi nào?", a: "Giữa tháng Hai đến đầu tháng Ba. Với giống nở sớm và muộn, cuối tháng Hai cho đa dạng nhất." }],
  "鳥羽水族館": [{ q: "Khi nào dugong hoạt động nhất?", a: "Quanh giờ cho ăn (khoảng 11h và 15h). Đôi khi bơi đến tận kính — khoảnh khắc quý." }],
  "清水寺周辺": [{ q: "Vị trí tốt nhất cho tháp Yasaka?", a: "Nhìn lên dốc Yasaka-dori từ dưới là góc cổ điển. 6-7h hầu như không có du khách — lý tưởng cho chân dung kimono." }],
  "鴨川シーワールド": [{ q: "Mẹo chụp cá voi sát thủ?", a: "Tốc độ màn trập 1/1000+ để đóng băng nước văng; chế độ liên tục thiết yếu. Hàng đầu bị ướt — chọn ghế cẩn thận." }],
  "旭山動物園": [{ q: "Lịch đi bộ chim cánh cụt?", a: "Hai lần mỗi ngày từ giữa tháng Mười Hai đến tháng Ba — chỉ mùa đông khi có tuyết. Diễu hành chim cánh cụt vua là cổ điển mùa đông." }],
  "金沢": [{ q: "Điểm chụp ảnh ở Kanazawa trong một ngày?", a: "Kenrokuen lúc bình minh (ánh sáng dịu), lâu đài Kanazawa, Higashi Chaya (chiều/tối), chợ Omicho, Cổng Trống ở ga Kanazawa lúc đêm." }],
  "新倉山浅間公園": [{ q: "Đến đài quan sát thế nào?", a: "Ga Shimo-Yoshida (tuyến Fujikyu), đi bộ 10 phút đến đền, sau đó 398 bậc (cũng có dốc nhẹ hơn). Đến 5-6h để tránh đám đông và bắt bình minh trên Phú Sĩ." }],
  "河口湖": [{ q: "Vị trí tốt nhất cho phản chiếu Phú Sĩ ngược?", a: "Công viên Oishi và Ubuyagasaki ở bờ bắc cổ điển. Nhắm vào sáng không gió 6-8h khi hồ phản chiếu. Đông cho không khí trong nhất và độ trong tốt nhất." }],
  "松本城": [{ q: "Cách khung tháp với hoa anh đào và Alps?", a: "Quanh cầu Uzumi phía tây bắc hào trong là tốt nhất. Telephoto để nén tháp và đỉnh Alps, với hoa anh đào giữa tháng Tư làm bokeh tiền cảnh. Sáng cho ngược sáng dịu." }],
  "高遠城址公園": [{ q: "Thời điểm trong ngày tốt nhất chụp hoa anh đào Takato?", a: "Trước 6h cho ánh sáng xanh không đám đông. Chiều chuyển qua giờ xanh đến đèn, nơi ánh đèn lồng ấm gặp hoa hồng." }],
  "駒つなぎの桜": [{ q: "Cần gì cho phản chiếu ruộng lúa?", a: "Giữa-cuối tháng Tư khi ruộng được ngập để cấy, vào bình minh không gió. Mang chân máy và ống kính rộng-tiêu chuẩn; cho sao+hoa, thân máy chịu ISO cao được khuyên." }],
  "長野県天空の楽園": [{ q: "Thời điểm tốt nhất trong năm để ngắm sao?", a: "Gần trăng non. Đông (tháng 11-2) cho sao sắc nét nhất (Dải Ngân Hà yếu hơn). Hè tốt nhất cho lõi Dải Ngân Hà. Tour đêm cần đặt trước." }],
  "弘法山古墳": [{ q: "Đến và chụp ở đâu?", a: "Từ ga Matsumoto, ~20 phút xe buýt + ~20 phút đi bộ đến đường mòn, sau đó 15-20 phút lên đỉnh. Bình minh cho ngược sáng dịu trên Alps Bắc và tránh đám đông." }],
  "安養寺": [{ q: "Đỉnh nở khi nào?", a: "Giữa tháng Tư. Sáng cho màu hoa rực rỡ phía trước. Tối cho bóng ấn tượng của hội trường và cây. Khuôn viên yên tĩnh — chụp với sự tôn trọng." }],
  "松本市新村": [{ q: "Gần ga Niimura có gì?", a: "Ga gỗ Mitsumizo cũ, ruộng lúa với Alps, lối đi rợp anh đào, sương sáng trên ruộng — viên ngọc ẩn kết hợp đường sắt và phong cảnh." }],
  "城山公園(松本市)": [{ q: "Cách khung tốt nhất từ quảng trường quan sát?", a: "Khung dọc với hoa anh đào tiền cảnh và đỉnh Alps phía sau là cổ điển. «Alpenglow» buổi sáng (đỉnh tuyết chuyển đỏ lúc bình minh) với sakura là đỉnh tuyệt đối." }],
  "中町通り(松本市)": [{ q: "Thời điểm trong ngày tốt nhất để chụp?", a: "6-8h cho đường vắng và bố cục sạch của tường kura. Tối, khi đèn đường sáng và tường trắng ấm thành hổ phách, cho tâm trạng hoài niệm nhất." }],
  "高島公園(諏訪市)": [{ q: "Vị trí tốt nhất cho phản chiếu hào?", a: "Từ phía nam hào, dùng telephoto để nén tháp và hoa anh đào. Sáng hoặc tối không gió cho nước gương. Trong khi đèn, giờ xanh huyền ảo nhất." }],
  "諏訪湖": [{ q: "Điểm chụp tốt nhất quanh hồ Suwa?", a: "Công viên Tateishi (cảnh trên cao), đường dạo bên hồ (hồ + thành phố), khu Geyser Center (hoàng hôn), và bờ đông nơi Yatsugatake phản chiếu. Sống băng Omiwatari hình thành trong sáng tháng 1-2." }],
  "立石公園": [{ q: "Mẹo cho cảnh đêm và bầu trời sao?", a: "Chân máy thiết yếu. Cảnh đêm: ISO 200, f/8, 10-30 giây. Sao: ISO 3200, f/2.8, ~15 giây. 20-30 phút sau hoàng hôn (giờ kỳ diệu) cho gradient đẹp nhất giữa đèn thành phố và hoàng hôn." }],
};

let content = readFileSync(VI_PATH, "utf-8");
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
writeFileSync(VI_PATH, content, "utf-8");
console.log(`✓ vi.js updated: +${Object.keys(PREF_FAQS).length} prefectureFaqs, +${Object.keys(LOC_FAQS).length} locationFaqs`);
