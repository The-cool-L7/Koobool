import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	ImageBackground,
	ScrollView,
	TextInput,
	Text,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Gap } from '../utilities/utils';
import Book from '../utilities/Book';
import { supabase } from '../../lib/supabase';

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
		height: 50,
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
	allBooksText: {
		marginVertical: 20,
		marginBottom: 5,
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center',
	},
});

const AllBooks = (props) => {
	const { navigation } = props;

	const [searchText, onChangeSearchText] = useState('');
	const [allBooks, setAllBooks] = useState([]);
	const [filteredBookList, setFilteredBookList] = useState([]);

	const onSearchInputChange = () => {
		if (searchText.length !== 0 && allBooks.length > 0) {
			const filtered = allBooks.filter((b) =>
				b.book_name.includes(searchText),
			);

			setFilteredBookList(() => filtered);
		}
	};

	const onBookPress = (bookName, bookCoverUrl, bookIndex) => {
		navigation.navigate('Add Review Form', {
			bookName: bookName,
			bookCoverUrl: bookCoverUrl,
		});
	};

	useEffect(() => {
		const getData = async () => {
			let { data, error } = await supabase.from('Books').select('*');

			setAllBooks(data);
		};

		getData();
	}, []);

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
						<Text style={styles.allBooksText}>
							Select a book to add review
						</Text>
						<View style={styles.bookLists}>
							{searchText.length === 0 &&
								allBooks.length > 0 &&
								allBooks.map((book, index) => (
									<Book
										bookImageUrl={book.book_image}
										bookName={book.book_name}
										key={index}
										onPress={onBookPress}
									/>
								))}

							{searchText.length !== 0 &&
								filteredBookList.map((book, index) => (
									<Book
										bookImageUrl={book.book_image}
										bookName={book.book_name}
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
