import { SHOW_MODAL } from "./ActionsTypes";

const commonInitialState = {
    isModalOpen: false
}

export const commonReducer = (state = commonInitialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isModalOpen: true
            }
        default:
            return state;
    }
}