import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { Text } from 'react-native';
import Button from '@/components/ui/Button'; 
import useSettings from '@/hooks/useSettings'; 
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-toast-message';
import ToastHelper from '@/utils/ToastHelper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '@/models/User';

  export default function HomeScreen() {
    const router = useRouter();
    const { language, theme, translation, colors } = useSettings(); 
    const { userInfo} = useAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      userInfo()
        .then((theUser) => {
          if (theUser?.fullName) {
            setUser(theUser);
            ToastHelper.showSuccess(
              translation.loginSuccess || 'Login Success',
              translation.welcomeBack + (theUser.fullName || 'User')
            );
          }
        })
        .catch((error) => {
          router.replace("/(auth)/login");
        });
    }, [userInfo, translation]);
    
    const navigateToProfile = () => {
      router.push({
        pathname: "/(profile)/information",
        params: { user: JSON.stringify(user) }
      });
    };

    return (
      <SafeAreaView>
        <Text>Home</Text>
        <Button
          title={translation.profileButtonText || 'Profile'}
          onPress={navigateToProfile} 
          color={colors.button} 
          textColor="#fff"/>
        <Toast/>
      </SafeAreaView>
    );
  }
