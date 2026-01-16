# Shape Sob Controle - site do Matheus Antunes

Landing page para a consultoria nutricional premium "Shape Sob Controle", criada para o Matheus Antunes.
Projeto em Next.js com foco em performance e SEO (metadata, sitemap e robots).

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variaveis de ambiente

Crie um arquivo `.env.local` com o dominio do site:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Usado para canonical, Open Graph, sitemap e robots.

## Scripts

- `npm run dev` - ambiente local
- `npm run build` - build de producao
- `npm run start` - servidor de producao
- `npm run lint` - lint

## Estrutura

- `src/app` - rotas, metadata, sitemap e robots
- `src/components` - componentes e templates
- `public` - assets estaticos
