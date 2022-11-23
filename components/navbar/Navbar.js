import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 40,
	},
	userImage: {
		width: 45,
		height: 45,
	},
	closeImage: {
		width: 45,
		height: 45,
	},
});

const Navbar = () => {
	return (
		<>
			<View style={styles.container}>
				<Image
					source={require('../../assets/navbar/user.png')}
					style={styles.userImage}
				/>
				<Image
					source={require('../../assets/navbar/close.png')}
					style={styles.closeImage}
				/>
			</View>
		</>
	);
};

export default Navbar;
