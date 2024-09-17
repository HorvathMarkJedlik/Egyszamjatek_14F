export default class Játékos {
    // export: Másik állományban is szeretnénk használni (import)
    // default: Egyszerűbb import
    // Privát adattagok (TS 3.8-tól a # karakterrel is jelölhetjük)

    #név: string;
    #tippek: number[] = [];

    // Kódtag(ok)
    // Láthatósági szintek: private, protected, public
    // Alapértelmezett láthatósági szint a public

    //TS jellemzőjét a get és a set foglalt szavak vezetik be
    get fordulókSzáma(): number {
        return this.#tippek.length;
    }

    // Konstruktor azonosítója: constructor
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#név = m[0];
        for (let i = 1; i < m.length; i++) {
            this.#tippek.push(parseInt(m[i]));
        }
    }

    fordulóTippje(forduló: number): number {
        return this.#tippek[forduló - 1];
    }
}
