import { useQuery } from 'react-query';
import { list } from 'tapis-api/streams/variables';
import { Streams } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';

const useList = (params: Streams.ListVariablesRequest) => {
  const { accessToken, basePath } = useTapisConfig();
  const result = useQuery<Streams.RespListVariables, Error>(
    [QueryKeys.list, params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => list(params, basePath, accessToken?.access_token || ''),
    {
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useList;
