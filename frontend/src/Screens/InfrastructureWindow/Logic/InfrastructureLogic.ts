import { InfrastructureObject } from './Interfaces';

export const getInfrastructure = async () => {
    const objects: InfrastructureObject[] = [];

    //GET http

    return {
        error: 0,
        message: 'get infrastructure',
        value: objects,
    };
};

export const addInfrastructure = async () => {
    //POST http

    const newObj = {};

    return {
        error: 0,
        message: 'add infrastructure',
        value: newObj,
    };
};

export const editInfrastructure = async () => {
    //PUT http

    const newObj = {};

    return {
        error: 0,
        message: 'edit infrastructure',
        value: newObj,
    };
};

export const deleteInfrastructure = async () => {
    //DELETE http

    return {
        error: 0,
        message: 'delete infrastructure',
        value: null,
    };
};
