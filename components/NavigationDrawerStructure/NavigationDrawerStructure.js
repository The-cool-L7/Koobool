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
					style={{ marginLeft: 20 }}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default NavigationDrawerStructure;
