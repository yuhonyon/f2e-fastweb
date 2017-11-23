const execSync = require('child_process').execSync;
const cmd = function(command) {
  try {
    const result = execSync(command);
    return result.toString();
  } catch (error) {
    throw(error);
  }
};
module.exports=cmd;
