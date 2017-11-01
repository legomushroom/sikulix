import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { style } from 'decorators/style';
import { UserRow } from 'components/user-row/user-row';
import { BulkButtons } from 'components/bulk-buttons/bulk-buttons';
import { IUsersList, ISelectedUsers } from 'reducers/users/users-interfaces';
import { getSelectedUsers } from 'reducers/users/users-selectors';

import styles from './users-list.scss';

export interface IButton {
  text: string;
  className: string;
  onClick: (IUsersList, e) => void;
};

interface IUsersListProps {
  path?: string;
  users: IUsersList;
  selectedUsers?: ISelectedUsers;
  buttons?: IButton[];
  className?: string;
  isPreview?: boolean;
};

interface IUsersListCallbacks {
  onSelectAllClick?: (e) => void;
};

@style(styles)
export class UsersListComponent extends Component<IUsersListProps & IUsersListCallbacks, {}> {
  private renderUsers() {
    const { users, selectedUsers, buttons, isPreview } = this.props;
    const selectedIds = {};
    
    const renderedUsers = (users.length > 0)
      ? users.map((user, i) => {
          if (selectedUsers[user.id] === true) {
            selectedIds[user.id] = true;
          }

          return (
            <UserRow
              user={user}
              selectedUsers={selectedUsers}
              animationDelay={35*i}
              buttons={buttons}
              isPreview={isPreview}
            />
          );
        })
      : (<div className='emptyLabel'>The list is empty.</div>);

    return [ selectedIds, renderedUsers ];
  }

  private renderBulkButtons(selectedIds) {
    const { users, onSelectAllClick, buttons } = this.props;
    
    return (buttons && buttons.length)
      ? <BulkButtons
          selectedIds={selectedIds}
          users={users}
          buttons={buttons}
          onTickClick={onSelectAllClick} />
      : undefined;
  }
  
  public render () {
    const { users, selectedUsers, onSelectAllClick, buttons, className } = this.props;
    const [ selectedIds, renderedUsers ] = this.renderUsers();

    return (
      <div className={`usersList ${className || ''}`}>
        { this.renderBulkButtons(selectedIds) }
        <div> {renderedUsers} </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { selectedUsers: getSelectedUsers(state) };
};

export const UsersList = connect(mapStateToProps)(UsersListComponent);
