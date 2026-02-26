// paths_config.jsx

const path = require('path');

// Dynamically define the paths based on the Script_AI root directory
const ROOT_DIR = path.resolve(__dirname, '../..'); // Adjust according to your folder structure

const paths = {
    assets: path.join(ROOT_DIR, 'assets'),
    components: path.join(ROOT_DIR, 'src', 'components'),
    config: path.join(ROOT_DIR, 'config'),
    // Add more paths as needed
};

module.exports = paths;