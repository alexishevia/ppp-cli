const { spawn } = require('child_process');

/**
 * openInEditor()
 * open a file in the system editor.
 *
 * @param {String} filepath - absolute path to the file
 * @returns {Promise} - resolves when the editor is closed
 */
const openInEditor = filepath => new Promise((resolve, reject) => {
  try {
    const editor = spawn(process.env.EDITOR, [filepath], { stdio: 'inherit' });
    editor.on('close', resolve);
    editor.on('error', reject);
  } catch (err) {
    reject(err);
  }
});

module.exports = openInEditor;
