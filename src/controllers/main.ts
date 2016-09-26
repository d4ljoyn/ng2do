
let mainController = {
    getIndex: (req, res) => {
        res.render("index"); // Compiles the file named "index" in the views directory (`/views`) using the view engine (Jade).
        // We'll create this Jade file later
    },
    // Allows us to access our Angular templates (more on that later)
    getTemplate: (req, res) => {
        res.render("templates/" + req.params.template);
    },
};
export default mainController;
