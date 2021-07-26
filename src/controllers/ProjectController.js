
class ProjectController {
    async show(req, res) {
        return res.json({
            user: req.userId
        });
    }
}

export default ProjectController;