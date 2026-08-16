(function () {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const warning = document.getElementById("browser-warning");

  if (isChrome) {
    warning.style.display = "none";
  } else {
    warning.style.display = "block";
  }
})();

// IST (Indian Standard Time) offset: UTC+5:30
const IST_OFFSET_MINUTES = 5.5 * 60;

function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + IST_OFFSET_MINUTES * 60000);
}

function updateClock() {
  const now = getISTDate();

  // Récupérer les heures et minutes
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Séparer les chiffres
  const [h1, h2] = hours.split("");
  const [m1, m2] = minutes.split("");

  // Sélecteurs
  const hour1 = document.querySelector(".hour-1 .glass");
  const hour2 = document.querySelector(".hour-2 .glass");
  const minute1 = document.querySelector(".minute-1 .glass");
  const minute2 = document.querySelector(".minute-2 .glass");

  // Fonction utilitaire pour changer la classe
  const setGlass = (element, num) => {
    element.className = `glass glass-${num}`;
  };

  // Mise à jour des classes
  setGlass(hour1, h1);
  setGlass(hour2, h2);
  setGlass(minute1, m1);
  setGlass(minute2, m2);

  // Update date and weekday
  updateDate(now);
}

function updateDate(date) {
  const weekdayEl = document.getElementById("weekday");
  const dateEl = document.getElementById("date");

  if (!weekdayEl || !dateEl) return;

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = weekdays[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  weekdayEl.textContent = dayName;
  dateEl.textContent = `${dayNum} ${monthName}, ${year}`;
}

// Mettre à jour immédiatement, puis chaque seconde
updateClock();
setInterval(updateClock, 1000);