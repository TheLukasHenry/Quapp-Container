/* tslint:disable */
/* eslint-disable */
/**
 * ServerC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateTestCaseInput
 */
export interface CreateTestCaseInput {
    /**
     * 
     * @type {number}
     * @memberof CreateTestCaseInput
     */
    featureId?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateTestCaseInput
     */
    name?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CreateTestCaseInput
     */
    sortOrder?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CreateTestCaseInput
     */
    parentId?: number | null;
}

/**
 * Check if a given object implements the CreateTestCaseInput interface.
 */
export function instanceOfCreateTestCaseInput(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateTestCaseInputFromJSON(json: any): CreateTestCaseInput {
    return CreateTestCaseInputFromJSONTyped(json, false);
}

export function CreateTestCaseInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTestCaseInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'featureId': !exists(json, 'featureId') ? undefined : json['featureId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'sortOrder': !exists(json, 'sortOrder') ? undefined : json['sortOrder'],
        'parentId': !exists(json, 'parentId') ? undefined : json['parentId'],
    };
}

export function CreateTestCaseInputToJSON(value?: CreateTestCaseInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'featureId': value.featureId,
        'name': value.name,
        'sortOrder': value.sortOrder,
        'parentId': value.parentId,
    };
}
