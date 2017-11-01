import { h, Component } from 'preact';
import relativeDate from 'relative-date';
import { connect } from 'preact-redux';
import { style } from 'decorators/style';
import { Button } from 'components/button/button';
import { Icon } from 'components/icon/icon';
import { IUser, ISelectedUsers } from 'reducers/users/users-interfaces';
import { toggleUser } from 'reducers/users/users-actions';
import { IButton } from 'components/users-list/users-list';
import { getNewStatuses } from 'reducers/users/users-selectors';

import styles from './user-row.scss';

interface IUserRowProps {
  user: IUser;
  selectedUsers: ISelectedUsers;
  animationDelay?: number;
  buttons: IButton[];
  isPreview?: boolean;
  newStatuses?: { [key: string]: string; };
};

interface IUserRowCallbacks {
  toggleSelection: () => void;
};

@style(styles)
export class UserRowComponent extends Component<IUserRowProps & IUserRowCallbacks, {}> {
  private mainEl;

  private renderButtons = () => {
    const { buttons, user, isPreview } = this.props;

    if (!buttons) { return undefined; }

    return buttons.map((button, i) => {
      return (
        <Button
          onClick={(e) => { button.onClick({ [user.id]: true }, e); } }
          className={`${button.className} button`}
          text={button.text} />
      );
    });
  }

  private getIconShape = (user: IUser): string => {
    const { initialProvider } = user;

    return (initialProvider.toLowerCase() === 'github') ? 'github' : 'microsoft';
  }

  private formatDate(date) {
    return `${(new Date(date)).toLocaleDateString()} (${relativeDate(date)})`;
  }

  private onClick = (e) => {
    const { isPreview, toggleSelection } = this.props;
    if (isPreview || this.isDifferentStatus()) {
      return;
    }
    
    const element = e.target;
    const parent = element.parentNode;
    if (element.tagName.toLowerCase() === 'a' || (parent && parent.tagName.toLowerCase() === 'a')) {
      e.stopPropagation();
      return;
    }
    
    toggleSelection();
  }

  private onExpandToggle = (e) => {
    e.stopPropagation();
    
    this.mainEl.classList.toggle(styles.isExpanded);
  }

  private isDifferentStatus() {
    const { user, newStatuses } = this.props;
    const { status } = user;
    const newStatus = newStatuses[user.id];

    return !!((status !== newStatus) && newStatus);
  }

  render () {
    const { user, selectedUsers, animationDelay, isPreview } = this.props;
    const { status, initialProvider } = user;
    
    const provider = user.providers[initialProvider];
    const email = provider.emails && provider.emails[0] && provider.emails[0].value;
    const photo = provider.photos && provider.photos[0] && provider.photos[0].value;
    const name = provider.displayName || provider.username;

    const previewClass = isPreview ? 'isPreview' : '';
    
    const isDifferentStatus = this.isDifferentStatus();
    const loadingClass = (isDifferentStatus) ? 'isLoading' : '';

    return (
      <div
        className={`userRow ${previewClass} ${loadingClass}`}
        style={{ animationDelay: `${animationDelay || 0}ms` }}
        ref={(el) => { this.mainEl = el; }}
        onClick={this.onClick}>
          <div className="overlay" />
          <div className='main'>
            <div className='expandButton' onClick={this.onExpandToggle}>
              <Icon shape='expand' className='expandIcon' />
            </div>
            <div className='checkboxPlace'>
              <input className='checkbox' type="checkbox" checked={selectedUsers[user.id] || isDifferentStatus} />
            </div>
            <div className='avatarPlace'>
              <div className='userpic' style={{ backgroundImage: `url(${photo})` }} />
            </div>
            <div className='textPlace'>
              <div className='name' title={name}><a href={provider.profileUrl}><Icon shape={this.getIconShape(user)} className='originIcon' /></a> {name}</div>
              <a href={`mailto:${email}`} className='email' title={email}>{email}</a>
              <p className='requestedDate'>{this.formatDate(user.signupTime)}</p>
            </div>
            <div className='buttonsPlace'>{this.renderButtons()}</div>
          </div>
          <div className='details'>
            user details
          </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  const newStatuses = getNewStatuses(state);

  return { newStatuses };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleSelection() {
      dispatch(toggleUser(props.user.id))
    }
  }
};

export const UserRow = connect(mapStateToProps, mapDispatchToProps)(UserRowComponent);
