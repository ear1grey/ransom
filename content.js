function walk(el) {
  if (el.nodeType === Node.TEXT_NODE) {
    const text = el.textContent;
    let html = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word === ' ') {
        html += ' ';
      } else {
        const parts = splitWord(word);
        for (const part of parts) {
          html += `<span style="${randomStyle(word)}">${part}</span>`;
        }
      }
    }

    const node = document.createElement('span');
    el.parentNode.insertBefore(node, el);
    el.parentNode.removeChild(el);
    node.outerHTML = html;
  } else {
    if (el.tagName === 'IMG') {
      el.style = `${rndClipPath()}; transform: rotate(${Math.random() * 6 - 3}deg);}`;
    } else {
      const kids = Array.from(el.childNodes);
      for (const child of kids) {
        walk(child);
      }
    }
  }
}

function splitWord(word) {
  const parts = [];
  while (word.length > 0) {
    const partLength = Math.floor(Math.random() * word.length) + 1;
    parts.push(word.substring(0, partLength));
    word = word.substring(partLength);
  }
  return parts;
}

function randomStyle(c) {
  return `${setMargin(c)}; ${setFilter()}; ${setFontFamily(c)}; ${setBoxShadow()}; ${setTransform()}; ${setBackground()}; }`;
}

function setTransform() {
  return `transform: scale(0.9) ${rndTranslate()} rotateY(${Math.random() * 80 - 40}deg) rotateX(${Math.random() * 8 - 4}deg) rotateZ(${Math.random() * 16 - 8}deg)`;
}

function setMargin(c) {
  return `margin-right: ${c.endsWith(' ') ? '0.5em;' : 'inherit'}`;
}

function rndTranslate() {
  return `translate(${Math.random(60)}px, ${Math.random(60)}px)`;
}

function setBoxShadow() {
  return `box-shadow: ${Math.random() * 3}px ${Math.random() * 3}px ${3 + Math.random() * 3}px rgba(0,0,0,0.3);`;
}

const commonFonts = ['Andale Mono', 'Arial Black', 'Arial', 'Avant Garde', 'Bookman', 'Brush Script MT', 'Comic Sans MS', 'Courier New', 'Engagement', 'Garamond', 'Georgia', 'Helvetica Neue', 'Helvetica', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Monaco', 'Optima', 'Palatino', 'Plaster', 'Schoolbook', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'];

const availableFonts = commonFonts.filter(isFontAvailable);

function isFontAvailable(fontName) {
  const element = document.createElement('span');
  element.style.fontFamily = fontName;
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.textContent = 'abcdefghijklmnopqrstuvwxyz0123456789';
  document.body.appendChild(element);

  const computedStyle = window.getComputedStyle(element);
  const isAvailable = computedStyle.fontFamily.toLowerCase().includes(fontName.toLowerCase());

  document.body.removeChild(element);

  return isAvailable;
}

function setFontFamily() {
  const font = availableFonts[Math.floor(Math.random() * availableFonts.length)];
  return `font-family: ${font};`;
}

function setFilter() {
  return `filter: blur(${Math.random() * 1}px)`;
}

function rndClipPath() {
  return `clip-path: polygon(
    ${Math.random() * 10}% ${Math.random() * 10}%,
    ${90 + Math.random() * 10}% ${Math.random() * 10}%,
    ${90 + Math.random() * 10}% ${90 + Math.random() * 10}%,
    ${Math.random() * 10}% ${90 + Math.random() * 10}%)`;
}

function setBackground() {
  const r = 225 + Math.random() * 30;
  const g = 225 + Math.random() * 30;
  const b = 225 + Math.random() * 30;
  return `background-color: rgb(${r}, ${g}, ${b}) !important;`;
}

walk(document.body);
