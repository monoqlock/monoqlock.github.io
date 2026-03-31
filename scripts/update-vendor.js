const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const nodeModules = path.join(rootDir, 'node_modules');
const vendorDir = path.join(rootDir, 'vendor');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Bootstrap: css/ and js/ directories
console.log('Updating Bootstrap...');
copyDirSync(
  path.join(nodeModules, 'bootstrap', 'dist', 'css'),
  path.join(vendorDir, 'bootstrap', 'css')
);
copyDirSync(
  path.join(nodeModules, 'bootstrap', 'dist', 'js'),
  path.join(vendorDir, 'bootstrap', 'js')
);

console.log('Vendor files updated successfully.');
