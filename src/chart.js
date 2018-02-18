
function getSeriesData(n) {
    var absSeries = [];
    var percSeries = [];
    var keyToIndx = {};

    for (i = 0; i < n; i++) {
        var pointData = getPointData();
        var pointAbsData = pointData.abs;

        if (absSeries.length) {
            for (var k in pointAbsData) {
                var indx = keyToIndx[k];
                absSeries[indx]['data'].push(pointAbsData[k]);
            }
        } else {
            var c = 0;
            for (var k in pointAbsData) {
                keyToIndx[k] = c;
                absSeries.push({'name': k, 'data': [pointAbsData[k]]});
                c++;
            }
        }

        var pointPercData = pointData.perc;

        if (percSeries.length) {
            for (var k in pointPercData) {
                var indx = keyToIndx[k];
                percSeries[indx]['data'].push(pointPercData[k]);
            }
        } else {
            var c = 0;
            for (var k in pointPercData) {
                keyToIndx[k] = c;
                percSeries.push({'name': k, 'data': [pointPercData[k]]});
                c++;
            }
        }        
    }

    return {'abs': absSeries, 'perc': percSeries};
}

function drawAll() {
    var series = getSeriesData(25);
    console.log(series);

    drawChart(series.abs, 'container0', '(абсолютный)', 'кол-во ответов');
    drawChart(
        series.perc, 
        'container1', 
        '(относительный. В идеале все линии должны быть как можно выше. Удобно задавать пороговые значения).',
        'проценты'
    );
}

function drawChart(series, container, subtitle, yTitle) {
    Highcharts.chart(container, {
        title: {
            text: 'График распределения времен ответов'
        },
        subtitle: {
            text: subtitle
        },
        yAxis: {
            title: {
                text: yTitle
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },
        series: series,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1100
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

