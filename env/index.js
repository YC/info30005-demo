// Load environment variables when in development
if ((process.env.NODE_ENV || 'development') === 'development') {
    require('dotenv').config();
}

// Print a secret
if (!process.env.SECRET) {
    console.error('SECRET not set');
    process.exit(1);
}
console.log(process.env.SECRET);
