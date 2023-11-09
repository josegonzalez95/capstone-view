import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import styles from './Navbar.module.css';
import image from '../../assets/cyQN0U01(1).svg';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ pathName }) => {
	const [isNavToggle, setIsNavToggle] = useState(false);
	const handleNavToggle = () => {
		setIsNavToggle((prev) => {
			return !prev;
		});
	};
	const navigate = useNavigate();

	return (
		<div className={styles.navbar}>
			<nav className={styles.menu}>
				<div
					className={styles.bar}
					onClick={handleNavToggle}
					style={{ transform: isNavToggle ? 'rotate(-90deg)' : null }}>
					<FaBars />
				</div>

				<ul>
					{pathName !== '/login' && pathName !== '/signup' ? (
						<div
						// className={styles.navbar}
						>
							<a
								className={styles.title}
								href='/'>
								{/* PURCycling */}
								<img
									width={'125rem'}
									src={image}
								/>
							</a>

							<div className={styles.btns}>
								<Button className={styles.myevntsbtn}>
									<a
										target='_blank'
										style={{ color: 'white' }}
										href='https://www.purcycling.com/_files/ugd/4d62fb_ac0a7bb316a546d6b21ec64ca5bc95b5.pdf'>
										Privacy Policy
									</a>
								</Button>
								<Button className={styles.myevntsbtn}>
									<a
										target='_blank'
										style={{ color: 'white' }}
										href='https://www.purcycling.com/_files/ugd/4d62fb_18b94b145fde4a9caf64375f33b9ef51.pdf'>
										Refund Policy
									</a>
								</Button>
								{JSON.parse(localStorage.getItem('user')) !== null ? (
									<>
										<Button
											className={styles.myevntsbtn}
											onClick={() => {
												navigate('promoters');
											}}>
											MyEvents
										</Button>
										<Button
											className={styles.profile}
											onClick={() => {
												navigate('billing');
											}}>
											Billing
										</Button>
										<Button
											className={styles.profile}
											onClick={() => {
												navigate('profile');
											}}>
											Profile
										</Button>
										<Button
											className={styles.signout}
											onClick={() => {
												localStorage.clear();
												window.location.reload();
											}}>
											SignOut
										</Button>
									</>
								) : null}
							</div>
						</div>
					) : null}
				</ul>

				<hr className={styles.navHR} />
			</nav>
		</div>
	);
};

export default Navbar;
