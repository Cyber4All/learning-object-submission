import { Router } from "express";
import { Controller } from "../../../interfaces/Controller";

export class ObjectsController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here

        return router;
    }
}