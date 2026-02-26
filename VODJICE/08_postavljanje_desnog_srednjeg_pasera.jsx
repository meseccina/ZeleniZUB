// Pronalaženje grupe "DESNI SREDNJI PASER" unutar grupe "DESNA" na sloju "VODjICE" i pozivanje drugog skripta

// Definišite putanju do drugog skripta
var drugiSkriptPutanja = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\sredisnji_paser.jsx";

// Pronalaženje dokumenta
var doc = app.activeDocument;

// Pronalaženje sloja "VODjICE"
var layer = doc.layers.getByName("VODjICE");

// Provera da li je sloj pronađen
if (layer != null) {
    // Pronalaženje grupe "DESNA" unutar sloja "VODjICE"
    var groupDESNA = layer.groupItems.getByName("DESNA");

    // Provera da li je grupa "DESNA" pronađena
    if (groupDESNA != null) {
        // Pronalaženje grupe "DESNI SREDNJI PASER" unutar grupe "DESNA"
        var groupCrnaVodjica = groupDESNA.groupItems.getByName("DESNI SREDNJI PASER");

        // Provera da li je grupa "DESNI SREDNJI PASER" pronađena
        if (groupCrnaVodjica != null) {
            // Selektovanje grupe "DESNI SREDNJI PASER"
            groupCrnaVodjica.selected = true;

            // Provera da li je drugi skript dostupan
            var drugiSkript = new File(drugiSkriptPutanja);
            if (drugiSkript.exists) {
                // Učitavanje i izvršavanje drugog skripta
                $.evalFile(drugiSkript);
            } else {
                alert("Grupa 'DESNI SREDNJI PASER' je pronađena i selektovana, ali drugi skript nije pronađen na navedenoj putanji: " + drugiSkriptPutanja);
            }
        } else {
            alert("Grupa 'DESNI SREDNJI PASER' nije pronađena unutar grupe 'DESNA' na sloju 'VODjICE'.");
        }
    } else {
        alert("Grupa 'DESNA' nije pronađena na sloju 'VODjICE'.");
    }
} else {
    alert("Sloj 'VODjICE' nije pronađen.");
}
