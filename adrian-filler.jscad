//
//
// Filler
//
//

//'use strict';

const resolution = 64;

const e = (o, t, e, r) => {
 return intersection(
  difference(
   sphere({r: o,     fn: resolution, center: true}),
   sphere({r: o - t, fn: resolution, center: true})),
  cube({size: o, center: true}).translate([e[0]*o/2, e[1]*o/2, e[2]*o/2]),
  cube({size: o, center: true}).translate([e[0]*o/2, e[1]*o/2, e[2]*o/2]).rotateY(r));};

const f = (o, h, q) => {
  return intersection(
   difference(
    cube({size: [2*o, 2*o, h], center: true}),
    cylinder({r: o, h: h,  fn: resolution, center: true})),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, 0]));};

const q = (o, t, h, q, r) => {
  return intersection(
   difference(
    cylinder({r: o,     h: h, fn: resolution, center: true}),
    cylinder({r: o - t, h: h, fn: resolution, center: true})).translate([0, 0, -h/2]),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, -h/2]),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, -h/2]).rotateZ(r));};
  
const s = (o, i, t, e) => {
 return intersection(
  difference(
   torus({ro: o - t, ri: i,     fni: resolution ,fno: resolution, center: true}),
   torus({ro: o - t, ri: i - t, fni: resolution, fno: resolution, center: true})),
  intersection(
   cylinder({r: o - t, h: i*2, fn: resolution, centre: true}),
   cube({size: [o*2, o*2, i + t*2], center: true}).translate([e[0]*o, e[1]*o, e[2]*(i/2 + t)])));};

const R = 11.5;
const H = 82;
const W = 150 - 23;
const L = 112 - 67 - 23;
const T = 2.5;
const h = 6;
const r = 4.5;
const l = 1;
const w = 1;
const b = [[67, 0], [0, 0]];[20 + 5, 20 + 9, 20 + 13, 20 + 17];[0, 0, 0, 0];[H, H, H, H];

const hh = [b[0].map(i => Math.hypot(H, i)), b[1].map(i => Math.hypot(H, i))];
const hhh = b[0].map(j => b[1].map(i => Math.hypot(H, i,j)));
const hhhh = [hhh[0][0], hhh[0][1], hhh[1][0], hhh[1][1]];
const bb = b.map(j => j.map(i => Math.atan(i/H)/(Math.PI/180)));

const main = () => {
//return union(color("blue", e(10,2,[-1,-1,-1],40)), color("red", e(10,2,[-1,-1,-1],-40)));    
 const A = [[[[-W/2, -hh[0][0]/2], [-W/2 - b[1][1], hh[0][0]/2], [W/2 + b[1][0], hh[0][0]/2], [W/2, -hh[0][0]/2]], 90, 90],
            [[[-W/2, -hh[0][1]/2], [-W/2 - b[1][1], hh[0][1]/2], [W/2 + b[1][0], hh[0][1]/2], [W/2, -hh[0][1]/2]], 90, 90],
            [[[-L/2, -hh[1][0]/2], [-L/2 - b[0][1], hh[1][0]/2], [L/2 + b[0][0], hh[1][0]/2], [L/2, -hh[1][0]/2]], 00, 90],
            [[[-L/2, -hh[1][1]/2], [-L/2 - b[0][1], hh[1][1]/2], [L/2 + b[0][0], hh[1][1]/2], [L/2, -hh[1][1]/2]], 00, 90]]
             .map(i => linear_extrude({height: T, center: false }, polygon({ points: i[0], closed: true})).translate([0, 0, -T/2]).rotateY(i[1]).rotateX(i[2]));
 

 return union(
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
     e(      R,    T, i[0][0], x===1 || x===0 ? bb[0][0] : 0).translate(i[0][1]) ,
    x===1 || x===0 ? e(      R,    T, i[0][0], (bb[0][0]-90)).translate([i[1][1][0], i[1][1][1], 0]) : cube(),
    q(      R,    T, hhhh[x], i[1][0], 0).rotateX(i[1][2]).rotateY(i[1][3]).translate(i[1][1]),
    s(    2*R,    R, T, i[2][0]).translate(i[2][1]),
    f(2*R - T,    T, i[3][0]).translate(i[3][1])])),

  [[[ 1,  1],           0, [   0,                   0, -H]],
   [[ 1, -1],           0, [   0,                  -W, -H]],
   [[-1,  1], b[0][0] + b[0][1], [b[0][0], -W - 2*R + T - b[1][1],  0]],
   [[-1, -1], b[0][0] + b[0][1], [b[0][0],      2*R - T + b[1][0],  0]]].map(i => q(R, T, L + i[1], i[0], 0).rotateY(90).translate(i[2])),
/*
  [[[ 1,  1], b[0][0] + b[0][1], [b[0][0],      b[1][0],  0]],
   [[ 1, -1], b[0][0] + b[0][1], [b[0][0], -W - b[1][1],  0]]].map(i => q(R, T, L + i[1], i[0], 0).rotateY(90).translate(i[2])),
*/
  
  [[[ 1,  1], b[1][0] + b[1][1], [-L - 2*R + T - b[0][1], -W - b[1][1],  0],         0],
   [[ 1, -1],                 0, [                     0, -W,           -H], -bb[0][0]],
   [[-1,  1], b[1][0] + b[1][1], [     2*R - T + b[0][0], -W - b[1][1],  0],         0],
   [[-1, -1],                 0, [                   -L , -W,           -H],         0]].map(i => q(R, T, W + i[1], i[0], i[3]).rotateX(90).translate(i[2])),

  [ // [[-1, -1], b[1][0] + b[1][1], [-L - b[0][1], -W - b[1][1],  0]],
   [[ 1, -1], b[1][0] + b[1][1], [     b[0][0], -W - b[1][1],  0]]].map(i => q(R, T, W + i[1], i[0], 90 -bb[0][0]).rotateX(90).translate(i[2])),

  cube({size: [L, W, T], center: true}).translate([-L/2, -W/2, -H - R + T/2]),

  [[[ 1,  1,  1], [     2*R - T + l + b[0][0],      2*R - T + w + b[1][0], R-r]],
   [[ 1, -1,  1], [     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1], R-r]],
   [[-1,  1,  1], [-L - 2*R + T - l - b[0][1],      2*R - T + w + b[1][0], R-r]],
   [[-1, -1,  1], [-L - 2*R + T - l - b[0][1], -W - 2*R + T - w - b[1][1], R-r]]].map(i => e(r, T, i[0], 0).translate(i[1])),
   
   [[W + 2*(2*R - T + w) + b[1][0] + b[1][1], [ 1,  1], 90, 00, [     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1],  R-r]],
    [W + 2*(2*R - T + w) + b[1][0] + b[1][1], [-1,  1], 90, 00, [-L - 2*R + T - l - b[0][1], -W - 2*R + T - w - b[1][1],  R-r]],
    [L + 2*(2*R - T + l) + b[0][0] + b[0][1], [-1,  1], 00, 90, [     2*R - T + l + b[0][0],      2*R - T + w + b[1][0],  R-r]],
    [L + 2*(2*R - T + l) + b[0][0] + b[0][1], [-1, -1], 00, 90, [     2*R - T + l + b[0][0], -W - 2*R + T - w - b[1][1],  R-r]]].map(i => q(r, T, i[0], i[1], 0).rotateX(i[2]).rotateY(i[3]).translate(i[4])),

  difference(
   cube({size: [L + 2*(2*R - T + l) + b[0][0] + b[0][1], W + 2*(2*R - T + w) + b[1][0] + b[1][1], T], center: true}),
   cube({size: [L + 2*(2*R - T)     + b[0][0] + b[0][1],     W + 2*(2*R - T) + b[1][0] + b[1][1], T], center: true}))
  .translate([-L/2 + b[0][0]/2 - b[0][1]/2, -W/2 + b[1][0]/2 - b[1][1]/2, R - T/2])).center([true,false,false]).scale(1);};
