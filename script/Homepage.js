let currentLevel = Number(localStorage.getItem('currentLevel') || 0);


const enter = document.getElementById('enter');
const classroom1 = document.getElementById('classroom1');
const classroom2 = document.getElementById('classroom2');
const classroom3 = document.getElementById('classroom3');
const classroom4 = document.getElementById('classroom4');
const outside = document.getElementById('outside');
const mapWrapper = document.getElementById('map-wrapper');
const svg = document.getElementById('connection-lines');

const element = [
  {
    element : enter,
    title : 'Le point de départ de votre aventure pour découvrir la démarche NIRD',
    text : 'Sensibiliser les équipes éducatives et les élèves à la sobriété numérique',
    pageUrl : 'pages/page1.html'
  }, 
  {
    element: classroom1,
    title: 'Encourager le réemploi et le reconditionnement du matériel',
    pageUrl: 'pages/page2.html'
  },
  {
    element: classroom2, 
    title: 'Promouvoir l’usage de Linux afin de lutter contre l’obsolescence programmée',
    pageUrl: 'pages/page3.html'
  }, 
  {
    element: classroom3, 
    title: 'Mutualiser les ressources et outils libres via la forge des communs numériques éducatifs',
    pageUrl: 'pages/page4.html'
  }, 
  {element: classroom4, 
    title: 'Accompagner les établissements et collectivités dans une transition numérique écoresponsable',
    pageUrl: 'pages/page5.html'
  }, 
  {
    element: outside,
    title: 'Favoriser la co-construction de solutions numériques locales,ouvertes et autonomes',
    pageUrl: 'pages/page6.html'
  }
];
const lockText = 'Finnissez le niveau precedent pour debloquer ce niveau';

const template = document.getElementById('tooltip-template');
let tooltip = null;

if (template) {
  const clone = template.content.cloneNode(true);
  tooltip = clone.querySelector('div');
}

function createTooltipListener(elementObj, title) {
  return {
    enter: () => {
      if (!tooltip) return;
      tooltip.querySelector('h3').textContent = title;
      tooltip.querySelector('p').textContent = elementObj.text;
      elementObj.element.appendChild(tooltip);
      elementObj.element.style.zIndex = '10';
      elementObj.element.style.transform = 'scale(1.1)';
    },
    leave: () => {
      if (!tooltip) return;
      if (tooltip.parentElement) {
        elementObj.element.style.zIndex = '2';
        tooltip.parentElement.removeChild(tooltip);
      }
      elementObj.element.style.transform = 'scale(1)';
    }
  };
}

// Seulement exécuter si on est sur la page d'accueil (éléments existent)
if (enter && classroom1 && classroom2 && classroom3 && classroom4 && outside) {
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
    elementObj.element.addEventListener('click', () => {
      if (isUnlocked && elementObj.pageUrl) {
        window.location.href = elementObj.pageUrl;
      }
    });
  });
}

let progressFill = document.getElementById('progress-fill');
let progressMessage = document.getElementById('progress-message');

const messages = [
  'Commencez votre aventure !',
  'Bon début ! Continuez comme ça !',
  'Vous êtes sur la bonne voie !',
  'Bravo ! Plus que quelques étapes !',
  'Vous y êtes presque !',
  'Félicitations ! Mission accomplie ! 🎉'
];

function updateProgress() {
  const progressFill = document.getElementById('progress-fill');
  const progressMessage = document.getElementById('progress-message');
  
  if (!progressFill || !progressMessage) return;
  
  const progress = (currentLevel / (element.length - 1)) * 100;
  progressFill.style.width = progress + '%';
  
  const progressBar = document.getElementById('progress-bar');
  const barWidth = progressBar.offsetWidth;
  const messageWidth = progressMessage.offsetWidth;
  const messagePosition = (progress / 100) * barWidth - (messageWidth / 2);
  progressMessage.style.left = messagePosition + 'px';
  progressMessage.textContent = messages[currentLevel] || messages[messages.length - 1];
}

updateProgress();

function increaseLevel() {
  currentLevel += 1;
  console.log('Level increased to:', currentLevel);
  localStorage.setItem('currentLevel', currentLevel.toString());
  window.location.href = "../HomePage.html"; 
}

function resetLevel() {
  currentLevel = 0;
  localStorage.setItem('currentLevel', '0');
  location.reload();
}

const connections = [
  ['enter', 'classroom1'],
  ['classroom1', 'classroom2'],
  ['classroom2', 'classroom3'],
  ['classroom3', 'classroom4'],
  ['classroom4', 'outside'],
];


let menu = document.getElementById("menu");
let menuContent = document.getElementById("menu-content");
let menuDropdown = document.getElementById("menu-dropdown");

if (menu && menuContent && menuDropdown) {
  menu.addEventListener("mouseenter", () => {
    menuContent.classList.remove("hidden");
    menuContent.classList.add("visible");
    menuDropdown.classList.remove("hidden");
    menuDropdown.classList.add("visible");
  });

  menu.addEventListener("mouseleave", (e) => {
    if (!menuDropdown.contains(e.relatedTarget)) {
      menuContent.classList.remove("visible");
      menuContent.classList.add("hidden");
      menuDropdown.classList.remove("visible");
      menuDropdown.classList.add("hidden");
    }
  });

  menuDropdown.addEventListener("mouseleave", () => {
    menuContent.classList.remove("visible");
    menuContent.classList.add("hidden");
    menuDropdown.classList.remove("visible");
    menuDropdown.classList.add("hidden");
  });
}



function getCenter(el, containerRect) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
  };
}

function drawConnections() {
  if (!mapWrapper || !svg) return;

  const containerRect = mapWrapper.getBoundingClientRect();
  svg.setAttribute('width', containerRect.width);
  svg.setAttribute('height', containerRect.height);
  svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

  while (svg.firstChild) svg.removeChild(svg.firstChild);

  connections.forEach(([fromId, toId]) => {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (!fromEl || !toEl) return;

    const from = getCenter(fromEl, containerRect);
    const to = getCenter(toEl, containerRect);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x);
    line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x);
    line.setAttribute('y2', to.y);
    line.setAttribute('stroke', 'rgba(255,255,255,0.8)');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-dasharray', '8 8');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  });
}

const resizeObserver = new ResizeObserver(() => drawConnections());
if (mapWrapper) resizeObserver.observe(mapWrapper);
window.addEventListener('resize', drawConnections);
window.addEventListener('load', () => {
  requestAnimationFrame(drawConnections);
});