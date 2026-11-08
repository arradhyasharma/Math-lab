document.addEventListener("DOMContentLoaded",()=>{
 const $=id=>document.getElementById(id);
 function analyse(){
  const raw=$("dataset").value.trim(),out=$("stats-output");
  const values=raw.split(/[,\s]+/).filter(Boolean).map(Number);
  if(!raw||values.length===0||values.some(v=>!Number.isFinite(v))){out.textContent="Enter a list of valid numbers separated by commas or spaces.";return;}
  if(values.length>500){out.textContent="Please use 500 values or fewer for this activity.";return;}
  const sorted=[...values].sort((a,b)=>a-b),sum=values.reduce((s,v)=>s+v,0),n=sorted.length;
  const median=n%2?sorted[(n-1)/2]:(sorted[n/2-1]+sorted[n/2])/2;
  const counts=new Map();values.forEach(v=>counts.set(v,(counts.get(v)||0)+1));
  const maxCount=Math.max(...counts.values()),modes=[...counts].filter(([,c])=>c===maxCount).map(([v])=>v);
  $("mean-result").textContent=(sum/n).toFixed(2).replace(/\.00$/,"");
  $("median-result").textContent=String(Number(median.toFixed(4)));
  $("mode-result").textContent=maxCount===1?"None":modes.join(", ");
  out.textContent=`${n} observations · Sum = ${sum} · Sorted data: ${sorted.join(", ")}`;
  const steps=document.getElementById("stats-steps"); if(steps) steps.innerHTML=`<small>Mean: add all observations (${values.join(" + ")}) = ${sum}; divide by ${n} → ${(sum/n).toFixed(4)}.</small><small>Median: arrange in order (${sorted.join(", ")}). ${n%2?`The middle value is ${median}.`:`Average the two middle values: (${sorted[n/2-1]} + ${sorted[n/2]}) ÷ 2 = ${median}.`}</small><small>Mode: ${maxCount===1?"No value repeats, so there is no mode.":`The highest frequency is ${maxCount}; value(s) ${modes.join(", ")} occur most often.`}</small>`;
 }
 $("analyse-data").addEventListener("click",analyse);
 $("sample-data").addEventListener("click",()=>{$("dataset").value="4, 6, 6, 8, 10, 12";analyse();});
 analyse();
});
