//
//
// Filler
//
//

'use strict';

const e = (outer, thick, eight) => {
 return intersection(
  difference(
   sphere({r: outer, center: true}),
   sphere({r: outer - thick, center: true})),
  cube({size: outer, center: true}).translate([eight[0]*outer/2, eight[1]*outer/2, eight[2]*outer/2]));};

const q = (outer, thick, height, quarter) => {
  return intersection(
  difference(
   cylinder({r: outer, h: height, center: true}),
   cylinder({r: outer - thick, h: height, center: true})),
  cube({size: [outer, outer, height], center: true}).translate([quarter[0]*outer/2, quarter[1]*outer/2, height/2]));};
  
const s = (outer, inner, thick, eight) => {
 return intersection(
  difference(
   torus({ro: outer - thick, ri: inner, fni: 32, center: true}),
   torus({ro: outer - thick, ri: inner - thick, fni: 32, center: true})),
  intersection(
   cylinder({r: outer - thick, h: inner*2, centre: true}),
   cube({size: [outer*2, outer*2, inner + thick*2], center: true}).translate([eight[0]*outer, eight[1]*outer, eight[2]*(inner/2 + thick)])));};

const R = 6;
const H = 20;
const L = 120;
const W = 125;
const T = 2;
const l = 4;
const w = 5;

const main = () => {
 return union(
  e(R,   T,      [ 1,  1, -1]).translate([ 0,  0, -H/2]),
  q(R,   T,   H, [ 1,  1])    .translate([ 0,  0, -H/2]),
  s(2*R, R,   T, [ 1,  1, 1]) .translate([ 0,  0,    0]),
  e(R,   T,      [-1,  1, -1]).translate([-L,  0, -H/2]),
  q(R,   T,   H, [-1,  1])    .translate([-L,  0, -H/2]),
  s(2*R, R,   T, [-1,  1, 1]) .translate([-L,  0,    0]),
  e(R,   T,      [ 1, -1, -1]).translate([ 0, -W, -H/2]),
  q(R,   T,   H, [ 1, -1])    .translate([ 0, -W, -H/2]),
  s(2*R, R,   T, [ 1, -1, 1]) .translate([ 0, -W,    0]),
  e(R,   T,      [-1, -1, -1]).translate([-L, -W, -H/2]),
  q(R,   T,   H, [-1, -1])    .translate([-L, -W, -H/2]),
  s(2*R, R,   T, [-1, -1, 1]) .translate([-L, -W,    0]),

  q(R,   T, 2*L, [ 1,  1]).rotateY(90).translate([-L,                      0, -H/2]),
  q(R,   T, 2*L, [ 1, -1]).rotateY(90).translate([-L,                     -W, -H/2]),
  q(R,   T, 2*W, [-1, -1]).rotateX(90).translate([-L,                      0, -H/2]),
  q(R,   T, 2*W, [ 1, -1]).rotateX(90).translate([ 0,                      0, -H/2]),
  q(R,   T, 2*L, [-1, -1]).rotateY(90).translate([-L,                2*R - T,    0]),
  q(R,   T, 2*L, [-1,  1]).rotateY(90).translate([-L,           -W - 2*R + T,    0]),
  q(R,   T, 2*W, [ 1,  1]).rotateX(90).translate([-L - 2*R + T,            0,    0]),
  q(R,   T, 2*W, [-1,  1]).rotateX(90).translate([     2*R - T,            0,    0]),

  cube({size: [L, W, T], center: true}).translate([-L/2, -W/2, -H/2 - R + T/2]),
  difference(
   cube({size: [L + 2*(2*R - T + l), W + 2*(2*R - T + w), T], center: true}),
   cube({size: [L + 2*(2*R - T),     W + 2*(2*R - T),     T], center: true})).translate([-L/2, -W/2, R - T/2])).scale(2);};
