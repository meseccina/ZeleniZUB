#target illustrator



(function () {

    try {



        if (app.documents.length === 0) {

            alert("Nijedan dokument nije otvoren.");

            return;

        }



        // --- Provera pre početka ---

        var potvrda = confirm(

            "POKRENUTI PROCES ZA PROCENTE?"

        );



        if (!potvrda) {

            alert("Skripta je prekinuta.");

            return;

        }



        // --- Putanje ---

        var basePath = "C:/Users/Zeka24/Desktop/Script_AI/POMOCNI/PROCENTI/";

        var skripta0 = new File(basePath + "!0 postavka_layera.jsx");

        var skripta1 = new File(basePath + "00_NORMAL_ESKO_Pdf.jsx");

        var skripta2 = new File(basePath + "00_auto_procenti_optimized.jsx"); // Nova optimizovana verzija



        function runScript(scriptFile, delayAfterMs) {

            if (!scriptFile.exists) {

                throw new Error("Skripta ne postoji:\n" + scriptFile.fsName);

            }

            $.evalFile(scriptFile);

            if (delayAfterMs > 0) {

                $.sleep(delayAfterMs);

            }

        }



        // --- Automatski deo ---

        runScript(skripta0, 1000); // postavka layera

        runScript(skripta1, 2000); // normalizacija ESKO PDF



        // --- PITANJE ZA DRUGU SKRIPTU ---

        var pokreniDrugu = confirm(

            "UPISATI PROCENTE U TABELU? (Optimizovana verzija)"

        );



        if (pokreniDrugu) {

            runScript(skripta2, 1000);

        } else {

            alert("Skripta za ispisivanje je preskočena.");

        }



    } catch (e) {

        alert("Greška:\n" + e.message);

    }

})();

