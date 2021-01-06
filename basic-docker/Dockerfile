FROM node:14-alpine

# Create app directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Copy app from local into image
COPY . .

# Install app dependencies for production
RUN npm install

# Use node user (as opposed to root)
User node

# Expose port 3000
EXPOSE 3000
CMD [ "npm", "start" ]
