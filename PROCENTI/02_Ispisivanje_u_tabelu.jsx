#target illustrator

app.preferences.setBooleanPreference("ShowExternalJSXWarning", false);



(function () {



    // ======================================================

    // JSON polyfill (za stare verzije Illustratora)

    // ======================================================

    if (typeof JSON === "undefined") {

        JSON = {

            parse: function (s) { return eval('(' + s + ')'); },

            stringify: function (o) {

                var t = typeof o;

                if (t != "object" || o === null) {

                    if (t == "string") o = '"' + o + '"';

                    return String(o);

                }

                var n, v, json = [], arr = (o && o.constructor == Array);

                for (n in o) {

                    v = o[n];

                    t = typeof v;

                    if (t == "string") v = '"' + v + '"';

                    else if (t == "object" && v !== null) v = JSON.stringify(v);

                    json.push((arr ? "" : '"' + n + '":') + String(v));

                }

                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");

            }

        };

    }



    try {



        // ======================================================

        // Putanja do JSON fajla

        // ======================================================

        var jsonFile = new File("C:/Users/Zeka24/Desktop/AnalizaPDF/results.json");

        if (!jsonFile.exists) {

            alert("JSON fajl ne postoji:\n" + jsonFile.fsName);

            return;

        }



        jsonFile.encoding = "UTF-8";

        jsonFile.open("r");

        var results = JSON.parse(jsonFile.read());

        jsonFile.close();



        if (!(results instanceof Array) || results.length === 0) {

            alert("JSON nije validan niz ili je prazan.");

            return;

        }



        // ======================================================

        // BELA uvek ide poslednja

        // ======================================================

        var belaItem = null;

        var filteredResults = [];



        for (var i = 0; i < results.length; i++) {

            if (results[i].name === "_Bela") {

                belaItem = results[i];

            } else {

                filteredResults.push(results[i]);

            }

        }



        if (belaItem) {

            filteredResults.push(belaItem);

        }



        results = filteredResults;



        // ======================================================

        // Helper funkcije (potrebne i za panel)

        // ======================================================

        function pad2(n) {

            return (n < 10 ? "0" : "") + n;

        }



        function normalizeColorName(name) {

            if (!name) return "";



            if (name === "_Bela" || name.indexOf("_Bela_") !== -1) {

                return "BELA";

            }



            if (name.indexOf("PANTONE ") === 0) {

                return name.replace("PANTONE ", "P");

            }



            return name;

        }



        // ======================================================

        // Automatsko proveravanje postojećih boja iz MOVE TABELI

        // ======================================================

        function checkColorsInMoveTable() {

            try {

                var doc = app.activeDocument;

                

                // Pronađi MOVE TABELA 26 sloj

                var moveTableLayer = doc.layers["MOVE TABELA 26"];

                if (!moveTableLayer) {

                    $.writeln("Sloj 'MOVE TABELA 26' nije pronađen - koristim sve boje");

                    return null;

                }

                

                // Pronađi BOJE U TABELI grupu

                var bojeGroup = moveTableLayer.groupItems["BOJE U TABELI"];

                if (!bojeGroup) {

                    $.writeln("Grupa 'BOJE U TABELI' nije pronađena - koristim sve boje");

                    return null;

                }

                

                // Pronađi PROCESNE BOJE grupu

                var processGroup = bojeGroup.groupItems["PROCESNE BOJE"];

                if (!processGroup) {

                    $.writeln("Grupa 'PROCESNE BOJE' nije pronađena - koristim sve boje");

                    return null;

                }

                

                // Proveri koje boje postoje

                var existingColors = {

                    cyan: false,

                    magenta: false,

                    yellow: false,

                    black: false

                };

                

                for (var i = 0; i < processGroup.pageItems.length; i++) {

                    var item = processGroup.pageItems[i];

                    if (item.name === "Cyan") existingColors.cyan = true;

                    if (item.name === "Magenta") existingColors.magenta = true;

                    if (item.name === "Yellow") existingColors.yellow = true;

                    if (item.name === "Black") existingColors.black = true;

                }

                

                $.writeln("Pronađene boje u MOVE TABELI:");

                $.writeln("Cyan: " + existingColors.cyan);

                $.writeln("Magenta: " + existingColors.magenta);

                $.writeln("Yellow: " + existingColors.yellow);

                $.writeln("Black: " + existingColors.black);

                

                return existingColors;

                

            } catch (e) {

                $.writeln("Greška pri proveri boja: " + e.message + " - koristim sve boje");

                return null;

            }

        }

        

        // Automatski filtriraj boje na osnovu MOVE TABELI

        var existingColors = checkColorsInMoveTable();

        var filteredResults = [];

        var belaItem = null;

        

        for (var i = 0; i < results.length; i++) {

            var color = results[i];

            var colorName = color.name.toUpperCase();

            

            // Sačuvaj BELA za kasnije (uvek ide na kraj)

            if (colorName === "_BELA" || colorName.indexOf("BELA") !== -1) {

                belaItem = color;

                continue;

            }

            

            // Zadrži sve spot boje

            if (colorName.indexOf("PANTONE") === 0 || colorName.indexOf("P ") === 0) {

                filteredResults.push(color);

                continue;

            }

            

            // Za procesne boje, proveri da li postoje u MOVE TABELI

            if (existingColors) {

                if (colorName === "CYAN" && existingColors.cyan) {

                    filteredResults.push(color);

                } else if (colorName === "MAGENTA" && existingColors.magenta) {

                    filteredResults.push(color);

                } else if (colorName === "YELLOW" && existingColors.yellow) {

                    filteredResults.push(color);

                } else if (colorName === "BLACK" && existingColors.black) {

                    filteredResults.push(color);

                }

            } else {

                // Ako MOVE TABELA ne postoji, koristi sve procesne boje

                if (colorName === "CYAN" || colorName === "MAGENTA" || 

                    colorName === "YELLOW" || colorName === "BLACK") {

                    filteredResults.push(color);

                }

            }

        }

        

        // Dodaj BELA na kraj (ako postoji)

        if (belaItem) {

            filteredResults.push(belaItem);

        }

        

        // Zameni originalni results sa filtriranim

        results = filteredResults;

        

        if (results.length === 0) {

            alert("Nema boja za prikaz nakon filtriranja.");

            return;

        }

        

        $.writeln("Automatski izabrano " + results.length + " boja za tabelu.");



        // ======================================================

        // Provera dokumenta

        // ======================================================

        if (app.documents.length === 0) {

            alert("Nema otvorenog dokumenta.");

            return;

        }



        var doc = app.activeDocument;



        // ======================================================

        // Dohvatanje lejera

        // ======================================================

        var layerName = "MOVE TABELA 26";

        var tableLayer;



        try {

            tableLayer = doc.layers.getByName(layerName);

        } catch (e) {

            alert("Lejer ne postoji: " + layerName);

            return;

        }



        tableLayer.visible = true;

        tableLayer.locked = false;



        for (var t = 0; t < tableLayer.textFrames.length; t++) {

            tableLayer.textFrames[t].locked = false;

            tableLayer.textFrames[t].hidden = false;

        }



        // ======================================================

        // Čišćenje starih vrednosti

        // ======================================================

        // Čišćenje u glavnom sloju
        for (var i = 0; i < tableLayer.textFrames.length; i++) {
            var tf = tableLayer.textFrames[i];
            if (/^\d{2}_(boja|procenat)$/.test(tf.name)) {
                tf.contents = "";
            }
        }

        // Čišćenje u grupama unutar sloja
        for (var g = 0; g < tableLayer.groupItems.length; g++) {
            var group = tableLayer.groupItems[g];
            for (var i = 0; i < group.textFrames.length; i++) {
                var tf = group.textFrames[i];
                if (/^\d{2}_(boja|procenat)$/.test(tf.name)) {
                    tf.contents = "";
                }
            }
        }



        function getTF(layer, name) {
            // Prvo proveri direktno u sloju
            for (var i = 0; i < layer.textFrames.length; i++) {
                if (layer.textFrames[i].name === name) {
                    return layer.textFrames[i];
                }
            }
            
            // Zatim proveri u svim grupama unutar sloja
            for (var g = 0; g < layer.groupItems.length; g++) {
                var group = layer.groupItems[g];
                for (var i = 0; i < group.textFrames.length; i++) {
                    if (group.textFrames[i].name === name) {
                        return group.textFrames[i];
                    }
                }
            }
            
            throw new Error("TextFrame nije pronađen: " + name);
        }



        // ======================================================

        // Upisivanje u tabelu

        // ======================================================

        for (var i = 0; i < results.length; i++) {

            var color = results[i];



            try {

                var tfColor = getTF(tableLayer, pad2(i + 1) + "_boja");

                var tfPerc  = getTF(tableLayer, pad2(i + 1) + "_procenat");



                tfColor.contents = normalizeColorName(color.name);

                tfPerc.contents  = (typeof color.coverage === "number")

                    ? color.coverage.toFixed(2).replace(".", ",")

                    : "";



            } catch (e) {

                // ako nema dovoljno TF-ova — preskoči

            }

        }



    } catch (err) {

        alert("Greška:\n" + err.message);

    }



})();

