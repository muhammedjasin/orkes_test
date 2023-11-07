const gulp = require('gulp');
const { spawn } = require('child_process');

// Define the task to start the Express server 
gulp.task('start-server', () => {
    const serverProcess = spawn('node',
        ['server.js'],
        { stdio: 'inherit' });

    serverProcess.on('close', (code) => {
        if (code === 8) {
            console.error('Error detected, waiting for changes...');
        }
    });
});

// Define the default task to start the React development server 
gulp.task('default', gulp.series('start-server', () => {
    const reactProcess = spawn('npm', ['start'], { stdio: 'inherit' });

    reactProcess.on('close', (code) => {
        if (code === 8) {
            console.error('Error detected, waiting for changes...');
        }
    });
}));
