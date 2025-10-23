const toggle = document.getElementById('toggle_switch');
const offCircle = document.querySelector('.off-circle');
const onCircle = document.querySelector('.on-circle');


// For the toogle switch
toggle.addEventListener('click', function () {
  toggle.classList.toggle('active');

  if (toggle.classList.contains('active')) {
    onCircle.classList.add('active');
    offCircle.classList.add('active');
  } else {
    onCircle.classList.remove('active');
    offCircle.classList.remove('active');
  }
}); 
