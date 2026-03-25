/* ===== MySubaru Prototype — App Logic ===== */

/* Navigation */
function nav(p){window.location.href=p}
function back(){history.length>1?history.back():nav('../index.html')}

/* Menu */
function openMenu(){document.querySelector('.ov')?.classList.add('show');document.querySelector('.sm')?.classList.add('show')}
function closeMenu(){document.querySelector('.ov')?.classList.remove('show');document.querySelector('.sm')?.classList.remove('show')}

/* Stepper */
function step(id,d){const e=document.getElementById(id);if(!e)return;let v=parseInt(e.textContent)+d;e.textContent=Math.max(0,Math.min(10,v))}

/* Picker */
function showPicker(){document.querySelector('.picker-overlay')?.classList.add('show');document.querySelector('.picker')?.classList.add('show')}
function hidePicker(){document.querySelector('.picker-overlay')?.classList.remove('show');document.querySelector('.picker')?.classList.remove('show')}

/* PIN */
function showPin(){document.querySelector('.picker-overlay')?.classList.add('show');document.querySelector('.pin-sheet')?.classList.add('show')}
function hidePin(){document.querySelector('.picker-overlay')?.classList.remove('show');document.querySelector('.pin-sheet')?.classList.remove('show')}

let pinCode='';
function pinKey(n){
  if(pinCode.length>=4)return;
  pinCode+=n;
  updateDots();
  if(pinCode.length===4){
    setTimeout(()=>{
      const next=document.querySelector('.pin-sheet')?.dataset.next;
      if(next)nav(next);
    },400);
  }
}
function pinDel(){pinCode=pinCode.slice(0,-1);updateDots()}
function updateDots(){
  document.querySelectorAll('.pin-dot').forEach((d,i)=>{
    d.classList.toggle('empty',i>=pinCode.length);
  });
}

/* Status notification */
function showStatus(msg){
  const s=document.querySelector('.status-bottom');
  if(s){s.style.display='flex';s.querySelector('.sm-text').textContent=msg;}
}

/* Save -> navigate to next */
function saveTo(page){nav(page)}
