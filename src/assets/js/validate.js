import * as network from "@/assets/js/network";

export function validateFirstName(name) {
    if (name === undefined) return ""

    if (name.length >= 2) {
        return "";

    } else {
        return "First Name needs to be longer"
    }
}

export function validateLastName(name) {
    if (name === undefined) return ""

    if (name.length >= 2) {
        return "";

    } else {
        return "Last Name needs to be longer"
    }
}

export function validateEmail(email) {
    if (email === undefined) return ""

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,6}$/;
    let match = email.match(pattern);

    if (match) {
        return ""

    } else {
        return "Email address incorrectly formatted"
    }

}


export async function validateEmailNet(context, email) {
    let data = await network.NetworkRequest(context, "/api/v1/email_free", "GET", null, {email: email}, false, true)

    if (data !== false) {
        return ""
    } else {
        return "Email taken"
    }


}

export function validatePassword(password, passwordVal) {
    if (password === undefined || passwordVal === undefined) return ""

    if (password.length >= 4) {
        if (passwordVal !== password) {
            return "Passwords do not match"

        } else {
            return ""

        }
    } else {
        return "Passwords must be longer than 4"

    }
}

export function validateUsername(username) {
    if (username === undefined) return ""

    let match = username.match(/^\w+$/);

    if (!match) {
        return "Username cannot contain spaces or symbols"
    } else {
        return ""
    }
}

export async function validateUsernameNet(context, username) {
    let data = await network.NetworkRequest(context, "/api/v1/username_free", "GET", null, {username: username}, false, true)

    if (data !== false) {
        return ""
    } else {
        return "Username taken"
    }

}


export function validateImage(image) {
    if (image === undefined) return ""

    if (image === null) {
        return "Please select an image";

    } else {
        return "";
    }
}

export async function validateUser(context, user) {
    let res = ""

    if (res === "") res = validateEmail(user.email)
    if (res === "") res = await validateEmailNet(context, user.email)
    if (res === "") res = validateFirstName(user.first_name)
    if (res === "") res = validateLastName(user.last_name)
    if (res === "") res = validatePassword(user.password, user.passwordVal)
    if (res === "") res = validateUsername(user.username)
    if (res === "") res = await validateUsernameNet(context, user.username)
    if (res === "") res = validateImage(user.image)

    if (res !== "") {
        return "Errors Detected. " + res
    } else {
        return ""
    }
}

