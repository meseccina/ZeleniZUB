// Pronalaženje grupe "REG VODJICA" unutar grupe "DESNA" na sloju "VODjICE" i pozivanje drugog skripta

// Definišite putanju do drugog skripta
var drugiSkriptPutanja = "C:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\VODJICE\\vodjice_na_dimenziju.jsx";

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
        // Pronalaženje grupe "REG VODJICA" unutar grupe "DESNA"
        var groupCrnaVodjica = groupDESNA.groupItems.getByName("REG VODJICA");

        // Provera da li je grupa "REG VODJICA" pronađena
        if (groupCrnaVodjica != null) {
            // Selektovanje grupe "REG VODJICA"
            groupCrnaVodjica.selected = true;

            // Provera da li je drugi skript dostupan
            var drugiSkript = new File(drugiSkriptPutanja);
            if (drugiSkript.exists) {
                // Učitavanje i izvršavanje drugog skripta
                $.evalFile(drugiSkript);
            } else {
                alert("Grupa 'REG VODJICA' je pronađena i selektovana, ali drugi skript nije pronađen na navedenoj putanji: " + drugiSkriptPutanja);
            }
        } else {
            alert("Grupa 'REG VODJICA' nije pronađena unutar grupe 'DESNA' na sloju 'VODjICE'.");
        }
    } else {
        alert("Grupa 'DESNA' nije pronađena na sloju 'VODjICE'.");
    }
} else {
    alert("Sloj 'VODjICE' nije pronađen.");
}
