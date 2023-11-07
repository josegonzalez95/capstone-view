import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<footer>
				<div className={styles.footerTextContainer}>
					<span className={styles.footerText}>
						<a
							style={{ color: 'white' }}
							href='https://www.purcycling.com/_files/ugd/4d62fb_18b94b145fde4a9caf64375f33b9ef51.pdf'>
							Refund Policy
						</a>{' '}
					</span>
					&nbsp;|
					<span className={styles.footerText}>
						<a
							style={{ color: 'white' }}
							href='https://www.purcycling.com/_files/ugd/4d62fb_ac0a7bb316a546d6b21ec64ca5bc95b5.pdf'>
							Privacy Policy
						</a>
					</span>
					{/* &nbsp;&nbsp;&nbsp;&nbsp; */}
				</div>
			</footer>
		</div>
	);
};

export default Footer;
