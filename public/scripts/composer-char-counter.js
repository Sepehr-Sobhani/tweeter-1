const maxTweetLength = 140;
const count = document.querySelector("#count");

const validateInput = function(charCount) {
  count.value = maxTweetLength - charCount;
  if (charCount === 0) {
    $("#tweet-btn").attr("disabled", true);
  } else if (charCount > maxTweetLength) {
    $(count).css("color", "red");
    $("#tweet-btn").attr("disabled", true);
    $(".tweet-error").slideDown("fast", function() {
    });
  } else {
    $(count).css("color", "black");
    $("#tweet-btn").attr("disabled", false);
    $(".tweet-error").slideUp("fast", function() {
    });
  }
};
$(document).ready(function() {

  let charCount = 0;
  //count.value = maxTweetLength;
  $(".tweet-error").slideUp("fast", function() {
    $(".tweet-error").css("height", 50);
  });


  $("#tweet-field").on('input', function() {
    charCount = this.value.length;
    validateInput(charCount);
  });

  validateInput(0);
});

