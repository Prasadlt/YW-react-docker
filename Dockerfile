FROM node:14
WORKDIR /app
COPY package*.json ./
#Install dependencies
RUN npm install
RUN npm i react-moment
#Copy all files into docker env
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","start" ]