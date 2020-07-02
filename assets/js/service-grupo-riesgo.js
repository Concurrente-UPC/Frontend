const VALIDATION_ERROR = "ABORTED_OPERATION: VALIDATION_ERROR";

const common_symptoms = [
    "fever",
    "tiredness",
    "dry_cough",
    "difficulty_in_breathing",
    "sore_throat"
];
const diseases_ = [
    "insuf_resp",
    "neumonia",
    "hipertension",
    "asma",
    "obesidad",
    "diabetes",
    "enf_cardiacas"
]


function getRequestObjectInstance() {
    return {
        sexo:0,
        edad:0,
        insuf_resp: 0,
        neumonia: 0,
        hipertension: 0,
        asma: 0,
        obesidad: 0,
        diabetes:0,
        enf_cardiacas:0
    }
}

const ageInp = document.getElementById(`age-input`);
const sexInp = document.getElementById(`sex-input`);


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


function clearValidation() {
    const validatedInputs = [ageInp, sexInp];
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
            obj.sexo = 1;
            break;
        case "2":
            obj.sexo = 0;
            break;
    }

    //age
    const age = parseAgeData();
    obj.edad = age

    //diseases
    for (let s of diseases_) {
        obj[s] = parseSymptomData(s);
    }

    return JSON.stringify(obj, null, 4);
}

function makeRequest() {
    clearValidation();
    const requestObj = prepareData();
    console.log(requestObj)
    const url = 'http://localhost:3000/KNN_gruporiesgo';

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
            console.log(res)
            updateResult(res.result);
        });
}

function updateResult(result) {
    let detail, color;
    if (result === 1) {
        detail = "PERTENECES AL GRUPO DE RIESGO";
        color = "alert-danger";
    } else {
        detail = "NO PERTENECES AL GRUPO DE RIESGO";
        color = "alert-primary";
    }

    document.getElementById("results-detail").innerHTML = `<div class="alert ${color}" role="alert">
        El resultado es: ${detail}
    </div>`;
}
