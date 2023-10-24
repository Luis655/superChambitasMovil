import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { typography } from "../../app/theme/typography";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { observer } from 'mobx-react';
const OnBoardingScreen = ({navigation }) => {
  return (
    <View style={{ alignContent: "center" }}>
      <Image
        source={{
          uri: "https://irp.cdn-website.com/8ac33f62/DESKTOP/jpg/080.jpg",
        }}
        style={{ width: "auto", height: "85%" }}
      ></Image>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 10,
          ...typography.heading,
          color: "#000000",
        }}
      >
        SuperChambitas
      </Text>

      <Text
        style={{
          alignSelf: "center",
          marginTop: 10,
          ...typography.heading,
          fontSize:20, 
          color: "#000000",
        }}
      >
        "Tu chamba, tu elección, tu comodidad".
      </Text>
      <TouchableOpacity style={{ alignSelf: "center", backgroundColor:"#f6ad19", width:"60%", height:30, borderRadius:30, marginTop:10}} onPress={() => navigation.navigate('WorkerLoginScreen')} >
        <Text style={{...typography.body, fontWeight:'bold', color:"#ffffff", alignSelf: "center", marginTop:5}} >CONTINUAR <FontAwesome name="long-arrow-right" size={18} color="white" /></Text>
      </TouchableOpacity>
    </View>
  );
}

export default observer(OnBoardingScreen);
