import React, {useState, useEffect} from "react";
import {
  Button,
  Image,
  View,
  FlatList,
} from "react-native";

import {styles} from '../../styles';

const Home = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(route.params){
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
    <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) => (
      <View style={{marginBottom: 32}}>
        <Image source={{uri: item.photo}} style={{marginHorizontal: 10, height: 240}}/>
      </View>
    )} />
    <Button title='go to map' onPress={() => navigation.navigate('Map')} />
    <Button title='go to comments' onPress={() => navigation.navigate('Comments')} />
    </View>
  );
};

export default Home;