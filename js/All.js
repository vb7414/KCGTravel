const zone = document.querySelector(".main__zone");

const touristAttractionList = document.querySelector(
    ".main__touristAttractionList"
);

const selectDistrictButton = document.querySelectorAll(
    ".header__hotZone--button button"
);

const KaohsiungZone = document.querySelector(".KaohsiungZone");

const pageid = document.getElementById("pageid");

let xhr = new XMLHttpRequest();
xhr.open(
    "get",
    "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json",
    true
);
xhr.send(null);
xhr.onload = () => {
    let travelApi = JSON.parse(xhr.responseText);
    let allTravelInfo = travelApi.result.records;

    selectDistrictButton.forEach((selectButton) => {
        selectButton.addEventListener(
            "click",
            () => {
                const selectDistrict = allTravelInfo.filter(
                    (record) => record.Zone === selectButton.textContent
                );

                pageid.addEventListener("click", (e) => {
                    let page = switchPage(e);
                    pagination(selectDistrict, page, selectButton.textContent);
                });

                pagination(selectDistrict, 1, selectButton.textContent);
            },
            false
        );
    });

    KaohsiungZone.addEventListener(
        "change",
        () => {
            const selectDistrict = allTravelInfo.filter(
                (record) => record.Zone === KaohsiungZone.value
            );

            pageid.addEventListener("click", (e) => {
                let page = switchPage(e);
                page !== undefined
                    ? pagination(selectDistrict, page, KaohsiungZone.value)
                    : null;
            });

            pagination(selectDistrict, 1, KaohsiungZone.value);
        },
        false
    );

    let switchPage = (e) => {
        e.preventDefault();
        if (e.target.nodeName !== "A") return;
        const page = e.target.dataset.page;
        return page;
    };

    let pageBtn = (page) => {
        if (page.currentPage === 0) {
            pageid.innerHTML = "";
        } else {
            let str = "";
            const total = page.pageTotal;

            if (page.hasPage) {
                str += `<li class="page-item"><a class="page-link" href="#" data-page="${
                    Number(page.currentPage) - 1
                }">< prev</a></li>`;
            } else {
                str += `<li class="page-item disabled"><span class="page-link">< prev</span></li>`;
            }

            for (let i = 1; i <= total; i++) {
                if (Number(page.currentPage) === i) {
                    str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                } else {
                    str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
                }
            }

            if (page.hasNext) {
                str += `<li class="page-item"><a class="page-link" href="#" data-page="${
                    Number(page.currentPage) + 1
                }">next ></a></li>`;
            } else {
                str += `<li class="page-item disabled"><span class="page-link">next ></span></li>`;
            }

            pageid.innerHTML = str;
        }
    };

    let pagination = (travelInfo, nowPage, zone) => {
        // 取得全部資料長度
        const dataTotal = travelInfo.length;

        // 設定要顯示在畫面上的資料數量，預設每一頁只顯示 10 筆資料。
        const perpage = 10;

        // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料，這邊要注意，因為有可能會出現餘數，所以要無條件進位。
        const pageTotal = Math.ceil(dataTotal / perpage);

        // 當前頁數，對應現在當前頁數
        let currentPage = nowPage;

        // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
        // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況
        if (currentPage > pageTotal) {
            currentPage = pageTotal;
        }

        //每一頁的最大最小值
        const minData = currentPage * perpage - perpage + 1;
        const maxData = currentPage * perpage;

        // 先建立新陣列
        const data = [];
        // 首先必須使用索引來判斷資料位子，所以要使用 index
        travelInfo.forEach((item, index) => {
            // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
            const num = index + 1;
            // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
            if (num >= minData && num <= maxData) {
                data.push(item);
            }
        });
        // 用物件方式來傳遞資料
        const page = {
            pageTotal,
            currentPage,
            hasPage: currentPage > 1,
            hasNext: currentPage < pageTotal,
        };
        LoadInfo(zone, data);
        pageBtn(page);
    };

    pageid.addEventListener("click", (e) => {
        let page = switchPage(e);
        page !== undefined ? pagination(allTravelInfo, page, null) : null;
    });

    pagination(allTravelInfo, 1, null);
};

let LoadInfo = (district, travelInfo) => {
    zone.innerHTML = district;
    let content = "";

    if (travelInfo.length === 0) {
        content = `<p>查無資料</p>`;
    } else {
        travelInfo.forEach((info) => {
            content += `
            <div class="main__touristAttraction">
                <div class="main__touristAttractionPreview">
                    <div class="touristAttractionPicture">
                        <img src="${info.Picture1}" alt="picture_tourist_attraction" />
                    </div>
                    <h3>${info.Name}</h3>
                    <p>${info.Zone}</p>
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
                            <p>${info.Opentime}</p>
                        </div>
                        <div
                            class="main__touristAttractionInfoData location"
                        >
                            <img
                                src="assets/icons_pin.png"
                                alt="icons_pin"
                            />
                            <p>${info.Add}</p>
                        </div>
                        <div
                            class="main__touristAttractionInfoData phone"
                        >
                            <img
                                src="assets/icons_phone.png"
                                alt="icons_phone"
                            />
                            <p>${info.Tel}</p>
                        </div>
                    </div>
                    <div class="main__touristAttractionInfo--rightside">
                        <img
                            src="assets/icons_tag.png"
                            alt="icons_tag"
                        />
                        <p>${info.Ticketinfo}</p>
                    </div>
                </div>
            </div>`;
        });
    }
    touristAttractionList.innerHTML = content;
};
