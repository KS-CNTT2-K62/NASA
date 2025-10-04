const express = require('express');
const axios = require('axios');
const Papa = require('papaparse');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Cho phép React app (chạy ở cổng khác) gọi đến server này

const PHENOCAM_API_BASE_URL = "https://phenocam.nau.edu/api/";

// API để lấy dữ liệu chữ ký phổ ĐÃ ĐƯỢC XỬ LÝ
app.get('/api/spectral_signatures', async (req, res) => {
    console.log("Backend nhận yêu cầu lấy chữ ký phổ...");
    try {
        const roilistUrl = `${PHENOCAM_API_BASE_URL}roilists/?limit=150&format=json`;
        const roilistResponse = await axios.get(roilistUrl, { timeout: 20000 });
        const allRois = roilistResponse.data.results;
        const validRois = allRois.filter(roi => roi.roi_stats_file);
        
        if (validRois.length < 3) {
            return res.status(500).json({ error: "Không tìm đủ ROI hợp lệ từ PhenoCam." });
        }
        
        const roisToTry = validRois.sort(() => 0.5 - Math.random()).slice(0, 20);
        const spectralData = [];
        
        for (const roi of roisToTry) {
            if (spectralData.length >= 3) break;
            try {
                const csvUrl = roi.roi_stats_file;
                const csvResponse = await axios.get(csvUrl, { timeout: 30000 });
                
                const parseResult = Papa.parse(csvResponse.data, {
                    header: true,
                    comments: '#',
                    dynamicTyping: true,
                    skipEmptyLines: true
                });
                
                if (parseResult.errors.length > 0 || parseResult.data.length === 0) {
                    console.warn(`Bỏ qua ROI ${roi.roi_name}: Lỗi parse hoặc không có dữ liệu.`);
                    continue;
                }
                
                const df = parseResult.data.filter(r => r.date && r.gcc != null && r.rcc != null);
                if (df.length === 0) continue;
                
                const randomDayData = df[Math.floor(Math.random() * df.length)];
                const bcc = 1 - randomDayData.gcc - randomDayData.rcc;
                const metrics = { gcc_90: randomDayData.gcc, rcc_90: randomDayData.rcc, bcc_90: bcc };
                
                spectralData.push({
                    name: `${roi.site} (${roi.roitype})`,
                    date: randomDayData.date,
                    metrics: metrics
                });
                console.log(`-> Xử lý thành công ROI: ${roi.roi_name}.`);
            } catch (e) {
                console.error(`Lỗi khi xử lý ROI ${roi.roi_name}: ${e.message}`);
            }
        }
        
        if (spectralData.length < 3) {
            return res.status(500).json({ error: `Chỉ tìm thấy ${spectralData.length}/3 ROI hợp lệ sau khi đã thử.` });
        }

        res.json({
            wavelength_labels: ['Kênh Xanh Lá (GCC)', 'Kênh Đỏ (RCC)', 'Kênh Xanh Dương (BCC)'],
            spectral_signatures: spectralData
        });

    } catch (error) {
        console.error("Lỗi nghiêm trọng tại backend:", error.message);
        res.status(500).json({ error: `Lỗi server backend: ${error.message}` });
    }
});

// API để lấy URL của một ảnh ngẫu nhiên
app.get('/api/random_image', async (req, res) => {
    console.log("Backend nhận yêu cầu lấy ảnh ngẫu nhiên...");
    try {
        const url = `${PHENOCAM_API_BASE_URL}middayimages/?limit=150&format=json`;
        const response = await axios.get(url, { timeout: 20000 });
        const images = response.data.results || [];
        
        if (images.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy ảnh nào từ API PhenoCam." });
        }
        
        const rgbImages = images.filter(img => img.imgpath && !img.imgpath.includes('_IR_'));
        const selectedImage = rgbImages.length > 0
            ? rgbImages[Math.floor(Math.random() * rgbImages.length)]
            : images[Math.floor(Math.random() * images.length)];

        const fullImageUrl = `https://phenocam.nau.edu${selectedImage.imgpath}`;
        
        console.log(` -> Gửi về URL ảnh: ${fullImageUrl}`);
        res.json({ url: fullImageUrl });

    } catch (error) {
        console.error("Lỗi khi lấy ảnh ngẫu nhiên tại backend:", error.message);
        res.status(500).json({ error: `Lỗi server backend: ${error.message}` });
    }
});

// API hoạt động như một proxy cho file ảnh để tránh lỗi CORS trên canvas
app.get('/api/image_proxy', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }

    try {
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);

    } catch (error) {
        console.error("Lỗi khi proxy ảnh:", error.message);
        res.status(502).send('Failed to fetch image');
    }
});


app.listen(port, () => {
    console.log(`✅ Server backend đang chạy tại http://localhost:${port}`);
});