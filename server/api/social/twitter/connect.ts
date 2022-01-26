import config from '#config'
import { TwitterApi } from "twitter-api-v2";

const userClient = new TwitterApi({
    appKey: config.NUXT_APP_TWITTER_CLIENT_ID,
    appSecret: config.NUXT_APP_TWITTER_SECRET_CLIENT,
});

export default async (req, res) => {
    try {
        const authLink = await userClient.generateAuthLink(
            `${config.SITE_URL}/api/social/twitter/callback`
        );

        return authLink;
    } catch (error) {
        console.log('error', error);
        return { error };
    }
}