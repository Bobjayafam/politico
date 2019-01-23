const triggers = document.querySelectorAll('.delete');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.querySelector('.cancel');

triggers.forEach(function(trigger){
  trigger.addEventListener('click', function(){
  modal.style.display = 'block';
  overlay.style.display = 'block';
});
});

closeBtn.addEventListener('click', function(){
  modal.style.display = 'none';
  overlay.style.display = 'none';
});

cancelBtn.addEventListener('click', function(){
  modal.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', function(){
  modal.style.display = 'none';
  overlay.style.display = 'none';
});