import familyMembersData from "./family_members.json";

type Member = {
  thaiName: string;
  chineseName: string;
  pinyin: string;
  meaning: string;
  hierarchy: number;
};

type GenerationItem =
  | { type: "member"; member: Member }
  | { type: "partners"; partners: [Member, Member] };

const members = familyMembersData as Member[];

const PARTNER_PAIRS = [["สุวิทย์", "สุธีรา"]] as const;

const GENERATIONS: Record<
  number,
  { cn: string; pinyin: string; thai: string; mood: string }
> = {
  1: {
    cn: "第一代",
    pinyin: "Dì Yī Dài",
    thai: "คู่ปฐมวงศ์",
    mood: "รากเหง้าและภาชนะรับสายเลือด จุดเริ่มต้นของตระกูล",
  },
  2: {
    cn: "第二代",
    pinyin: "Dì Èr Dài",
    thai: "ผู้สืบทอด",
    mood: "สี่กิ่งก้านจากลำต้นเดียว พร้อมจดจำครอบครัวที่เชื่อมโยงกัน",
  },
  3: {
    cn: "第三代",
    pinyin: "Dì Sān Dài",
    thai: "ผู้สานต่อ",
    mood: "ผู้แบกมุมมองยาวไกล — 远 · ยืนยาว",
  },
  4: {
    cn: "第四代",
    pinyin: "Dì Sì Dài",
    thai: "กิ่งใหม่ที่เติบโต",
    mood: "หน่อใหม่ล่าสุดของต้นไม้เก่าแก่",
  },
};

function groupByHierarchy(list: Member[]) {
  const map = new Map<number, Member[]>();
  for (const m of list) {
    if (!map.has(m.hierarchy)) map.set(m.hierarchy, []);
    map.get(m.hierarchy)!.push(m);
  }
  return [...map.entries()].sort(([a], [b]) => a - b);
}

function arePartners(a: Member, b: Member) {
  return PARTNER_PAIRS.some(
    ([first, second]) =>
      (a.thaiName === first && b.thaiName === second) ||
      (a.thaiName === second && b.thaiName === first),
  );
}

function groupPartners(people: Member[]): GenerationItem[] {
  const items: GenerationItem[] = [];
  const grouped = new Set<string>();

  for (const person of people) {
    if (grouped.has(person.thaiName)) continue;

    const partner = people.find(
      (candidate) =>
        candidate.thaiName !== person.thaiName &&
        !grouped.has(candidate.thaiName) &&
        arePartners(person, candidate),
    );

    if (partner) {
      items.push({ type: "partners", partners: [person, partner] });
      grouped.add(person.thaiName);
      grouped.add(partner.thaiName);
    } else {
      items.push({ type: "member", member: person });
      grouped.add(person.thaiName);
    }
  }

  return items;
}

function MemberScroll({
  member,
  index,
  totalInRow,
}: {
  member: Member;
  index: number;
  totalInRow: number;
}) {
  const chars = [...member.chineseName];
  const delay = 0.15 + index * 0.12;
  const swayDeg = totalInRow > 1 ? (index - (totalInRow - 1) / 2) * 0.35 : 0;

  return (
    <figure
      className="relative flex flex-col items-center unfurl"
      style={{
        animationDelay: `${delay}s`,
        transform: `rotate(${swayDeg}deg)`,
      }}
    >
      {/* crimson cord hanging from above */}
      <div className="cord" />

      <div className="w-[248px] flex flex-col">
        {/* top wooden roller */}
        <div className="roller h-[18px] -mx-[10px]" />

        {/* paper body */}
        <div className="scroll-card px-7 pt-6 pb-8 min-h-[470px]">
          {/* Thai name header */}
          <header className="relative z-[2] text-center">
            <div className="thai text-[11px] tracking-[0.42em] uppercase text-[#4d0606]">
              泰 · ไทย
            </div>
            <div className="thai mt-1 text-xl font-semibold text-[#0a0605] tracking-wide">
              {member.thaiName}
            </div>
          </header>

          {/* gold rule */}
          <div className="relative z-[2] mt-4 flex items-center justify-center gap-3">
            <span className="diamond" />
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a24b]/70 to-transparent" />
            <span className="diamond" />
          </div>

          {/* Vertical Chinese name */}
          <div className="relative z-[2] mt-5 flex justify-center">
            <div className="vertical brush text-[#0a0403] text-[3.5rem] leading-[1.02] font-black">
              {chars.map((c, i) => (
                <span
                  key={i}
                  className={
                    i === 1
                      ? "relative inline-block"
                      : "relative inline-block"
                  }
                  style={{ marginBottom: "0.04em" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Pinyin */}
          <div className="relative z-[2] mt-5 text-center serif-en italic text-[#4d0606] tracking-[0.18em] text-[13px] font-semibold">
            {member.pinyin}
          </div>

          {/* Meaning */}
          <p className="relative z-[2] mt-4 text-[11px] leading-[1.75] thai text-[#1a0605] text-justify hyphens-auto px-1">
            <span className="brush text-[#a11b1b] text-base mr-1 font-bold">釋</span>
            {member.meaning}
          </p>
        </div>

        {/* bottom wooden roller */}
        <div className="roller h-[22px] -mx-[14px]" />
      </div>

      {/* base tassel */}
      <div className="mt-2 flex gap-1.5 opacity-90">
        <span className="block w-[2px] h-6 bg-gradient-to-b from-[#9e1a16] to-[#3d0e0e] rounded-full" />
        <span className="block w-[2px] h-8 bg-gradient-to-b from-[#c7361e] to-[#4d0606] rounded-full" />
        <span className="block w-[2px] h-6 bg-gradient-to-b from-[#9e1a16] to-[#3d0e0e] rounded-full" />
      </div>
    </figure>
  );
}

function PartnerScrolls({
  partners,
  index,
  totalInRow,
}: {
  partners: [Member, Member];
  index: number;
  totalInRow: number;
}) {
  const [first, second] = partners;

  return (
    <div
      className="relative flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12"
      aria-label={`${first.thaiName} และ ${second.thaiName} เป็นคู่สมรสกัน`}
    >
      <div className="hidden md:block absolute left-[248px] right-[248px] top-[238px] h-px bg-gradient-to-r from-transparent via-[#eac975] to-transparent shadow-[0_0_18px_rgba(234,208,128,0.45)]" />
      <div className="md:hidden absolute top-[512px] bottom-[512px] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#eac975] to-transparent shadow-[0_0_18px_rgba(234,208,128,0.45)]" />

      <MemberScroll
        member={first}
        index={index}
        totalInRow={totalInRow}
      />

      <div className="relative z-[4] -my-7 md:absolute md:left-1/2 md:top-[206px] md:my-0 md:-translate-x-1/2">
        <div className="seal relative flex h-16 w-16 items-center justify-center rounded-[4px] text-[24px]">
          伴
        </div>
        <div className="thai mt-3 rounded-sm border border-[#c9a24b]/45 bg-[#1a0908]/90 px-3 py-1 text-center text-[11px] font-semibold tracking-[0.22em] text-[#f6e6b4] shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          คู่สมรส · 夫妻
        </div>
      </div>

      <MemberScroll
        member={second}
        index={index + 1}
        totalInRow={totalInRow}
      />
    </div>
  );
}

function GenerationBand({
  level,
  people,
  index,
}: {
  level: number;
  people: Member[];
  index: number;
}) {
  const meta = GENERATIONS[level];
  const generationItems = groupPartners(people);
  return (
    <section className="relative py-20 md:py-28">
      {/* hanging beam */}
      <div className="relative mx-auto max-w-6xl">
        {/* the beam/crossbar the scrolls hang from */}
        <div className="relative mx-6 md:mx-10">
          <div className="roller h-[10px] rise" style={{ animationDelay: `${index * 0.1}s` }} />
          <span
            className="absolute -top-3 left-3 w-5 h-5 rounded-full bg-gradient-to-br from-[#e6b44a] to-[#5d3b0f] shadow-[0_0_0_2px_#1a0908,_inset_0_0_4px_rgba(0,0,0,0.5)]"
            aria-hidden
          />
          <span
            className="absolute -top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-[#e6b44a] to-[#5d3b0f] shadow-[0_0_0_2px_#1a0908,_inset_0_0_4px_rgba(0,0,0,0.5)]"
            aria-hidden
          />
        </div>

        {/* Generation label, sits on the beam */}
        <div
          className="relative z-[3] mx-auto -mt-[52px] mb-8 w-[220px] couplet rounded-sm px-5 py-3 text-center rise"
          style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
        >
          <div className="relative z-[2]">
            <div className="calligraphy gold-foil text-3xl tracking-[0.2em]">
              {meta.cn}
            </div>
            <div className="thai italic text-[#f6e6b4]/70 text-[11px] tracking-[0.16em] mt-1">
              {meta.pinyin} · {meta.thai}
            </div>
          </div>
        </div>

        {/* quietly italic descriptor */}
        <div className="mt-4 text-center thai italic text-[#c9a24b]/65 text-sm tracking-wide">
          — {meta.mood} —
        </div>

        {/* scrolls row */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-14 px-6">
          {generationItems.map((item, i) =>
            item.type === "partners" ? (
              <PartnerScrolls
                key={item.partners.map((p) => p.chineseName).join("-")}
                partners={item.partners}
                index={i}
                totalInRow={people.length}
              />
            ) : (
              <MemberScroll
                key={item.member.chineseName}
                member={item.member}
                index={i}
                totalInRow={people.length}
              />
            ),
          )}
        </div>

        {/* connective gold thread going down */}
        {index < Object.keys(GENERATIONS).length - 1 && (
          <div className="relative mt-20 h-20">
            <span className="lineage-line top-0 bottom-0" />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-gradient-to-br from-[#f6e6b4] to-[#6f5217] shadow-[0_0_18px_rgba(234,208,128,0.5)]"
              aria-hidden
            />
          </div>
        )}
      </div>
    </section>
  );
}

function CoupletBanner({
  side,
  line,
  romanize,
}: {
  side: "left" | "right";
  line: string;
  romanize: string;
}) {
  return (
    <aside
      className={`hidden lg:flex absolute top-0 ${
        side === "left" ? "left-6" : "right-6"
      } couplet flex-col items-center pt-8 pb-6 px-3 rounded-sm inkbloom`}
      style={{ animationDelay: side === "left" ? "0.2s" : "0.4s" }}
    >
      <div className="relative z-[2] vertical calligraphy gold-foil text-[2.6rem] leading-[1.1] tracking-[0.05em]">
        {line}
      </div>
      <div className="relative z-[2] mt-6 serif-en italic text-[#c9a24b]/80 text-[10px] tracking-[0.35em] uppercase rotate-180 [writing-mode:vertical-rl]">
        {romanize}
      </div>
    </aside>
  );
}

export default function Home() {
  const grouped = groupByHierarchy(members);
  const totalMembers = members.length;

  return (
    <main className="relative min-h-dvh text-[var(--foreground)]">
      {/* Top cloud band */}
      <div className="cloud-band h-10 w-full opacity-80" aria-hidden />

      {/* === HEADER / HERO === */}
      <section className="relative overflow-hidden pt-14 pb-10 md:pt-24 md:pb-20">
        {/* decorative hanging lanterns */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-between px-12 md:px-24">
          <div className="flex flex-col items-center">
            <span className="block w-px h-12 bg-gradient-to-b from-transparent to-[#9e1a16]" />
            <span className="lantern lantern-flicker" />
          </div>
          <div className="flex flex-col items-center">
            <span className="block w-px h-20 bg-gradient-to-b from-transparent to-[#9e1a16]" />
            <span className="lantern lantern-flicker" style={{ animationDelay: "1.2s" }} />
          </div>
          <div className="flex flex-col items-center">
            <span className="block w-px h-16 bg-gradient-to-b from-transparent to-[#9e1a16]" />
            <span className="lantern lantern-flicker" style={{ animationDelay: "2.4s" }} />
          </div>
        </div>

        {/* flanking vertical couplets */}
        <CoupletBanner
          side="left"
          line="祖德千秋遠"
          romanize="Zǔ Dé Qiān Qiū Yuǎn"
        />
        <CoupletBanner
          side="right"
          line="宗風百世長"
          romanize="Zōng Fēng Bǎi Shì Cháng"
        />

        {/* top small caption */}
        <div className="relative z-[3] mx-auto max-w-2xl text-center px-6">
          <div className="thai italic text-[#c9a24b]/70 text-xs tracking-[0.22em] rise">
            ต้นตระกูล 余 ธีรกุลชน
          </div>
          <div className="hr-gold mt-6 rise" style={{ animationDelay: "0.1s" }} />
        </div>

        {/* The great title */}
        <div className="relative z-[3] mt-10 md:mt-16 flex flex-col items-center px-6">
          <h1 className="brush gold-foil text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[0.1em] rise"
              style={{ animationDelay: "0.15s" }}>
            余
          </h1>
          <div className="mt-4 flex items-center gap-5 rise" style={{ animationDelay: "0.3s" }}>
            <span className="flex-1 h-px w-16 bg-[#c9a24b]/60" />
            <span className="serif-en italic text-[#eac975] text-base tracking-[0.35em] uppercase">
              Teerakulchon
            </span>
            <span className="flex-1 h-px w-16 bg-[#c9a24b]/60" />
          </div>
          <p className="mt-6 max-w-xl text-center thai text-[#f3e3b6]/80 text-[15px] leading-relaxed rise"
             style={{ animationDelay: "0.4s" }}>
            ผังตระกูลของแซ่ <em>余 (yú)</em> ธีรกุลชน 
            <br></br>ถ่ายทอดด้วยใจขอบพระคุณพระเจ้า
            ผู้มอบชีวิตและพระคุณแก่ครอบครัวของเรา
            เพื่อให้ลูกหลานรุ่นต่อไปเติบโตในความเชื่อ ความรัก และความหวัง
          </p>
        </div>

        {/* GIANT SEAL as focal point */}
        <div className="relative z-[3] mt-14 md:mt-20 flex items-center justify-center inkbloom"
             style={{ animationDelay: "0.55s" }}>
          {/* decorative wisps around seal */}
          <span className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent to-[#c9a24b]/70" />
          <span className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-l from-transparent to-[#c9a24b]/70" />

          <div className="seal relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] flex flex-col items-center justify-center rounded-[6px]">
            <span className="relative z-[2] serif-cn gold-foil text-[9rem] md:text-[12rem] leading-none font-black">
              余
            </span>
          </div>
        </div>

        {/* Subtitle under seal */}
        <div className="relative z-[3] mt-12 flex flex-col items-center px-6 inkbloom"
             style={{ animationDelay: "0.8s" }}>
          <div className="flex items-center gap-4">
            <span className="diamond" />
            <span className="calligraphy gold-foil text-2xl md:text-3xl tracking-[0.3em]">
              信望愛
            </span>
            <span className="diamond" />
          </div>
          <div className="mt-3 thai italic text-[#c9a24b]/75 text-[12px] tracking-[0.18em]">
            ความเชื่อ ความหวัง และความรัก
          </div>
        </div>
      </section>

      {/* divider cloud band */}
      <div className="cloud-band h-10 w-full opacity-70 rotate-180" aria-hidden />

      {/* === GENERATIONS === */}
      <div className="relative">
        {grouped.map(([level, people], i) => (
          <GenerationBand key={level} level={level} people={people} index={i} />
        ))}
      </div>

      {/* bottom cloud band */}
      <div className="cloud-band h-10 w-full opacity-70" aria-hidden />

      {/* === FOOTER === */}
      <footer className="relative py-24 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6">
            <div className="brush gold-foil text-5xl md:text-6xl tracking-[0.2em]">
              飲水思源
            </div>
            <div className="thai italic text-[#c9a24b]/75 text-[12px] tracking-[0.18em]">
              Yǐn Shuǐ Sī Yuán — เมื่อดื่มน้ำ จงระลึกถึงต้นธาร
            </div>
            <div className="hr-gold w-full mt-4" />
            <figure className="max-w-xl">
              <blockquote className="serif-en text-[#f3e3b6]/80 text-lg md:text-xl leading-relaxed">
                “For the LORD is good; his mercy is everlasting; and his truth
                endureth to all generations.”
              </blockquote>
              <figcaption className="mt-3 serif-en italic text-[#c9a24b]/80 text-xs tracking-[0.28em] uppercase">
                Psalm 100:5
              </figcaption>
            </figure>
            <p className="thai italic text-[#f3e3b6]/55 text-[13px] leading-relaxed max-w-xl">
              เพราะพระเจ้าทรงแสนดี พระเมตตาของพระองค์ดำรงเป็นนิตย์
              และความสัตย์ซื่อของพระองค์สืบไปทุกชั่วรุ่น
            </p>

            <div className="mt-8 flex items-center gap-6">
              <span className="seal relative w-14 h-14 flex items-center justify-center rounded-[3px] serif-cn text-[22px]">
                恩
              </span>
              <span className="thai text-[#c9a24b]/70 text-[11px] tracking-[0.18em]">
                พระคุณ · 恩典 · ทุกชั่วรุ่น
              </span>
              <span className="seal relative w-14 h-14 flex items-center justify-center rounded-[3px] serif-cn text-[18px]">
                信
              </span>
            </div>
          </div>
        </div>
      </footer>

      <div className="cloud-band h-8 w-full opacity-60" aria-hidden />
    </main>
  );
}

function StatCell({
  top,
  topRoman,
  bottom,
}: {
  top: string;
  topRoman: string;
  bottom: string;
}) {
  return (
    <div className="relative flex flex-col items-center py-5 px-3 border border-[#c9a24b]/25 rounded-sm bg-gradient-to-b from-black/20 to-black/5 backdrop-blur-[1px]">
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c9a24b]/70" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#c9a24b]/70" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#c9a24b]/70" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c9a24b]/70" />

      <div className="brush gold-foil text-5xl md:text-6xl leading-none">{top}</div>
      <div className="serif-en italic text-[#c9a24b]/75 text-[10px] tracking-[0.35em] uppercase mt-2">
        {topRoman}
      </div>
      <div className="hr-gold w-10 my-2 opacity-70" />
      <div className="thai text-[#f3e3b6]/85 text-[11px] tracking-[0.18em]">
        {bottom}
      </div>
    </div>
  );
}

function toChineseNumeral(n: number): string {
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (n < 10) return digits[n];
  if (n < 20) return n === 10 ? "十" : "十" + digits[n - 10];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return digits[tens] + "十" + (ones ? digits[ones] : "");
}
