export function loadData() {
    let json = require('./TestFiles/doc.json');
    return json;
}

export function checkUploadedFile(data) {
    let schema = require('./TestFiles/schema.json');
    let Ajv2019 = require("ajv/dist/2019");

    let ajv = new Ajv2019();
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
    let validate = ajv.compile(schema);

    let valid = validate(data);
    if (!valid)
        console.log(ajv.errors);
    else
        console.log('succes');
    return valid;
}


