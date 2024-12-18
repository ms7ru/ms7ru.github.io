var FunList = document.getElementById('F');
var EduList = document.getElementById('E');

var totalApps = listOfApps.length;

// Retrieve app details by AppNo

for (let i = 0; i < listOfApps.length; i++) {
    /*
    // the app
    var app = listOfApps[i];

    //list of all properties
    console.log(app.AppType);
    console.log(app.AppName);
    console.log(app.AppLink);

    */

    if (listOfApps[i].AppType == "Fun") {
        FunList.innerHTML += `<li>${listOfApps[i].AppName} <span><a target="_blank" href="${listOfApps[i].AppLink}">-> ./visit</a></span></li>`;
    } else if (listOfApps[i].AppType == "Edu") {
        EduList.innerHTML += `<li>${listOfApps[i].AppName} <span><a target="_blank" href="${listOfApps[i].AppLink}">-> ./visit</a></span></li>`;
    }
}

'<li>A Maze Game <span><a target="_blank" href="../the-projects/maze/">-> ./visit</a></span></li>'