$(function() {
    // Load the nav bar component into #navBar
    $("#navBar").load("components/navbar.html");
});

document.addEventListener("DOMContentLoaded", function () {
    const monthYearElement = document.getElementById("month-year");
    const daysElement = document.getElementById("calendar-days");
    const metricsElement = document.createElement("div");
    metricsElement.id = "metrics-display";
    document.body.appendChild(metricsElement);

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function updateCalendar(month, year) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        daysElement.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const blankDays = (firstDay === 0 ? 6 : firstDay - 1);

        // Add blank days
        for (let i = 0; i < blankDays; i++) {
            const blankDay = document.createElement("li");
            blankDay.classList.add("empty");
            daysElement.appendChild(blankDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement("li");
            dayElement.textContent = day;

            const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            // Add click event with confirm
            dayElement.addEventListener("click", function () {
                const isConfirmed = confirm(`Do you want to view the summary for ${selectedDate}?`);
                if (isConfirmed) {
                    // Redirect to summary page for selected date
                    window.location.href = `summaryscreen.html?date=${selectedDate}`;
                }
            });

            daysElement.appendChild(dayElement);
        }
    }

    document.getElementById("prev-month").addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
    });

    document.getElementById("next-month").addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });

    // Initialize the calendar
    updateCalendar(currentMonth, currentYear);
});

// display current date
function displayCurrentDate() {
    const dateDisplayElement = document.getElementById("date-display");
    const currentDate = new Date();
    const date = currentDate.toDateString();
    dateDisplayElement.textContent = `${date}`;
}

//log time on button click to the console
function timeLogging(){
    const logTime = () => {
        const now = new Date();
        console.log(`Logged time: ${now.toLocaleTimeString()}`);
    };
    document.getElementById("log-start-time").addEventListener("click", logTime);
    document.getElementById("log-end-time").addEventListener("click", logTime);
}