import {API} from '../../api';
import Toast from 'react-native-simple-toast';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export const changePassword = async (userId: string, oldPassword: string, newPassword: string, accessToken: string) => {
  try {
    // Call API for changePassword logic
    const response = await API.post('/auth/password', {userId, oldPassword, newPassword, accessToken});
    console.log('🚀 ~ changePassword: ~ response:', response);
    // Handle success
    Toast.show('Password changed successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ changePassword: ~ error:', error);
  }
};

export const useDogs = () => {
  return useQuery({
    queryKey: ['dogsData'],
    queryFn: () => axios.get('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.data),
  });
};

export const getPublicArticles = async () => {
  const {data} = await API.get(`/v1/article/public-article`);

  return data;
};
