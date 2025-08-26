# Imagem leve do Nginx para servir arquivos estáticos
FROM nginx:1.25-alpine

# Remova o default e use nossa config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todo o conteúdo da pasta "app" para a pasta pública do Nginx
COPY app/ /usr/share/nginx/html/

# Opcional: elimina arquivos de build da imagem final (se existirem)
RUN rm -f /usr/share/nginx/html/Dockerfile \
         /usr/share/nginx/html/nginx.conf \
         /usr/share/nginx/html/.dockerignore || true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
