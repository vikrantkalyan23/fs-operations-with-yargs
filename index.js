const fs = require('fs');
const yargs = require('yargs');

// Load filenames from `filenames.txt` if it exists
let filenames = [];
const filenamesPath = 'filenames.txt';

if (fs.existsSync(filenamesPath)) {
    const data = fs.readFileSync(filenamesPath, 'utf-8');
    filenames = data ? JSON.parse(data) : [];
}

// Configure yargs to take a filename as input
const argv = yargs
    .option('filename', {
        alias: 'f',
        type: 'string',
        description: 'Name of the file to create',
        demandOption: true,
    })
    .help()
    .argv;

const newFilename = argv.filename;

// Check if the file already exists
if (filenames.includes(newFilename)) {
    console.log(`The file "${newFilename}" already exists. Please provide a new filename.`);
} else {
    // Write 'You are awesome' to the new file
    fs.writeFileSync(newFilename, 'You are awesome', 'utf-8');
    console.log(`File "${newFilename}" created successfully!`);

    // Add the new filename to the array
    filenames.push(newFilename);

    // Save updated filenames to `filenames.txt`
    fs.writeFileSync(filenamesPath, JSON.stringify(filenames), 'utf-8');
    console.log('Updated filenames list saved to filenames.txt.');
}
