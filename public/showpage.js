let auth = JSON.parse(localStorage.getItem("token"));

if (!auth || auth === null) {
    window.location.pathname = "login.html";
}

const urlString = window.location.href;
const regex = /[?&]id=([^&]+)/;
const matches = urlString.match(regex);
let id = "";
if (matches && matches[1]) {
    id = matches[1];
    // console.log('ID:', id);
}

// Variable to store language state (English or Hindi)
let isHindi = false;

// Store fetched data globally
let mydata = "";
// const apiUrl = http://localhost:8080/diet;
// const apiUrl = `https://prakritibackend.onrender.com/diet`;
const apiUrl = `http://localhost:8080/api/diet`;

// Function to fetch diet data from the API and display it
function fetchDietData() {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.nextDate);
            mydata = { ...data };
            if (data) {
                const NextDate = new Date(data?.nextDate).toISOString().split('T')[0];
                const AppoinmentDate = new Date(data?.appoinmentDate).toISOString().split('T')[0];

                document.getElementById('loading').style.display = 'none';
                const dietTable = document.getElementById('diet-table');
                const tbody = dietTable.querySelector('tbody');

                document.getElementById("startDate").innerText = AppoinmentDate
                // document.getElementById("startDate").value= AppoinmentDate
                // document.getElementById("nextDate").value= NextDate
                document.getElementById("nextDate").innerText = NextDate

                // Fields that will be shown in the table
                const fields = [
                    { label: "Patient Name (नाम)", value: mydata.name },
                    { label: "Early Morning (प्रातः उठने पर)", value: mydata.earlyMorning },
                    { label: "Breakfast Time (सुबह का नाश्ता)", value: mydata.breakfastTime },
                    { label: "Lunch Time  (भोजन)", value: mydata.lunchTime },
                    { label: "Post Lunch Snacks (शाम का अल्पाहार)", value: mydata.postLunchSnacks },
                    { label: "Dinner Time (रात का भोजन)", value: mydata.dinnerTime },
                    { label: "Late Night Snacks (रात का अल्पाहार)", value: mydata.lateNightSnacks },
                    { label: "Remark (टिप्पणी)", value: mydata.remark || 'Not Provided' }
                ];

                fields.forEach(field => {
                    const row = document.createElement('tr');
                    const labelCell = document.createElement('td');
                    labelCell.textContent = field.label;
                    const valueCell = document.createElement('td');
                    valueCell.textContent = field.value;
                    row.appendChild(labelCell);
                    row.appendChild(valueCell);
                    tbody.appendChild(row);
                });

                dietTable.style.display = 'block';
            }
        })
        .catch(error => {
            // console.error('Error fetching diet data:', error);
            document.getElementById('loading').textContent = 'Failed to load data. Please try again later.';
        });
}

window.onload = fetchDietData;

// Function to translate content to Hindi
function translateToHindi() {
    const translateButton = document.getElementById("translateButton");

    if (!isHindi) {
        // Translate to Hindi
        // document.getElementById("fieldHeader").textContent = "क्षेत्र";
        // document.getElementById("detailsHeader").textContent = "विवरण";
        document.getElementById("loading").textContent = "डेटा लोड हो रहा है...";

        // Loop through the table rows and translate field names
        const rows = document.querySelectorAll("#diet-table tbody tr");
        rows.forEach(row => {
            const labelCell = row.querySelector("td:first-child");
            const valueCell = row.querySelector("td:nth-child(2)");

            if (labelCell && valueCell) {
                switch (labelCell.textContent) {
                    case "Patient Name (नाम)":
                        // labelCell.textContent = "नाम";
                        valueCell.textContent = mydata.nameOut || mydata.name;
                        break;
                    case "Early Morning (प्रातः उठने पर)":
                        // labelCell.textContent = "प्रातः समय";
                        valueCell.textContent = mydata.earlyMorningOut || mydata.earlyMorning;
                        break;
                    case "Breakfast Time (सुबह का नाश्ता)":
                        // labelCell.textContent = "नाश्ता समय";
                        valueCell.textContent = mydata.breakfastTimeOut || mydata.breakfastTime;
                        break;
                    case "Lunch Time  (भोजन)":
                        // labelCell.textContent = "दोपहर का भोजन समय";
                        valueCell.textContent = mydata.lunchTimeOut || mydata.lunchTime;
                        break;
                    case "Post Lunch Snacks (शाम का अल्पाहार)":
                        // labelCell.textContent = "दोपहर के बाद नाश्ता";
                        valueCell.textContent = mydata.postLunchSnacksOut || mydata.postLunchSnacks;
                        break;
                    case "Dinner Time (रात का भोजन)":
                        // labelCell.textContent = "रात्रि भोजन समय";
                        valueCell.textContent = mydata.dinnerTimeOut || mydata.dinnerTime;
                        break;
                    case "Late Night Snacks (रात का अल्पाहार)":
                        // labelCell.textContent = "रात्रि के समय नाश्ता";
                        valueCell.textContent = mydata.lateNightSnacksOut || mydata.lateNightSnacks;
                        break;
                    case "Remark (टिप्पणी)":
                        valueCell.textContent = mydata.remarkOut || mydata.remark;
                        break;
                    default:
                        break;
                }
            }
        });

        translateButton.innerText = "Translate to English";
        isHindi = true;
    } else {
        // Translate back to English
        // document.getElementById("fieldHeader").textContent = "Field";
        // document.getElementById("detailsHeader").textContent = "Details";
        // document.getElementById("loading").textContent = "Loading data...";

        // Loop through the table rows and reset field names to English
        const rows = document.querySelectorAll("#diet-table tbody tr");
        rows.forEach(row => {
            const labelCell = row.querySelector("td:first-child");
            const valueCell = row.querySelector("td:nth-child(2)");

            if (labelCell && valueCell) {
                switch (labelCell.textContent) {
                    case "Patient Name (नाम)":
                        // labelCell.textContent = "Patient Name";
                        valueCell.textContent = mydata.name;
                        break;
                    case "Early Morning (प्रातः उठने पर)":
                        // labelCell.textContent = "Early Morning";
                        valueCell.textContent = mydata.earlyMorning;
                        break;
                    case "Breakfast Time (सुबह का नाश्ता)":
                        // labelCell.textContent = "Breakfast Time";
                        valueCell.textContent = mydata.breakfastTime;
                        break;
                    case "Lunch Time  (भोजन)":
                        // labelCell.textContent = "Lunch Time";
                        valueCell.textContent = mydata.lunchTime;
                        break;
                    case "Post Lunch Snacks (शाम का अल्पाहार)":
                        // labelCell.textContent = "Post Lunch Snacks";
                        valueCell.textContent = mydata.postLunchSnacks;
                        break;
                    case "Dinner Time (रात का भोजन)":
                        // labelCell.textContent = "Dinner Time";
                        valueCell.textContent = mydata.dinnerTime;
                        break;
                    case "Late Night Snacks (रात का अल्पाहार)":
                        // labelCell.textContent = "Late Night Snacks";
                        valueCell.textContent = mydata.lateNightSnacks;
                        break;
                    case "Remark (टिप्पणी)":
                        valueCell.textContent = mydata.remark;
                        break;
                    default:
                        break;
                }
            }
        });

        translateButton.innerText = "Translate to Hindi";
        isHindi = false;
    }
}
// Add event listener to the button for translation toggle
document.getElementById("translateButton").addEventListener("click", translateToHindi);
document.getElementById("editbtn").innerHTML = `<a href="diet.html?id=${id}" class="button">Edit</a>`

document.getElementById("download").addEventListener("click", () => {
    document.getElementById("invoice").style.margin = '30px';
    // Get the invoice element
    const invoice = document.getElementById("invoice");
    // Create a dynamic filename using the current date (e.g., "invoice_2024-11-22.pdf")
    const d = new Date()  // YYYY-MM-DD format
    const day = d.getDate(); // Day of the month
    const month = d.getMonth() + 1; // Month is 0-based (0 = January, 11 = December)
    const name_ = mydata?.name.split(" ").join("");
    // Format as MM/DD
    const fileName = `${name_}_${day < 10 ? '0' + day : day}${month < 10 ? '0' + month : month}`;

    // Use html2pdf with dynamic filename by passing the filename in the options object
    html2pdf()
        .from(invoice)
        .save(fileName);  // Pass custom filename here
});