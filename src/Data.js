export function loadData() {
    let json = require('./TestFiles/doc.json');
    return json;
}
let schema = require('./TestFiles/schema.json');

export function checkUploadedFile(data) {
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const valid = ajv.validate(schema, data);
    if (!valid)
        console.log(ajv.errors);
    else
        console.log('succes');
    return valid;
}


