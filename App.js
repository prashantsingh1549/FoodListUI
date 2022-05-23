import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
const searchData = [
  {
    category: 'Lean Protein',
    type: '4 Oz Servings',
    image: require('./src/assets/lean.png'),
    color: 'lightpink',
    data: [
      'White-fleshed fish',
      'Plain Greek yogurt',
      'Beans, peas, and lentils',
      'Skinless white meat poultry',
      'Low fat cottage cheese',
      'Tofu',
    ],
  },
  {
    category: 'Seafood',
    type: '4 Oz Servings',
    color: 'lightblue',
    image: require('./src/assets/seafood.png'),
    data: ['Crab', 'Shrimp', 'Lobster', 'Lobster'],
  },
  {
    category: 'Vegetables',
    type: '',
    color: 'lightgreen',
    image: require('./src/assets/veg.png'),
    data: ['carrot', 'broccoli', 'asparagus', 'corn'],
  },
  {
    category: 'Fruits',
    type: '3 Oz Servings',
    color: 'red',
    image: require('./src/assets/fruits.png'),
    data: ['Apple', 'Banana', 'Orange', 'Mango'],
  },
  {
    category: 'Alternate ingredients to fats',
    type: '',
    color: 'yellow',
    image: require('./src/assets/fats.png'),
    data: ['Corn oil', 'Soybean oil', 'Walnuts', 'Fish'],
  },
  {
    category: 'Sauces and Seasonings',
    type: '',
    color: 'orange',
    image: require('./src/assets/sauce.png'),
    data: [
      'Habanero Pepper Sauce',
      'Sriracha Chili Sauce',
      'Thai Fish Sauce',
      'Chipotle Pepper Sauce',
    ],
  },
];
const App = () => {
  const [isDown, setIsdown] = useState(false);
  const [isIndex, setIsIndex] = useState(-1);
  const [search, setSearch] = useState('');

  const data1 = searchData.filter(item =>
    item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="lightgrey"
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <View style={{marginLeft: 20, marginTop: 50}}>
        <Image
          source={require('./src/assets/cross.png')}
          style={{height: 25, width: 25, resizeMode: 'center'}}
        />
        <Text style={styles.approvedText}>Approved Foods List</Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={{marginVertical: 10}}>
          <TextInput
            value={search}
            placeholder="try searching fat,sauces names..."
            placeholderTextColor="grey"
            onChangeText={val => setSearch(val)}
            style={styles.inputText}
          />
          <Image
            source={require('./src/assets/search.png')}
            style={styles.imageSearch}
          />
        </View>
        <FlatList
          data={data1}
          keyExtractor={item => Math.random()}
          renderItem={(item, index) => (
            <>
              <View style={styles.flatLiscontainer}>
                <View
                  style={[
                    styles.imageContainer,
                    {backgroundColor: item.item.color},
                  ]}>
                  <Image source={item.item.image} style={styles.itemImage} />
                </View>
                <View style={styles.categoryText}>
                  <Text
                    style={[styles.categoryText1, {color: item.item.color}]}>
                    {item.item.category}
                  </Text>
                  {item.item.type ? (
                    <Text style={styles.categoryText2}>({item.item.type})</Text>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{alignItems: 'flex-end', flex: 0.25}}>
                  {isDown && isIndex == item.index ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsdown(!isDown);
                        setIsIndex(-1);
                      }}>
                      <Image
                        source={require('./src/assets/up.png')}
                        style={styles.up}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setIsdown(!isDown);
                        setIsIndex(item.index);
                      }}>
                      <Image
                        source={require('./src/assets/down.png')}
                        style={styles.down}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {isDown && isIndex == item.index && search ? (
                <View style={styles.downData}>
                  <FlatList
                    data={item.item.data}
                    keyExtractor={() => Math.random()}
                    renderItem={item => (
                      <View style={styles.flatitemData}>
                        <Text style={styles.itemDataText}>{item.item}</Text>
                        <View
                          style={{borderWidth: 0.5, borderColor: 'lightgrey'}}
                        />
                      </View>
                    )}
                  />
                </View>
              ) : (
                <></>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 260,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  textItem: {
    color: '#000',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approvedText: {
    marginTop: 20,
    fontSize: 28,
    color: '#000',
    fontWeight: '500',
  },
  inputText: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingLeft: 35,
    color: '#000',
  },
  imageSearch: {
    height: 60,
    width: 60,
    resizeMode: 'center',
    position: 'absolute',
    marginLeft: -10,
    marginTop: -5,
  },
  flatLiscontainer: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    height: 30,
    width: 30,
    resizeMode: 'center',
  },
  categoryText: {
    flex: 0.7,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  categoryText1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryText2: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  up: {
    height: 40,
    width: 40,
    resizeMode: 'center',
  },
  down: {
    height: 20,
    width: 20,
    resizeMode: 'center',
  },
  downData: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: -8,
  },
  flatitemData: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  itemDataText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
