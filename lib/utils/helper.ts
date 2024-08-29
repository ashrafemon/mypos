import { DynamicObjectTypes } from "@/backend/types/baseTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const validateError = (data: { [key: string]: string | string[] }) => {
    const validate: DynamicObjectTypes = {};
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            validate[key] = { text: data[key][0], show: true };
        } else {
            validate[key] = { text: data[key], show: true };
        }
    });
    return validate;
};
