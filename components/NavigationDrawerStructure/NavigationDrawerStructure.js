import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';

const NavigationDrawerStructure = (props) => {
	const toggleDrawer = () => {
		props.navigationProps.toggleDrawer();
	};

	return (
		<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity onPress={toggleDrawer}>
				<Entypo
					name='menu'
					size={28}
					color='black'
					style={{
						marginLeft:
							props.routeName !== 'My Reviews Stack' &&
							props.routeName !== 'My Reviews'
								? 20
								: 0,
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default NavigationDrawerStructure;
