

export interface RegisterUserData {

    PersonName: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };

    userEmail: {
        emailAddress: string;
    };

    password: string;
    confirmPassword: string
}


export interface ApiResponse {
    message: string;
    UserId? : number;
}