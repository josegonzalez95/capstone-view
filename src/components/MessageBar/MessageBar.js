import React from 'react';
import { Message } from 'semantic-ui-react';
import styles from './MessageBar.module.css';

const MessageBar = ({ message }) => {
	return (
		<Message
			positive={true}
			className={styles.container}>
			<Message.Header>{message}</Message.Header>
			{/* <p>That offer has expired</p> */}
		</Message>
	);
};

export default MessageBar;
