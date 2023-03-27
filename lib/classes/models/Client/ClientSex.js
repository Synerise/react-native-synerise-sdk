"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSexToString = exports.ClientSexFromString = exports.ClientSex = void 0;
var ClientSex;
(function (ClientSex) {
    ClientSex["NotSpecified"] = "NOT_SPECIFIED";
    ClientSex["Male"] = "MALE";
    ClientSex["Female"] = "FEMALE";
    ClientSex["Other"] = "OTHER";
})(ClientSex || (ClientSex = {}));
exports.ClientSex = ClientSex;
function ClientSexFromString(string) {
    if (string === ClientSex.Male) {
        return ClientSex.Male;
    }
    else if (string === ClientSex.Female) {
        return ClientSex.Female;
    }
    else if (string === ClientSex.Other) {
        return ClientSex.Other;
    }
    return ClientSex.NotSpecified;
}
exports.ClientSexFromString = ClientSexFromString;
function ClientSexToString(clientSex) {
    return clientSex;
}
exports.ClientSexToString = ClientSexToString;
