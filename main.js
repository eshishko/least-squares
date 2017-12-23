$(document).ready(function(){
    var x = [0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.86, 0.92, 0.98, 1.04, 1.1, 1.16, 1.22, 1.28, 1.34, 1.4, 1.46, 1.52, 1.58, 1.64, 1.7, 1.76, 1.82, 1.88, 1.94, 2.0, 2.06, 2.12, 2.18, 2.24, 2.3, 2.36, 2.42, 2.48, 2.54, 2.6, 2.66, 2.72, 2.78, 2.84, 2.9, 2.96, 3.02, 3.08, 3.14, 3.2, 3.26, 3.32, 3.38, 3.44, 3.5, 3.56, 3.62, 3.68, 3.74, 3.8, 3.86, 3.92, 3.98, 4.04, 4.1, 4.16, 4.22, 4.28, 4.34, 4.4, 4.46, 4.52, 4.58, 4.64, 4.7, 4.76, 4.82, 4.88, 4.94, 5.0, 5.06, 5.12, 5.18, 5.24, 5.3, 5.36, 5.42, 5.48, 5.54, 5.6, 5.66, 5.72, 5.78, 5.84, 5.9, 5.96, 6.02, 6.08, 6.14, 6.2, 6.26, 6.32, 6.38, 6.44, 6.5];
    var y = [0.357415898, 0.455164366, 0.617734604, 0.794291452, 0.96039369, 1.200880253, 1.338404416, 1.576702868, 1.985719227, 2.237805212, 2.430216111, 2.959054912, 3.220176293, 3.689686818, 4.364097507, 4.866658076, 5.018082259, 5.893742211, 6.006301446, 6.750211051, 7.896099663, 7.898721658, 9.048191065, 10.13184507, 10.58444046, 11.80773305, 12.76166108, 12.69073161, 14.44900449, 15.75489835, 15.54649712, 17.15797046, 18.00430902, 18.41574259, 20.58276311, 21.12764559, 22.86054813, 25.59951218, 26.9437524, 25.89254834, 29.48503378, 30.45198562, 30.45515523, 33.85054172, 34.51089194, 34.97118725, 39.28268774, 39.0503647, 41.3066683, 42.31854094, 47.27514452, 46.61062813, 50.02862366, 51.6239776, 53.27411903, 58.81909013, 59.07972276, 60.04528616, 64.9041277, 65.10590209, 67.59092114, 74.01409488, 75.09268422, 74.07970644, 81.3686121, 79.18192677, 82.31972631, 83.13423676, 90.3353508, 91.99792186, 93.02215304, 101.7442257, 99.83167037, 100.1782698, 109.4915046, 108.6960715, 111.468696, 118.8154627, 118.2166139, 131.4469325, 131.2227555, 136.4300816, 132.1539073, 134.4616313, 137.3844634, 144.169639, 148.5935442, 162.4925511, 156.5545093, 157.8108826, 167.8751763, 166.6088016, 177.3243965, 178.5903742, 189.8178596, 195.7225262, 205.3756428, 193.9477268, 202.1259001, 218.8371631, 206.3258265];
    var lnX = [];
    var lnY = [];
    var lnXWithLnY = [];
    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumX2 = 0;
    var f = [];
    var a1 = 0;
    var a0 = 0;
    var aFromA0 = 0;

    if (x.length !== y.length) {
        alert('Not correct X and Y input arrays size');
    }

    var n = x.length;

    x.forEach(function(item) {
        lnX.push(Math.log(item));
    });

    y.forEach(function(item) {
        lnY.push(Math.log(item));
    });

    lnX.forEach(function(item, i) {
        lnXWithLnY.push(item * lnY[i]);
        sumX += item;
        sumX2 += item * item;
    });

    lnY.forEach(function(item) {
        sumY += item;
    });

    lnXWithLnY.forEach(function(item) {
        sumXY += item;
    });

    if (n !== lnX.length || n !== lnY.length || n !== lnXWithLnY.length) {
        alert('unexpected exception');
    }

    a1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    a0 = (1/n) * (sumY - a1 * sumX);
    aFromA0 = Math.exp(a0);

    x.forEach(function(item) {
        f.push(aFromA0 * Math.pow(item, a1));
    });

    function draw() {
        $('#n').html('n = ' + n);
        $('#sumX').html('∑LN(x) = ' + sumX);
        $('#sumY').html('∑LN(y) = ' + sumY);
        $('#sumXY').html('∑(LN(x)*LN(y)) = ' + sumXY);
        $('#sumX2').html('∑(LN(x)^2) = ' + sumX2);
        $('#a1').html('a1 (B) = ' + a1);
        $('#a0').html('a0 = ' + a0 + ' => A = ' + aFromA0);

        var tbody = $('#tbody');
        lnX.forEach(function(item, i) {
            tbody.append(
                '<tr>' +
                '<td>' + x[i] + '</td>' +
                '<td>' + y[i] + '</td>' +
                '<td>' + item + '</td>' +
                '<td>' + lnY[i] + '</td>' +
                '<td>' + lnXWithLnY[i] + '</td>' +
                '<td>' + f[i] + '</td>' +
                '</tr>'
            );
        });

        var items = [];
        x.forEach(function(item, i) {
            items.push({x: item, y: f[i]});
        });
        var ctx = document.getElementById("graph").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: x,
                datasets: [{
                    label: 'f(x) = A * x ^ B',
                    data: f,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }, {
                    label: 'y',
                    data: y,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    draw();
});