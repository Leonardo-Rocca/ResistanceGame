let headers: {
    'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
};

type Methods = 'DELETE' | 'POST' | 'GET' | 'PUT' | 'OPTIONS'

export const myFetch = (fetchUrl:string , method: Methods, body?: any) => {
    const props: { method: Methods, credentials?: "include", headers: any, body?: any } = {
        method: method,
        headers: headers
    };

    if (body)
        props.body = JSON.stringify(body);
    return fetch(fetchUrl,props);
};