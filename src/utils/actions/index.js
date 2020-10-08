export function setUser(user) {
  return { type: 'SET_USER', payload: user };
}
export function resetUser() {
  return { type: 'RESET_USER' };
}
export function setProfileImage(profile_photo) {
  return { type: 'SET_PROFILE', payload: profile_photo };
}
