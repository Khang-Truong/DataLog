import authService from "./auth.service";

export default function authHeader() {
    const user = authService.getCurrentUser();

    if (user && user.access_token) {
        return {Authorization: 'Bearer ' + user.access_token};
    } else {
        return {};
    }
}
