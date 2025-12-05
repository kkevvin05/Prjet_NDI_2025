let currentLevel = 0;


const enter = document.getElementById('enter');
const classroom1 = document.getElementById('classroom1');
const classroom2 = document.getElementById('classroom2');
const classroom3 = document.getElementById('classroom3');
const classroom4 = document.getElementById('classroom4');
const outside = document.getElementById('outside');

const element = [
  {
    element : enter,
    title : 'Le point de départ de votre aventure pour découvrir la démarche NIRD',
    text : 'Apprenez comment jsp mettre une description ici'
  }, 
  {element: classroom1, title: 'Classroom 1'}, 
  {element: classroom2, title: 'Classroom 2'}, 
  {element: classroom3, title: 'Classroom 3'}, 
  {element: classroom4, title: 'Classroom 4'}, 
  {element: outside, title: 'Outside'}
];
const lockText = 'Finnissez le niveau precedent pour debloquer ce niveau';

const template = document.getElementById('tooltip-template');
const clone = template.content.cloneNode(true);
const tooltip = clone.querySelector('div');



function createTooltipListener(elementObj, title) {
  return {
    enter: () => {
      tooltip.querySelector('h3').textContent = title;
      tooltip.querySelector('p').textContent = elementObj.text;
      elementObj.element.appendChild(tooltip);
      elementObj.element.style.zIndex = '10';
      elementObj.element.style.transform = 'scale(1.1)';
    },
    leave: () => {
      if (tooltip.parentElement) {
        elementObj.element.style.zIndex = '1';
        tooltip.parentElement.removeChild(tooltip);
      }
      elementObj.element.style.transform = 'scale(1)';
    }
  };
}

element.forEach((elementObj, i) => {
  const isUnlocked = currentLevel >= i;
  
  if (isUnlocked) {
    elementObj.element.textContent = i + 1;
  } else {
    elementObj.element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="35" width="20" viewBox="0 0 384 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"/></svg>';
  }
  
  const tooltipText = isUnlocked ? elementObj.title : lockText;
  const listeners = createTooltipListener(elementObj, tooltipText);
  
  elementObj.element.addEventListener('mouseenter', listeners.enter);
  elementObj.element.addEventListener('mouseleave', listeners.leave);
});
