export type SignUpData = {
    email: string,
    password: string,
    nickname: string,
    gender: string,
};

export type SignInData = Omit<SignUpData, 'nickname' | 'gender'>;


export type MyData = {
    userId: string,
    nickname: string,
    gender: string,
    bio: string,
    imageUrl: string,
    locationCountry: string,
};

export type User = Omit<MyData, 'bio' | 'gender'>;

export type UserProfileData = MyData & {
    likeScore: number,
    hasLikedOrDisliked: boolean,
}


export type SendingLetterData = {
    receiverId: string,
    content: string,
};


export type LetterData = {
    letterId: string,
    senderId: string,
    senderNickName: string,
    receiverId: string,
    receiverNickName: string,
    content: string,
    createdAt: string,
    deliveredAt: string;
};