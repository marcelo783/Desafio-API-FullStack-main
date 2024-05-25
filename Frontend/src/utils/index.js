export const useUtils = () => {
    function jwtToJson(token) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    return {
        jwtToJson
    }
}