// Script to find all !important usages in SCSS files
// Run with: node find-important.mjs

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function findImportantInDir(dir, results = []) {
    const files = readdirSync(dir);
    
    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        
        if (stat.isDirectory()) {
            findImportantInDir(filePath, results);
        } else if (file.endsWith('.scss')) {
            const content = readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
                if (line.includes('!important')) {
                    results.push({
                        file: filePath,
                        line: index + 1,
                        content: line.trim()
                    });
                }
            });
        }
    });
    
    return results;
}

const stylesDir = './src/styles';
const results = findImportantInDir(stylesDir);

console.log(`\n Found ${results.length} instances of !important:\n`);
console.log('=' .repeat(80));

results.forEach(({ file, line, content }) => {
    console.log(`\n${file}:${line}`);
    console.log(`  ${content}`);
});

console.log('\n' + '='.repeat(80));
console.log(`\nTotal: ${results.length} !important flags found\n`);
