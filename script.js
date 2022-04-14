// TOGGLE BETWEEN COLOR PICKERS.
const hslaTab = document.getElementById('tab-hsla');
const rgbaTab = document.getElementById('tab-rgba');

const handleTabClick = event => {
  if (event.target.classList.contains('hidden-tab')) {
    let hslaSection = document.getElementById('section-hsla');
    let rgbaSection = document.getElementById('section-rgba');

    hslaTab.classList.toggle('hidden-tab');
    rgbaTab.classList.toggle('hidden-tab');
    hslaSection.classList.toggle('active-picker');
    hslaSection.classList.toggle('hidden-picker');
    rgbaSection.classList.toggle('active-picker');
    rgbaSection.classList.toggle('hidden-picker');
  }
};

hslaTab.addEventListener('click', handleTabClick);
rgbaTab.addEventListener('click', handleTabClick);


// DECLARE COLOR OBJECTS.
const hsla = {
  hue: 0,
  saturation: 70,
  lightness: 50,
  alpha: 1
};

const rgba = {
  red: 255,
  green: 38,
  blue: 38,
  alpha: 1
};


// HANDLE ON INPUT.
const handleInput = event => {
  // Get span element inside label element.
  let labelSpanElement = event.target.parentElement.previousElementSibling.lastElementChild.firstElementChild;
  // Get label attribute 'for' value.
  let labelElement = event.target.parentElement.previousElementSibling.firstElementChild.getAttribute('for');
  // Leave the last 4 characters. It will return rgba | hsla.
  let colorType = labelElement.slice( (labelElement.length - 4), labelElement.length);
  // Set curretn input value into above element.
  labelSpanElement.textContent = event.target.value;
  
  setColorObject(event, colorType);
  setColorOutput(colorType);
  setOutputBoxStyle(colorType);
};

// Update "hsla" and "rgba" objects.
const setColorObject = (e, str) => {
  if (str === 'hsla') {
    hsla[e.target.getAttribute('name')] = e.target.value;
  } else if (str === 'rgba') {
    rgba[e.target.getAttribute('name')] = e.target.value;
  }
};

// Update element in DOM based on "hsla" and "rgba" objects values.
const setColorOutput = str => {
  let outputElement = document.getElementById(`${str}-output-value`);
  
  if (str === 'hsla') {
    outputElement.textContent = `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha});`;
  } else if (str === 'rgba') {
    outputElement.textContent = `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha});`;
  }
};

// Set inline style to elements in DOM based on "hsla" and "rgba" objects values.
const setOutputBoxStyle = str => {
  let outputBoxElement = document.getElementById(`${str}-output-color`);

  if (str === 'hsla') {
    outputBoxElement.setAttribute('style', `background-color: hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha});`);
  } else if (str === 'rgba') {
    outputBoxElement.setAttribute('style', `background-color: rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha});`);
  }
};

// GET AND UPDATE HSLA COLOR.
const formElementsHsla = document.querySelectorAll('#section-hsla .form');
// Add event listener to every element from above collection.
formElementsHsla.forEach(element => element.addEventListener('input', handleInput));


// GET AND UPDATE RGBA COLOR.
const formElementsRgba = document.querySelectorAll('#section-rgba .form');
// Add event listener to every element from above collection.
formElementsRgba.forEach(element => element.addEventListener('input', handleInput));


// COPY RESULT ON CLICK.
const copyButtons = document.querySelectorAll('.copy-button');

const handleCopyButton = event => {
  let copyText = event.target.previousElementSibling.textContent;
  navigator.clipboard.writeText(copyText);
};
// Add event listener to every element from above collection.
copyButtons.forEach(element => element.addEventListener('click', handleCopyButton));