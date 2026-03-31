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

function copyFiles(src, dest, files) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of files) {
    const srcPath = path.join(src, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(dest, file));
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

// jQuery
console.log('Updating jQuery...');
copyFiles(
  path.join(nodeModules, 'jquery', 'dist'),
  path.join(vendorDir, 'jquery'),
  [
    'jquery.js',
    'jquery.min.js',
    'jquery.min.map',
    'jquery.slim.js',
    'jquery.slim.min.js',
    'jquery.slim.min.map',
  ]
);

// jQuery Easing
console.log('Updating jQuery Easing...');
copyFiles(
  path.join(nodeModules, 'jquery.easing'),
  path.join(vendorDir, 'jquery-easing'),
  [
    'jquery.easing.js',
    'jquery.easing.min.js',
    'jquery.easing.compatibility.js',
  ]
);

console.log('Vendor files updated successfully.');
