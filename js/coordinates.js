document.addEventListener("DOMContentLoaded",()=>{
 const $=id=>document.getElementById(id);
 function plot(){
  const xs=$("coord-x").value,ys=$("coord-y").value,x=Number(xs),y=Number(ys),out=$("coord-output");
  if(xs.trim()===""||ys.trim()===""||!Number.isFinite(x)||!Number.isFinite(y)||x < -10||x>10||y < -8||y>8){out.textContent="Enter X from −10 to 10 and Y from −8 to 8.";return;}
  const cx=220+x*20,cy=170-y*20;
  $("lab-point").setAttribute("cx",cx);$("lab-point").setAttribute("cy",cy);
  $("lab-guide-x").setAttribute("x1",cx);$("lab-guide-x").setAttribute("x2",cx);$("lab-guide-x").setAttribute("y1",cy);$("lab-guide-x").setAttribute("y2",170);
  $("lab-guide-y").setAttribute("x1",220);$("lab-guide-y").setAttribute("x2",cx);$("lab-guide-y").setAttribute("y1",cy);$("lab-guide-y").setAttribute("y2",cy);
  $("lab-point-label").setAttribute("x",Math.min(395,Math.max(5,cx+10)));$("lab-point-label").setAttribute("y",Math.max(15,Math.min(325,cy-9)));
  $("lab-point-label").textContent=`(${x}, ${y})`;
  let q=x===0&&y===0?"the origin":x===0?"the Y-axis":y===0?"the X-axis":x>0&&y>0?"Quadrant I":x<0&&y>0?"Quadrant II":x<0&&y<0?"Quadrant III":"Quadrant IV";
  out.textContent=`Point (${x}, ${y}) is on ${q}.`;
 }
 $("coord-plot").addEventListener("click",plot);
 ["coord-x","coord-y"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key==="Enter")plot();}));
});

document.addEventListener("DOMContentLoaded",()=>{
 const $=id=>document.getElementById(id);const btn=$("line-plot");if(!btn)return;
 function analyse(){const raw=$("line-equation").value.replace(/\s+/g,"").toLowerCase(),out=$("line-output");let m,c,vertical=false,k;
  let match=raw.match(/^x=([+-]?\d+(?:\.\d+)?)$/);
  if(match){vertical=true;k=Number(match[1]);}
  else if((match=raw.match(/^y=([+-]?\d*\.?\d*)x(?:([+-]\d*\.?\d+))?$/))){const coeff=match[1];m=coeff===""||coeff==="+"?1:coeff==="-"?-1:Number(coeff);c=match[2]?Number(match[2]):0;}
  else if((match=raw.match(/^x=([+-]?\d*\.?\d*)y(?:([+-]\d*\.?\d+))?$/))){const coeff=match[1];const a=coeff===""||coeff==="+"?1:coeff==="-"?-1:Number(coeff);const b=match[2]?Number(match[2]):0;if(a===0){out.textContent="Coefficient of y cannot be zero in this form.";return;}m=1/a;c=-b/a;}
  else {out.textContent="Use a straight-line form such as y = 2x + 3, y = -x + 4, x = 2y + 3, or a vertical line x = 4.";return;}
  if(vertical){$("slope-result").textContent="Undefined";$("intercept-result").textContent="None";$("line-form-result").textContent=`x = ${k}`;const xpix=220+k*20;$("function-line").setAttribute("x1",xpix);$("function-line").setAttribute("x2",xpix);$("function-line").setAttribute("y1",10);$("function-line").setAttribute("y2",330);out.textContent=`This is a vertical line. Its slope is undefined and it does not cross the y-axis unless x = 0.`;return;}
  if(!Number.isFinite(m)||!Number.isFinite(c)){out.textContent="Please enter finite numeric coefficients.";return;}
  const form=`y = ${Number(m.toFixed(4))}x ${c<0?"− "+Math.abs(c):"+ "+c}`;$("slope-result").textContent=String(Number(m.toFixed(4)));$("intercept-result").textContent=String(Number(c.toFixed(4)));$("line-form-result").textContent=form;
  const y1=m*(-10)+c,y2=m*10+c;$("function-line").setAttribute("x1",20);$("function-line").setAttribute("y1",170-y1*20);$("function-line").setAttribute("x2",420);$("function-line").setAttribute("y2",170-y2*20);
  out.innerHTML=`<small>Rearranged form: ${form}.</small><small>Slope m = ${Number(m.toFixed(4))}. It tells how much y changes when x increases by 1.</small><small>Y-intercept = ${Number(c.toFixed(4))}, so the line crosses the y-axis at (0, ${Number(c.toFixed(4))}).</small>`;
 }
 btn.addEventListener("click",analyse);$("line-equation").addEventListener("keydown",e=>{if(e.key==="Enter")analyse();});analyse();
});


document.addEventListener("DOMContentLoaded",()=>{
 const $=id=>document.getElementById(id),fmt=n=>Number(n.toFixed(4));
 const measure=$("measure-points"); if(measure)measure.addEventListener("click",()=>{
  const ids=["point-x1","point-y1","point-x2","point-y2"],v=ids.map(id=>Number($(id).value)),o=$("measure-output");
  if(v.some((n,i)=>$(ids[i]).value.trim()===""||!Number.isFinite(n))){o.textContent="Enter four valid coordinates.";return;}
  const [x1,y1,x2,y2]=v,dx=x2-x1,dy=y2-y1,d=Math.hypot(dx,dy),mx=(x1+x2)/2,my=(y1+y2)/2;
  $("distance-result").textContent=String(fmt(d));$("midpoint-result").textContent=`(${fmt(mx)}, ${fmt(my)})`;
  o.innerHTML=`<small>Δx = x₂ − x₁ = ${x2} − (${x1}) = ${fmt(dx)}.</small><small>Δy = y₂ − y₁ = ${y2} − (${y1}) = ${fmt(dy)}.</small><small>Distance = √[(${fmt(dx)})² + (${fmt(dy)})²] = ${fmt(d)} units.</small><small>Midpoint = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${fmt(mx)}, ${fmt(my)}).</small>`;
 });
 const build=$("build-shape");if(!build)return;
 const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x),dist=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y),near=(a,b)=>Math.abs(a-b)<1e-6;
 function intersects(a,b,c,d){const ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b);return ab1*ab2< -1e-9&&cd1*cd2< -1e-9;}
 function classify(P,L){const n=P.length;if(n===3)return "Triangle";if(n!==4)return `${n}-sided polygon`;const sides=L,angles=P.map((p,i)=>{const prev=P[(i+3)%4],next=P[(i+1)%4];const u={x:prev.x-p.x,y:prev.y-p.y},v={x:next.x-p.x,y:next.y-p.y};return u.x*v.x+u.y*v.y;});const parallel=(a,b)=>Math.abs(a.x*b.y-a.y*b.x)<1e-6;const vec=(i)=>({x:P[(i+1)%4].x-P[i].x,y:P[(i+1)%4].y-P[i].y});const v= P.map((_,i)=>vec(i));const oppParallel=parallel(v[0],v[2])&&parallel(v[1],v[3]);const allEqual=sides.every(x=>near(x,sides[0]));const right=angles.every(x=>Math.abs(x)<1e-6);if(oppParallel&&right&&allEqual)return "Square";if(oppParallel&&right)return "Rectangle";if(oppParallel&&allEqual)return "Rhombus";if(oppParallel)return "Parallelogram";if(parallel(v[0],v[2])||parallel(v[1],v[3]))return "Trapezium";return "Quadrilateral";}
 build.addEventListener("click",()=>{const raw=$("shape-points").value.trim(),out=$("polygon-output"),drawing=$("polygon-drawing");let P;
  try{P=raw.split(/[;\n]+/).map(pair=>{const m=pair.trim().match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);if(!m)throw Error();return{x:Number(m[1]),y:Number(m[2])};});}catch(e){out.textContent="Use coordinate pairs such as 0,0; 4,0; 4,3; 0,3.";return;}
  if(P.length>1&&near(P[0].x,P[P.length-1].x)&&near(P[0].y,P[P.length-1].y))P.pop();if(P.length<3||P.length>12||P.some(p=>Math.abs(p.x)>10||Math.abs(p.y)>8)){out.textContent="Enter 3–12 distinct vertices within x = −10 to 10 and y = −8 to 8.";return;}
  for(let i=0;i<P.length;i++){const j=(i+1)%P.length;if(dist(P[i],P[j])<1e-8){out.textContent="Two neighbouring vertices are identical. Remove duplicate points.";return;}}
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){if(j===i||j===(i+1)%P.length||i===(j+1)%P.length)continue;if(intersects(P[i],P[(i+1)%P.length],P[j],P[(j+1)%P.length])){out.textContent="These edges cross. Enter the vertices around the outside boundary in order.";return;}}
  const L=P.map((p,i)=>dist(p,P[(i+1)%P.length]));let twice=0;P.forEach((p,i)=>{const q=P[(i+1)%P.length];twice+=p.x*q.y-q.x*p.y;});const area=Math.abs(twice)/2,per=L.reduce((a,b)=>a+b,0);if(area<1e-8){out.textContent="The points do not enclose an area. Choose non-collinear vertices.";return;}
  const type=classify(P,L);$("polygon-type").textContent=type;$("polygon-area").textContent=String(fmt(area));$("polygon-perimeter").textContent=String(fmt(per));
  const pts=P.map(p=>({x:220+p.x*20,y:170-p.y*20}));drawing.innerHTML=`<polygon points="${pts.map(p=>`${p.x},${p.y}`).join(" ")}" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="2.5"/>`+pts.map((p,i)=>`<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--accent)"/><text x="${p.x+6}" y="${p.y-6}" fill="var(--ink)" font-size="10">${i+1}</text>`).join("");
  out.innerHTML=`<small>Detected: ${type}. Vertices: ${P.map(p=>`(${p.x}, ${p.y})`).join(" → ")}.</small><small>Side lengths: ${L.map(fmt).join(", ")} units.</small><small>Perimeter = ${L.map(x=>fmt(x)).join(" + ")} = ${fmt(per)} units.</small><small>Area by the shoelace method = ½ × |Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)| = ${fmt(area)} square units.</small>`;
 });
 $("clear-shape").addEventListener("click",()=>{$("shape-points").value="";$("polygon-drawing").innerHTML="";["polygon-type","polygon-area","polygon-perimeter"].forEach(id=>$(id).textContent="—");$("polygon-output").textContent="Enter at least three vertices to build a polygon.";});
});
