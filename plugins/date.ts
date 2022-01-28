import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/fr";

export default defineNuxtPlugin((nuxtApp) => {
    const date = (date) => {
        dayjs.extend(relativeTime);

        return dayjs.unix(date).locale("fr").fromNow();
    };

    return {
        provide: {
            date
        }
    }
})