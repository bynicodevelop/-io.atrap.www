import TweetRepository from "~~/repositories/TweetRepository";

export const useTweet = ({ onSuccess }) => {
    const route = useRoute();
    const tweetRepository = <TweetRepository>useState('tweetRepository').value;

    const { projectid, id } = route.params;

    const tweetToDelete = ref(null);
    const openPlanner = ref(false);
    const isLoading = ref(false);
    const content = ref('');
    const possibilities = ref(0);
    const date = ref([]);

    const tweets = ref([]);
    const tweet = ref({});

    const onCreateTweet = async () => {
        isLoading.value = true;

        await tweetRepository.createTweet({
            projectId: projectid,
            content: content.value,
            startAt: date.value[0],
            endAt: date.value[1],
        });

        content.value = '';
        date.value = [];
        possibilities.value = 0;
        openPlanner.value = false;

        isLoading.value = false;
    }

    const getTweetSelected = async () => {
        tweetRepository.getTweetById(projectid as string, id as string, (data) => {
            tweet.value = data;
        })
    }

    const getTweets = async () => {
        await tweetRepository.getTweets(projectid as string, (data) => {
            tweets.value = data;
        })
    }

    const onChangePublishStatus = async (tweet: any) => {
        await tweetRepository.updateTweet(projectid as string, tweet.id, {
            publishStatus: !tweet.publishStatus,
        });

        onSuccess('Notification', 'Votre tweet a bien été mis à jour.');
    }

    const onDelete = async (tweet: any) => {
        await tweetRepository.deleteTweet(projectid as string, tweet.id);

        onSuccess('Notification', 'Votre tweet avec ces différents contenus ont bien été supprimés.');

        tweetToDelete.value = null;
    }

    return {
        openPlanner,
        content,
        possibilities,
        date,
        tweet,
        tweets,
        isLoading,
        tweetToDelete,
        onCreateTweet,
        getTweets,
        onChangePublishStatus,
        getTweetSelected,
        onDelete,
    }
}