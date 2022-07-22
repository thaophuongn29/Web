// Hàm api
function getApi (api) {
    $("#load").show();
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.articles.forEach(function (value, i) {
                $("#main").append(`
                    <div class="row mt-3 mb-3 main">
                        <div class="col-sm-12 col-md-4 image">
                            <img src="${value.image}">
                        </div>
                        <div class="col-sm-12 col-md-8">
                            <div class="row mb-3 title">
                                <a href="${value.url}" target="_blank">${value.title}</a>
                            </div>
                            <div class="row mb-3">
                                <em>${value.publishedAt}</em>
                            </div>
                            <div class="row">
                                <p>${value.description}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    `
                )
            })
            $("#load").hide();
        });
}

// Lấy tin tức
var api = 'https://gnews.io/api/v4/top-headlines?token=818c60db337dc67c15c441a5a5c2c176&lang=en';
getApi(api);

// Nút tìm kiếm
var keyword = "";

$("#search-btn").click(function() {
    keyword = $("#input-search").val();
    var date = Date.now();
    $("#main").html("");
    api = `https://gnews.io/api/v4/search?q=${keyword}&token=818c60db337dc67c15c441a5a5c2c176&lang=en`;
    getApi(api);
    
    // Hiện tiện ích
    $("#info").show();
    $("#time").html(`Thời gian tìm kiếm: ${Date.now() - date}s`);
})

// Nút lọc tin tức
$("#filter-btn").click(function () {
    var date = Date.now();
    var from = "";
    var to = "";
    if ($("#filters-from").val() && $("#filters-to").val()) {
        from = `&from=${$("#filters-from").val()}T00:00:00Z`;
        to = `&to=${$("#filters-to").val()}T23:59:00Z`;
    }else if ($("#filters-from").val()) {
        from = `&from=${$("#filters-from").val()}T00:00:00Z`;
    }else if ($("#filters-to").val()) {
        to = `&to=${$("#filters-to").val()}T23:59:00Z`;
    }
    $("#main").html("");

    api = `https://gnews.io/api/v4/search?q=${keyword}&token=818c60db337dc67c15c441a5a5c2c176&lang=en${from}${to}`.trim();
    getApi(api);

    $("#time").html(`Thời gian tìm kiếm: ${Date.now() - date}s`);
})