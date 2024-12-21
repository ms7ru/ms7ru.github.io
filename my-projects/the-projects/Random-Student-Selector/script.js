var done = [];
var abbsent_selected = false;

for (let i = 0; i < names.length; i++) {
    document.getElementById("names_c").innerHTML += `<button class='button' id='${i}' onclick='child(${i});'>${names[i]}</button>`;
}

function random() {
    let randoms = Math.floor(Math.random() * names.length);
    if (done.includes(randoms)) {
        random();
    } else {
        document.getElementById("random").innerHTML = names[randoms];
        document.getElementById(randoms).className = "diss";
        done.push(randoms);
    };
}

function reset() {
    if (window.confirm("Are you sure you want to reset?") == true) {
        if (abbsent_selected == false) {
            done = [];
            document.getElementById("random").innerHTML = "Press the button";
            for (let i = 0; i < names.length; i++) {
                if (document.getElementById(i).className == "diss") {
                    document.getElementById(i).className = "button";
                }
            }
        } else if (abbsent_selected == true) {
            done = [];
            document.getElementById("random").innerHTML = "Press the button";
            for (let i = 0; i < names.length; i++) {
                document.getElementById(i).className = "button";
            }
        }
    }
}


function hi() {}

function abbsent() {
    if (abbsent_selected == false) {
        abbsent_selected = true;
        document.getElementById("rand_select").className = "back-d";
        document.getElementById("rand_select").onclick = hi;
    } else if (abbsent_selected == true) {
        abbsent_selected = false;
        document.getElementById("rand_select").className = "back";
        document.getElementById("rand_select").onclick = random;
    }
}

function child(i) {
    if (abbsent_selected == true) {
        if (document.getElementById(i).className == "button") {
            document.getElementById(i).className = "abb";
            done.push(i);
        } else {
            document.getElementById(i).className = "button";
            done.splice(done.indexOf(i), 1);
        }
    } else if (abbsent_selected == false) {
        if (document.getElementById(i).className == "button") {
            document.getElementById(i).className = "diss";
            done.push(i);
        } else {
            document.getElementById(i).className = "button";
            done.splice(done.indexOf(i), 1);
        }
    }
    
}

function slim() {

    if (document.getElementById('cb3-8').checked == true) {
        document.getElementById('names_c').style.display = "none";
        document.getElementById('b').innerHTML = "";
        document.getElementById('b').style.width = "0px";
        document.getElementById('a').innerHTML= "";
        document.getElementById('a').style.width = "0px";
        document.getElementById('c').innerHTML= "";
        document.getElementById('c').style.width = "0px";
        document.getElementById('d').innerHTML= "";
        document.getElementById('d').style.width = "0px";
        document.getElementById('e').innerHTML= "";
        document.getElementById('e').style.width = "0px";
        document.getElementById('explaination').innerHTML= "";
        document.getElementById('explaination').style.width = "0px";
        document.getElementById('generate').innerHTML= '<button id="rand_select" class="back" onclick="random()">Random Student</button>';
        document.getElementById('random').setAttribute("style", "width: 100%; display: flex; justify-content: center; align-items: center; position: fixed; bottom: 0; left: 0; margin-top: 20px; font-size: 100px; border: 2px solid black; box-sizing: border-box; background-color: black; color: white; writing-mode: vertical-rl; text-orientation: upright; white-space: nowrap;");
        document.getElementById('random').innerHTML = "Press";
    } else {
        document.getElementById('names_c').style.display = "grid";
        document.getElementById('b').innerHTML = "<h1>The Class List</h1>";
        document.getElementById('b').style.width = "calc(100vw - 700px)";
        document.getElementById('a').innerHTML= '<a href="https://ms7ru.github.io"><button class="back">Go Back<svg fill="currentColor" viewBox="0 0 24 24" class="icon"> <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd" ></path> </svg> </button></a>';
        document.getElementById('a').style.width = "153px";
        document.getElementById('c').innerHTML= '<button class="back" onclick="reset()">Clear Read</button>';
        document.getElementById('c').style.width = "130px";
        document.getElementById('d').innerHTML= '<button class="back" onclick="abbsent()">Change Statuses</button>';
        document.getElementById('d').style.width = "170px";
        document.getElementById('e').innerHTML= '<div style="float: right;"><button id="rand_select" class="back" onclick="random()">Select Random Student</button></div>';
        document.getElementById('e').style.width = "220px";
        document.getElementById('explaination').innerHTML= "(<button class='button-i'>ABC</button>= left, <button class='diss-i'>ABC</button>= read, <button class='abb-i'>ABC</button> = absent/not allowed)";
        document.getElementById('explaination').style.width = "90vw";
        document.getElementById('generate').innerHTML= '';
        document.getElementById('random').setAttribute("style", "width: 100%; display: flex; justify-content: center; align-items: center; position: fixed; bottom: 0; left: 0; margin-top: 20px; /* Optional: If you want some space above it */ font-size: 150px; border: 2px solid black; /* Adjust the border width, style, and color as needed */ box-sizing: border-box; /* Ensures border is included in the total width */ background-color: black; color: white;");
        document.getElementById('random').innerHTML = "Press the button";
    }
}