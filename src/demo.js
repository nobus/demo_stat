
function intGenerator(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function timesGenerator(n) {
    var data = [];

    var intervals = [
        {'min': 1, 'max': 100},
        {'min': 100, 'max': 200},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},
        {'min': 200, 'max': 400},        
        {'min': 200, 'max': 400},
        {'min': 400, 'max': 500},
        {'min': 500, 'max': 1000},
    ];

    for (var i = 0; i < n; i++) {
        var dataType = intGenerator(0, intervals.length)
        data.push(
            intGenerator(
                intervals[dataType]['min'],
                intervals[dataType]['max']
            )
        );
    }

    return data;
}

function checkAbsBucket(bucketsParams, req_time) {
    for (var i = 0; i < bucketsParams.length; i++) {
        var bname = bucketsParams[i][0];
        var bleft = bucketsParams[i][1][0];
        var bright = bucketsParams[i][1][1];
        if (req_time >= bleft && req_time < bright) {
            return bname;
        }
    }
}

function checkPercBucket(bucketsParams, req_time) {
    var ret = [];

    for (var i = 0; i < bucketsParams.length; i++) {
        var bname = bucketsParams[i][0];
        var bleft = bucketsParams[i][1][0];
        var bright = bucketsParams[i][1][1];

        if (req_time < bleft) {
            ret.push(bname);
        } else if (req_time <= bright) {
            ret.push(bname);
            break;
        }
    }

    return ret;
}

function getPointData() {
    var bucketsParams = [
        ['500-inf ms', [500, 100000]],
        ['400-500 ms', [400, 500]],
        ['300-400 ms', [300, 400]],
        ['200-300 ms', [200, 300]],
        ['100-200 ms', [100, 200]],
        ['0-100 ms', [0, 100]],
    ];

    var abs = {
        '500-inf ms': 0,
        '400-500 ms': 0,
        '300-400 ms': 0,
        '200-300 ms': 0,
        '100-200 ms': 0,
        '0-100 ms': 0,
    };

    var perc = {
        '500-inf ms': 0,
        '400-500 ms': 0,
        '300-400 ms': 0,
        '200-300 ms': 0,
        '100-200 ms': 0,
        '0-100 ms': 0,
    };

    var times = timesGenerator(intGenerator(100, 500));

    for (var i = 0; i < times.length; i++) {
        var bucketName = checkAbsBucket(bucketsParams, times[i]);
        abs[bucketName]++;

        var percBucketNames = checkPercBucket(bucketsParams, times[i]);
        for (var b = 0; b < percBucketNames.length; b++) {
            perc[percBucketNames[b]]++;
        }
    }

    return {'abs': abs, 'perc': calculatePerc(perc, '500-inf ms')};
}

function calculatePerc(data, totalKey) {
    var ret = {};
    var total = data[totalKey];
    var keyMap = {
        '500-inf ms': '0-inf ms',
        '400-500 ms': '0-500 ms',
        '300-400 ms': '0-400 ms',
        '200-300 ms': '0-300 ms',
        '100-200 ms': '0-200 ms',
        '0-100 ms': '0-100 ms',        
    };

    for (var k in data) {
        ret[keyMap[k]] = (data[k] * 100)/total;
    }

    return ret;
}

drawAll();
