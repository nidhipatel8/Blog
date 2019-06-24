'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title:            'This is an example title',
    img_url:          '/uploads/post.jpg',
    post_content:     `<p>Dummy content.</p>
                       <p>Dummy content.</p>
                       <p>Dummy content.</p>
                       <p>Dummy content.</p>
                       <p>Dummy content.</p>
                       <p>Dummy content.</p>`,
    uid:              1,
    cid:              1
  }
})

