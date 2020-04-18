module.exports = {
    mongoDbUrl: 'mongodb://simform:simform123@ds035664.mlab.com:35664/simform-practical',
    
    globalVariables: (req, res, next) => {
        res.locals.user = req.user || null;
        next();
    },
    WEB_ORIGIN_LOCAL : 'http://localhost:8889',
    WEB_ORIGIN_LOCALHOST : 'http://localhost:8889',
    ENVIRONMENT :  'development'
};