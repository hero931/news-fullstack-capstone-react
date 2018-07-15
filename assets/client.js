/*Define variables objects and functions*/
$(document).ready(function () {
    populateFavoriteList();
    sportDataFromNyt();
    artDataFromNyt();
    politicsDataFromNyt();
    businessDataFromNyt();
});

//Open sidebar
$(document).on("click", "#sidebar-btn", function (event) {
    event.preventDefault();
    $('#sidebar').addClass('visible');
    $('#sidebar-btn').hide();
    $('#sidebar-close').show();
});

//Close sidebar
$(document).on("click", "#sidebar-close", function (event) {
    event.preventDefault();
    $('#sidebar').removeClass('visible');
    $('#sidebar-btn').show();
});

//Home section
$(document).on("click", "#home", function (event) {
    event.preventDefault();
    location.reload();
});

$(document).on("click", ".logo-header", function (event) {
    event.preventDefault();
    location.reload();
});

//Sport section
$(document).on("click", "#sports", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.sport-page').show();
    //sportDataFromNyt();
});

//Sport results
function sportDataFromNyt() {
    let outcome = $('#sport-section .col-container');
    var url = "https://api.nytimes.com/svc/topstories/v2/sports.json";
    url += '?' + $.param({
        'api-key': "1b45aab26c4f43869d611a4c1ff2c95d"
    });
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        type: "GET"

    }).done(function (dataOutput) {
        console.log(dataOutput);
        outcome.html("");
        let count = 0;
        let buildTheHtmlOutput = "";
        $.each(dataOutput.results, function (dataArrayKey, dataArrayValue) {
            count++;
            if (count <= 16) {
                buildTheHtmlOutput += '<div class="col">';
                buildTheHtmlOutput += '<p>' + dataArrayValue.title + '</p><hr>';
                buildTheHtmlOutput += '<form class="addToSportList">';
                buildTheHtmlOutput += '<input type="hidden" class="addToSportListTitle" value="' + dataArrayValue.title + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToSportListUrl" value="' + dataArrayValue.url + '">';
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<input type="hidden" class="addToSportListImage" value="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<input type="hidden" class="addToSportListImage" value="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += '<button type="submit" class="addToFavListButton">';
                buildTheHtmlOutput += '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += "<a href='" + dataArrayValue.url + "' target='_blank'>";
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<img src="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<img src="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += "</a>";
                buildTheHtmlOutput += '</div>';
            }
        });
        $(outcome).html(buildTheHtmlOutput);
    }).fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//Add article to sport favorite list
$(document).on('submit', '.addToSportList', function (event) {
    event.preventDefault();
    console.log("inside the Sport trigger");
    var titleName = $(this).parent().find('.addToSportListTitle').val();
    var urlName = $(this).parent().find('.addToSportListUrl').val();
    var image = $(this).parent().find('.addToSportListImage').val();
    console.log(titleName, urlName, image);
    var sportObject = {
        'title': titleName,
        'url': urlName,
        'image': image
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(sportObject),
        url: 'https://news-fullstack-capstone.herokuapp.com/add-to-sport-list/',
    })
        .done(function (result) {
        console.log(result);
        populateFavoriteList();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
});

//Arts section
$(document).on("click", "#arts", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.art-page').show();
});

//Arts results
function artDataFromNyt() {
    let outcome = $('#art-section .col-container');
    var url = "https://api.nytimes.com/svc/topstories/v2/arts.json";
    url += '?' + $.param({
        'api-key': "1b45aab26c4f43869d611a4c1ff2c95d"
    });
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        type: "GET"

    }).done(function (dataOutput) {
        console.log(dataOutput);
        outcome.html("");
        let count = 0;
        let buildTheHtmlOutput = "";
        $.each(dataOutput.results, function (dataArrayKey, dataArrayValue) {
            count++;
            if (count <= 16) {
                buildTheHtmlOutput += '<div class="col">';
                buildTheHtmlOutput += '<p>' + dataArrayValue.title + '</p><hr>';
                buildTheHtmlOutput += '<form class="addToArtsList">';
                buildTheHtmlOutput += '<input type="hidden" class="addToArtsListTitle" value="' + dataArrayValue.title + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToArtsListUrl" value="' + dataArrayValue.url + '">';
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<input type="hidden" class="addToArtsListImage" value="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<input type="hidden" class="addToArtsListImage" value="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += '<button type="submit" class="addToFavListButton">';
                buildTheHtmlOutput += '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += "<a href='" + dataArrayValue.url + "' target='_blank'>";
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<img src="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<img src="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += "</a>";
                buildTheHtmlOutput += '</div>';
            }
        });
        $(outcome).html(buildTheHtmlOutput);
    }).fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//Add article to arts favorite list
$(document).on('submit', '.addToArtsList', function (event) {
    event.preventDefault();
    console.log("inside the Arts trigger");
    var titleName = $(this).parent().find('.addToArtsListTitle').val();
    var urlName = $(this).parent().find('.addToArtsListUrl').val();
    var image = $(this).parent().find('.addToArtsListImage').val();
    console.log(titleName, urlName, image);
    var artsObject = {
        'title': titleName,
        'url': urlName,
        'image': image
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(artsObject),
        url: 'https://news-fullstack-capstone.herokuapp.com/add-to-arts-list/',
    })
        .done(function (result) {
        console.log(result);
        populateFavoriteList();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
});

//Politics section
$(document).on("click", "#politics", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.politics-page').show();
});

//Politics results
function politicsDataFromNyt() {
    let outcome = $('#politics-section .col-container');
    var url = "https://api.nytimes.com/svc/topstories/v2/politics.json";
    url += '?' + $.param({
        'api-key': "1b45aab26c4f43869d611a4c1ff2c95d"
    });
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        type: "GET"

    }).done(function (dataOutput) {
        console.log(dataOutput);
        outcome.html("");
        let count = 0;
        let buildTheHtmlOutput = "";
        $.each(dataOutput.results, function (dataArrayKey, dataArrayValue) {
            count++;
            if (count <= 16) {
                buildTheHtmlOutput += '<div class="col">';
                buildTheHtmlOutput += '<p>' + dataArrayValue.title + '</p><hr>';
                buildTheHtmlOutput += '<form class="addToPoliticsList">';
                buildTheHtmlOutput += '<input type="hidden" class="addToPoliticsListTitle" value="' + dataArrayValue.title + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToPoliticsListUrl" value="' + dataArrayValue.url + '">';
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<input type="hidden" class="addToPoliticsListImage" value="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<input type="hidden" class="addToPoliticsListImage" value="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += '<button type="submit" class="addToFavListButton">';
                buildTheHtmlOutput += '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += "<a href='" + dataArrayValue.url + "' target='_blank'>";
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<img src="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<img src="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += "</a>";
                buildTheHtmlOutput += '</div>';
            }
        });
        $(outcome).html(buildTheHtmlOutput);
    }).fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//Add article to politics favorite list
$(document).on('submit', '.addToPoliticsList', function (event) {
    event.preventDefault();
    console.log("inside the Politics trigger");
    var titleName = $(this).parent().find('.addToPoliticsListTitle').val();
    var urlName = $(this).parent().find('.addToPoliticsListUrl').val();
    var image = $(this).parent().find('.addToPoliticsListImage').val();
    console.log(titleName, urlName, image);
    var politicsObject = {
        'title': titleName,
        'url': urlName,
        'image': image
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(politicsObject),
        url: 'https://news-fullstack-capstone.herokuapp.com/add-to-politics-list/',
    })
        .done(function (result) {
        console.log(result);
        populateFavoriteList();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
});




//Business section
$(document).on("click", "#business", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.business-page').show();
});

//Business results
function businessDataFromNyt() {
    let outcome = $('#business-section .col-container');
    var url = "https://api.nytimes.com/svc/topstories/v2/business.json";
    url += '?' + $.param({
        'api-key': "1b45aab26c4f43869d611a4c1ff2c95d"
    });
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        type: "GET"

    }).done(function (dataOutput) {
        console.log(dataOutput);
        outcome.html("");
        let count = 0;
        let buildTheHtmlOutput = "";
        $.each(dataOutput.results, function (dataArrayKey, dataArrayValue) {
            count++;
            if (count <= 16) {
                buildTheHtmlOutput += '<div class="col">';
                buildTheHtmlOutput += '<p>' + dataArrayValue.title + '</p><hr>';
                buildTheHtmlOutput += '<form class="addToBusinessList">';
                buildTheHtmlOutput += '<input type="hidden" class="addToBusinessListTitle" value="' + dataArrayValue.title + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToBusinessListUrl" value="' + dataArrayValue.url + '">';
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<input type="hidden" class="addToBusinessListImage" value="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<input type="hidden" class="addToBusinessListImage" value="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += '<button type="submit" class="addToFavListButton">';
                buildTheHtmlOutput += '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += "<a href='" + dataArrayValue.url + "' target='_blank'>";
                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<img src="' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<img src="assets/images/no-image.png">';
                }
                buildTheHtmlOutput += "</a>";
                buildTheHtmlOutput += '</div>';
            }
        });
        $(outcome).html(buildTheHtmlOutput);
    }).fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//Add article to business favorite list
$(document).on('submit', '.addToBusinessList', function (event) {
    event.preventDefault();
    console.log("inside the Business trigger");
    var titleName = $(this).parent().find('.addToBusinessListTitle').val();
    var urlName = $(this).parent().find('.addToBusinessListUrl').val();
    var image = $(this).parent().find('.addToBusinessListImage').val();
    console.log(titleName, urlName, image);
    var businessObject = {
        'title': titleName,
        'url': urlName,
        'image': image
    };

    $.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(businessObject),
        url: 'https://news-fullstack-capstone.herokuapp.com/add-to-business-list/',
    })
        .done(function (result) {
        console.log(result);
        populateFavoriteList();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
});

//Favorite section
$(document).on("click", "#favorite", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.result-favorite-page').show();
});

//Populate favorite list
function populateFavoriteList() {
    let outcome = $('#result-section-favorites .col-favorite');
    $.ajax({
        type: 'GET',
        url: 'https://news-fullstack-capstone.herokuapp.com/populate-favorites-list',
        dataType: 'json',
        category: 'sport'

    })
        .done(function (dataOutput) {
        console.log("inside the populateFavoriteList");
        console.log(dataOutput);
        outcome.html("");
        let buildTheHtmlOutput = "";
        $.each(dataOutput.items, function (dataArrayKey, dataArrayValue) {

            buildTheHtmlOutput += '<div class="col">';
            buildTheHtmlOutput += '<p>' + dataArrayValue.title + '</p><hr>';
            buildTheHtmlOutput += '<form class="deleteFavoritesListForm">';
            buildTheHtmlOutput += '<input type="hidden" class="deleteFavoritesListId" value="' + dataArrayValue._id + '" >';
            buildTheHtmlOutput += '<button type="submit" class="deleteItemButton" value="">';
            buildTheHtmlOutput += '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';
            buildTheHtmlOutput += '</button>';
            buildTheHtmlOutput += '</form>';
            buildTheHtmlOutput += "<a href='" + dataArrayValue.url + "' target='_blank'>";
            buildTheHtmlOutput += '<img src="' + dataArrayValue.image + '">';
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += '</div>';

        });
        $('.result-favorite-page').show();
        $(outcome).html(buildTheHtmlOutput);

    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//User will be able to remove item from list
$(document).on('submit', '.deleteFavoritesListForm', function (event) {
    event.preventDefault();
    var itemIdToDelete = $(this).parent().find('.deleteFavoritesListId').val();
    $.ajax({
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        url: 'https://news-fullstack-capstone.herokuapp.com/delete-from-favorites-list/' + itemIdToDelete,
    })
        .done(function (result) {
        populateFavoriteList();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
        sweetAlert('Oops...', 'Please try again', 'error');
    });
});


//Search section
$(document).on("click", "#search", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.login-page').show();
    $('#result-section').hide();
});

//Search for a specific date
$(document).on('submit', '#login_form', function (event) {
    event.preventDefault();
    //        $('.result-favorite-page').show();
    //        $('.result-page').show();
    var test = $("#loginDate").val();
    console.log(test);
    var repleacedDateString = test.replace(/-/gi, "");
    console.log(repleacedDateString);
    const outcome = $('#result-section .col-container');
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "1b45aab26c4f43869d611a4c1ff2c95d",
        'q': "news",
        'end_date': repleacedDateString,
        'sort': "newest"
    });
    $.ajax({
        url: url,
        method: 'GET',
        dataType: "json",
        type: "GET"

    }).done(function (dataOutput) {
        console.log(dataOutput);
        //$('#result-section').show();
        outcome.html("");
        let count = 0;
        let buildTheHtmlOutput = "";
        $.each(dataOutput.response.docs, function (dataArrayKey, dataArrayValue) {
            count++;
            if (count <= 10) {
                //console.log(count);
                buildTheHtmlOutput += '<div class="col">';
                buildTheHtmlOutput += '<p>' + dataArrayValue.snippet + '</p><hr>';
                buildTheHtmlOutput += "<a href='" + dataArrayValue.web_url + "' target='_blank'>";

                if (dataArrayValue.multimedia.length != 0) {
                    buildTheHtmlOutput += '<img src="http://www.nytimes.com/' + dataArrayValue.multimedia[0].url + '">';
                } else {
                    buildTheHtmlOutput += '<img src="assets/images/no-image.png">';
                }

                buildTheHtmlOutput += "</a>";
                buildTheHtmlOutput += '</div>';
            }
        });
        $(outcome).html(buildTheHtmlOutput);
        $('.result-page').show();
        $('#result-section').show();
    }).fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
});
