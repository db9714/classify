import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './css/Buttons.module.css';

const PlainButton = ({ className, title, ...rest }) => (
  <Button className={[styles.btnButton, className && className].join(' ')} {...rest}>
    {title}
  </Button>
);

const TitleIconButton = ({ className, title, icon, ...rest }) => (
  <Button className={[styles.btnButton, className && className].join(' ')} {...rest}>
    <div className={styles.titleIconDiv}>
      <span className={styles.txtTitle}>{title}</span>
      <i className={[styles.imgIcon, icon].join(' ')} />
    </div>
  </Button>
);

const OutlineButton = ({ className, title, ...rest }) => (
  <Button className={[styles.outlineBtn, className && className].join(' ')} {...rest} id="outlineBtn">
    <span className={styles.outlineBtnText}>{title}</span>
  </Button>
);

const CloseButton = ({ className, ...rest }) => (
  <img className={[styles.closeBtn, className && className].join(' ')} {...rest} src={require('./../assets/images/close_btn.png')} alt="logo" />
);

export { PlainButton, TitleIconButton, OutlineButton, CloseButton };
