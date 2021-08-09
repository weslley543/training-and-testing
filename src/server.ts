import env from './config/env';
import { MongoHelper } from './helpers/MongoHelper';

MongoHelper.connect(env.mongoUrl).then( async () => {
    const app = (await import ('./config/app')).default
    app.listen(env.port, () => {
        console.log(`Server running at port ${env.port}`)
    });
 });
