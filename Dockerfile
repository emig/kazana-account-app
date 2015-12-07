FROM node:4.2.2-wheezy

RUN npm install -g npm@3.2.2
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json


# installing node libraries
RUN cd /tmp && npm install

ADD . /tmp
# command run by the container
# sets default folder
WORKDIR /tmp
CMD ["npm", "run", "dist"]
