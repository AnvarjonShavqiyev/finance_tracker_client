import { EMPTY_STRING } from "@constants";
import { ACTIONS } from "@customTypes";

export const getSubmitButtonText = (type?: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return 'Create'
        case ACTIONS.EDIT: 
            return 'Edit'
        case ACTIONS.DELETE:
            return 'Delete'
        default:
            return EMPTY_STRING;
    }
}