import { Router } from "express";
import { Controller } from "../../interfaces/Controller";

export class GuidelineServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here

        return router;
    }
}