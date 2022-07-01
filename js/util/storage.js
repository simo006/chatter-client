const userDataKey = 'userData';

export function saveUserData(data) {
    return sessionStorage.setItem(userDataKey, JSON.stringify(data));
}

export function hasUserData() {
    return sessionStorage.hasOwnProperty(userDataKey);
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(userDataKey));
}

export function removeUserData() {
    sessionStorage.removeItem(userDataKey);
}