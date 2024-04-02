import { ModelVersion, SparkClient, ChatMessage } from 'spark-node-sdk';

// @see: https://github.com/greywen/spark-node
const APPID = '';
const APISecret = '';
const APIKey = '';

const client = new SparkClient(APPID, APIKey, APISecret);

const model = ModelVersion.V3_5;
const messages = [
  // ChatMessage.fromUser('1+1=?'),
  // ChatMessage.fromAssistant('1+1=3'),
  ChatMessage.fromUser('你是谁'),
];

let contents = '';
const generator = await client.chatAsStreamAsync(model, messages);
for await (const message of generator) {
  console.log(message.text);
  contents += message.text;
}

console.log(contents);
