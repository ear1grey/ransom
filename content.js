console.log('Ransom Thing Running');
console.log(document.body);

function walk(el) {
	if (el.nodeType == Node.TEXT_NODE)
	{
		const text = el.textContent;
		let html = "";
		for (const c of [...text]) {
			html += `<span style="${randomStyle(c)}">${escapeHTML(c)}</span>`;
		};
		
		const node = document.createElement("span");
		el.parentNode.insertBefore(node, el);
		el.parentNode.removeChild(el);
		node.outerHTML = html;
	} else {
		const kids = Array.from(el.childNodes)
		for (const child of kids) {
			walk(child);
		};
	}
}

function escapeHTML(text) {
	var textEl = document.createElement("span");
	textEl.textContent = text;
	return textEl.innerHTML;
}

function randomStyle(c) {
	return `letter-spacing: ${spacing(c)}; font-family: ${rndFont(c)}; ${shadow()}; ${rndbg()}; transform: rotatez(${Math.random()*20-10}deg) rotatex(${Math.random()*20-10}deg) rotatey(${Math.random()*20-10}deg) ${rndTranslate()}`;
}

function spacing(c) {
	if (c === " ") {
		console.log("space");
		return `2em`;
	} else {
		return `0`;
	}
}


function rndTranslate() {
	return `translate(${Math.random(60)}px, ${Math.random(60)}px)`
}

function shadow() {
	return `box-shadow: ${Math.random()*3}px ${Math.random()*3}px ${Math.random()*3}px black`
}

const commonFonts = [
	"Arial",
	"Verdana",
	"Helvetica",
	"Tahoma",
	"Trebuchet MS",
	"Times New Roman",
	"Georgia",
	"Garamond",
	"Courier New",
	"Brush Script MT",
	"Lucida Sans",
	"Palatino",
	"Bookman",
	"Avant Garde",
	"Schoolbook",
	"Arial Black",
	"Comic Sans MS",
	"Impact",
  ];

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

function rndFont(character) {
    let font = availableFonts[Math.floor(Math.random()*availableFonts.length)];
    return font;
}

function rndbg() {
	const bg = 205+Math.random()*50;
	return `background-color: rgb(${bg}, ${bg}, ${bg});`
}

walk(document.body);
