import TweetRepository from "~~/repositories/TweetRepository";

export const useTweetPlanned = ({ onSuccess }) => {
    const route = useRoute();
    const tweetRepository = <TweetRepository>useState('tweetRepository').value;

    const tweets = ref([]);

    const { projectid, id } = route.params;

    const getTweets = () => tweetRepository.getTweetsById(projectid as string, id as string, (model) => {
        tweets.value = model;
    })

    const onPublish = async (tweet) => {
        await tweetRepository.sendTweet(projectid as string, tweet.id as string);
    }

    const onDelete = async (tweet) => {
        await tweetRepository.deleteTweetContent(projectid as string, tweet.id);

        onSuccess('Notification', 'Ce contenu a bien été supprimé.');
    }

    return {
        tweets,
        getTweets,
        onPublish,
        onDelete,
    }
}