import {Request} from "express";

export interface IAccessTokens{
    (id: number, login: string):string
}
export interface IRefreshTokens{
    (id: string):string
}
export interface IPayLoadToken{
    id: number,
    login: string
}
