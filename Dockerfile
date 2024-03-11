FROM public.ecr.aws/nginx/nginx-unprivileged:1.23-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html/
