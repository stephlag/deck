FROM node:4.4.1

RUN useradd -ms /bin/bash node && \
  chown -R node /usr/ && \
  chown -R node deck
  
USER node

ENV HOME=/home/node API_HOST=http://localhost:8084 DECK_HOST=0.0.0.0

COPY . deck/

WORKDIR deck

RUN rm -rf .git && npm install

CMD ["npm", "start"]
