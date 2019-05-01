import {responseSuccess, responseError, getValuesForSp, validateRequest} from '../util/response.js'

const mysql = require('mysql');

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
};

const RULES = {
    type: 'object',
    additionalProperties: false,
    properties: {
    },
    required: [ ]
};

const SP_MYSQL = 'CALL customer__find_all ()';

const SP_MYSQL_VALUES = [
];

export const handler = (event, context, callback) => {

    console.log('Inicio de Lambda');

    console.log('Event: ');
    console.log(event);

    console.log('Variables de entorno');
    console.log(config);

    let request =  validateRequest(event, RULES);

    console.log('Request Data: ');
    console.log(request.data);

    console.log('Request Valid: ');
    console.log(request.valid);

    if (!request.valid){
        console.log('Request Errors: ');
        console.log(request.errors);
        callback(null, responseError(request.errors, 'Error en request', 400));
        return;
    }

    let connection = mysql.createConnection(config);

    connection.connect(function (err) {
        if (err) {
            console.log('Error connection');
            console.log(err);
            callback(null, responseError(null, 'Error Conexion a la Base de datos', 500));
            return;
        }

        let values = getValuesForSp(request.data, SP_MYSQL_VALUES);

        connection.query(SP_MYSQL, values, function (error, results) {
            connection.end();
            if (error) {
                console.log('Error query');
                console.log(error);
                callback(null, responseError(null, 'Error en la transaccion', 400));
                return;
            }

            console.log('Response StoreProcedure: ');
            console.log(results);
            callback(null, responseSuccess(results[0], 'Procesado correctamente', 200));
        });
    });
};
