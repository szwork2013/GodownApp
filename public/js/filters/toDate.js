'use strict';

// .NET JSON Date decoder
// ---------------------
// This filter takes a .NET JSON encoded date and makes it readable...
// i.e.  /Date(-795988800000-0400)/ turns into 10/11/1944
// to use in your template just do.... {{ mydata.somedate | jsonDate }}
// If moment.js is included in your project, you can pass an optional
// second parameter "format" with a moment.js-compatible date format string.
// If the second parameter is empty or moment is not included, we'll fall back to default.

app.filter('toDate', function() {
  return function(input, format) {
      //console.log("toDate");
    // Exit if the value isn't defined
    if(angular.isUndefined(input)) {
      return;
    }
      //console.log("format");
     // console.log(format);

    var date = new Date(input);



    // added Moment.js support?
    if(typeof moment !== 'undefined' ) {
      var momentObj = moment(date);
      if(format)
      return momentObj.format(format);
      return momentObj.format();
    }
    else {
        //console.log('w/o moment:'+date.toLocaleDateString());
        return date.toLocaleDateString();
    }
  }
});
