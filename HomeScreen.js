import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const KEY = '6daeab3e';

const Row = props => (
    <TouchableOpacity
        onPress={() => props.onCustomPress(props)}>
        <View>
            <Text> {props.Title}</Text>
        </View>
    </TouchableOpacity>
)

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          movieList : [],
          search : "",
          page : 1,
          totalPages : 1,
          listRefresh : false,
        }
    }

    //Using OMDB API
    getMoviesFromAPI = () => {
        return fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${this.state.search}&page=${this.state.page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movieList : responseJson.Search,
                    page: 1,
                    totalPages : Math.ceil(responseJson.totalResults/10)
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    movieList : [{id: 'Error Calling API'}],
                })
            })
    }

    getMoviesWhenScrolling = () => {
        if (this.state.movieList.length === 0 || this.state.page === this.state.totalPages){
          return
        }
        return fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${this.state.search}&page=${this.state.page}`)
          .then((response) => response.json())
          .then((responseJson) => {
            const newMovieList = this.state.movieList.concat(responseJson.Search)
            this.setState((prevstate) => ({
              movieList : [...newMovieList],
              page: prevstate.page + 1,
              refresh: !prevstate.listRefresh 
            }))
          })
          .catch((err) => {
            console.log(err);
          })
      }
    

    handleSearchChange = searchText => {
        this.setState({search : searchText})

    }

    handleSubmitSearch = () => {
        this.getMoviesFromAPI()
    }

    handleSelectMovie = (movie) => {
        this.props.navigation.push('Movie', {movie : movie})
    }


    render() {
        return (
            <View style = {styles.container}>
                <Text>Home Screen</Text>
                <TextInput
                    value = {this.state.search}
                    onChangeText = {this.handleSearchChange}
                    // onEndEditing={e => this.handleSubmitSearch}
                    placeholder= "search title"
                />

                <Button 
                    title = "Logout"
                    onPress = {() => this.props.navigation.navigate('Login')}
                />

                <Button 
                    title = "Submit"
                    onPress = {this.handleSubmitSearch}
                />

                <Button 
                    title = "Go to MovieScreen"
                    onPress = {() => this.props.navigation.navigate('Movie')}
                />
                
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({item}) => <Row {...item} onCustomPress = {this.handleSelectMovie}/>}
                    data = {this.state.movieList}
                    extraData = {this.state.listRefresh}
                    onEndReached = {() => this.getMoviesWhenScrolling()}
                    onEndReachedThreshold = {0.1}
                /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});