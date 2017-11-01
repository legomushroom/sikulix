import { IConfirmModalState } from 'components/confirm-modal/confirm-modal-reducer';

export const getModalState = (state): IConfirmModalState => {
  return state.confirmModal;
};
