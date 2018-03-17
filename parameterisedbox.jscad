//
//
//
//
//

function getParameterDefinitions() {

 return [
  [`width`,         `float`, 60,  `Breedte doos in mm:`,        `Width of box in mm:`],
  [`length`,        `float`, 40,  `Diepte doos in mm:`,         `Length of box in mm:`],
  [`height`,        `float`, 20,  `Hoogte doos in mm:`,         `Height of box in mm:`],
  [`tabsize`,       `int`,   10,   `Tanden grootte in mm:`,      `Tab size in mm:`],
  [`thickleft`,     `float`, 3,   `Dikte materiaal:`,           `Thickness of the left side material:`],
  [`thickright`,    `float`, 3,   `Dikte materiaal:`,           `Thickness of the right side material:`],
  [`thickfront`,    `float`, 2,   `Dikte materiaal:`,           `Thickness of the front material:`],
  [`thickback`,     `float`, 2,   `Dikte materiaal:`,           `Thickness of the back material:`],
  [`thicktop`,      `float`, 1,   `Dikte materiaal:`,           `Thickness of the top material:`],
  [`thickbottom`,   `float`, 1,   `Dikte materiaal:`,           `Thickness of the bottom material:`],
  [`overtoplength`, `float`, 0,   `Dikte materiaal:`,           `Extra length top and bottom material:`],
  [`overtopwidth`,  `float`, 0,   `Dikte materiaal:`,           `Extra width top and bottom material:`],
  [`explosion`,     `float`, 1.0,  `Explosion`,                  `Assembled view explosion (times Thickness): `],
  [`kerf`,          `float`, 0.0,  `Breedte laserstraal in mm:`, `Width of laser beam cut in mm:`],
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
              P => (P[1] == `float` || P[1] == `int`) ? {name: P[0], type:  P[1], initial: P[2], caption: P[4]}
             : {name: P[0],  type: P[1], values: P[2] ,captions: P[4], captionNL: P[5], caption: P[6], initial: P[7]});}


const main = (params) => {

 'use strict';

 const  W = 0, L = 1, H = 2, ss = [W, L, H], /* c = ["Red", "Green", "Blue"], */ c = [[0.8, 0, 0, 0.6], [0, 0.8, 0, 0.6], [0, 0, 0.8, 0.6]],

        //
        // front and back are in the length direction (red)
        // left and right are in the width direction  (green)
        // top and bottom are in the height direction (blue)
        //

        S = [params.width, params.length, params.height],

        O = [params.overtopwidth, params.overtoplength],

        N = 0, F = 1, // near and far sides

       Th = [[params.thickfront, params.thickleft,  params.thicktop],
             [params.thickback,  params.thickright, params.thickbottom]],
 
       TS = params.tabsize,

        E = params.explosion,

       //
       // S is internal dimensions
       // so top and bottom have to be extended in width and length
       // and front and back in length
       //

       // s etc, need to be expanded by a dimension to accomodate Th[1] 
       // for far side and then also a thickness for partitions?
       // current usage of front left and top thicknesses * 2

        s = [[                  Th[0][W],  S[L] + 2*Th[0][L] + 2*O[W],                     S[H]],
             [S[W],                                                   Th[0][L],            S[H]],
             [S[W] + 2*Th[0][W] + 2*O[L],  S[L] + 2*Th[0][L] + 2*O[W] + 2*O[L],        Th[0][H]]].map((p) => cube({size: p, center: true})),

       TT = [[      TS, Th[0][L], Th[0][H]],
             [Th[0][W],       TS, Th[0][H]],
             [Th[0][W], Th[0][L],       TS]].map((p) => cube({size: p, center: true})),

       SS = [(S[W] + 1*Th[0][W])/2, (S[L] + 1*Th[0][L])/2, (S[H] + 1*Th[0][H])/2],

        T = ss.map((p) => union(Array.from({length: Math.ceil((SS[p] - TS)/TS)},
                                           (v, i) => TT[p].translate([p == W ? i*2*TS : 0, p == L ? i*2*TS : 0, p == H ? i*2*TS : 0]))).center()),

       // easy to accomodate multiple partitions in the left to right directions
       // as the just punch holes in top/botton and front/back for their tabs :-)

       // able to leave off any side in one direction

//      r = ss.map((p) => [-SS[p],  SS[p]]),

//      r = [[-SS[W], SS[W]], [-SS[L],  SS[L]], [-SS[H]]], // no top
        r = [[-SS[W], SS[W]], [-SS[L], 0, SS[L]], [-SS[H], SS[H]]], // middle partition
//      r = [[-SS[W], SS[W]], [-SS[L], -SS[L]/2, 0, SS[L]/2, SS[L]], [-SS[H], SS[H]]],
//      r = [[-SS[W], SS[W]], [-SS[L], -SS[L]/2, 0, SS[L]/2, SS[L]], [-SS[H]]],

//       e = ss.map((p) => [-Th[0][p], Th[0][p]]),
         e = [[-Th[0][W], Th[0][W]], [-Th[0][L], 0, Th[0][L]], [-Th[0][H], Th[0][H]]],
//       e = [[-Th[0][W], Th[0][W]], [-Th[0][L], 0, 0, 0, Th[0][L]], [-Th[0][H], Th[0][H]]],

       t = [[union(...r[L].map((q) => T[H].translate([0, q, 0]))),
                      r[H].map((q) => T[L].translate([0, 0, q]))],
                  [...r[W].map((q) => T[H].translate([q, 0, 0])),
                   ...r[H].map((q) => T[W].translate([0, 0, q]))],
             union(...r[L].map((q) => T[W].translate([0, q, 0])),
                   ...r[W].map((q) => T[L].translate([q, 0, 0])))];
 
       // left and right side shouldn't move for for exploded view
 
 return union( // union(ss.map((p) => color(c[p],T[p]))).translate([0, 0, S[H]]),

              color(c[W], ...r[W].map((q,i) => union(difference(s[W], t[W][0]), t[W][1]).translate([q + E*e[W][i], 0, 0]))),
              color(c[L], ...r[L].map((q,i) => union(s[L], t[L]).translate([0, q /* + E*e[L][i] */ , 0]))),
              color(c[H], ...r[H].map((q,i) => difference(s[H], t[H]).translate([0, 0, q + E*e[H][i]])))).translate([0, 0, 2*(SS[H] + Th[0][H])]);};

