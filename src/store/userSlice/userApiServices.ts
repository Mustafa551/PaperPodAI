import { API } from '../../api';
import Toast from 'react-native-simple-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const changePassword = async (userId: string, oldPassword: string, newPassword: string, accessToken: string) => {
  try {
    // Call API for changePassword logic
    const response = await API.post('/auth/password', { userId, oldPassword, newPassword, accessToken });
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
  const { data } = await API.get(`/v1/article/public-article`);
  console.log("🚀 ~ getPublicArticles ~ data:", data)
  return data;
};
export const getArticlesUuid = async (uuid: string) => {
  const { data } = await API.get(`/v1/article/id/${uuid}`);
  console.log("🚀 ~ getPublicArticles ~ data:", data)
  return data;
};

export type ArticleListItem = {
  uuid?: string;
  title?: string;
  fileName?: string;
  audioFilePath?: string;
  pdfFilePath?: string;
  convertingStatus?: string;
  type?: string;
  createdAt?: string;
};

export type MyArticleParams = {
  sort?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

export type MyArticleResponse = {
  articles?: ArticleListItem[];
  total?: number;
  count?: number;
  offset?: number;
  limit?: number;
  [key: string]: unknown;
};

const normalizeArticles = (payload: unknown): ArticleListItem[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload as ArticleListItem[];
  }

  const fromPayload = payload as Record<string, any>;

  if (Array.isArray(fromPayload.articles)) {
    return fromPayload.articles as ArticleListItem[];
  }

  if (Array.isArray(fromPayload.data?.items)) {
    return fromPayload.data.items as ArticleListItem[];
  }

  if (Array.isArray(fromPayload.data)) {
    return fromPayload.data as ArticleListItem[];
  }

  if (Array.isArray(fromPayload.items)) {
    return fromPayload.items as ArticleListItem[];
  }

  return [];
};

export const getMyArticles = async (
  params: MyArticleParams = {},
): Promise<MyArticleResponse> => {
  const { sort = 'desc', limit = 10, offset = 0 } = params;

  const { data } = await API.get('/v1/article/my-article', {
    params: { sort, limit, offset },
  });

  const articles = normalizeArticles(data);

  return {
    ...data,
    articles,
    limit: data?.limit ?? limit,
    offset: data?.offset ?? offset,
  };
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

export const uploadArticle = async ({ file, link }: UploadArticlePayload) => {
  if (!file && !link) {
    throw new Error('Either a PDF file or a link is required for upload.');
  }

  if (file && link) {
    throw new Error('Please provide either a PDF file or a link, not both.');
  }

  const formData = new FormData();

  let fileToUpload = file ?? null;
  let temporaryFilePath: string | null = null;

  try {
    if (!fileToUpload && link) {
      const downloaded = await downloadPdfFromLink(link);
      fileToUpload = downloaded.file;
      temporaryFilePath = downloaded.path;
    }

    if (!fileToUpload) {
      throw new Error('No PDF file found for upload.');
    }

    const fileUri =
      Platform.OS === 'ios' && fileToUpload.uri.startsWith('file://')
        ? fileToUpload.uri.replace('file://', '')
        : fileToUpload.uri;

    formData.append('pdf', {
      uri: fileUri,
      type: fileToUpload.type ?? 'application/pdf',
      name: fileToUpload.name ?? 'document.pdf',
    } as any);

    const { data } = await API.post('/v1/article/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    Toast.show('Upload started successfully', Toast.LONG);
    console.log("data data data@", data);

    return data;
  } catch (error: any) {
    console.log('🚀 ~ uploadArticle: ~ error:', error?.response ?? error);
    Toast.show('Unable to upload article. Please try again.', Toast.LONG);
    throw error;
  } finally {
    if (temporaryFilePath) {
      try {
        await RNFS.unlink(temporaryFilePath);
      } catch (cleanupError) {
        console.warn('Failed to remove temporary PDF file:', cleanupError);
      }
    }
  }
};

const sanitizeFileName = (source: string): string => {
  try {
    const decoded = decodeURIComponent(source);
    const lastSegment = decoded.split('/').filter(Boolean).pop() ?? '';
    const cleanSegment = lastSegment.split(/[?#]/)[0];
    if (cleanSegment.toLowerCase().endsWith('.pdf')) {
      return cleanSegment;
    }
  } catch (error: unknown) {
    console.warn('Unable to derive file name from source, falling back to default.', error);
  }

  return `article-${Date.now()}.pdf`;
};

const downloadPdfFromLink = async (
  url: string,
): Promise<{ file: UploadArticleFile; path: string }> => {
  const fileName = sanitizeFileName(url);
  const cacheDirectory =
    (Platform.OS === 'android' ? RNFS.CachesDirectoryPath : RNFS.TemporaryDirectoryPath) ??
    RNFS.DocumentDirectoryPath;
  const destinationPath = `${cacheDirectory}/${fileName}`;

  const downloadResult = await RNFS.downloadFile({
    fromUrl: url,
    toFile: destinationPath,
  }).promise;

  if (downloadResult.statusCode && downloadResult.statusCode >= 400) {
    throw new Error('Failed to download PDF from the provided link.');
  }

  const fileInfo = await RNFS.stat(destinationPath);

  if (!fileInfo.isFile()) {
    throw new Error('Downloaded resource is not a valid PDF file.');
  }

  return {
    file: {
      uri: `file://${destinationPath}`,
      type: 'application/pdf',
      name: fileName,
      size: Number(fileInfo.size),
    },
    path: destinationPath,
  };
};
