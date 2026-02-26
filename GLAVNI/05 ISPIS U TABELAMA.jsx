// Unesi putanju do direktorijuma sa skriptama
var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\INFO TABELE\\";

// Definiši ime skripti za Chips Way i Move
var chipsWayScript = "CHIPS WAY - ISPIS - AUTO.jsx"; // Zamenite sa stvarnim imenom skripte za Chips Way
var moveScript = "MOVE TABELA -ISPIS - AUTO.jsx"; // Zamenite sa stvarnim imenom skripte za Move

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

// Kreiraj dijaloški prozor sa dva dugmeta
var dialog = new Window("dialog", "Izbor skripte");
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];

// Dodaj dugme "Chips Way"
var chipsWayButton = dialog.add("button", undefined, "Chips Way");

// Dodaj dugme "Move"
var moveButton = dialog.add("button", undefined, "Move");

// Postavi reakciju na pritisak na dugme "Chips Way"
chipsWayButton.onClick = function() {
    runScript(chipsWayScript);  // Pokreće skriptu za Chips Way
    dialog.close();  // Zatvara dijaloški prozor
};

// Postavi reakciju na pritisak na dugme "Move"
moveButton.onClick = function() {
    runScript(moveScript);  // Pokreće skriptu za Move
    dialog.close();  // Zatvara dijaloški prozor
};

// Pokaži dijaloški prozor
dialog.show();
