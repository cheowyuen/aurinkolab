FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY dist .

COPY ./ssl-key/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY ./ssl-key/privkey.pem /etc/nginx/ssl/privkey.pem

#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
