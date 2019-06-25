'use strict'

const Category            = use('App/Models/Category');
const Setting             = use( 'App/Models/Setting' );

class GlobalView {
  async handle ( context, next) {
    context.settings      = await Setting.find( 1 );

    const categories      = await Category.all();

    context.view.share({
      categories:           categories.toJSON(),
      settings:             context.settings
    });

    // call next to advance the request
    await next()
  }
}

module.exports = GlobalView
