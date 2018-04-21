//
// Original Author: Gilbert Duval
//
// Hacked about by: Laust Frederiksen ( With various intentions!! :-) ;-) ) 
//
//


function getParameterDefinitions() {
 return [
     {name: `patron`,
      type: `choice`,
   caption: `Patron :`,
  captions: [ `Catalan 1`, `Dodecaedre`, `Boite Octo.`, `Tetraedre`, `Icosaedre`, `Cube`, `Blocktagon:Jack`, `Petit rhombicosidodecaedre`, `Icosaedre tronque`],
    values: [ `catalan1`, `dodecaedre`, `boiteOctogonale`, `tetraedre`, `icosaedre`, `acube`, `bt_jack`, `pt_rhombicosidodecaedre`, `icosaedreTronque`],
   initial: `catalan1`}, 
     {name: `rendu`,
      type: `choice`,
   caption: `Rendu :`,
  captions: [ `Developpement`, `Net Numbered`, `2d pour svg`],
    values: [ `rendu`, `rendun`, `rendu2d`],
   initial: `rendu`}];}


const main = (params) => {
 let p = [], l, i;
 
 l = eval(`${params.patron}()`);

 if(l[0][0] > 0) p.push(polyR(l[0][0], l[0][1]).rotateZ(l[0][2]));
 else p.push(polyC(-l[0][0]).translate(l[0][1]));
 for(i = 1; i < l.length; i++) {
  if(l[i][0][0] > 0) p.push(attache(polyR(l[i][0][0], l[i][0][1]), l[i][1], p[l[i][2]], l[i][3]));
  else p.push(attache(polyC(-l[0][0]), l[i][1], p[l[i][2]], l[i][3]))}

 return eval(`${params.rendu}(p)`);};


const tetraedre = () => {
 const s = [3, 15];
 return [
  [...s, 45],
  ...[0,1,2].map(i => [s, 0, 0, i])];};


const acube = () => {
 const s = [4, 10];
 return [
  [...s, 180],
  ...[0,1,2,3].map(i => [s, 0, 0, i]),
  [s, 0, 4, 2]];};


const dodecaedre = () => {
 const s = [5, 10];
 return [
  [...s, 225],
  ...[0,1,2,3,4].map(i => [s, 0, 0, i]),
  [s, 0, 5, 2],    
  [s, 0, 6, 3],    
    ...[1,2,3,4].map(i => [s, 0, 7, i])];};


const bt_jack = () => {
 const s = 10;
 return [
  [3, s, 45],
  ...[[4,  0, 2],
      [3,  1, 1],
      [3,  1, 2],
      [4,  2, 1],
      [3,  4, 3],
      [4,  5, 2],
      [3,  6, 1],
      [4,  7, 1],
      [3,  8, 2],
      [3,  8, 3],
      [4, 10, 2],
      [4,  9, 2]].map(i => [[i[0], s], 0, i[1], i[2]])];};


const boiteOctogonale = () => {
 const s = 10;
 return [
  [8, s, 22.5],
  ...[[4,  0, 0],
      [4,  0, 2],
      [4,  0, 4],
      [4,  0, 6],
      [6,  1, 1],
      [6,  1, 3],
      [8,  1, 2],
      [4,  7, 2],
      [4,  7, 6],
      [8,  2, 2],
      [8,  4, 2],
      [6,  3, 1],
      [6,  3, 3],
      [8,  3, 2],
      [4, 14, 2],
      [4, 14, 6]].map(i => [[i[0], s], 0, i[1], i[2]])];};


const icosaedre = () => {
 const s = [3, 15];
 return [
  [...s, 45],
  ...[[ 0, 2],
      [ 1, 1],
      [ 2, 2],
      [ 3, 1],
      [ 4, 1],
      [ 5, 1],
      [ 6, 2],
      [ 4, 2],
      [ 8, 1],
      [ 8, 2],
      [ 9, 1],
      [ 9, 2],
      [11, 2],
      [12, 1],
      [10, 1],
      [10, 2],
      [14, 2],
      [15, 2],
      [16, 1]].map(i => [s, 0, ...i])];};


const  catalan1 = () => {
 const s = -1;
 return [
  [s, [-90, 0]],
  [s, 3,  0, 0],
  [s, 2,  1, 1],
  [s, 3,  2, 0],
  [s, 3,  3, 0],
  [s, 3,  4, 0],
  [s, 3,  5, 0],
  [s, 2,  4, 1],
  [s, 0,  7, 3],
  [s, 1,  8, 2],
  [s, 0,  9, 3],
  [s, 1, 10, 2],
  [s, 3,  7, 0],
  [s, 3, 12, 0],
  [s, 3, 13, 0],
  [s, 1, 14, 2],
  [s, 0, 15, 3],
  [s, 1, 16, 2],
  [s, 0, 17, 3],
  [s, 2, 14, 1],
  [s, 3, 19, 0],
  [s, 3, 20, 0],
  [s, 2, 21, 1],
  [s, 3, 22, 0],
  [s, 2, 13, 1],
  [s, 3, 24, 0],
  [s, 3, 25, 0],
  [s, 2, 26, 1],
  [s, 3, 27, 0],
  [s, 3, 28, 0],
  [s, 1, 13, 2],
  [s, 0, 30, 3],
  [s, 1, 31, 2],
  [s, 0, 32, 3],
  [s, 2, 12, 1],
  [s, 3, 34, 0],
  [s, 2, 35, 1],
  [s, 3, 36, 0],
  [s, 3, 37, 0],
  [s, 3, 35, 0],
  [s, 2, 39, 1],
  [s, 3, 40, 0],
  [s, 3, 41, 0],
  [s, 1, 12, 2],
  [s, 0, 43, 3],
  [s, 0, 44, 3],
  [s, 1, 45, 2],
  [s, 0, 46, 3],
  [s, 1, 47, 2],
  [s, 3, 43, 0],
  [s, 3, 49, 0],
  [s, 2, 50, 1],
  [s, 3, 51, 0],
  [s, 3, 52, 0],
  [s, 1, 53, 1],
  [s, 3, 54, 3]];};


const icosaedreTronque = () => {
 const s = 10, t = [5, s], u = [6, s];
 return [
  [...u, 12],
        ...[0, 1, 2, 3, 4, 5].map(i => [[5 + (i % 2), 10], 0, 0, i]),
//               ...[1, 3, 5].map(i => [[u, 0, i, 2], [u, 0, i + 1, 2], [t, 0, i + 1, 3]]),
[u, 0, 1, 2], [u, 0, 1 + 1, 2], [t, 0, 1 + 1, 3],
[u, 0, 3, 2], [u, 0, 3 + 1, 2], [t, 0, 3 + 1, 3],
[u, 0, 5, 2], [u, 0, 5 + 1, 2], [t, 0, 5 + 1, 3],
                  ...[7, 13].map(i => [t, 0, i, 4]),
 [t, 0, 11, 3],
 ...[10, 12, 15, 18, 21, 20].map(i => [u, 0, i, 3]),
              ...[8, 11, 14].map(i => [u, 0, i, 4]),
             ...[19, 26, 27].map(i => [t, 0, i, 3]),
 [u, 0, 28, 3]];};



const pt_rhombicosidodecaedre = () => {
 const s = 10, t = [3, s], u = [4, s], v = [5, s];
 return [
  [...v, -30],             ...[0, 1, 2, 3, 4].map(i => [u, 0, 0, i]),
                           ...[1, 2, 3, 4, 5].map(i => [t, 0, i, 3]),
                           ...[1, 2, 3, 4, 5].map(i => [v, 0, i, 2]),
                      ...[11, 12, 13, 14, 15].map(i => [u, 0, i, 2]),
                      ...[11, 12, 13, 14, 15].map(i => [u, 0, i, 3]),
                      ...[11, 12, 13, 14, 15].map(i => [u, 0, i, 4]),
  ...[16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(i => [t, 0, i, 3]),
                      ...[19, 24, 25, 21, 22].map(i => [v, 0, i, 2]),
                      ...[41, 42, 43, 44, 45].map(i => [u, 0, i, 2]),
                          ...[41, 42, 43, 44].map(i => [u, 0, i, 3]),
                          ...[46, 47, 48, 49].map(i => [t, 0, i, 3]),
  [v, 0, 47, 2],
  [u, 0, 41, 4],
  [t, 0, 47, 1]];};


const rendu2d = p => p.map(p => polygon(p));


const rendu = p => p.map(p => pose(p));

const rendun = p => {
 let r = [], t, b, pa, c;

 for(let i in p) {
  r.push(pose(p[i]));

  t = texte(i, 0, 0, 0.125).setColor(css2rgb(`black`));
  b = t.getBounds();
  r.push(t.translate(centre(p[i].points).minus((b[1].minus(b[0])).dividedBy(2))));
  pa = p[i].points;
  for(j=0; j<pa.length; j++) {
   c = centre([pa[j], pa[(j+1) % pa.length], centre(pa)]);
   r.push(texte(j.toString(), 0, 0, 0.075).translate(c).setColor(css2rgb(`blue`)));}}
 return r;};


const centre  = d => {
 let r = new CSG.Vector2D([0, 0]);

 for(let i=0; i<d.length; i++) {r = r.plus(d[i]);}
 r = r.dividedBy(d.length);
 return r;};


const texte = (c, x, y, e) => union(vector_text(x, y, c).map(p => rectangular_extrude(p, {w: 2, h: 2}).scale(e)));
 

const polyC = n => {
 switch (n) {
  case 1: { return new CSG.Path2D([[0, 16], [10, 0], [0, -6], [-10, 0]], close).scale(3/4);}}};


const attache = (p1, p1pt0, p0, p0pt0) => {
 p0Pts = [p0pt0];
 p1Pts = [p1pt0];
 
 p0Pts.push((p0pt0 + 1)%p0.points.length);
 p1Pts.push((p1pt0 + 1)%p1.points.length);
        
 ptDest = p0.points[p0Pts[0]];
 ptOrig = p1.points[p1Pts[1]];
 p1 = p1.translate(ptDest.minus(ptOrig));
    
 g_prec = 0.01;
 ra = 0;
 p1_s = p1;
 pt0 = p0.points[p0Pts[1]];
 do {
  ra += g_prec;
  p1 = p1_s.rotate(p1_s.points[p1Pts[1]], [0, 0, 1], ra);
  delta = pt0.distanceTo(p1.points[p1Pts[0]]);} while ((ra < 360)&&(delta>g_prec));

  return p1};


const pose = p => {

 switch(p.points.length) {
  case 3: col = `tomato`; break;
  case 4: col = `lightBlue`; break;
  case 5: col = `maroon`; break;
  case 6: col = `orange`; break;
  case 8: col = `tan`; break;
  default: col = `red`;}

 return union(linear_extrude({height:0.2}, p.expandToCAG(0.1, 16)).setColor(css2rgb(`black`)), linear_extrude({height:0.1}, p.innerToCAG()).setColor(css2rgb(col)));};


const polyR = (n, l = 10, x = 0, y = 0) => {
 let chemin, p0;
    
 l = l/(2*Math.sin(Math.PI/n));
 p0 = [x + l*Math.cos(0), y + l*Math.sin(0)];  
 chemin = new CSG.Path2D([ p0 ]);
    
 for(let i = 1 ; i <= n ; i++) {
  chemin = chemin.appendPoint([x + l*Math.cos(i*2*Math.PI/n), y + l*Math.sin(i*2*Math.PI/n)]);}
 chemin = chemin.appendPoint(p0);
 chemin = chemin.close();

 return chemin.rotateZ(45);};
 
