#target illustrator

// Funkcija za formatiranje Pantone imena
function formatPantoneName(colorName) {
    var formattedName = String(colorName);
    
    // Zameni "_Bela_" sa "BELA"
    if (formattedName === "_Bela_") {
        return "BELA";
    }
    
    // Zameni "PANTONE " sa "P"
    formattedName = formattedName.replace(/^PANTONE /, 'P');
    
    // Obriši " C" sa kraja
    formattedName = formattedName.replace(/ C$/, '');
    
    return formattedName;
}

// Skripta za spisak boja - podeljena u dva koraka
function createColorListFinal() {
    try {
        var doc = app.activeDocument;
        var allColors = [];
        
        // Korak 1: Učitaj color_utils i dobavi boje
        var colorUtilsFile = new File("C:/Users/Zeka24/Desktop/Script_AI/POMOCNI/MONTAZA/color_utils.jsx");
        $.evalFile(colorUtilsFile);
        
        allColors = getAllColors(doc);
        alert("Pronađeno " + allColors.length + " boja.");
        
        // Formatiraj boje
        var formattedColors = [];
        for (var i = 0; i < allColors.length; i++) {
            var formattedColor = formatPantoneName(allColors[i]);
            formattedColors.push(formattedColor);
        }
        
        if (formattedColors.length === 0) {
            return;
        }
        
        // Korak 2: Pronađi postojeći sloj ZA MONTAZU i dodaj tekst
        var montageLayer = doc.layers["ZA MONTAZU"];
        if (!montageLayer) {
            return;
        }
        
        var textFrame = montageLayer.textFrames.add();
        textFrame.name = "Spisak boja";
        
        // Pozicioniraj tekst 40pt ispod artboarda
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var artboardRect = artboard.artboardRect;
        var bottomEdge = artboardRect[3]; // Donja ivica artboarda
        
        textFrame.left = artboardRect[0]; // Leva ivica artboarda
        textFrame.top = bottomEdge - 40; // 40pt ispod donje ivice
        
        textFrame.contents = formattedColors.join(", ");
        
    } catch (e) {
        // Tiha greška bez alerta
    }
}

createColorListFinal();
