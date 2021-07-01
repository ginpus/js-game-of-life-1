"use strict";

function newField(xSize, ySize) {
    let field = new Array(ySize);
    for (let y = 0; y < ySize; y++) {
        field[y] = new Array(xSize);
    }
    return field;
}

const fieldX = 50;
const fieldY = 10;


// atsitiktinio lauko sugeneravimas

let field = newField(fieldX, fieldY);

for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
        if (Math.random() < 0.22) {
            field[y][x] = "X";
        } else {
            field[y][x] = ".";
        }
    }
}

// fiksuoto lauko sugeneravimas
// let field = [
//     [".", "X", "."],
//     [".", "X", "."],
//     [".", "X", "."]
// ];


// fiksuoto lauko sugeneravimas
// let field = [
//     [".", ".", ".", ".", ".", "."],
//     [".", ".", "X", ".", ".", "."],
//     [".", ".", "X", ".", ".", "."],
//     [".", "X", "X", ".", ".", "."],
//     [".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "."]
// ];

// fiksuoto lauko sugeneravimas
// let field = [
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", "X", "X", "X", ".", ".", ".", "."],
//     [".", ".", ".", "X", ".", ".", ".", "X", ".", ".", "."],
//     [".", ".", ".", "X", ".", ".", ".", "X", ".", ".", "."],
//     [".", ".", ".", ".", "X", "X", "X", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", "X", "X", "X", ".", ".", ".", "."],
//     [".", ".", ".", "X", ".", ".", ".", "X", ".", ".", "."],
//     [".", ".", ".", "X", ".", ".", ".", "X", ".", ".", "."],
//     [".", ".", ".", ".", "X", "X", "X", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
// ];

let laukuMasyvas = [];
let palyginamasisMasyvas = [];
let palyginamojiEilute = [];
let grynaEilute = "";
let grynaEiluteNauja = "";


// pirmos iteracijos spaussdinimas
for (let y = 0; y < field.length; y++) {
    let line = "";
    for (let x = 0; x < field[y].length; x++) {
        line += field[y][x];
    }
    console.log(line);
}
laukuMasyvas.push(field);
// console.log(laukuMasyvas);

console.log(0, "-".repeat(field[0].length - 2), '\n');

// viso masyvo eilutes pasiverciu viena naujo masyvo eilute
for (let k = 0; k < field.length; k++) {
    palyginamojiEilute = palyginamojiEilute.concat(field[k]);
    // console.log(palyginamojiEilute);
}
// pridedu i eilute paversta masyva i palyginamaji masyva
palyginamasisMasyvas.push(palyginamojiEilute);
palyginamojiEilute = [];


// pagrindinis ciklas

let cycleCount = 1000;

for (let i = 1; i <= cycleCount; i++) {
    let nuajasLaukas = newField(field[0].length, field.length);
    // i kartu kartosime, kas zemiau
    for (let y = 0; y < nuajasLaukas.length; y++) {
        // imam sukurto field'o auksti (y) ir kartojame tiek, koks aukstis:
        let line = ""; /*sukuriama nauja eilute atspausdinimui */
        for (let x = 0; x < nuajasLaukas[y].length; x++) {
            // imam sukurto fieldo ploti (x) ir kartojam:
            let kaimynai = 0;
            if (y > 0) { // visi, kas yra ne pirmoje eilutėje
                if (x > 0) { // IR ne pirmame stulpelyje, 
                    if (laukuMasyvas[i - 1][y - 1][x - 1] === "X") { //tikrinti VIRSUTINI KAIRI kaimyna
                        kaimynai++;
                    }
                }
                if (laukuMasyvas[i - 1][y - 1][x] === "X") { //tikrinti VIRSUTINI kaimyna
                    kaimynai++;
                }
                if (x < laukuMasyvas[i - 1][y].length - 1) { // IR ne paskutiniame stulpelyje
                    if (laukuMasyvas[i - 1][y - 1][x + 1] === "X") { //tikrinti VIRSUTINI DESINI kaimyna
                        kaimynai++;
                    }
                }
            }
            if (x > 0) { //visi, kas yra ne pirmame stulpelyje
                if (laukuMasyvas[i - 1][y][x - 1] === "X") { // tikrinti KAIRI kaimyna
                    kaimynai++;
                }
            }
            if (x < laukuMasyvas[i - 1][y].length - 1) { //visi, kas yra ne paskutiniame stulpelyje
                if (laukuMasyvas[i - 1][y][x + 1] === "X") { // tikrinti DESINI kaimyna
                    kaimynai++;
                }
            }
            if (y < laukuMasyvas[i - 1].length - 1) { //visi, kas yra ne paskutineje eiluteje 
                if (x > 0) { // IR ne pirmame stulpelyje
                    if (laukuMasyvas[i - 1][y + 1][x - 1] === "X") { // tikrinti APATINI KAIRI kaimyna
                        kaimynai++;
                    }
                }
                if (laukuMasyvas[i - 1][y + 1][x] === "X") { // tikrinti APATINI kaimyna
                    kaimynai++;
                }
                if (x < laukuMasyvas[i - 1][y].length - 1) { // ir ne paskutiniame stulpelyje
                    if (laukuMasyvas[i - 1][y + 1][x + 1] === "X") { // tikrinti APATINI DESINI kaimyna
                        kaimynai++;
                    }
                }
            }
            if (laukuMasyvas[i - 1][y][x] === "X") {
                if (kaimynai === 2 || kaimynai == 3) {
                    nuajasLaukas[y][x] = "X";
                } else {
                    nuajasLaukas[y][x] = ".";
                }
            } else {
                if (kaimynai == 3) {
                    nuajasLaukas[y][x] = "X";
                } else {
                    nuajasLaukas[y][x] = ".";
                }
            }

            line += nuajasLaukas[y][x];
        }
        console.log(line);
    }
    console.log(i, "-".repeat(nuajasLaukas[0].length - i.toString().length - 1), '\n');

    // ----------------------------PALYGINIMUI-----------------------------------
    // prisidedam nauja lauka i lauku masyva
    laukuMasyvas.push(nuajasLaukas);
    // pasiverciam masyvo eilutes i viena eilute ir isidedam i masyva, kuri naudosim visu masyvu palyginimui
    for (let k = 0; k < nuajasLaukas.length; k++) {
        palyginamojiEilute = palyginamojiEilute.concat(nuajasLaukas[k]);
        // console.log(palyginamojiEilute);
    }
    palyginamasisMasyvas.push(palyginamojiEilute);
    palyginamojiEilute = [];

    let same = true;
    for (let m = 1; m < laukuMasyvas.length; m++) {
        // console.log('naujausias masyvas (i): ', i);
        // console.log(laukuMasyvas[i]);
        // console.log('viso masyvu: ', laukuMasyvas.length);
        // console.log('pries tai buves masyvas (i-m): ', i - m);
        // console.log(laukuMasyvas[i - m]);
        same = true;
        for (let y = 0; y < laukuMasyvas[i].length; y++) {
            for (let x = 0; x < laukuMasyvas[i][y].length; x++) {
                if (laukuMasyvas[i - m][y][x] !== laukuMasyvas[i][y][x]) {
                    same = false;
                    // console.log(laukuMasyvas[i - m][y][x], ' : ', laukuMasyvas[i][y][x])
                }
            }
        }
        if (same) {
            break;
        }
    }
    if (same) {
        break;
    }
}


/*
1. atspausdinti 50 iteraciju
2. nutraukti spausdinima, jei nauja iteracija tokia pati, kaip ir pries tai buvusi
3. nutraukti spausdinima, jei nauja iteracija jau buvo istorijoje
*/