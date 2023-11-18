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
		console.log("x", el);
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
	return `${extraSpace(c)}; ${rndBlur()}; ${rndFont(c)}; ${shadow()}; ${rndbg()}; ${rndTransform()}`;
}

function rndTransform() {
	return `transform: scale(0.9) ${rndTranslate()} rotateY(${Math.random()*80-40}deg) rotateX(${Math.random()*8-4}deg) rotateZ(${Math.random()*16-8}deg)`;
}

function extraSpace(c) {
	if (c.endsWith(" ")) {
		return `margin-right: 0.5em;`
	} else {
		return ``
	}
}

function rndTranslate() {
	return `translate(${Math.random(60)}px, ${Math.random(60)}px)`
}

function shadow() {
	return `box-shadow: ${Math.random()*3}px ${Math.random()*3}px ${3+Math.random()*3}px rgba(0,0,0,0.3);`
}

const commonFonts = [
	"Andale Mono",
	"Arial Black",
	"Arial",
	"Avant Garde",
	"Bookman",
	"Brush Script MT",
	"Comic Sans MS",
	"Courier New",
	"Engagement",
	"Garamond",
	"Georgia",
	"Helvetica Neue",
	"Helvetica",
	"Hoefler Text",
	"Impact",
	"Lucida Grande",
	"Lucida Sans",
	"Monaco",
	"Optima",
	"Palatino",
	"Plaster",
	"Schoolbook",
	"Tahoma",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana"
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
    return `font-family: ${font};`;
}

function rndBlur() {
    return `filter: blur(${Math.random()*1}px)`;
}


function rndbg() {
	const r = 205+Math.random()*50;
	const g = 205+Math.random()*50;
	const b = 205+Math.random()*50;
	return `background-color: rgb(${r}, ${g}, ${b});`;
//	return `background-color: rgb(${r}, ${g}, ${b}); background-image: url("data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
}

walk(document.body);
