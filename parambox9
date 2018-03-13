// title: Lasercut box
// original author: Benny Malengier
// extreme simplification and bad hacking by: Laust Frederiksen
// license: MIT License

//
// we need a notion of edges! and which edges "match" (taking into account kerf for LASER ONLY!!) which edges!
// in the closed box there are only two matching edges
// the side of the "box top" and the top of the "box side" (repeated 4 times and then repeated 4 times for the bottom)
// and the side of the edge and its match. (repeated 4 times)
// remove tab from side and add tab to side/top/botttom! ?? simpler than poly line!
// |---|   ---
// |   | or| | are isomorphic.
// |---|   ---
//


function getParameterDefinitions() {

 return [
  [`width`,     `float`, 100,  `Breedte doos in mm:`,        `Width of box in mm:`],
  [`depth`,     `float`, 100,  `Diepte doos in mm:`,         `Depth of box in mm:`],
  [`height`,    `float`, 50,   `Hoogte doos in mm:`,         `Height of box in mm:`],
  [`tab`,       `int`,   10,   `Tanden grootte in mm:`,      `Tab size in mm:`],
  [`thick`,     `float`, 3.0,  `Dikte materiaal:`,           `Thickness of the material:`],
  [`expansion`, `float`, 1.0,  `Expansion`,                  `Assembled view expansion (times Thickness): `],
  [`kerf`,      `float`, 0.0,  `Breedte laserstraal in mm:`, `Width of laser beam cut in mm:`],
  [
   `type`, `choice`,
   [`ASSEMBLED`, `LASER`, `3D`],
   [`Geassembleerd`, `Laser cut plaat (DXF output)`, `3D print plaat (STL output)`],
   [`Assembled`,     `Laser Cut plate (DXF output)`, `3D print plate (STL output)`],
   ` `, `Layout:`, `ASSEMBLED`],
  [
   `C3`, `choice`,
   [`CLOSED`, `OPEN`],
   [`Gesloten`, `Geen Deksel`],
   [`Closed Box with Lid`, `Open Box without Lid`],
   `Deksel:`, `Lid:`, `CLOSED`],
  [
   `display`, `choice`,
   [`ALL`, `BOTTOM`, `TOP`, `LEFT`, `RIGHT`, `FRONT`, `BACK`],
   [`Alle Zijden`, `Bodem`, `Top`, `Links`, `Rechts`, `Voor`, `Achter`],
   [`All Sides`, `Bottom`, `Top`, `Left`, `Right`, `Front`, `Back`],
   `Toon:`, `Show:`, `ALL`],
  [`hw3`, `float`, 0, `Gat top breedte`,    `Hole top width:`],
  [`hh3`, `float`, 0, `Gat top hoogte`,     `Hole top height:`],
  [`hw0`, `float`, 0, `Gat bodem breedte`,  `Hole bottom width:`],
  [`hh0`, `float`, 0, `Gat bodem hoogte`,   `Hole bottom height:`],
  [`hw1`, `float`, 0, `Gat links breedte`,  `Hole left width:`],
  [`hh1`, `float`, 0, `Gat links hoogte`,   `Hole left height:`],
  [`hw4`, `float`, 0, `Gat rechts breedte`, `Hole right width:`],
  [`hh4`, `float`, 0, `Gat rechts hoogte`,  `Hole right height:`],
  [`hh5`, `float`, 0, `Gat achter breedte`, `Hole back width:`],
  [`hw5`, `float`, 0, `Gat achter hoogte`,  `Hole back height:`],
  [`hh2`, `float`, 0, `Gat voor breedte`,   `Hole front width:`],
  [`hw2`, `float`, 0, `Gat voor hoogte`,    `Hole front height:`]].map(

              P => (P[1] == `float` || P[1] == `int`) ? {name: P[0], type:  P[1], initial: P[2],  captionNL: P[3], caption: P[4]}
                                     : {name: P[0],  type: P[1], values: P[2], captionsNL: P[3] ,captions: P[4], captionNL: P[5], caption: P[6], initial: P[7]}
);

 }

let eps  = 0.2;

let kerf  = 0.16;      // Kerf of laserbeam (width of the cut) in mm.
                       // See http://blog.ponoko.com/2008/09/11/how-much-material-does-the-laser-burn-away/. 
                       // Default 0.16mm

let dt = 0;

const main = (params) => {

 "use strict";

 let D = [`BOTTOM`, `BACK`, `LEFT`, `TOP`, `FRONT`, `RIGHT`].map(s => (params.display == s || params.display == `ALL`));

 let rh = [0, 1, 2, 3, 4, 5].map(h => 
  eval(`[(params.hw${h} > 0 && params.hh${h} > 0), [params.hh${h}, params.hw${h}]];`));

 let dw = params.width;  // Width of the box in mm. Default 100mm
 let dd = params.height; // Depth of the box in mm. Default 100mm
 let dh = params.depth;  // Heigth of the box in mm. Default 50mm
 let tab = params.tab;   // Size of tab in mm. Default 10mm

 dt = params.thick;       // Thickness of material in mm. Default 3.0

 let g = params.expansion*dt;            // Expansion gap in assembled view

 kerf = params.kerf;

 let F = (params.type == `LASER` || params.type == `3D`);
 
 let C = [true, true, true, params.C3 == `CLOSED` , true, true];

 let tw, th, td;
 
 [`w`, `h`, `d`].map(d => {eval(
 `t${d} = ~~(Math.round(d${d} / tab));
  if (t${d} % 2 === 0) t${d} += 1;
  if (d${d}/t${d} < 2*dt) t${d} -= 2;`)});

 if (tw < 1 || th < 1 || td < 1) throw new Error(`ERROR: reduce tab, corners will break off otherwise!`);

 let s = [];

 [[[5 + dw/2 - 100,                            5 + dh/2 - 100,        ], [dw, dh, tw, th, dt, false, false, !C[3],              2, 1, 1],   0,   0, [0,              0,             -g         ]],
  [[5 + dw + 5 + dd/2 - 100,                   5 + dh/2 - 100,        ], [dd, dh, td, th, dt, true,  false, (C[3] ? !C[3] : 2), 1, 2, 1],   0, -90, [-dw/2 + dt - g, 0,             dd/2       ]],
  [[5 + dw/2 - 100,                            5 + dh + 5 + dd/2 - 100], [dw, dd, tw, td, dt, true,  true,  (C[3] ? !C[3] : 3), 1, 1, 2],  90,   0, [0,              dt - g - dh/2,  dd/2      ]],
  [[5 + dw + 5 + dd + 5 + dd + 5 + dw/2 - 100, 5 + dh/2 - 100,        ], [dw, dh, tw, th, dt, false, false, !C[3],              2, 1, 1],   0,   0, [0,              0,             dd + g - dt]],
  [[5 + dw + 5 + dd + 5 + dd/2 - 100,          5 + dh/2 - 100         ], [dd, dh, td, th, dt, true,  false, (C[3] ? !C[3] : 4), 1, 2, 1],   0,  90, [g - dt + dw/2,  0,             dd/2       ]],
  [[5 + dw + 5 + dw/2 - 100,                   5 + dh + 5 + dd/2 - 100], [dw, dd, tw, td, dt, true,  true,  (C[3] ? !C[3] : 1), 1, 1, 2], -90,   0, [0,             dh/2 - dt + g,  dd/2       ]]]
 .map((S,i) => {
  if (C[i] && D[i]) {
   s[i] = p(...(F ? S[0] : [0, 0]), ...S[1]);
   s[i] = rh[i][0] ? s[i].subtract(h(...(F ? S[0] : [0,0]), ...rh[i][1])) : s[i];
   s[i] = F ? s[i] : s[i].rotateX(S[2]).rotateY(S[3]).translate(S[4]);}});

 if (params.type == `LASER`) s = s.map(S => S.projectToOrthoNormalBasis(CSG.OrthoNormalBasis.Z0Plane()));      // Wrong!! must take kerf into account here!!!

 if (params.display !== `ALL` && D[3] && !C[3]) throw new Error(`ERROR: Top does not exist, no Lid requested!`);

 return params.display == `ALL` && C[3] ? s :
        params.display == `ALL` && !C[3] ? [s[0], s[1], s[2], s[4], s[5]] : D[0] ? s[0] : D[1] ? s[1] : D[2] ? s[2] : D[4] ? s[4] : D[5] ? s[5] : D[3] && C[3] ? s[3] : [];};


const S = (x, y, cx, cy, t, c, Dx, Dy, X, Y, xm, ym, Open) => {

 let r = [];

 let tab = Open ? 0 : t;

 let dx = cx*xm;
 let dy = cy*ym;

 if (X) dx -= t*xm;
 if (Y) dy -= t*ym;

 let d = xm - ym;
 let h = c*(xm + ym);

 if (Y && xm) {d = -d; h = -h;}
 if (X && ym) {d = -d; h = -h;}

 let XM = Math.abs(xm);
 let YM = Math.abs(ym);
 let  M = Math.abs(Dx*xm + Dy*ym);

 let ax = (x - 2*cx) / (2*Dx + 1), ay = (y - 2*cy) / (2*Dy + 1);
 let bx = x - 2*(cx + ax*Dx), by = y - 2*(cy + ay*Dy);

 [[dx + h*XM, dy + h*YM], [bx*xm + h*XM, by*ym + h*YM]].map(a => {

  r.push(a);

  if (tab !== 0) r.push([YM*d*tab, XM*d*tab]);

  d = -d; h = -h;

  for (let i = 0; i < M; i++)  {r.push([ax*xm + h*XM, ay*ym + h*YM]); if (tab !== 0) r.push([YM*d*tab, XM*d*tab]); d = -d; h = -h;}});

 r.push([(cx - ((X && xm) ? t : 0))*xm, (cy - ((Y && ym) ? t : 0))*ym]);

 return r;};


const p = (x, y, xx, yy, tx, ty, t, X, Y, Open, r, g, b) => {

 x -= xx/2;
 if (X) x += t;

 y -= yy/2;
 if (Y) y += t;

 let p = 0;

 let P = [new CSG.Vector2D(x, y)];

 [[ 1,  0, Open === 1],
  [ 0,  1, Open === 2],
  [-1,  0, Open === 3],
  [ 0, -1, Open === 4]].map(SS => {
   S(xx, yy, xx/tx, yy/ty, t, kerf, ~~((tx - 3)/2.0), ~~((ty - 3)/2.0), X, Y, ...SS).map(S => {
    P[p + 1] = new CSG.Vector2D(S[0] + P[p].x, S[1] + P[p].y);p++})});

 return new CSG.Polygon2D(P).extrude({offset: [0, 0, t]}).setColor(r*0.4, g*0.4, b*0.4, 0.6);};


const h = (x, y, w, h) => {
 let P = [new CSG.Vector2D(x - w/2,    y - h/2)];
 P[1] = new CSG.Vector2D(P[0].x + w, P[0].y);
 P[2] = new CSG.Vector2D(P[1].x,     P[1].y + h);
 P[3] = new CSG.Vector2D(P[2].x - w, P[2].y);
 return new CSG.Polygon2D(P).extrude({offset: [0, 0, dt + eps]}).translate([0, 0, -eps/2])};
