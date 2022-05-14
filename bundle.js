"use strict";
function GetRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function GetRandomInt(min, max) {
    return Math.floor(GetRandomFloat(min, max));
}
//ermöglicht Partikel im Bild
class Particle {
    constructor(b, h, color) {
        this.b = b;
        this.h = h;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.dx = 0.1;
        this.dy = 0.1; // Geschwindigkeit
        this.radius = 10;
        this.x = GetRandomFloat(0, b);
        this.y = GetRandomFloat(0, h);
        this.dx = GetRandomFloat(-0.2, 0.2);
        this.dy = GetRandomFloat(-0.2, 0.2);
        this.radius = GetRandomFloat(5, 20);
    }
    Update() {
        //hier werden die neuen Positionen berechnet
        this.x += this.dx;
        this.y += this.dy;
        // Hier wird kontrolliert, dass die Punkte nicht aus dem Bild laufen
        if (this.x + this.radius >= this.b) {
            this.dx = -this.dx;
            this.x = this.b - this.radius;
        }
        if (this.x - this.radius <= 0) {
            this.dx = -this.dx;
            this.x = 0 + this.radius; // sorgt dafür, dass die Wände nur berührt werden und es keine halben Kreise gibt
        }
        if (this.y + this.radius >= this.h) {
            this.dy = -this.dy;
            this.y = this.h - this.radius;
        }
        if (this.y - this.radius <= 0) {
            this.dy = -this.dy;
            this.y = 0 + this.radius; // sorgt dafür, dass die Wände nur berührt werden und es keine halben Kreise gibt
        }
    }
    Draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0.0, 2 * Math.PI);
        ctx.fill();
    }
}
class Linien {
    constructor(b, h, color) {
        this.b = b;
        this.h = h;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.neuesY = 0;
        this.neuesX = 0;
        this.x = GetRandomFloat(0, b);
        this.y = GetRandomFloat(0, h);
        this.neuesY = GetRandomFloat(0, h);
        this.neuesX = GetRandomFloat(0, b);
    }
    Update() {
        //hier werden die neuen Positionen berechnet
    }
    Draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.moveTo(0, this.y);
        ctx.lineTo(this.b, this.neuesY);
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.neuesX, this.h);
        ctx.stroke();
    }
}
const LinienCount = 50;
class Linienmuster {
    constructor(breite, hoehe) {
        this.breite = breite;
        this.hoehe = hoehe;
        //Array in dem wir unsere Partikel speichern
        this.linien = [];
        const farbe1 = getOptionErsteFarbe();
        const farbe2 = getOptionZweiteFarbe();
        const farbe3 = getOptionDritteFarbe();
        const farbe4 = getOptionVierteFarbe();
        const farbe5 = getOptionFuenfteFarbe();
        const ColorPalette = [[farbe1, farbe2, farbe3, farbe4, farbe5]];
        const k = GetRandomInt(0, ColorPalette.length);
        const pal = ColorPalette;
        for (var i = 0; i < LinienCount; i++) {
            const m = GetRandomInt(0, ColorPalette[0].length);
            const color = ColorPalette[0][m];
            this.linien.push(new Linien(breite, hoehe, color));
        }
    }
    Update() {
        this.linien.forEach(p => p.Update());
    }
    Draw(ctx) {
        //hier wird der Hintergrund gezeichnet
        let hintergrundfarbe;
        hintergrundfarbe = getOption();
        ctx.fillStyle = hintergrundfarbe;
        ctx.fillRect(0, 0, this.breite, this.hoehe);
        //hier wird alles gezeichnet
        this.linien.forEach(p => p.Draw(ctx));
    }
}
const ParticleCount = 350;
class Ballmuster {
    constructor(breite, hoehe) {
        this.breite = breite;
        this.hoehe = hoehe;
        //Array in dem wir unsere Partikel speichern
        this.particles = [];
        const farbe1 = getOptionErsteFarbe();
        const farbe2 = getOptionZweiteFarbe();
        const farbe3 = getOptionDritteFarbe();
        const farbe4 = getOptionVierteFarbe();
        const farbe5 = getOptionFuenfteFarbe();
        const ColorPalette = [[farbe1, farbe2, farbe3, farbe4, farbe5]];
        const k = GetRandomInt(0, ColorPalette.length);
        const pal = ColorPalette;
        for (var i = 0; i < ParticleCount; i++) {
            const m = GetRandomInt(0, ColorPalette[0].length);
            const color = ColorPalette[0][m];
            this.particles.push(new Particle(breite, hoehe, color));
        }
    }
    Update() {
        this.particles.forEach(p => p.Update());
    }
    Draw(ctx) {
        //hier wird der Hintergrund gezeichnet
        let hintergrundfarbe;
        hintergrundfarbe = getOption();
        ctx.fillStyle = hintergrundfarbe;
        ctx.fillRect(0, 0, this.breite, this.hoehe);
        //hier wird alles gezeichnet
        this.particles.forEach(p => p.Draw(ctx));
    }
}
class LinienmusterOhneHintergrund {
    constructor(breite, hoehe) {
        this.breite = breite;
        this.hoehe = hoehe;
        //Array in dem wir unsere Partikel speichern
        this.particles = [];
        const farbe1 = getOptionErsteFarbe();
        const farbe2 = getOptionZweiteFarbe();
        const farbe3 = getOptionDritteFarbe();
        const farbe4 = getOptionVierteFarbe();
        const farbe5 = getOptionFuenfteFarbe();
        const ColorPalette = [[farbe1, farbe2, farbe3, farbe4, farbe5]];
        const k = GetRandomInt(0, ColorPalette.length);
        const pal = ColorPalette;
        for (var i = 0; i < ParticleCount; i++) {
            const m = GetRandomInt(0, ColorPalette[0].length);
            const color = ColorPalette[0][m];
            this.particles.push(new Particle(breite, hoehe, color));
        }
    }
    Update() {
        this.particles.forEach(p => p.Update());
    }
    Draw(ctx) {
        //hier wird der Hintergrund gezeichnet
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, this.breite, this.hoehe);
        ctx.moveTo(100, 100);
        //hier wird alles gezeichnet
        this.particles.forEach(p => p.Draw(ctx));
    }
}
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let interval;
function main() {
    var rangeslider1 = document.getElementById("sliderRange1");
    var rangeslider2 = document.getElementById("sliderRange2");
    const valueBreite = parseInt(rangeslider1.value) * 10;
    const valueHoehe = parseInt(rangeslider2.value) * 10;
    const breite = 600 + valueBreite;
    const hoehe = 600 + valueHoehe;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    if (!canvas)
        return;
    if (interval)
        clearInterval(interval);
    canvas.width = breite;
    canvas.height = hoehe;
    canvas.style.position = 'absolute';
    canvas.style.top = "250px";
    canvas.style.left = "350px";
    const muster = getOptionMuster();
    if (muster == "kreise") {
        const sim = new Ballmuster(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animation sich neuladet
        const updateFrameRate = 60;
        interval = setInterval(() => {
            sim.Update();
            sim.Draw(ctx);
        }, 1000 / updateFrameRate);
    }
    if (muster == "linienOhneHintergrund") {
        const sim = new LinienmusterOhneHintergrund(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animtion sich neuladet
        const updateFrameRate = 60;
        interval = setInterval(() => {
            sim.Update();
            sim.Draw(ctx);
        }, 1000 / updateFrameRate);
    }
    if (muster == "linien") {
        const sim = new Linienmuster(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animation sich neuladet
        sim.Draw(ctx);
    }
}
const button = document.getElementById("btn1");
if (button != null) {
    button.onclick = main;
}
const saveButton = document.getElementById("btn2");
if (saveButton != null) {
    saveButton.onclick = bildSpeichern;
}
//Hier werden die ausgewähltem Farben ausgelesen uns zurückgegeben
function getOption() {
    const selectElement = document.querySelector('#hintergrundsfarbe');
    const hintergrundfarbe = selectElement.options[selectElement.selectedIndex].value;
    return hintergrundfarbe;
}
function getOptionErsteFarbe() {
    const selectElement = document.querySelector('#farbe1');
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe;
}
function getOptionZweiteFarbe() {
    const selectElement = document.querySelector('#farbe2');
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe;
}
function getOptionDritteFarbe() {
    const selectElement = document.querySelector('#farbe3');
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe;
}
function getOptionVierteFarbe() {
    const selectElement = document.querySelector('#farbe4');
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe;
}
function getOptionFuenfteFarbe() {
    const selectElement = document.querySelector('#farbe5');
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe;
}
function bildSpeichern() {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
}
function getOptionMuster() {
    const selectElement = document.querySelector('#muster');
    const muster = selectElement.options[selectElement.selectedIndex].value;
    return muster;
}
