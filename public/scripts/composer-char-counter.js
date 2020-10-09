$(document).ready(function() {
  $(".compose .error").css("height", 0);
  $("#tweet-field").on('input', function() {
    //on input change validate the contents of the tweet field content length
    validateInput(this.value.length);
  });
  validateInput(0);
});


const validateInput = function(charCount) {
  const maxTweetLength = 140;
  $("#count").val(maxTweetLength - charCount);
  if (charCount === 0 || charCount > maxTweetLength) {
    //Disable tweet button
    $(".tweet-btn").attr("disabled", true);
    if (charCount > maxTweetLength) {
      ///Turn character counter red
      $("#count").css("color", "red");
      //Display error message to user
      $(".compose .error").slideDown("fast", function() {
        $(".compose .error").css("display", "flex");
      });
    }
  } else {
    // reset to ok status
    $("#count").css("color", "black");
    $(".tweet-btn").attr("disabled", false);
    $(".compose .error").css("height", 0);
    $(".compose .error").slideUp("fast", function() {
    });
  }
};


