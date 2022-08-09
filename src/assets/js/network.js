import * as utils from "./utility";

export async function login(context, user) {

    const res = await fetch(context._backend_url + "/api/token/", {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(user)
    })

    const status = res.status;

    if (status === 200) {
        const data = await res.json();

        utils.setAccessKey(context, data.access);
        utils.setRefreshKey(context, data.refresh);

        console.log("Login Succeeded");
        return true;
    } else {
        return false;
    }

}

export async function refresh(context) {

    let data = {
        refresh: utils.getRefreshKey(context)
    }

    const res = await fetch(context._backend_url + "/api/token/refresh/", {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(data)
    })

    const status = res.status;

    if (status === 200) {
        const data = await res.json();
        console.log(data)

        utils.setAccessKey(context, data.access);
        utils.setRefreshKey(context, data.refresh);

        console.log("Access Refreshed");
        return true;
    } else {
        return false;
    }

}

export async function checkStatus(context, status, data) {
    if (status === 200) {

        if (data === "False") {
            return false;
        }

        return data;
    } else if (status === 401) {

        let refreshed = await refresh(context);

        if (refreshed) {
            return true;
        } else {
            await utils.redirectToLogin();
            return false;
        }

    } else {
        return false;
    }
}

export async function GetFetch(context, urlEnd, params = null) {
    let url = context._backend_url + urlEnd;

    if (params === null) params = "{}";

    const res = await fetch(url + utils.params(params), {
        "method": 'GET',
        "headers": {
            'Authorization': 'Bearer ' + utils.getAccessKey(context),
        }
    });

    let result = false;

    try {
        const data = await res.json();
        const status = res.status;

        result = await checkStatus(context, status, data);
    } catch (e) {
        console.log(e)
        return false;
    }

    if (result === true) {
        return await GetFetch(context, urlEnd, params)
    } else {
        return result
    }
}


export async function PostFetch(context, urlEnd, body = null, params = null) {
    let url = context._backend_url + urlEnd;

    if (body === null) body = "{}";
    if (params === null) params = "{}";

    const res = await fetch(url + utils.params(params), {
        "method": 'POST',
        "headers": {
            'Authorization': 'Bearer ' + utils.getAccessKey(context),
        },
        body: JSON.stringify(body)
    });

    let result = false;

    try {
        const data = await res.json();
        const status = res.status;

        result = await checkStatus(context, status, data);
    } catch (e) {
        console.log(e)
        return false;
    }

    if (result === true) {
        return await PostFetch(context, urlEnd, body, params)
    } else {
        return result
    }
}

export async function UploadPost(context, urlEnd, formData, params = null) {
    let url = context._backend_url + urlEnd;

    if (params === null) params = "{}";

    const res = await fetch(url + utils.params(params), {
        "method": 'PUT',
        "headers": {
            'Authorization': 'Bearer ' + utils.getAccessKey(context),
            'Content-Disposition': 'attachment',
        },
        body: formData
    }).catch((error) => {
        console.log(error)
        return false
    });

    try {
        const data = await res.text();
        const status = res.status;

        let result = await checkStatus(context, status, data);

        if (result === true) {
            return await UploadPost(context, urlEnd, formData, params)
        } else {
            return result
        }
    } catch (e) {
        // Error already logged
        return false
    }

}