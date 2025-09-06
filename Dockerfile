FROM oven/bun:1.2.21 AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production

FROM base AS install
# devDependencies
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
RUN cd /temp && bun install --trust

FROM base AS prerelease
COPY --from=install /temp/node_modules node_modules
COPY . .
RUN bun run build
 
FROM base AS release
COPY --from=install /temp/node_modules ./node_modules
COPY --from=prerelease /usr/src/app/build ./build
COPY --from=prerelease /usr/src/app/package.json ./

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "./build/index.js" ]
