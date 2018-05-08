//
//
// Filler
//
//

'use strict';

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

const R = 7;
const H = 50;
const L = 20;
const W = 45;
const T = 4;
const h = 6;
const l = 5;
const w = 7;
const b = [5, 9, 13, 17];
const bb = b.map(i => Math.sqrt(H*H + i*i));

const main = () => {
 const A = [linear_extrude({height: T, center: false }, polygon([[-L/2, -H/2], [-L/2 - b[1], H/2], [L/2 + b[0], H/2], [L/2, -H/2]], closed)),
            linear_extrude({height: T, center: false }, polygon([[-W/2, -H/2], [-W/2 - b[3], H/2], [W/2 + b[2], H/2], [W/2, -H/2]], closed))];

 return union(
  color("green", A[0]).translate([0, 0, -T/2]).rotateX(90).translate([-L/2,      R - T/2 + b[2], -H/2]),
  color("green", A[0]).translate([0, 0, -T/2]).rotateX(90).translate([-L/2, -W - R + T/2 - b[3], -H/2]),
  color("red",   A[1]).translate([0, 0, -T/2]).rotateY(90).rotateX(90).translate([ R - T/2 + b[0], -W/2, -H/2]),
  color("red",   A[1]).translate([0, 0, -T/2]).rotateY(90).rotateX(90).translate([-L - R + T/2 - b[1], -W/2, -H/2]),

  ...[].concat(
   [[[[ 1,  1, -1], [        0,        0,    -H]],
     [[ 1,  1]    , [     b[0],      b[2],     0]],
     [[ 1,  1,  1], [     b[0],      b[2],     0]],
     [[ 1,  1]    , [     b[0],      b[2], R-T/2]]],
    [[[-1,  1, -1], [-L       ,         0,    -H]],
     [[-1,  1]    , [-L - b[1],      b[2],     0]],
     [[-1,  1,  1], [-L - b[1],      b[2],     0]],
     [[-1,  1]    , [-L - b[1],      b[2], R-T/2]]],
    [[[ 1, -1, -1], [        0, -W       ,    -H]],
     [[ 1, -1]    , [     b[0], -W - b[3],     0]],
     [[ 1, -1,  1], [     b[0], -W - b[3],     0]],
     [[ 1, -1]    , [     b[0], -W - b[3], R-T/2]]],
    [[[-1, -1, -1], [-L       , -W       ,    -H]],
     [[-1, -1]    , [-L - b[1], -W - b[3],     0]],
     [[-1, -1,  1], [-L - b[1], -W - b[3],     0]],
     [[-1, -1]    , [-L - b[1], -W - b[3], R-T/2]]]].map(i => [
     e(      R,    T, i[0][0]).translate(i[0][1]),
     q(      R, T, H, i[1][0]).translate(i[1][1]),
     s(    2*R, R, T, i[2][0]).translate(i[2][1]),
     f(2*R - T,    T, i[3][0]).translate(i[3][1])])),

  [[[ 1,  1],           0, [   0,                   0, -H]],
   [[ 1, -1],           0, [   0,                  -W, -H]],
   [[-1,  1], b[0] + b[1], [b[0], -W - 2*R + T - b[3],  0]],
   [[-1, -1], b[0] + b[1], [b[0],      2*R - T + b[2],  0]]].map(i => q(R, T, L + i[1], i[0]).rotateY(90).translate(i[2])),

  [[[ 1,  1], b[2] + b[3], [-L - 2*R + T - b[1], -W - b[3],  0]],
   [[ 1, -1],           0, [                  0, -W,        -H]],
   [[-1,  1], b[2] + b[3], [     2*R - T + b[0], -W - b[3],  0]],
   [[-1, -1],           0, [                -L , -W,        -H]]].map(i => q(R, T, W + i[1], i[0]).rotateX(90).translate(i[2])),

  cube({size: [L, W, T], center: true}).translate([-L/2, -W/2, -H - R + T/2]),

  [[[ 1,  1,  1], [     2*R - T + l + b[0],      2*R - T + w + b[2], 0]],
   [[ 1, -1,  1], [     2*R - T + l + b[0], -W - 2*R + T - w - b[3], 0]],
   [[-1,  1,  1], [-L - 2*R + T - l - b[1],      2*R - T + w + b[2], 0]],
   [[-1, -1,  1], [-L - 2*R + T - l - b[1], -W - 2*R + T - w - b[3], 0]]].map(i => e(R, T, i[0]).translate(i[1])),

  q(R, T, W + 2*(2*R - T + w) + b[2] + b[3], [ 1,  1]).rotateX(90).translate([     2*R - T + l + b[0], -W - 2*R + T - w - b[3],  0]),
  q(R, T, W + 2*(2*R - T + w) + b[2] + b[3], [-1,  1]).rotateX(90).translate([-L - 2*R + T - l - b[1], -W - 2*R + T - w - b[3],  0]),
  q(R, T, L + 2*(2*R - T + l) + b[0] + b[1], [-1,  1]).rotateY(90).translate([     2*R - T + l + b[0],      2*R - T + w + b[2],  0]),
  q(R, T, L + 2*(2*R - T + l) + b[0] + b[1], [-1, -1]).rotateY(90).translate([     2*R - T + l + b[0], -W - 2*R + T - w - b[3],  0]),

  difference(
   cube({size: [L + 2*(2*R - T + l) + b[0] + b[1], W + 2*(2*R - T + w) + b[2] + b[3], T], center: true}),
   cube({size: [L + 2*(2*R - T)     + b[0] + b[1],     W + 2*(2*R - T) + b[2] + b[3],     T], center: true})
 ).translate([-L/2 + b[0]/2 - b[1]/2, -W/2 + b[2]/2 - b[3]/2, R - T/2])).scale(1);};


