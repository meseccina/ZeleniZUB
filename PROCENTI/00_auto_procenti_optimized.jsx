#target illustrator

// Unesi putanju do direktorijuma sa skriptama
var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\PROCENTI\\";

// Definiši listu imena skripti u redosledu (bez 01_Razbijanje_simbola.jsx)
var scriptNames = [
    "!0 postavka_layera.jsx",
    "02_Ispisivanje_u_tabelu.jsx"
];

// Funkcija za pokretanje skripte
function runScript(scriptName) {
    var scriptFile = new File(directoryPath + scriptName);
    if (scriptFile.exists) {
        try {
            $.evalFile(scriptFile);
            $.writeln("Uspešno izvršena skripta: " + scriptName);
            return true;
        } catch (e) {
            $.writeln("Greška pri izvršavanju skripte: " + scriptName + " - " + e.message);
            return false;
        }
    } else {
        $.writeln("Skripta nije pronađena: " + scriptName);
        return false;
    }
}

// Napravi prozor sa progres bar-om
var progressWindow = new Window("palette", "PROCENTI - Optimizovan workflow");
progressWindow.orientation = "column";
progressWindow.alignChildren = ["center", "center"];

// Dodaj tekst koji prikazuje trenutni napredak
var progressText = progressWindow.add("statictext", undefined, "Pokrećem PROCENTI skripte...");
progressText.justify = "center";

// Dodaj progres bar
var progressBar = progressWindow.add("progressbar", [0, 0, 400, 10], 0, scriptNames.length);
progressBar.value = 0;

// Prikazi prozor
progressWindow.show();

// Pokreni svaku skriptu iz liste
for (var i = 0; i < scriptNames.length; i++) {
    // Ažuriraj tekst i progres bar
    progressText.text = "Pokrećem skriptu: " + scriptNames[i];
    progressBar.value = i + 1;

    runScript(scriptNames[i]);

    // Osveži prozor (potrebno je da se prozor osveži da bi napredovao progres bar)
    progressWindow.update();
}

// Kada završi, promeni tekst u prozoru
progressText.text = "PROCENTI ZAVRŠENO!";
progressBar.value = scriptNames.length;

// Osveži prozor
progressWindow.update();

// ======================================================
// Automatsko uključivanje slojeva na kraju
// ======================================================
function toggleLayersAtEnd() {
    try {
        var doc = app.activeDocument;
        
        // --- Slojevi koje uključujemo ---
        var onLayers = ["ǀ INFO ZA STAMPU", "MOVE TABELA 26", "KOTE", "RASKLOP"];
        
        for (var j = 0; j < onLayers.length; j++) {
            try {
                var lyrOn = doc.layers.getByName(onLayers[j]);
                lyrOn.visible = true;
            } catch (e) {
                // Sloj ne postoji, ignoriši
            }
        }
        
        // --- Slojeve koje isključujemo ---
        var offLayers = ["BELA", "_Bela_"];
        
        for (var k = 0; k < offLayers.length; k++) {
            try {
                var lyrOff = doc.layers.getByName(offLayers[k]);
                lyrOff.visible = false;
            } catch (e) {
                // Sloj ne postoji, ignoriši
            }
        }
        
        $.writeln("Slojevi su automatski podešeni na kraju procesa.");
        
    } catch (e) {
        $.writeln("Greška pri podešavanju slojeva: " + e.message);
    }
}

// Pozovi funkciju za podešavanje slojeva
toggleLayersAtEnd();

// Sačekaj 1 sekundu pa zatvori automatski
progressWindow.update();
$.sleep(1000);
progressWindow.close();
