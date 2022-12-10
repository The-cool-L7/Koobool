import { View, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
		paddingHorizontal: 30,
	},
});

const Navbar = () => {
	return (
		<>
			<View style={styles.container}>
				<FontAwesome name='user-circle-o' size={35} color='black' />
				<Link to={{ screen: 'Home' }}>
					<Entypo name='home' size={35} color='black' />
				</Link>
			</View>
		</>
	);
};

export default Navbar;
