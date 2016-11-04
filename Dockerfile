FROM node:4.4.1

RUN useradd -ms /bin/bash node && \
  chown -R node /usr/ && \
  chown -R node deck
  
USER node

ENV HOME=/home/node

COPY . deck/

WORKDIR deck

RUN rm -rf .git && npm install

CMD ["npm", "start"]
