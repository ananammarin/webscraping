// Translate
async function translateText(text, targetElementId) {
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
    if (response.data && response.data[0] && response.data[0][0]) {
      document.getElementById(targetElementId).value = response.data[0][0][0];
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error(`Translation error: ${error.message}`);
  }
}

// translate input
document.getElementById('roadName').addEventListener('input', async function () {
  const roadName = this.value;
  await translateText(roadName, 'roadNameEng');
});

document.getElementById('soiName').addEventListener('input', async function () {
  const soiName = this.value;
  await translateText(soiName, 'soiNameEng');
});

document.getElementById('tranfer').addEventListener('input', async function () {
  const tranfer = this.value;
  await translateText(tranfer, 'tranferEng');
});

document.getElementById('title').addEventListener('input', async function () {
  const title = this.value;
  await translateText(title, 'titleEng');
});

document.getElementById('subdistrict').addEventListener('input', async function () {
  const subdistrict = this.value;
  await translateText(subdistrict, 'subdistrictEng');
});

document.getElementById('district').addEventListener('input', async function () {
  const district = this.value;
  await translateText(district, 'districtEng');
});

document.getElementById('province').addEventListener('input', async function () {
  const province = this.value;
  await translateText(province, 'provinceEng');
});

document.getElementById('cityPlan').addEventListener('input', async function () {
  const cityPlan = this.value;
  await translateText(cityPlan, 'cityPlanEng');
});

document.getElementById('cityPlanProvince').addEventListener('input', async function () {
  const cityPlanProvince = this.value;
  await translateText(cityPlanProvince, 'cityPlanProvinceEng');
});

document.getElementById('futureCityPlan').addEventListener('input', async function () {
  const futureCityPlan = this.value;
  await translateText(futureCityPlan, 'futureCityPlanEng');
});


document.getElementById('cityPlanProvincefuture').addEventListener('input', async function () {
  const cityPlanProvincefuture = this.value;
  await translateText(cityPlanProvincefuture, 'cityPlanProvincefutureEng');
});

document.getElementById('noConstruction').addEventListener('input', async function () {
  const noConstruction = this.value;
  await translateText(noConstruction, 'noConstructionEng');
});

// End Transalte


//Road Update 
function updateRoadStatus() {
  var selectElement = document.getElementById("roadStatus");
  var inputValueElement = document.getElementById("roadStatusEng");

  var selectedValue = selectElement.value;
  var roadStatusEng = "";

  switch (selectedValue) {
    case "-":
      roadStatusEng = "";
      break;
    case "ถนนสาธารณะประโยชน์":
      roadStatusEng = "Public Road";
      break;
    case "ถนนสาธารณะประโยชน์ตลอดแนว":
      roadStatusEng = "Public Road";
      break;
    case "ทางสาธารณะประโยชน์":
      roadStatusEng = "Public Road";
      break;
    case "ทางสาธารณะประโยชน์ตลอดแนว":
      roadStatusEng = "Public Road";
      break;
    case "ทางเป็นเลขที่ดิน":
      roadStatusEng = "Private Road";
      break;
    case "ทางเป็นเลขที่ดินตลอดแนว":
      roadStatusEng = "Private Road";
      break;
    case "เลขที่ดินตลอดแนว":
      roadStatusEng = "Private Road";
      break;
    case "ทางภาระจำยอม":
      roadStatusEng = "Servitude Raod";
      break;
    case "รอตรวจสอบ":
      roadStatusEng = "Wait For Confirmation";
      break;
    default:
      roadStatusEng = "";
      break;
  }

  inputValueElement.value = roadStatusEng;
}
//End Road Update 

//สำหรับอัปเดตค่า Land_and_building_conditionsEng
function updateLandCondition() {
  var selectElement = document.getElementById("Land_and_building_conditions");
  var inputValueElement = document.getElementById("Land_and_building_conditionsEng");

  var selectedValue = selectElement.value;
  var landConditionEng = "";

  switch (selectedValue) {
    case "ถมแล้วระดับถนน ไม่มีสิ่งปลูกสร้าง":
      landConditionEng = "Vacant Land";
      break;
    case "ถมแล้วระดับถนน มีสิ่งปลูกสร้าง":
      landConditionEng = "Land With Building";
      break;
    case "ยังไม่ถม ต่ำกว่าระดับถนน ไม่มีสิ่งปลูกสร้าง":
      landConditionEng = "Vacant Land";
      break;
    case "ยังไม่ถม ต่ำกว่าระดับถนน มีสิ่งปลูกสร้าง":
      landConditionEng = "Land With Building";
      break;
    case "ยังไม่ถมต่ำกว่าระดับถนน ลักษณะคล้ายป่าชายเลน":
      landConditionEng = "Vacant Land";
      break;
    case "ยังไม่ถมต่ำว่าระดับถนน เป็นบ่อ รอวัดความลึก":
      landConditionEng = "Vacant Land";
      break;
    default:
      landConditionEng = "";
      break;
  }

  inputValueElement.value = landConditionEng;
}
//End สำหรับอัปเดตค่า Land_and_building_conditionsEng


//อัปเดต สัญญาเช่าในที่ดิน
function updateTenantEng() {
  var tenantDropdown = document.getElementById("tenant");
  var tenantEngInput = document.getElementById("tenantEng");

  switch (tenantDropdown.value) {
    case "รอตรวจสอบ":
      tenantEngInput.value = "Wait For Confirmation";
      break;
    case "มีสัญญาเช่าในที่ดิน":
      tenantEngInput.value = "Land lease agreement";
      break;
    case "ไม่มี":
      tenantEngInput.value = "Not attached to the land lease contract";
      break;
    default:
      tenantEngInput.value = "";
      break;
  }
}
//End อัปเดต สัญญาเช่าในที่ดิน

//Quill Text List
var quill1 = new Quill('#descriptionThai', {
  theme: 'snow'
});
var htmlContent = quill1.root.innerHTML;
console.log(htmlContent);

var quill2 = new Quill('#descriptionEng', {
  theme: 'snow'
});
var htmlContent = quill2.root.innerHTML;
console.log(htmlContent);
//Quill


//runnode Click
document.getElementById('runNode').addEventListener('click', async () => {
  // Reset the output and loading indicator
  document.getElementById('output').innerText = '';
  document.getElementById('loadingIndicator').style.display = 'block';

  try {
    // Get the URL value from the input
    const inputUrl = document.getElementById('urlInput').value;
    // Send the URL value to the server
    const response = await fetch(`/runNode?url=${encodeURIComponent(inputUrl)}`);
    const data = await response.json();

    // Check and update values only if the properties exist
    if (data.title) {
      document.getElementById('title').value = data.title.substring(0, 80);
    }
    if (data.titleEng) {
      document.getElementById('titleEng').value = data.titleEng.substring(0, 70);
    }
    if (data.subdistrict) {
      document.getElementById('subdistrict').value = data.subdistrict;
    }
    if (data.subdistrictEng) {
      document.getElementById('subdistrictEng').value = data.subdistrictEng;
    }
    if (data.district) {
      document.getElementById('district').value = data.district;
    }
    if (data.districtEng) {
      document.getElementById('districtEng').value = data.districtEng;
    }
    if (data.province) {
      document.getElementById('province').value = data.province;
    }
    if (data.provinceEng) {
      document.getElementById('provinceEng').value = data.provinceEng;
    }
    if (data.mapLink) {
      document.getElementById('mapLink').value = data.mapLink;
    }
    if (data.latitude) {
      document.getElementById('latitude').value = data.latitude;
    }
    if (data.longitude) {
      document.getElementById('longitude').value = data.longitude;
    }
    if (data.rai) {
      document.getElementById('rai').value = data.rai;
    }
    if (data.ngan) {
      document.getElementById('ngan').value = data.ngan;
    }
    if (data.squareWah) {
      document.getElementById('squareWah').value = data.squareWah;
    }
    if (data.price) {
      document.getElementById('price').value = data.price;
    }
    if (data.cityPlan) {
      document.getElementById('cityPlan').value = data.cityPlan;
    }
    if (data.cityPlanEng) {
      document.getElementById('cityPlanEng').value = data.cityPlanEng;
    }
    if (data.yor) {
      document.getElementById('yor').value = data.yor;
    }
    if (data.yorEng) {
      document.getElementById('yorEng').value = data.yorEng;
    }
    if (data.far) {
      document.getElementById('far').value = data.far;
    }
    if (data.cityPlanProvince) {
      document.getElementById('cityPlanProvince').value = data.cityPlanProvince;
    }
    if (data.cityPlanProvinceEng) {
      document.getElementById('cityPlanProvinceEng').value = data.cityPlanProvinceEng;
    }
    if (data.futureCityPlan) {
      document.getElementById('futureCityPlan').value = data.futureCityPlan;
    }
    if (data.futureCityPlanEng) {
      document.getElementById('futureCityPlanEng').value = data.futureCityPlanEng;
    }
    if (data.yorfutureCityPlan) {
      document.getElementById('yorfutureCityPlan').value = data.yorfutureCityPlan;
    }
    if (data.yorfutureCityPlanEng) {
      document.getElementById('yorfutureCityPlanEng').value = data.yorfutureCityPlanEng;
    }
    if (data.faryorfutureCityPlan) {
      document.getElementById('faryorfutureCityPlan').value = data.faryorfutureCityPlan;
    }
    if (data.cityPlanProvincefuture) {
      document.getElementById('cityPlanProvincefuture').value = data.cityPlanProvincefuture;
    }
    if (data.cityPlanProvincefutureEng) {
      document.getElementById('cityPlanProvincefutureEng').value = data.cityPlanProvincefutureEng;
    }
    if (data.width) {
      document.getElementById('width').value = data.width;
    }
    if (data.roadWidth) {
      document.getElementById('roadWidth').value = data.roadWidth;
    }
    if (data.noConstruction) {
      document.getElementById('noConstruction').value = data.noConstruction;
    }
    if (data.noConstructionEng) {
      document.getElementById('noConstructionEng').value = data.noConstructionEng;
    }
    if (data.nearby) {
      document.getElementById('nearby').value = data.nearby.replace(/<li>/g, '');
    }
    if (data.nearbyEng) {
      document.getElementById('nearbyEng').value = data.nearbyEng.replace(/<li>/g, '');
    }
    if (data.descriptionThai) {
      document.getElementById('descriptionThai').innerHTML = data.descriptionThai;
    }
    if (data.descriptionEng) {
      document.getElementById('descriptionEng').innerHTML = data.descriptionEng;
    }
    // Continue with other properties...

    // Display the result from the received Node.js code
    document.getElementById('output').innerText = data.message;
  } catch (error) {
    // Handle errors here, for example, display an error message
    console.error('Error during fetching:', error);
    document.getElementById('output').innerText = 'An error occurred during scraping.';
  } finally {
    // Hide loading indicator, whether the request was successful or not
    document.getElementById('loadingIndicator').style.display = 'none';
  }
});



function validateForm() {
  var propertyType = document.getElementById('PropertyType').value;
  var agent = document.getElementById('agent').value;
  var listing_type = document.getElementById('listing_type').value;

  if (listing_type === '') {
    alert('โปรดเลือก ประเภทเร็คคอร์ด Salesforce');
    return false;
  }
  if (propertyType === '') {
    alert('โปรดเลือก ประเภทอสังหาฯ');
    return false;
  }

  if (agent === '') {
    alert('โปรดเลือก เอเจนท์');
    return false;
  }

  return true; // Form is valid
}


//data Send to Salesforce
document.getElementById('sendToSalesforce').addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  if (validateForm()) {

    var descriptionThaiContent = document.getElementById('descriptionThai').innerHTML;
    var descriptionEngContent = document.getElementById('descriptionEng').innerHTML;

    // ดึงค่า roadWidth จากอิลิเมนต์ที่มี ID เป็น 'roadWidth'
    const roadWidthInput = document.getElementById('roadWidth');
    const roadWidthValue = parseFloat(roadWidthInput.value);
    let roadWidthConvert;

    if (roadWidthInput.value === "") {
      roadWidthConvert = "";
    } else if (roadWidthValue <= 6) {
      roadWidthConvert = roadWidthValue;
    } else if (roadWidthValue <= 10) {
      roadWidthConvert = ">6";
    } else if (roadWidthValue <= 20) {
      roadWidthConvert = ">10";
    } else if (roadWidthValue <= 30) {
      roadWidthConvert = ">20";
    } else if (roadWidthValue <= 40) {
      roadWidthConvert = ">30";
    } else if (roadWidthValue <= 50) {
      roadWidthConvert = ">40";
    } else if (roadWidthValue <= 80) {
      roadWidthConvert = ">50";
    } else if (roadWidthValue <= 100) {
      roadWidthConvert = ">80";
    } else if (roadWidthValue <= 200) {
      roadWidthConvert = ">100";
    } else if (roadWidthValue <= 300) {
      roadWidthConvert = ">200";
    } else if (roadWidthValue <= 400) {
      roadWidthConvert = ">300";
    } else if (roadWidthValue <= 500) {
      roadWidthConvert = ">400";
    } else if (roadWidthValue <= 1000) {
      roadWidthConvert = ">500";
    } else {
      roadWidthConvert = ">1000";
    }

    /// เช็คค่าว่างผังเมือง
    var convertCityPlan = "";
    var cityPlanValue = document.getElementById('cityPlan').value;
    var yorValue = document.getElementById('yor').value;
    var farValue = document.getElementById('far').value;

    // ตรวจสอบว่าทั้ง 3 ตัวแปรมีค่าว่างหรือไม่
    if (cityPlanValue === "" && yorValue === "" && farValue === "") {
      convertCityPlan = ""; // ถ้าทั้ง 3 ตัวแปรเป็นค่าว่าง
    } else {
      convertCityPlan = ""; // ตั้งค่าเริ่มต้นเป็นว่าง

      // ตรวจสอบแต่ละตัวแปร
      if (cityPlanValue !== "") {
        convertCityPlan += cityPlanValue;
      }
      if (yorValue !== "") {
        if (convertCityPlan !== "") {
          convertCityPlan += ' ';
        }
        convertCityPlan += yorValue;
      }
      if (farValue !== "") {
        if (convertCityPlan !== "") {
          convertCityPlan += ' FAR ' + farValue + ' : 1 ';
        }
      }
    }

    // เช็คค่าว่างผังเมือง Eng
    var cityPlanEngValue = document.getElementById('cityPlanEng').value;
    var yorEngValue = document.getElementById('yorEng').value;
    var farValue = document.getElementById('far').value;
    var cityPlanProvinceEngValue = document.getElementById('cityPlanProvinceEng').value;

    // ตรวจสอบว่าทั้ง 4 ตัวแปรมีค่าว่างหรือไม่
    if (cityPlanEngValue === "" && yorEngValue === "" && farValue === "" && cityPlanProvinceEngValue === "") {
      convertCityPlanEng = ""; // ถ้าทั้ง 4 ตัวแปรเป็นค่าว่าง
    } else {
      convertCityPlanEng = ""; // ตั้งค่าเริ่มต้นเป็นว่าง

      // ตรวจสอบแต่ละตัวแปร
      if (cityPlanEngValue !== "") {
        convertCityPlanEng += cityPlanEngValue;
      }
      if (yorEngValue !== "") {
        if (convertCityPlanEng !== "") {
          convertCityPlanEng += ' ';
        }
        convertCityPlanEng += yorEngValue;
      }
      if (farValue !== "") {
        if (convertCityPlanEng !== "") {
          convertCityPlanEng += ' FAR ' + farValue + ' : 1 ';
        }
      }
      if (cityPlanProvinceEngValue !== "") {
        if (convertCityPlanEng !== "") {
          convertCityPlanEng += ' ' + cityPlanProvinceEngValue;
        }
      }
    }


    // เช็คค่าว่าง ผังเมืองอนาคต
    var futureCityPlanValue = document.getElementById('futureCityPlan').value;
    var yorfutureCityPlanValue = document.getElementById('yorfutureCityPlan').value;
    var faryorfutureCityPlanValue = document.getElementById('faryorfutureCityPlan').value;
    var cityPlanProvincefutureValue = document.getElementById('cityPlanProvincefuture').value;

    // ตรวจสอบว่าทั้ง 4 ตัวแปรมีค่าว่างหรือไม่
    if (futureCityPlanValue === "" && yorfutureCityPlanValue === "" && faryorfutureCityPlanValue === "" && cityPlanProvincefutureValue === "") {
      convertFutureCityPlan = ""; // ถ้าทั้ง 4 ตัวแปรเป็นค่าว่าง
    } else {
      convertFutureCityPlan = ""; // ตั้งค่าเริ่มต้นเป็นว่าง

      // ตรวจสอบแต่ละตัวแปร
      if (futureCityPlanValue !== "") {
        convertFutureCityPlan += futureCityPlanValue;
      }
      if (yorfutureCityPlanValue !== "") {
        if (convertFutureCityPlan !== "") {
          convertFutureCityPlan += ' ';
        }
        convertFutureCityPlan += yorfutureCityPlanValue;
      }
      if (faryorfutureCityPlanValue !== "") {
        if (convertFutureCityPlan !== "") {
          convertFutureCityPlan += ' FAR ' + faryorfutureCityPlanValue + ' : 1 ';
        }
      }
      if (cityPlanProvincefutureValue !== "") {
        if (convertFutureCityPlan !== "") {
          convertFutureCityPlan += ' ' + cityPlanProvincefutureValue;
        }
      }
    }

    // เช็คค่าว่างใน ผังเมืองอนาคต Eng
    var futureCityPlanEngValue = document.getElementById('futureCityPlanEng').value;
    var yorfutureCityPlanEngValue = document.getElementById('yorfutureCityPlanEng').value;
    var faryorfutureCityPlanValue = document.getElementById('faryorfutureCityPlan').value;
    var cityPlanProvincefutureEngValue = document.getElementById('cityPlanProvincefutureEng').value;

    // ตรวจสอบว่าทั้ง 4 ตัวแปรมีค่าว่างหรือไม่
    if (futureCityPlanEngValue === "" && yorfutureCityPlanEngValue === "" && faryorfutureCityPlanValue === "" && cityPlanProvincefutureEngValue === "") {
      convertFutureCityPlanEng = ""; // ถ้าทั้ง 4 ตัวแปรเป็นค่าว่าง
    } else {
      convertFutureCityPlanEng = ""; // ตั้งค่าเริ่มต้นเป็นว่าง

      // ตรวจสอบแต่ละตัวแปร
      if (futureCityPlanEngValue !== "") {
        convertFutureCityPlanEng += futureCityPlanEngValue;
      }
      if (yorfutureCityPlanEngValue !== "") {
        if (convertFutureCityPlanEng !== "") {
          convertFutureCityPlanEng += ' ';
        }
        convertFutureCityPlanEng += yorfutureCityPlanEngValue;
      }
      if (faryorfutureCityPlanValue !== "") {
        if (convertFutureCityPlanEng !== "") {
          convertFutureCityPlanEng += ' FAR ' + faryorfutureCityPlanValue + ' : 1 ';
        }
      }
      if (cityPlanProvincefutureEngValue !== "") {
        if (convertFutureCityPlanEng !== "") {
          convertFutureCityPlanEng += ' ' + cityPlanProvincefutureEngValue;
        }
      }
    }

    const formData = {
      OwnerId: document.getElementById('agent').value,
      CreatedById: document.getElementById('agent').value,
      RecordTypeId: document.getElementById('listing_type').value,
      pba__ListingType__c: document.getElementById('listing_type').options[document.getElementById('listing_type').selectedIndex].text,
      pba__PropertyType__c: document.getElementById('PropertyType').value,
      Name: document.getElementById('title').value,
      Title_Eng__c: document.getElementById('titleEng').value,
      pba__State_pb__c: document.getElementById('subdistrict').value,
      Subdistrict_Eng__c: document.getElementById('subdistrictEng').value,
      District__c: document.getElementById('district').value,
      District_Eng__c: document.getElementById('districtEng').value,
      pba__City_pb__c: document.getElementById('province').value,
      City_Eng__c: document.getElementById('provinceEng').value,
      pba__Latitude_pb__c: document.getElementById('latitude').value,
      pba__Longitude_pb__c: document.getElementById('longitude').value,
      rai__c: document.getElementById('rai').value,
      ngan__c: document.getElementById('ngan').value,
      Sq_Wah__c: document.getElementById('squareWah').value,
      pba__ListingPrice_pb__c: document.getElementById('price').value,
      cityplan__c: convertCityPlan,
      City_Plan_Eng__c: convertCityPlanEng,
      Provincial_town_plan__c: document.getElementById('cityPlanProvince').value,
      Future_city_plans__c: convertFutureCityPlan,
      New_City_Plan_Eng__c: convertFutureCityPlanEng,
      Wide__c: document.getElementById('width').value,
      Width_of_the_road_according_to_Rawang__c: document.getElementById('roadWidth').value,
      road_width__c: roadWidthConvert,
      road_width_Eng__c: roadWidthConvert,
      Description_thai__c: descriptionThaiContent,
      Description_Eng__c: descriptionEngContent,
      agreement__c: 'PRESENT ONLAND 459',
      start_date__c: new Date().toISOString(),
      level_of_information__c: document.getElementById('Level_of_reliability_of_information').value,
      appraisal_wah__c: document.getElementById('appraisalPrice').value,
      title_deed__c: document.getElementById('totaltitleDeed').value,
      length__c: document.getElementById('landDepth').value,
      nameroad__c: document.getElementById('roadName').value,
      Road_Name_Eng__c: document.getElementById('roadNameEng').value,
      status_road__c: document.getElementById('roadStatus').value,
      Road_Type_Eng__c: document.getElementById('roadStatusEng').value,
      soi__c: document.getElementById('soiName').value,
      Soi_Eng__c: document.getElementById('soiNameEng').value,
      tranfer__c: document.getElementById('tranfer').value,
      Price_Condition_Eng__c: document.getElementById('tranferEng').value,
      Land_condition__c: document.getElementById('Land_and_building_conditions').value,
      Land_Condition_Eng__c: document.getElementById('Land_and_building_conditionsEng').value,
      Tenant__c: document.getElementById('tenant').value,
      Tenant_Eng__c: document.getElementById('tenantEng').value,
    };
    console.log(formData);


    try {
      // Show loading spinner before making the request
      document.getElementById('loadingSpinner').style.display = 'inline-block';
      // Disable the button
      document.getElementById('sendToSalesforce').disabled = true;

      const response = await fetch('/sendToSalesforce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Salesforce response:', result);

      // Update the HTML content based on the response
      const responseMessageDiv = document.getElementById('response-message');

      if (result.success) {
        // Check if the id property exists in recordData
        const idValue = result.recordData && result.recordData.id;

        if (idValue) {
          responseMessageDiv.innerHTML = `<p class="success-message">${result.message}</p>
                                <p>Record ID: ${idValue}</p>
                                <p>URL: <a href="https://realistestate.lightning.force.com/lightning/r/pba__Listing__c/${idValue}/view" target="_blank">Link</a></p>`;

        } else {
          responseMessageDiv.innerHTML = `<p class="success-message">${result.message}</p>
                                          <p>No Record ID found in the response data.</p>`;
        }
      } else {
        responseMessageDiv.innerHTML = `<p class="error-message">${result.message}</p>`;
      }

    } catch (error) {
      // Handle errors that may occur during the request
      console.error('Error during sending data to Salesforce:', error);
    } finally {
      // Hide loading spinner regardless of success or error
      document.getElementById('loadingSpinner').style.display = 'none';
      // Enable the button
      document.getElementById('sendToSalesforce').disabled = false;
    }

  }
});