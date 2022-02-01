import { isEmpty } from "lodash";
import { evaluate } from "mathjs";
import spin from "@bob6664569/content-spinner";

const charRate = 280;

const credit = " @byatrap.io";
const creditLength = credit.length;

const maxChar = charRate - creditLength;

export const generateTweets = (content: string, possibilities: number) => {
    const tweets = [];

    const security = 2000;
    let i = 0;

    while (tweets.length < possibilities && security > i) {
        i++;

        if (i == security) {
            console.log("limited");
        }

        const tweet = spin(content);

        if (tweets.findIndex(t => t.tweet === tweet) === -1) {
            tweets.push({
                tweet,
                excluded: tweet.length > maxChar,
            });
        }
    }

    return tweets;
}

export const tweetPossibilities = (
    value: string,
    possibilities: number
): number => {
    if (isEmpty(value)) {
        return 0;
    }

    let result = value
        .split("")
        .filter((item) => item == "{" || item == "}" || item == "|")
        .map((char) => {
            if (char == "{") {
                return "(1";
            }
            if (char == "}") {
                return ")";
            }
            if (char == "|") {
                return "+1";
            }
            return char;
        })
        .join("");
    if (isEmpty(result)) {
        return 1;
    }
    const convertStringToMath = {
        ")(": ")*(",
        "+1(": "+(",
        "1(": "1+(",
    };

    result = Object.keys(convertStringToMath).reduce((acc, key) => {
        return acc.replace(key, convertStringToMath[key]);
    }, result);

    try {
        possibilities = evaluate(result);
    } catch (error) { }

    return possibilities;
};