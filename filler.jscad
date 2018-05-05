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
const T = 2;
const h = 6;
const l = 5;
const w = 7;

const main = () => {
 return color("orange", union(
  e(    R,    T, [ 1,  1, -1]).translate([ 0,  0,    -H]),
  q(    R, T, H, [ 1,  1])    .translate([ 0,  0,     0]),
  s(  2*R, R, T, [ 1,  1, 1]) .translate([ 0,  0,     0]),
  f(2*R-T,    T, [ 1,  1])    .translate([ 0,  0, R-T/2]),
  e(    R,    T, [-1,  1, -1]).translate([-L,  0,    -H]),
  q(    R, T, H, [-1,  1])    .translate([-L,  0,     0]),
  s(  2*R, R, T, [-1,  1, 1]) .translate([-L,  0,     0]),
  f(2*R-T,    T, [-1,  1])    .translate([-L,  0, R-T/2]),
  e(    R,    T, [ 1, -1, -1]).translate([ 0, -W,    -H]),
  q(    R, T, H, [ 1, -1])    .translate([ 0, -W,     0]),
  s(  2*R, R, T, [ 1, -1, 1]) .translate([ 0, -W,     0]),
  f(2*R-T,    T, [ 1, -1])    .translate([ 0, -W, R-T/2]),
  e(    R,    T, [-1, -1, -1]).translate([-L, -W,    -H]),
  q(    R, T, H, [-1, -1])    .translate([-L, -W,     0]),
  s(  2*R, R, T, [-1, -1, 1]) .translate([-L, -W,     0]),
  f(2*R-T,    T, [-1, -1])    .translate([-L, -W, R-T/2]),

  q(R, T, L, [ 1,  1]).rotateY(90).translate([           0,            0, -H]),
  q(R, T, L, [ 1, -1]).rotateY(90).translate([           0,           -W, -H]),
  q(R, T, L, [-1,  1]).rotateY(90).translate([           0, -W - 2*R + T,  0]),
  q(R, T, L, [-1, -1]).rotateY(90).translate([           0,      2*R - T,  0]),
  q(R, T, W, [ 1,  1]).rotateX(90).translate([-L - 2*R + T,           -W,  0]),
  q(R, T, W, [ 1, -1]).rotateX(90).translate([           0,           -W, -H]),
  q(R, T, W, [-1,  1]).rotateX(90).translate([     2*R - T,           -W,  0]),
  q(R, T, W, [-1, -1]).rotateX(90).translate([          -L,           -W, -H]),
  
  cube({size: [L, W, T], center: true}).translate([        -L/2,         -W/2, -H - R + T/2]),

  cube({size: [L, T, H], center: true}).translate([        -L/2,      R - T/2,         -H/2]),
  cube({size: [L, T, H], center: true}).translate([        -L/2, -W - R + T/2,         -H/2]),
  cube({size: [T, W, H], center: true}).translate([     R - T/2,         -W/2,         -H/2]),
  cube({size: [T, W, H], center: true}).translate([-L - R + T/2,         -W/2,         -H/2]),

  e(    R,    T, [ 1,  1,  1]).translate([     2*R - T + l,      2*R - T + w, 0]),
  e(    R,    T, [-1,  1,  1]).translate([-L - 2*R + T - l,      2*R - T + w, 0]),
  e(    R,    T, [ 1, -1,  1]).translate([     2*R - T + l, -W - 2*R + T - w, 0]),
  e(    R,    T, [-1, -1,  1]).translate([-L - 2*R + T - l, -W - 2*R + T - w, 0]),

  q(R, T, L + 2*(2*R - T + l), [-1,  1]).rotateY(90).translate([2*R - T + l,         2*R - T + w,  0]),
  q(R, T, L + 2*(2*R - T + l), [-1, -1]).rotateY(90).translate([ 2*R - T + l,    -W - 2*R + T - w,  0]),
  q(R, T, W + 2*(2*R - T + w), [ 1,  1]).rotateX(90).translate([ 2*R + l - T,    -W - 2*R + T - w,  0]),
  q(R, T, W + 2*(2*R - T + w), [-1,  1]).rotateX(90).translate([-L - 2*R - l + T,-W - 2*R + T - w,  0]),

  difference(
   cube({size: [L + 2*(2*R - T + l), W + 2*(2*R - T + w), T], center: true}),
   cube({size: [L + 2*(2*R - T),     W + 2*(2*R - T),     T], center: true})).translate([-L/2, -W/2, R - T/2]))).scale(1).translate([0, 0, H + 2*R]);};





