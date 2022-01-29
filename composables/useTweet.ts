import TweetRepository from "~~/repositories/TweetRepository";

export const useTweet = () => {
    const route = useRoute();
    const tweetRepository = <TweetRepository>useState('tweetRepository').value;

    const { projectid } = route.params;

    const openPlanner = ref(false);
    const isLoading = ref(false);
    const content = ref('');
    const possibilities = ref(0);
    const date = ref([]);

    const tweets = ref([]);

    const onCreateTweet = async () => {
        isLoading.value = true;

        await tweetRepository.createTweet({
            projectId: projectid,
            content: content.value,
            startAt: date.value[0],
            endAt: date.value[0],
        });

        content.value = '';
        date.value = [];
        possibilities.value = 0;
        openPlanner.value = false;

        isLoading.value = false;
    }

    const getTweets = async () => {
        await tweetRepository.getTweets(projectid as string, (data) => {
            tweets.value = data;
        })
    }

    return {
        openPlanner,
        content,
        possibilities,
        date,
        tweets,
        isLoading,
        onCreateTweet,
        getTweets,
    }
}