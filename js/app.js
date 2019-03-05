/*
  Please add all Javascript code to this file.
*/
//newsapi
//c3b852c3f410409fa6fe2fbec8c289ff

//https://content.guardianapis.com/search?api-key=c7a817b8-5671-4723-9628-eb500351d875

//default source 
var articles = []
$(document).ready(function () {
  getNewsapi();
  $("#newsapi").click(function () {
    getNewsapi();
  });
  $("#guardianapis").click(function () {
    getGuardianapis();
  });
  $(".closePopUp").click(function () {
    $("#popUp").addClass("loader")
    $("#popUp").addClass("hidden")
    $("#article_detail").addClass("container")
  })

});


function getNewsapi() {
  $("#main").empty();
  $("#current_source").html("News Source: <span>News API</span>")

  var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=c3b852c3f410409fa6fe2fbec8c289ff';
  var req = new Request(url);
  fetch(req)
    .then(function (response) {
      $("#main_loader").hide();
      response.json().then(data => {
        data.articles.length = 7
        articles = data.articles
        console.log(data.articles)
        data.articles.forEach((element, i) => {
          let date = element.publishedAt.toString().substring(0, 10)
          $("#main").append(`
            <article class="article">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a id="article_button_${i}" href="#"><h3>${element.title}</h3></a>
                <h6>${element.description}</h6>
            </section>
            <section class="impressions">
            ${date}
            </section>
            <div class="clearfix"></div>
          </article>
        `)
        });
        articles.forEach((elem, i) => {
          $("#article_button_" + i).click(function () {
            openDetail(elem.title, elem.content, elem.url);
          })
        })


      });
    });
}

function openDetail(title, content, url) {
  $("#popUp").removeClass("loader")
  $("#popUp").removeClass("hidden")
  $("#article_detail").removeClass("container")
  $("#detail_title").html(title)
  $("#detail_content").html(content)
  $("#article_detail").html(`
    <h1 id="detail_title">
    ${title}
    </h1>
    <p id="detail_content">
        ${content}
    </p>
    <a href="${url}" class="popUpAction" target="_blank">Read more from source</a>
  `)

}

function getGuardianapis() {
  // https://content.guardianapis.com/search
  // ?api-key=c7a817b8-5671-4723-9628-eb500351d875
  $("#main").empty();
  $("#current_source").html("News Source: <span>Guardian APIs</span>")
  var url = 'https://content.guardianapis.com/search?' +
    'api-key=c7a817b8-5671-4723-9628-eb500351d875';
  var req = new Request(url);
  fetch(req)
    .then(function (response) {
      $("#main_loader").hide();
      response.json().then(data => {
        data.response.results.length = 5
        articles = data.response.results
        data.response.results.forEach(element => {
          $("#main").append(`
            <article class="article">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${element.webTitle}</h3></a>
                <h6>${element.type}</h6>
            </section>
            <section class="impressions">
            ${element.sectionName}
            </section>
            <div class="clearfix"></div>
          </article>
        `)
        });
        articles.forEach((elem, i) => {
          $("#article_button_" + i).click(function () {
            openDetail(elem.webTitle, elem.sectionName, elem.webUrl);
          })
        })

      });
    });
}