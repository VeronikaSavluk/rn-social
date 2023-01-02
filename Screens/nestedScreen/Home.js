import React, {useState, useEffect} from "react";
import {
  Button,
  Image,
  Text,
  Title,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import db from '../../firebase/config';
import locationIcon from '../../images/map-pin.png';
import commentIcon from '../../images/message-circle.png';
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
    <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()}
    renderItem={({item}) => (
      <View style={{marginBottom: 32}}>
        <Image source={{uri: item.photo}} style={{marginHorizontal: 10, height: 240}}/>
        <View style={styles.infoPost}>
        <TouchableOpacity onPress={() => navigation.navigate('Comments', {postId: item.id})} 
        style={styles.postIconContainer}>
        <Image source={commentIcon} style={styles.postIcon}/>
        <Text>{item.comment.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map', {location: item.location})} 
        style={{...styles.postIconContainer, width: 255}}>
        <Image source={locationIcon} style={styles.postIcon}/>
        {item.locationTitle && <Title>{item.locationTitle}</Title>}
        </TouchableOpacity>
        </View>
      </View>
    )} />
    <Button title='go to map' onPress={() => navigation.navigate('Map')} />
    <Button title='go to comments' onPress={() => navigation.navigate('Comments')} />
    </View>
  );
};

export default Home;