const testadd = document.querySelector('#testadd');
const testremove = document.querySelector('#testremove');
const testform = document.querySelector('#testform');

function addinput() {
    var newField = document.createElement("input");
    newField.setAttribute("type", "time");
    newField.setAttribute("class", "class");
    newField.setAttribute("name", "name");
    newField.setAttribute("id", "name");
    testform.appendChild(newField);
}

testadd.addEventListener("click", addinput);