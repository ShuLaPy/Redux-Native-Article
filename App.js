import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserAction} from './src/redux/actions';

const App = () => {
  const [userName, setUserName] = useState();

  const user = useSelector((state) => state.user);
  const {usersData, loading, error} = user;

  const dispatch = useDispatch();

  const searchUser = () => {
    dispatch(fetchUserAction(userName))
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#F2F2F2'}}>
      <View style={styles.searchBoxContainer}>
        <TextInput
          placeholder="Search Github User"
          placeholderTextColor="#666"
          style={styles.SearchBox}
          onChangeText={(name) => setUserName(name)}
          value={userName}
        />
        <TouchableOpacity style={styles.searchBoxIcon} onPress={searchUser}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(usersData).length !== 0 ? (
        <View style={styles.profileContainer}>
          <View style={styles.avatarView}>
            <Image
              style={styles.avatar}
              source={{
                uri: usersData.avatar_url,
              }}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{usersData.name}</Text>
          </View>
          <Text style={styles.contant}>Bio: {usersData.name}</Text>
          <Text style={styles.contant}>Company: {usersData.company}</Text>
          <Text style={styles.contant}>Website: {usersData.blog}</Text>
          <Text style={styles.contant}>Location: {usersData.location}</Text>
          <View style={styles.table}>
            <View style={styles.cells}>
              <Text>Followers</Text>
              <Text>{usersData.followers}</Text>
            </View>
            <View style={styles.cells}>
              <Text>Following</Text>
              <Text>{usersData.following}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.cells}>
              <Text>Repos</Text>
              <Text>{usersData.public_repos}</Text>
            </View>
            <View style={styles.cells}>
              <Text>Gists</Text>
              <Text>{usersData.public_gists}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>No Data Found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
  },
  searchBoxContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  SearchBox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  searchBoxIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
  },
  profileContainer: {
    marginTop: 50,
  },
  avatarView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 70,
  },
  nameContainer: {
    alignItems: 'center',
    padding: 25,
  },
  name: {
    fontSize: 25,
    fontWeight: '700',
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  cells: {
    alignItems: 'center',
    padding: 25,
  },
  contant: {
    fontSize: 18,
    padding: 8,
  },
});

export default App;
