import React, {useState, useEffect} from "react";
import db from '../../firebase/config';
import {useSelector} from 'react-redux';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import {styles} from '../../styles';

const CommentsScreen = ({route}) => {
  const {postId, photo} = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const {nickname, image} = useSelector((state) => state.auth);

  useEffect(() => {
    getComments();
  }, []);

  const createComment = async() => {
    await db.firestore()
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .add({comment, nickname, image, date: new Date().toLocaleString()});

    setComment(initialComment);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{...styles.screenContainer, height: 690}}>
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Image source={{uri: photo}}
            style={{height: 240, borderRadius: 8, marginBottom: 32}}
            />
          <SafeAreaView style={{height: isShowKeyboard ? 0 : 220, marginBottom: 16, justifyContent: 'flex-end'}}>
            <FlatList
              data={comments}
              renderItem={({item}) => (
              <View style={{...styles.userBox, marginBottom: 16}}>
                <View style={{width: 28, borderRadius: 50, marginRight: 16}}>
                {item.image
                ? <Image source={{uri: item.image}}
                style={{...styles.image, width: 28, height: 28}}
                />
                : <Image source={require('../../images/avatar_default.png')}
                 style={{...styles.image, width: 28, height: 28}}/>
                }
                </View>
                <View style={{fontSize: 13}}>
                  <Text style={{...styles.text, textAlign: 'left', padding: 16}}>{item.comment}</Text>
                </View>
              </View>
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
            <View style={styles.comment}>
              <TextInput
                name='comment'
                value={comment}
                autoComplete='off'
                placeholder="Comment..."
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => {setComment(value)}}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendIcon}
                onPress={createComment}
              >
              <Image source={require('../../images/send.png')}/>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>    
      </View>
  </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;