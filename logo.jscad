//
// A JS CAD logo???
//
//  Author: Laust Frederiksen
//
// Fell free to adapt and/or modify as you see fit
// If you come up with anything useful please share :-) ;-)
//

`use strict`;

const Params = {    Teeth: 10,
                    Pitch: 5,
                 pressure: 20,
                clearance: 0,
                thickness: 5}; 

const involuteGear = (Teeth, Pitch, pressure, clearance, thickness) => {
 
 const pi = Math.PI,
        p = Teeth * Pitch/(2*pi),
        b = p * Math.cos(pi * pressure/180),
        o = p + Pitch/pi,
        r = p - (Pitch/pi + clearance),
        m = Math.sqrt(o*o - b*b)/b,
        a = Math.sqrt(p*p - b*b)/b,
        w = pi/Teeth + 2*(a - Math.atan(a)),

       resolution = 8;

 let P = [new CSG.Vector2D(0,0)];

 for(let i = 0; i <= resolution; i++) {
  let                   a = m*i/resolution,
                        t = a*b,
                        v = CSG.Vector2D.fromAngle(a);
                   P[i+1] = v.times(b).plus(v.normal().times(t));
                        v = CSG.Vector2D.fromAngle(w - a);
  P[2*resolution + 2 - i] = v.times(b).plus(v.normal().negated().times(t));}

 let tooth = new CSG.Polygon2D(P).extrude({offset: [0, 0, thickness]});

 let teeth = new CSG();
 for(let t = 0; t < Teeth; t++)
  teeth = teeth.unionForNonIntersecting(tooth.rotateZ(t*360/Teeth));

 const A = 2*pi/Teeth,
       C = 0.5*w; 
       P = [];
 for(let t = 0; t < Teeth; t++)
  P.push(CSG.Vector2D.fromAngle(C + t*A).times(r));

 return new CSG.Polygon2D(P).extrude({offset: [0, 0, thickness]}).union(teeth).translate([0, 0, -thickness/2]);};

const text = (c, x, y, e, co) => union(vector_text(x, y, c.toString()).map(p => rectangular_extrude(p, {w: 4, h: 2}).scale(e))).setColor(css2rgb(co));

const main = () => {

 const co = [`green`, `red`, `blue`];

 const gear = [1,1.5,2.5].map(i => involuteGear(Params.Teeth*i, Params.Pitch, Params.pressure, Params.clearance, Params.thickness));

 return union(color(co[1], gear[0]).rotateZ(18).translate([0.3,0,0]), 
              color(co[0], gear[1]).translate([Params.Pitch*4 + 0.3,0,0]),
              color(co[2], difference(union(cylinder({r: 25, h:Params.thickness}),
                                            torus({ro: 25, ri:Params.thickness/2}).translate([0,0, Params.thickness/2])).translate([0,0, -Params.thickness/2]),
                                      gear[2])).translate([Params.Pitch*2.5,0,0]).scale([1,1,1.5]),
              text(`JS`,0,0,0.28,`black`).translate([-5,-2.5,2]),
              text(`CAD`,0,0,0.33,`black`).translate([10.5,-3.5,2]),
              color(`black`, difference(cube({size: [70,30,3], roundradius: 2, resolution: 8, center: true}),
                                        cylinder({r: 3, h:10, center: true}).translate([25,0,0]))).translate([20,0,0]));};
