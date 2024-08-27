import vine, { errors } from "@vinejs/vine";
import { DynamicObjectTypes } from "../types/baseTypes";

type MessageType = {
    message: string;
    rule: string;
    field: string;
};

export default class ValidateService {
    private opStatus: boolean = false;
    private messages: DynamicObjectTypes = {};
    private data: any = {};

    constructor(
        private readonly rules: any,
        private readonly values: DynamicObjectTypes
    ) {}

    async validate() {
        try {
            const validator = vine.compile(vine.object(this.rules));
            this.data = await validator.validate(this.values);
            this.opStatus = false;
            return this;
        } catch (err) {
            if (err instanceof errors.E_VALIDATION_ERROR) {
                this.formatter(err.messages);
                this.opStatus = true;
                return this;
            }
        }
    }

    formatter(values: MessageType[]) {
        const payload: DynamicObjectTypes = {};
        values.forEach((item: MessageType) => {
            payload[item.field] = item.message;
        });
        this.messages = { ...payload };
    }

    fails() {
        return this.opStatus;
    }

    errors() {
        return this.messages;
    }

    validated() {
        return this.data;
    }
}
