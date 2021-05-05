import { Router } from "express";

export interface Controller {
    buildRouter(): Router;
}