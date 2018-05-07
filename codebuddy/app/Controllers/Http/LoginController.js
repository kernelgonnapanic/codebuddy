'use strict'

class LoginController {
}

module.exports = LoginController
const User = use('App/Models/User')

class LoginController {
  async redirect({ ally }) {
    await ally.driver('github').redirect()
  }

  async callback({ ally, auth }) {
    try {
      const githubUser = await ally.driver('github').getUser()

      // user details to be saved
      const userDetails = {
        email: githubUser.getEmail(),
        token: githubUser.getAccessToken(),
        login_source: 'github'
      }

      // search for existing user
      const whereClause = {
        email: githubUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return true;
    } catch (error) {
      return false;
    }
  }
}
