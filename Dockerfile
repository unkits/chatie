FROM debian:bullseye-slim
ENV DEBIAN_FRONTEND="noninteractive" \
    TZ="Asia/Shanghai" \
    PNPM_HOME="/root/.local/share/pnpm"

WORKDIR /app
COPY . .

RUN set -x \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        apt-utils \
        build-essential \
        ca-certificates \
        bash \
        curl \
        sudo \
        gnupg \
        tzdata \
        libxss1 \
    && apt-get purge --auto-remove \
    && rm -rf /tmp/* /var/lib/apt/lists/*

RUN set -x \
    && curl -q -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && bash -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        google-chrome-stable \
        fonts-liberation \
    && apt-get purge --auto-remove \
    && rm -rf /tmp/* /var/lib/apt/lists/*

RUN set -x \
    && curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get purge --auto-remove \
    && rm -rf /tmp/* /var/lib/apt/lists/*

RUN set -x \
    && npm install -g tsx pnpm \
    && pnpm install --prod \
    && rm -rf \
        /tmp/* \
        /root/.npm \
        /root/.cache \
        /root/.pnpm-store \
        /root/.local/share/pnpm/store

CMD ["pnpm","run","start"]
