// src/locationDetails.js

// Import hình ảnh mẫu (đảm bảo bạn đã có các file này trong src/assets)
import antelopeValleyFlowers from '../../assets/chuong5/poppy_reserve_flowers.jpg';
import carrizoPlainFlowers from '../../assets/chuong5/carrizo_plain_flowers.jpg';
import chinoHillsFlowers from '../../assets/chuong5/chino_hills_flowers.jpg';
import anzaBorregoFlowers from '../../assets/chuong5/anza_flowers.jpg';
import sunflowerField from '../../assets/chuong5/sun_flower.jpg';

// Thêm các hình ảnh minh họa chung nếu cần
import genericBlueFlower from '../../assets/chuong5/blue_flower.jpg';
import genericOrangeFlower from '../../assets/chuong5/orange_flower.jpg';
import genericRedFlower from '../../assets/chuong5/red_flower.jpg';


export const locationDetails = {
  "Antelope Valley California Poppy Reserve": {
    flowers: "Owl’s clovers, cream cups, và Anh túc California (California poppy).",
    transport: "Chủ yếu đi bộ trên các con đường mòn được quy định sẵn để bảo vệ hoa.",
    activities: "Tham gia các tour tham quan có hướng dẫn viên, chụp ảnh phong cảnh và tìm hiểu về hệ sinh thái hoa dại.",
    imageUrl: antelopeValleyFlowers // Thêm đường dẫn ảnh
  },
  "Carrizo Plain National Monument": {
    flowers: "Orange fiddlenecks, goldfields, và Anh túc California.",
    transport: "Nên sử dụng xe 4WD (xe hai cầu) để di chuyển trên các con đường đất. Một số khu vực có thể đi bộ.",
    activities: "Cắm trại dưới bầu trời đầy sao, chụp ảnh superbloom trên diện rộng, đi bộ đường dài và quan sát động vật hoang dã.",
    imageUrl: carrizoPlainFlowers // Thêm đường dẫn ảnh
  },
  "Chino Hills": {
    flowers: "Anh túc California (California poppy) và nhiều loại hoa dại khác.",
    transport: "Lý tưởng cho xe đạp địa hình và đi bộ. Có nhiều đường mòn với các cấp độ khác nhau.",
    activities: "Dã ngoại cùng gia đình, đạp xe khám phá, đi bộ và tận hưởng không khí trong lành.",
    imageUrl: chinoHillsFlowers // Thêm đường dẫn ảnh
  },
  "Anza-Borrego Desert State Park": {
    flowers: "Hoa sa mạc đa dạng, bao gồm cả Anh túc California.",
    transport: "Kết hợp giữa xe 4WD cho các vùng sâu và đi bộ trên các cung đường mòn sa mạc.",
    activities: "Ngắm sao vào ban đêm (bầu trời rất trong), tìm hiểu về hệ sinh thái sa mạc, khám phá các khe núi.",
    imageUrl: anzaBorregoFlowers // Thêm đường dẫn ảnh
  },
  "Montaña de Oro State Park": {
    flowers: "Nhiều loài hoa dại ven biển đặc trưng của California.",
    transport: "Đi bộ đường dài, đạp xe trên các tuyến đường mòn. Có thể lái xe đến một số khu vực.",
    activities: "Ngắm cảnh đại dương, đi bộ dọc bờ biển, dã ngoại và chụp ảnh hoàng hôn.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "Figueroa Mountain": {
    flowers: "Rất nhiều loài hoa dại, bao gồm Anh túc California và lupine.",
    transport: "Đường đồi núi, chủ yếu là lái xe và đi bộ. Một số đoạn cần xe 4WD.",
    activities: "Ngắm hoa vào mùa xuân, đi bộ đường dài, cắm trại và ngắm cảnh toàn khu vực.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "Red Hills Recreational Managment Area": {
    flowers: "Hoa dại sa mạc và đồi núi, bao gồm fiddlenecks và goldfields.",
    transport: "Chủ yếu lái xe trên đường đất và đi bộ trên các đường mòn.",
    activities: "Khám phá địa chất độc đáo, tìm hiểu về lịch sử khai thác vàng và ngắm hoa dại.",
    imageUrl: genericRedFlower // Ảnh minh họa chung
  },
  "Jepson Prairie Preserve": {
    flowers: "Các loài hoa dại đồng cỏ vernal pool hiếm gặp.",
    transport: "Đi bộ trên các đường mòn được quy định sẵn.",
    activities: "Tham gia các tour có hướng dẫn viên để tìm hiểu về hệ sinh thái vernal pool.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "Bear Valley Wildflower": {
    flowers: "Nhiều loài hoa dại núi rừng và đồng cỏ.",
    transport: "Đi bộ hoặc lái xe trên các con đường nông thôn.",
    activities: "Ngắm hoa dại, dã ngoại và thư giãn giữa thiên nhiên.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "North Table Mountain Ecological Reserve": {
    flowers: "Nhiều loài hoa dại trên cao nguyên đá bazan, bao gồm buttercups và poppies.",
    transport: "Đi bộ trên các đường mòn.",
    activities: "Ngắm thác nước nhỏ vào mùa mưa, chụp ảnh hoa dại và phong cảnh độc đáo.",
    imageUrl: genericRedFlower // Ảnh minh họa chung
  },
  "Channel Islands National Park": {
    flowers: "Các loài hoa dại đặc hữu của đảo, bao gồm Island Mallow.",
    transport: "Đi thuyền đến đảo, sau đó đi bộ trên các đường mòn.",
    activities: "Quan sát chim biển, cá voi (mùa), lặn biển, đi bộ đường dài và cắm trại.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "Black Canyon City": {
    flowers: "Hoa dại sa mạc Arizona, bao gồm chollas và ocotillo.",
    transport: "Lái xe qua đường cao tốc và khám phá các con đường địa phương.",
    activities: "Đi bộ đường dài, quan sát động vật hoang dã sa mạc và khám phá cảnh quan đá.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "Suguaro Lake": {
    flowers: "Cây xương rồng Saguaro nở hoa và các loài hoa dại ven hồ.",
    transport: "Lái xe, đi thuyền trên hồ.",
    activities: "Đi thuyền, câu cá, chèo thuyền kayak và ngắm cảnh hồ.",
    imageUrl: genericRedFlower // Ảnh minh họa chung
  },
  "San Carlos Reservation": {
    flowers: "Hoa dại sa mạc và núi rừng trong khu bảo tồn.",
    transport: "Di chuyển bằng xe cơ giới trên các tuyến đường quy định.",
    activities: "Tìm hiểu văn hóa thổ dân, đi bộ đường dài và quan sát thiên nhiên.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "Golden Valley": {
    flowers: "Hoa dại sa mạc phong phú, bao gồm brittlebush và desert marigold.",
    transport: "Lái xe trên các tuyến đường chính và đường đất.",
    activities: "Khám phá phong cảnh sa mạc rộng lớn, chụp ảnh và tìm hiểu về hệ thực vật khô hạn.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "Estrella Mountain Regional Park": {
    flowers: "Hoa dại sa mạc nở rộ sau mưa.",
    transport: "Lái xe đến công viên và đi bộ trên các đường mòn.",
    activities: "Đi bộ đường dài, đạp xe, cưỡi ngựa và dã ngoại.",
    imageUrl: genericRedFlower // Ảnh minh họa chung
  },
  "Picacho Peak State Park": {
    flowers: "Hàng ngàn cây xương rồng Saguaro nở hoa và hoa dại sa mạc khác.",
    transport: "Lái xe đến chân núi và đi bộ lên đỉnh.",
    activities: "Đi bộ đường dài lên đỉnh Picacho Peak để ngắm cảnh, dã ngoại.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "South Mountain Park and Preserve": {
    flowers: "Hoa dại sa mạc và cây xanh của dãy núi South Mountain.",
    transport: "Lái xe lên núi và đi bộ trên các đường mòn.",
    activities: "Ngắm cảnh thành phố Phoenix từ trên cao, đi bộ đường dài và đạp xe.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "Gold Butte National Monument": {
    flowers: "Hoa dại sa mạc đa dạng, bao gồm hoa xương rồng.",
    transport: "Cần xe 4WD cho hầu hết các khu vực. Đường không trải nhựa.",
    activities: "Khám phá các địa điểm khảo cổ, phong cảnh đá đỏ và quan sát động vật hoang dã.",
    imageUrl: genericRedFlower // Ảnh minh họa chung
  },
  "Lompoc Flower Fields": {
    flowers: "Những cánh đồng hoa được trồng quy mô lớn, với nhiều màu sắc rực rỡ (thường là larkspurs, delphiniums).",
    transport: "Dễ dàng tiếp cận bằng ô tô, có khu vực đậu xe.",
    activities: "Chụp ảnh phong cảnh hoa, mua hoa tươi và tham quan các vườn ươm.",
    imageUrl: genericBlueFlower // Ảnh minh họa chung
  },
  "Carlsbad Ranch": {
    flowers: "Cánh đồng hoa Ranunculus (hoa Mao Lương) nổi tiếng với hàng triệu bông hoa màu sắc.",
    transport: "Dễ dàng tiếp cận bằng ô tô, có khu vực đậu xe.",
    activities: "Chụp ảnh, tham quan vườn hoa, mua hoa và các sản phẩm liên quan.",
    imageUrl: genericOrangeFlower // Ảnh minh họa chung
  },
  "Yolo sunflowers": {
    flowers: "Những cánh đồng hoa hướng dương khổng lồ nở rộ.",
    transport: "Chủ yếu lái xe dọc theo các con đường nông thôn để ngắm hoa.",
    activities: "Chụp ảnh, ngắm cảnh hoàng hôn trên cánh đồng hoa hướng dương.",
    imageUrl: sunflowerField // Ảnh minh họa chung
  }
};