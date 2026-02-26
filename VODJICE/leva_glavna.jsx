// ================================
// LEVA GLAVNA VODJICA - CRNA VODJICA
// ================================

#target illustrator

// Učitaj utils funkcije
var utilsPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\utils.js";
var utilsFile = new File(utilsPath);

if (utilsFile.exists) {
    $.evalFile(utilsFile);
} else {
    alert("Utils.js nije pronađen na putanji: " + utilsPath);
    // Exit ako utils ne postoji
    // return;
}

// ================================
// GLAVNA FUNKCIJA
// ================================

function postaviLevuGlavnuVodicu() {
    try {
        // Inicijalizuj sistem
        initLevaVodjica();
        
        // Pozicioniraj CRNA VODJICA
        var success = positionLevaCrnaVodjica();
        
        if (success) {
            $.writeln("LEVA GLAVNA VODJICA uspešno postavljena");
            
            // Deselectuj sve
            app.activeDocument.selection = null;
            
            // Selektuj CRNA VODJICA za eventualne dalje operacije
            var elements = getLevaVodjicaElements();
            if (elements && elements.crnaVodjica) {
                elements.crnaVodjica.selected = true;
            }
            
            return true;
        } else {
            alert("Greška pri postavljanju LEVE GLAVNE VODJICE");
            return false;
        }
        
    } catch (e) {
        alert("Greška u LEVA GLAVNA skripti: " + e.message);
        return false;
    }
}

// ================================
// IZVRŠENJE
// ================================

// Proveri da li dokument postoji
if (app.documents.length > 0) {
    postaviLevuGlavnuVodicu();
} else {
    alert("Nema otvorenih dokumenata");
}
