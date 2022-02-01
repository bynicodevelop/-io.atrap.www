import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/fr";

export default defineNuxtPlugin((nuxtApp) => {
    const isHappened = (date) => dayjs.unix(date).isBefore(dayjs());

    const humanize = (date) => {
        dayjs.extend(relativeTime);

        return dayjs.unix(date).locale("fr").fromNow();
    };

    return {
        provide: {
            date: {
                humanize,
                isHappened,
            }
        }
    }
})