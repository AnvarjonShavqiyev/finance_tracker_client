import { ACTIONS } from "@customTypes";
import { EMPTY_STRING } from "@constants";

export const getCategoryTitle = (type?: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return 'Create category'
        case ACTIONS.EDIT: 
            return 'Edit category'
        case ACTIONS.DELETE:
            return 'Are you sure about deleting this category?'
        default:
            return EMPTY_STRING;
    }
}