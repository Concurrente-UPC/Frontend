const commonSymptoms = [
    "Fiebre",
    "Cansancio",
    "Tos seca",
    "Dificultad respiratoria",
    "Dolor de garganta"
]

const otherSymptoms = [
    "Dolores",
    "Congestion nasal",
    "Secreción nasal",
    "Diarrea"
]

function fillSymptoms() {
    const cmn = document.getElementById("common-symptoms");

    for (let symptom in commonSymptoms) {
        let t = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="symptom-${symptom}">
            <label class="form-check-label" for="symptom-${symptom}">Symptom 1</label>
        </div>`

    }
}
