document.addEventListener("DOMContentLoaded",()=>{
 const bank=[
 ["Algebra","Simplify: 3x + 2x.",["5","5x","6x","x"],1,"Like terms are added: 3x + 2x = 5x."],
 ["Algebra","Solve 2x + 5 = 17.",["5","6","7","11"],1,"Subtract 5, then divide by 2: x = 6."],
 ["Algebra","What is the degree of 4x³ + 2x − 7?",["1","2","3","4"],2,"The highest power of x is 3."],
 ["Geometry","The sum of the interior angles of a triangle is:",["90°","180°","270°","360°"],1,"A triangle's interior angles add to 180°."],
 ["Geometry","A square has side 6 cm. Its area is:",["12 cm²","24 cm²","36 cm²","48 cm²"],2,"Area = side² = 6² = 36 cm²."],
 ["Geometry","A quadrilateral's interior angles add to:",["180°","270°","360°","540°"],2,"A quadrilateral's interior angles add to 360°."],
 ["Coordinate geometry","The point (−3, 4) lies in:",["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"],1,"Negative x and positive y place it in Quadrant II."],
 ["Coordinate geometry","In y = 2x + 3, the slope is:",["3","2","−2","5"],1,"Compare with y = mx + c: m = 2."],
 ["Coordinate geometry","The point (0, −5) lies on:",["X-axis","Y-axis","Quadrant III","Origin"],1,"When x = 0, the point lies on the y-axis."],
 ["Statistics","The mean of 2, 4, 6 and 8 is:",["4","5","6","20"],1,"Mean = (2 + 4 + 6 + 8) ÷ 4 = 5."],
 ["Statistics","The median of 1, 3, 5, 7, 9 is:",["3","5","7","9"],1,"The middle value in ordered data is 5."],
 ["Statistics","The mode is the observation that:",["Is largest","Occurs most often","Is in the middle","Is the total"],1,"Mode is the value with the highest frequency."],
 ["Probability","A fair coin is tossed once. P(heads) is:",["0","1/4","1/2","1"],2,"One of two equally likely outcomes is heads."],
 ["Probability","A fair die is rolled. P(rolling a 6) is:",["1/2","1/3","1/6","1"],2,"One favourable face out of six equally likely faces gives 1/6."],
 ["Probability","A standard deck has how many hearts?",["4","13","26","52"],1,"There are 13 cards in each of the four suits." ]
 ];
 const root=document.getElementById("challenge-questions"),result=document.getElementById("challenge-result");let questions=[];
 function selectedTopics(){return [...document.querySelectorAll('input[name="topic"]:checked')].map(x=>x.value);}
 function render(){const topics=selectedTopics();questions=bank.filter(q=>topics.includes(q[0]));for(let i=questions.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[questions[i],questions[j]]=[questions[j],questions[i]];}if(!questions.length){root.innerHTML="<p>Select at least one topic, then build your test.</p>";result.textContent="Choose one or more topics to begin.";return;}root.innerHTML=questions.map((q,i)=>`<div class="question-card"><p class="eyebrow">${q[0].toUpperCase()}</p><h3>${i+1}. ${q[1]}</h3><div class="option-list">${q[2].map((v,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${v}</label>`).join("")}</div></div>`).join("");result.textContent=`Your ${questions.length}-question test is ready. Submit when finished.`;}
 document.getElementById("build-challenge").addEventListener("click",render);document.getElementById("select-all-topics").addEventListener("click",()=>{document.querySelectorAll('input[name="topic"]').forEach(x=>x.checked=true);});document.getElementById("clear-topics").addEventListener("click",()=>{document.querySelectorAll('input[name="topic"]').forEach(x=>x.checked=false);});
 document.getElementById("submit-challenge").addEventListener("click",()=>{if(!questions.length){result.textContent="Build a test by selecting at least one topic.";return;}let score=0;const details=[];questions.forEach((q,i)=>{const chosen=document.querySelector(`input[name="q${i}"]:checked`),ok=chosen&&Number(chosen.value)===q[3];if(ok)score++;details.push(`${i+1}. ${ok?"Correct":"Review"} — ${q[4]}`);});const previous=Number(localStorage.getItem("mathlab-best-score")||0),best=Math.max(previous,score);localStorage.setItem("mathlab-best-score",String(best));localStorage.setItem("mathlab-last-score",String(score));result.innerHTML=`Score: ${score} / ${questions.length}<small>Best score saved on this device: ${best} / ${questions.length} (best score is stored as a raw score, so compare only tests of the same length).</small><br><br>${details.map(d=>`<small>${d}</small>`).join("")}`;});
 document.getElementById("reset-challenge").addEventListener("click",render);render();
});
