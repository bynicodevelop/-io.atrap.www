import TweetRepository from "~~/repositories/TweetRepository";

export const useTweetPlanned = () => {
    const route = useRoute();
    const tweetRepository = <TweetRepository>useState('tweetRepository').value;

    const tweets = ref([]);

    const { projectid, id } = route.params;

    const getTweets = async () => {
        tweetRepository.getTweetsById(projectid as string, id as string, (data) => {
            tweets.value = data;
        });
    }

    const onPublish = (tweet) => {
        console.log('onPublish');
    }

    return {
        tweets,
        getTweets,
        onPublish,
    }
}