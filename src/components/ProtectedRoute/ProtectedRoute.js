import { Navigate } from 'react-router-dom';
// import { useAuth } from "../../customHooks/useAuth";
import { useAuth } from '../../customHooks/useAuth.js';
// import useFetch from '../../hooks/useFetch.js';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	// const token = sessionStorage.getItem('jwtToken');
	const [ok, setOk] = useState(true);
	// const {data, error, loading} = useFetch(`${process.env.REACT_APP_API_URL}/is-token-valid`)
	useEffect(() => {
		const getToken = async () => {
			const config = {
				headers: {
					Authorization: `${sessionStorage.getItem('jwtToken')}`,
				},
			};
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/is-token-valid`,
				config
			);
			const json = await res.json();
			console.log(json);
			setOk(json.ok);
		};
		getToken();
	}, []);
	console.log({ ok, user });
	if (!ok || !user) {
		// user is not authenticated
		return <Navigate to='/' />;
	}
	return children;
};
