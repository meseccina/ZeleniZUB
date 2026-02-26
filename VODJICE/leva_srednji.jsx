// ================================
// LEVA SREDNJI PASER
// ================================

#target illustrator

// Učitaj utils funkcije
var utilsPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\utils.js";
var utilsFile = new File(utilsPath);

if (utilsFile.exists) {
    $.evalFile(utilsFile);
} else {
    alert("Utils.js nije pronađen na putanji: " + utilsPath);
}

// ================================
// GLAVNA FUNKCIJA
// ================================

function postaviLeviSrednjiPaser() {
    try {
        // Inicijalizuj sistem
        initLevaVodjica();
        
        // Pozicioniraj LEVI SREDNJI PASER
        var success = positionLevaSrednjiPaser();
        
        if (success) {
            $.writeln("LEVI SREDNJI PASER uspešno postavljen");
            
            // Deselectuj sve
            app.activeDocument.selection = null;
            
            // Selektuj LEVI SREDNJI PASER za eventualne dalje operacije
            var elements = getLevaVodjicaElements();
            if (elements && elements.srednjiPaser) {
                elements.srednjiPaser.selected = true;
            }
            
            return true;
        } else {
            alert("Greška pri postavljanju LEVOG SREDNJEG PASERA");
            return false;
        }
        
    } catch (e) {
        alert("Greška u LEVI SREDNJI skripti: " + e.message);
        return false;
    }
}

// ================================
// IZVRŠENJE
// ================================

// Proveri da li dokument postoji
if (app.documents.length > 0) {
    postaviLeviSrednjiPaser();
} else {
    alert("Nema otvorenih dokumenata");
}
