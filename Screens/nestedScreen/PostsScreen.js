import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
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
import defaultImage from '../../images/avatar_default.png';
import {styles} from '../../styles';

const PostsScreen = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);

  const {userId, nickname, email, image} = useSelector((state) => state.auth);

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
      <View style={styles.userBox}>
      <View style={{width: 60, borderRadius: 16, marginRight: 8}}>
        {image 
        ? <Image source={{uri: image}} style={styles.image}/>
        : <Image source={defaultImage} style={styles.image}/>
        }
        </View>
        <View>
          <Text>{nickname}</Text>
          <Text>{email}</Text>
        </View>
      </View>
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