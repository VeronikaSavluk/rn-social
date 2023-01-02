import React, {useState, useEffect} from "react";
import {
  Button,
  Image,
  Text,
  View,
  FlatList,
} from "react-native";
import db from '../../firebase/config';
import {styles} from '../../styles';

const Home = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    await db.firestore()
    .collection('posts')
    .onSnapshot((data) => 
    setPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    );
  };
  
  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <View style={styles.container}>
    <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) => (
      <View style={{marginBottom: 32}}>
        <Image source={{uri: item.photo}} style={{marginHorizontal: 10, height: 240}}/>
        <View>
          <Button title='Comments'
          onPress={() => navigation.navigate('Comments', {postId: item.id})}/>
        </View>
        <View>
          <Button title='location'
          onPress={() => navigation.navigate('Map', {location: item.location})}/>
        </View>
      </View>
    )} />
    <Button title='go to map' onPress={() => navigation.navigate('Map')} />
    <Button title='go to comments' onPress={() => navigation.navigate('Comments')} />
    </View>
  );
};

export default Home;