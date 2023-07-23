# Musify App

Musify is an application for searching music and organizing your music library. Musify using [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

## Features

- Add or edit your playlists.
- See your recently played tracks and your top artists.
- Follow and unfollow playlists and artists.
- Search tracks, albums, artists and playlists.

## Try it out

https://musify-react-app.netlify.app/

**Warning:** Spotify requires users to authenticate with a valid Spotify Premium subscription.

**Warning:** While app in development mode, Spotify does not give access to all users. While Spotify process my request you can run application localy or [check screenshots](https://drive.google.com/drive/folders/1z9DaT7D3qhGQ4wdKPivVvj0fqeB7U0Hu).

## How to Run locally

First you need a [Spotify Client ID](https://developer.spotify.com/dashboard/applications).

```bash
$ git clone https://github.com/VadimGordeev/musify-app
$ cd musify-app
$ npm install
```

You will have to define a '.env' file and set the following variables:

```
VITE_SPOTIFY_CLIENT_ID="YOUR_CLIENT_ID"
VITE_BASE_URL=http://localhost:5173
```

Now run:

```bash
$ npm run start
```

and visit http://localhost:5173.
