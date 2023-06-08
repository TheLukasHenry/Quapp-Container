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


import * as runtime from '../runtime';
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from '../models';
import {
    CreateUserInputFromJSON,
    CreateUserInputToJSON,
    UpdateUserInputFromJSON,
    UpdateUserInputToJSON,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface UsersEmailEmailGetRequest {
    email: string;
}

export interface UsersIdDeleteRequest {
    id: number;
}

export interface UsersIdGetRequest {
    id: number;
}

export interface UsersPostRequest {
    createUserInput?: CreateUserInput;
}

export interface UsersPutRequest {
    updateUserInput?: UpdateUserInput;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     */
    async usersEmailEmailGetRaw(requestParameters: UsersEmailEmailGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.email === null || requestParameters.email === undefined) {
            throw new runtime.RequiredError('email','Required parameter requestParameters.email was null or undefined when calling usersEmailEmailGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/email/{email}`.replace(`{${"email"}}`, encodeURIComponent(String(requestParameters.email))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersEmailEmailGet(requestParameters: UsersEmailEmailGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersEmailEmailGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     */
    async usersGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.usersGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async usersIdDeleteRaw(requestParameters: UsersIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling usersIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async usersIdDelete(requestParameters: UsersIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.usersIdDeleteRaw(requestParameters, initOverrides);
    }

    /**
     */
    async usersIdGetRaw(requestParameters: UsersIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling usersIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersIdGet(requestParameters: UsersIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersPostRaw(requestParameters: UsersPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserInputToJSON(requestParameters.createUserInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersPost(requestParameters: UsersPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async usersPutRaw(requestParameters: UsersPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Users`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserInputToJSON(requestParameters.updateUserInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async usersPut(requestParameters: UsersPutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
