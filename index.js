/* variables */
let date = new Date()
    , year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getUTCDate()
let timeRemainng = document.querySelector(".main-select-box h5 span"),
    selectedDate = localStorage.getItem("startDate") ? new Date(Object.values(JSON.parse(localStorage.getItem("startDate"))).join()) : ""
currentDate = new Date(selectedDate),
    timeProgrees = document.querySelector("main > div span");
let dayPerms = 864e5;
dayPerms = dayPerms === 864e5 ? 1 : null
dayPerms = localStorage.getItem("interval", dayPerms) ? +localStorage.getItem("interval", dayPerms) : dayPerms;

console.log()
// console.log(date.getTime())

let spans = document.querySelectorAll("main section h4 span");
let finaldate = localStorage.getItem("interval") ? Math.trunc(+localStorage.getItem("interval", dayPerms) / 90 * 100) : Math.trunc((Date.parse(date) - Date.parse(currentDate)) / 86400000);
let resetBtn = document.getElementById("reset")
let porgressCount = document.querySelector("main span.progress");
let endDate = new Date(Date.parse(currentDate) + (864e5 * 90));
let endDateElement = document.querySelector(".main-select-box>div:nth-child(2) span")
let DateByPers = Math.trunc((finaldate / 90) * 100)
console.log(DateByPers)
/* variables */
console.log(endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear());
if (localStorage.getItem("startDate")) {
    // timeProgrees.style.width = `${finaldate}%`
    endDateElement.innerHTML = `<span> End Date Is: => ( ${endDate.getDate()} - ${endDate.getMonth() + 1} - ${endDate.getFullYear()} )</span>`
}
endDateElement.style.fontWeight = "bold"

if (localStorage.getItem("interval")) {
    // timeProgrees.style.width = `${finaldate}% !important`
    porgressCount.textContent = `${finaldate}%`
    timeProgrees.style.width = `${finaldate}% `;
    spans[0].textContent = localStorage.getItem("interval")
}
else {
    spans[0].textContent = finaldate
    porgressCount.textContent = `${DateByPers}%`
    timeProgrees.style.width = `${DateByPers}% `;
    timeRemainng.textContent = finaldate
    if (parseInt((spans[0].textContent)) > 90 || parseInt((spans[0].textContent)) < 0) {
        document.querySelector("main section h4 ").textContent = `Not Valid Date`
    }
}

spans[0].style.background = "#0f0"
spans[1].style.background = "#f00"
spans.forEach(e => {
    e.style.color = "#fff"
    e.style.padding = "10px"
    e.style.borderRaduis = "10px"
})
const handelInterval = () => {
    if (dayPerms < 90) {
        dayPerms++
        timeRemainng.textContent = localStorage.getItem("interval");
        timeProgrees.style.width = `${localStorage.getItem("interval")}%`;
        porgressCount.textContent = `${finaldate} %`
        localStorage.setItem("interval", dayPerms)
        spans[0].textContent = localStorage.getItem("interval")
    }
}
setInterval(handelInterval, 864e5);


/* last operation of This Fuckin site */


//  - Date.parse(date)
/* last operation of This Fuckin site */


let yearField = document.querySelector("#Year"),
    monthField = document.querySelector("#Month"),
    DayField = document.querySelector("#Day"),
    submitPress = document.getElementById("press")
// console.log(yearField.textContent.trim())
/* functions */
const calclation = () => {
    // year
    // month
    for (let i = 1; i <= 31; i++) {
        let yearOption = document.createElement("option");
        yearOption.textContent += i
        DayField.appendChild(yearOption)
    }
    //day
    for (let i = 12; i >= 1; i--) {
        if (i < 0) {
            break
        }
        let dayOption = document.createElement("option");
        dayOption.textContent += i
        monthField.appendChild(dayOption)
    }
}
calclation()

let listOfselects = document.querySelectorAll(".main-select-box>div select")
const submitCalclation = () => {
    for (let i = 0; i < listOfselects.length; i++) {
        listOfselects[i].addEventListener("change", () => {
            listOfselects[i].classList.add("changed")
            if (listOfselects[i].classList.contains("changed")) {
                submitPress.style.pointerEvents = "auto"
            } else {
                submitPress.style.pointerEvents = "none"
            }
        })
    }
    submitPress.addEventListener("click", (e) => {
        let dataObj = {
            y: "2023",
            m: monthField.value,
            d: DayField.value
        }
        localStorage.setItem("startDate", JSON.stringify(dataObj))
        localStorage.removeItem("interval")
        spans[0].textContent = finaldate
        porgressCount.textContent = `${DateByPers}%`
        timeProgrees.style.width = `${DateByPers}% `;
        timeRemainng.textContent = finaldate;
        if (parseInt((spans[0].textContent)) > 90 || parseInt((spans[0].textContent)) < 0) {
            document.querySelector("main section h4 ").textContent = `Not Valid Date`;
            timeRemainng.textContent = "??"
            timeProgrees.style.width = `${localStorage.getItem("interval")}%`;
            porgressCount.textContent = `?? %`
            spans[0].textContent = "??"
        }
        location.reload()
    })
    timeProgrees.style.width = `${localStorage.getItem("interval")}% !important`
}
submitCalclation()
// Reset Btn
resetBtn.addEventListener("click", () => {
    clearInterval(1)
    dayPerms = 0
    localStorage.setItem("interval", dayPerms);
    localStorage.setItem("startDate", JSON.stringify({ y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate() }));
    spans[0].textContent = 0
    if (+localStorage.getItem("interval") === 0) {
        timeProgrees.style.width = `0% `;
    }
    timeRemainng.textContent = finaldate;
    porgressCount.textContent = `${dayPerms} %`
    spans[0].textContent = localStorage.getItem("interval")
})