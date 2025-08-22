$(function() {
    // Load the nav bar component into #navBar
    $("#navBar").load("components/navbar.html");
});

// The Logic For Calender Page, Todays Date, Highlighting, Day Amount In The Month etc.
document.addEventListener("DOMContentLoaded", function () {
    const monthYearElement = document.getElementById("month-year");
    const daysElement = document.getElementById("calendar-days");

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
        for (let i = 0; i < blankDays; i++) {
            const blankDay = document.createElement("li");
            blankDay.classList.add("empty");
            daysElement.appendChild(blankDay);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement("li");
            dayElement.textContent = day;

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add("today");
            }

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

    updateCalendar(currentMonth, currentYear);
});