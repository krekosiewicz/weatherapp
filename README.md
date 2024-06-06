# Example .env
```
VITE_APP_WEATHER_API_KEY=<weatherApi.comKey>
HTTP_PORT=<HTTP_PORT-PRODUCTION-ONLY>
HTTPS_PORT=<HTTPS_PORT-PRODUCTION-ONLY>
DOMAIN_NAME=<yourdomain-PRODUCTION-ONLY>
```

# Project setup
It is needed to generate a new `.env` file with the following content:
```
VITE_APP_WEATHER_API_KEY=<weatherApi.comKey>
```
please sign in to [weatherApi.com](https://weatherapi.com/) and get your API key.
If you already have a `.env` file, you can run the app with the following command:

```docker-compose up -d```
or 
```npm install --legacy-peer-deps && npm run dev```
*note: --legacy-peer-deps is required at the moment to work with react 19*

or you can test the app on domain:
- https://zadania-kacper.pl:5713


# project setup production




# Some keywords

REACT 19 RC, redux toolkitq, mobile first full responsivenes
SSR, *SMACSS (Scalable and Modular Architecture for CSS)**,
MOBILE FIRST, Docker, full responsive, selfhosted, custom hooks, eslint rules, vite 


# What is missing
- [ ] no tests
- [ ] no CI
- [ ] CLS issue
- [ ] SSR hydration is not working -> said none of developer that is using Next.js/Remix/Astro :D
- [ ] Containerization improvement, for now it's very rough and naive (similar to SSR, but at least that part works)
- [ ] Prod setup description
