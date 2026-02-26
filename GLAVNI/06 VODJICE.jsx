// Unesi putanju do direktorijuma sa skriptama
var directoryPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\";

// Učitaj config i error handler
try {
    $.evalFile(directoryPath + "config.js");
    $.evalFile(directoryPath + "error_handler.js");
} catch (e) {
    // Ako config ne postoji, koristi stare vrednosti
}

// Definiši ime skripti za Chips Way i Move
var chipsWayScript = "00_auto_vodjice_ChipsWay.jsx"; // Zamenite sa stvarnim imenom skripte za Chips Way
var moveScript = "00_auto_vodjice.jsx"; // Zamenite sa stvarnim imenom skripte za Move

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
            $.writeln("Uspešno izvršena skripta: " + scriptName);
            return true;
        } catch (e) {
            $.writeln("Greška prilikom izvršavanja skripte: " + scriptName + " - " + e.message);
            return false;
        }
    } else {
        $.writeln("Skripta nije pronađena: " + scriptName);
        return false;
    }
}

// Kreiraj dijaloški prozor sa dva dugmeta
var dialog = new Window("dialog", "VODJICE ZA");
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
