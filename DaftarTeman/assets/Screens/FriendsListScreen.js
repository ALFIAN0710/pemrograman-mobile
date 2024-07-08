// screens/FriendsListScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const FriendsListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [image, setImage] = useState(null);

  // Callback untuk editFriend menggunakan useCallback
  const editFriend = useCallback((index) => {
    setName(friends[index].name);
    setPhoneNumber(friends[index].phoneNumber);
    setImage(friends[index].image);
    setEditIndex(index);
  }, [friends]);

  // Callback untuk deleteFriend menggunakan useCallback
  const deleteFriend = useCallback((index) => {
    Alert.alert(
      'Delete Friend',
      'Are you sure you want to delete this friend?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedFriends = friends.filter((_, i) => i !== index);
            setFriends(updatedFriends);
          },
        },
      ]
    );
  }, [friends]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addFriend = () => {
    if (name.trim() === '' || !image || phoneNumber.trim() === '') {
      Alert.alert('Validation', 'Friend name, image, and phone number cannot be empty');
      return;
    }
    const newFriend = { name, phoneNumber, image };
    if (editIndex !== null) {
      const updatedFriends = friends.map((friend, index) =>
        index === editIndex ? newFriend : friend
      );
      setFriends(updatedFriends);
      setEditIndex(null);
    } else {
      setFriends([...friends, newFriend]);
    }
    setName('');
    setPhoneNumber('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends List</Text>
      <TextInput
        placeholder="Enter friend's name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter friend's phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={addFriend}>
        <Text style={styles.buttonText}>{editIndex !== null ? "Update Friend" : "Add Friend"}</Text>
      </TouchableOpacity>
      <FlatList
        data={friends}
        renderItem={({ item, index }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.image }} style={styles.friendImage} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendPhone}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editFriend(index)}>
                <Ionicons name="pencil" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteFriend(index)}>
                <Ionicons name="trash" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  imagePicker: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
  },
  friendPhone: {
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
  },
});

export default FriendsListScreen;
