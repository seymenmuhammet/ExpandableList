import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Content = [
  {
    isExpanded: false,
    category_name: 'Item 1',
    subCategory: [
      {id: 1, val: 'Sub 1'},
      {id: 2, val: 'Sub 2'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subCategory: [
      {id: 3, val: 'Sub 3'},
      {id: 4, val: 'Sub 4'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 3',
    subCategory: [
      {id: 5, val: 'Sub 5'},
      {id: 6, val: 'Sub 6'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 4',
    subCategory: [
      {id: 7, val: 'Sub 7'},
      {id: 8, val: 'Sub 8'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 5',
    subCategory: [
      {id: 9, val: 'Sub 9'},
      {id: 10, val: 'Sub 10'},
      {id: 11, val: 'Sub 11'},
      {id: 12, val: 'Sub 12'},

    ],
  },
];

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={onClickFunction}>
        <Text style={styles.itemText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View style={{height: layoutHeight, overflow: 'hidden'}}>
        {item.subCategory.map((item, key) => (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>
              {key + 1}. {item.val}
            </Text>
            <View style={styles.seperator}></View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const App = () => {
  const [multiSelect, setmultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(Content);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
          : (array[placeindex]['isExpanded']) = false
      );
    }
    setlistDataSource(array);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Expandable List View</Text>
          <TouchableOpacity onPress={() => setmultiSelect(!multiSelect)}>
            <Text style={styles.headerButton}>
              {multiSelect
                ? 'Enable Single \n Expand'
                : 'Enable Multiple \n Expand'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              item={item}
              onClickFunction={() => {
                updateLayout(key);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  headerButton: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
  },
  item: {
    backgroundColor: 'orange',
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  seperator: {
    height: 0.5,
    backgroundColor: '#c8c8c8',
    width: '100%',
  },
});

export default App;
