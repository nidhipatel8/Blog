'use strict'

const { Command }             = require('@adonisjs/ace');
const User                    = use( 'App/Models/User' );

class SetAdmin extends Command {
  static get signature () {
    return 'set:admin'
  }

  static get description () {
    return 'Give a user admin privileges by providing their ID.'
  }

  async handle (args, options) {
    this.info('Please wait while the user is being updated!');

    const username            = await this.ask( 
      "What is the user's username?"
    );

    const user_info           = await User.findBy( 'username', username );
    user_info.is_admin        = 2;

    try{
      await user_info.save();
      this.success( 'Success! This user is now an admin.' );
    }catch(err){
      this.error( err );
    }
  }
}

module.exports = SetAdmin
