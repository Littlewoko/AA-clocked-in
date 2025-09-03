$(function () {
    // Load the nav bar component into #navBar
    $("#navBar").load("components/navbar.html");
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