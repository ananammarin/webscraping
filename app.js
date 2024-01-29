const express = require('express');
const axios = require('axios');
const puppeteer = require('puppeteer');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Function to translate a single string
async function translateText(text) {
    const urlTranslate = 'https://translate.googleapis.com/translate_a/single';
    const params = {
        client: 'gtx',
        sl: 'th',
        tl: 'en',
        dt: 't',
        q: text,
        ie: 'UTF-8',
        oe: 'UTF-8',
    };

    try {
        const response = await axios.get(urlTranslate, { params });

        // Check if the response structure is as expected
        if (response.data && response.data[0] && response.data[0][0]) {
            return response.data[0][0][0];
        } else {
            console.error('Unexpected response structure:', response.data);
            return '';
        }
    } catch (error) {
        console.error(`Translation error: ${error.message}`);
        return 'Translation error';
    }
}
// end Function to translate a single string

app.get('/runNode', async (req, res) => {
    try {
        const inputUrl = req.query.url;
        // Check if URL is provided
        if (!inputUrl) {
            return res.status(400).json({ message: 'URL is required' });
        }
        // Launch a headless browser with Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // ไปยัง URL ที่ต้องการดึงข้อมูล
        await page.goto(inputUrl);
        const timeoutMilliseconds = 5000;


        // Extract information from various elements on the page
        const title = await page.$eval('.text-title.main-name', element => element.textContent.trim());
        const address = await page.$eval('span.text-white.sub-name', element => element.textContent.trim());
        const addressParts = address.split(/:|,/);
        const subdistrict = addressParts[1].trim();
        const district = addressParts[2].trim();
        const province = addressParts[3].trim();
        const mapLink = await page.$eval('div#maplanddetail a', (link) => link.href);
        const [latitudePart, longitudePart] = mapLink.split(',');
        const latitude = latitudePart.replace('https://www.google.com/maps/dir//', '');
        const longitude = longitudePart;
        const type = await page.$eval('.table.table-border-top-0.border-0.w-auto tr:nth-child(2) .text-mapland.text-muted', element => element.textContent.trim());
        const size = await page.$eval('.table.table-border-top-0.border-0.w-auto tr:nth-child(3) .text-mapland.text-info', element => element.textContent.trim());
        const cleanedSize = size.replace(/-/g, '0');
        const matches = cleanedSize.match(/(\d+(\.\d+)?)\s*ไร่(?:\s*(\d+(\.\d+)?)\s*งาน)?(?:\s*(\d+(\.\d+)?)\s*ตรว)?/);
        const rai = matches?.[1] ?? 'N/A';
        const ngan = matches?.[3] ?? 'N/A';
        const squareWah = matches?.[5] ?? 'N/A';
        const priceData = await page.$eval('.table.table-border-top-0.border-0.w-auto tr:nth-child(4) .text-mapland.text-muted span.text-info', element => element.textContent.trim());
        const priceConvert = parseInt(priceData.replace(/[^\d]/g, ''), 10);
        const price = priceConvert;
        const cityPlan = await page.$eval('.display-planColor', element => element.textContent.trim());
        const yor = await page.$eval('.display-planCode', element => element.textContent.trim());
        const far = await page.$eval('#display-far', element => element.textContent.trim());
        const cityPlanProvince = await page.$eval('.container.mt-1.plan-name', element => element.textContent.trim());
        const widthData = await page.$eval('.table.table-border-top-0.border-0.w-auto tr:nth-child(8) .text-mapland.text-muted', element => element.textContent.trim());
        const widthWithoutUnit = widthData.replace(/เมตร/g, '').trim();
        const width = widthWithoutUnit;
        const roadWidthData = await page.$eval('.table.table-border-top-0.border-0.w-auto tr:nth-child(7) .text-mapland.text-muted', element => element.textContent.trim());
        const roadwidthWithoutUnit = roadWidthData.replace(/เมตร/g, '').trim();
        const roadWidth = roadwidthWithoutUnit;

        //Extract BuildingConstruct
        let noConstruction = '';
        let noConstructionUrl = '';
        try {
            await page.waitForSelector('.item-BuildingConstruct', { visible: true, timeout: timeoutMilliseconds });
            datanoConstruction = await page.$eval('.item-BuildingConstruct', element => element.textContent.trim());
            const noConstructionWithoutUnit = datanoConstruction.replace(/ดูเอกสารแนบ/g, '').trim();
            noConstruction = noConstructionWithoutUnit;
            noConstructionUrl = await page.$eval('.item-BuildingConstruct a', element => element.getAttribute('href'));
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.error(`ไม่พบ Element พื้นที่ห้ามก่อสร้าง ที่ต้องการในเวลาที่กำหนด (${timeoutMilliseconds} มิลลิวินาที)`);
            } else {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลพื้นที่ห้ามก่อสร้าง: ', error.message);
            }
        }

        //Extract futureCityPlan      
        let futureCityPlan = '';
        let yorfutureCityPlan = '';
        let faryorfutureCityPlan = '';
        let cityPlanProvincefuture = '';
        try {
            //display-planColor
            await page.waitForSelector('.nav-link.tabMapNav#tabMapNav2', { visible: true, timeout: timeoutMilliseconds });
            await page.click('.nav-link.tabMapNav#tabMapNav2');
            await page.waitForSelector('.display-planColor', { visible: true, timeout: timeoutMilliseconds });
            futureCityPlan = await page.$eval('.display-planColor', element => element.textContent.trim());
            //display-planCode
            await page.click('.nav-link.tabMapNav#tabMapNav2');
            await page.waitForSelector('.display-planColor', { visible: true, timeout: timeoutMilliseconds });
            yorfutureCityPlan = await page.$eval('.display-planCode', element => element.textContent.trim());
            //display-far
            await page.click('.nav-link.tabMapNav#tabMapNav2');
            await page.waitForSelector('.display-planColor', { visible: true, timeout: timeoutMilliseconds });
            faryorfutureCityPlan = await page.$eval('#display-far', element => element.textContent.trim());
            //plan-name
            await page.click('.nav-link.tabMapNav#tabMapNav2');
            await page.waitForSelector('.display-planColor', { visible: true, timeout: timeoutMilliseconds });
            cityPlanProvincefuture = await page.$eval('.container.mt-1.plan-name', element => element.textContent.trim());
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.error(`ไม่พบ Element (ผังเมืองอนาคต) ที่ต้องการในเวลาที่กำหนด (${timeoutMilliseconds} มิลลิวินาที)`);
            } else {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล (ผังเมืองอนาคต): ', error.message);
            }
        }

        //Extract Poi
        const pointsOfInterest = await page.evaluate(() => {
            const poiElements = document.querySelectorAll('#listPOI li');
            const limitedPoiElements = Array.from(poiElements).slice(0, 10);

            return limitedPoiElements.map((poi) => {
                const name = poi.querySelector('.text-muted:first-child').textContent.trim();
                const distance = poi.querySelector('.text-muted.ml-auto').textContent.trim();
                return `<li>${name} ${distance}`;
            });
        });



        //translate
        const translatedTitle = await translateText(title);
        const translatedSubdistrict = await translateText("ตำบล" + subdistrict);
        const translatedistrict = await translateText("อำเภอ" + district);
        const translateProvince = await translateText("จังหวัด" + province);
        const translatetype = await translateText(type);
        const translateCityPlan = await translateText(cityPlan);
        const translateCityPlanYor = await translateText("พื้นที่" + yor);
        const translateCityPlanProvince = await translateText(cityPlanProvince);
        const translatenoConstruction = await translateText(noConstruction);
        const translateFutureCityPlan = await translateText(futureCityPlan);
        const translateFutureyorfutureCityPlanEng = await translateText("พื้นที่" + yorfutureCityPlan);
        const translateFuturecityPlanProvince = await translateText(cityPlanProvincefuture);


        // Translate and display Poi
        const translatedPOIs = [];
        for (const poi of pointsOfInterest) {
            try {
                const translatedPoi = await translateText(poi);
                console.log(`แปลสถานที่ใกล้เคียง: ${translatedPoi}`);
                translatedPOIs.push(translatedPoi);
            } catch (error) {
                console.error(`Error แปลสถานที่ใกล้เคียง: ${error.message}`);
            }
        }
        const translatenearby = translatedPOIs.join('\n');


        // Check Empty noConstruction
        let pointsOfInteresttext = '';
        let pointsOfInteresttextEng = '';
        let noConstructionUrlEng = '';

        if (noConstruction === '') {
            noConstruction = '';
            pointsOfInteresttext = '<b>สถานที่ใกล้เคียง : </b><br>';
            pointsOfInteresttextEng = '<b>Nearby Place : </b><br>';
        } else {
            noConstruction = noConstruction;
            pointsOfInteresttext = '<br><br><b>สถานที่ใกล้เคียง : </b><br>';
            pointsOfInteresttextEng = '<br><br><b>Nearby Place : </b><br>';
        }

        // Check Empty noConstruction URL
        if (noConstructionUrl === '') {
            noConstructionUrl = '';
        }
        else {
            noConstructionUrlEng = '<a href="' + noConstructionUrl + '">Link</a>';
            noConstructionUrl = '<a href="' + noConstructionUrl + '">ข้อมูลเพิ่มเติม</a>';
        }

        // ปิด browser
        await browser.close();

        // ส่งผลลัพธ์กลับไปที่ index.html
        res.json({
            title: title,
            titleEng: translatedTitle.replace('sq m', 'sq.wah'),
            subdistrict: subdistrict,
            subdistrictEng: translatedSubdistrict.replace('Subdistrict', ''),
            district: district,
            districtEng: translatedistrict.replace('District', ''),
            province: province,
            provinceEng: translateProvince.replace('Province', ''),
            mapLink: mapLink,
            latitude: latitude,
            longitude: longitude,
            type: type,
            typeEng: translatetype,
            rai: rai,
            ngan: ngan,
            squareWah: squareWah,
            price: price,
            cityPlan: cityPlan.replace('-', ''),
            cityPlanEng: translateCityPlan.replace('-', ''),
            yor: yor.replace('-', ''),
            yorEng: translateCityPlanYor.replace('area-', ''),
            far: far.replace('-', ''),
            cityPlanProvince: cityPlanProvince.replace('-', ''),
            cityPlanProvinceEng: translateCityPlanProvince.replace('-', ''),
            futureCityPlan: futureCityPlan.replace('-', ''),
            futureCityPlanEng: translateFutureCityPlan.replace('-', ''),
            yorfutureCityPlan: yorfutureCityPlan.replace('-', ''),
            yorfutureCityPlanEng: translateFutureyorfutureCityPlanEng.replace('area', ''),
            faryorfutureCityPlan: faryorfutureCityPlan.replace('-', ''),
            cityPlanProvincefuture: cityPlanProvincefuture.replace('-', ''),
            cityPlanProvincefutureEng: translateFuturecityPlanProvince.replace('-', ''),
            width: width,
            roadWidth: roadWidth,
            noConstruction: noConstruction + noConstructionUrl,
            noConstructionEng: translatenoConstruction + noConstructionUrl,
            nearby: pointsOfInterest.join('\n'),
            nearbyEng: translatenearby,
            descriptionThai: noConstruction + noConstructionUrl + pointsOfInteresttext + pointsOfInterest.join('</li>'),
            descriptionEng: translatenoConstruction + noConstructionUrlEng + pointsOfInteresttextEng + translatenearby,
            message: `ดึงข้อมูลเรียบร้อยแล้ว`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'พบข้อผิดพลาดในการดึงข้อมูล (ส่งผลลัพธ์กลับไปที่ index.html)' });
    }
});

app.use(express.json()); // Middleware to parse JSON requests

app.post('/sendToSalesforce', async (req, res) => {
    try {
        const dataToSend = req.body;
        console.log('Received data:', dataToSend);

        // Salesforce authentication and data retrieval logic
        const loginUrl = 'https://login.salesforce.com/services/oauth2/token';
        const clientId = '3MVG95jctIhbyCpqEKkKxBKbNF.NNiOBDn.1Q7paDh59fga1Lwzso6UqwxFKLg7IHCTCFfJYTM5vOq6eWJbZL';
        const clientSecret = 'C18951B536167902CB8C56585B88FE886ABE28C744BA05BC2FDFF42166B2FDDE';
        const username = 'admin@onland459.com';
        const password = 'realist5541';

        const data = {
            grant_type: 'password',
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password
        };

        const response = await axios.post(loginUrl, new URLSearchParams(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Token:', response.data.access_token);
        const accessToken = response.data.access_token;

        const apiUrl = 'https://realistestate.my.salesforce.com/services/data/v55.0/sobjects/pba__Listing__c';

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const apiResponse = await axios.get(apiUrl, { headers });
        //console.log('API Response:', apiResponse.data);

        //POST API TO SALESFORCE
        const createRecordUrl = 'https://realistestate.my.salesforce.com/services/data/v55.0/sobjects/pba__Listing__c';

        // Use the access token to make a POST request to create a record
        const createResponse = await axios.post(createRecordUrl, dataToSend, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Record Created:', createResponse.data);

        // Store createResponse.data in app.locals
        app.locals.createResponseData = createResponse.data;

        // Respond to the original request
        res.status(200).sendFile(__dirname + '/public/index.html');

        // Respond to the original request with a JSON response
        res.status(200).json({
            success: true,
            message: 'ส่งข้อมูลสำเร็จ',
            recordData: createResponse.data  // Include the record data in the response
        });

    } catch (error) {
        console.error('Error ไม่สามารถส่งข้อมูลไป Salesforce ได้', error);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});


