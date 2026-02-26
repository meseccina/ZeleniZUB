// Pronalaženje grupe "CRNA VODJICA" unutar grupe "LEVA" na sloju "VODjICE" i pozivanje drugog skripta

// Definišite putanju do drugog skripta
var drugiSkriptPutanja = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\vodjice_na_dimenziju.jsx";

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
        // Pronalaženje grupe "CRNA VODJICA" unutar grupe "LEVA"
        var groupCrnaVodjica = groupLeva.groupItems.getByName("CRNA VODJICA");

        // Provera da li je grupa "CRNA VODJICA" pronađena
        if (groupCrnaVodjica != null) {
            // Selektovanje grupe "CRNA VODJICA"
            groupCrnaVodjica.selected = true;

            // Provera da li je drugi skript dostupan
            var drugiSkript = new File(drugiSkriptPutanja);
            if (drugiSkript.exists) {
                // Učitavanje i izvršavanje drugog skripta
                $.evalFile(drugiSkript);
            } else {
                alert("Grupa 'CRNA VODJICA' je pronađena i selektovana, ali drugi skript nije pronađen na navedenoj putanji: " + drugiSkriptPutanja);
            }
        } else {
            alert("Grupa 'CRNA VODJICA' nije pronađena unutar grupe 'LEVA' na sloju 'VODjICE'.");
        }
    } else {
        alert("Grupa 'LEVA' nije pronađena na sloju 'VODjICE'.");
    }
} else {
    alert("Sloj 'VODjICE' nije pronađen.");
}
