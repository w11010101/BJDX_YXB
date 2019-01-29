export function formatData(getSha1Data){
    return {
        appId: "1001",
        appVersion: "1.0.0",
        clientIp: "172.16.24.168",
        clientMac: "A4:5E:60:DB:09:0F12",
        clientMark: "2706F35A-62ED-4148-ABC1-5E6218828E00",
        clientType: "andriod",
        dateTime: "20181102101734",
        magic: "2356681452",
        orgCode: "bjmu",
        data:getSha1Data.reqData,
        reqDataHex: 123,
        sign: "24c146106dcac71f167d96fb809a8f397695d443",
        token: getSha1Data.token,
        version: "1.0"
    };
}