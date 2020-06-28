//jshint esversion:6
module.exports = {
  showalert: function (checkBoxElem) {
    console.log(checkBoxElem);
    if (checkBoxElem.checked) {
      console.log("Checked");
    } else {
      console.log("Unchecked");
    }
    // var jsdom = require("jsdom");
    // const { JSDOM } = jsdom;
    // const { window } = new JSDOM();
    // const { document } = (new JSDOM('')).window;
    // global.document = document;
    //
    // var $ = jQuery = require('jquery')(window);

    // console.log("Checkbox changed...");
    // console.log($("#confirmbox"));
    // console.log($(this));
    // console.log(checkBox);
  }
};
