import { SparkChat, Spark } from 'spark-nodejs';

const spark = new Spark({
  secret: 'MTg4NWQyNGM2NTZkY2Y5ZDE0MWJkZDQ3',
  key: '411a904c4730d4685865b37c855622bc',
  appid: '7597e4ad',
});

const url = await spark.generateUrl();

const app = new SparkChat({ url });
app.chat({ content: 'who are you' }); // chat 参数与上文中的chat参数一致
