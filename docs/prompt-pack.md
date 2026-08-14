# 《达芬奇密码》Prompt 包

全书配图锁定为 **14–15 世纪哥特手抄本插画 / 页边怪诞画（marginalia）**，不是写实油画。风格前缀各工具一字不改；只换 Subject。

## 风格锁定词（各工具复用）

英文：

```
14th-century Gothic illuminated manuscript, medieval marginalia, tempera and ink on aged vellum, flat 2D naive perspective, dark brown-black outlines, flat gouache fills with almost no shading, decorative vine-and-leaf border with gold emblems, blackletter if text appears, Luttrell Psalter / Book of Hours / Pentiment aesthetic, cream parchment with foxing stains and worn edges, forest green · brick madder · dusty slate blue · muted rose · yellow ochre · antique gold, stiff hieratic poses, ornamental plants and architecture, no photorealism, no 3D, no cinematic lighting
```

中文：

```
14世纪哥特手抄本插画，中世纪页边怪诞画（marginalia），墨线勾勒后在陈年羊皮纸上平涂蛋彩，完全平面二维透视，几乎无阴影、无体积光。深褐黑细线，扁平填色。装饰性藤蔓绿叶边框，角落贴金纹章。若有文字只用哥特黑字母体。Luttrell Psalter、时祷书气质，类似《Pentiment》。色板：奶油色羊皮纸底（褐斑、水渍、毛边）；森林绿、砖红、灰蓝、浅玫瑰、赭黄、古金。人物姿态僵直、略带滑稽庄重；植物与建筑图案化。
```

负面词：

```
photorealism, 3D render, cinematic lighting, volumetric light, realistic anatomy, oil painting brushstrokes, heavy shading, gradients, anime, manga, disney, modern digital illustration, concept art, comic book, photography, CGI, depth of field, lens flare, neon, glossy, hyper-detailed skin, perspective grid, vanishing point, modern typography, sans-serif, UI chrome
```

中文负面：

```
写实照片，三维渲染，电影光，体积光，厚涂油画笔触，强明暗，渐变体积感，二次元，迪士尼，现代插画，概念原画，漫画分镜，摄影，景深虚化，霓虹，无衬线字体，现代UI
```

套用格式：`[风格锁定词] + Subject: {画面} + [负面词]`。有参考图时加：`match the line weight, flat fills, and parchment texture of the reference`。

---

## 1. AI Studio / Gemini Build（框架）

```
生成一本《达芬奇密码》（丹·布朗）的交互书 Web App。

需求：
1. 首页正中一本合上的书；持续上下呼吸浮动；悬停微光（不要打断呼吸）；点击后柔和溶解展开（不要廉价 3D 翻页）
2. 打开后是左右页羊皮纸书；合上/打开尺寸用 CSS 变量固定，感觉是同一本书
3. 书页上沿横排书签：章节 / 游戏 / 图谱。书签要「插进纸口」：在纸页下方露出标签文字完整可读，下半截被纸边盖住；三枚有前/中/后层次，不要悬浮在书面上的网站 Tab
4. 章节：左插图+标题，右简介（Phase）与翻章；剧透克制（圣殿骑士、卢浮宫、圣杯线索等）
5. 游戏：左节点图，右剧情向小游戏——斐波那契/密码猜词贴标签、圣杯符号连线
6. 图谱：兰登、索菲、Silas、教会/组织等；关系边 + 点击简介
7. 视觉：哥特手抄本 / 页边怪诞画（茜红/赭金/铜绿书签，暗色舞台，旧羊皮纸），母题「符号之下，另有圣杯」
8. 配图：默认不自动批量生图；预留上传；可选 Gemini/Nano
9. 技术：React + TypeScript；故事 JSON；无 API Key 可玩

先产出可预览框架，再逐项 refinement。
```

短版：

```
做一本达芬奇密码交互书：合上呼吸浮动 → 溶解打开 → 上沿书签章节/游戏/图谱（夹进纸口）→ 羊皮纸左右页；风格：14th-century Gothic manuscript / marginalia, aged vellum, flat tempera；配图上传优先。
```

---

## 2. 元宝 / 强 LLM（人物图谱）

```
请生成《达芬奇密码》人物图谱与关系描述，供交互书「图谱」书签使用。注意剧透克制：不要写出最终反转身份与圣杯终局答案。

输出结构化 JSON：
- characterGroups：追寻者 / 教会与修会 / 隐秘结社 / 执法
- characters：id、name、groupId、role、bio（≤3句）、imagePrompt
- edges：from、to、label（师徒/血缘/追捕/信仰/同盟等）

含：罗伯特·兰登、索菲·奈芙、雅克·索尼埃、Silas、阿林加洛沙主教、雷·提彬（仅圣杯学者）、雷米、贝祖·法希、郇山隐修会、天主事工会（组织可作节点）。

人物出图须写成哥特手抄本圆形开光（quatrefoil roundel），不要油画头像。

不要长篇论文；要可直接导入前端的清晰列表。
```

---

## 3. Lovart / Nano（统一手抄本）

先贴风格锁定词 + 负面词，再按条生成。导出 PNG，命名对齐 id。

```
风格锁定：14th-century Gothic illuminated manuscript, medieval marginalia, tempera and ink on aged vellum, flat 2D naive perspective, dark brown-black outlines, flat gouache fills, vine-and-leaf border with gold emblems, Luttrell Psalter / Pentiment aesthetic, cream parchment with foxing, forest green · brick madder · dusty slate blue · muted rose · yellow ochre · antique gold. 禁止写实照片、三维、电影光、油画厚涂、二次元。

请为《达芬奇密码》交互书生成 PNG：

封面 cover.png：
合上的厚册，暗褐皮面，烫金扁平维特鲁威几何图与中文「达芬奇密码」，橡叶角饰与五瓣玫瑰小徽，手抄本气质，居中构图。

章节左页：
- phase-1.png：双骑士共骑一马，僵直仪式感姿态，石廊画成重复扁平拱券，金色日轮纹章，橡叶边框
- phase-2.png：长廊重复扁平拱券，倒伏袍影（不血腥），地板上黑字母体数字与符号，页边金色新月与星
- phase-3.png：羊皮纸上金银绿斐波那契螺旋，打乱的黑字母体数字如密码，藤蔓边框，页边小月亮
- phase-4.png：手抄本静物：五瓣砖红玫瑰、杯影、扁平金色维特鲁威圆方图，橡叶贴金框
- phase-5.png：密码筒画成中世纪圣物圆筒，书案羽毛笔，页边一座小巴黎塔，无写实窗光
- phase-6.png：圣殿教堂卧像骑士，扁平石像与几何地砖，哥特拱廊作边框，简易金色烛焰
- phase-7.png：罗斯林叶饰回廊变成铺满页面的手抄本边框，彩窗为扁平色块，薄雾用淡洗，无空气透视
- phase-8.png：追寻者背对石门，僵直中世纪姿态，门楣上金色日轮，门槛之外不揭示任何答案

游戏节点：
- fibonacci-cipher.png：斐波那契螺旋圆牌数字散落的密码板，黑字母体，藤蔓贴金框
- grail-symbols.png：五枚印章：五瓣玫瑰、双骑士、维特鲁威、密码筒、杯影，黑字母体短标
- cryptex-rings.png：四环密码筒手抄本示意图，书案羽毛笔与橡叶页边

人物头像（quatrefoil 圆形开光，可裁切）：
- langdon.png：褐袍学者持书，沉思
- sophie.png：灰蓝长裙、金发带，神色镇定
- sauniere.png：毛皮镶边长袍的年长馆长
- silas.png：粗布僧衣的白化病修士，眼神受困，不血腥
- aringarosa.png：金冠主教，灰蓝祭衣
- teabing.png：金链的年长学者骑士，砖红斗篷，神情机智
- remy.png：素色短袍管家，谦抑
- fache.png：深色战袍、金色徽记的严厉队长
- priory.png：隐修会纹章：五瓣玫瑰与圣杯
- opus.png：简朴十字修会印章，铜绿四叶框
```

完整英文条（可逐条粘贴；前面始终加风格锁定词）：

| 文件 | Prompt |
|------|--------|
| cover.png | closed thick codex centered, dark leather boards, gilt Vitruvian man as a flat geometric diagram, Chinese title 达芬奇密码 in gilt, oak-leaf corner ornaments and a small five-petaled rose emblem |
| phase-1.png | two medieval knights sharing one horse, stiff hieratic pose, stone cloister as repeating flat arches, gold sun emblem, oak-leaf border, simple gold candle discs |
| phase-2.png | manuscript page of a long gallery of repeating flat arches, a fallen robed figure without gore, cryptic numbers and symbols on the floor as blackletter glyphs, night marked by a gold crescent and stars in the margin |
| phase-3.png | illuminated parchment page with a Fibonacci spiral in gold and forest green, scrambled blackletter numerals scattered like a cipher, vine-and-leaf border, a small gold moon in the margin |
| phase-4.png | manuscript still-life: five-petaled brick-red rose, chalice silhouette, Vitruvian circle-and-square as flat gold diagrams, oak-leaf frame with gold corner emblems |
| phase-5.png | brass cryptex drawn as a medieval reliquary cylinder with lettered rings, writing desk with quill and parchment, a tiny Paris tower in the left margin |
| phase-6.png | Temple Church recumbent knight effigies as flat stone figures on a patterned floor, Gothic arcade as a decorative border, simple gold candle flames |
| phase-7.png | Rosslyn chapel corridor where carved foliage becomes the manuscript border filling the page, stained glass as flat colored panes, pale wash for mist, gold crescents in the corner |
| phase-8.png | seeker seen from behind at a stone doorway, stiff medieval pose, dawn as a gold sun emblem above the arch, nothing revealed beyond the threshold |
| fibonacci-cipher.png | illuminated cipher board: a Fibonacci spiral of numbered roundels on aged vellum, scrambled blackletter digits, vine-and-gold border |
| grail-symbols.png | illuminated parchment with five seals in a vine frame: five-petaled rose, two knights on one horse, Vitruvian circle, cryptex cylinder, chalice silhouette, blackletter labels |
| cryptex-rings.png | manuscript diagram of a brass cryptex with four lettered rings on a parchment desk, quill and oak leaves in the margin |
| langdon.png | quatrefoil manuscript roundel portrait of a middle-aged scholar in a brown cloak holding a book, thoughtful, gold rim |
| sophie.png | quatrefoil manuscript roundel portrait of a young woman in a dusty-slate-blue gown with a gold hair fillet, composed |
| sauniere.png | quatrefoil manuscript roundel portrait of an elderly curator in a fur-lined robe, dignified, gold rim |
| silas.png | quatrefoil manuscript roundel portrait of an albino monk in a rough habit, pale skin, haunted eyes, restrained, no gore |
| aringarosa.png | quatrefoil manuscript roundel portrait of a Catholic bishop with a gold mitre and dusty-blue vestments, formal |
| teabing.png | quatrefoil manuscript roundel portrait of an elderly historian-knight with a gold chain, witty expression, brick-madder cloak |
| remy.png | quatrefoil manuscript roundel portrait of a discreet manservant in a simple tan tunic, modest |
| fache.png | quatrefoil manuscript roundel portrait of a stern captain in a dark tabard with a gold badge |
| priory.png | heraldic manuscript seal: five-petaled rose and chalice on aged vellum, gold quatrefoil, vine border |
| opus.png | austere religious order emblem as a manuscript seal: simple cross on cream vellum, forest-green quatrefoil, blackletter label |

同源字段已写入 `src/book.json` 的 `artStyle` / `imagePrompt`。

---

## 4. Refinement chips

- 书签改成夹进纸口（纸页盖住下半截，文字仍完整）
- 合上的书外层持续呼吸，悬停只加光晕
- 打开改为柔和溶解，去掉 3D 翻页
- 书签文案统一为 章节 / 游戏 / 图谱
- 补全人物图谱接到「图谱」
- 图片改为仅上传，去掉首屏自动生图
- 为「符号之下，另有圣杯」写好标题与副文案
- 章节文案保持剧透克制，终局只写到门槛
- 配图全部重出为手抄本风，替换旧油画稿
