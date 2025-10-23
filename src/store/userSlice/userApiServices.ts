import {API} from '../../api';
import Toast from 'react-native-simple-toast';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Platform} from 'react-native';

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
  console.log("🚀 ~ getPublicArticles ~ data:", data)
  return data;
};
export const getArticlesUuid = async (uuid : string) => {
  const {data} = await API.get(`/v1/article/id/${uuid}`);
  console.log("🚀 ~ getPublicArticles ~ data:", data)
  return data;
};

export type UploadArticleFile = {
  name: string;
  type?: string | null;
  uri: string;
  size?: number | null;
};

export type UploadArticlePayload = {
  file?: UploadArticleFile | null;
  link?: string;
};

export const uploadArticle = async ({file, link}: UploadArticlePayload) => {
  if (!file && !link) {
    throw new Error('Either a file or a link is required for upload.');
  }

  const formData = new FormData();

  if (file) {
    const fileUri =
      Platform.OS === 'ios' && file.uri.startsWith('file://')
        ? file.uri.replace('file://', '')
        : file.uri;

    formData.append('pdf', {
      uri: fileUri,
      type: file.type ?? 'application/pdf',
      name: file.name ?? 'document.pdf',
    } as any);
  }

  if (link) {
    formData.append('link', link);
  }

  try {
    const {data} = await API.post('/v1/article/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    Toast.show('Upload started successfully', Toast.LONG);

    return data;
  } catch (error: any) {
    console.log('🚀 ~ uploadArticle: ~ error:', error?.response ?? error);
    Toast.show('Unable to upload article. Please try again.', Toast.LONG);
    throw error;
  }
};
