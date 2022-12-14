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
    console.log("π ~ file: index.ts:20 ~ .onCreate ~ snap.data()", functions.config())
    const uname = newValue.uname;
    const message =
      `γ${uname}ζ§γγγεεγγγγγΎγγγγ
    γ‘γΌγ«γ’γγ¬γΉοΌ${newValue.email}
    θ¦δ»ΆοΌ ${newValue.content}
    γε―ΎεΏγγγγγι‘γγγγγΎγγ
    `
    // lineγ§ιδΏ‘
    client.broadcast({
      type: "text",
      text: message
    }).then(data => console.log(data))
      .catch(e => console.log(e))
})