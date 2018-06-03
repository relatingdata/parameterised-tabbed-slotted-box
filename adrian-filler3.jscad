
//
//
// Adrians Filler
//
//
//'use strict';

const resolution = 32;

const e = (o, t, e, r) => intersection(
  difference(
   sphere({r: o,     fn: resolution, center: true}),
   sphere({r: o - t, fn: resolution, center: true})),
  cube({size: o, center: true}).translate([e[0]*o/2, e[1]*o/2, e[2]*o/2]),
  cube({size: o, center: true}).translate([e[0]*o/2, e[1]*o/2, e[2]*o/2]).rotateY(r));

const f = (o, h, f) => intersection(
   difference(
    cube({size: [2*o, 2*o, h], center: true}),
    cylinder({r: o, h: h,  fn: resolution, center: true})),
   cube({size: [o, o, h], center: true}).translate([f[0]*o/2, f[1]*o/2, 0]));

const q = (o, t, h, q, r) => intersection(
   difference(
    cylinder({r: o,     h: h, fn: resolution, center: true}),
    cylinder({r: o - t, h: h, fn: resolution, center: true})).translate([0, 0, -h/2]),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, -h/2]),
   cube({size: [o, o, h], center: true}).translate([q[0]*o/2, q[1]*o/2, -h/2]).rotateZ(r));
  
const s = (o, i, t, s, h) => intersection(
  difference(
   torus({ro: o - t, ri: i,     fni: resolution ,fno: resolution, center: true}),
   torus({ro: o - t, ri: i - t, fni: resolution, fno: resolution, center: true})),
  intersection(
  difference(
    cylinder({r: o - t + i*h,      h: 2*i, fn: resolution, centre: true}).translate([0,0,-i]),
    cylinder({r: o - t - i  + i*h, h: 2*i, fn: resolution, centre: true}).translate([0,0,-i])),
   cube({size: [(o + i - t), (o + i - t), i], center: true}).translate([s[0]*(o + i - t)/2, s[1]*(o + i - t)/2, s[2]*i/2])));

const main = () => {
 const R = 12.5;
 const H = 70;
 const W = 125;
 const L = 45;
 const T = 2.3;
 const RR = 2.31;
 const t = 1.0;
 const r = 3.5;
 const c = 4;
 const rr = 4.5;
 const l = 8.0;
 const w = 8.0;
 const h = 0;
 const b = [[55, 0.5], [0, 0]];[20 + 5, 20 + 9, 20 + 13, 20 + 17];[0, 0, 0, 0];[H, H, H, H];

 const hh = [b[0].map(i => Math.hypot(H, i)), b[1].map(i => Math.hypot(H, i))];
 const hhh = b[0].map(j => b[1].map(i => Math.hypot(H, i,j)));
 const hhhh = [hhh[0][0], hhh[0][1], hhh[1][0], hhh[1][1]];
 const bb = b.map(j => j.map(i => Math.atan(i/H)/(Math.PI/180)));
 const bbbb = [bb[0][0], bb[0][1], bb[1][0], bb[1][1]];


 const A = [[[[-W/2, -hh[0][0]/2], [-W/2 - b[1][1], hh[0][0]/2], [W/2 + b[1][0], hh[0][0]/2], [W/2, -hh[0][0]/2]], 90, 90],
            [[[-W/2, -hh[0][1]/2], [-W/2 - b[1][1], hh[0][1]/2], [W/2 + b[1][0], hh[0][1]/2], [W/2, -hh[0][1]/2]], 90, 90],
            [[[-L/2, -hh[1][0]/2], [-L/2 - b[0][1], hh[1][0]/2], [L/2 + b[0][0], hh[1][0]/2], [L/2, -hh[1][0]/2]], 00, 90],
            [[[-L/2, -hh[1][1]/2], [-L/2 - b[0][1], hh[1][1]/2], [L/2 + b[0][0], hh[1][1]/2], [L/2, -hh[1][1]/2]], 00, 90]]
             .map(i => linear_extrude({height: T, center: false }, polygon({ points: i[0], closed: true})).translate([0, 0, -T/2]).rotateY(i[1]).rotateX(i[2]));
 
 const B = [[[ 1,  1], [     b[0][0],      b[1][0]]],
            [[ 1, -1], [     b[0][0], -W - b[1][1]]],
            [[-1,  1], [-L - b[0][1],      b[1][0]]],
            [[-1, -1], [-L - b[0][1], -W - b[1][1]]]];

 return union(
  color("lightblue", 
   A[0].rotateX(0).rotateY( bb[0][0]).translate([           (R - T/2)*H/hh[0][0] + b[0][0]/2, -W/2, -H/2 - (R - T/2)*b[0][0]/hh[0][0]]),
   A[1].rotateX(0).rotateY(-bb[0][1]).translate([      -L - (R - T/2)*H/hh[0][1] - b[0][1]/2, -W/2, -H/2 - (R - T/2)*b[0][1]/hh[0][1]]),
   A[2].rotateX(-bb[1][0]).rotateY(0).translate([-L/2,      (R - T/2)*H/hh[1][0] + b[1][0]/2,       -H/2 - (R - T/2)*b[1][0]/hh[1][0]]),
   A[3].rotateX( bb[1][1]).rotateX(0).translate([-L/2, -W - (R - T/2)*H/hh[1][1] - b[1][1]/2,       -H/2 - (R - T/2)*b[1][1]/hh[1][1]]),

   ...[].concat(
    [[[[ 1,  1, -1], [           0,            0,      -H]],
      [[ 1,  1]    , [     b[0][0],      b[1][0],       0], -bb[1][0],  bb[0][0]],
      [[ 1,  1,  1], [     b[0][0],      b[1][0],       0]]],
     [[[ 1, -1, -1], [           0, -W          ,      -H]],
      [[ 1, -1]    , [     b[0][0], -W - b[1][1],       0],  bb[1][1],  bb[0][0]],
      [[ 1, -1,  1], [     b[0][0], -W - b[1][1],       0]]],
     [[[-1,  1, -1], [-L          ,            0,      -H]],
      [[-1,  1]    , [-L - b[0][1],      b[1][0],       0], -bb[1][0], -bb[0][1]],
      [[-1,  1,  1], [-L - b[0][1],      b[1][0],       0]]],
     [[[-1, -1, -1], [-L          , -W          ,      -H]],
      [[-1, -1]    , [-L - b[0][1], -W - b[1][1],       0],  bb[1][1], -bb[0][1]],
      [[-1, -1,  1], [-L - b[0][1], -W - b[1][1],       0]]]]
     .map((i, x) => [e(      R,    T, i[0][0], x===0 || x===1 ? bb[0][0] : -bb[0][1]).translate(i[0][1]) ,
                     e(      R,    T, i[0][0], x===0 || x===1 ? (bb[0][0] - 90) : (90 - bb[0][1])).translate([i[1][1][0], i[1][1][1], 0]),
                     q(      R,    T, hhhh[x], i[1][0], 0).rotateX(i[1][2]).rotateY(i[1][3]).translate(i[1][1]),
                     q(R + rr + l - T, l, T, i[1][0],0).translate([i[2][1][0], i[2][1][1], rr]),
                     s(R + rr,       rr, T, i[2][0], 0).translate(i[2][1]),
                     s(R + rr + l,   r, T, [i[2][0][0], i[2][0][1], -i[2][0][2]], 1).translate(i[2][1]).translate([0, 0, rr + r - T])])),

   [[[-1,  1], b[0][0] + b[0][1], [b[0][0], -W - R - rr + T - b[1][1],  0]],
    [[-1, -1], b[0][0] + b[0][1], [b[0][0],      R + rr - T + b[1][0],  0]]]
    .map(i => q(rr, T, L + i[1], i[0], 0).rotateY(90).translate(i[2])),
/*
   [[[ 1,  1], b[0][0] + b[0][1], [b[0][0],      b[1][0],  0]],
    [[ 1, -1], b[0][0] + b[0][1], [b[0][0], -W - b[1][1],  0]]]
    .map(i => q(R, T, L + i[1], i[0], 0).rotateY(90).translate(i[2])),
*/
  
   [[[ 1,  1], b[1][0] + b[1][1], [-L - R - rr + T - b[0][1], -W - b[1][1], 0], 0],
    [[-1,  1], b[1][0] + b[1][1], [     R + rr - T + b[0][0], -W - b[1][1], 0], 0]]
    .map(i => q(rr, T, W + i[1], i[0], i[3]).rotateX(90).translate(i[2])),
 
   [[[ 1,  1],  0, [  0,  0, -H]],
    [[ 1, -1],  0, [  0, -W, -H]]]
    .map(i => q(R, T, L + i[1], i[0], 0).rotateY(90).translate(i[2])),
  
   [[[ 1, -1],  0, [  0, -W, -H], -bb[0][0]],
    [[-1, -1],  0, [ -L, -W, -H], bb[0][1]]]
    .map(i => q(R, T, W + i[1], i[0], i[3]).rotateX(90).translate(i[2])),

   [[[-1, -1], b[1][0] + b[1][1], [-L - b[0][1], -W - b[1][1],  0], bb[0][1] - 90],
    [[ 1, -1], b[1][0] + b[1][1], [     b[0][0], -W - b[1][1],  0], 90 - bb[0][0]]]
    .map(i => q(R, T, W + i[1], i[0], i[3]).rotateX(90).translate(i[2])),

   cube({size: [L, W, T], center: true}).translate([-L/2, -W/2, -H - R + T/2]),

   [[[  1, -1], W + b[1][0] + b[1][1], 90,  0, [     R + rr - T + l + b[0][0],                  -W - b[1][1]]],
    [[ -1, -1], W + b[1][0] + b[1][1], 90,  0, [-L - R - rr + T - l - b[0][1],                  -W - b[1][1]]],
    [[  1,  1], L + b[0][0] + b[0][1],  0, 90, [                      b[0][0],      R + rr - T + w + b[1][0]]],
    [[  1, -1], L + b[0][0] + b[0][1],  0, 90, [                      b[0][0], -W - R - rr + T - w - b[1][1]]]]
    .map(i => q(r, T, i[1], i[0], 0).rotateX(i[2]).rotateY(i[3]).translate([...i[4], rr + r - T])),

   [[[l, W + b[1][0] + b[1][1], T], [     R + rr - T + l/2 + b[0][0],                  -W/2 - b[1][1]]],
    [[l, W + b[1][0] + b[1][1], T], [-L - R - rr + T - l/2 - b[0][1],                  -W/2 - b[1][1]]],
    [[L + b[0][0] + b[0][1], w, T], [   -L/2 + b[0][0]/2 - b[0][1]/2,      R + rr - T + w/2 + b[1][0]]],
    [[L + b[0][0] + b[0][1], w, T], [   -L/2 + b[0][0]/2 - b[0][1]/2, -W - R - rr + T - w/2 - b[1][1]]]] 
    .map(i => cube({size: i[0], center: true}).translate([...i[1], rr - T/2]))), 

  color("red",
   difference(cube({size: [L + 2*(R + rr + r + l - RR - 2*T) + b[0][0] + b[0][1], W + 2*(R + rr + r + l  - RR - 2*T) + b[1][0] + b[1][1], t], center: true})
              .translate([(-L + b[0][0] - b[0][1])/2, (-W + b[1][0] - b[1][1])/2,  RR]),
    union(B.map(i => f(R + rr + r + l - RR - 2*T, t, i[0]).translate([...i[1], RR])))),

    B.map(i => s(R + rr + r + l - RR - 2*T + t, RR, t, [...i[0], 1], 1).translate([...i[1], t/2])),

   [[[ 1,  1], W + b[1][0] + b[1][1], 90,  0, [     R + rr + r + l - RR - 2*T + b[0][0],                             -W - b[1][1], t/2]],
    [[-1,  1], W + b[1][0] + b[1][1], 90,  0, [-L - R - rr - r - l + RR + 2*T - b[0][1],                             -W - b[1][1], t/2]],
    [[-1,  1], L + b[0][0] + b[0][1],  0, 90, [                                 b[0][0],      R + rr + r + w - RR - 2*T + b[1][0], t/2]],
    [[-1, -1], L + b[0][0] + b[0][1],  0, 90, [                                 b[0][0], -W - R - rr - r - w + RR + 2*T - b[1][1], t/2]]]
    .map(i => q(RR, t, i[1], i[0], 0).rotateX(i[2]).rotateY(i[3]).translate(i[4])),
   
  difference(
   cube({size: [L + 2*(R + rr + 2*l + r - T + RR) + b[0][0] + b[0][1], W + 2*(R + rr + r - T + 2*w + RR) + b[1][0] + b[1][1], t], center: true}),
   cube({size: [L + 2*(R + rr +   l + r - T + RR) + b[0][0] + b[0][1], W + 2*(R + rr + r - T +   w + RR) + b[1][0] + b[1][1], t], center: true}))
   .translate([(-L + b[0][0] - b[0][1])/2, (-W + b[1][0] - b[1][1])/2,  RR]),

   [[[-1,  1], W + b[1][0] + b[1][1], 90,  0, [     R + rr + r + l - T + RR + b[0][0],                           -W - b[1][1],t/2]],
    [[ 1,  1], W + b[1][0] + b[1][1], 90,  0, [-L - R - rr - r - l + T - RR - b[0][1],                           -W - b[1][1],t/2]],
    [[-1, -1], L + b[0][0] + b[0][1],  0, 90, [                               b[0][0],      R + rr + r + w - T + RR + b[1][0],t/2]],
    [[-1,  1], L + b[0][0] + b[0][1],  0, 90, [                               b[0][0], -W - R - rr - r - w + T - RR - b[1][1],t/2]]]
    .map(i => q(RR, t, i[1], i[0], 0).rotateX(i[2]).rotateY(i[3]).translate(i[4])),

   ...[].concat(
    B.map(i => [f(R + rr + r + l - T + RR, t, i[0]).translate([...i[1], RR]),
                s(R + rr + r + l - T + RR + t, RR, t, [...i[0], 1], 0).translate([...i[1], t/2])]))).translate([0, 0, rr + r - T - t/2]));};

