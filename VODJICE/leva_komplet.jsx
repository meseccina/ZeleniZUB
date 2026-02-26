// ================================
// LEVA VODJICA - KOMPLETAN SISTEM
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
// KOMPLETNA FUNKCIJA ZA LEVA VODJICU
// ================================

function postaviCeluLevuVodicu() {
    try {
        $.writeln("=== POČETAK POSTAVLJANJA LEVE VODJICE ===");
        
        // Ne pozivati initLevaVodjica() da bi se sačuvala pozicija kao u MOVE verziji
        
        var success = true;
        var results = [];
        
        // 1. Postavi CRNA VODJICA
        if (positionLevaCrnaVodjica()) {
            results.push("✓ CRNA VODJICA postavljena");
        } else {
            results.push("✗ Greška pri postavljanju CRNE VODJICE");
            success = false;
        }
        
        // 2. Postavi LEVI SREDNJI PASER
        if (positionLevaSrednjiPaser()) {
            results.push("✓ LEVI SREDNJI PASER postavljen");
        } else {
            results.push("✗ Greška pri postavljanju LEVOG SREDNJEG PASERA");
            success = false;
        }
        
        // 3. Postavi LEVI DONJI PASER
        if (positionLevaDonjiPaser()) {
            results.push("✓ LEVI DONJI PASER postavljen");
        } else {
            results.push("✗ Greška pri postavljanju LEVOG DONJEG PASERA");
            success = false;
        }
        
        // Očisti temp objekte (bez pozicioniranja grupe)
        očistiTempObjekte();
        
        // Prikaz rezultata
        $.writeln("=== REZULTATI ===");
        for (var i = 0; i < results.length; i++) {
            $.writeln(results[i]);
        }
        
        if (success) {
            $.writeln("=== LEVA VODJICA USPEŠNO POSTAVLJENA ===");
            
            // Temp objekti su očišćeni iznad
            
            // Deselectuj sve na kraju
            app.activeDocument.selection = null;
            
            return true;
        } else {
            alert("Neki elementi LEVE vodice nisu uspešno postavljeni.\nProverite konzolu za detalje.");
            return false;
        }
        
    } catch (e) {
        alert("Greška u LEVA VODJICA sistemu: " + e.message);
        return false;
    }
}

// ================================
// IZVRŠENJE
// ================================

// Proveri da li dokument postoji
if (app.documents.length > 0) {
    var success = postaviCeluLevuVodicu();
    
    if (success) {
        // Opciono: prikaži debug informacije
        // debugElements();
    }
} else {
    alert("Nema otvorenih dokumenata");
}
