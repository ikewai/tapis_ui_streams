import { useQuery, QueryObserverOptions } from 'react-query';
import { details } from 'tapis-api/workflows/identities';
import { Workflows } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';

const useDetails = (
  params: Workflows.GetIdentityRequest,
  options: QueryObserverOptions<Workflows.RespIdentity, Error> = {}
) => {
  const { accessToken, basePath } = useTapisConfig();
  const result = useQuery<Workflows.RespIdentity, Error>(
    [QueryKeys.details, params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => details(params, basePath, accessToken?.access_token || ''),
    {
      ...options,
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useDetails;
