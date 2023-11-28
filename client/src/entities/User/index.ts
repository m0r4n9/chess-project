export type { UserSchema, User } from './model/types/User.ts';
export { userReducer, userActions } from './model/slice/userSlice.ts';
export { getUserData } from './model/selectors/getUserData/getUserData.ts';