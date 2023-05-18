let chart;

function write_solve() {
    let solution_box = document.getElementById("solution_text");
    solution_box.textContent = 'solution';
}

function draw_solve() {
    let draw_box = document.getElementById("chart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(draw_box, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'f(x)', 
                    data: [],
                }
            ]
        },
        options: {
            responsive: true,
        }
      });

    function f(x) {
        let a = +document.getElementById("a").value;
        let b = +document.getElementById("b").value;
        let c = +document.getElementById("c").value;
        return a * x * x + b * x + c;
    }

    for (var x = -20; x <= 20; x += 1) {
        chart.data.labels.push('' + x);
        chart.data.datasets[0].data.push(f(x));
    }

    chart.update();
}

function roll(id, button_id) {
    let button = document.getElementById(button_id);

    $("#" + id + "_h").slideToggle();
    $("#" + id).slideToggle();

    if (button.textContent == '-') {
        button.textContent = '+';
    } else {
        button.textContent = '-';
        if (id == "chart_div") {
            draw_solve();
            $("#" + id + ":first-child").css({"border": "#3240BB 1px solid", "width": "10vw", "height": "10vh"});
            $("#" + id).css({"text-align": "center"});            
        }
    }
}

function start() {
    $("#parametrs_form_h").hide();
    $("#solution_text_h").hide();
    $("#chart_div_h").hide();
    $("#theory_text_h").hide();
    draw_solve();
}

function solve() {
    alert(+document.getElementById("a").value + " * x^2 + " + +document.getElementById("b").value + " * x + " + +document.getElementById("c").value + " = 0" );
    // write_solve();
    draw_solve();
}
