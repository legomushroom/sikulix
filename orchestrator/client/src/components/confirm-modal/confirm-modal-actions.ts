import { createActionCreator, createSimpleActionCreator } from 'reducers/action-creators';
import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';

export interface IOpenModal {
  users: IUsersList;
  actionName: string;
  onConfirm: () => void;
};

export const getConfirmationFor = createActionCreator<IOpenModal>('confirm.modal.open.modal');

export const closeModal = createSimpleActionCreator('confirm.modal.close.modal');
