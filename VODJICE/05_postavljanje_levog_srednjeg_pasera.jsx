// Pronalaženje grupe "LEVI SREDNJI PASER" unutar grupe "LEVA" na sloju "VODjICE" i pozivanje drugog skripta

// Definišite putanju do drugog skripta
var drugiSkriptPutanja = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\sredisnji_paser.jsx";

// Pronalaženje dokumenta
var doc = app.activeDocument;

// Pronalaženje sloja "VODjICE"
var layer = doc.layers.getByName("VODjICE");

// Provera da li je sloj pronađen
if (layer != null) {
    // Pronalaženje grupe "LEVA" unutar sloja "VODjICE"
    var groupLeva = layer.groupItems.getByName("LEVA");

    // Provera da li je grupa "LEVA" pronađena
    if (groupLeva != null) {
        // Pronalaženje grupe "LEVI SREDNJI PASER" unutar grupe "LEVA"
        var groupCrnaVodjica = groupLeva.groupItems.getByName("LEVI SREDNJI PASER");

        // Provera da li je grupa "LEVI SREDNJI PASER" pronađena
        if (groupCrnaVodjica != null) {
            // Selektovanje grupe "LEVI SREDNJI PASER"
            groupCrnaVodjica.selected = true;

            // Provera da li je drugi skript dostupan
            var drugiSkript = new File(drugiSkriptPutanja);
            if (drugiSkript.exists) {
                // Učitavanje i izvršavanje drugog skripta
                $.evalFile(drugiSkript);
            } else {
                alert("Grupa 'LEVI SREDNJI PASER' je pronađena i selektovana, ali drugi skript nije pronađen na navedenoj putanji: " + drugiSkriptPutanja);
            }
        } else {
            alert("Grupa 'LEVI SREDNJI PASER' nije pronađena unutar grupe 'LEVA' na sloju 'VODjICE'.");
        }
    } else {
        alert("Grupa 'LEVA' nije pronađena na sloju 'VODjICE'.");
    }
} else {
    alert("Sloj 'VODjICE' nije pronađen.");
}
