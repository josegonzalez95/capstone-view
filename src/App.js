import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Promoters from './components/Promoters/Promoters.js';
import Participants from './components/Participants/Participants';
import Login from './components/Login/Login.js';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.js';
import Signup from './components/Signup/Signup.js';
import './App.css';
import Event from './components/Event/Event.js';
import Register from './components/Regitser/Register.js';
import PromoterProfile from './components/PromoterProfile/PromoterProfile.js';
import CalendarP from './components/Calendar/Calendar.js';
import RegisterForm from './components/RegisterForm/RegisterForm.js';
import Orders from './components/Orders/Orders.js';
import Order from './components/Order/Order.js';
import ResizableImage from './components/ResizableImage/ResizableImage.js';
import FormFields from './components/FormFIelds/FormFields.js';
import { useEffect, useState } from 'react';
import { totalTickets } from './api/Tickets/ticketsRoutes.js';
import image from './assets/cyQN0U01(1).svg';

function App() {
	const navigate = useNavigate();
	const pathName = window.location.pathname;

	return (
		<>
			{pathName !== '/login' && pathName !== '/signup' ? (
				<nav className='navBar'>
					<a
						className='title'
						href='/'>
						{/* PURCycling */}
						<img
							width={'125rem'}
							src={image}
						/>
					</a>

					<div className='btns'>
						{/* {pathName !== '/calendar' && (
							<Button
								className='calendarbtn'
								onClick={() => {
									navigate('calendar');
								}}>
								Calendar
							</Button>
						)} */}
						{/* {pathName !== '/' && (
							<Button
								className='calendarbtn'
								onClick={() => {
									navigate('/');
								}}>
								Events
							</Button>
						)} */}
						{JSON.parse(localStorage.getItem('user')) !== null ? (
							<>
								<Button
									className='myevntsbtn'
									onClick={() => {
										navigate('promoters');
									}}>
									MyEvents
								</Button>
								<Button
									className='profile'
									onClick={() => {
										navigate('profile');
									}}>
									Profile
								</Button>
								<Button
									className='signout'
									onClick={() => {
										localStorage.clear();
										window.location.reload();
									}}>
									SignOut
								</Button>
							</>
						) : null}
					</div>
				</nav>
			) : null}
			<Routes>
				<Route
					path='/'
					element={<Participants />}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<PromoterProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/promoters'
					element={
						<ProtectedRoute>
							<Promoters />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/calendar'
					element={<CalendarP />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/event/:id'
					element={
						<ProtectedRoute>
							<Event />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/registerParticipant/:eventId'
					element={<Register />}
				/>
				<Route
					path='/registerParticipant/:eventId/registerForm/:numOfTickets'
					element={<RegisterForm />}
				/>
				<Route
					path='/event/:eventId/orders'
					element={
						<ProtectedRoute>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/event/:eventId/orders/:orderId/:paymentId'
					element={
						<ProtectedRoute>
							<Order />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/event/:eventId/formfields'
					element={
						<ProtectedRoute>
							<FormFields />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
