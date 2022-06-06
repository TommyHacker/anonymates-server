## Features

- ### Class Article

  Setup
  <hr>
  const Article = require("./models/ArticleSchema);

- Article.findAll( )

  - returns array of Article class objects.

- Article.findOne( id )

  - returns single Article class object with given id || false if not found.

- article.save( )
  - updates current defined article with any modified data. If its a new article, it will be appended to the article array in storage.json..
