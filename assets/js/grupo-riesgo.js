function fillSymptoms(diseases) {
    let disease = "";
    for (let i in diseases) {
        let tmp = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="symptom-${i}">
            <label class="form-check-label" for="symptom-${i}">${diseases[i]}</label>
        </div>`;
        disease += tmp;
    }

    document.getElementById("diseases").innerHTML = disease;
}

const diseases = {
    insuf_resp: "Insuficiencias respiratorias",
    neumonia: "Neumonia",
    hipertension: "Hipertension",
    asma: "Asma",
    obesidad: "Obesidad",
    diabetes:"Diabetes",
    enf_cardiacas:"Enfermedades cardiacas"
}


fillSymptoms(diseases);
