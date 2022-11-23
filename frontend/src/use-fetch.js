import { useState, useCallback } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const REST_PATH = 'http://localhost:3100/'

    const sendRequest = useCallback(async (request, applyData) => {
        setIsLoading(true);
        setError(null);

        if (!request.headers) {
            request.headers = {'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Headers': "*"};
        }

        const APIAddress = REST_PATH + request.url;
        try {
            const response = await fetch(APIAddress, {
                method: request.method ? request.method : 'GET',
                headers: request.headers,
                body: request.body ? JSON.stringify(request.body) : null,
                mode: 'no-cors'
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const responseText = await response.text();
            let data = responseText === "" ? {} : JSON.parse(responseText);
            applyData(data);
        } catch (error) {
            setError(error.message || 'Fetch error.');
        }
        setIsLoading(false);
    });


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useFetch;