import React from 'react'
import { Text, FlatList, ScrollView, Image, View, StyleSheet, } from "react-native";

const KEY = '6daeab3e';

export default class MovieScreen extends React.Component {
  state = {
    moviedetails: ""
  }

  componentDidMount() {
    return fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${this.props.route.params.movie.imdbID}&plot=full`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({moviedetails: responseJson})
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })  
  }

  renderItem = ({item}) => {
    return (
      <View>
        <Text>
          {`${item.Source} : ${item.Value}`}
        </Text>
      </View>
     
    )
  }

  render() {
    return (
        <View>
            <Text> {this.state.moviedetails.Title}</Text>
            <Text> ({this.state.moviedetails.Year}) </Text>
            <Text> {this.state.moviedetails.Plot} </Text>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={this.state.moviedetails.Ratings}
                renderItem={this.renderItem}
            />
        </View>
    )
  }
}

