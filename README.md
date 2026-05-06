# Teerakulchon Family Tree
Landing page for the Teerakuklchon family tree.

## Web Content

- Family seal: the `余` surname mark.
- Theme phrases:
  - `源遠流長` — ต้นธารไกล สายน้ำยืนยาว
  - `飲水思源` — เมื่อดื่มน้ำ จงระลึกถึงต้นธาร
  - `祖德千秋遠` and `宗風百世長` as vertical couplets
- Four generation sections:
  - `第一代` — คู่ปฐมวงศ์
  - `第二代` — ผู้สืบทอด
  - `第三代` — ผู้สานต่อ
  - `第四代` — กิ่งใหม่ที่เติบโต

## Project Structure

- `app/page.tsx` renders the landing page, generation sections, hanging scroll
  cards, partner grouping, and footer.
- `app/family_members.json` stores the family member records used by the page.
- `app/layout.tsx` configures page metadata and loads Thai, Chinese, brush, and
  serif fonts through `next/font`.
- `app/globals.css` defines the lacquer, gold, paper, seal, scroll, cloud, and
  animation styles.
- `public/yu_cover.png` contains the project image asset.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
