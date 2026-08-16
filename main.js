(function () {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const warning = document.getElementById("browser-warning");

  if (warning) {
    warning.style.display = isChrome ? "none" : "block";
  }
})();

/*
 * ==========================================
 * INDIAN STANDARD TIME - DATE & WEEKDAY
 * ==========================================
 */

function getISTDateInfo() {
  const now = new Date();

  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(now);

  return {
    date,
    weekday,
  };
}

/*
 * ==========================================
 * CREATE DATE DISPLAY
 * ==========================================
 */

function createDateDisplay() {
  let dateInfo = document.getElementById("clock-date-info");

  // Prevent duplicate creation
  if (dateInfo) {
    return dateInfo;
  }

  dateInfo = document.createElement("div");
  dateInfo.id = "clock-date-info";

  dateInfo.innerHTML = `
    <div id="clock-date"></div>
    <div id="clock-weekday"></div>
  `;

  /*
   * Position the date below the main clock.
   */
  Object.assign(dateInfo.style, {
    position: "fixed",
    left: "50%",
    top: "calc(50% + 205px)",
    transform: "translateX(-50%)",

    zIndex: "20",

    textAlign: "center",

    color: "rgba(255, 255, 255, 0.92)",

    fontFamily: "Arial, Helvetica, sans-serif",

    letterSpacing: "2px",

    lineHeight: "1.4",

    textShadow: "0 2px 12px rgba(0, 0, 0, 0.35)",

    pointerEvents: "none",

    whiteSpace: "nowrap",
  });

  /*
   * Date styling
   */
  const dateElement = dateInfo.querySelector("#clock-date");

  Object.assign(dateElement.style, {
    fontSize: "18px",
    fontWeight: "500",
  });

  /*
   * Weekday styling
   */
  const weekdayElement = dateInfo.querySelector("#clock-weekday");

  Object.assign(weekdayElement.style, {
    marginTop: "5px",
    fontSize: "15px",
    fontWeight: "400",
    opacity: "0.85",
  });

  document.body.appendChild(dateInfo);

  return dateInfo;
}

/*
 * ==========================================
 * UPDATE DATE & WEEKDAY
 * ==========================================
 */

function updateDateDisplay() {
  const dateInfo = createDateDisplay();

  const {
    date,
    weekday,
  } = getISTDateInfo();

  const dateElement = dateInfo.querySelector("#clock-date");
  const weekdayElement = dateInfo.querySelector("#clock-weekday");

  if (dateElement) {
    dateElement.textContent = date;
  }

  if (weekdayElement) {
    weekdayElement.textContent = weekday;
  }
}

/*
 * ==========================================
 * UPDATE CLOCK
 * ==========================================
 */

function updateClock() {
  const now = new Date();

  /*
   * Get the current hour and minute
   * specifically from Indian Standard Time.
   */
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",

    hour: "2-digit",
    minute: "2-digit",

    hour12: false,
  }).formatToParts(now);

  const hours =
    timeParts.find((part) => part.type === "hour")?.value || "00";

  const minutes =
    timeParts.find((part) => part.type === "minute")?.value || "00";

  /*
   * Split HH:MM into individual digits.
   */

  const [h1, h2] = hours.split("");
  const [m1, m2] = minutes.split("");

  /*
   * Select clock digit elements.
   */

  const hour1 = document.querySelector(".hour-1 .glass");
  const hour2 = document.querySelector(".hour-2 .glass");

  const minute1 = document.querySelector(".minute-1 .glass");
  const minute2 = document.querySelector(".minute-2 .glass");

  /*
   * Change the glass digit.
   */

  const setGlass = (element, number) => {
    if (!element) {
      return;
    }

    element.className = `glass glass-${number}`;
  };

  /*
   * Update hours.
   */

  setGlass(hour1, h1);
  setGlass(hour2, h2);

  /*
   * Update minutes.
   */

  setGlass(minute1, m1);
  setGlass(minute2, m2);

  /*
   * Update date and weekday.
   */

  updateDateDisplay();
}

/*
 * ==========================================
 * START CLOCK
 * ==========================================
 */

updateClock();

/*
 * Keep the clock synchronized every second.
 */

setInterval(updateClock, 1000);
