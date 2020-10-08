import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './css/TextInput.module.css';

const TextInput = (props) => <Form.Control className={styles.txtInput} {...props} />;

export { TextInput };
