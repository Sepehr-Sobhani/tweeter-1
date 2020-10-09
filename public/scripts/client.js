const ROOT_URL = "http://localhost:8080/";

$(document).ready(function() {
  // Display new tweet form
  $("nav button").on("click", function() {
    $(".compose").toggle("fast");
  });
  // Toggle buttun to scroll up page and open new tweet form
  $(".bottom-toggle").on("click", function() {
    $(".compose").css("display", "block");
    var position = $("main").offset().top;
    $("body, html").animate({
      scrollTop: position
    });
  });

  //Disable tweet button as input length will be 0
  $(".tweet-btn").attr("disabled", true);
  $(".compose form").submit(event => {
    event.preventDefault();
    var str = $(".compose form").serialize();
    $.post({ url: `${ROOT_URL}tweets/` }, str)
      .then((res) => {
        // Retrieve new tweet list after submitting new
        renderTweets(dbData());
      })
      .then((res) => {
        //Reset New tweet form
        validateInput(0);
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  });

  const dbData = function() {
    $.ajax({ url: `${ROOT_URL}tweets/` })
      .then((res) => {
        // pass the result to the render tweets function
        renderTweets(res);
      })
      .fail((err) => {
        console.log("Error retieving tweets");
      });
  };

  const renderTweets = function(tweets) {
    //Reset input field
    $("#tweet-field").val("");
    //Clear previous tweet list
    $(".tweets .history").empty();
    // Pass each tweet object to "createTweetElement()" in tweet-factory.js
    for (const key in tweets) {
      const tweet = tweets[key];
      const tweetToRender = createTweetElement(tweet);
      $(".tweets .history").append(tweetToRender);
    }
  };
  renderTweets(dbData());
});


