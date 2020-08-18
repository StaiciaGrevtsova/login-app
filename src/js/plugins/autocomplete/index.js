import './style.css';

/**
 *
 * @param {HTMLInputElement} el
 * @param {Array} arr. Format [{id: id, value: value}]
 */
export default function autocomplete(el, arr) {
  let currentFocus;

  function closeAllLists(element) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument: */
    const x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (element !== x[i] && element !== el) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  function removeActive(x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x) return false;
    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /* add class "autocomplete-active": */
    x[currentFocus].classList.add('autocomplete-active');
    return 0;
  }
  /* execute a function when someone writes in the text field: */
  el.addEventListener('input', function () {
    let b;
    const val = this.value;
    /* close any already open lists of autocompleted values */
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;

    /* create a DIV element that will contain the items (values): */
    const a = document.createElement('DIV');
    a.setAttribute('id', `${this.id}autocomplete-list`);
    a.setAttribute('class', 'autocomplete-items');
    /* append the DIV element as a child of the autocomplete container: */
    this.parentNode.appendChild(a);

    arr.forEach((item) => {
      const { value } = item;
      if (value.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        b = document.createElement('DIV');
        b.innerHTML = `<strong>${value.substr(0, val.length)}</strong>`;
        b.innerHTML += value.substr(val.length);
        b.innerHTML += `<input type='hidden' value='${value}'>`;

        b.addEventListener('click', function () {
          this.value = this.getElementsByTagName('input')[0].value;
          this.dataset.id = item.id;
          closeAllLists();
        });
        a.appendChild(b);
      }
    });

    return 0;
  });

  el.addEventListener('blur', function () {
    const inputValue = this.value;
    if (!inputValue) return false;

    const result = arr.find((obj) => obj.value === inputValue);

    if (result) {
      this.dataset.id = result.id;
    } else {
      this.dataset.id = '';
    }
    return 0;
  });

  /* execute a function presses a key on the keyboard: */
  el.addEventListener('keydown', function (e) {
    let x = document.getElementById(`${this.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      /* If the arrow DOWN key is pressed,
      increase the currentFocus letiable: */
      currentFocus += 1;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 38) { // up
      /* If the arrow UP key is pressed,
      decrease the currentFocus letiable: */
      currentFocus -= 1;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted, */
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item: */
        if (x) x[currentFocus].click();
      }
    }
  });
  /* execute a function when someone clicks in the document: */
  document.addEventListener('click', (e) => {
    closeAllLists(e.target);
  });
}
