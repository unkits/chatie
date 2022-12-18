FROM alpine:latest
LABEL container.maintainer="xtoys <echoless@yeah.net>"

ENV PS1="@\u:\w \$ " \
    TZ="Asia/Shanghai" \
    PNPM_HOME="/root/.local/share/pnpm"

WORKDIR /app
COPY . .

RUN set -x \
    && apk add --update --no-cache \
       tzdata \
       nodejs \
       npm \
       chromium \
    && rm -rf /var/cache/apk/*

RUN set -x \
    && npm install -g tsx pnpm \
    && pnpm install --prod \
    && rm -rf /root/.pnpm-store \
    && rm -rf /root/.local/share/pnpm/store \
    && rm -rf /root/.cache \
    && rm -rf /root/.npm

CMD ["pnpm","run","start"]
