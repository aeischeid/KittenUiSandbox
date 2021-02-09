/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  ImageProps,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  Autocomplete,
  AutocompleteItem,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon {...props} name='heart'/>
);

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
);

const EmailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());


export default (): React.ReactFragment => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = (index) => {
    setValue(data[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  };

  const clearInput = () => {
    setValue('');
    setData(movies);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={StarIcon}
    />
  );
  
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.container}>
          <Text style={styles.text} category='h1'>
            Welcome to UI Kitten 😻
          </Text>
          <Autocomplete
            placeholder='Place your Text'
            value={value}
            accessoryRight={renderCloseIcon}
            onChangeText={onChangeText}
            onSelect={onSelect}>
            {data.map(renderOption)}
          </Autocomplete>
          <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
            LIKE
          </Button>
          <BottomNavigation
            style={styles.bottomNavigation}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
          >
            <BottomNavigationTab icon={PersonIcon}/>
            <BottomNavigationTab icon={BellIcon}/>
            <BottomNavigationTab icon={EmailIcon}/>
          </BottomNavigation>

        </Layout>
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
  bottomNavigation: {
    marginVertical: 8,
  },
});
