import { h, Component } from 'preact';
import { Button } from 'components/button/button';
import { style } from 'decorators/style';
import { IUsersList } from 'reducers/users/users-interfaces';
import { IButton } from 'components/users-list/users-list';

import styles from './bulk-buttons.scss';

interface IBulkButtonsProps {
  selectedIds: { [key: string]: boolean };
  users: IUsersList;
  buttons: IButton[];
};

interface IBulkButtonsCallbacks {
  onTickClick: (e) => void;
};

@style(styles)
export class BulkButtons extends Component<IBulkButtonsProps & IBulkButtonsCallbacks, {}> {
  private renderButtons = () => {
    const { buttons, selectedIds } = this.props;
    const selectedUsersCount = Object.keys(selectedIds).length;

    return buttons.map((button, i) => {
      return (
        <Button
          onClick={(e) => { button.onClick(selectedIds, e); } }
          isDisabled={selectedUsersCount === 0}
          className={`${button.className} bulkButton`}
          text={`${button.text} selected (${selectedUsersCount})`} />
      );
    });
  }

  render () {
    const { selectedIds, users } = this.props;
    const selectedUsersCount = Object.keys(selectedIds).length;

    const isChecked = (users.length === selectedUsersCount);
    const isCheckboxVisible = users.length > 0;

    return (
      <div className='bulkButtons'>
        <div className='checkbox' title='select all'>
          <input
            type="checkbox"
            onChange={this.props.onTickClick}
            checked={isChecked && isCheckboxVisible}
            disabled={!isCheckboxVisible} />
        </div>
        <div className='buttons'>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
};