// ================================
// LEVA DONJI PASER
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

function postaviLeviDonjiPaser() {
    try {
        // Inicijalizuj sistem
        initLevaVodjica();
        
        // Pozicioniraj LEVI DONJI PASER
        var success = positionLevaDonjiPaser();
        
        if (success) {
            $.writeln("LEVI DONJI PASER uspešno postavljen");
            
            // Deselectuj sve
            app.activeDocument.selection = null;
            
            // Selektuj LEVI DONJI PASER za eventualne dalje operacije
            var elements = getLevaVodjicaElements();
            if (elements && elements.donjiPaser) {
                elements.donjiPaser.selected = true;
            }
            
            return true;
        } else {
            alert("Greška pri postavljanju LEVOG DONJEG PASERA");
            return false;
        }
        
    } catch (e) {
        alert("Greška u LEVI DONJI skripti: " + e.message);
        return false;
    }
}

// ================================
// IZVRŠENJE
// ================================

// Proveri da li dokument postoji
if (app.documents.length > 0) {
    postaviLeviDonjiPaser();
} else {
    alert("Nema otvorenih dokumenata");
}
