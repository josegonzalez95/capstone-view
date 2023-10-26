// google maps component showing a pin location for each event

import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function MyComponent(props) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
	});

	const [size, setSize] = useState({ width: '800px', height: '800px' });

	const containerStyle = {
		width: size.width,
		height: size.height,
	};

	useEffect(() => {
		if (window.innerWidth > 800) {
			setSize({ width: '800px', height: '800px' });
		} else if (window.innerWidth > 400 && window.innerWidth < 800) {
			setSize({ width: '400px', height: '400px' });
		} else if (window.innerWidth < 400) {
			setSize({ width: '370px', height: '370px' });
		}
		const handleResize = () => {
			if (window.innerWidth > 800) {
				setSize({ width: '800px', height: '800px' });
			} else if (window.innerWidth > 400 && window.innerWidth < 800) {
				setSize({ width: '400px', height: '400px' });
			} else if (window.innerWidth < 400) {
				setSize({ width: '370px', height: '370px' });
			}
		};

		window.addEventListener('resize', handleResize);
	}, []);

	return isLoaded ? (
		// <></>
		<div style={{ marginBottom: '2rem' }}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={JSON.parse(props.location)}
				zoom={10}>
				<Marker position={JSON.parse(props.location)} />
			</GoogleMap>
		</div>
	) : (
		<></>
	);
}

export default React.memo(MyComponent);
