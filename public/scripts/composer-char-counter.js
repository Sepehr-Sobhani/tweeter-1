$(document).ready(function() {
  $(".compose .error").css("height", 0);
  $("#tweet-field").on('input', function() {
    validateInput(this.value.length);
  });
  validateInput(0);
});
const validateInput = function(charCount) {
  const maxTweetLength = 140;
  $("#count").val(maxTweetLength - charCount);
  if (charCount === 0 || charCount > maxTweetLength) {
    $(".tweet-btn").attr("disabled", true);
    if (charCount > maxTweetLength) {
      $("#count").css("color", "red");
      $(".compose .error").slideDown("fast", function() {
        $(".compose .error").css("display", "flex");
      });
    }
  } else {
    $("#count").css("color", "black");
    $(".tweet-btn").attr("disabled", false);
    $(".compose .error").css("height", 0);
    $(".compose .error").slideUp("fast", function() {
    });
  }
};


