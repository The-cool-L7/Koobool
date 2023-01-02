import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
	container: {
		// padding: 25,
		borderWidth: 4,
		backgroundColor: '#f1f1f1',
		width: '100%',
		borderRadius: 25,
		marginTop: 20,

		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	left: {
		justifyContent: 'space-between',
	},
	right: {},
	bookImage: {},
	drawingImage: {},
});

const MyReviewCard = (props) => {
	const { bookCoverSrc, drawingSrc, bookName, authorName } = props;

	// https://klaqoarttawlrpftzomo.supabase.co/storage/v1/object/sign/bookimages/The%20Awesome%20Egyptians%20(Horrible%20Histories).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJib29raW1hZ2VzL1RoZSBBd2Vzb21lIEVneXB0aWFucyAoSG9ycmlibGUgSGlzdG9yaWVzKS5qcGciLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzA0MTczNzUsImV4cCI6MTk4NTc3NzM3NX0.9YB-BRgme0nD_Ng1i8nvUgHy4zNkEd-yrJqIvoE_cDU
	return (
		<>
			<View style={styles.container}>
				<View></View>
				<View style={styles.left}></View>
				<View style={styles.right}></View>
			</View>
		</>
	);
};

export default MyReviewCard;
