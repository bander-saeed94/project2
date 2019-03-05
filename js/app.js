/*
  Please add all Javascript code to this file.
*/
//newsapi
//c3b852c3f410409fa6fe2fbec8c289ff

//https://content.guardianapis.com/search?api-key=c7a817b8-5671-4723-9628-eb500351d875

//default source 

$(document).ready(function () {
  getNewsapi();
  $("#newsapi").click(function(){
    getNewsapi();
  });
  $("#guardianapis").click(function(){
    getGuardianapis();
  });

  $("#popUpAction").click(function(){
    // $("#popUp").toggleClass("hidden")
    $("#popUp").toggleClass("loader")
    $("#popUp").toggleClass("container")


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
        console.log(data.articles)
        data.articles.forEach(element => {
          let date = element.publishedAt.toString().substring(0, 10)
          $("#main").append(`
            <article class="article">
            <section class="featuredImage">
              <img src="${element.urlToImage}" alt="" />
            </section>
            <section class="articleContent">
                <a href="#"><h3>${element.title}</h3></a>
                <h6>${element.description}</h6>
            </section>
            <section class="impressions">
            ${date}
            </section>
            <div class="clearfix"></div>
          </article>
        `)
        });
      });
    });
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

      });
    });
}