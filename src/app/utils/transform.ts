export class Str {

    static transformStr(str) {
        const strAux = str.replace(/\s/ig, '-');
      
        return strAux.toLowerCase();
      }

      static Destructuring(str) {
        const strAux = str.split('-').join(' ');

        return strAux;
      }
}

