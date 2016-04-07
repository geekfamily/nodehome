FROM hypriot/rpi-node

RUN git clone https://github.com/sarfata/pi-blaster.git /pi-blaster && cd /pi-blaster/ && \
./autogen.sh && ./configure && make && make install && \
rm -rf /var/lib/apt/lists/*

RUN mkdir web
WORKDIR ./web/
COPY ./subscriber.js /web/
COPY ./package.json /web/
COPY ./.babelrc /web/
RUN npm install
RUN ./node_modules/.bin/babel ./subscriber.js --out-dir out
EXPOSE 80

CMD [ "node", "./out/subscriber.js" ]

