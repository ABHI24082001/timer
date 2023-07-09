import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View , SafeAreaView,TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import{Audio} from "expo-av";

import Header from './src/Component/Header';
import Timer from './src/Component/Timer';

const colors = ["#F7DC6F","#A2D9CE","#D7BDE2"]; 


export default function App() {

  const [isWorking,setWorking] = useState(false);
  const [time,setTime] = useState(25 * 60);
  const [currentTime,setCurrentTime] = useState ("Timer" | "SHORT"| "BREAK"); 
  const [isActive,setIsActive] = useState(false);


  useEffect(() =>{
    let interval = null;

    if (isActive){
      interval = setInterval(() =>{
        setTime(time-1);
      },1000);
    }else{
      clearInterval(interval);

    }

    return() => clearInterval(interval)

    
  },[isActive,time]);




  function handelStartStop(){
    playSound()
    setIsActive(!isActive);

  }
  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/button-1.mp3")
    )
    await sound.playAsync(); 
  }



  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{
        flex: 1, 
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android" && 30,
        
        
        }}>
      <Text  style={styles.text}>Timer</Text>
      {/* <Text  style={styles.text}>{time}</Text> */}
      {/* <Text  style={styles.text}>Open up</Text>
      <Text  style={styles.text}>Open up</Text> */}
       
      <Header
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
       />
       <Timer time={time}/>
       <TouchableOpacity onPress={handelStartStop} style={styles.button}>
        <Text style={{color: "white",fontWeight: "bold"}}>
          {isActive ? "STOP": "START"}</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text:{
    fontSize:32,
    fontWeight: 'bold',
  },
  button:{
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
    padding: 15,
    backgroundColor: "#333333"
  }
});
