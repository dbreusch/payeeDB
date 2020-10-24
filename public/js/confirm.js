// console.log('Client side javascript file loaded!')

const checkbox = document.querySelector('#confirmbox')
const deleteButton = document.querySelector('#delete')

checkbox.addEventListener('change', function() {
  if (this.checked) {
    // Checkbox is checked..
    // console.log('Checked!')
    deleteButton.classList.remove("disabled");
    deleteButton.classList.remove("btn-outline-danger");
    deleteButton.classList.add("btn-danger");
    deleteButton.removeAttribute('disabled');
  } else {
    // Checkbox is not checked..
    // console.log('Unchecked!')
    deleteButton.classList.add("disabled");
    deleteButton.classList.add("btn-outline-danger");
    deleteButton.classList.remove("btn-danger");
    deleteButton.setAttribute('disabled', true);
  }
});
