function start() {
    $("#parametrs_form_h").hide();
    $("#solution_text_h").hide();
    $("#chart_div_h").hide();
    $("#theory_text_h").hide();
}

function roll(id, button_id) {
    let button = document.getElementById(button_id);

    $("#" + id + "_h").slideToggle();
    $("#" + id).slideToggle();
    
    if (button.textContent == '-') {
        button.textContent = '+';
    } else {
        button.textContent = '-';
    }

}

function solve() {
    alert(+document.getElementById("a").value + " * x^2 + " + +document.getElementById("b").value + " * x + " + +document.getElementById("c").value + " = 0" )
}
