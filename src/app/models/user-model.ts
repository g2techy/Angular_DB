export const UserRoleID = {
    admin : 1,
    broker : 2
} 

export class UserRole {
    roleID : number;
    roleName : string;
}

export class LoggedInUser {
    userID : number;
    userName : string;
    userDisplayName : string;
    userRoles : UserRole[];
}

export class Login {
    userName : string;
    password : string
}
