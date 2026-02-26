#target illustrator

// KONTROLER V2.0 - Optimizovano sa pažnjom
// Zamenjuje stari 00_auto_info_tabele.jsx

var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\INFO TABELE\\";

// Samo jedna optimizovana skripta V2
var scriptNames = [
    "OPTIMIZOVANO_v2_info_tabele.jsx"
];

// Funkcija za pokretanje skripte
function runScript(scriptName) {
    var scriptFile = new File(directoryPath + scriptName);
    if (scriptFile.exists) {
        $.evalFile(scriptFile);
        return true;
    } else {
        alert("Skripta nije pronađena: " + scriptName);
        return false;
    }
}

// Prozor sa progresom
var progressWindow = new Window("palette", "Optimizovano V2.0...");
progressWindow.orientation = "column";
progressWindow.alignChildren = ["center", "center"];

// Dodaj tekst koji prikazuje trenutni napredak
var progressText = progressWindow.add("statictext", undefined, "Pokrećem V2.0 skriptu...");
progressText.justify = "center";

// Dodaj progres bar
var progressBar = progressWindow.add("progressbar", [0, 0, 400, 10], 0, scriptNames.length);
progressBar.value = 0;

// Prikazi prozor
progressWindow.show();

// Pokreni optimizovanu skriptu V2
for (var i = 0; i < scriptNames.length; i++) {
    progressText.text = "Izvršavam V2.0: " + scriptNames[i];
    progressBar.value = i + 1;
    
    var success = runScript(scriptNames[i]);
    if (!success) {
        progressText.text = "GREŠKA pri izvršavanju V2.0!";
        break;
    }
    
    progressWindow.update();
}

if (success) {
    progressText.text = "V2.0 - ZAVRŠENO!";
}

progressBar.value = scriptNames.length;

// Automatski zatvori prozor nakon 1 sekunde
progressWindow.update();
$.sleep(1000);
progressWindow.close();
