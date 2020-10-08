const DateTime = luxon.DateTime;

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const elapsedTimeObject = function(jsDate) {
  let posted = DateTime.fromMillis(jsDate);
  let now = DateTime.fromMillis(Date.now());
  return now.diff(posted, ['days']);
};

const tweetElapsedTime = function(created_at) {
  let daysElapsed = elapsedTimeObject(created_at).values.days;
  if (daysElapsed > 5) {
    return DateTime.fromMillis(created_at).toLocaleString();
  } else if (daysElapsed > 1 && daysElapsed < 5) {
    return "a few days ago";
  } else {
    return "recently";
  }
};

