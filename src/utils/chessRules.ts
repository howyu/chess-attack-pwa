/**
 * 国际象棋规则知识库
 * 每个条目包含：关键词列表、标题、详细内容、相关问题
 */
export interface RuleEntry {
  id: string;
  keywords: string[];
  title: string;
  content: string;
  related: string[];
}

export const RULE_KNOWLEDGE_BASE: RuleEntry[] = [
  {
    id: 'piece-movement',
    keywords: ['棋子', '走法', '怎么走', '移动', '走棋', '兵', '马', '象', '车', '后', '王', '走子'],
    title: '棋子走法',
    content: `国际象棋共有6种棋子，每种走法不同：

♟️ 兵（Pawn）：第一步可走1格或2格，之后只能向前走1格。吃子时斜前方1格。到达对方底线可升变为后、车、象、马中任意一个。

♞ 马（Knight）：走"日"字形——横2竖1或横1竖2。可以跳过其他棋子，是唯一可以跳过障碍的棋子。

♝ 象（Bishop）：沿斜线走任意格数，不能越过棋子。始终在同一颜色的格子上。

♜ 车（Rook）：沿横线或竖线走任意格数，不能越过棋子。

♛ 后（Queen）：沿横、竖、斜任意方向走任意格数，是威力最强的棋子。

♚ 王（King）：向任意方向走1格。不能被将军，也不能走到被攻击的格子上。`,
    related: ['en-passant', 'castling', 'promotion']
  },
  {
    id: 'en-passant',
    keywords: ['吃过路兵', '过路兵', 'en passant', '路过兵'],
    title: '吃过路兵（En Passant）',
    content: `吃过路兵是一条特殊规则，用于防止兵通过"第一步走两格"来逃避被吃。

触发条件：
1. 对方兵从起始位置（2线或7线）第一步走了两格
2. 这个兵经过了你兵可以攻击的格子（即与你兵斜前方相邻）
3. 你必须立即在下一步选择吃过路兵，不能等待

示例：白方兵在e5，黑方兵从d7走到d5。白方可以像黑兵只走到d6一样，用e5兵斜吃到d6，并移除d5上的黑兵。

注意：这是唯一一个吃子位置和被吃棋子位置不同的走法。`,
    related: ['piece-movement', 'pawn-structure']
  },
  {
    id: 'castling',
    keywords: ['王车易位', '易位', '移位', 'castling', '城堡'],
    title: '王车易位（Castling）',
    content: `王车易位是一步走两个棋子的特殊走法，用于保护王并激活车。

条件（全部满足才能易位）：
1. 王和要易位的车都没有移动过
2. 王和车之间没有任何棋子
3. 王当前没有被将军
4. 王经过和到达的格子没有被对方攻击
5. 王不会被"穿过"将军

王翼易位（短易位）：王向右走2格，车跳到王左侧
后翼易位（长易位）：王向左走2格，车跳到王右侧

小贴士：开局阶段尽早王车易位，是保护王的最佳方式。通常建议在10步以内完成。`,
    related: ['piece-movement', 'check', 'opening']
  },
  {
    id: 'promotion',
    keywords: ['升变', '升格', '变后', '升后', 'promotion', '底线', '到底'],
    title: '兵升变（Pawn Promotion）',
    content: `当兵走到对方底线（白方到第8横线，黑方到第1横线）时，必须升变为后、车、象、马中的任意一种。

关键规则：
• 升变是强制的——兵到达底线必须升变
• 可以升变为任意棋子（不仅是后），即使该棋子还在棋盘上
• 绝大多数情况下升变为后（最强棋子）
• 少数情况下升变为马可以形成独特的战术（如马将军）
• 极少数情况下升变为车或象是为了避免逼和

理论上一方可以有9个后（原始后 + 8个兵全部升变），但实际对局中很少见。`,
    related: ['piece-movement', 'pawn-structure']
  },
  {
    id: 'check',
    keywords: ['将军', '将', 'check', '被将', '应将'],
    title: '将军与应将',
    content: `将军（Check）：当一方的棋子直接攻击对方的王时，称为"将军"。

应将的三种方式：
1. 逃：把王移到一个安全的格子
2. 垫：用己方棋子挡在王和攻击者之间（仅对车、象、后的直线攻击有效）
3. 吃：吃掉正在将军的棋子

重要规则：
• 被将军时不能走其他棋子（必须先应将）
• 不能走让己方王暴露在攻击下的走法（自杀走法）
• 如果被将军且三种应将方式都无法执行，就是将杀（Checkmate），对局结束`,
    related: ['checkmate', 'castling', 'stalemate']
  },
  {
    id: 'checkmate',
    keywords: ['将杀', '将死', 'checkmate', '杀棋', '赢棋', '获胜', '胜利'],
    title: '将杀（Checkmate）',
    content: `将杀（Checkmate）是国际象棋的胜利条件——当一方的王被将军，且没有任何合法走法可以解除将军时，该方输棋。

常见将杀模式：
• 底线杀：对方的王被自己的兵堵在底线，被车或后横线将杀
• 闷杀：王被自己的棋子完全包围，被马将杀
• 后+车配合：后和车配合形成将杀网
• 双车杀：两个车交替将军，逐步逼近

残局基础将杀（需要练习）：
• 单车杀王：用车和王配合，逐步缩小对方王的活动空间
• 单后杀王：后和王配合将杀，注意避免逼和
• 双象杀王：两个象配合王控制对角线`,
    related: ['check', 'stalemate', 'endgame']
  },
  {
    id: 'stalemate',
    keywords: ['逼和', '无子可动', 'stalemate', '和棋', '平局', '无路可走'],
    title: '逼和（Stalemate）',
    content: `逼和（Stalemate）是国际象棋中和棋的一种。当轮到一方走棋时，该方没有被将军，但没有任何合法走法，则判定为逼和——对局以和棋结束。

常见逼和场景：
• 对方只剩王，己方优势很大但走法不精确，导致对方王无处可走
• 残局中多后但不会将杀，反而逼和
• 故意利用逼和规则从败势中逃生

如何避免逼和（优势方）：
• 每次走棋前确认对方王至少有一个安全格可走
• 残局杀王时，不要急于缩小包围圈到极限
• 学习标准的单车杀王、单后杀王技巧

如何制造逼和（劣势方）：
• 在绝望局面中，尽可能让己方棋子（尤其是王）无路可走
• 牺牲剩余棋子，让局面变成对方无法取胜的残局`,
    related: ['checkmate', 'check', 'draw']
  },
  {
    id: 'draw',
    keywords: ['和棋', '平局', 'draw', '和', '三次重复', '50步', '协议和棋'],
    title: '和棋（Draw）的几种方式',
    content: `国际象棋中有多种和棋方式：

1. 逼和（Stalemate）：一方无合法走法且未被将军

2. 三次重复局面：同一局面（同一方走棋、相同棋子位置、相同易位和吃过路兵权利）出现三次，任一方可要求和棋

3. 50步规则：连续50步没有吃子也没有兵移动，任一方可要求和棋

4. 协议和棋：双方同意和棋

5. 子力不足：双方都没有足够的子力将杀对方（如：单王对单王、单王对象/马）

6. 理论死和：虽然子力足够但无论如何走都无法将杀（极罕见）`,
    related: ['stalemate', 'checkmate']
  },
  {
    id: 'opening',
    keywords: ['开局', '开局原则', '怎么开局', '一开始', 'opening', '出子', '布局'],
    title: '开局基本原则',
    content: `开局是国际象棋对局的最初阶段（通常前10-15步）。核心目标是为中局建立良好基础。

开局三大原则：
1. 控制中心：用兵和轻子争夺d4、d5、e4、e5四个中心格
2. 快速出子：优先出动马和象（轻子），不要过早出动后
3. 王车易位：尽早易位确保王的安全

常见开局陷阱（避免）：
• 不要用同一棋子反复走（浪费出子时间）
• 不要过早出动后（容易被对方追击）
• 不要随意推进王翼兵（会暴露王的防线）
• 不要贪吃对方弃兵（可能是陷阱）

经典开局推荐（新手）：
• 意大利开局：1.e4 e5 2.Nf3 Nc6 3.Bc4
• 西班牙开局：1.e4 e5 2.Nf3 Nc6 3.Bb5
• 后翼弃兵：1.d4 d5 2.c4`,
    related: ['piece-movement', 'castling', 'middlegame']
  },
  {
    id: 'middlegame',
    keywords: ['中局', '中盘', '战术', '战术组合', '攻击', '进攻'],
    title: '中局战术基础',
    content: `中局是国际象棋中最复杂的阶段，双方子力基本就位，开始正面交锋。

基础战术手段：
• 捉双（Fork）：一个棋子同时攻击两个目标（马是最擅长捉双的棋子）
• 牵制（Pin）：攻击对方一个棋子，使其不敢移动（因为后面有更重要的棋子）
• 串击（Skewer）：攻击一条线上的两个棋子，前面的被迫移动，后面的被吃
• 闪击（Discovered Attack）：移动中间棋子，暴露后面的棋子发动攻击
• 双将（Double Check）：两个棋子同时将军，王必须逃跑（不能垫也不能吃）

中局思维框架：
1. 先检查：对方有没有将军/吃子威胁？
2. 再找战术：有没有捉双、牵制等战术机会？
3. 改善位置：把棋子放在更好的位置（控制更多格子）
4. 寻找弱点：对方有没有孤兵、叠兵、暴露的王？`,
    related: ['opening', 'endgame', 'piece-movement']
  },
  {
    id: 'endgame',
    keywords: ['残局', '残', 'endgame', '终局', '收尾', '收官'],
    title: '残局基本原则',
    content: `残局是双方棋子大幅减少后的阶段。王的角色从被保护者变为战斗者。

残局核心原则：
1. 王要活跃：残局中王要主动走向中心参与战斗
2. 兵要推进：通路兵（没有对方兵阻挡的兵）价值极高，要全力推进
3. 精确计算：残局中每一步都很关键，一步错可能从胜势变和棋

基础残局技巧：
• 对王（Opposition）：王面对面相隔1格，迫使对方王让路
• 正方形法则：判断兵能否在对方王追上之前升变
• 三角等待：通过重复走法让对方陷入被动

必须掌握的残局：
• 单车杀王 ⭐⭐⭐
• 单后杀王 ⭐⭐⭐
• 王+兵对王 ⭐⭐`,
    related: ['checkmate', 'stalemate', 'promotion']
  },
  {
    id: 'pawn-structure',
    keywords: ['兵型', '兵结构', '叠兵', '孤兵', '通路兵', '兵链', 'doubled pawn', 'isolated pawn'],
    title: '兵型结构',
    content: `兵型是国际象棋局面评估的核心要素，因为兵不能后退，每一步兵动都是永久性改变。

常见兵型：
• 通路兵（Passed Pawn）：前进路线上没有对方兵阻挡，升变威胁大
• 孤兵（Isolated Pawn）：相邻列没有己方兵保护，容易成为攻击目标
• 叠兵（Doubled Pawn）：同一列上有两个己方兵，互相阻塞
• 落后兵（Backward Pawn）：落在兵链后面、无法被其他兵保护的兵
• 兵链（Pawn Chain）：对角线上相连的兵，互相保护

兵型策略：
• 尽量保持兵的连贯性，避免形成孤兵和叠兵
• 通路兵要全力推进，尤其在残局中
• 攻击对方的兵型弱点（孤兵、落后兵）
• 兵的推进会留下永久性的格子空隙，慎重考虑`,
    related: ['promotion', 'endgame', 'middlegame']
  },
  {
    id: 'piece-value',
    keywords: ['分值', '价值', '子力', '换子', '交换', '值多少', 'value'],
    title: '棋子价值与交换',
    content: `棋子价值是衡量子力交换是否划算的参考标准（不是绝对规则）：

后（Queen）= 9分
车（Rook）= 5分
象（Bishop）= 3分
马（Knight）= 3分
兵（Pawn）= 1分
王（King）= 无价（失去即输）

交换判断：
• 用车换后（5换9）= 赚4分，通常很划算
• 用象换马（3换3）= 等价交换，取决于局面
• 用车换马+兵（5换3+1）= 亏1分，但可能战术需要
• 用后换车+象+兵（9换5+3+1）= 平换，如果局面有利可以接受

特殊情况：
• 象和马虽然都是3分，但开放局面中象更强，封闭局面中马更强
• 双象（两个象）通常比双马或象+马更有优势
• 残局中兵的升变潜力远超1分的面值`,
    related: ['piece-movement', 'middlegame']
  },
  {
    id: 'game-rules',
    keywords: ['规则', '基本规则', '怎么玩', '玩法', '规则是什么', '新手', '入门', '初学', '刚学', '不懂'],
    title: '国际象棋基本规则',
    content: `国际象棋由两人对弈，白方先行。目标是"将杀"对方的王。

棋盘：8×8=64格，黑白交替。右下角为白格。

初始摆法（白方视角，从下往上）：
• 第1行（底线）：车-马-象-后-王-象-马-车
• 第2行：8个兵
（黑方对称，后在d线，王在e线）

走棋规则：
• 白方先走，之后双方轮流走棋
• 每步必须走一个己方棋子（不能不走）
• 不能把自己的王暴露在攻击下
• 被将军时必须先应将

胜负判定：
• 将杀对方王 → 获胜
• 对方认输 → 获胜
• 对方超时（限时对局）→ 获胜
• 逼和、三次重复、50步规则、协议和棋、子力不足 → 和棋

对局礼仪：
• 触摸棋子就必须走该棋子（正式比赛"摸子走子"规则）
• 开局前握手致意
• 认输时可以推倒自己的王表示投降`,
    related: ['piece-movement', 'check', 'checkmate', 'castling']
  },
  {
    id: 'notation',
    keywords: ['记谱', '棋谱', '记录', 'notation', 'PGN', '怎么记录', '读谱'],
    title: '国际象棋记谱法',
    content: `国际象棋使用代数记谱法（Algebraic Notation）记录走法。

格子命名：列a-h（从左到右），行1-8（从白方底线往上）。如白方后初始位置在d1。

记谱格式：棋子字母 + 目标格子
• 兵：只写目标格（如 e4, d5）
• 马：Nf3（马到f3）
• 象：Bc4
• 车：Rd1
• 后：Qh5
• 王：Ke2

特殊符号：
• x = 吃子（如 Nxe5 = 马吃e5）
• + = 将军
• # = 将杀
• O-O = 王翼易位
• O-O-O = 后翼易位
• =Q = 升变为后
• ! = 好棋，!! = 妙棋
• ? = 失误，?? = 严重失误

示例：1.e4 e5 2.Nf3 Nc6 3.Bb5 a6（西班牙开局）`,
    related: ['piece-movement', 'game-rules']
  }
];

/**
 * 自然语言匹配引擎
 * 基于关键词权重匹配 + 模糊匹配
 */
export const findBestMatch = (query: string): { entry: RuleEntry; score: number } | null => {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  let bestScore = 0;
  let bestEntry: RuleEntry | null = null;

  for (const entry of RULE_KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase();
      // 精确匹配
      if (q.includes(kw)) {
        score += kw.length >= 4 ? 3 : 2;
      }
      // 部分匹配
      else if (kw.includes(q) || q.includes(kw)) {
        score += 1;
      }
    }

    // 标题匹配额外加分
    if (q.includes(entry.title.toLowerCase())) {
      score += 5;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // 如果分数太低，返回基础规则
  if (!bestEntry || bestScore < 2) {
    return {
      entry: RULE_KNOWLEDGE_BASE.find(e => e.id === 'game-rules')!,
      score: 0
    };
  }

  return { entry: bestEntry, score: bestScore };
};

/**
 * 获取相关问题
 */
export const getRelatedEntries = (relatedIds: string[]): RuleEntry[] => {
  return relatedIds
    .map(id => RULE_KNOWLEDGE_BASE.find(e => e.id === id))
    .filter((e): e is RuleEntry => !!e);
};
