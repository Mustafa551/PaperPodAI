import React from 'react';
import { check, request, RESULTS } from 'react-native-permissions';

const returnMessage = {
  [RESULTS.BLOCKED]: 'The permission is denied and not rerequestable anymore',
  [RESULTS.DENIED]: 'The permission has been denied',
  [RESULTS.GRANTED]: 'The permission is granted',
  [RESULTS.LIMITED]: 'The permission is limited only some actions are possible',
  [RESULTS.UNAVAILABLE]: 'This feature is not available on this device',
};
interface IResponse {
  message: string;
  status: string;
}
export const usePermission = (
  PERMISSION: unknown,
): { getPermissionStatus: () => Promise<IResponse>; response: IResponse } => {
  const [response, setResponse] = React.useState<IResponse>({
    message: '',
    status: '',
  });
  const getPermissionStatus = async (): Promise<{
    message: string;
    status: string;
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await check(PERMISSION);
        let _response: IResponse;
        if (
          result !== RESULTS.GRANTED &&
          result !== RESULTS.UNAVAILABLE &&
          result !== RESULTS.BLOCKED
        ) {
          const _result = await request(PERMISSION);
          _response = {
            message: returnMessage[_result],
            status: _result,
          };
        } else {
          _response = {
            message: returnMessage[result],
            status: result,
          };
        }
        setResponse(_response);
        resolve(_response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { getPermissionStatus, response };
};
