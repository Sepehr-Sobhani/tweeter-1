const ROOT_URL = "http://localhost:8080/";

$(document).ready(function() {
  $("nav button").on("click", function() {
    $(".compose").toggle("fast");
  });

  $(".bottom-toggle").on("click", function() {
    $(".compose").css("display", "block");
    var position = $("main").offset().top;
    $("body, html").animate({
      scrollTop: position
    });
  });

  $(".tweet-btn").attr("disabled", true);
  $(".compose form").submit(event => {
    event.preventDefault();
    var str = $(".compose form").serialize();
    $.post({ url: `${ROOT_URL}tweets/` }, str)
      .then((res) => {
        renderTweets(dbData());
      })
      .then((res) => {
        validateInput(0);
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  });

  const dbData = function() {
    $.ajax({ url: `${ROOT_URL}tweets/` })
      .then((res) => {
        renderTweets(res);
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  };

  const renderTweets = function(tweets) {
    $("#tweet-field").val("");
    $(".tweets .history").empty();
    for (const key in tweets) {
      const tweet = tweets[key];
      const tweetToRender = createTweetElement(tweet);
      $(".tweets .history").append(tweetToRender);
    }
  };
  renderTweets(dbData());
});


