import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Easing, Animated } from 'react-native';
import { createStackNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import { fromLeft, fromTop, fadeIn, zoomIn, zoomOut, flipX, flipY, fromRight, fromBottom } from 'react-navigation-transitions';

class ScreenA extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#483d8b' }}>
        <Text style={{ color: '#d9eaee', fontSize: 40 }}>Screen A</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#d9eaee', height: 40, width: 150, justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('ScreenB')}
        >
          <Text style={{ color: '#222', textAlign: 'center', fontSize: 20 }}>Next Screen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

class ScreenB extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#222' }} forceInset={{ top: 'always', bottom: 'always' }}>
        <Text style={{ color: '#d9eaee', fontSize: 40 }}>Screen B</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#d9eaee', height: 40, width: 150, justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('ScreenC')}
        >
          <Text style={{ color: '#222', textAlign: 'center', fontSize: 20 }}>Next Screen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

class ScreenC extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#000' }} forceInset={{ top: 'always', bottom: 'always' }}>
        <Text style={{ color: '#d9eaee', fontSize: 40 }}>Screen C</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#d9eaee', height: 40, width: 150, justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('ScreenA')}
        >
          <Text style={{ color: '#222', textAlign: 'center', fontSize: 20 }}>Next Screen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const handleCustomTransition = (nav) => {
  const { scenes } = nav;
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'ScreenA'
    && nextScene.route.routeName === 'ScreenB') {
    return zoomIn();
  } else if (prevScene
    && prevScene.route.routeName === 'ScreenB'
    && nextScene.route.routeName === 'ScreenC') {
    return zoomOut();
  }
  return fromLeft();
}

const AppNavigator = createStackNavigator({
  ScreenA: {
    screen: ScreenA,
    navigationOptions: { header: null, }
  },
  ScreenB: {
    screen: ScreenB,
    navigationOptions:{ 
      header: null,
      // headerForceInset: { top: 'always', bottom: 'always' }
    }
  },
  ScreenC: {
    screen: ScreenC,
    navigationOptions:{ header: null, }
  },
}, {
  initialRouteName: 'ScreenA',
  transitionConfig: (nav) => handleCustomTransition(nav),
});

export default createAppContainer(AppNavigator);
