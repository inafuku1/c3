FROM node:22

WORKDIR /var/app

RUN npx create-next-app@latest . \
  --typescript \
  --eslint \
  --tailwind \
  --src-dir \
  --app \
  --use-npm

EXPOSE 3000

CMD ["npm","run","dev:inspect"]
