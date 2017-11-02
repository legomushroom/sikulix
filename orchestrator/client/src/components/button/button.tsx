import { h, Component } from 'preact';
import { style } from 'decorators/style';

import styles from './button.scss';

interface IButtonProps {
  text?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e) => void;
};

@style(styles)
export class Button extends Component<IButtonProps, {}> {
  render () {
    const { text, className, onClick, isDisabled } = this.props;
    const isDisabledClass = isDisabled ? 'isDisabled' : '';
    const onClickCallback = isDisabled ? undefined : onClick;
    
    return (
      <button className={`button ${className} ${isDisabledClass}`} onClick={onClickCallback}>
        <span className='text'>{text}</span>
      </button>
    );
  }
};