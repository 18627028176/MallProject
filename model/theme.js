import {Http} from "../utils/http";

/**
 * @name: theme.js
 * @author: zhuhao
 * @data 2021/1/6 14:52
 * @description: 主题
 */
class Theme{
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = []

     async getThemes(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url:`themes`,
            data: {
                names
            }
        })
    }

    getHomeLocaltionA() {
       return this.themes.find(t=> t.name === Theme.locationA)
    }

    getHomeLocaltionE() {
        return this.themes.find(t=> t.name === Theme.locationE)
    }

    getHomeLocaltionF() {
        return this.themes.find(t=> t.name === Theme.locationF)
    }

    getHomeLocaltionH() {
        return this.themes.find(t=> t.name === Theme.locationH)
    }

    static getHomeLocaltionESpu(){
        return Theme.getThemeSpuByName(Theme.locationE)
    }

    static getThemeSpuByName(name) {
        return Http.request({
            url:`spuList`,
            data:{
                name:Theme.locationE
            }
        })
    }
}


export {
    Theme
}