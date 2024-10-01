import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import Megoldás from "./Megoldás";
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
// import { parse } from "path";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const mo: Megoldás = new Megoldás("egyszamjatek.txt");

    res.write(`3. feladat: Játékosok száma: ${mo.jatékosoksSzáma}\n`);

    res.write(`4. feladat: Fordulók száma: ${mo.játékFordulóinakSzáma}\n`);

    res.write(`5. feladat: Az első fordulóban ${mo.voltEgyesTippElsőFordulóban ? "" : "nem"} volt 1-es tipp\n`);

    res.write(`6. feladat: Legnagyobb tipp a fordulók során: ${mo.jatekLegnagyobbtippje}\n`);

    let inputFordulo: number = parseInt(params.get("fordulo") as string);
    if (isNaN(inputFordulo) || inputFordulo < 1 || inputFordulo > mo.játékFordulóinakSzáma) {
        inputFordulo = 1;
    }

    res.write(`7.feladat: Kérem a forduló sorszámát [1-${mo.játékFordulóinakSzáma}]: <input type='text' name='fordulo' value=${inputFordulo} style'max-width:100px; onChange='this.form.submit();'>\n`);

    res.write(`8.feladat: ${mo.nyertesTippSzoveg(inputFordulo)}\n`);

    res.write(`9. feladat: A megadott forduló nyertese: ${mo.nyertesJatekosSzoveg(inputFordulo)}`);

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
