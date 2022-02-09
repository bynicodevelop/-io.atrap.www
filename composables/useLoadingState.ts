export const useLoadingState = () => {
    enum status {
        Loading,
        Error,
        Finished,
    }

    const loading = ref(status.Finished);

    const onStart = () => {
        console.log('onStart');

        loading.value = status.Loading;
    }

    const onSuccess = () => {
        console.log('onSuccess');
        loading.value = status.Finished;
    }

    const onError = () => {
        console.log('onError');
        loading.value = status.Error;
    }

    return {
        loading,
        onStart,
        onSuccess,
        onError,
    }
}