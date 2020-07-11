import { SHOW_MODAL } from "./ActionsTypes";

export const showModal = (modalState) => {
    return {
        type: SHOW_MODAL,
        data: modalState
    }
}

export const changeModalState = () => {
    return dispatch => {
        dispatch(showModal(true));
    }
}