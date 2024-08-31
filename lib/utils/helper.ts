import { DynamicObjectTypes } from "@/backend/types/baseTypes";
import { clsx, type ClassValue } from "clsx";
import Swal, { SweetAlertIcon } from "sweetalert2";
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

export const message = (props: any) => Swal.fire(props);

export const promptMessage = (
    cb = () => {},
    alert: boolean = true,
    title: string = "Are you sure?",
    text: string = "Do you want to continue?",
    icon: SweetAlertIcon = "question",
    btnText: string = "Yes, Delete it"
) => {
    if (alert) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: btnText,
            showCancelButton: true,
            focusCancel: true,
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                cb();
            }
            return false;
        });
    } else {
        cb();
    }
};

export const selectGenerator = (
    options: { [key: string]: string }[] = [],
    labelKey = "title",
    valueKey = "value"
) => {
    if (!options.length) {
        return [];
    }
    return options.map((item) => ({
        label: item[labelKey],
        value: item[valueKey].toString(),
    }));
};
