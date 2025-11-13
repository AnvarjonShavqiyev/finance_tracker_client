import { ACTIONS, BudgetForm } from "@customTypes";
import { EMPTY_STRING } from "@constants";

export const getBudgetTitle = (type?: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return 'Create budget'
        case ACTIONS.EDIT: 
            return 'Edit budget'
        case ACTIONS.DELETE:
            return 'Are you sure about deleting this budget?'
        default:
            return EMPTY_STRING;
    }
}

export const getBudgetBody = (data: BudgetForm) => {
    return {
        ...data,
        limit: +data.limit,
    }
}