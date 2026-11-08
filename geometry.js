document.addEventListener("DOMContentLoaded", () => {
 const $=id=>document.getElementById(id), num=id=>Number($(id).value);
 $("triangle-calculate").addEventListener("click",()=>{
  const a=num("angle-a"),b=num("angle-b"),o=$("triangle-output");
  if(![a,b].every(Number.isFinite)||a<=0||b<=0||a+b>=180){o.textContent="Enter positive angles whose sum is less than 180°.";return;}
  o.textContent=`Third angle = 180° − ${a}° − ${b}° = ${180-a-b}°.`;
 });
 $("quad-calculate").addEventListener("click",()=>{
  const vals=["quad-a","quad-b","quad-c"].map(num),o=$("quad-output");
  if(!vals.every(Number.isFinite)||vals.some(v=>v<=0)||vals.reduce((s,v)=>s+v,0)>=360){o.textContent="Enter three positive angles whose sum is less than 360°.";return;}
  o.textContent=`Fourth angle = 360° − (${vals.join("° − ")}°) = ${360-vals.reduce((s,v)=>s+v,0)}°.`;
 });
 $("pythagoras-calculate").addEventListener("click",()=>{
  const a=num("side-a"),b=num("side-b"),o=$("pythagoras-output");
  if(![a,b].every(Number.isFinite)||a<=0||b<=0){o.textContent="Both side lengths must be positive numbers.";return;}
  o.textContent=`c = √(${a}² + ${b}²) = ${Math.sqrt(a*a+b*b).toFixed(4)} units.`;
 });
});

document.addEventListener("DOMContentLoaded", () => {
 const $=id=>document.getElementById(id), val=id=>Number($(id).value), fmt=n=>Number(n.toFixed(4));
 const tri=$("triangle-measure"); if(tri) tri.addEventListener("click",()=>{
  const base=val("tri-base"),height=val("tri-height"),sideA=val("tri-side-a"),sideB=val("tri-side-b"),sideC=val("tri-side-c"),o=$("triangle-measure-output");
  if([base,height,sideA,sideB,sideC].some(v=>!Number.isFinite(v)||v<=0)){o.textContent="All measurements must be positive numbers.";return;}
  if(sideA+sideB<=sideC||sideA+sideC<=sideB||sideB+sideC<=sideA){o.textContent="These side lengths cannot form a triangle. Each pair of sides must add to more than the third side.";return;}
  const semi=(sideA+sideB+sideC)/2,heron=Math.sqrt(semi*(semi-sideA)*(semi-sideB)*(semi-sideC));
  o.innerHTML=`<small>Area by base-height = ½ × ${base} × ${height} = ${fmt(base*height/2)} square units.</small><small>Perimeter = ${sideA} + ${sideB} + ${sideC} = ${fmt(sideA+sideB+sideC)} units.</small><small>Heron's formula: s = (${sideA} + ${sideB} + ${sideC}) ÷ 2 = ${fmt(semi)}.</small><small>Area = √[s(s − a)(s − b)(s − c)] = ${fmt(heron)} square units (using the three entered side lengths).</small>`;
 });
 const shape=$("shape-calculate"); if(shape) shape.addEventListener("click",()=>{
  const type=$("shape-type").value,a=val("shape-a"),b=val("shape-b"),h=val("shape-height"),c=val("shape-side-c"),d=val("shape-side-d"),o=$("shape-output");
  const required=type==="square"?[a]:type==="rectangle"?[a,b]:type==="rhombus"?[a,h]:type==="parallelogram"?[a,b,h]:[a,b,h,c,d];
  if(required.some(v=>!Number.isFinite(v)||v<=0)){o.textContent="Enter positive measurements in the fields required for this shape.";return;}
  let area,perimeter,rule;
  if(type==="square"){area=a*a;perimeter=4*a;rule=`Area = ${a}²; perimeter = 4 × ${a}.`;}
  if(type==="rectangle"){area=a*b;perimeter=2*(a+b);rule=`Area = length × breadth = ${a} × ${b}; perimeter = 2(${a} + ${b}).`;}
  if(type==="rhombus"){area=a*h;perimeter=4*a;rule=`Area = side/base × perpendicular height = ${a} × ${h}; perimeter = 4 × side.`;}
  if(type==="parallelogram"){area=a*h;perimeter=2*(a+b);rule=`Area = base × perpendicular height = ${a} × ${h}; perimeter = 2(${a} + ${b}).`;}
  if(type==="trapezium"){area=.5*(a+b)*h;perimeter=a+b+c+d;rule=`Area = ½ × (parallel sides ${a} + ${b}) × height ${h}; perimeter = ${a} + ${b} + ${c} + ${d}.`;}
  o.innerHTML=`${rule}<small>Area = ${fmt(area)} square units.</small><small>Perimeter = ${fmt(perimeter)} units.</small>`;
 });
});
