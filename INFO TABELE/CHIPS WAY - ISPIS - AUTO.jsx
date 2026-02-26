// Unesi putanju do direktorijuma sa skriptama
var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\POPUNJAVANJE TABELE\\";

// Definiši listu imena skripti u redosledu u kojem želiš da budu pokrenute
var scriptNames = [
    "01_ispis_KLIJENT_ChipsWay.jsx",
    "UnSelected.jsx",
    "02_ispis_BREND_new.jsx",
    "UnSelected.jsx",
    "03_ispis_POSAO_new.jsx",
    "UnSelected.jsx",
    "04_ispis_SIFRA_ChipsWay.jsx",
    "UnSelected.jsx",
    "upisivanje_spot_boja.jsx",
    "UnSelected.jsx",
    "upisivanje_process_boja.jsx",
    "UnSelected.jsx",
    "UnSelected.jsx"
];

// Funkcija za deselektovanje svih objekata u dokumentu
function deselectAllItems() {
    try {
        // Prolazimo kroz sve selektovane objekte i postavljamo `selected` na false
        for (var i = 0; i < app.selection.length; i++) {
            app.selection[i].selected = false;
        }
        // Takođe, postavljamo `app.selection` na null kao dodatnu sigurnost
        app.selection = null;
        $.writeln("Svi objekti su deselektovani.");
    } catch (e) {
        $.writeln("Greška prilikom deselektovanja objekata: " + e.message);
    }
}

// Funkcija za pokretanje skripte
function runScript(scriptName) {
    var scriptFile = new File(directoryPath + scriptName);
    if (scriptFile.exists) {
        try {
            $.evalFile(scriptFile);
            $.writeln("Uspešno izvršena skripta: " + scriptName); // Log poruka u Console
        } catch (e) {
            $.writeln("Greška prilikom izvršavanja skripte: " + scriptName + " - " + e.message); // Greška u Console
        }
    } else {
        $.writeln("Skripta nije pronađena: " + scriptName); // Ako skripta ne postoji
    }
}

// Pokreni svaku skriptu iz liste
for (var i = 0; i < scriptNames.length; i++) {
    $.writeln("Pokrećem skriptu: " + scriptNames[i]); // Informacija o pokretanju skripte

    // Pre pokretanja skripte "04_ispis_SIFRA_ChipsWay.jsx", deselektujemo sve objekte
    if (scriptNames[i] === "04_ispis_SIFRA_ChipsWay.jsx") {
        deselectAllItems();  // Deselektujemo sve objekte
    }

    runScript(scriptNames[i]);
}
