import IUser from "./IUser";

interface IUserState {
    user: IUser,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}
export default IUserState;