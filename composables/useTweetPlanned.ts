import TweetRepository from "~~/repositories/TweetRepository";

export const useTweetPlanned = ({ onSuccess }) => {
    const route = useRoute();
    const tweetRepository = <TweetRepository>useState('tweetRepository').value;

    const tweets = ref([]);
    const tweet = ref({});

    const { projectid, id } = route.params;

    const getTweets = async () => {
        tweetRepository.getTweetsById(projectid as string, id as string, (model) => {
            const { dataModel, tweetModel } = model;

            tweets.value = dataModel;
            tweet.value = tweetModel;
        });
    }

    const onPublish = (tweet) => {
        console.log('onPublish');
    }

    const onDelete = async (tweet) => {
        await tweetRepository.deleteTweetContent(projectid as string, tweet.id);

        onSuccess('Notification', 'Ce contenu a bien été supprimé.');
    }

    return {
        tweet,
        tweets,
        getTweets,
        onPublish,
        onDelete,
    }
}