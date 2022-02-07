export const useShortUrl = () => {
    const route = useRoute();

    console.log(route.params.id);
};