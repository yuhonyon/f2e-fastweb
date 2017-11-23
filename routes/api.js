const router = require('koa-router')();
const Package = require('../controllers/package');
const Project = require('../controllers/project');
const Build = require('../controllers/build');
router.prefix('/api');
router.get('/packages',Package.getALLPackage);
router.get('/package',Package.getPackage);

router.get('/projects',Project.getProjectList);
router.get('/project/:id',Project.getProject);
router.post('/project',Project.saveProject);
router.put('/project/:id',Project.modifyProject);
router.del('/project/:id',Project.deleteProject);

module.exports = router;
