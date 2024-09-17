import fs from "fs";
import Játékos from "./Játékos";

export default class Megoldás {
    #játékosok: Játékos[] = [];

    get jatékosoksSzáma(): number {
        return this.#játékosok.length;
    }

    get játékFordulóinakSzáma(): number {
        return this.#játékosok[0].fordulókSzáma;
    }

    get voltEgyesTippElsőFordulóban(): boolean {
        let voltEgyesTipp: boolean = false; // feltételezzük, hogy nincs
        // Ts-ben nincs for-each ciklus
        // Helyette a for.of ciklus használható
        for (const játékos of this.#játékosok) {
            if (játékos.fordulóTippje(1) === 1) {
                voltEgyesTipp = true;
                break; // befejezi a ciklus ismétlését
            }
        }
        return voltEgyesTipp;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim(); // trim() -> vezérlő karakterek levágása
                if (aktSor.length > 0) {
                    // ha adatok vannak a sorban:
                    this.#játékosok.push(new Játékos(aktSor));
                }
            });
    }
}
