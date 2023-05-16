function start() {
    document.getElementById("parametrs_form_h").hidden = true;
    document.getElementById("solution_text_h").hidden = true;
    document.getElementById("chart_div_h").hidden = true;
    document.getElementById("theory_text_h").hidden = true;
}

function roll(id, button_id) {
    let elem = document.getElementById(id);
    let elem_h = document.getElementById(id + '_h');
    let button = document.getElementById(button_id);

    if (elem.hidden == false) {
        elem.hidden = true;
        elem_h.hidden = false;
        button.textContent = '+';
    } else {
        elem.hidden = false;
        elem_h.hidden = true;
        button.textContent = '-';
    }
}

function solve() {
    alert(+document.getElementById("a").value + " * x^2 + " + +document.getElementById("b").value + " * x + " + +document.getElementById("c").value + " = 0" )
}
