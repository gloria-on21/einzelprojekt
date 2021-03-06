 import * as Ballmuster from 'Ballmuster';
 console.log(Ballmuster);

function GetRandomFloat(min:number, max:number):number{ //Hier werden random Zahlen erzeugt, die die Bewegung der Partikel bestimmen
    return Math.random() * (max - min ) + min
}
function GetRandomInt(min:number, max:number):number{ // Hier werden random Zahlen erzeugt, die von 0 bis zur Bildbreite oder Bildhöhe verlaufen
  return Math.floor(GetRandomFloat(min,max))  
}
//Hier werdem die Eigenschaften der Funktionen der Simulation festgelegt
interface ISimulatable {
    Update(): void
    Draw(ctx: CanvasRenderingContext2D):void
}

//ermöglicht Partikel im Bild

class Particle implements ISimulatable {
    x= 0; y= 0 
    dx= 0.1; dy= 0.1; // Geschwindigkeit
    radius = 10; // Radius von den Bällen

    constructor(private b: number, private h: number, private color:string){ // In dem Konstruktor werden Koordinaten, der Radius und die Geschwindigkeit der Bewegung übergeben. In den Parameter werden die Höhe, Breite und die Farbe der Partikel übergeben
        this.x = GetRandomFloat(0, b)
        this.y = GetRandomFloat(0, h)
        this.dx = GetRandomFloat(-0.2, 0.2 )
        this.dy = GetRandomFloat(-0.2, 0.2 )
        this.radius = GetRandomFloat( 5, 20 )
    }
    Update(): void {
        //hier werden die neuen Positionen berechnet
       this.x += this.dx
       this.y += this.dy
        // Hier wird kontrolliert, dass die Punkte nicht aus dem Bild laufen
       if(this.x + this.radius >= this.b){
           this.dx = -this.dx
           this.x = this.b -this.radius
       }
       if (this.x -this.radius <= 0){
           this.dx = -this.dx
           this.x = 0 + this.radius // sorgt dafür, dass die Wände nur berührt werden und es keine halben Kreise gibt
       }
       if(this.y + this.radius >= this.h){
        this.dy = -this.dy
        this.y = this.h -this.radius
        }
        if (this.y -this.radius <= 0){
            this.dy = -this.dy
            this.y = 0 + this.radius // sorgt dafür, dass die Wände nur berührt werden und es keine halben Kreise gibt
        }

        }
    Draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color //Hier bekommt der canvas seine Farbe 
        ctx.beginPath() //Hier beginnt die Zeichnung
        ctx.arc(this.x, this.y, this.radius, 0.0, 2 * Math.PI) //Hier werden die Kreise gezeichnet
        ctx.fill() //und ausgefüllt
    }


}

class Linien implements ISimulatable { // In der Linienklasse wird das Linienmuster gezeichnet
    x= 0; y= 0; neuesY= 0; neuesX = 0; //Hier brauchen wir zwei x und y Koordinaten. Da wir ja möchten, dass die Linien sich schneiden, deswegen ist es wichtig ein neues x und y zu berechnen, damit die Linien nicht parallel verlaufen

    constructor(private b: number, private h: number, private color:string){
        this.x = GetRandomFloat(0, b)
        this.y = GetRandomFloat(0, h)
        this.neuesY = GetRandomFloat(0, h)
        this.neuesX = GetRandomFloat(0, b)
    }
    Update(): void {
        //hier werden die neuen Positionen berechnet
       
        }
    Draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color
        ctx.moveTo(0,this.y)
        ctx.lineTo(this.b,this.neuesY)
        ctx.moveTo(this.x,0)
        ctx.lineTo(this.neuesX,this.h)
        ctx.stroke()
    }

}
const LinienCount = 50
class Linienmuster implements ISimulatable {
    //Array in dem wir unsere Partikel speichern
   
   linien: Linien[] = []
   constructor(private breite:number, private hoehe:number){

   const farbe1= getOptionErsteFarbe()
   const farbe2= getOptionZweiteFarbe()
   const farbe3= getOptionDritteFarbe()
   const farbe4= getOptionVierteFarbe()
   const farbe5= getOptionFuenfteFarbe()
   const ColorPalette = [[farbe1, farbe2 ,farbe3, farbe4 ,farbe5]]
   const k = GetRandomInt(0,ColorPalette.length)
   const pal = ColorPalette
   for( var i = 0; i< LinienCount; i++){
       const m = GetRandomInt(0,ColorPalette[0].length)
       const color = ColorPalette[0][m]
       this.linien.push(new Linien(breite,hoehe,color))
   }
    }
   Update(): void {
      this.linien.forEach(p => p.Update()) 
   }

   Draw(ctx: CanvasRenderingContext2D): void {
       //hier wird der Hintergrund gezeichnet
       let hintergrundfarbe

      hintergrundfarbe = getOption();
      ctx.fillStyle = hintergrundfarbe
      ctx.fillRect(0,0,this.breite, this.hoehe)

      //hier wird alles gezeichnet

      this.linien.forEach(p => p.Draw(ctx))
   }
}
const ParticleCount = 350;
class Ballmuster implements ISimulatable {
     //Array in dem wir unsere Partikel speichern
    
    particles: Particle[] = []
    constructor(private breite:number, private hoehe:number){

    const farbe1= getOptionErsteFarbe()
    const farbe2= getOptionZweiteFarbe()
    const farbe3= getOptionDritteFarbe()
    const farbe4= getOptionVierteFarbe()
    const farbe5= getOptionFuenfteFarbe()
    const ColorPalette = [[farbe1, farbe2 ,farbe3, farbe4 ,farbe5]]
    const k = GetRandomInt(0,ColorPalette.length)
    const pal = ColorPalette
    for( var i = 0; i< ParticleCount; i++){
        const m = GetRandomInt(0,ColorPalette[0].length)
        const color = ColorPalette[0][m]
        this.particles.push(new Particle(breite,hoehe,color))
    }
     }
    Update(): void {
       this.particles.forEach(p => p.Update()) 
    }

    Draw(ctx: CanvasRenderingContext2D): void {
        //hier wird der Hintergrund gezeichnet
        let hintergrundfarbe

       hintergrundfarbe = getOption();
       ctx.fillStyle = hintergrundfarbe
       ctx.fillRect(0,0,this.breite, this.hoehe)
       //hier wird alles gezeichnet
       this.particles.forEach(p => p.Draw(ctx))
    }

}
class LinienmusterOhneHintergrund implements ISimulatable {
    //Array in dem wir unsere Partikel speichern
   
   particles: Particle[] = []
   constructor(private breite:number, private hoehe:number){

   const farbe1= getOptionErsteFarbe()
   const farbe2= getOptionZweiteFarbe()
   const farbe3= getOptionDritteFarbe()
   const farbe4= getOptionVierteFarbe()
   const farbe5= getOptionFuenfteFarbe()
   const ColorPalette = [[farbe1, farbe2 ,farbe3, farbe4 ,farbe5]]
   const k = GetRandomInt(0,ColorPalette.length)
   const pal = ColorPalette
   for( var i = 0; i< ParticleCount; i++){
       const m = GetRandomInt(0,ColorPalette[0].length)
       const color = ColorPalette[0][m]
       this.particles.push(new Particle(breite,hoehe,color))
   }
    }
   Update(): void {
      this.particles.forEach(p => p.Update()) 
   }

   Draw(ctx: CanvasRenderingContext2D): void {
       //hier wird der Hintergrund gezeichnet

      ctx.fillStyle = 'transparent'
      ctx.fillRect(0,0,this.breite, this.hoehe)
      ctx.moveTo(100, 100);

      //hier wird alles gezeichnet

      this.particles.forEach(p => p.Draw(ctx))
   }

}
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let interval:any;
function main() {
    var rangeslider1 = document.getElementById("sliderRange1") as HTMLSelectElement;
    var rangeslider2 = document.getElementById("sliderRange2") as HTMLSelectElement;
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
    if (muster == "kreise"){
        const sim = new Ballmuster(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animation sich neuladet
        const updateFrameRate = 60;
        interval = setInterval(() => {
            sim.Update();
            sim.Draw(ctx);
        }, 1000 / updateFrameRate);
    }

    if (muster =="linienOhneHintergrund"){

        const sim = new LinienmusterOhneHintergrund(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animtion sich neuladet
        const updateFrameRate = 60;
        interval = setInterval(() => {
            sim.Update();
           
            sim.Draw(ctx);
        }, 1000 / updateFrameRate);
    }

    if (muster =="linien"){

        const sim = new Linienmuster(breite, hoehe);
        //Hier legen wir die Framerate fest mit der die Animation sich neuladet
        
        sim.Draw(ctx);
    }
}

const button = document.getElementById("btn1")

if (button != null){

    button.onclick = main;
}

const saveButton = document.getElementById("btn2")

if (saveButton != null){
    saveButton.onclick = bildSpeichern
}

//Hier werden die ausgewähltem Farben ausgelesen uns zurückgegeben
 function getOption() {
    const selectElement = document.querySelector('#hintergrundsfarbe')  as HTMLSelectElement;
    const hintergrundfarbe = selectElement.options[selectElement.selectedIndex].value;
    return hintergrundfarbe
} 

function getOptionErsteFarbe(){
    const selectElement = document.querySelector('#farbe1')  as HTMLSelectElement;
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe

}
function getOptionZweiteFarbe(){
    const selectElement = document.querySelector('#farbe2')  as HTMLSelectElement;
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe

}
function getOptionDritteFarbe(){
    const selectElement = document.querySelector('#farbe3')  as HTMLSelectElement;
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe

}
function getOptionVierteFarbe(){
    const selectElement = document.querySelector('#farbe4')  as HTMLSelectElement;
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe

}
function getOptionFuenfteFarbe(){
    const selectElement = document.querySelector('#farbe5')  as HTMLSelectElement;
    const farbe = selectElement.options[selectElement.selectedIndex].value;
    return farbe

}
function bildSpeichern(){

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  

    window.location.href=image; 
}

function getOptionMuster(){
    const selectElement = document.querySelector('#muster')  as HTMLSelectElement;
    const muster = selectElement.options[selectElement.selectedIndex].value;
    return muster

}

