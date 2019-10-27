/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'


//imjport screens
import globalstyles from './styles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomeDashboard from './HomeDashboard';
import HomePeople from './HomePeople';
import HomeChats from './HomeChats';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
   });


// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
       
//         <TouchableOpacity 
//         onPress={ ()=> { Actions.drawerOpen()}}
//         style={{ width:200, height:70, backgroundColor:"#4499aa"}}>

//         </TouchableOpacity>

//             <CardView
//             style={{  backgroundColor:"#ffffff", padding: 20}}
//               cardElevation={4}
//               cardMaxElevation={2}
//               cornerRadius={5}>
//               <Text style={styles.welcome}>HomeScreen</Text>
//               <Text style={styles.instructions}>To get started, edit App.js</Text>
//               <Text style={styles.instructions}>{instructions}</Text>
//            </CardView>
//       </View>
//     );
//   }
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });





const App = () => {
  return (
    <Router>
 
                    
      <Scene key="root"
      tabs={true}
      tabBarPosition="top"
      indicatorStyle = {{ backgroundColor:"#ffffff", height:5,}}
      >


            <Scene key="HomeDashboard"
                    component={HomeDashboard}
                    title="Dashboard"
                   // initial
                    hideNavBar
                    />

            <Scene key="HomePeople"
                    component={HomePeople}
                    title="People"
                    hideNavBar
                    />

            <Scene key= "HomeChats"
                    component={HomeChats}
                    title="Chats"
                    hideNavBar
                    />

      </Scene>
    </Router>
  );
}

export default App;