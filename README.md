# The to-do app with Box as backend

[![Run with Postverta badge](http://postverta.io/badge.svg)](http://postverta.io/direct/postverta/box-start)

This app is a twist of the simple to-do app which stores all to-do items in memory. Here, we use the Box API to
store all to-do items in your Box account, so it can stay there until the end of the world. How cool is that?

## Run the app

To run the app, you will need your Box developer credentials, which include a client ID, a client secret, and
a developer token. First, register a Box app at Box's [developer console](https://app.box.com/developers/console).
Choose `Custom App` as your application type and `OAuth 2.0 with JWT` as your authentication method.

After the app is created, go to its configuration to find your credentials:
![How to find your credentials](https://i.imgur.com/x6I3K2I.png)

If no developer token is available, generate one. Note that each developer token is valid only for 60 minutes.

Enter the client ID, client secret, and developer token to the `.env` file, and you should be good to go!

Add a few to-do items, and go to your Box account to see a new directory
`todos` created with all your to-do items inside!

## Next step

Try to extend the app so that it takes both a name and a more detailed body of
a to-do item, and stores it in Box as a text file.

The developer token is only valid for 60 minutes so to be really useful, we
need to convert the app to use OAuth.
