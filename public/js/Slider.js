let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(() => { next.click() }, 6000);
function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
})
window.onresize = function (event) {
    reloadSlider();
};

// contact ------------------ 
document.getElementById('contactTrigger').addEventListener('click', function () {
    const popup = document.getElementById('contactPopup');
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  });

//   falsh ------
setTimeout(() => {
    const flash = document.querySelector('.flash-message');
    if (flash) {
      flash.style.opacity = '0';
      flash.style.transition = 'opacity 4.6s ease';
      setTimeout(() => flash.remove(), 600);
    }
  }, 4000);
//profile -
  window.onclick = function(event) {
    const popup = document.getElementById('profilePopup');
    if (event.target !== popup && !popup.contains(event.target) &&
        event.target.closest('.button-57') === null) {
      popup.style.display = 'none';
    }
  };
  
