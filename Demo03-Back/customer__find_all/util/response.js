const _ = require('lodash');
const ResponseHttp = require('http-response-object');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true, jsonPointers: true});
// Ajv options allErrors and jsonPointers are required
require('ajv-errors')(ajv /*, {singleError: true} */);


module.exports = {
    getValuesForSp: (_data, _values) => {
        return getValuesForSp(_data, _values);
    },
    validateRequest: (_data, _rules) => {
        return validateRequest(_data, _rules);
    },
    responseSuccess: (_data, _message, _status, _headers) => {
        return responseSuccess(_data, _message, _status, _headers);
    },
    responseError: (_data, _message, _status, _headers) => {
        return responseError(_data, _message, _status, _headers);
    },
};

const getValuesForSp = (_data, _values) => {

    let array = [];

    _.forEach(_values, (value) => {
        array.push(_data[value]);
    });

    return array;
};

const validateRequest = (_request, _schema) => {

    const validate = ajv.compile(_schema);

    let request_body = convertStringToJson(_request.body);

    let request_param = _request.queryStringParameters;

    let request_path = _request.pathParameters;

    let request = {};

    request['data'] = _.merge(request_param, request_body);

    request['data'] = _.merge(request['data'], request_path);

    request['valid'] = validate(request['data']);

    request['errors'] = validate.errors;

    return request;
};

const convertStringToJson = (string) => {
    if (_.isNil(string))
        return {};

    return JSON.parse(string);
};

const convertJsonToString = (json) => {
    if (_.isNil(json))
        return "";

    return JSON.stringify(json);
};

const response = (_data, _message, _status, _headers, _errors) => {

    let headers = _.merge(_headers, {'Access-Control-Allow-Origin': '*'});

    let status = _status || 200;

    let errors = _errors || false;

    let key_data = !errors ? 'data' : 'errors';

    let data;

    if (_.isNull(_data)) {
        data = null;
    } else {
        data = {[key_data]: _data};
    }

    if (!_.isNull(_message)) {
        data = _.merge(data, {message: _message});
    }

    return new ResponseHttp(status, headers, convertJsonToString(data));
};

const responseSuccess = (_data, _message, _status, _headers) => {
    return response(_data, _message, _status, _headers);
};

const responseError = (_data, _message, _status, _headers) => {

    if (_.isNil(_data))
        return response(null, _message, _status, _headers);

    return response(_data, _message, _status, _headers, true);
};
