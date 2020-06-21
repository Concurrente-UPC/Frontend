function fillSymptoms(commonSymptoms, otherSymptoms) {
    let common = "";
    let others = "";
    for (let i in commonSymptoms) {
        let tmp = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="symptom-${i}">
            <label class="form-check-label" for="symptom-${i}">${commonSymptoms[i]}</label>
        </div>`;
        common += tmp;
    }
    for (let i in otherSymptoms) {
        let tmp = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="symptom-${i}">
            <label class="form-check-label" for="symptom-${i}">${otherSymptoms[i]}</label>
        </div>`;
        others += tmp;
    }

    document.getElementById("common-symptoms").innerHTML = common;
    document.getElementById("other-symptoms").innerHTML = others;
}

const commonSymptoms = {
    fever: "Fiebre",
    tiredness: "Cansancio",
    dry_cough: "Tos seca",
    difficulty_in_breathing: "Dificultad respiratoria",
    sore_throat: "Dolor de garganta"
}

const otherSymptoms = {
    pains: "Dolores",
    nasal_congestion: "Congestion nasal",
    runny_nose: "Secreción nasal",
    diarrhea: "Diarrea"
}

fillSymptoms(commonSymptoms,otherSymptoms);
