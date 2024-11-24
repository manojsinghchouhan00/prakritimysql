// window.onload = function () {
//     let auth = JSON.parse(localStorage.getItem("token"));
//     if ((auth === null || !auth) && window.location.pathname === "index.html") {
//         window.location.pathname = "index.html"
//     }
// }

// console.log("first index page is run now")

// Check if the current URL exists (this can be extended or customized as per your requirements)
const validRoutes = [
    "/",
    "/index.html",
    "/login.html",
    "/diet.html",
    "/dietlist.html",
    "/showpage.html"
];

const currentPath = window.location.pathname;
console.log(currentPath)
let auth  = JSON.parse(localStorage.getItem("token"))
if ((!validRoutes.includes(currentPath))) {
    // Change the page content to show 404 error
    window.location.pathname="pageNo.html";
    // console.log("first")
    // document.getElementById('content').innerHTML = `
    //     <h1>404</h1>
    //     <p>Sorry, we couldn't find the page you were looking for.</p>
    //     <p>Return to the <a href="logi">homepage</a> or explore other sections.</p>
    //     <a href="/" class="button">Back to Homepage</a>
    // `;
}