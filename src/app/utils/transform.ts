export class Str {

    static transformStr(str) {
        const strAux = str.replace(/\s/ig, '-');
      
        return strAux.toLowerCase();
      }
}

