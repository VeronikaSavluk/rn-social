import React, {useState, useEffect} from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import db from '../../firebase/config';
import locationIcon from '../../images/map-pin.png';
import commentIcon from '../../images/message-circle.png';
import {styles} from '../../styles';

const PostsScreen = ({route, navigation}) => {
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
    <View style={styles.screenContainer}>
    <FlatList data={posts} keyExtractor={(item, idx) => idx.toString()}
    renderItem={({item}) => (
      <View style={{marginBottom: 32}}>
        <Image source={{uri: item.photo}} style={{height: 240, borderRadius: 8}}/>
        <Text>{item.title}</Text>
        <View style={styles.infoPost}>
        <TouchableOpacity onPress={() => navigation.navigate('Comments', {postId: item.id, photo: item.photo})} 
        style={styles.postIconContainer}>
        <Image source={commentIcon} style={styles.postIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map', {location: item.location})} 
        style={{...styles.postIconContainer, width: 255}}>
        <Image source={locationIcon} style={styles.postIcon}/>
        <Text>{item.locationTitle}</Text>
        </TouchableOpacity>
        </View>
      </View>
    )} />
    </View>
  );
};

export default PostsScreen;