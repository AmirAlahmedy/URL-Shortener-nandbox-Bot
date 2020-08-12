"use strict";
const NandBox = require("./src/NandBox");
const Nand = require("./src/NandBoxClient");
const { default: Axios } = require("axios");
const NandBoxClient = Nand.NandBoxClient;

const TOKEN = "90091941563939053:0:eoycuC1ZYBY5kDc6yS8MnhpZmunZp9";
const config = {
    URI: "wss://w1.nandbox.net:5020/nandbox/api/",
    DownloadServer: "https://w1.nandbox.net:5020/nandbox/download/",
    UploadServer: "https://w1.nandbox.net:5020/nandbox/upload/"
}


var client = NandBoxClient.get(config);
var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to the server successfuly 
    api = _api;
    console.log("Authenticated and Connected Successfully!");
}

const IS_GD_SHORTEN_URL = "https://is.gd/create.php?format=simple&url=";
nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");

    if (incomingMsg.isTextMsg()) {
        let chatId = incomingMsg.chat.id; // get your chat Id

        // shorten and send the url 
        getShortURL(chatId, incomingMsg.text);
    }

}
function getShortURL(chatId, longURL){
    let url = IS_GD_SHORTEN_URL + longURL;
    let shortURLReply = "";
    Axios.get(url).then(response => {
        shortURLReply = response.data;
        api.sendText(chatId, shortURLReply);
    }).catch( error => {
        console.error(error.data);
    });
}


// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {}
nCallBack.onClose = () => console.log("ONCLOSE");
nCallBack.onError = () => console.log("ONERROR");
nCallBack.onChatMenuCallBack = chatMenuCallback => { }
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onUserJoinedBot = user => { }
nCallBack.onChatMember = chatMember => { }
nCallBack.onChatAdministrators = chatAdministrators => { }
nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => { }
nCallBack.onUserDetails = user => { }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { }

client.connect(TOKEN, nCallBack);