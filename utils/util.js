/**
 * @name: util
 * @author: zhuhao
 * @data 2021/1/7 9:06
 * @description:
 */

//给一个函数返回一个Promise
const promisic = function (func) {
    return function (params = {}){
        return new Promise((resolve, reject) => {
            const args = Object.assign(params,{
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };

};

/**
 * 获取一个数组排列组合的所有结果，将它们封装成一个二维数组
 * @param arr
 * @param size
 * @returns [[],[],''']
 */
const combination = function (arr, size) {
    var r = [];
    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return r;
}

export {
    promisic,
    combination
}