import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { Link } from 'preact-router/match';
import { style } from 'decorators/style';
import { UsersList, IButton } from 'components/users-list/users-list';
import { IUsersList, IUserStatus } from 'reducers/users/users-interfaces';
import { getModalState } from 'components/confirm-modal/confirm-modal-selectors';
import { IConfirmModalState } from 'components/confirm-modal/confirm-modal-reducer';
import { closeModal } from 'components/confirm-modal/confirm-modal-actions';
import { Button } from 'components/button/button';

import styles from './confirm-modal.scss';

interface IConfirmModalCallbacks {
  onConfirm: (e) => void;
  closeModal: () => void;
};

@style(styles)
export class ConfirmModalComponent extends Component<IConfirmModalState & IConfirmModalCallbacks, {}> {

  private getEnding(users) {
    return users.length === 1 ? '' : 's';
  }

  private getArticle(users) {
    return users.length === 1 ? 'this' : 'these';
  }

  private onConfirm = (e) => {
    const { onConfirm, closeModal } = this.props;
    onConfirm(e);
    closeModal();
  }

  private getConfirmButtonClassName(actionName: string): string {
    switch (actionName) {
      case 'approve':
        return 'isGreen';
      case 'delete':
        return 'isRed';
      default:
        return '';
    }
  }

  render () {
    const { actionName, users, isOpen, onConfirm, closeModal } = this.props;

    return (
      <div className={`confirmModal ${ isOpen ? 'isOpen': '' }`}>
        <div className='body'>
          <span>Are you sure you want to <span className='highlight'>{actionName}</span> the next <span className='highlight'>{users.length}</span> user{this.getEnding(users)}?</span>
          
          <UsersList users={users} className='usersList' isPreview={true} />

          <div className='buttons'>
            <Button
              text='cancel'
              onClick={closeModal}
              />
            <Button
              text={actionName}
              className={`${this.getConfirmButtonClassName(actionName)} confirmButton`}
              onClick={this.onConfirm} />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props): IConfirmModalState => {
  return getModalState(state);
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    closeModal() {
      dispatch(closeModal());
    }
  };
};

export const ConfirmModal = connect(mapStateToProps, mapDispatchToProps)(ConfirmModalComponent);
