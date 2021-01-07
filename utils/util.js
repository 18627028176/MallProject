/**
 * @name: util
 * @author: zhuhao
 * @data 2021/1/7 9:06
 * @description:
 */
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

export {
    promisic
}