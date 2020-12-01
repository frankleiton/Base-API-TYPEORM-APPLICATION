import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Usuario } from "../entity/User";

import config from "../config/config";
import * as jwt from "jsonwebtoken";

export class UserController {

    private userRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        return {users: await this.userRepository.find() } 
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const user = this.userRepository.findOne(request.params.id);
            response.json(user)
        } catch (error) {
            response.json({erro: "Não foi possível encontrar o usuário.", error}).status(400);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.save(request.body);
            response.redirect("/");
        } catch (error) {
            response.json({erro: "Não foi possível cadastrar o usuário.", error}).status(400);
        }        
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOne(request.params.id);
            if(!user) {
                response.json({error: "Usuário não encontrado!"}).status(400);
            }
            const update = await this.userRepository.update(user.id, request.body)
            response.json(update)
        } catch (error) {
            response.json({erro: "Não foi possível atualizar o usuário.", error}).status(400);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOne(request.params.id);
            if(!user) {
                response.json({error: "Usuário não encontrado!"}).status(400);
            }
            const remove = await this.userRepository.remove(user);
            response.json(remove)
        } catch (error) {
            response.json({erro: "Não foi possível remover o usuário.", error}).status(400);
        }
    }

    async login(request: Request, response: Response) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: request.body.email
                }
            })
            if(!user) {
                response.json({error: "Usuário não encontrado!"}).status(400);
            }

            if(user.password == request.body.password) {
                const token = jwt.sign(
                    { id: user.id, user_email: user.email, },
                    config.jwtSecret,
                    { expiresIn: "12h" }
                    );

                    response.redirect("/feed");
                    return { "Logged": true, token }
                } else {
                    return { error: "login_fail" };
                }
        } catch (error){
            response.json({erro: "Não foi possível realizar o login."}).status(400);
        }

    }

}
