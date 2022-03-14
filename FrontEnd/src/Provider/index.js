
export class provider {
    constructor() {

    }
}
export const post = async (url, body, authToken) => {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        const headers = new Headers();
        headers.append('Content-Type', "application/json");

        if (authToken) {
            headers.append('Authorization', `Bearer ${authToken}`);
        }

        options["headers"] = headers;

        const response = await fetch(url, options);
        if (response.status !== 200) throw response;
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: false,
            message: error
        };
    }
}

export const get = async (url, authToken) => {
    try {
        const options = {
            method: 'GET'
        };
        if (authToken) {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.state.authToken}`);
            options["headers"] = headers;
        }
        const response = await fetch(url, options);
        if (response.status !== 200) throw response;
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: false,
            message: error
        };
    }
}





//export default post
//export default get