module.exports = function count(s, pairs) {
    var N = 1, MOD = 1000000007;


    function bin_pow_with_mod(a,b) {
        var res = 1;
        while (b){
            if (b & 1)
                res *= a;
                res %= MOD;
            a *= a;
            a %= MOD;
            b >>= 1;
        }
        return res % MOD;
    }

    var lp = [N + 1], pr = [];
    function sieve() {
        for (var i = 2; i <= N; i++){
            if (lp[i] === 0){
                lp[i] = i;
                pr.push(i);
            }
            for (var j = 0; j < pr.length && pr[j] <= lp[i] && i*pr[j] <= N; j++){
                lp[i * pr[j]] = pr[j];
            }
        }
    }

    function phi(n) {
        var res = n;
        for (var i = 2; i*i <= n; i++){
            if (n % i === 0){
                while (n % i === 0){
                    n /= i;
                }
                res -= Math.floor(res / i);
            }
        }
        if (n > 1){
            res -= Math.floor(res / n);
        }
        return res;
    }

    function gcd(a, b) {
        if (b === 0)
            return a;
        else
            return gcd(b, a % b);
    }



    for (var i = 0; i < pairs.length; i++){
        N *= bin_pow_with_mod(pairs[i][0], pairs[i][1]);
        N %= MOD;
    }
    N %= 10000000;
    var prime_result = phi(N), verse_result = N - prime_result;
    var ans = 0;


    if (s[0] === '1' && s.length === 1) { return phi(N);}


    for (var i = 0; i <= N; i++){


        var k = 0;
        for (var j = 0; j < s.length; j++){
            var cur_gcd = gcd(i + j, N);
            if (((s[j] === '1' && cur_gcd === 1) || (s[j] === '0' && cur_gcd > 1)) && (i + j <= N)) {
                k++;
            }
        }

        if (k === s.length) {
            ans++;
        }

    }
    if (s === '0')
        return ans - 1;
    else
        return ans;
};
