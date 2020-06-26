interface BarStatus {
    _id: String;
    date: Date;
    description: string;
    userMail: string;
    nickname: String;
    shopId: string;
    initHour: Date;
    statusImg: string;
    avatarImg: string;
    likeList: [];
    dontLikeList: [];
    userToken: string
  }