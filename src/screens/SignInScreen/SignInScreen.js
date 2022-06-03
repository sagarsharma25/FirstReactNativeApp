import React, {useState} from 'react'
import { 
    View, 
    Image, 
    StyleSheet, 
    ScrollView,
    Alert
} from 'react-native'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import Logo from '../../../assets/speaker.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useForm} from 'react-hook-form'
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';


const SignInScreen = () => {
    
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();

    const onSignInPressed = async data => {
        if(loading){
            return;
        }
        
        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
            navigation.navigate('Home')
            console.log(response);
          } catch (e) {
            Alert.alert('Oops', e.message);
          }
        setLoading(false);
    };

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    const onSignupPressed = () => {
        navigation.navigate('SignUp');
    };


    return (
        <ScrollView>
            <View style={style.root}>
                <Image source={Logo} style={[style.logo, {height:height*0.3}]} resizeMode = "contain"/>
                    <CustomInput
                        name="username"
                        placeholder="Username"
                        control={control}
                        rules={{required: 'Username is required'}}
                    />

                    <CustomInput
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                            value: 3,
                            message: 'Password should be minimum 3 characters long',
                            },
                        }}
                    /> 

                    <CustomButton 
                        text="Sign In" 
                        onPress={handleSubmit(onSignInPressed)} 
                        type="PRIMARY"
                    />

                    <CustomButton 
                        text="Forgot Password" 
                        onPress={onForgotPassword} 
                        type="TERTIARY"
                    />

                    <SocialSignInButtons />

                    <CustomButton 
                        text="Don't have an account? Create One" 
                        onPress={onSignupPressed} 
                        type="TERTIARY"
                    />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20
    },
    logo:{
        width:'30%',
        maxWidth:300,
        height:100
    }
})

export default SignInScreen
