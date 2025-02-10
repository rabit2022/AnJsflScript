/**
 * @file: random.jsfl
 * @author: 穹的兔兔
 * @email: 3101829204@qq.com
 * @date: 2024/12/18 14:08
 * @project: AnJsflScript
 * @description:
 */


define( function () {
    function Random() {
    }

    /**
     * 返回一个随机整数，从start（包含）到stop（不包含）。
     * 如果只提供一个参数，则返回一个0到该参数之间的随机整数。
     * 如果提供了三个参数，则返回一个从start开始，以step为步长，到stop结束的随机整数。
     *
     * @param {number} start  - 起始值（包含）。
     * @param {number} [stop] - 结束值（不包含）。
     * @param {number} [step=1] - 步长，默认为1。
     * @returns {number} 返回一个随机整数。
     * @memberof Random
     * @instance
     * @throws {Error} 如果step小于1。
     */
    Random.randrange = function (start, stop, step) {
        // 一个参数时，stop为起始值，start为0，step为1
        if (stop === undefined) {
            stop = start;
            start = 0;
        }
        if (step === undefined) {
            step = 1;
        }
        if (step < 1) {
            throw new Error('Step must be 1 or greater');
        }
        const num = Math.floor(Math.random() * (Math.ceil((stop - start) / step)));
        return start + num * step;
    };
    Random.randint = function (a, b) {
        return this.randrange(a, b + 1);
    }
    Random.choice = function (seq) {
        return seq[Math.floor(Math.random() * seq.length)];
    }
    Random.choices = function (population, weights, cum_weights, k) {
        if (weights === null) {
            return this.sample(population, k);
        }
        if (cum_weights === null) {
            cum_weights = weights.slice();
            for (var i = 1; i < cum_weights.length; i++) {
                cum_weights[i] += cum_weights[i - 1];
            }
        }
        if (cum_weights.length !== weights.length) {
            throw new Error('The number of weights does not match the population');
        }
        if (k === null) {
            k = 1;
        }
        if (k > population.length) {
            throw new Error('Sample larger than population');
        }
        const result = [];
        const total_weight = cum_weights[cum_weights.length - 1];
        for (var i = 0; i < k; i++) {
            const u = Math.random() * total_weight;
            const j = cum_weights.findIndex(function (cum_weight, index) {
                return cum_weight >= u;
            });
            result.push(population[j]);
        }
        return result;
    }
    Random.shuffle = function (seq) {
        for (var i = seq.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [seq[i], seq[j]] = [seq[j], seq[i]];
        }
        return seq;
    }
    Random.sample = function (population, k, counts) {
        if (k > population.length) {
            throw new Error('Sample larger than population');
        }
        if (counts === null) {
            counts = new Array(population.length).fill(1);
        }
        if (counts.length !== population.length) {
            throw new Error('The number of counts does not match the population');
        }
        const result = [];
        for (var i = 0; i < k; i++) {
            const j = Math.floor(Math.random() * population.length);
            if (counts[j] > 0) {
                result.push(population[j]);
                counts[j]--;
            }
        }
        return result;
    }
    Random.uniform = function (a, b) {
        return a + (b - a) * Math.random();
    }


    Random.gauss = function (mu, sigma) {
        var z = 0;
        var x = 0;
        var y = 0;
        while (true) {
            x = this.uniform(-1, 1);
            y = this.uniform(-1, 1);
            z = x * x + y * y;
            if (z < 1) {
                break;
            }
        }
        return mu + sigma * x * Math.sqrt(-2 * Math.log(z) / z);
    }
    Random.expovariate = function (lambd) {
        return -Math.log(1 - Math.random()) / lambd;
    }
    Random.vonmisesvariate = function (mu, kappa) {
        var s;
        var r;
        var u;
        var x;
        s = 0;
        r = 1;
        while (true) {
            u = this.uniform(0, 1);
            s = Math.log(1 - u) / kappa + s;
            if (s > Math.PI) {
                break;
            }
            r++;
        }
        x = mu + Math.sin(s) * Math.cos(kappa * s);
        return x;
    }
    Random.paretovariate = function (alpha) {
        return 1 / Math.pow(this.uniform(0, 1), 1 / alpha);
    }
    Random.weibullvariate = function (alpha, beta) {
        return alpha * Math.pow(-Math.log(1 - this.uniform(0, 1)), 1 / beta);
    }
    Random.get_random_color = function () {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        // return "rgb(${r},${g},${b})";
        return [r, g, b];
    }
    
    return Random;
});


