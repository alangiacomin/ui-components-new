const fs = require('fs');
const path = require('path');

const exportComponents = (folder, indexFile) => {
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (!filePath.endsWith('.test.js') && !filePath.endsWith('.test.jsx')) {
        const exportName = path.parse(filePath).name;
        const exportPath = './' + filePath.replace(/\\/g, '/').replace(/\.jsx?$/g, '');
        const rigaExport = 'export { default as ' + exportName + " } from '" + exportPath + "';\n";
        fs.appendFileSync(indexFile, rigaExport);
      }
    } else if (stat.isDirectory()) {
      exportComponents(filePath, indexFile);
    }
  });
};

const updateIndex = (srcDir, indexFile) => {
  fs.writeFileSync(indexFile, '');
  exportComponents(srcDir, indexFile);
};

updateIndex('./src', 'index.js');
updateIndex('./src', 'index.d.ts');
