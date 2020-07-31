FROM node:14.5.0-alpine As development

WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/hackathon
RUN npm install --development

EXPOSE 3000
CMD ["npm", "start"]