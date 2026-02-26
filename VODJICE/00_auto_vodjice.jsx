// Unesi putanju do direktorijuma sa skriptama
var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\";

// Učitaj config i error handler
try {
    $.evalFile(directoryPath + "config.js");
    $.evalFile(directoryPath + "error_handler.js");
} catch (e) {
    // Ako config ne postoji, koristi stare vrednosti
}

// Definiši listu imena skripti u redosledu
var scriptNames = [
    "00_vodjice.jsx",
    "unselected.jsx",
    "01_layer_vodjice_na_mesto.jsx",
    "unselected.jsx",
    "02_postavljanje_pozicije_vodjica.jsx",
    "unselected.jsx",
    "03_brisanje_kvadratica.jsx",
    "unselected.jsx",
    "04_postavljanje_leve_vodjice_na_dimenziju.jsx",
    "unselected.jsx",
    "05_postavljanje_levog_srednjeg_pasera.jsx",
    "unselected.jsx",
    "06_postavljanje_levog_donjeg_pasera.jsx",
    "unselected.jsx",
    "07_postavljanje_desne_vodjice_na_dimenziju.jsx",
    "unselected.jsx",
    "08_postavljanje_desnog_srednjeg_pasera.jsx",
    "unselected.jsx",
    "09_postavljanje_desnog_donjeg_pasera.jsx",
    "unselected.jsx",
    "10_dodavanje_imena_posla_na_vodjicu.jsx",
    "unselected.jsx",
    "11_dodavanje_imena_spot_boja_na_vodjicu.jsx",
    // 12. Raspored klinova
    "12_raspored_klinova_i_teksta_v3.jsx",
    "unselected.jsx",
    // 13. Boja leve vodjice
    "13_spot_boje_u_kockicama.jsx",
    "unselected.jsx",
    "14_vodjice_75.jsx",
    "unselected.jsx",
    "15_raspored_teksta_boja.jsx",
    "unselected.jsx",
    "unselected.jsx"
];

// Jednom pozovi unselected na početku
function unselectAll() {
    if (app.activeDocument.selection.length > 0) {
        app.activeDocument.selection = null;
    }
}

// Funkcija za pokretanje skripte
function runScript(scriptName) {
    if (typeof runScriptSafe === 'function') {
        return runScriptSafe(scriptName, directoryPath);
    }
    
    // Fallback na staru implementaciju
    var scriptFile = new File(directoryPath + scriptName);
    if (scriptFile.exists) {
        try {
            $.evalFile(scriptFile);
            return true;
        } catch (e) {
            $.writeln("Greška u " + scriptName + ": " + e.message);
            return false;
        }
    } else {
        $.writeln("Skripta ne postoji: " + scriptName);
        return false;
    }
}

// Pokreni svaku skriptu iz liste
for (var i = 0; i < scriptNames.length; i++) {
    runScript(scriptNames[i]);
}
