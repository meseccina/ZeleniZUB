// 07 MONTAZA - AUTO NOVA VERZIJA (sa novim color funkcijama)
// -------------------------------------------------------
#target illustrator

// Ako nema otvorenog dokumenta, kreiraj novi
if (app.documents.length === 0) {
    app.documents.add(DocumentColorSpace.CMYK, 210, 297); // A4
    alert("Kreiran novi dokument jer nije bilo otvorenog.");
}

// *** KONFIGURACIJA ***
var directoryPath = "C:/Users/Zeka24/Desktop/Script_AI/POMOCNI/MONTAZA/";
var scriptDirectoryPath = "C:/Users/Zeka24/Desktop/Script_AI/";
var logFilePath = directoryPath + "montaza_status_log.txt";
var pauseMs = 25;

// *** 1) LISTA SKRIPTI U REDOSLEDU ***
var mainScripts = [
    "01_za_montazu_v3.6.jsx", // Originalna skripta sa dinamičkim brojanjem boja
    "02_pun_naziv_za_montazu_optimized.jsx", // Kreira tekstove sa "C"
    "03_dupliciranje_teksta_za_montazu_optimized.jsx", // Duplira tekstove
    "05_08_optimized.jsx", // Upisuje prave boje u sve tekstove (nakon dupliranja)
    "06_pozicioniranje_grupe_optimized.jsx", // Obojavanje i grupisanje
    "grupisanje.jsx", // Grupisanje "Tekst 01 + 01", "Tekst 02 + 02", itd.
    "brisi_me.jsx", // Briše "brisi me" objekte
    "spisak_boja_final.jsx" // Kreira spisak svih korišćenih boja
];

// *** 2) ČIŠĆENJE SELEKCIJE NA POČETKU ***
function clearSelection() {
    if (app.activeDocument) {
        app.activeDocument.selection = null;
    }
}

// *** 3) PRIPREMA LOG FAJLA ***
var logFile = new File(logFilePath);
logFile.encoding = "UTF-8";
if (!logFile.open("a")) {
    alert("Ne mogu da otvorim log fajl:\n" + logFile.error);
}

function log(msg) {
    if (logFile && logFile.opened) {
        logFile.writeln((new Date()).toString() + " - " + msg);
        logFile.flush();
    }
}

log("-------------- Pokretanje NOVE verzije on: " + (new Date()).toString() + " --------------");

// *** 4) FUNKCIJA ZA POKRETANJE JEDNE SKRIPTE ***
function runScript(scriptName, isFromMontaza) {
    var fullPath = isFromMontaza ? directoryPath + scriptName : scriptDirectoryPath + scriptName;
    var scriptFile = new File(fullPath);
    
    if (!scriptFile.exists) {
        log("[SKIPPED] " + scriptName + " – fajl ne postoji.");
        return true;
    }

    try {
        $.evalFile(scriptFile);
        log("[OK] " + scriptName + " izvršena.");
        return true;

    } catch (e) {
        log("[ERROR] " + scriptName + " – " + e.message);
        return confirm(
            "Greška u skripti:\n" +
            scriptName + "\n\n" +
            e.message + "\n\n" +
            "Nastaviti sa sledećim skriptama?"
        );
    }
}

// *** 5) FUNKCIJA ZA NOVI COLOR SISTEM ***
function runNewColorSystem() {
    try {
        log("Pokretanje novog color sistema...");
        
        // Učitaj color_utils funkcije
        var colorUtilsFile = new File("C:/Users/Zeka24/Desktop/Script_AI/POMOCNI/MONTAZA/color_utils.jsx");
        if (!colorUtilsFile.exists) {
            log("[ERROR] color_utils.jsx nije pronađen!");
            return false;
        }
        
        $.evalFile(colorUtilsFile);
        log("[OK] color_utils.jsx učitan");
        
        // Dobavi sve boje
        var doc = app.activeDocument;
        var allColors = getAllColors(doc);
        
        if (allColors.length === 0) {
            log("[WARNING] Nema boja za upisivanje!");
            return true;
        }
        
        log("[INFO] Pronađeno " + allColors.length + " boja: " + allColors.join(", "));
        
        // Proveri da li postoji sloj ZA MONTAZU
        var montageLayer = doc.layers["ZA MONTAZU"];
        if (!montageLayer) {
            log("[ERROR] Sloj 'ZA MONTAZU' ne postoji!");
            return false;
        }
        
        // Upisi boje u tekstove
        var writtenCount = 0;
        
        for (var i = 0; i < allColors.length && i < 12; i++) {
            try {
                var textName = "Tekst " + (i + 1 < 10 ? "0" + (i + 1) : (i + 1));
                var textObj = montageLayer.textFrames.getByName(textName);
                
                if (textObj) {
                    var currentText = textObj.contents;
                    
                    if (/C$/.test(currentText)) {
                        var updatedText = currentText.replace(/C$/, allColors[i]);
                        textObj.contents = updatedText;
                        writtenCount++;
                        log("[OK] Upisano u " + textName + ": " + allColors[i]);
                    }
                }
            } catch (e) {
                log("[WARNING] Tekst " + textName + " ne postoji");
            }
        }
        
        // Sakrij prazne pravougaonike
        for (var i = 1; i <= 12; i++) {
            try {
                var rectName = (i < 10 ? "0" + i : i);
                var rect = montageLayer.pageItems.getByName(rectName);
                if (rect && rect.typename === "PathItem") {
                    rect.visible = false;
                }
            } catch (e) {
                // Pravougaonik ne postoji, ignorišimo
            }
        }
        
        // Prikaži samo one sa bojama
        for (var i = 0; i < allColors.length && i < 12; i++) {
            try {
                var rectName = ((i + 1) < 10 ? "0" + (i + 1) : (i + 1));
                var rect = montageLayer.pageItems.getByName(rectName);
                if (rect && rect.typename === "PathItem") {
                    rect.visible = true;
                }
            } catch (e) {
                // Pravougaonik ne postoji, ignorišimo
            }
        }
        
        log("[OK] Upisano " + writtenCount + " boja, prikazano " + Math.min(allColors.length, 12) + " pravougaonika");
        
                
        return true;
        
    } catch (e) {
        log("[ERROR] Greška u novom color sistemu: " + e.message);
        return false;
    }
}


// *** 6) GLAVNA PETLJA ***
var aborted = false;

// Čistimo selekciju pre početka
clearSelection();

var startTime = new Date().getTime();

// Prvo pokreni stare skripte za kreiranje
for (var i = 0; i < mainScripts.length; i++) {
    var cont = runScript(mainScripts[i], true);

    if (!cont) {
        aborted = true;
        log(">>> IZVRŠAVANJE PREKINUTO od korisnika");
        break;
    }

    $.sleep(pauseMs);
}

// Zatim pokreni novi color sistem
if (!aborted) {
    var cont = runNewColorSystem();
    if (!cont) {
        aborted = true;
        log(">>> NOVI COLOR SISTEM PREKINUT");
    }
}

var endTime = new Date().getTime();
var executionTime = (endTime - startTime) / 1000;

// *** 7) FINÁL ***
if (!aborted) {
    log(">>> Sve skripte završene uspešno");
    log(">>> Ukupno vreme izvršenja: " + executionTime.toFixed(2) + " sekundi");
}

if (logFile && logFile.opened) {
    log("--------------------------------------------------------------\n");
    logFile.close();
}

// Prikaz vremena izvršenja korisniku
if (!aborted) {
    // Nova montaža završena bez alerta
}
