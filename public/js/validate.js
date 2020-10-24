var buttonName

// Save the name of the button that was clicked
function handleClick(button) {
  buttonName = button.name
}

// Make sure input field is populated (with file or db name)
// This makes sure that the server side (app.js) will at least get a
// filename or database name (and not an empty string!)
function validateForm() {
  // If the cancel button was pressed, just return
  if (buttonName === 'cancel') {
    return true
  }

  // Otherwise look for an input field to validate
  // First, look for a filename field
  var x = document.forms["myForm"]["filename"]
  if (x) {
    if (x.value == "") {
      alert("Filename must be provided");
      return false;
    }
    // Second, look for a database name field
  } else {
    x = document.forms["myForm"]["dbname"]
    if (x.value == "") {
      alert("Database name must be provided");
      return false;
    }
  }
}
