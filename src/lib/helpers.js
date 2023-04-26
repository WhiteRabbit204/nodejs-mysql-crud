const bcryp = require('bcryptjs');
const helsper = {};

helsper.encrypPassword = async (password) => {
    const salt = await bcryp.genSalt(10);
    const finalPass = await bcryp.hash(password, salt);
    return finalPass;
};

helsper.mathPassword = async (password, savedPassword) => {
    try {
        return await bcryp.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helsper;