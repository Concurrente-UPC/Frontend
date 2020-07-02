const VALIDATION_ERROR = "ABORTED_OPERATION: VALIDATION_ERROR";

const common_symptoms = [
    "fever",
    "tiredness",
    "dry_cough",
    "difficulty_in_breathing",
    "sore_throat"
];

const other_symptoms = [
    "pains",
    "nasal_congestion",
    "runny_nose",
    "diarrhea"
];

const ageIntervals = [
    { min: 0, max: 9, name: "edad_0_9" },
    { min: 10, max: 19, name: "edad_10_19" },
    { min: 20, max: 24, name: "edad_20_24" },
    { min: 25, max: 59, name: "edad_25_59" },
    { min: 60, max: 120, name: "edad_60_more" },
]

function getRequestObjectInstance() {
    return {
        fever: 0,
        tiredness: 0,
        dry_cough: 0,
        difficulty_in_breathing: 0,
        sore_throat: 0,
        no_sintomas: 0,
        pains: 0,
        nasal_congestion: 0,
        runny_nose: 0,
        diarrhea: 0,
        no_other_sintomas: 0,
        edad_0_9: 0,
        edad_10_19: 0,
        edad_20_24: 0,
        edad_25_59: 0,
        edad_60_more: 0,
        female: 0,
        male: 0,
        contact_dk: 0,
        contact_no: 0,
        contact_yes: 0
    }
}

const ageInp = document.getElementById(`age-input`);
const sexInp = document.getElementById(`sex-input`);
const contactInp = document.getElementById(`contact-input`);

function parseSymptomData(name) {
    const symptomInp = document.getElementById(`symptom-${name}`);
    if (symptomInp == null)
        return -1;
    return symptomInp.checked ? 1 : 0;
}

function parseAgeData() {
    const val = ageInp.value;
    if (val < 0 || val > 120){
        ageInp.classList.add("is-invalid");
        throw VALIDATION_ERROR;
    }
    return val;
}

function parseSexData() {
    const val = sexInp.value;
    if (val === ""){
        sexInp.classList.add("is-invalid");
        throw VALIDATION_ERROR;
    }
    return val;
}

function parseContactData() {
    const val = contactInp.value;
    if (val === ""){
        contactInp.classList.add("is-invalid");
        throw VALIDATION_ERROR;
    }
    return val;
}

function clearValidation() {
    const validatedInputs = [ageInp, sexInp, contactInp];
    for (let input of validatedInputs) {
        input.classList.remove("is-invalid");
    }
}

function prepareData() {
    let obj = getRequestObjectInstance();

    //sex
    const sex = parseSexData();
    switch (sex) {
        case "1":
            obj.male = 1;
            break;
        case "2":
            obj.female = 1;
            break;
    }

    //age
    const age = parseAgeData();
    for (let a of ageIntervals) {
        if (age >= a.min && age <= a.max)
            obj[a.name] = 1;
    }

    //contact
    const contact = parseContactData();
    switch (contact) {
        case "1":
            obj.contact_yes = 1;
            break;
        case "2":
            obj.contact_no = 1;
            break;
        case "3":
            obj.contact_dk = 1;
            break;
    }

    //common symptoms
    let noCommonSymptoms = 1;
    for (let s of common_symptoms) {
        let value = parseSymptomData(s);
        if (value === 1)
            noCommonSymptoms = 0;
        obj[s] = value;
    }
    obj.no_sintomas = noCommonSymptoms;

    //other symptoms
    let noOtherSymptoms = 1;
    for (let s of other_symptoms) {
        let value = parseSymptomData(s);
        if (value === 1)
            noOtherSymptoms = 0;
        obj[s] = value;
    }
    obj.no_other_sintomas = noOtherSymptoms;

    return JSON.stringify(obj, null, 4);
}

function makeRequest() {
    clearValidation();
    const requestObj = prepareData();
    const url = 'http://localhost:3000/KNN_deteccion';

    const init = {
        method: 'POST',
        body: requestObj,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, init).then(res => res.json())
        .catch(err => {
            console.error('Error:', err);
        })
        .then(res => {
            updateResult(res.result);
        });
}

function updateResult(result) {
    let detail, color;
    if (result === 1) {
        detail = "POSITIVO";
        color = "alert-danger";
    } else {
        detail = "NEGATIVO";
        color = "alert-primary";
    }

    document.getElementById("results-detail").innerHTML = `<div class="alert ${color}" role="alert">
        El resultado es: ${detail}
    </div>`;
}
