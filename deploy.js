const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Get the repository name from the package.json homepage URL
const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
const homepage = packageJson.homepage;
if (!homepage) {
  throw new Error("`homepage` is not set in package.json");
}
const repoName = new URL(homepage).pathname;

console.log(`Repository path: ${repoName}`);

// Run the expo export command
execSync('npx expo export -p web', { stdio: 'inherit' });

// Fix the index.html file to use correct paths
const indexPath = join(__dirname, 'dist', 'index.html');
let indexContent = readFileSync(indexPath, 'utf-8');

// Replace absolute paths with relative paths that include the repo name
indexContent = indexContent.replace(/src="\/_expo/g, `src="${repoName}_expo`);
indexContent = indexContent.replace(/href="\/favicon/g, `href="${repoName}favicon`);

writeFileSync(indexPath, indexContent);

console.log('Successfully exported and fixed paths for GitHub Pages.');
