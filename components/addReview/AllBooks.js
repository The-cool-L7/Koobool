import { useState } from 'react';
import {
	Image,
	StyleSheet,
	View,
	Alert,
	Text,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	TextInput,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Gap } from '../utilities/utils';
import Book from './Book';
import books from '../../dummy-data/books.json';

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		flexGrow: 1,
		paddingBottom: 10,
		width: '100%',
		paddingHorizontal: 10,
	},
	title: {},
	searchInputView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchInput: {
		height: 40,
		borderWidth: 1.5,
		width: '85%',
		paddingHorizontal: 15,
		paddingVertical: 13,
		backgroundColor: '#fff',
		marginVertical: 20,
		alignSelf: 'center',
		borderRadius: 10,
	},
	bookLists: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
});

const AllBooks = (props) => {
	const { navigation } = props;

	const [searchText, onChangeSearchText] = useState('');
	const [filteredBookList, setFilteredBookList] = useState([]);

	const onSearchInputChange = () => {
		if (searchText.length !== 0) {
			const filtered = books.books.filter((b) =>
				b.bookName.includes(searchText),
			);

			setFilteredBookList(() => filtered);
		}
	};

	const onBookPress = (bookName, bookIndex) => {
		console.log('hello');
		navigation.navigate('Add Review');
	};

	return (
		<>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<ImageBackground
					source={require('../../assets/review-page/review-bkg-image-white.png')}
					resizeMode='cover'
					style={styles.imageBackground}
				>
					<View style={styles.container}>
						<View style={styles.searchInputView}>
							<FontAwesome name='search' size={24} color='black' />
							<Gap size={15} />
							<TextInput
								style={styles.searchInput}
								onChangeText={onChangeSearchText}
								onChange={onSearchInputChange}
								value={searchText}
								placeholder='Search book...'
							/>
						</View>
						<View style={styles.bookLists}>
							{searchText.length === 0 &&
								books.books.map((book, index) => (
									<Book
										bookImageUrl={book.imageUrl}
										bookName={book.bookName}
										key={index}
										onPress={onBookPress}
									/>
								))}

							{searchText.length !== 0 &&
								filteredBookList.map((book, index) => (
									<Book
										bookImageUrl={book.imageUrl}
										bookName={book.bookName}
										key={index}
										onPress={onBookPress}
									/>
								))}
						</View>
					</View>
				</ImageBackground>
			</ScrollView>
		</>
	);
};

export default AllBooks;
