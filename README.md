
[website](https://wd7512.github.io/home/)

## Build and Deploy Instructions

1. Run `npm install` to install all dependencies.

2. To start the development server, run:
	```
	npm run dev
	```

3. To build the app for production, run:
	```
	npm run build
	```

4. If you want to deploy to GitHub Pages, make sure `gh-pages` is installed and configured in your `package.json`. Then run:
	```
	npm run deploy
	```

This will build and deploy your app to GitHub Pages at:

```
https://wd7512.github.io/home/
```

If you get an error running `npm run deploy`, try running:

```
npm run
```

to list all available scripts and verify "deploy" is present.

If it’s missing, double-check you saved the edited package.json and are in the correct project folder.
