let min_x = -20, max_x = 20, min_y = -20, max_y = 20;
let chart; 
let chart_count = 1;
let data = {
    labels: [],
    datasets: [
        {
            label: 'f(x)', 
            data: [],

            borderColor: '#000'
        }
    ]
};

function get_equation(a, b, c) {
    let equation = "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
        "<mrow>"+
            "<mi>"+ a +"</mi>" +
            "<msup>" +
                "<mi>x</mi>" +
                "<mn>2</mn>" +
            "</msup>"+
            "<mo>+</mo>" +
            "<mi>"+ b +"</mi>" +
            "<mi>x</mi>" +
            "<mo>+</mo>" +
            "<mi>"+ c +"</mi>" +
            "<mo>=</mo>" +
            "<mn>0</mn>" +
        "</mrow>" +
    "</math>";

    return equation;
}

function get_linear_x(b, c) {
    let x_line = "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
        "<mi>x</mi>" +
        "<mo>=</mo>" +
        "<mfrac>"+
            "<mrow>" +
                "<mo>-</mo>" +
                "<mi>c</mi> " +
            "</mrow>" +
            "<mi>b</mi> " +
        "</mfrac>" +
        "<mo>=</mo>" +
        "<mfrac>"+
            "<mi>"+ -1 * c +"</mi>" +
            "<mi>"+ b +"</mi>" +
        "</mfrac>" +
        "<mo>=</mo>" + "<mn>" + (-1 * c / b) + "</mn>" +
    "</math>";

    return x_line;
}

function get_D (a, b, c) {
    let D_line = "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
            "<mi>D</mi>" +
            "<mo>=</mo>" +
            "<msup>" +
                "<mi>b</mi> <mn>2</mn>" +
            "</msup>" +
            "<mo>-</mo>" + 
            "<mn>4</mn>" +
            "<mi>a</mi>" +
            "<mi>c</mi>" +
            "<mo>=</mo>" +
            "<msup>" +
                "<mi>"+ b +"</mi> <mn>2</mn>" +
            "</msup>" +
            "<mo>-</mo>" + 
            "<mn>4</mn>" +
            "<mo>*</mo>" +
            "<mi>"+ a +"</mi>" +
            "<mo>*</mo>" +
            "<mi>"+ c +"</mi>"+
            "<mo>=</mo>" + "<mn>" + (b * b - 4 * a * c) + "</mn>" +
        "</math>";

    return D_line;
}

function get_quadratic_x(a, b, D) {
    let x_line = "";

    if (D == 0) {
        x_line = "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
            "<mi>x</mi>" +
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mrow>" +
                    "<mo>-</mo>" +
                    "<mi>b</mi> " +
                "</mrow>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mi>a</mi> " +
                "</mrow>" +
            "</mfrac>" +
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mi>"+ -1 * b +"</mi>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mo>*</mo>" +
                    "<mi>"+ a +"</mi>" +
                "</mrow>" +
            "</mfrac>" +
            "<mo>=</mo>" + "<mn>" + (-b / (2 * a)) + "</mn>" +
        "</math>";
    } else {
        x_line = "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
            "<msub>" +
                "<mi>x</mi>" +
                "<mrow>" +
                    "<mn>1</mn>"+
                    "<mo>,</mo>"+
                    "<mn>2</mn>"+
                "</mrow>" +
            "</msub>"+
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mrow>" +
                    "<mo>-</mo>" +
                    "<mi>b</mi> " +
                    "<mo>&#xB1;</mo>" +
                    "<msqrt>" +
                        "<mi>D</mi>" +
                    "</msqrt>" +
                "</mrow>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mi>a</mi> " +
                "</mrow>" +
            "</mfrac>" +
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mrow>" +
                    "<mi>"+ -1 * b +"</mi>" +
                    "<mo>&#xB1;</mo>" +
                    "<msqrt>" +
                        "<mi>"+ D + "</mi>" +
                    "</msqrt>" +
                "</mrow>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mo>*</mo>" +
                    "<mi>"+ a +"</mi>" +
                "</mrow>" +
            "</mfrac>" +
        "</math>,<br>";

        x_line = x_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
            "<msub>" +
                "<mi>x</mi>" +
                "<mn>1</mn>" +
            "</msub>"+
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mrow>" +
                    "<mi>"+ -1 * b +"</mi>" +
                    "<mo>-</mo>" +
                    "<msqrt>" +
                        "<mi>"+ D + "</mi>" +
                    "</msqrt>" +
                "</mrow>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mo>*</mo>" +
                    "<mi>"+ a +"</mi>" +
                "</mrow>" +
            "</mfrac>" +
            "<mo>=</mo>" + "<mn>" + ((-b - Math.sqrt(D)) / (2 * a)) + "</mn>" +
        "</math>,<br>";

        x_line = x_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
            "<msub>" +
                "<mi>x</mi>" +
                "<mn>2</mn>" +
            "</msub>"+
            "<mo>=</mo>" +
            "<mfrac>"+
                "<mrow>" +
                    "<mi>"+ -1 * b +"</mi>" +
                    "<mo>+</mo>" +
                    "<msqrt>" +
                        "<mi>"+ D + "</mi>" +
                    "</msqrt>" +
                "</mrow>" +
                "<mrow>" +
                    "<mn>2</mn>" +
                    "<mo>*</mo>" +
                    "<mi>"+ a +"</mi>" +
                "</mrow>" +
            "</mfrac>" +
            "<mo>=</mo>" + "<mn>" + ((-b + Math.sqrt(D)) / (2 * a)) + "</mn>" +
        "</math>";
    }

    return x_line;
}



function solution_text(a, b, c) {
    let equation = get_equation(a, b, c);
    let res_line = "Решаемое уравнение (ax<sup>2</sup>+bx+c=0): " + equation + ".<br>";

    if (a == 0) {
        res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>a</mi> <mo>=</mo> <mn>0</mn> </math>, " +
            "следовательно уравнение линейное, а не квадратное. <br>";
        res_line = res_line + 
            "Kорень уравнения расчитывается по формуле: <div>" + get_linear_x(b, c) + ".</div>";
        if (b == 0) {
            res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>b</mi> <mo>=</mo> <mn>0</mn> </math>, " +
            "на 0 делить нельзя.<br>";
            if (c == 0) {
                res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>c</mi> <mo>=</mo> <mn>0</mn> </math>, " +
            "следовательно уравнение имеет бесконечное количество вещественных корней. <br>";
            } else {
                res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>c</mi> <mo>&ne;</mo> <mn>0</mn> </math>, " +
            "следовательно уравнение не имеет вещественных корней. <br>";
            }
        } else {
            res_line = res_line + "У уравнения 1 вещественный корень.";
        }
    } else {
        res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>a</mi> <mo>&ne;</mo> <mn>0</mn> </math>, " +
            "следовательно уравнение квадратное. <br>";
        res_line = res_line + 
            "Для вычисления корней квадратного уравнения необходимо расчитать его дискриминант. " + 
            "Он высчитывается по формуле: <div>" + get_D(a, b, c) + ".</div>";
        let D = b * b - 4 * a * c;

        if (D < 0) {
            res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>D</mi> <mo>&lt;</mo> <mn>0</mn> </math>, " +
                "следовательно уравнение не имеет вещественных корней. <br>";
        } else if (D == 0) {
            res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>D</mi> <mo>=</mo> <mn>0</mn> </math>, " +
                "следовательно уравнение имеет один вещественный корень. <br><div>" + get_quadratic_x(a, b, D) +".</div>";
        } else {
            res_line = res_line + "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>D</mi> <mo>></mo> <mn>0</mn> </math>, " +
                "следовательно уравнение имеет два вещественых корня. <br><div>" + get_quadratic_x(a, b, D) +".</div>";
        }
    }

    return res_line;
}

function write_solve() {    
    let a = +document.getElementById("a").value;
    let b = +document.getElementById("b").value;
    let c = +document.getElementById("c").value;

    let text = solution_text(a, b, c);

    if (chart_count == 2) {
        a = +document.getElementById("a2").value;
        b = +document.getElementById("b2").value;
        c = +document.getElementById("c2").value;

        text = text + "<hr>" + solution_text(a, b, c);
    }

    document.getElementById("solution_text").innerHTML = text;

}

function draw_solve() {
    if (chart) {
        chart.destroy();
    }

    data.labels = [];
    data.datasets[0].data = [];

    let draw_box = document.getElementById("chart");
    chart = new Chart (draw_box, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    min: min_y,
                    max: max_y
                }
            }
        }
      });

    let a = +document.getElementById("a").value;
    let b = +document.getElementById("b").value;
    let c = +document.getElementById("c").value;

    function f(x) {  
        return a * x * x + b * x + c;
    }

    for (var x = min_x; x <= max_x; x += 1) {
        chart.data.labels.push('' + x);
        chart.data.datasets[0].data.push(f(x));
    }

    a = +document.getElementById("a2").value;
    b = +document.getElementById("b2").value;
    c = +document.getElementById("c2").value;

    if (chart_count == 2) {
        data.datasets[1].data = [];
        for (var x = min_x; x <= max_x; x += 1) {
            chart.data.datasets[1].data.push(f(x));
        }
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
            chart.resize();
        }
    }
}

function solve() {
    write_solve();
    draw_solve();
}

function start() {
    $("#parametrs_form_h").hide();
    $("#solution_text_h").hide();
    $("#chart_div_h").hide();
    $("#theory_text_h").hide();
    $("#formula_2").hide();
    $("#chart_color_2").hide();

    solve();
}

function download() {
    let link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = 'graphic.png';
    link.click();
}

function update_gr() {
    min_x = +document.getElementById("x_min").value;
    min_y = +document.getElementById("y_min").value;
    max_x = +document.getElementById("x_max").value;
    max_y = +document.getElementById("y_max").value;

    data.datasets[0].borderColor = document.getElementById("chart_color").value.toString();

    if (chart_count == 2) {
        data.datasets[1].borderColor = document.getElementById("chart_color_2").value.toString();
    }

    draw_solve();
}

function add() {
    document.getElementById("chart_color_2").value = '#000';
    $("#formula_2").slideToggle();
    $("#chart_color_2").slideToggle();
    let button = document.getElementById("add");

    if (button.textContent == '+') {
        button.textContent = 'x';
        data.datasets.push({
            label: 'f(x)', 
            data: [],

            borderColor: '#000'
        });
        chart_count = 2;
    } else {
        button.textContent = '+';
        data.datasets.pop();
        chart_count = 1;
    }
}
