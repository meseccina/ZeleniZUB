// Preuzimanje trenutnog dokumenta
var doc = app.activeDocument;

// Definisanje imena sloja i traženog teksta
var layerName = "MOVE TABELA 26";
var searchText = "SIFRA";

// Funkcija za pronalaženje sloja po imenu
function findLayerByName(name) {
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            return doc.layers[i];
        }
    }
    return null;  // Ako sloj nije pronađen, vraća null
}

// Funkcija za selektovanje objekata sa traženim tekstom
function selectTextItems(layer, text) {
    var selectedItems = [];
    for (var j = 0; j < layer.pageItems.length; j++) {
        var item = layer.pageItems[j];
        
        // Proveravamo da li je objekat tekst i da li sadrži traženi tekst
        if (item.typename == "TextFrame" && item.contents.indexOf(text) !== -1) {
            selectedItems.push(item);
        }
    }
    
    if (selectedItems.length > 0) {
        // Zamenjujemo .forEach sa tradicionalnom for petljom
        for (var k = 0; k < selectedItems.length; k++) {
            selectedItems[k].selected = true;
        }
    } else {
        alert("Nema objekata sa tekstom '" + searchText + "' u sloju '" + layerName + "'.");
    }
}

// Funkcija za pokretanje skripta
function runScript(scriptPath) {
    if (app.selection.length > 0) {
        $.evalFile(scriptPath);
    } else {
        alert("Nema selektovanih objekata. Molimo selektujte objekte pre pokretanja skripta.");
    }
}

// Funkcija za deselectovanje objekata
function deselectItems() {
    // Prolazimo kroz sve selektovane objekte i postavljamo `selected` na false
    for (var i = 0; i < app.selection.length; i++) {
        app.selection[i].selected = false;
    }
    // Takođe, postavljamo `app.selection` na null kao dodatnu sigurnost
    app.selection = null;
}

try {
    var targetLayer = findLayerByName(layerName);
    if (targetLayer) {
        selectTextItems(targetLayer, searchText);

        // Putanja do drugog skripta
        var scriptPath = "c:\\Users\\Zeka24\\Desktop\\Script_AI\\POMOCNI\\POPUNJAVANJE TABELE\\TABELA - SIFRA.jsx";
        runScript(scriptPath);

        // Nakon što je skript pokrenut, deselektujemo sve objekte
        deselectItems();
    } else {
        alert("Sloj '" + layerName + "' nije pronađen.");
    }
} catch (e) {
    alert("Došlo je do greške: " + e.message);
}
