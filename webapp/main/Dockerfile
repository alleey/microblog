FROM nginx:1.21.3-alpine

# copy artifact build from the 'build environment'
COPY dist/zabardast /usr/share/nginx/html
COPY nginx/*.template /etc/nginx/templates/

# expose port 80
ENV NGINX_PORT 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
