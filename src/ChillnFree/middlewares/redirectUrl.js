const saveRedirectUrlToCookie = (req, res, next) => {
   if (!req.user) {
      console.log('CREATE COOKIE')
      res.cookie('redirectUrl', req.originalUrl)
   }
   else {
      console.log('DELETE COOKIE')
      res.clearCookie("redirectUrl")
   }
   next()
}

module.exports = {
   saveRedirectUrlToCookie
}