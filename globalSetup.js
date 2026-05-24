const fs   = require('fs');
const path = require('path');

module.exports = async (config) => {

    // Only regenerate usernames if the signup project is being run
    const isSignupRun = config.projects?.some(p => p.name === 'signup');
    if (!isSignupRun) {
        console.log('⏭️  Skipping username generation (no signup project in this run)');
        return;
    }

    const filePath = path.join(__dirname, 'utils/usernamePasswordData.json');
    const rawData  = fs.readFileSync(filePath, 'utf-8');
    const userData = JSON.parse(rawData);

    // Generate unique username for EACH user
    const generatedUsers = userData.map(user => ({
    baseUsername: user.baseUsername,           // ✅ preserve it
    username: user.baseUsername + Date.now(),  // ✅ generate from base
    password: user.password
}));

    // Save back as array
    fs.writeFileSync(
        filePath,
        JSON.stringify(generatedUsers, null, 2)
    );

    console.log('✅ Generated users:');
    generatedUsers.forEach(user => console.log('   →', user.username));
};