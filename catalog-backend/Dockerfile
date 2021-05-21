FROM node:14-alpine

LABEL io.openshift.s2i.scripts-url=image:///usr/local/s2i

WORKDIR /opt/app-root/

COPY ./.s2i/bin/ /usr/local/s2i
COPY src ./
COPY data ./
COPY *.json ./
COPY yarn.lock ./

RUN chown -R 1001:1001 /opt/app-root

USER 1001

EXPOSE 3331
CMD ["usage"]