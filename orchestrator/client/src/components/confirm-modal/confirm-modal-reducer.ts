
import { getConfirmationFor, IOpenModal, closeModal } from 'components/confirm-modal/confirm-modal-actions';
import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';

export interface IConfirmModalState {
  isOpen: boolean;
  users: IUsersList;
  actionName: string;
  onConfirm: () => void;
};

const initialState: IConfirmModalState = {
  isOpen: false,
  users: [],
  actionName: undefined,
  onConfirm: () => {}
};

const openDialog = (openData: IOpenModal, state: IConfirmModalState = initialState): IConfirmModalState => {
  return {
    ...state,
    isOpen: true,
    ...openData
  }
};

const closeDialog = (state: IConfirmModalState = initialState): IConfirmModalState => {
  return initialState;
};

export const confirmModalReducer = (state: IConfirmModalState = initialState, action) => {
  switch (action.type) {
    case getConfirmationFor.type:
      return openDialog(getConfirmationFor.unwrap(action), state);
    case closeModal.type:
      return closeDialog(state);
    default:
      return state;
  }
};