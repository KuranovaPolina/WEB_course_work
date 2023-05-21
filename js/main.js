let chart;

function write_solve() {    
    let a = +document.getElementById("a").value;
    let b = +document.getElementById("b").value;
    let c = +document.getElementById("c").value;

    $("#equation_line").html(a + 'x<sup>2</sup> + ' + b +'x + ' + c + ' = 0.');

    if (a == 0) {
        $("#eq_info").html("a = 0 следовательно уравнение не квадратное, а линейное.");
        if (b == 0) {
            $("#middle_info").show();
            $("#middle_info").html("b = 0, оно в знаменателе. На 0 делить нельзя.");
            
            if (c == 0) {
                $("#res").html("с = 0. Уравнение имеет бесконечное количество вещественных корней.");
            } else {
                $("#res").html("с &ne; 0. Уравнение не имеет вещественных корней.");
            }
        } else {
            $("#middle_info").hide();
            $("#res").html("x = "+ (-c / b));
        }
    } else {
        $("#eq_info").html("a &ne; 0 следовательно уравнение квадратное.");
        $("#middle_info").show();
        let d = b * b - 4 * a * c;
        $("#middle_info").html("Дискриминант D = " + d);
        if (d < 0) {
            $("#res").html("D &lt 0. Уравнение не имеет вещественных корней.");
        } else if (d == 0) {
            $("#res").html("Уравнение не имеет один вещественный корень: <br> x = " + (-b / 2 * a) + ".");
        } else {
            $("#res").html("Уравнение не имеет два вещественных корня: <br> x<sub>1</sub> = " + ((-b - Math.sqrt(d)) / 2 * a) + "<br> x<sub>2</sub> = " + ((-b + Math.sqrt(d)) / 2 * a) + ".");
        }
    }

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

    if (button.textContent == '-') {
        $("#" + id + "_h").show();
        $("#" + id).hide();
        button.textContent = '+';


    } else {
        $("#" + id + "_h").hide();
        $("#" + id).show();
        button.textContent = '-';        

        if (id == "chart_div") {
            chart.resize();
        }
    }
}

function start() {
    $("#parametrs_form_h").hide();
    $("#solution_text_h").hide();
    $("#chart_div_h").hide();
    $("#theory_text_h").hide();

    $("#square_eq").hide();
    $("#c_info_1").hide();
    $("#d_1").hide();
    $("#d_0").hide();
    $("#d_2").hide();

    draw_solve();
}

function solve() {
    write_solve();
    draw_solve();
}

function download() {
    let link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = 'graphic.jpeg';
    link.click();
}
