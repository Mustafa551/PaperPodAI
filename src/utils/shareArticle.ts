import { Alert, Share } from 'react-native';

type ShareableArticle = {
  fileName?: string;
  title?: string;
  pdfFilePath?: string;
  audioFilePath?: string;
};

export const shareArticleFile = async (item: ShareableArticle) => {
  try {
    const shareUrl = item?.audioFilePath ?? item?.pdfFilePath;

    if (!shareUrl) {
      Alert.alert('Nothing to share', 'File URL is not available yet.');
      return;
    }

    const shareTitle = item?.fileName ?? item?.title ?? 'Shared file';

    await Share.share(
      {
        title: shareTitle,
        message: `${shareTitle}\n${shareUrl}`,
        url: shareUrl,
      },
      {
        dialogTitle: 'Share file',
        subject: shareTitle,
      },
    );
  } catch (error) {
    console.warn('Share file error', error);
    Alert.alert('Share failed', 'Could not open the share dialog.');
  }
};
