FROM node:20
WORKDIR /app
COPY package*.json ./
#Install dependencies
RUN npm i react-moment --force
RUN npm install --force
#Copy all files into docker env
COPY . .
#Prepare the build
RUN npm run build
EXPOSE 3000
CMD [ "npm","start" ]