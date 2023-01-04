import React, {useState, useEffect} from "react";
import db from '../../firebase/config';
import {useSelector} from 'react-redux';
import {
  FlatList,
  Image,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {styles} from '../../styles';


const CommentsScreen = ({route}) => {
  const {postId, photo} = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const {nickname} = useSelector((state) => state.auth);

  useEffect(() => {
    getComments();
  }, []);

  const createComment = async() => {
    await db.firestore()
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .add({comment, nickname});
    setIsDisabled(true);
  };

  const getComments = async() => {
    await db.firestore()
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .onSnapshot((data) => 
    setComments(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Image source={{uri: photo}}
      style={{height: 240, borderRadius: 8, marginBottom: 32}}
      />
      <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <View>
            <Text>{item.nickname}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      <TextInput style={styles.input}
      placeholder="Comment..."
      onChangeText={(value) => {setComment(value), setIsDisabled(false)}}/>
      <TouchableOpacity disabled={isDisabled}
      style={{...styles.btn, backgroundColor: isDisabled ? '#F6F6F6' : '#FF6C00'}}
      onPress={createComment}
      >
        <Text
        style={{...styles.text, color: isDisabled ? '#BDBDBD' : '#ffffff'}}
        >Add comment
        </Text>
      </TouchableOpacity>      
    </View>
  );
};

export default CommentsScreen;