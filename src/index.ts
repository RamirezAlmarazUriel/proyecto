//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './Point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;
let limit: number = 9;
let cont:number= 0;
let limit1: number = 9;
let cont1:number= 0;
let limit2: number = 9;
let cont2:number= 0;
let limit3: number = 9;
let cont3:number= 0;
let limit4: number = 9;
let cont4:number= 0;
let limit5: number = 9;
let cont5:number= 0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

//espejo
function pza1DerFunc() {
  if (cont<limit){
  let af = 10;
 	
	Rota3D.initRotate( obj.w[19], obj.w[22], af*Math.PI/180);	
	
  for (let i = 43; i <= 54; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  cont++;
	cv.setObj(obj);
  cv.paint();
}	
} 


function pza1IzqFunc() {
  if (cont1<limit1){                
  let af = -10;
 	
	Rota3D.initRotate( obj.w[19], obj.w[22], af*Math.PI/180);	
	
  for (let i = 43; i <= 54; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  cont1++;
	cv.setObj(obj);
  cv.paint();	
  
}	
}
//cajon 1
function abrircaja1() {
  if (cont2<limit2){
  let af = 10;
   
  Rota3D.initRotate( obj.w[103], obj.w[104], af*Math.PI/180);  
  
  for (let i = 118; i <= 125; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cont2++;
  cv.setObj(obj);
  cv.paint();  
}
} 

function cerrcaja1() {
  if (cont3<limit3){
  let af = -10;
  
   
  Rota3D.initRotate( obj.w[103], obj.w[104 ], af*Math.PI/180);  
  
  for (let i = 118; i <= 125; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cont3++;
  cv.setObj(obj);
  cv.paint();  
  
}
}

// cajon 2
function abrircaja2() {
  if (cont4<limit4){
  let af = 10;
   
  Rota3D.initRotate( obj.w[94], obj.w[97], af*Math.PI/180);  
  
  for (let i = 110; i <= 117; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cont4++;
  cv.setObj(obj);
  cv.paint();  
  
  }
} 

function cerrcaja2() {
  if (cont5<limit5){
  let af = -10;
   
  Rota3D.initRotate( obj.w[94], obj.w[97], af*Math.PI/180);  
  
  for (let i = 110; i <= 117; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cont5++;
  cv.setObj(obj);
  cv.paint();  
  
}
}


document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('Izq').addEventListener('click', pza1IzqFunc, false);
document.getElementById('Der').addEventListener('click', pza1DerFunc, false);
//cajones
document.getElementById('ab1').addEventListener('click', abrircaja1, false);
document.getElementById('cer1').addEventListener('click', cerrcaja1, false);
document.getElementById('ab2').addEventListener('click', abrircaja2, false);
document.getElementById('cer2').addEventListener('click', cerrcaja2, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);