import * as line from '@line/bot-sdk';
import * as functions from "firebase-functions";
import { regionFunctions } from '../../helper';

require('dotenv').config();

const config = {
  channelAccessToken: functions.config().line.channel_access_token,
  channelSecret: functions.config().line.channel_secret
};

const client = new line.Client(config);

exports.checkFirestore = regionFunctions.firestore.document('/mail/{documentId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    console.log("🚀 ~ file: index.ts:20 ~ .onCreate ~ snap.data()", functions.config())
    const uname = newValue.uname;
    const message =
      `【${uname}様よりお問合せがありました。】
    メールアドレス：${newValue.email}
    要件： ${newValue.content}
    ご対応よろしくお願いいたします。
    `
    // lineで送信
    client.broadcast({
      type: "text",
      text: message
    }).then(data => console.log(data))
      .catch(e => console.log(e))
})