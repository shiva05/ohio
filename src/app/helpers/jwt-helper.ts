import * as JwtDecode from 'jwt-decode';

export const parseAuthJwt = function (jwtPayloadResponse: any) {
    const jwtObj: any = JwtDecode(jwtPayloadResponse);
    const jwtPayload = {
        system_key: jwtObj.system_key,
        person_key: jwtObj.person_key,
        first_name: jwtObj.first_name,
        last_name: jwtObj.last_name,
        exp: jwtObj.exp
    };
    return jwtPayload;
};

export const parseClaimsJwt = function (jwtPayloadResponse: any) {
    const jwtObj: any = JwtDecode(jwtPayloadResponse);

    const jwtPayload = {
        uuid: jwtObj.uuid,
        app_id: jwtObj.app_id,
        org_id: jwtObj.org_id,
        aud_id: jwtObj.aud_id
    };
    return jwtPayload;
};
