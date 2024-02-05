// Load necessary Node.js modules
const fs = require('fs'); // For file operations
const http = require('http'); // For HTTP requests
const https = require('https'); // For HTTPS requests
const url = require('url'); // To parse URLs

// Function to choose between 'http' and 'https' based on the URL
const httpModule = (url) => url.startsWith('https') ? https : http;

// Function to download content from a URL
const downloadUrl = (urlStr) => {
  // Return a new promise that resolves when the download is complete or rejects on error
  return new Promise((resolve, reject) => {
    // Parse the URL to get the hostname (used later to name the file)
    const urlParts = new URL(urlStr);
    const hostname = urlParts.hostname;

    // Use the correct HTTP module to make the request
    httpModule(urlStr).get(urlStr, (response) => {
      // Check if the response is successful
      if (response.statusCode < 200 || response.statusCode > 299) {
        console.error(`Failed to download ${urlStr}: Status Code ${response.statusCode}`);
        return reject(`Failed to download ${urlStr}`);
      }

      // Collect data chunks from the response
      const data = [];
      response.on('data', (chunk) => data.push(chunk));
      response.on('end', () => {
        // Once all data is received, write it to a file named after the hostname
        fs.writeFile(hostname, data.join(''), 'utf8', (err) => {
          if (err) {
            console.error(`Failed to write ${hostname}: ${err.message}`);
            return reject(`Failed to write ${hostname}`);
          }
          console.log(`Downloaded and saved ${urlStr} to ${hostname}`);
          resolve(); // Resolve the promise successfully
        });
      });
    }).on('error', (err) => {
      // Handle any request errors
      console.error(`Error downloading ${urlStr}: ${err.message}`);
      reject(`Error downloading ${urlStr}`);
    });
  });
};

// Main function to process the file of URLs
const downloadUrlsFromFile = (filename) => {
  // Read the file asynchronously
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      // If reading the file fails, log the error and stop
      console.error(`Failed to read ${filename}: ${err.message}`);
      return;
    }

    // Split the file content into lines (URLs) and filter out any empty lines
    const urls = data.split('\n').filter(line => line.trim() !== '');
    // Download all URLs concurrently with Promise.all
    Promise.all(urls.map(downloadUrl))
      .then(() => console.log('All downloads completed.'))
      .catch(err => console.error('Some downloads failed:', err));
  });
};

// Check if the script was called with exactly one argument (the filename)
if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1); // Exit with an error code
}

// Extract the filename from the command line arguments and start the process
const filename = process.argv[2];
downloadUrlsFromFile(filename);
