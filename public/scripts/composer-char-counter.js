$(document).ready(function() {
  $(".tweet-error").css("height", 0);
  $("#tweet-field").on('input', function() {
    validateInput(this.value.length);
  });
  validateInput(0);
});
const validateInput = function(charCount) {
  const maxTweetLength = 140;
  $("#count").val(maxTweetLength - charCount);
  if (charCount === 0 || charCount > maxTweetLength) {
    $("#tweet-btn").attr("disabled", true);
    if (charCount > maxTweetLength) {
      $("#count").css("color", "red");
      $(".tweet-error").slideDown("fast", function() {
        $(".tweet-error").css("display", "flex");
      });
    }
  } else {
    $("#count").css("color", "black");
    $("#tweet-btn").attr("disabled", false);
    $(".tweet-error").css("height", 0);
    $(".tweet-error").slideUp("fast", function() {
    });
  }
};


