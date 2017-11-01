import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router/match';
import { style } from 'decorators/style';
import { IUserStatus } from 'reducers/users/users-interfaces';
import { getUsers } from 'reducers/users/users-selectors';

import styles from './navigation.scss';

interface INavigationProps {
  pendingCount: number;
  acceptedCount: number;
  // temporary commented out in case we need to return the `Deleted` users page
  // deletedCount: number;
};

@style(styles)
export class NavigationComponent extends Component<INavigationProps, {}> {
  render () {
    const { pendingCount, acceptedCount } = this.props;

    return (
      <div className={`navigation`}>
        <Link activeClassName={styles.activeLink} className='link' href='/'>Pending <span className='countTitle'>({pendingCount})</span></Link>
        <Link activeClassName={styles.activeLink} className='link' href='/accepted-users'>Approved <span className='countTitle'>({acceptedCount})</span></Link>
      </div>
    );
  }
};

const mapStateToProps = (state, props): INavigationProps => {
  const pendingUsers = getUsers(state, IUserStatus.Pending);
  const acceptedUsers = getUsers(state, IUserStatus.Accepted);
  // temporary commented out in case we need to return the `Deleted` users page
  // const deletedUsers = getUsers(state, IUserStatus.Deleted);

  return {
    pendingCount: pendingUsers.length,
    acceptedCount: acceptedUsers.length
    // temporary commented out in case we need to return the `Deleted` users page
    // deletedCount: deletedUsers.length
  };
};

export const Navigation = connect(mapStateToProps)(NavigationComponent);
