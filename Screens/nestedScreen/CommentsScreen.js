import React, {useState, useEffect} from "react";
import db from '../../firebase/config';
import {useSelector} from 'react-redux';
import {
  FlatList,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {styles} from '../../styles';

const CommentsScreen = ({route}) => {
  const {postId} = route.params;
  const {nickname} = useSelector((state) => state.auth);
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const createComment = async() => {
    await db.firestore()
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .add({comment, nickname});
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
    <View style={styles.container}>
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
      <TextInput style={styles.input} placeholder="Comment..." onChangeText={setComment}/>
      <TouchableOpacity style={styles.input} onPress={createComment}>
        <Text>Add comment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentsScreen;