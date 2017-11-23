const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index',{title: 1});
});


module.exports = router;
