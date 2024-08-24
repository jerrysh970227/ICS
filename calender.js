// JavaScript to generate the days dynamically
document.addEventListener('DOMContentLoaded', function () {
    const daysElement = document.querySelector('.calendar .days');
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
    let daysHTML = '';
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysHTML += `<div class="day empty"></div>`;
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const isActive = i === currentDay ? 'active' : '';
      daysHTML += `<div class="day ${isActive}">${i}</div>`;
    }
  
    daysElement.innerHTML = daysHTML;
  });
  