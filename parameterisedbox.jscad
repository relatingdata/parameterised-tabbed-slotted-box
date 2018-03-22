//
// Author: Laust Frederiksen
//
// Permissions is given to play with this at your own risk :-) ;-)
// If you make significant discoveries or improvements please share :-)
//

function getParameterDefinitions() {

 const Red = `Red`, Green = `Green`, Blue = `Blue`, Black = `Black`;
  return [
   [`PTBox`, `group`, `Parameterised Tabbed Box`, Black ],
  [`width`,            `float`, 80,  `Diepte doos in mm:`,         `Front to Back Length of box in mm:`, Red],
  [`length`,           `float`, 40,  `Breedte doos in mm:`,        `Left to Right Width of box in mm:`, Green],
  [`height`,           `float`, 20,  `Hoogte doos in mm:`,         `Bottom to Top Height of box in mm:`, Blue],
  [`tabsize`,          `int`,   10,  `Tanden grootte in mm:`,      `Edge tab size in mm:`, Black],
  [`thickfront`,       `float`, 2,   `Dikte materiaal:`,           `Thickness of the front material:`, Red],
  [`thickback`,        `float`, 2,   `Dikte materiaal:`,           `Thickness of the back material:`, Red],
  [`partition`,        `int`,   1,   `Dikte materiaal:`,           `Number of partitions:`, Green],
  [`thickleft`,        `float`, 3,   `Dikte materiaal:`,           `Thickness of the left side material:`, Green],
  [`thickmiddle`,      `float`, 1,   `Dikte materiaal:`,           `Thickness of the middle partition material:`, Green],
  [`thickright`,       `float`, 3,   `Dikte materiaal:`,           `Thickness of the right side material:`, Green],
  [`thicktop`,         `float`, 1,   `Dikte materiaal:`,           `Thickness of the top material:`, Blue],
  [`thickbottom`,      `float`, 1,   `Dikte materiaal:`,           `Thickness of the bottom material:`, Blue],
  [`overtoplength`,    `float`, 0,   `Dikte materiaal:`,           `Extra length top material:`, Blue],
  [`overtopwidth`,     `float`, 0,   `Dikte materiaal:`,           `Extra width top  material:`, Blue],
  [`overbottomlength`, `float`, 0,   `Dikte materiaal:`,           `Extra length bottom material:`, Blue],
  [`overbottomwidth`,  `float`, 0,   `Dikte materiaal:`,           `Extra width bottom material:`, Blue],
  [`explosion`,        `float`, 1.0, `Explosion`,                  `Assembled view explosion (times Thickness):`, Black],
//[`kerf`,             `float`, 0.0, `Breedte laserstraal in mm:`, `Width of laser beam cut in mm:`, Black],
  [`transparent`, `choice`, [`TRANSPARENT`, `SOLID`], [`Transparent`, `Solid`], [`Transparent`, `Solid`], `Colour:`, `Colour:`, `TRANSPARENT`],
  /* [
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
  [`hh3`, `float`, 0, `Gat top hoogte`,     `Hole top length:`],
  [`hw0`, `float`, 0, `Gat bodem breedte`,  `Hole bottom width:`],
  [`hh0`, `float`, 0, `Gat bodem hoogte`,   `Hole bottom length:`],
  [`hw1`, `float`, 0, `Gat links breedte`,  `Hole left length:`],
  [`hh1`, `float`, 0, `Gat links hoogte`,   `Hole left height:`],
  [`hw4`, `float`, 0, `Gat rechts breedte`, `Hole right length:`],
  [`hh4`, `float`, 0, `Gat rechts hoogte`,  `Hole right height:`],
  [`hh5`, `float`, 0, `Gat achter breedte`, `Hole back width:`],
  [`hw5`, `float`, 0, `Gat achter hoogte`,  `Hole back height:`],
  [`hh2`, `float`, 0, `Gat voor breedte`,   `Hole front width:`],
  [`hw2`, `float`, 0, `Gat voor hoogte`,    `Hole front height:`] */ ].map(
              P => (P[1] == `float` || P[1] == `int`) ? {name: P[0], type:  P[1], initial: P[2], caption: `<span style="color:${P[5]}">${P[4]}</span>`}
             : (P[1] == `group`) ? {name: P[0], type: P[1], caption: `<h2><span style="color:${P[3]}">${P[2]}</span></h2>`} : {name: P[0],  type: P[1], values: P[2] ,captions: P[4], caption: P[6], initial: P[7]});}


const main = (params) => {

 'use strict';

 const  W = 0, L = 1, H = 2, ss = [W, L, H],

        c = params.transparent == `SOLID` ? [`Red`, `Green`, `Blue`] : [[0.8, 0, 0, 0.6], [0, 0.8, 0, 0.6], [0, 0, 0.8, 0.6]],

        //
        // for measuring displacement from center and thicknesses
        //
        // front  and back  are in the length direction (red)
        // left   and right are in the width  direction (green)
        // bottom and top   are in the height direction (blue)
        //

        S = [params.width, params.length, params.height],

        O = [[params.overbottomwidth, params.overbottomlength],
             [                     0,                       0],
             [   params.overtopwidth,    params.overtoplength]],
       
        N = 0, M = 1, F = 2, pp = [N, M, F], /* F = 1, pp = [N, F],*/  // near, middle (partitions) and far sides

       Th = [[params.thickback,   params.thickleft,   params.thickbottom],
             [0.00001,            params.thickmiddle, 0.00001           ],  // one for each direction ??
             [params.thickfront,  params.thickright,  params.thicktop   ]],
 
       TS = params.tabsize,

        E = params.explosion,

       //
       // S is internal dimensions
       // so  bottom and top    have to be extended in width and length
       // and back   and front                      in           length
       //

        P = pp.map((p) => [[[Th[p][W],                                S[L] + Th[N][L] + Th[F][L] + 2*O[p][W],                 S[H]], [                      0, (Th[F][L] - Th[N][L])/2, 0]],
                           [[S[W],                                    Th[p][L],                                               S[H]], [                      0,                       0, 0]],
                           [[S[W] + Th[N][W] + Th[F][W] + 2*O[p][L],  S[L] + Th[N][L] + Th[F][L] + 2*O[p][W] + 2*O[p][L], Th[p][H]], [(Th[F][W] - Th[N][W])/2, (Th[F][L] - Th[N][L])/2, 0]]]
                           .map((q) => cube({size: q[0], center: true}).translate(q[1]))),

       tt = pp.map((p) => pp.map((q) => [[      TS, Th[p][L], Th[q][H]],
                                         [Th[p][W],       TS, Th[q][H]],
                                         [Th[p][W], Th[q][L],       TS]].map((r) => cube({size: r, center: true})))),

       SS = pp.map((p) => ss.map((s) =>(S[s] + Th[p][s])/2)),

       TT = pp.map((q) => pp.map((p) => ss.map((s) => union(Array.from({length: Math.ceil((SS[p][s] - TS)/TS)},
                                           (v, j) => tt[q][p][s].translate([s == W ? 2*j*TS : 0, s == L ? 2*j*TS : 0, s == H ? 2*j*TS : 0]))).center()))),

       // TODO // easy to accomodate multiple partitions in the left to right directions
       // TODO // as the just punch holes in top/botton and front/back for their tabs :-)

       // TODO // able to leave off any side in one direction
       // Able to leave out top or bottom

       r = ss.map((s) => [-SS[N][s], 0, SS[F][s]]),
       e = ss.map((s) => [-Th[N][s], 0, Th[F][s]]),
//       r = [[-SS[W], SS[W]], [-SS[L], 0, SS[L]], [-SS[H], SS[H]]], // middle partition
//       r = [[-SS[W], SS[W]], [-SS[L], -SS[L]/2, 0, SS[L]/2, SS[L]], [-SS[H], SS[H]]],
//      r = [[-SS[W], SS[W]], [-SS[L], -SS[L]/2, 0, SS[L]/2, SS[L]], [-SS[H]]],

//         e = [[-Th[0][W], Th[0][W]], [-Th[0][L], 0, Th[0][L]], [-Th[0][H], Th[0][H]]],
//       e = [[-Th[0][W], Th[0][W]], [-Th[0][L], 0, 0, 0, Th[0][L]], [-Th[0][H], Th[0][H]]],

       t = pp.map((p) => [[union(...r[L].map((r,i) => TT[p][i][H].translate([0, r, 0]))),
                                    r[H].map((r,i) => TT[p][i][L].translate([0, 0, r]))],
                                [...r[W].map((r,i) => TT[i][p][H].translate([r, 0, 0])),
                                 ...r[H].map((r,i) => TT[p][i][W].translate([0, 0, r]))],
                           union(...r[L].map((r,i) => TT[i][p][W].translate([0, r, 0])),
                                 ...r[W].map((r,i) => TT[i][p][L].translate([r, 0, 0])))]);
 
       // left and right side shouldn't move for exploded view ??
 
 return union( // union(pp.map((p) => union(pp.map((q) => union(ss.map((s) => color(c[s], TT[q][p][s]))).translate([0, (q + 1)*S[L], (p + 1)*S[H]]))))), 

              color(c[W], ...r[W].map((r,i) => i != 1 ? union(difference(P[i][W], t[i][W][0]), t[i][W][1]).translate([r + E*e[W][i], 0, 0])) : cube()),
              color(c[L], ...r[L].map((r,i) => union(P[i][L], t[i][L]).translate([0, r + E*e[L][i] , 0]))),
              color(c[H], ...r[H].map((r,i) => i ! = 1 ? difference(P[i][H], t[i][H]).translate([0, 0, r + E*e[H][i]])) : cube())).translate([0, 0, 2*(SS[0][H] + Th[0][H])]);};


