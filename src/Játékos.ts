export default class Játékos {
    // export: Másik állományban is szeretnénk használni (import)
    // default: Egyszerűbb import
    // Privát adattagok (TS 3.8-tól a # karakterrel is jelölhetjük)

    #név: string;
    #tippek: number[] = [];

    // Kódtag(ok)
    // Láthatósági szintek: private, protected, public
    // Alapértelmezett láthatósági szint a public

    get nev(): string {
        return this.#név;
    }

    //TS jellemzőjét a get és a set foglalt szavak vezetik be
    get fordulókSzáma(): number {
        return this.#tippek.length;
    }

    get JatekosLegnagyobbTippje(): number {
        // klasszikus prog tétel
        let maxTipp: number = this.#tippek[0];
        for (const tipp of this.#tippek.slice(1)) {
            //C# skipp(1)
            if (tipp > maxTipp) {
                maxTipp = tipp;
            }
        }
        return maxTipp;
    }

    get JatekosLegnagyobbTippje2(): number {
        return Math.max(...this.#tippek);
        // Math.max(6,7,3,4,5) -> 7
        // Spread opetártor ... -> szétszedi a tömb elemeit.
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
