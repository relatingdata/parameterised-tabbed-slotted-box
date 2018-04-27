//
// Original Author: Gilbert Duval
//
// Hacked about by: Laust Frederiksen ( With various intentions!! :-) ;-) ) 
//
//

function getParameterDefinitions() {
 return [
  [`patron`, `Patron :`,
   [ `Catalan 1`, `Dodecaedre`, `Boite Octo.`, `Tetraedre`, `Icosaedre`, `Cube`, `Blocktagon:Jack`, `Petit rhombicosidodecaedre`, `Icosaedre tronque`],
   [ `catalan1`, `dodecaedre`, `boiteOctogonale`, `tetraedre`, `icosaedre`, `acube`, `bt_jack`, `pt_rhombicosidodecaedre`, `icosaedreTronque`], `catalan1`], 
  [`rendu`, `Rendu :`,
   [ `Developpement`, `Net Numbered`, `2d pour svg`],
   [ `rendu`, `rendun`, `rendu2d`],`rendu`]]
   .map(P => true ? {name: P[0], type: `choice`, caption: P[1], captions: P[2], values: P[3], initial: P[4]}:{});}

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
 const s = -4;
 return [
  [[-90, 0]],
  [3,  0, 0],
  [2,  1, 1],
  [3,  2, 0],
  [3,  3, 0],
  [3,  4, 0],
  [3,  5, 0],
  [2,  4, 1],
  [0,  7, 3],
  [1,  8, 2],
  [0,  9, 3],
  [1, 10, 2],
  [3,  7, 0],
  [3, 12, 0],
  [3, 13, 0],
  [1, 14, 2],
  [0, 15, 3],
  [1, 16, 2],
  [0, 17, 3],
  [2, 14, 1],
  [3, 19, 0],
  [3, 20, 0],
  [2, 21, 1],
  [3, 22, 0],
  [2, 13, 1],
  [3, 24, 0],
  [3, 25, 0],
  [2, 26, 1],
  [3, 27, 0],
  [3, 28, 0],
  [1, 13, 2],
  [0, 30, 3],
  [1, 31, 2],
  [0, 32, 3],
  [2, 12, 1],
  [3, 34, 0],
  [2, 35, 1],
  [3, 36, 0],
  [3, 37, 0],
  [3, 35, 0],
  [2, 39, 1],
  [3, 40, 0],
  [3, 41, 0],
  [1, 12, 2],
  [0, 43, 3],
  [0, 44, 3],
  [1, 45, 2],
  [0, 46, 3],
  [1, 47, 2],
  [3, 43, 0],
  [3, 49, 0],
  [2, 50, 1],
  [3, 51, 0],
  [3, 52, 0],
  [1, 53, 1],
  [3, 54, 3]].map(i => [s, ...i]);};


const icosaedreTronque = () => {
 const s = 10, t = [5, s], u = [6, s];
 return [
  [...u, 12],
       ...[0, 1, 2, 3, 4, 5].map(i => [[5 + (i % 2), 10], 0, 0, i]),
   ...[].concat(...[1, 3, 5].map(i => [[u, 0, i, 2], [u, 0, i + 1, 2], [t, 0, i + 1, 3]])),
                  ...[7, 13].map(i => [t, 0, i, 4]),
  [t, 0, 11, 3],
  ...[10, 12, 15, 18, 21, 20].map(i => [u, 0, i, 3]),
               ...[8, 11, 14].map(i => [u, 0, i, 4]),
              ...[19, 26, 27].map(i => [t, 0, i, 3]),
 [ u, 0, 28, 3]];};


const pt_rhombicosidodecaedre = () => {
 const s = 10, t = [3, s], u = [4, s], v = [5, s];
 const r = [0, 1, 2, 3, 4];
 return [
  [...v, -30],       ...r.map(i => [u, 0, 0, i]),
                     ...r.map(i => [t, 0, i + 1, 3]),
                     ...r.map(i => [v, 0, i + 1, 2]),
                     ...r.map(i => [u, 0, i + 11, 2]),
                     ...r.map(i => [u, 0, i + 11, 3]),
                     ...r.map(i => [u, 0, i + 11, 4]),
                     ...r.map(i => [t, 0, i + 16, 3]),
                     ...r.map(i => [t, 0, i + 21, 3]),
  ...[19, 24, 25, 21, 22].map(i => [v, 0, i, 2]),
                     ...r.map(i => [u, 0, i + 41, 2]),
      ...[41, 42, 43, 44].map(i => [u, 0, i, 3]),
      ...[46, 47, 48, 49].map(i => [t, 0, i, 3]),
  [v, 0, 47, 2],
  [u, 0, 41, 4],
  [t, 0, 47, 1]];};


const rendu2d = p => p.map(p => polygon(p));


const pose = p => {
 const c = [`black`, `red`, `red`, `tomato`, `lightBlue`, `maroon`, `orange`, `tan`, `red`,][p.points.length];
 return union(linear_extrude({height: 0.2}, p.expandToCAG(0.1, 16)).setColor(css2rgb(`black`)), linear_extrude({height: 0.1}, p.innerToCAG()).setColor(css2rgb(c)));};


const rendu = p => p.map(p => pose(p));


const centre  = d => {
 let r = new CSG.Vector2D([0, 0]);
 for(let i=0; i<d.length; i++) {r = r.plus(d[i]);}
 r = r.dividedBy(d.length);
 return r;};


const texte = (c, x, y, e, co) => union(vector_text(x, y, c.toString()).map(p => rectangular_extrude(p, {w: 2, h: 2}).scale(e))).setColor(css2rgb(co));
 

const rendun = p => {
 const co = [`black`, `blue`];
 let r = [], t, b, pa, c;
 p.map((P,i) => {
  r.push(pose(P));

  t = texte(i, 0, 0, 0.125, co[0]);
  b = t.getBounds();
  let pa = P.points;
  r.push(t.translate(centre(pa).minus((b[1].minus(b[0])).dividedBy(2))));
  for(j=0; j<pa.length; j++) {
   c = centre([pa[j], pa[(j+1) % pa.length], centre(pa)]);
   r.push(texte(j, 0, 0, 0.075, co[1]).translate(c));}});
 return r;};

const attache = (p1, s1, p0, s0) => {
 let P0 = [s0];
 let P1 = [s1];
 
 P0.push((s0 + 1)%p0.points.length);
 P1.push((s1 + 1)%p1.points.length);

 p1 = p1.translate(p0.points[P0[0]].minus(p1.points[P1[1]]));
    
 let p = 0.05;
 let r = 0, d = 0;
 let ps = p1;
 let pt = p0.points[P0[1]];
 do {
  r += p;
  p1 = ps.rotate(ps.points[P1[1]], [0, 0, 1], r);
  d = pt.distanceTo(p1.points[P1[0]]);} while((r < 360) && (d > p));

  return p1};


const polyR = (n, l = 10, x = 0, y = 0) => {

 l = l/(2*Math.sin(Math.PI/n));
 let c = new CSG.Path2D([[x + l, y]]);
    
 for(let i = 1 ; i <= n ; i++)
  c = c.appendPoint([x + l*Math.cos(i*2*Math.PI/n), y + l*Math.sin(i*2*Math.PI/n)]);
 return c.appendPoint([x + l, y]).close().rotateZ(45);};


const polyC = n => {
 switch (n) {
  case 4: { return new CSG.Path2D([[0, 16], [10, 0], [0, -6], [-10, 0]], close).scale(3/4);}}};


const main = params => {

 let l = eval(`${params.patron}()`);

 let p = [];

 if(l[0][0] > 0) p.push(polyR(l[0][0], l[0][1]).rotateZ(l[0][2]));
 else p.push(polyC(-l[0][0]).translate(l[0][1]));

 for(let i = 1; i < l.length; i++) {
  if(l[i][0][0] > 0) p.push(attache(polyR(l[i][0][0], l[i][0][1]), l[i][1], p[l[i][2]], l[i][3]));
  else p.push(attache(polyC(-l[0][0]), l[i][1], p[l[i][2]], l[i][3]))}

 return eval(`${params.rendu}(p)`);};
