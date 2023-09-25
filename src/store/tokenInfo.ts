import {createSharedComposable, useStorage} from '@vueuse/core';
import * as _ from 'lodash';

const useTokenStore = createSharedComposable(() => {
        const tokenName = useStorage<string>('token-name', null);
        const tokenValue = useStorage<string>('token-value', null);


        const setToken = (_tokenName: string, _tokenValue: string) => {
            tokenName.value = _tokenName;
            tokenValue.value = _tokenValue;
        };

        const clearToken = () => {
            tokenName.value = null;
            tokenValue.value = null;
        };


        return {tokenName, tokenValue, setToken, clearToken};
    },
);

export default useTokenStore;
