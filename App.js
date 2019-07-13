import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MapView, Permissions } from 'expo'

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null
  }

  async componentDidMount(){
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if (status != 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
  }
  render(){
    const {
      latitude,
      longitude,
    } = this.state

  if (latitude){
    return (
      <MapView
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01
      }}
    >
      </MapView>
    );
  }
 
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Please Allow Location</Text>
    </View>
  )
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
