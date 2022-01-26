import config from '#config'
import { useCookie, useQuery, sendRedirect } from 'h3'
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
  const query = await useQuery(req)

  const cookie = useCookie(req, 'social-connect');

  const { oauth_token, oauth_verifier } = <{ oauth_token: string, oauth_verifier: string }>query;

  const { twitterToken, redirectSocialUrl } = JSON.parse(
    cookie ?? "{}"
  );

  if (!oauth_token || !oauth_verifier || !twitterToken || !redirectSocialUrl) {
    return { error: 'Invalid request' };
  }

  const client = new TwitterApi({
    appKey: config.NUXT_APP_TWITTER_CLIENT_ID,
    appSecret: config.NUXT_APP_TWITTER_SECRET_CLIENT,
    accessToken: oauth_token,
    accessSecret: twitterToken,
  });

  const {
    accessToken,
    accessSecret,
    userId,
    screenName,
    client: loggedClient,
  } = await client.login(oauth_verifier);

  const user = await loggedClient.v2.me({
    "user.fields": "profile_image_url",
  });

  const {
    data: { profile_image_url, name },
  } = user;

  const credentials = {
    accessToken,
    accessSecret,
    userId,
    screenName,
    profile_image_url,
    name,
  }

  const explodedRedirectSocialUrl = redirectSocialUrl.split('#')

  const queryString = new URLSearchParams(credentials).toString()

  await sendRedirect(res, `${explodedRedirectSocialUrl[0]}?${queryString}#${explodedRedirectSocialUrl[1]}`);
}