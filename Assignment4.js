"use strict";
// class to create objects for dejimon
class Dejimon {
    //constructor to initizialize the objects
    constructor(name, type, height, weight, ability) {
        this.name = name;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.ability = ability;
        let sum = +height + +weight + (+ability * 4);
        let average = sum / 6;
        average = parseFloat(average.toFixed(2));
        this.strength = average;
    }
}
//function that stores all the Dejimon that were added
function allStorage() {
    var values = [], keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        if (keys[i].includes('dejimon')) {
            values.push([keys[i], localStorage.getItem(keys[i])]);
        }
    }
    //@ts-ignore
    return values;
}
//function to display all the dejimons
function displayAll() {
    let i;
    let allDejimons = allStorage();
    let dejimons = document.getElementById('dejimons');
    for (i = 0; i < allDejimons.length; i++) {
        let row = document.createElement('tr');
        let key = allDejimons[i][0];
        let deji = JSON.parse(allDejimons[i][1]);
        let name = document.createElement("td");
        let type = document.createElement("td");
        let info = document.createElement("td");
        let infoBtn = document.createElement('button');
        let del = document.createElement("td");
        let delBtn = document.createElement('button');
        row.setAttribute('id', key);
        name.innerHTML = deji['name'];
        type.innerHTML = deji['type'];
        infoBtn.setAttribute('class', 'btn btn-info');
        infoBtn.innerHTML = "More Info";
        infoBtn.addEventListener('click', function () {
            seeMore(key);
        }, false);
        delBtn.setAttribute('class', 'btn btn-danger');
        delBtn.innerHTML = "Delete";
        delBtn.addEventListener('click', function () {
            remove(key);
        }, false);
        info.appendChild(infoBtn);
        del.appendChild(delBtn);
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(info);
        row.appendChild(del);
        dejimons.appendChild(row);
    }
}
//function to add the inputs taken to the main page
function add() {
    let name = document.getElementById('addname').value;
    //@ts-ignore
    let weight = document.getElementById('addweight').value;
    //@ts-ignore
    let height = document.getElementById('addheight').value;
    let type = document.getElementById('addtype').value;
    //@ts-ignore
    let ability = document.getElementById('addability').value;
    if (name !== "" && !isNaN(weight) && !isNaN(height) && type !== "" && !isNaN(ability)) {
        if (ability > 100) {
            alert("Ability power too high");
        }
        else {
            let dejimon = new Dejimon(name, type, weight, height, ability);
            let store = Math.random() * 10000;
            let key = "dejimon" + store;
            localStorage.setItem(key, JSON.stringify(dejimon));
            alert("Succesfully added!");
        }
    }
    else {
        alert("Enter all fields");
    }
}
//function to delete the row of inputs
function remove(key) {
    if (confirm("Are you sure you want to delete this?")) {
        localStorage.removeItem(key);
        document.getElementById(key).style.display = 'none';
    }
}
//function to display the "see more" 
function seeMore(key) {
    let table = document.getElementById('info');
    let deji = document.getElementById('deji');
    let dejimon = JSON.parse(localStorage.getItem(key));
    let info = document.getElementsByClassName('dejiinfo');
    if (dejimon.type.includes('Lean')) {
        document.getElementById('abilityinfo').innerHTML = "Fire/Charm Ability";
    }
    else if (dejimon.type.includes('Potbelly')) {
        document.getElementById('abilityinfo').innerHTML = "Electric Ability";
    }
    else if (dejimon.type.includes('Yorkshire')) {
        document.getElementById('abilityinfo').innerHTML = "Water/Ice Ability";
    }
    info[0].innerHTML = dejimon.name;
    info[1].innerHTML = dejimon.type;
    info[2].innerHTML = dejimon.weight + " Kg";
    info[3].innerHTML = dejimon.height + " Meters";
    info[4].innerHTML = dejimon.ability;
    info[5].innerHTML = dejimon.strength;
    table.style.display = 'block';
    deji.style.display = 'none';
}
//function to switch from the see more page back to the main page
function back() {
    let table = document.getElementById('info');
    let deji = document.getElementById('deji');
    table.style.display = 'none';
    deji.style.display = 'block';
}
