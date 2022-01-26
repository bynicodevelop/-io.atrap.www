export interface TwitterConnecterInteface {
    projectId: string;
    accessToken: string;
    accessSecret: string;
    userId: string;
    screenName: string;
    profileImageUrl: string;
    name: string;
}

export class TwitterConnectModel {
    accessToken: string;

    accessSecret: string;

    userId: string;

    screenName: string;

    profileImageUrl: string;

    name: string;

    constructor(data: TwitterConnecterInteface) {
        this.accessToken = data.accessToken;
        this.accessSecret = data.accessSecret;
        this.userId = data.userId;
        this.screenName = data.screenName;
        this.profileImageUrl = data.profileImageUrl;
        this.name = data.name;
    }

    static formJson(data: TwitterConnecterInteface): TwitterConnectModel {
        return new TwitterConnectModel(data);
    }

    toJson(): any {
        return {
            accessToken: this.accessToken,
            accessSecret: this.accessSecret,
            userId: this.userId,
            screenName: this.screenName,
            profileImageUrl: this.profileImageUrl,
            name: this.name
        };
    }
}