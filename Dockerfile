FROM    centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js, npm and git
RUN     yum install -y nodejs npm git-all

# Install bower
RUN npm install -g bower

COPY src/package.json /src/package.json
RUN cd /src; npm install

COPY src/bower.json /src/bower.json
RUN cd /src; bower install --allow-root


# Bundle app source
COPY src/* /src/
COPY src/config/* /src/config/
COPY src/app/* /src/app/
COPY src/app/views/* /src/app/views/

EXPOSE  8080

CMD ["node", "/src/app.js"]



