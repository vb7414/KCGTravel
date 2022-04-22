const zone = document.querySelector(".main__zone");
const touristAttractionList = document.querySelector(
    ".main__touristAttractionList"
);
const LingyaDistrictButton = document.querySelector(
    ".header__hotZone--button .colorIsPurple"
);
const SanminDistrictButton = document.querySelector(
    ".header__hotZone--button .colorIsOrange"
);
const SinsingDistrictButton = document.querySelector(
    ".header__hotZone--button .colorIsYellow"
);
const YanchengDistrictButton = document.querySelector(
    ".header__hotZone--button .colorIsBlue"
);
let xhr = new XMLHttpRequest();
xhr.open(
    "get",
    "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json",
    false
);
xhr.send(null);
// xhr.onload = (travelInfo) => {
//     let travelApi = JSON.parse(xhr.responseText);
//     // travelInfo = travelApi.data.XML_Head.Infos.Info;
//     let travelInfo = travelApi.result.records;
// };
let travelApi = JSON.parse(xhr.responseText);
let travelInfo = travelApi.result.records;
let loadInfo = (district) => {
    zone.innerHTML = district;
    let content = "";
    for (let i = 0; i < travelInfo.length; i++) {
        if (travelInfo[i].Zone === district) {
            let touristAttraction = `
            <div class="main__touristAttraction">
                <div class="main__touristAttractionPreview">
                    <div class="touristAttractionPicture">
                        <img src="${travelInfo[i].Picture1}" alt="picture_tourist_attraction" />
                    </div>
                    <h3>${travelInfo[i].Name}</h3>
                    <p>${travelInfo[i].Zone}</p>
                </div>
                <div class="main__touristAttractionInfo">
                    <div class="main__touristAttractionInfo--leftside">
                        <div
                            class="main__touristAttractionInfoData clock"
                        >
                            <img
                                src="assets/icons_clock.png"
                                alt="icons_clock"
                            />
                            <p>${travelInfo[i].Opentime}</p>
                        </div>
                        <div
                            class="main__touristAttractionInfoData location"
                        >
                            <img
                                src="assets/icons_pin.png"
                                alt="icons_pin"
                            />
                            <p>${travelInfo[i].Add}</p>
                        </div>
                        <div
                            class="main__touristAttractionInfoData phone"
                        >
                            <img
                                src="assets/icons_phone.png"
                                alt="icons_phone"
                            />
                            <p>${travelInfo[i].Tel}</p>
                        </div>
                    </div>
                    <div class="main__touristAttractionInfo--rightside">
                        <img
                            src="assets/icons_tag.png"
                            alt="icons_tag"
                        />
                        <p>${travelInfo[i].Ticketinfo}</p>
                    </div>
                </div>
            </div>
            `;
            content += touristAttraction;
        }
    }
    touristAttractionList.innerHTML = content;
};
SanminDistrictButton.addEventListener(
    "click",
    function () {
        loadInfo(SanminDistrictButton.textContent);
    },
    false
);
LingyaDistrictButton.addEventListener(
    "click",
    function () {
        loadInfo(LingyaDistrictButton.textContent);
    },
    false
);
YanchengDistrictButton.addEventListener(
    "click",
    function () {
        loadInfo(YanchengDistrictButton.textContent);
    },
    false
);
SinsingDistrictButton.addEventListener(
    "click",
    function () {
        loadInfo(SinsingDistrictButton.textContent);
    },
    false
);
