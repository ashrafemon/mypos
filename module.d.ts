import { NextRequest } from "next/server";

declare module "Validator";

declare module "next/server" {
    interface NextRequest {
        auth?: string;
    }
}
