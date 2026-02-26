// Koristi univerzalnu skriptu za oba tipa posloja
var scriptPath = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\ime_fajla_sa_brendom_univerzalno.jsx";

// Proveri da li je putanja uneta
if (scriptPath) {
    // Pronalaženje sloja "VODjICE"
    var guideLayer = null;
    for (var i = 0; i < app.activeDocument.layers.length; i++) {
        if (app.activeDocument.layers[i].name === "VODjICE") {
            guideLayer = app.activeDocument.layers[i];
            break;
        }
    }

    // Ako sloj "VODjICE" nije pronađen, ispisuje se poruka
    if (guideLayer === null) {
        alert("Sloj 'VODjICE' nije pronađen.");
    } else {
        // Pronalaženje grupe "DESNA" unutar sloja "VODjICE"
        var rightGroup = null;
        for (var j = 0; j < guideLayer.groupItems.length; j++) {
            if (guideLayer.groupItems[j].name === "DESNA") {
                rightGroup = guideLayer.groupItems[j];
                break;
            }
        }

        // Ako grupa "DESNA" nije pronađena, ispisuje se poruka
        if (rightGroup === null) {
            alert("Grupa 'DESNA' nije pronađena unutar sloja 'VODjICE'.");
        } else {
            // Pronalaženje tekstualnog objekta "IME POSLA" unutar grupe "DESNA"
            var jobNameText = null;
            for (var k = 0; k < rightGroup.textFrames.length; k++) {
                if (rightGroup.textFrames[k].name === "IME POSLA") {
                    jobNameText = rightGroup.textFrames[k];
                    break;
                }
            }

            // Ako tekstualni objekat "IME POSLA" nije pronađen, ispisuje se poruka
            if (jobNameText === null) {
                alert("Tekstualni objekat 'IME POSLA' nije pronađen unutar grupe 'DESNA'.");
            } else {
                // Selektuj tekstualni objekat "IME POSLA"
                jobNameText.selected = true;

                // Pokreni skript
                $.evalFile(scriptPath);
            }
        }
    }
} else {
    // Ako korisnik nije uneo putanju, prikaži poruku
    alert("Nije uneta putanja do skripta.");
}
