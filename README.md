# rsilathip site
this repository is include rsilathip migration from Angular1 to React due to legacy code of Angular and this repository create on legacy php service host.


## Installation
- This repository use wordpress as backend, you need to extract wordpress.tar to make it work
```
npm run build
```
- copy `server` folder to host
- copy `out` folder to `server/v2`


## Development
Seed file `seed.sql` to your mysql db
### UI
- create env from env.example and fill information
```
npm install
npm run watch // compile typescript
npm run dev // start dev server
```
- goto `localhost:3000`


### Wordpress
> NOTE: Warning there is no version control support for wordpress, every conflict must solve manually
- extract wordpress.tar
- start server with any php stack ( LAMP, XAMP ) by put `server` folder to root of php server 