import UserRepository from "~~/libs/UserRepository";


export const useTweetEditor = async ({ route, userRepository, tweetRepository }) => {
    const { projectid, id } = route.params;

    const user = await userRepository.getCurrentUser();

    await tweetRepository.getPlannedTweets(user, { projectId: projectid, tweetId: id });

    const tweets = ref([]);

    // const tweetRepository = useTweetRepository({ auth, firestore });

    // await tweetRepository.getPlannedTweets(
    //     {
    //         projectId: projectid,
    //         tweetId: id,
    //     },
    //     (data) => {
    //         tweets.value = data;
    //     }
    // );


    return {
        tweets,
    }
}