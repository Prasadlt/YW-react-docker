import { API } from "../api/Api-Endpoint";

const logError = async (error) => {
    const baseURL = process.env.REACT_APP_API_BASE_URI;

    try {
        const response = await fetch(baseURL+API.exceptionLogging.logException+'?exception='+error, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: error.message }),
        });

        if (!response.ok) {
           // console.log('Failed to log error:', response.status);
        }
    } catch (error) {
        //console.log('Failed to log error:', error);
    }
};

export { logError };