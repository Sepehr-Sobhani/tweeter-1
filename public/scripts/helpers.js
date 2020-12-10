const DateTime = luxon.DateTime;

// Handle XSS
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// retrive the duration between the current date and a tweet post date.
// returns an object containing a "days" key. 
const elapsedTimeObject = function(jsDate) {
  const posted = DateTime.fromMillis(jsDate);
  const now = DateTime.fromMillis(Date.now());
  return now.diff(posted, ['days']);
};

const tweetElapsedTime = function(created_at) {
  // use number of days to edit the displayed post date.
  const daysElapsed = elapsedTimeObject(created_at).values.days;
  if (daysElapsed > 5) {
    return DateTime.fromMillis(created_at).toLocaleString();
  } else if (daysElapsed > 1 && daysElapsed < 5) {
    return "a few days ago";
  } else {
    return "recently";
  }
};

