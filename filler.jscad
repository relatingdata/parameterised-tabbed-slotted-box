//
//
// Filler
//
//

//'use strict';

const e = (o, t, e) => {
 return intersection(
  difference(
   sphere({r: o, center: true}),
   sphere({r: o - t, center: true})),
  cube({size: o, center: true}).translate([e[0]*o/2, e[1]*o/2, e[2]*o/2]));};

const f = (o, h, q) => {
  return intersection(
   difference(
    cube({size: [2*o, 2*o, h], center: true}),
    cylinder({r: o, h: h, center: true})),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, 0]));};

const q = (o, t, h, q) => {
  return intersection(
   difference(
    cylinder({r: o, h: h, center: true}),
    cylinder({r: o - t, h: h, center: true})).translate([0, 0, -h/2]),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, -h/2]));};
  
const s = (o, i, t, e) => {
 return intersection(
  difference(
   torus({ro: o - t, ri: i, fni: 32, center: true}),
   torus({ro: o - t, ri: i - t, fni: 32, center: true})),
  intersection(
   cylinder({r: o - t, h: i*2, centre: true}),
   cube({size: [o*2, o*2, i + t*2], center: true}).translate([e[0]*o, e[1]*o, e[2]*(i/2 + t)])));};

const R = 9;
const H = 50;
const L = 20;
const W = 45;
const T = 1;
const h = 6;
const l = 5;
const w = 7;
const b = [[0, 0], [0, 0]];[20 + 5, 20 + 9, 20 + 13, 20 + 17];[0, 0, 0, 0];[H, H, H, H];

const hh = [b[0].map(i => Math.hypot(H, i)), b[1].map(i => Math.hypot(H, i))];
const hhh = b[0].map(j => b[1].map(i => Math.hypot(H, i,j)));
const hhhh = [hhh[0][0], hhh[0][1], hhh[1][0], hhh[1][1]];
// const bb = [b[0].map(i => Math.atan(i/H)/(Math.PI/180)), b[1].map(i => Math.atan(i/H)/(Math.PI/180))];
const bb = b.map(j => j.map(i => Math.atan(i/H)/(Math.PI/180)));

const main = () => {
 const A = [[[[-W/2, -hh[0][0]/2], [-W/2 - b[1][1], hh[0][0]/2], [W/2 + b[1][0], hh[0][0]/2], [W/2, -hh[0][0]/2]], 90, 90],
            [[[-W/2, -hh[0][1]/2], [-W/2 - b[1][1], hh[0][1]/2], [W/2 + b[1][0], hh[0][1]/2], [W/2, -hh[0][1]/2]], 90, 90],
            [[[-L/2, -hh[1][0]/2], [-L/2 - b[0][1], hh[1][0]/2], [L/2 + b[0][0], hh[1][0]/2], [L/2, -hh[1][0]/2]], 00, 90],
            [[[-L/2, -hh[1][1]/2], [-L/2 - b[0][1], hh[1][1]/2], [L/2 + b[0][0], hh[1][1]/2], [L/2, -hh[1][1]/2]], 00, 90]].map(i => linear_extrude({height: T, center: false }, polygon({ points: i[0], closed: true})).translate([0, 0, -T/2]).rotateY(i[1]).rotateX(i[2]));
 
 // console.log(hh[0], hh[1], hh[2], hh[3], `\n`, bb[0][0], bb[0][1], bb[1][0], bb[1][1], `\n`);
 // console.log(JSON.stringify(hhhh)); return cube();
 
 return color("orange", union(
  A[0].rotateX(0).rotateY( bb[0][0]).translate([           (R - T/2)*H/hh[0][0] + b[0][0]/2, -W/2, -H/2 - (R - T/2)*b[0][0]/hh[0][0]]),
  A[1].rotateX(0).rotateY(-bb[0][1]).translate([      -L - (R - T/2)*H/hh[0][1] - b[0][1]/2, -W/2, -H/2 - (R - T/2)*b[0][1]/hh[0][1]]),
  A[2].rotateX(-bb[1][0]).rotateY(0).translate([-L/2,      (R - T/2)*H/hh[1][0] + b[1][0]/2,       -H/2 - (R - T/2)*b[1][0]/hh[1][0]]),
  A[3].rotateX( bb[1][1]).rotateX(0).translate([-L/2, -W - (R - T/2)*H/hh[1][1] - b[1][1]/2,       -H/2 - (R - T/2)*b[1][1]/hh[1][1]]),

  ...[].concat(
   [[[[ 1,  1, -1], [           0,            0,      -H]],
     [[ 1,  1]    , [     b[0][0],      b[1][0],       0], -bb[1][0],  bb[0][0]],
     [[ 1,  1,  1], [     b[0][0],      b[1][0],       0]],
     [[ 1,  1]    , [     b[0][0],      b[1][0], R - T/2]]],
    [[[ 1, -1, -1], [           0, -W          ,      -H]],
     [[ 1, -1]    , [     b[0][0], -W - b[1][1],       0],  bb[1][1],  bb[0][0]],
     [[ 1, -1,  1], [     b[0][0], -W - b[1][1],       0]],
     [[ 1, -1]    , [     b[0][0], -W - b[1][1], R - T/2]]],
    [[[-1,  1, -1], [-L          ,            0,      -H]],
     [[-1,  1]    , [-L - b[0][1],      b[1][0],       0], -bb[1][0], -bb[0][1]],
     [[-1,  1,  1], [-L - b[0][1],      b[1][0],       0]],
     [[-1,  1]    , [-L - b[0][1],      b[1][0], R - T/2]]],
    [[[-1, -1, -1], [-L          , -W          ,      -H]],
     [[-1, -1]    , [-L - b[0][1], -W - b[1][1],       0],   bb[1][1], -bb[0][1]],
     [[-1, -1,  1], [-L - b[0][1], -W - b[1][1],       0]],
     [[-1, -1]    , [-L - b[0][1], -W - b[1][1], R - T/2]]]].map((i, x) => [
    e(      R,    T, i[0][0]).translate(i[0][1]),
  //  e(      R,    T, i[0][0]).translate([i[1][1][0], i[1][1][1], 0]),
    q(      R,    T, hhhh[x], i[1][0]).rotateX(i[1][2]).rotateY(i[1][3]).translate(i[1][1]),
    s(    2*R,    R, T, i[2][0]).translate(i[2][1]),
    f(2*R - T,    T, i[3][0]).translate(i[3][1])])),

  [[[ 1,  1],           0, [   0,                   0, -H]],
   [[ 1, -1],           0, [   0,                  -W, -H]],
   [[-1,  1], b[0][0] + b[0][1], [b[0][0], -W - 2*R + T - b[1][1],  0]],
   [[-1, -1], b[0][0] + b[0][1], [b[0][0],      2*R - T + b[1][0],  0]]].map(i => q(R, T, L + i[1], i[0]).rotateY(90).translate(i[2])),
/*
  [[[ 1,  1], b[0][0] + b[0][1], [b[0][0],      b[1][0],  0]],
   [[ 1, -1], b[0][0] + b[0][1], [b[0][0], -W - b[1][1],  0]]].map(i => q(R, T, L + i[1], i[0]).rotateY(90).translate(i[2])),
*/
  [[[ 1,  1], b[1][0] + b[1][1], [-L - 2*R + T - b[0][1], -W - b[1][1],  0]],
   [[ 1, -1],           0, [                  0, -W,        -H]],
   [[-1,  1], b[1][0] + b[1][1], [     2*R - T + b[0][0], -W - b[1][1],  0]],
   [[-1, -1],           0, [                -L , -W,        -H]]].map(i => q(R, T, W + i[1], i[0]).rotateX(90).translate(i[2])),
/*
  [[[ 1, -1], b[1][0] + b[1][1], [     b[0][0], -W - b[1][1],  0]],
   [[-1, -1], b[1][0] + b[1][1], [-L - b[0][1], -W - b[1][1],  0]]].map(i => q(R, T, W + i[1], i[0]).rotateX(90).translate(i[2])),
*/
  cube({size: [L, W, T], center: true}).translate([-L/2, -W/2, -H - R + T/2]),

  [[[ 1,  1,  1], [     2*R - T + l + b[0][0],      2*R - T + w + b[1][0], 0]],
   [[ 1, -1,  1], [     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1], 0]],
   [[-1,  1,  1], [-L - 2*R + T - l - b[0][1],      2*R - T + w + b[1][0], 0]],
   [[-1, -1,  1], [-L - 2*R + T - l - b[0][1], -W - 2*R + T - w - b[1][1], 0]]].map(i => e(R, T, i[0]).translate(i[1])),
   
  q(R, T, W + 2*(2*R - T + w) + b[1][0] + b[1][1], [ 1,  1]).rotateX(90).translate([     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1],  0]),
  q(R, T, W + 2*(2*R - T + w) + b[1][0] + b[1][1], [-1,  1]).rotateX(90).translate([-L - 2*R + T - l - b[0][1], -W - 2*R + T - w - b[1][1],  0]),
  q(R, T, L + 2*(2*R - T + l) + b[0][0] + b[0][1], [-1,  1]).rotateY(90).translate([     2*R - T + l + b[0][0],      2*R - T + w + b[1][0],  0]),
  q(R, T, L + 2*(2*R - T + l) + b[0][0] + b[0][1], [-1, -1]).rotateY(90).translate([     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1],  0]),

  difference(
   cube({size: [L + 2*(2*R - T + l) + b[0][0] + b[0][1], W + 2*(2*R - T + w) + b[1][0] + b[1][1], T], center: true}),
   cube({size: [L + 2*(2*R - T)     + b[0][0] + b[0][1],     W + 2*(2*R - T) + b[1][0] + b[1][1],     T], center: true})).translate([-L/2 + b[0][0]/2 - b[0][1]/2, -W/2 + b[1][0]/2 - b[1][1]/2, R - T/2]))).scale(1);};
