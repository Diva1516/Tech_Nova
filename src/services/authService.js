import users from '../data/users';

export const authService = {
  getUserProfile: (userId) => {
    return new Promise((resolve, reject) => {
      const userProfile = users.find((u) => u.id === userId);
      if (userProfile) {
        resolve(userProfile);
      } else {
        reject(new Error('Profile not found'));
      }
    });
  }
};
export default authService;
