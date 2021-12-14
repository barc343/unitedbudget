// HEAD APP CONFIG
class Config {
    constructor() {
        this.host = 'http://localhost:8000/'; //dev
        // this.host = 'http://123:8000/'; //prod
    }
}
// END HEAD APP CONFIG

export const AppConfig = new Config()