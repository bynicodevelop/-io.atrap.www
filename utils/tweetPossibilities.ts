import { isEmpty } from "lodash";
import { evaluate } from "mathjs";

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