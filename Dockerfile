FROM node:4.2.2-wheezy

RUN npm install -g npm@3.2.2
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json

# installing node libraries
RUN cd /tmp && npm install

# we want to persist the `dist` folder created by the last command
# for later usage outside this container
ADD . /tmp
# sets default folder
WORKDIR /tmp
# command run by the container
CMD ["npm", "run", "dist"]
