import { CBSEClass, Subject, Chapter, QuizQuestion, PYQPaper, FormulaItem } from '../types/cbse';

export const CBSE_CLASSES: { id: CBSEClass; label: string; stage: string; badge: string }[] = [
  { id: '6', label: 'Class VI', stage: 'Middle School', badge: 'Class 6' },
  { id: '7', label: 'Class VII', stage: 'Middle School', badge: 'Class 7' },
  { id: '8', label: 'Class VIII', stage: 'Middle School', badge: 'Class 8' },
  { id: '9', label: 'Class IX', stage: 'Secondary Foundation', badge: 'Class 9' },
  { id: '10', label: 'Class X', stage: 'Board Examination', badge: 'Class 10 Board' },
  { id: '11', label: 'Class XI', stage: 'Senior Secondary', badge: 'Class 11' },
  { id: '12', label: 'Class XII', stage: 'Board & Competitive', badge: 'Class 12 Board' },
];

export const CBSE_SUBJECTS: Subject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    code: '041',
    icon: 'Calculator',
    color: '#0284C7',
    description: 'Algebra, Geometry, Trigonometry, Calculus, Statistics & NCERT Exemplar',
    classes: ['6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: 'science',
    name: 'Science',
    code: '086',
    icon: 'Atom',
    color: '#059669',
    description: 'Physics, Chemistry & Biology integrated NCERT curriculum',
    classes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'physics',
    name: 'Physics',
    code: '042',
    icon: 'Zap',
    color: '#7C3AED',
    description: 'Mechanics, Electrodynamics, Optics, Modern Physics & CBSE Derivations',
    classes: ['11', '12'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: '043',
    icon: 'FlaskConical',
    color: '#D97706',
    description: 'Physical, Inorganic, Organic Chemistry & Named Reactions',
    classes: ['11', '12'],
  },
  {
    id: 'biology',
    name: 'Biology',
    code: '044',
    icon: 'Dna',
    color: '#10B981',
    description: 'Genetics, Ecology, Human Physiology & NCERT Diagrams',
    classes: ['11', '12'],
  },
  {
    id: 'social-science',
    name: 'Social Science',
    code: '087',
    icon: 'Globe',
    color: '#DC2626',
    description: 'History, Geography, Democratic Politics & Economics',
    classes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'english',
    name: 'English Language & Lit',
    code: '184',
    icon: 'BookOpen',
    color: '#4B5563',
    description: 'Reading comprehension, writing skills, prose, poetry & grammar',
    classes: ['6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: 'computer-science',
    name: 'Computer Science / IT',
    code: '083',
    icon: 'Code',
    color: '#2563EB',
    description: 'Python programming, Database management, Computer networks & Cyber ethics',
    classes: ['9', '10', '11', '12'],
  },
];

export const CBSE_CHAPTERS: Chapter[] = [
  // CLASS 10 - SCIENCE
  {
    id: 'c10-sci-ch1',
    classNum: '10',
    subjectId: 'science',
    chapterNumber: 1,
    title: 'Chemical Reactions and Equations',
    ncertBookName: 'Science Class X - NCERT',
    editionYear: '2024–25 / 2025–26 Latest Rationalized Edition',
    weightageMarks: 6,
    estimatedReadTimeMinutes: 20,
    summary: 'A complete study of chemical changes, word equations, balancing chemical equations through the hit-and-trial method, types of chemical reactions (Combination, Decomposition, Displacement, Double Displacement, Oxidation-Reduction), and daily life effects like corrosion and rancidity.',
    resourceMaterials: [
      {
        title: 'Official NCERT e-Textbook (Latest Edition)',
        type: 'NCERT Official',
        description: 'Direct access to the rationalized NCERT Chapter 1 textbook PDF from ncert.nic.in',
        url: 'https://ncert.nic.in/textbook.php?jesc1=1-13'
      },
      {
        title: 'NCERT Science Exemplar Problems & Solutions',
        type: 'Exemplar',
        description: 'Advanced multiple-choice, short-answer, and high-order thinking skill (HOTS) questions.',
        url: 'https://ncert.nic.in/exemplar-problems.php'
      },
      {
        title: 'DIKSHA National Education Portal QR Content',
        type: 'Diksha',
        description: 'Interactive simulations, 3D chemical reaction models, and video explanations by Ministry of Education.',
        url: 'https://diksha.gov.in'
      },
      {
        title: 'CBSE Science Class 10 Lab Manual Practical Skills',
        type: 'Lab Manual',
        description: 'Experiments on action of water on quicklime, heating of FeSO4, and reaction of Zn with dil. HCl.',
        url: 'https://cbseacademic.nic.in'
      }
    ],
    slideDeck: {
      id: 'deck-c10-sci-ch1',
      chapterId: 'c10-sci-ch1',
      title: 'Chemical Reactions & Equations',
      subjectName: 'Science',
      classNum: '10',
      slides: [
        {
          id: 's1',
          slideNumber: 1,
          title: 'Chemical Reactions and Equations',
          subtitle: 'NCERT Class 10 · Chapter 1 · Latest Edition',
          category: 'Overview',
          badgeColor: 'sky',
          contentBullets: [
            'Understanding physical changes vs. irreversible chemical transformations',
            'Evolution of gas, change in temperature, color shift, or precipitate formation',
            'Enforcing the Law of Conservation of Mass via stoichiometric balancing',
            'CBSE Board Weightage: 5 to 6 Marks (Guaranteed balanced equation question)'
          ],
          calloutBox: {
            title: 'Learning Objective',
            text: 'Master hit-and-trial balancing with mandatory state symbols (s, l, g, aq) to secure full marks.',
            variant: 'info'
          },
          speakerNotes: 'Welcome students to Chapter 1. Emphasize that chemical reactions form the bedrock of entire Class 10 chemistry.'
        },
        {
          id: 's2',
          slideNumber: 2,
          title: 'Classification of Chemical Reactions',
          subtitle: 'The 5 Fundamental Reaction Types',
          category: 'Core Concept',
          badgeColor: 'emerald',
          contentBullets: [
            'Combination: Two or more reactants yield one single product (CaO + H₂O → Ca(OH)₂)',
            'Decomposition: Single reactant breaks down using Heat (Δ), Light (hν), or Electricity',
            'Displacement: More reactive element displaces a less reactive element from salt solution',
            'Double Displacement: Mutual exchange of ions producing an insoluble precipitate',
            'Redox: Simultaneous Oxidation (gain of O / loss of e⁻) and Reduction (loss of O / gain of e⁻)'
          ],
          calloutBox: {
            title: 'Board Exam Golden Rule',
            text: 'Respiration is Exothermic (ΔH < 0), while Photosynthesis is Endothermic (ΔH > 0).',
            variant: 'warning'
          },
          speakerNotes: 'Walk students through each reaction type. Ask them to give one real-life example of each.'
        },
        {
          id: 's3',
          slideNumber: 3,
          title: 'Electrolysis & Photolytic Decomposition',
          subtitle: 'Visual Mechanism & Experimental Setup',
          category: 'Diagram & Mechanism',
          badgeColor: 'indigo',
          diagramType: 'chemical_reaction',
          diagramTitle: 'Electrolytic Decomposition of Water (2:1 Volume Ratio)',
          contentBullets: [
            'Water decomposes into Hydrogen at Cathode (-ve) and Oxygen at Anode (+ve)',
            'Volume of H₂ gas is double that of O₂ because H₂O has 2 Hydrogen atoms per 1 Oxygen atom',
            'White AgCl and pale yellow AgBr turn grey in sunlight due to photolytic cleavage into metallic silver',
            'Key commercial application: Used in traditional black-and-white photography'
          ],
          calloutBox: {
            title: 'Activity 1.7 Key Question',
            text: 'Cathode collects H₂ (tested by pop sound). Anode collects O₂ (re-ignites glowing splinter).',
            variant: 'success'
          },
          speakerNotes: 'Focus on the 2:1 volume ratio. This is a very frequent 3-mark CBSE question.'
        },
        {
          id: 's4',
          slideNumber: 4,
          title: 'Master Reaction Sheet & Equations',
          subtitle: 'Must-Memorize Balanced Formulas with Physical States',
          category: 'Formulas & Laws',
          badgeColor: 'amber',
          contentBullets: [
            'Slaked Lime: CaO(s) [Quicklime] + H₂O(l) → Ca(OH)₂(aq) [Slaked Lime] + Heat',
            'Wall Coating: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) [Limestone] + H₂O(l)',
            'Ferrous Sulphate Heating: 2FeSO₄(s) [Green] --Δ--> Fe₂O₃(s) [Red-brown] + SO₂(g) + SO₃(g)',
            'Lead Nitrate Heating: 2Pb(NO₃)₂(s) --Δ--> 2PbO(s) [Yellow] + 4NO₂(g) [Brown Fumes] + O₂(g)'
          ],
          calloutBox: {
            title: 'Observation Note',
            text: 'Brown fumes = Nitrogen dioxide (NO₂). Choking sulfur odor = SO₂ & SO₃ gases.',
            variant: 'formula'
          },
          speakerNotes: 'Have students write down and balance the Lead Nitrate equation three times.'
        },
        {
          id: 's5',
          slideNumber: 5,
          title: 'Redox Reactions & Corrosion',
          subtitle: 'Oxidation, Reduction, Rusting & Rancidity',
          category: 'Board Questions',
          badgeColor: 'purple',
          contentBullets: [
            'CuO + H₂ --Heat--> Cu + H₂O: CuO is Reduced (Oxidizing agent); H₂ is Oxidized (Reducing agent)',
            'Corrosion: Degradation of metals by air, moisture, and acids (Rust: Fe₂O₃·xH₂O)',
            'Prevention of Rusting: Galvanisation (coating with Zinc), painting, greasing, alloying',
            'Rancidity: Oxidation of oily/fatty foods causing unpleasant smell. Prevented by flushing with Nitrogen gas'
          ],
          calloutBox: {
            title: 'Repeated 3-Mark Question',
            text: 'Identify oxidizing agent & reducing agent in MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂.',
            variant: 'warning'
          },
          speakerNotes: 'Remind students: the substance that is oxidized is itself the reducing agent.'
        },
        {
          id: 's6',
          slideNumber: 6,
          title: 'Chapter Summary & Quick Revision Checklist',
          subtitle: 'Target 100/100 Recall Points',
          category: 'Summary',
          badgeColor: 'teal',
          contentBullets: [
            'Balanced equation obeys Law of Conservation of Mass',
            'Physical state symbols (s, l, g, aq) are mandatory on CBSE answer sheets',
            'Quicklime is CaO; Slaked lime is Ca(OH)₂; Marble/Limestone is CaCO₃',
            'Precipitate reactions are double displacement reactions yielding an insoluble salt',
            'Chip packets are flushed with unreactive Nitrogen gas to prevent oxidative rancidity'
          ],
          calloutBox: {
            title: 'Exam Readiness Check',
            text: 'Solve NCERT Exercise Q4, Q6, and Q9 before taking the chapter quiz drill.',
            variant: 'info'
          },
          speakerNotes: 'Encourage students to practice the chapter quiz and download the NotebookLM source pack.'
        }
      ]
    },
    keyPoints: [
      'A chemical reaction involves breaking of chemical bonds and formation of new bonds to produce substances with entirely new properties.',
      'Law of Conservation of Mass states that mass can neither be created nor destroyed in a chemical reaction; hence number of atoms of each element remains identical on both sides.',
      'Endothermic reactions absorb heat (e.g., Photosynthesis, Decomposition of Calcium Carbonate), while Exothermic reactions release heat (e.g., Respiration, Burning of Natural Gas).',
      'Precipitation reactions yield an insoluble salt separating out from solution.',
      'Redox reactions occur when oxidation (gain of oxygen or loss of electrons) and reduction (loss of oxygen or gain of electrons) take place simultaneously.',
    ],
    keyDefinitions: [
      {
        term: 'Combination Reaction',
        definition: 'A reaction where two or more reactants combine to form a single product. Example: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.',
      },
      {
        term: 'Thermal Decomposition',
        definition: 'A decomposition reaction brought about by the application of heat. Example: 2FeSO₄(s) --Δ--> Fe₂O₃(s) + SO₂(g) + SO₃(g).',
      },
      {
        term: 'Displacement Reaction',
        definition: 'A reaction in which a more reactive element displaces a less reactive element from its compound solution. Example: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).',
      },
      {
        term: 'Corrosion',
        definition: 'The gradual degradation of metals when attacked by substances around it such as moisture, acids, and oxygen. Rust formula: Fe₂O₃·xH₂O.',
      },
      {
        term: 'Rancidity',
        definition: 'The oxidation of fats and oils in food when left exposed to air, resulting in an unpleasant taste and foul smell. Prevented by antioxidants, flush with nitrogen gas, or refrigeration.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Slaked Lime Formation (Exothermic)',
        expression: 'CaO (Quicklime) + H₂O → Ca(OH)₂ (Slaked lime) + Heat (ΔH < 0)',
        explanation: 'Used for whitewashing walls. Ca(OH)₂ reacts slowly with CO₂ in air to form shiny CaCO₃ layer.',
      },
      {
        title: 'Electrolytic Decomposition of Water',
        expression: '2H₂O(l) --Electricity--> 2H₂(g) + O₂(g) [Volume ratio H₂:O₂ = 2:1]',
        explanation: 'Hydrogen collects at cathode (-ve) and oxygen at anode (+ve). Volume of H₂ is double because water has 2 H atoms per 1 O atom.',
      },
      {
        title: 'Photolytic Decomposition of Silver Chloride',
        expression: '2AgCl(s) --Sunlight--> 2Ag(s) [Grey] + Cl₂(g)',
        explanation: 'Used in black-and-white photography. White AgCl turns grey in sunlight.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'In-Text Q1 (Page 6)',
        type: 'In-Text',
        question: 'Why should a magnesium ribbon be cleaned before burning in air?',
        answer: 'Magnesium is a reactive metal. When exposed to air, it forms a protective, stable layer of basic magnesium oxide (MgO) or basic magnesium carbonate on its surface. This layer prevents further contact of magnesium with atmospheric oxygen. Cleaning it with sandpaper removes this oxide film, enabling smooth burning with a dazzling white flame.',
        markingPoints: ['Presence of basic magnesium oxide coating (1 mark)', 'Sandpaper removes protective layer to expose pure metal (1 mark)'],
      },
      {
        questionNumber: 'Exercise Q6 (Page 15)',
        type: 'Exercise',
        question: 'Balance the following chemical equations: (a) HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + H₂O (b) NaOH + H₂SO₄ → Na₂SO₄ + H₂O',
        answer: '(a) 2HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + 2H₂O\n(b) 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O\nStep method: Equalize nitrate groups and sodium atoms first, then balance hydrogen and oxygen.',
        markingPoints: ['Correct stoichiometric coefficients 2:1:1:2 (1 mark)', 'State symbols and conservation of atoms check (1 mark)'],
      },
      {
        questionNumber: 'CBSE Exemplar Q9',
        type: 'Exemplar',
        question: 'Identify the substance oxidized, reduced, oxidizing agent, and reducing agent in: MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂.',
        answer: '1. Substance oxidized: HCl (loses hydrogen / loses electrons to form Cl₂).\n2. Substance reduced: MnO₂ (loses oxygen to form MnCl₂).\n3. Oxidizing agent: MnO₂ (supplies oxygen, causes oxidation of HCl).\n4. Reducing agent: HCl (removes oxygen from MnO₂).',
        markingPoints: ['Correct identification of oxidized and reduced substances (1 mark)', 'Correct oxidizing and reducing agents with rationale (1 mark)'],
      },
    ],
    commonMistakes: [
      'Confusing displacement with double displacement: In single displacement an element reacts with a compound; in double displacement two compounds exchange ions.',
      'Writing unbalanced equations when asked for chemical reactions in board exams (instant deduction of 0.5 to 1 mark).',
      'Forgetting physical state symbols (s, l, g, aq) which are mandatory in CBSE 3-mark and 5-mark answers.',
    ],
    boardExamTips: [
      'Frequent 3-marker: Color changes in FeSO₄ heating (green to brown Fe₂O₃ with choking odor of SO₂ and SO₃).',
      'Draw test-tube diagram for Electrolysis of Water labeling cathode (-ve, H₂) and anode (+ve, O₂).',
      'Always underline key chemical names and write balanced molecular equations below word descriptions.',
    ],
  },

  // CLASS 10 - SCIENCE CH 6 LIFE PROCESSES
  {
    id: 'c10-sci-ch6',
    classNum: '10',
    subjectId: 'science',
    chapterNumber: 6,
    title: 'Life Processes',
    ncertBookName: 'Science Class X - NCERT',
    editionYear: '2024–25 / 2025–26 Latest Rationalized Edition',
    weightageMarks: 8,
    estimatedReadTimeMinutes: 25,
    summary: 'Detailed coverage of the fundamental vital activities that keep living organisms alive: Autotrophic & Heterotrophic Nutrition, Human Digestive System, Aerobic & Anaerobic Respiration, Transportation in Humans & Plants (Double Circulation, Xylem & Phloem), and Human Excretory System (Nephron structure & urine formation).',
    resourceMaterials: [
      {
        title: 'Official NCERT Life Processes Textbook PDF',
        type: 'NCERT Official',
        description: 'Complete rationalized chapter text covering human physiology and plant vascular systems.',
        url: 'https://ncert.nic.in/textbook.php'
      },
      {
        title: 'CBSE Class 10 Biology Diagram Bank & Marking Scheme',
        type: 'Exemplar',
        description: 'High-yield labeled diagrams of Human Heart, Nephron, Alimentary Canal, and Stomatal apparatus.',
        url: 'https://cbseacademic.nic.in'
      },
      {
        title: 'DIKSHA 3D Interactive Human Heart & Nephron Explorer',
        type: 'Diksha',
        description: 'Interactive simulations showing blood flow through atria and ventricles.',
        url: 'https://diksha.gov.in'
      }
    ],
    slideDeck: {
      id: 'deck-c10-sci-ch6',
      chapterId: 'c10-sci-ch6',
      title: 'Life Processes - Biology',
      subjectName: 'Science',
      classNum: '10',
      slides: [
        {
          id: 'lp-s1',
          slideNumber: 1,
          title: 'Life Processes: Nutrition & Energy',
          subtitle: 'NCERT Class 10 · Chapter 6',
          category: 'Overview',
          badgeColor: 'emerald',
          contentBullets: [
            'Autotrophic nutrition: 6CO₂ + 12H₂O --Sunlight / Chlorophyll--> C₆H₁₂O₆ + 6O₂ + 6H₂O',
            'Heterotrophic nutrition: Holozoic (Humans), Saprophytic (Fungi), Parasitic (Cuscuta)',
            'Site of photosynthesis: Chloroplasts containing green chlorophyll pigment in thylakoids',
            'Stomatal pore opening and closing regulated by turgor pressure of Guard Cells'
          ],
          calloutBox: {
            title: 'CBSE 3-Mark Activity',
            text: 'Iodine test proves starch synthesis. KOH absorbs CO₂ to demonstrate necessity of carbon dioxide.',
            variant: 'info'
          },
          speakerNotes: 'Start by explaining that living organisms require continuous energy intake for maintenance even when sleeping.'
        },
        {
          id: 'lp-s2',
          slideNumber: 2,
          title: 'Human Digestive System Architecture',
          subtitle: 'Enzyme Pathways from Mouth to Ileum',
          category: 'Core Concept',
          badgeColor: 'sky',
          contentBullets: [
            'Mouth: Salivary Amylase digests Starch into simple disaccharide Maltose',
            'Stomach: Gastric juice contains HCl (activates pepsin, kills germs), Pepsin (proteins), and Mucus (protects lining)',
            'Small Intestine: Site of complete digestion; receives Bile from liver and Pancreatic juice',
            'Villi: Finger-like projections in ileum with massive surface area and rich capillary network for absorption'
          ],
          calloutBox: {
            title: 'Enzyme Summary',
            text: 'Trypsin digests proteins into amino acids; Lipase digests emulsified fats into fatty acids & glycerol.',
            variant: 'success'
          },
          speakerNotes: 'Emphasize bile salts role in emulsification. Bile contains no digestive enzymes but is crucial for fat digestion.'
        },
        {
          id: 'lp-s3',
          slideNumber: 3,
          title: 'Human Double Circulation System',
          subtitle: 'Pulmonary & Systemic Circulation Loops',
          category: 'Diagram & Mechanism',
          badgeColor: 'indigo',
          diagramType: 'human_heart',
          diagramTitle: 'Four-Chambered Heart & Oxygenation Circuit',
          contentBullets: [
            'Right Atrium receives deoxygenated blood from Vena Cava and passes it to Right Ventricle',
            'Right Ventricle pumps blood to lungs via Pulmonary Artery for oxygenation',
            'Pulmonary Vein brings oxygen-rich blood into Left Atrium, which fills Left Ventricle',
            'Thick muscular Left Ventricle contracts forcefully, pumping blood to body tissues via Systemic Aorta'
          ],
          calloutBox: {
            title: 'Why Double Circulation?',
            text: 'Prevents mixing of oxygenated & deoxygenated blood, ensuring high metabolic efficiency and constant body temperature.',
            variant: 'warning'
          },
          speakerNotes: 'Point out that pulmonary artery is the only artery carrying deoxygenated blood, and pulmonary vein is the only vein carrying oxygenated blood.'
        },
        {
          id: 'lp-s4',
          slideNumber: 4,
          title: 'Respiration Pathways & ATP Production',
          subtitle: 'Aerobic vs. Anaerobic Energy Generation',
          category: 'Formulas & Laws',
          badgeColor: 'amber',
          contentBullets: [
            'Common Step: Glucose (6-carbon) breaks down in Cytoplasm to Pyruvate (3-carbon) + Energy',
            'Absence of O₂ (Yeast): Ethanol + CO₂ + 2 ATP (Fermentation)',
            'Lack of O₂ (Human Muscle during sprint): Lactic Acid + 2 ATP (Causes painful muscle cramps)',
            'Presence of O₂ (Mitochondria): CO₂ + H₂O + 38 ATP (High energy yield aerobic respiration)'
          ],
          calloutBox: {
            title: 'Universal Flowchart',
            text: 'Draw the 3-pathway pyruvate breakdown chart. This is a 100% recurring board question.',
            variant: 'formula'
          },
          speakerNotes: 'Explain why athletes get cramps and how hot water baths or massages relieve them by increasing blood circulation.'
        },
        {
          id: 'lp-s5',
          slideNumber: 5,
          title: 'Human Excretory System & Nephron',
          subtitle: 'The 3 Steps of Urine Formation',
          category: 'Board Questions',
          badgeColor: 'purple',
          contentBullets: [
            'Glomerular Ultrafiltration: High pressure in glomerulus forces water, glucose, urea, and salts into Bowman capsule',
            'Selective Reabsorption: Useful glucose, amino acids, and water are reabsorbed along PCT and Loop of Henle',
            'Tubular Secretion: Excess K⁺, H⁺ ions, and drugs are secreted into collecting duct to maintain electrolyte balance',
            'Hemodialysis: Artificial kidney filtering nitrogenous wastes from patient blood through cellophane dialyzing coils'
          ],
          calloutBox: {
            title: 'Nephron Diagram Checklist',
            text: 'Label: Glomerulus, Bowman Capsule, Proximal Convoluted Tubule (PCT), Loop of Henle, Collecting Tubule.',
            variant: 'info'
          },
          speakerNotes: 'Remind students not to confuse ureter (carries urine from kidney to bladder) with urethra (excretes urine outside).'
        },
        {
          id: 'lp-s6',
          slideNumber: 6,
          title: 'Biology Board Exam Checklist & Tips',
          subtitle: 'Mastery in Diagram Drawing & Key Terms',
          category: 'Summary',
          badgeColor: 'teal',
          contentBullets: [
            'All diagrams must be drawn in sharp pencil with horizontal labeling on the right side',
            'Never forget valves in heart: Tricuspid, Bicuspid (Mitral), and Semilunar valves prevent backflow',
            'Xylem transports water unidirectionally; Phloem transports sucrose bidirectionally with ATP energy',
            'Transpiration pull creates negative hydrostatic pressure that draws water up tall canopy trees'
          ],
          calloutBox: {
            title: 'Final Revision Check',
            text: 'Review NCERT Page 95, 102, and 110 in-text questions before the exam.',
            variant: 'success'
          },
          speakerNotes: 'Encourage students to practice the interactive quiz for this chapter and test their retention.'
        }
      ]
    },
    keyPoints: [
      'Photosynthesis equation: 6CO₂ + 12H₂O --Chlorophyll + Sunlight--> C₆H₁₂O₆ + 6O₂ + 6H₂O.',
      'Digestion in humans begins in mouth (salivary amylase digests starch to maltose), stomach produces HCl, pepsin, and mucus, while small intestine is site of complete digestion.',
      'Aerobic respiration produces 38 (or 30-32) ATP in mitochondria, while anaerobic respiration produces 2 ATP (Ethanol + CO₂ in yeast, Lactic acid in human muscle cells).',
      'Double circulation ensures separation of oxygenated and deoxygenated blood, allowing high metabolic efficiency in mammals and birds.',
      'Nephrons perform filtration of blood in Bowman capsule, selective reabsorption of glucose, amino acids, and water in tubular part, and secretion of waste.',
    ],
    keyDefinitions: [
      {
        term: 'Peristaltic Movement',
        definition: 'Rhythmic contraction and expansion of involuntary muscles of the alimentary canal lining that pushes food forward throughout the digestive tract.',
      },
      {
        term: 'Emulsification of Fats',
        definition: 'Breakdown of large fat globules into tiny droplets by bile salts from liver, increasing the surface area for lipase action.',
      },
      {
        term: 'Double Circulation',
        definition: 'The circulation pattern where blood passes through the human heart twice in one complete cardiac cycle: Pulmonary Circulation (Heart to Lungs to Heart) and Systemic Circulation (Heart to Body tissues to Heart).',
      },
      {
        term: 'Translocation',
        definition: 'Transport of soluble products of photosynthesis (sucrose, amino acids) from leaves to storage organs and growing regions via phloem using energy from ATP.',
      },
      {
        term: 'Ultrafiltration in Nephron',
        definition: 'Filtration of blood under high pressure in the glomerulus into the Bowman capsule, separating small molecules (water, urea, salts, glucose) while retaining proteins and blood cells.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Photosynthesis Overall Chemical Equation',
        expression: '6CO₂ + 6H₂O --Sunlight / Chlorophyll--> C₆H₁₂O₆ + 6O₂',
        explanation: 'Three steps: Absorption of light energy by chlorophyll, conversion of light energy to chemical energy & splitting of water, reduction of CO₂ to carbohydrates.',
      },
      {
        title: 'Breakdown of Glucose by Various Pathways',
        expression: 'Glucose (6C) --Cytoplasm--> Pyruvate (3C) + Energy --> (1) Absence of O₂ (Yeast): Ethanol + CO₂ + Energy; (2) Lack of O₂ (Muscle): Lactic acid + Energy; (3) Presence of O₂ (Mitochondria): CO₂ + H₂O + Energy',
        explanation: 'Universal flow diagram repeatedly asked for 3 marks in CBSE Class 10 Board exams.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'NCERT In-Text Q3 (Page 95)',
        type: 'In-Text',
        question: 'What is the role of the acid in our stomach?',
        answer: 'The gastric glands in the stomach wall secrete Hydrochloric acid (HCl). Its roles are:\n1. It creates an acidic medium (pH 1.5 to 2.5) which is essential to activate the inactive proenzyme pepsinogen into the active protein-digesting enzyme pepsin.\n2. It kills harmful bacteria, germs, and pathogens ingested along with food.\n3. It stops the salivary amylase action.',
        markingPoints: ['Activation of pepsinogen into pepsin (1 mark)', 'Germicidal action killing food pathogens (1 mark)'],
      },
      {
        questionNumber: 'Exercise Q4 (Page 113)',
        type: 'Exercise',
        question: 'How are the alveoli designed to maximize the exchange of gases?',
        answer: 'Alveoli are optimized for gas exchange by:\n1. Tremendous surface area: Millions of alveoli in both lungs provide an expansive surface area of roughly 80 m².\n2. Thin walls: The alveolar walls are one-cell thick composed of delicate squamous epithelium.\n3. Rich network of blood capillaries: Surrounded by extensive capillary beds facilitating rapid diffusion of oxygen into blood and CO₂ into alveoli.\n4. Moist inner surface: Facilitates dissolution and rapid diffusion of gases.',
        markingPoints: ['Extensive surface area and folding (1 mark)', 'One-cell thin walls with rich capillary network (1 mark)'],
      },
    ],
    commonMistakes: [
      'Writing that digestion occurs in large intestine (Large intestine only reabsorbs water, no digestive enzyme is secreted).',
      'Confusing xylem and phloem transport direction: Xylem is strictly unidirectional (roots to leaves), phloem is bidirectional (leaves to roots and growing buds).',
    ],
    boardExamTips: [
      'Draw well-labeled diagrams: Human Heart with 4 chambers, valves, and flow arrows, and Nephron with glomerulus and collecting duct.',
      'Case study questions frequently focus on anaerobic respiration and cramps in athletes due to lactic acid accumulation.',
    ],
  },

  // CLASS 10 - MATHS CH 8 TRIGONOMETRY
  {
    id: 'c10-math-ch8',
    classNum: '10',
    subjectId: 'maths',
    chapterNumber: 8,
    title: 'Introduction to Trigonometry',
    ncertBookName: 'Mathematics Class X - NCERT',
    weightageMarks: 8,
    estimatedReadTimeMinutes: 20,
    summary: 'Ratios of sides of a right-angled triangle with respect to its acute angles (sin, cos, tan, cot, sec, cosec). Values of trigonometric ratios of standard angles (0°, 30°, 45°, 60°, 90°), and trigonometric identities proofs and applications.',
    keyPoints: [
      'In a right triangle ABC with right angle at B: sin A = Perpendicular / Hypotenuse = BC / AC; cos A = Base / Hypotenuse = AB / AC; tan A = BC / AB.',
      'Reciprocal identities: cosec A = 1 / sin A, sec A = 1 / cos A, cot A = 1 / tan A = cos A / sin A.',
      'Fundamental Identity: sin²θ + cos²θ = 1 for all 0° ≤ θ ≤ 90°.',
      'Second Identity: 1 + tan²θ = sec²θ (or sec²θ - tan²θ = 1) for 0° ≤ θ < 90°.',
      'Third Identity: 1 + cot²θ = cosec²θ (or cosec²θ - cot²θ = 1) for 0° < θ ≤ 90°.',
    ],
    keyDefinitions: [
      {
        term: 'Trigonometric Ratio',
        definition: 'The ratio of the lengths of two sides of a right-angled triangle defined relative to one of its acute angles.',
      },
      {
        term: 'Trigonometric Identity',
        definition: 'An equation involving trigonometric ratios of an angle which is true for all values of the angles for which the ratios are defined.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Table of Values for Standard Angles',
        expression: 'sin 0°=0, sin 30°=1/2, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1. cos values are reverse.',
        explanation: 'Mnemonic: √0/4, √1/4, √2/4, √3/4, √4/4.',
      },
      {
        title: 'Pythagorean Trigonometric Identities',
        expression: 'sin²θ + cos²θ = 1; sec²θ - tan²θ = 1; cosec²θ - cot²θ = 1',
        explanation: 'Derived directly from Pythagoras theorem (P² + B² = H²) dividing by H², B², and P² respectively.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'Exercise 8.4 Q5 (iii)',
        type: 'Exercise',
        question: 'Prove that: (tan θ) / (1 - cot θ) + (cot θ) / (1 - tan θ) = 1 + sec θ cosec θ',
        answer: 'LHS = (sin θ/cos θ) / (1 - cos θ/sin θ) + (cos θ/sin θ) / (1 - sin θ/cos θ)\n= sin²θ / [cos θ(sin θ - cos θ)] - cos²θ / [sin θ(sin θ - cos θ)]\n= (sin³θ - cos³θ) / [sin θ cos θ (sin θ - cos θ)]\nUsing a³ - b³ = (a - b)(a² + ab + b²):\n= [(sin θ - cos θ)(sin²θ + cos²θ + sin θ cos θ)] / [sin θ cos θ (sin θ - cos θ)]\n= (1 + sin θ cos θ) / (sin θ cos θ) = 1/(sin θ cos θ) + 1 = 1 + sec θ cosec θ = RHS. Hence proved.',
        markingPoints: ['Converting tan and cot to sin and cos (1 mark)', 'Factoring using a³ - b³ identity (1.5 marks)', 'Simplifying using sin²θ + cos²θ = 1 (1.5 marks)'],
      },
    ],
    commonMistakes: [
      'Writing sin(A + B) = sin A + sin B (This is mathematically incorrect; trigonometric ratios do not follow distributive property).',
      'Forgetting that (sin A)² is written as sin²A, NOT sin A².',
    ],
    boardExamTips: [
      'Standard 4-mark proof question always appears from NCERT Exercise 8.4 Q5. Practice all 10 subparts thoroughly.',
      'When stuck, convert every term into sin θ and cos θ.',
    ],
  },

  // CLASS 12 - PHYSICS CH 1 ELECTROSTATICS
  {
    id: 'c12-phy-ch1',
    classNum: '12',
    subjectId: 'physics',
    chapterNumber: 1,
    title: 'Electric Charges and Fields',
    ncertBookName: 'Physics Part I Class XII - NCERT',
    weightageMarks: 9,
    estimatedReadTimeMinutes: 30,
    summary: 'Electric charge properties (quantization, conservation, additivity), Coulomb law in vector form, superposition principle, electric field lines, electric dipole in uniform external field, electric flux, Gauss theorem and its three major applications (infinitely long straight wire, infinite plane sheet, thin spherical shell).',
    keyPoints: [
      'Charge is quantized: q = ±ne where e = 1.6 × 10⁻¹⁹ C and n is an integer.',
      'Coulomb force in vacuum: F = (1 / 4πε₀) · (|q₁ q₂| / r²) where 1 / 4πε₀ = 8.987 × 10⁹ N m² C⁻².',
      'Electric field lines never cross each other because if they did, at the point of intersection there would be two tangents indicating two directions of electric field, which is impossible.',
      'Gauss Law: The total electric flux through any closed surface in vacuum is 1/ε₀ times the total net charge enclosed: Φ = ∮ E·dA = q_enclosed / ε₀.',
      'Electric field inside a uniformly charged conducting spherical shell is zero everywhere.',
    ],
    keyDefinitions: [
      {
        term: 'Electric Dipole Moment (p)',
        definition: 'A vector quantity defined as the product of magnitude of either charge and distance vector between them (p = q · 2a), pointing from negative charge to positive charge.',
      },
      {
        term: 'Electric Flux (Φ)',
        definition: 'The total number of electric field lines passing normally through a given surface area. Mathematical formulation: Φ = ∫ E · dA = ∫ E dA cos θ.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Field of Dipole on Axial vs Equatorial Line',
        expression: 'E_axial = (1/4πε₀) · (2p / r³); E_equatorial = (1/4πε₀) · (p / r³) [For r >> a]',
        explanation: 'E_axial is exactly double E_equatorial at the same large distance r. E_axial is parallel to p, while E_equatorial is antiparallel to p.',
      },
      {
        title: 'Gauss Law Application: Infinite Plane Sheet of Charge',
        expression: 'E = σ / (2ε₀) [independent of distance r from sheet]',
        explanation: 'σ is uniform surface charge density. E is perpendicular to the plane sheet directed outward for positive σ.',
      },
      {
        title: 'Gauss Law Application: Infinitely Long Line of Charge',
        expression: 'E = λ / (2πε₀ r)',
        explanation: 'λ is linear charge density, r is perpendicular distance from the wire.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'NCERT Q1.12',
        type: 'Exercise',
        question: 'An electric dipole with dipole moment 4 × 10⁻⁹ C m is aligned at 30° with the direction of a uniform electric field of magnitude 5 × 10⁴ N/C. Calculate the magnitude of the torque acting on the dipole.',
        answer: 'Given:\np = 4 × 10⁻⁹ C m\nE = 5 × 10⁴ N/C\nθ = 30°\nTorque τ = p × E = p E sin θ\nτ = (4 × 10⁻⁹ C m) × (5 × 10⁴ N/C) × sin 30°\nτ = 20 × 10⁻⁵ × (1/2) = 10 × 10⁻⁵ = 10⁻⁴ N m.\nThe torque tends to align the dipole along the direction of the field.',
        markingPoints: ['Formula τ = p E sin θ (1 mark)', 'Correct substitution & final unit N·m (1 mark)'],
      },
    ],
    commonMistakes: [
      'Assuming electric field inside a hollow charged metal sphere is non-zero (E = 0 everywhere inside, potential is constant).',
      'Forgetting the vector notation in Coulomb law (F₁₂ = - F₂₁).',
    ],
    boardExamTips: [
      'Derivation of Gauss law application for infinite line or plane sheet is a guaranteed 3-mark or 5-mark question in alternate board sets.',
      'Remember torque on dipole in uniform field produces no net force (F_net = 0), but only a net torque τ = p × E.',
    ],
  },

  // CLASS 12 - CHEMISTRY CH 2 ELECTROCHEMISTRY
  {
    id: 'c12-chem-ch2',
    classNum: '12',
    subjectId: 'chemistry',
    chapterNumber: 2,
    title: 'Electrochemistry',
    ncertBookName: 'Chemistry Part I Class XII - NCERT',
    weightageMarks: 9,
    estimatedReadTimeMinutes: 28,
    summary: 'Galvanic and electrolytic cells, standard electrode potential, Nernst equation and its applications, relation between Gibbs free energy and cell EMF, molar conductivity and Kohlrausch law of independent migration of ions, batteries (primary, secondary, fuel cells), and corrosion.',
    keyPoints: [
      'Cell EMF: E°_cell = E°_cathode (reduction) - E°_anode (reduction).',
      'Nernst equation at 298 K: E_cell = E°_cell - (0.0591 / n) log [Anode ion concentration] / [Cathode ion concentration].',
      'Gibbs energy change: ΔG° = -n F E°_cell. For a spontaneous cell reaction, E°_cell must be positive and ΔG° must be negative.',
      'Kohlrausch law: Λ°_m = ν₊ λ°₊ + ν₋ λ°₋.',
      'Lead storage battery is a secondary cell: During discharge, Pb at anode and PbO₂ at cathode are converted into PbSO₄ and density of H₂SO₄ drops.',
    ],
    keyDefinitions: [
      {
        term: 'Molar Conductivity (Λm)',
        definition: 'Conducting power of all the ions produced by dissolving one mole of an electrolyte in a solution of volume V: Λm = (κ × 1000) / M, where κ is conductivity in S cm⁻¹ and M is molarity.',
      },
      {
        term: 'Kohlrausch Law',
        definition: 'Limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Nernst Equation at 298 K',
        expression: 'E_cell = E°_cell - (0.0591 / n) · log Q',
        explanation: 'n is number of moles of electrons transferred in balanced cell reaction, Q is reaction quotient.',
      },
      {
        title: 'Relation Between E°cell and Equilibrium Constant Kc',
        expression: 'log Kc = (n · E°_cell) / 0.0591',
        explanation: 'At equilibrium, E_cell = 0 and Q = Kc.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'NCERT In-Text 2.4',
        type: 'In-Text',
        question: 'Calculate the potential of hydrogen electrode in contact with a solution whose pH is 10.',
        answer: 'For hydrogen electrode: H⁺(aq) + e⁻ → 1/2 H₂(g)\nGiven pH = 10 ⇒ [H⁺] = 10⁻¹⁰ M.\nStandard hydrogen electrode potential E°(H⁺/H₂) = 0.00 V, n = 1.\nApplying Nernst equation:\nE(H⁺/H₂) = E° - (0.0591 / 1) log (1 / [H⁺])\n= 0 - 0.0591 × log (1 / 10⁻¹⁰) = - 0.0591 × log(10¹⁰) = - 0.0591 × 10 = - 0.591 V.',
        markingPoints: ['Formula for hydrogen electrode (1 mark)', 'Calculation with pH = -log[H+] yielding -0.591 V (1 mark)'],
      },
    ],
    commonMistakes: [
      'Inverting cathode and anode in E°_cell formula. Mnemonic: Red Cat (Reduction at Cathode) and An Ox (Oxidation at Anode).',
      'Forgetting to balance electrons when calculating stoichiometric powers inside log Q.',
    ],
    boardExamTips: [
      'Nernst equation numericals are 100% recurring in Section C or D of CBSE Class 12 board exam.',
      'Memorize anode, cathode, and overall reactions of Lead Storage Battery during charging and discharging.',
    ],
  },

  // CLASS 9 - SCIENCE CH 8 MOTION
  {
    id: 'c9-sci-ch8',
    classNum: '9',
    subjectId: 'science',
    chapterNumber: 8,
    title: 'Motion',
    ncertBookName: 'Science Class IX - NCERT',
    weightageMarks: 7,
    estimatedReadTimeMinutes: 18,
    summary: 'Distance versus displacement, uniform and non-uniform motion, speed and velocity, acceleration, distance-time graphs and velocity-time graphs, equations of motion by graphical method, and uniform circular motion.',
    keyPoints: [
      'Displacement is the shortest distance measured from initial to final position; it is a vector quantity and can be zero even if distance is non-zero.',
      'Slope of distance-time graph represents speed; slope of velocity-time graph represents acceleration.',
      'Area enclosed under a velocity-time graph gives the magnitude of displacement.',
      'Uniform circular motion is an accelerated motion because the direction of velocity changes continuously even if speed is constant.',
    ],
    keyDefinitions: [
      {
        term: 'Acceleration',
        definition: 'Rate of change of velocity with time: a = (v - u) / t. SI unit is m/s² (or m s⁻²).',
      },
      {
        term: 'Uniform Circular Motion',
        definition: 'Motion of an object along a circular path with constant speed. Speed v = (2πr) / t.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Three Equations of Uniformly Accelerated Motion',
        expression: '1. v = u + at \n2. s = ut + (1/2)at² \n3. v² - u² = 2as',
        explanation: 'u = initial velocity, v = final velocity, a = uniform acceleration, t = time taken, s = distance travelled.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'Exercise Q1',
        type: 'Exercise',
        question: 'An athlete completes one round of a circular track of diameter 200 m in 40 s. What will be the distance covered and the displacement at the end of 2 minutes 20 s?',
        answer: 'Given:\nDiameter d = 200 m ⇒ Radius r = 100 m\nTime for 1 round = 40 s\nTotal time = 2 min 20 s = (2 × 60) + 20 = 140 s\nNumber of rounds = 140 / 40 = 3.5 rounds.\n1. Distance covered = 3.5 × Circumference = 3.5 × 2πr = 3.5 × 2 × (22/7) × 100 = 2200 m.\n2. In 3.5 rounds, athlete starts at point A and finishes at diametrically opposite point B. Displacement = Diameter = 200 m.',
        markingPoints: ['Calculation of 3.5 rounds (1 mark)', 'Distance = 2200 m (1 mark)', 'Displacement = 200 m (1 mark)'],
      },
    ],
    commonMistakes: [
      'Mixing up speed with velocity or distance with displacement when moving in closed loop.',
      'Deriving equations of motion algebraically when CBSE explicitly demands graphical derivation.',
    ],
    boardExamTips: [
      'CBSE Class 9 annual exam invariably asks graphical derivation of either s = ut + 1/2 at² or v² - u² = 2as.',
      'Always state units in every single step of physics numericals.',
    ],
  },

  // CLASS 8 - SCIENCE CH 2 MICROORGANISMS
  {
    id: 'c8-sci-ch2',
    classNum: '8',
    subjectId: 'science',
    chapterNumber: 2,
    title: 'Microorganisms: Friend and Foe',
    ncertBookName: 'Science Class VIII - NCERT',
    weightageMarks: 6,
    estimatedReadTimeMinutes: 15,
    summary: 'Classification of microorganisms (Bacteria, Fungi, Protozoa, Algae), Viruses, beneficial uses in food production, antibiotics, vaccines, nitrogen cycle, harmful microorganisms, food preservation techniques.',
    keyPoints: [
      'Microorganisms are grouped into bacteria, fungi, protozoa, and algae. Viruses reproduce only inside host cells.',
      'Lactobacillus promotes formation of curd from milk.',
      'Yeast reproduces rapidly and produces carbon dioxide during respiration, causing dough to rise in baking.',
      'Nitrogen cycle maintains the atmospheric nitrogen balance through nitrogen-fixing bacteria like Rhizobium and blue-green algae.',
    ],
    keyDefinitions: [
      {
        term: 'Antibiotics',
        definition: 'Medicines manufactured from microorganisms that kill or stop the growth of disease-causing microbes (e.g., Penicillin discovered by Alexander Fleming).',
      },
      {
        term: 'Pasteurization',
        definition: 'Process of heating milk to about 70°C for 15 to 30 seconds and then suddenly chilling and storing it to prevent growth of microbes (invented by Louis Pasteur).',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Fermentation Process',
        expression: 'Sugar --Yeast--> Alcohol + CO₂ + Energy',
        explanation: 'Discovered by Louis Pasteur in 1857. Used extensively in bread, wine, and beer brewing industries.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'Exercise Q3',
        type: 'Exercise',
        question: 'Name the microorganisms which can fix atmospheric nitrogen in the soil.',
        answer: 'Rhizobium bacteria (living symbiotically in the root nodules of leguminous plants like peas, beans, and gram) and certain free-living soil microbes such as Blue-green algae (Cyanobacteria) like Nostoc and Anabaena fix atmospheric nitrogen into usable nitrogenous compounds.',
        markingPoints: ['Mention of Rhizobium in legumes (1 mark)', 'Blue green algae / Azotobacter (1 mark)'],
      },
    ],
    commonMistakes: [
      'Classifying viruses alongside bacteria (Viruses lack cellular structure and show living characteristics only inside a host).',
    ],
    boardExamTips: [
      'Draw and practice the Nitrogen cycle schematic diagram with lightning, nitrogen fixation, assimilation, and denitrification.',
    ],
  },

  // CLASS 6 - SCIENCE CH 4 SORTING MATERIALS
  {
    id: 'c6-sci-ch4',
    classNum: '6',
    subjectId: 'science',
    chapterNumber: 4,
    title: 'Sorting Materials into Groups',
    ncertBookName: 'Science Class VI - NCERT',
    weightageMarks: 5,
    estimatedReadTimeMinutes: 12,
    summary: 'Classification of objects based on appearance, hardness, solubility, transparency, and density (flotation). Understanding the scientific necessity of grouping materials for systematic study.',
    keyPoints: [
      'Grouping materials simplifies identifying patterns in properties and saves time.',
      'Materials with shiny appearance are lustrous (metals like gold, iron, copper, aluminum).',
      'Substances that dissolve completely in water are soluble (salt, sugar); those that do not dissolve are insoluble (sand, sawdust).',
      'Objects less dense than water float (wood, dried leaves, oil); objects denser than water sink (iron nail, stone).',
      'Transparent objects allow light to pass completely (clear glass), translucent allow partial light (frosted glass, butter paper), opaque allow no light (wood, metal sheet).',
    ],
    keyDefinitions: [
      {
        term: 'Translucent Material',
        definition: 'Materials through which objects can be seen, but not clearly, as only a fraction of light passes through them (e.g., oiled paper, tracing paper).',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'Exercise Q2',
        type: 'Exercise',
        question: 'Why do we need to group materials? Give two reasons.',
        answer: '1. Convenience of storage: Grouping helps us locate objects quickly and easily (e.g. books in library, groceries in store).\n2. Systematic study: Grouping helps scientists and students study the common properties of materials and observe patterns in their behavior.',
        markingPoints: ['Convenient location and organization (1 mark)', 'Systematic study of properties (1 mark)'],
      },
    ],
    commonMistakes: ['Confusing translucent with transparent.'],
    boardExamTips: ['Remember that density determines whether an item floats or sinks in water.'],
  },

  // CLASS 7 - SCIENCE CH 1 NUTRITION IN PLANTS
  {
    id: 'c7-sci-ch1',
    classNum: '7',
    subjectId: 'science',
    chapterNumber: 1,
    title: 'Nutrition in Plants',
    ncertBookName: 'Science Class VII - NCERT',
    weightageMarks: 6,
    estimatedReadTimeMinutes: 15,
    summary: 'Autotrophic nutrition in green plants via photosynthesis, chlorophyll role, stomata structure, heterotrophic modes in plants (parasites, insectivorous plants, saprotrophs, symbiosis in lichens).',
    keyPoints: [
      'Green plants synthesize their own food using CO₂, water, minerals in presence of sunlight and chlorophyll.',
      'Cuscuta (Amarbel) is a total stem parasite lacking chlorophyll that deprives host plants of nutrients using haustoria.',
      'Pitcher plant (Nepenthes) and Venus flytrap are insectivorous plants that trap insects to fulfill nitrogen deficiency in swampy soils.',
      'Lichens show symbiotic partnership between an alga (which synthesizes food) and a fungus (which provides shelter, water, and minerals).',
    ],
    keyDefinitions: [
      {
        term: 'Saprotrophic Nutrition',
        definition: 'Mode of nutrition in which organisms take in nutrients in solution form from dead and decaying matter by secreting digestive juices (e.g., Fungi, Mushrooms).',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'Exercise Q6',
        type: 'Exercise',
        question: 'Show with the help of a sketch that plants are the ultimate source of food.',
        answer: 'Sun (Primary energy source) → Green Plants (Producers / Autotrophs) → Herbivores (Deer, Rabbit) → Carnivores (Lion, Tiger) → Decomposers. All animals directly or indirectly depend on plants for nutrition and survival.',
        markingPoints: ['Food chain flowchart showing Sun to Plants to Consumers (2 marks)'],
      },
    ],
    commonMistakes: ['Thinking insectivorous plants do not perform photosynthesis (they are green and photosynthesize, but eat insects only for nitrogen).'],
    boardExamTips: ['Know the difference between parasite (takes from live host) and saprophyte (takes from dead matter).'],
  },

  // CLASS 11 - PHYSICS CH 3 KINEMATICS
  {
    id: 'c11-phy-ch3',
    classNum: '11',
    subjectId: 'physics',
    chapterNumber: 3,
    title: 'Motion in a Straight Line & Plane',
    ncertBookName: 'Physics Part I Class XI - NCERT',
    weightageMarks: 8,
    estimatedReadTimeMinutes: 28,
    summary: 'Frame of reference, calculus-based derivation of kinematic equations, projectile motion trajectories, range, maximum height, time of flight, relative velocity in 2D.',
    keyPoints: [
      'Instantaneous velocity v = dx/dt, instantaneous acceleration a = dv/dt = v(dv/dx).',
      'Projectile motion is a superposition of two independent 1D motions: horizontal uniform motion (a_x = 0) and vertical uniformly accelerated motion (a_y = -g).',
      'Path of a projectile is a parabolic curve: y = x tan θ - (g x²) / (2 u² cos² θ).',
      'Horizontal range is maximum at angle of projection θ = 45°, where R_max = u² / g.',
    ],
    keyDefinitions: [
      {
        term: 'Trajectory of Projectile',
        definition: 'The curved path traced out by a particle thrown obliquely into the air under the influence of gravity alone.',
      },
    ],
    formulasOrLaws: [
      {
        title: 'Projectile Motion Formulas',
        expression: 'Time of Flight T = (2 u sin θ) / g\nMax Height H = (u² sin² θ) / (2g)\nRange R = (u² sin 2θ) / g',
        explanation: 'At complementary angles of projection (θ and 90° - θ), the horizontal range R is identical for the same projection velocity u.',
      },
    ],
    ncertSolutions: [
      {
        questionNumber: 'NCERT Q3.15',
        type: 'Exercise',
        question: 'Prove that the horizontal range of a projectile is the same for angles of projection θ and (90° - θ).',
        answer: 'Range R(θ) = u² sin(2θ) / g.\nFor angle (90° - θ):\nR(90° - θ) = u² sin[2(90° - θ)] / g\n= u² sin(180° - 2θ) / g\nSince sin(180° - x) = sin x, we have sin(180° - 2θ) = sin 2θ.\nTherefore, R(90° - θ) = u² sin(2θ) / g = R(θ). Proved.',
        markingPoints: ['Substitution of (90° - θ) into range formula (1 mark)', 'Trigonometric identity sin(180 - 2θ) = sin 2θ (1 mark)'],
      },
    ],
    commonMistakes: ['Confusing time of ascent with total time of flight (Total time T = 2 × time of ascent).'],
    boardExamTips: ['Derivation of projectile trajectory equation is one of the most frequently asked 3-mark questions.'],
  },
];

export const CBSE_QUIZZES: QuizQuestion[] = [
  // Class 10 Science
  {
    id: 'q10-sci-1',
    classNum: '10',
    subjectId: 'science',
    chapterId: 'c10-sci-ch1',
    type: 'mcq',
    question: 'When aqueous solutions of barium chloride and sodium sulphate are mixed together, what is the chemical formula and color of the precipitate formed?',
    options: [
      'BaSO₄, White precipitate',
      'NaCl, White precipitate',
      'BaS, Yellow precipitate',
      'Na₂SO₄, Blue precipitate',
    ],
    correctOptionIndex: 0,
    explanation: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq). Barium sulphate is an insoluble white solid precipitate formed by a double displacement and precipitation reaction.',
    ncertReference: 'NCERT Class 10 Science, Chapter 1, Section 1.2.4',
    difficulty: 'Easy',
  },
  {
    id: 'q10-sci-2',
    classNum: '10',
    subjectId: 'science',
    chapterId: 'c10-sci-ch1',
    type: 'assertion-reason',
    question: 'Assertion (A): Exposure of silver chloride to sunlight for a long duration turns grey.\nReason (R): Formation of silver by decomposition of silver chloride takes place due to light.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true',
    ],
    correctOptionIndex: 0,
    explanation: '2AgCl(s) --Sunlight--> 2Ag(s) [grey] + Cl₂(g). Sunlight supplies photons that decompose white silver chloride crystals into grey metallic silver, proving both A and R are true and R is the exact reason.',
    ncertReference: 'NCERT Class 10 Science, Chapter 1, Section 1.2.2',
    difficulty: 'Medium',
  },
  {
    id: 'q10-sci-3',
    classNum: '10',
    subjectId: 'science',
    chapterId: 'c10-sci-ch6',
    type: 'case-based',
    casePassage: 'A student sets up an experiment with potted destarched green plants. Plant A is kept under a bell jar with potassium hydroxide (KOH) watch glass. Plant B is kept under an identical bell jar without KOH. Both jars are kept airtight using vaseline and exposed to sunlight for 3 hours. Both leaves are tested with iodine solution.',
    question: 'Why did the leaf from Plant A fail to turn blue-black when tested with iodine solution?',
    options: [
      'KOH absorbed all carbon dioxide in the jar, preventing photosynthesis and starch synthesis',
      'Plant A did not receive adequate sunlight under the bell jar',
      'Iodine was expired and could not react with starch',
      'Plant A underwent excessive transpiration and wilted',
    ],
    correctOptionIndex: 0,
    explanation: 'Potassium hydroxide (KOH) is a strong absorber of CO₂. Absence of CO₂ prevents carbon fixation in the Calvin cycle; hence no starch is formed, producing a negative iodine test.',
    ncertReference: 'NCERT Class 10 Science, Chapter 6, Activity 6.2',
    difficulty: 'Hard',
  },
  {
    id: 'q10-sci-4',
    classNum: '10',
    subjectId: 'science',
    chapterId: 'c10-sci-ch6',
    type: 'mcq',
    question: 'Which chamber of the human heart pumps oxygen-rich blood into the aorta to circulate throughout the body under high pressure?',
    options: [
      'Left Ventricle',
      'Right Ventricle',
      'Left Atrium',
      'Right Atrium',
    ],
    correctOptionIndex: 0,
    explanation: 'The Left Ventricle has the thickest muscular myocardium walls because it must pump oxygenated blood throughout systemic circulation via the systemic aorta.',
    ncertReference: 'NCERT Class 10 Science, Chapter 6, Section 6.4.1',
    difficulty: 'Easy',
  },

  // Class 10 Maths
  {
    id: 'q10-mat-1',
    classNum: '10',
    subjectId: 'maths',
    chapterId: 'c10-math-ch8',
    type: 'mcq',
    question: 'If sin θ + sin²θ = 1, then what is the value of (cos²θ + cos⁴θ)?',
    options: ['1', '0', '2', '-1'],
    correctOptionIndex: 0,
    explanation: 'Given sin θ = 1 - sin²θ = cos²θ. Squaring both sides gives sin²θ = cos⁴θ. Therefore, cos²θ + cos⁴θ = sin θ + sin²θ = 1.',
    ncertReference: 'NCERT Class 10 Maths, Chapter 8, Exemplar Problem',
    difficulty: 'Medium',
  },
  {
    id: 'q10-mat-2',
    classNum: '10',
    subjectId: 'maths',
    chapterId: 'c10-math-ch8',
    type: 'mcq',
    question: 'What is the value of (tan 1° · tan 2° · tan 3° · ... · tan 89°)?',
    options: ['1', '0', '√3', 'Undefined'],
    correctOptionIndex: 0,
    explanation: 'Pairs like tan 1° · tan 89° = tan 1° · cot 1° = 1. All 44 pairs equal 1, and the middle standalone term tan 45° = 1. Hence product is 1.',
    ncertReference: 'NCERT Class 10 Maths, Chapter 8 Complementary Angles',
    difficulty: 'Medium',
  },

  // Class 12 Physics
  {
    id: 'q12-phy-1',
    classNum: '12',
    subjectId: 'physics',
    chapterId: 'c12-phy-ch1',
    type: 'assertion-reason',
    question: 'Assertion (A): The electric field inside a hollow spherical conductor with charge Q on its surface is zero.\nReason (R): The electric charges reside entirely on the outer surface of a conductor in electrostatic equilibrium.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true',
    ],
    correctOptionIndex: 0,
    explanation: 'By Gauss Law, taking a Gaussian surface inside the hollow conductor encloses zero charge (q_in = 0); therefore ∮ E·dA = 0 ⇒ E = 0. Charges repel each other to the outermost boundary.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 1, Section 1.15',
    difficulty: 'Medium',
  },
  {
    id: 'q12-phy-2',
    classNum: '12',
    subjectId: 'physics',
    chapterId: 'c12-phy-ch1',
    type: 'mcq',
    question: 'Two point charges +q and -q are separated by distance 2a. What is the electric potential at any point on the equatorial plane of the dipole?',
    options: ['Zero', 'q / (4πε₀ a)', '2q / (4πε₀ r)', 'Infinite'],
    correctOptionIndex: 0,
    explanation: 'Any point on the equatorial bisector plane is equidistant from +q and -q. Since electric potential is a scalar quantity: V = V₊ + V₋ = (q/4πε₀r) + (-q/4πε₀r) = 0.',
    ncertReference: 'NCERT Class 12 Physics, Chapter 1 & 2',
    difficulty: 'Easy',
  },

  // Class 12 Chemistry
  {
    id: 'q12-chm-1',
    classNum: '12',
    subjectId: 'chemistry',
    chapterId: 'c12-chem-ch2',
    type: 'mcq',
    question: 'How many Coulombs of charge are required for the reduction of 1 mole of Al³⁺ to Al in an electrolytic cell?',
    options: [
      '3 × 96500 C (2.895 × 10⁵ C)',
      '1 × 96500 C',
      '9.65 × 10⁴ C',
      '6 × 96500 C',
    ],
    correctOptionIndex: 0,
    explanation: 'The electrode reaction is Al³⁺ + 3e⁻ → Al. Reducing 1 mole of Al³⁺ requires 3 moles of electrons. Since 1 Faraday (F) = 96500 C, total charge Q = 3 × 96500 C = 289,500 C.',
    ncertReference: 'NCERT Class 12 Chemistry, Chapter 2, Section 2.5',
    difficulty: 'Medium',
  },

  // Class 9 Science
  {
    id: 'q9-sci-1',
    classNum: '9',
    subjectId: 'science',
    chapterId: 'c9-sci-ch8',
    type: 'mcq',
    question: 'A particle is moving in a circular path of radius r. What is the displacement after completing half a circle?',
    options: ['2r', 'πr', '2πr', 'Zero'],
    correctOptionIndex: 0,
    explanation: 'After half circle, the particle reaches the point diametrically opposite to its starting point. Displacement is the straight distance between initial and final points, which is the diameter = 2r.',
    ncertReference: 'NCERT Class 9 Science, Chapter 8, Exercise Q1',
    difficulty: 'Easy',
  },
  {
    id: 'q9-sci-2',
    classNum: '9',
    subjectId: 'science',
    chapterId: 'c9-sci-ch8',
    type: 'mcq',
    question: 'What physical quantity is represented by the slope of a velocity-time graph?',
    options: ['Acceleration', 'Distance', 'Displacement', 'Speed'],
    correctOptionIndex: 0,
    explanation: 'Slope of v-t graph = Δv / Δt = Change in velocity / time = Acceleration (SI unit m/s²).',
    ncertReference: 'NCERT Class 9 Science, Chapter 8, Graphical Analysis',
    difficulty: 'Easy',
  },

  // Class 8 Science
  {
    id: 'q8-sci-1',
    classNum: '8',
    subjectId: 'science',
    chapterId: 'c8-sci-ch2',
    type: 'mcq',
    question: 'Which bacterium promotes the conversion of milk into curd?',
    options: ['Lactobacillus', 'Rhizobium', 'Streptococcus', 'Bacillus anthracis'],
    correctOptionIndex: 0,
    explanation: 'Lactobacillus promotes curd formation by multiplying in milk and converting the milk sugar lactose into lactic acid.',
    ncertReference: 'NCERT Class 8 Science, Chapter 2, Section 2.2',
    difficulty: 'Easy',
  },

  // Class 6 Science
  {
    id: 'q6-sci-1',
    classNum: '6',
    subjectId: 'science',
    chapterId: 'c6-sci-ch4',
    type: 'mcq',
    question: 'Which of the following materials is translucent?',
    options: ['Oiled paper', 'Clean glass sheet', 'Plywood board', 'Aluminium foil'],
    correctOptionIndex: 0,
    explanation: 'Oiled paper allows light to pass through partially, making objects behind it visible only faintly. Hence it is translucent.',
    ncertReference: 'NCERT Class 6 Science, Chapter 4, Section 4.5',
    difficulty: 'Easy',
  },

  // Class 7 Science
  {
    id: 'q7-sci-1',
    classNum: '7',
    subjectId: 'science',
    chapterId: 'c7-sci-ch1',
    type: 'mcq',
    question: 'Which plant among the following is an example of a complete parasitic plant?',
    options: ['Cuscuta (Amarbel)', 'Pitcher plant', 'Mushroom', 'Lichens'],
    correctOptionIndex: 0,
    explanation: 'Cuscuta lacks chlorophyll and produces specialized sucking roots called haustoria to draw ready-made food from the host plant.',
    ncertReference: 'NCERT Class 7 Science, Chapter 1, Section 1.3',
    difficulty: 'Easy',
  },
];

export const CBSE_PYQS: PYQPaper[] = [
  // CLASS 10 SCIENCE 2024 BOARD PAPER
  {
    id: 'pyq-10-sci-2024',
    classNum: '10',
    subjectId: 'science',
    year: 2024,
    title: 'CBSE Class 10 Science Board Exam 2024 (Set 31/1/1)',
    examType: 'Board Exam',
    totalMarks: 80,
    timeAllowedMinutes: 180,
    instructions: [
      'This question paper consists of 39 questions in 5 sections.',
      'Section A consists of 20 objective type questions carrying 1 mark each.',
      'Section B consists of 6 Short Answer type questions carrying 2 marks each.',
      'Section C consists of 7 Short Answer type questions carrying 3 marks each.',
      'Section D consists of 3 Long Answer type questions carrying 5 marks each.',
      'Section E consists of 3 source-based/case-based units of assessment of 4 marks each with sub-parts.',
    ],
    sections: [
      {
        name: 'Section A (1 Mark MCQs & Assertion-Reason)',
        description: 'Objective type questions testing core conceptual clarity.',
        questions: [
          {
            qNumber: 1,
            marks: 1,
            questionText: 'Identify the gas evolved when dilute hydrochloric acid is added to reactive zinc granules in a test tube:',
            subQuestions: [],
            modelAnswer: 'Hydrogen gas (H₂). When zinc reacts with dilute HCl: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑. The gas burns with a characteristic pop sound when a burning splinter is brought near.',
            markingScheme: ['Hydrogen gas (0.5 mark)', 'Zinc chloride formation or pop sound test (0.5 mark)'],
          },
          {
            qNumber: 2,
            marks: 1,
            questionText: 'Which enzyme is present in human saliva that initiates the chemical breakdown of carbohydrates?',
            modelAnswer: 'Salivary amylase (also called ptyalin). It converts complex starch molecules into simple disaccharide maltose.',
            markingScheme: ['Salivary amylase (1 mark)'],
          },
          {
            qNumber: 17,
            marks: 1,
            questionText: 'Assertion (A): Respiration is an exothermic process.\nReason (R): Glucose combines with oxygen in the cells of our body and releases energy in the form of ATP.',
            modelAnswer: 'Option (a): Both (A) and (R) are true and (R) is the correct explanation of (A).\nDuring cellular respiration, oxidation of glucose produces carbon dioxide, water, and 38/30-32 ATP molecules with release of heat.',
            markingScheme: ['Correct assertion-reason choice (1 mark)'],
          },
        ],
      },
      {
        name: 'Section B (2 Marks Conceptual Questions)',
        description: 'Short answer questions requiring concise scientific definitions and reasoning.',
        questions: [
          {
            qNumber: 21,
            marks: 2,
            questionText: 'Why do ionic compounds have high melting and boiling points? Give two reasons.',
            modelAnswer: '1. Strong Electrostatic Forces: Ionic compounds are composed of oppositely charged cations and anions held together by extremely strong electrostatic forces of attraction in a crystalline lattice.\n2. High Energy Requirement: A considerable amount of thermal energy is required to overcome these strong inter-ionic attractions to break the lattice.',
            markingPoints: ['Presence of strong electrostatic inter-ionic attractions (1 mark)', 'Large amount of thermal energy required to break lattice (1 mark)'],
            markingScheme: ['Strong electrostatic attraction between ions (1 mark)', 'High energy required to break bonds (1 mark)'],
          },
          {
            qNumber: 23,
            marks: 2,
            questionText: 'Differentiate between biodegradable and non-biodegradable substances with one example of each.',
            modelAnswer: '1. Biodegradable: Substances broken down into non-toxic simpler substances by biological action of saprophytes/bacteria in nature. Example: Vegetable peels, paper, cotton.\n2. Non-biodegradable: Substances that cannot be broken down by biological processes and persist indefinitely in the biosphere causing bio-magnification. Example: Plastic, DDT, glass.',
            markingScheme: ['Definition with accurate biological agent mention (1 mark)', 'Correct examples for both categories (1 mark)'],
          },
        ],
      },
      {
        name: 'Section C (3 Marks Analytical & Derivations)',
        description: 'Includes multi-step questions, chemical reaction mechanisms, and ray diagrams.',
        questions: [
          {
            qNumber: 27,
            marks: 3,
            questionText: 'A metal X on heating in air turns black. When hydrogen gas is passed over this heated black substance, the original reddish-brown metal X is recovered.\n(a) Identify metal X and the black substance.\n(b) Write balanced chemical equations for both reactions.\n(c) Name the type of reaction in the second step.',
            modelAnswer: '(a) Metal X is Copper (Cu, reddish-brown). The black substance is Copper(II) Oxide (CuO).\n(b) Reaction 1 (Oxidation): 2Cu(s) + O₂(g) --Heat--> 2CuO(s) [Black]\nReaction 2 (Reduction/Redox): CuO(s) + H₂(g) --Heat--> Cu(s) [Reddish-brown] + H₂O(g)\n(c) The second step is a Redox reaction (CuO is reduced to Cu, while H₂ is oxidized to H₂O).',
            markingScheme: [
              'Identification of Cu and CuO (1 mark)',
              'Balanced equations for both reactions with state symbols (1 mark)',
              'Naming Redox reaction with justification (1 mark)',
            ],
          },
        ],
      },
      {
        name: 'Section D (5 Marks Comprehensive Long Answers)',
        description: 'In-depth questions with diagrammatic representation and comprehensive answers.',
        questions: [
          {
            qNumber: 34,
            marks: 5,
            questionText: '(a) Draw a neat diagram of the Human Excretory System and label:\n(i) Kidney, (ii) Ureter, (iii) Urinary Bladder, (iv) Urethra.\n(b) Explain the three steps involved in urine formation in a nephron.\n(c) Why is dialysis performed for patients with kidney failure?',
            modelAnswer: '(a) Diagram of human excretory system showing bilateral bean-shaped kidneys, descending ureters, muscular urinary bladder, and urethra.\n\n(b) Three steps in urine formation:\n1. Ultrafiltration (Glomerular filtration): Blood flows into the glomerulus at high hydrostatic pressure; water, urea, glucose, and salts filter into Bowman capsule as nephric filtrate.\n2. Selective Reabsorption: Along the coiled tubular parts (PCT, Loop of Henle), essential substances like glucose, amino acids, salts, and required water are selectively absorbed back into peritubular capillaries.\n3. Tubular Secretion: Excess ions (K⁺, H⁺) and drugs are actively secreted from capillaries into the collecting tubule to maintain ionic and pH balance.\n\n(c) In kidney failure (renal failure), toxic nitrogenous wastes like urea and uric acid accumulate in the blood. Hemodialysis uses an artificial kidney with semipermeable cellophane tubes bathed in dialyzing fluid to eliminate these nitrogenous poisons and save life.',
            markingScheme: [
              'Neat labeled diagram with all 4 parts (2 marks)',
              'Explanation of 3 urine formation steps (2 marks)',
              'Reason for artificial kidney / hemodialysis (1 mark)',
            ],
          },
        ],
      },
      {
        name: 'Section E (4 Marks Case Study / Source-Based)',
        description: 'Real-world data, experiment observation, and contextual evaluation.',
        questions: [
          {
            qNumber: 37,
            marks: 4,
            questionText: 'Case Study: Domestic Electric Circuits\nIn our homes, electricity is supplied via live, neutral, and earth wires. Electric appliances with metallic bodies (iron, refrigerator, geyser) are connected to earth wire. A safety fuse or miniature circuit breaker (MCB) is placed in series with live wire.\n(a) What is the potential difference between live wire and neutral wire in India? (1 mark)\n(b) What is the fundamental function of the green earth wire? (1 mark)\n(c) Explain what happens during short circuiting and overloading. (2 marks)',
            modelAnswer: '(a) The potential difference is 220 V (AC frequency 50 Hz).\n(b) The green earth wire provides a low-resistance conducting path for leakage current to the ground, preventing severe electric shocks to users touching metallic bodies.\n(c) Short-circuiting happens when live and neutral wires touch directly due to damaged insulation, dropping resistance almost to zero and causing enormous current flow. Overloading happens when too many high-power appliances are operated simultaneously drawing current exceeding the circuit rating.',
            markingScheme: [
              '220 Volts (1 mark)',
              'Safety against electric shocks by diverting leakage to ground (1 mark)',
              'Short-circuit explanation (1 mark) and Overloading explanation (1 mark)',
            ],
          },
        ],
      },
    ],
  },

  // CLASS 10 MATHEMATICS STANDARD 2024 BOARD PAPER
  {
    id: 'pyq-10-mat-2024',
    classNum: '10',
    subjectId: 'maths',
    year: 2024,
    title: 'CBSE Class 10 Mathematics Standard Board Exam 2024 (Set 30/1/1)',
    examType: 'Board Exam',
    totalMarks: 80,
    timeAllowedMinutes: 180,
    instructions: [
      'All questions are compulsory.',
      'Section A has 20 MCQs carrying 1 mark each.',
      'Section B has 5 Short Answer-I questions carrying 2 marks each.',
      'Section C has 6 Short Answer-II questions carrying 3 marks each.',
      'Section D has 4 Long Answer questions carrying 5 marks each.',
      'Section E has 3 case-based integrated questions of 4 marks each.',
    ],
    sections: [
      {
        name: 'Section A (1 Mark Objective MCQs)',
        description: 'Single correct answer questions on arithmetic, polynomials, and geometry.',
        questions: [
          {
            qNumber: 1,
            marks: 1,
            questionText: 'If HCF(306, 657) = 9, what is the LCM(306, 657)?',
            modelAnswer: 'We know that LCM(a, b) × HCF(a, b) = a × b.\nLCM(306, 657) × 9 = 306 × 657\nLCM = (306 × 657) / 9 = 34 × 657 = 22,338.',
            markingScheme: ['Formula LCM × HCF = a × b (0.5 mark)', 'Correct value 22338 (0.5 mark)'],
          },
          {
            qNumber: 2,
            marks: 1,
            questionText: 'The discriminant of the quadratic equation 2x² - 4x + 3 = 0 is:',
            modelAnswer: 'D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, the equation has no real roots.',
            markingScheme: ['Discriminant value D = -8 (1 mark)'],
          },
        ],
      },
      {
        name: 'Section C (3 Marks Proofs & Geometry)',
        description: 'Theorems, coordinate geometry, and algebraic derivations.',
        questions: [
          {
            qNumber: 26,
            marks: 3,
            questionText: 'Prove that √5 is an irrational number.',
            modelAnswer: 'Proof by Contradiction:\n1. Assume on the contrary that √5 is rational. Then √5 = a/b, where a and b are co-prime integers and b ≠ 0.\n2. Squaring both sides: 5 = a²/b² ⇒ a² = 5b² ... (1)\nThis implies 5 divides a². By Fundamental Theorem of Arithmetic, if 5 divides a², then 5 divides a.\n3. Let a = 5c for some integer c. Substituting in (1): (5c)² = 5b² ⇒ 25c² = 5b² ⇒ b² = 5c².\nThis implies 5 divides b², so 5 divides b.\n4. Therefore, 5 is a common factor of both a and b. This contradicts our assumption that a and b are co-prime integers.\n5. Hence, our assumption is false and √5 is an irrational number.',
            markingScheme: [
              'Assumption and setting √5 = a/b with co-prime condition (0.5 mark)',
              'Proving 5 divides a (1 mark)',
              'Proving 5 divides b (1 mark)',
              'Contradiction and conclusion (0.5 mark)',
            ],
          },
        ],
      },
    ],
  },

  // CLASS 12 PHYSICS 2024 BOARD PAPER
  {
    id: 'pyq-12-phy-2024',
    classNum: '12',
    subjectId: 'physics',
    year: 2024,
    title: 'CBSE Class 12 Physics Board Examination 2024 (Code 55/1/1)',
    examType: 'Board Exam',
    totalMarks: 70,
    timeAllowedMinutes: 180,
    instructions: [
      'There are 33 questions in all.',
      'Section A contains 16 questions: 12 MCQs and 4 Assertion-Reasoning of 1 mark each.',
      'Section B contains 5 questions of 2 marks each.',
      'Section C contains 7 questions of 3 marks each.',
      'Section D contains 2 case study-based questions of 4 marks each.',
      'Section E contains 3 long answer questions of 5 marks each.',
    ],
    sections: [
      {
        name: 'Section C (3 Marks Core Physics Derivations)',
        description: 'Derivations from electrostatics, electromagnetism, and optics.',
        questions: [
          {
            qNumber: 25,
            marks: 3,
            questionText: 'State Gauss Theorem in electrostatics. Apply this theorem to obtain an expression for the electric field intensity due to an infinitely long straight wire of uniform linear charge density λ C/m.',
            modelAnswer: 'Gauss Law: The total electric flux through any closed Gaussian surface in vacuum is equal to 1/ε₀ times the total charge enclosed: ∮ E · dA = q_enclosed / ε₀.\n\nDerivation for Infinitely Long Straight Wire:\n1. Consider an infinitely long thin wire with uniform linear charge density λ.\n2. By symmetry, the electric field E is directed radially outward and depends only on radial distance r.\n3. Choose a coaxial cylindrical Gaussian surface of radius r and length L.\n4. Electric flux consists of three surfaces:\n   - Two circular flat ends: E · dA = E dA cos 90° = 0 (Field lines are parallel to end surfaces).\n   - Curved cylindrical surface: E · dA = E dA cos 0° = E ∫ dA = E (2πrL).\n5. Total flux Φ = E(2πrL).\n6. Charge enclosed q = λ L.\n7. Applying Gauss Law: E (2πrL) = (λ L) / ε₀ ⇒ E = λ / (2πε₀ r).\nIn vector form: E = (λ / 2πε₀ r) r̂.',
            markingScheme: [
              'Statement of Gauss Law (1 mark)',
              'Diagram showing cylindrical Gaussian surface with radius r and length L (0.5 mark)',
              'Flux calculation through flat ends and curved surface (0.5 mark)',
              'Enclosed charge and final formula E = λ / (2πε₀r) (1 mark)',
            ],
          },
        ],
      },
    ],
  },

  // CLASS 12 CHEMISTRY 2024 BOARD PAPER
  {
    id: 'pyq-12-chm-2024',
    classNum: '12',
    subjectId: 'chemistry',
    year: 2024,
    title: 'CBSE Class 12 Chemistry Board Examination 2024 (Code 56/1/1)',
    examType: 'Board Exam',
    totalMarks: 70,
    timeAllowedMinutes: 180,
    instructions: [
      'Section A has 16 questions (MCQ and Assertion-Reason) of 1 mark each.',
      'Section B has 5 short answer questions of 2 marks each.',
      'Section C has 7 short answer questions of 3 marks each.',
      'Section D has 2 case-based questions of 4 marks each.',
      'Section E has 3 long answer questions of 5 marks each.',
    ],
    sections: [
      {
        name: 'Section C (3 Marks Physical Chemistry Numericals)',
        description: 'Kinetics, Solutions, and Electrochemistry calculation problems.',
        questions: [
          {
            qNumber: 23,
            marks: 3,
            questionText: 'Calculate the EMF of the following cell at 298 K:\nMg(s) | Mg²⁺(0.001 M) || Cu²⁺(0.0001 M) | Cu(s)\nGiven: E°(Mg²⁺/Mg) = -2.37 V and E°(Cu²⁺/Cu) = +0.34 V.',
            modelAnswer: '1. Standard Cell Potential E°_cell:\nE°_cell = E°_cathode - E°_anode = E°(Cu²⁺/Cu) - E°(Mg²⁺/Mg)\nE°_cell = 0.34 V - (-2.37 V) = +2.71 V.\n\n2. Cell reaction: Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s). Number of electrons transferred n = 2.\n\n3. Nernst Equation at 298 K:\nE_cell = E°_cell - (0.0591 / n) log ([Mg²⁺] / [Cu²⁺])\nE_cell = 2.71 - (0.0591 / 2) log (0.001 / 0.0001)\nE_cell = 2.71 - 0.02955 log (10)\nSince log 10 = 1:\nE_cell = 2.71 - 0.02955 = 2.68 V.',
            markingScheme: [
              'Calculation of E°cell = +2.71 V (1 mark)',
              'Writing Nernst equation with n = 2 (1 mark)',
              'Substitution of concentrations and final answer 2.68 V (1 mark)',
            ],
          },
        ],
      },
    ],
  },
];

export const CBSE_FORMULAS: FormulaItem[] = [
  // Class 10 Maths
  {
    id: 'f-c10-m-1',
    classNum: '10',
    subjectId: 'maths',
    chapterTitle: 'Quadratic Equations',
    title: 'Quadratic Formula (Shridharacharya Rule)',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    variables: 'a = coefficient of x², b = coefficient of x, c = constant term, D = b² - 4ac (Discriminant)',
    application: 'Used to find real roots of any quadratic equation ax² + bx + c = 0 when D ≥ 0.',
  },
  {
    id: 'f-c10-m-2',
    classNum: '10',
    subjectId: 'maths',
    chapterTitle: 'Arithmetic Progressions',
    title: 'nth Term & Sum of first n terms of AP',
    formula: 'aₙ = a + (n - 1)d\nSₙ = (n / 2)[2a + (n - 1)d] = (n / 2)[a + l]',
    variables: 'a = first term, d = common difference, n = number of terms, l = last term',
    application: 'Calculating any term in AP, sum of natural numbers, word problems on savings/rows.',
  },
  {
    id: 'f-c10-m-3',
    classNum: '10',
    subjectId: 'maths',
    chapterTitle: 'Trigonometry',
    title: 'Fundamental Trigonometric Identities',
    formula: '1. sin²θ + cos²θ = 1\n2. 1 + tan²θ = sec²θ\n3. 1 + cot²θ = cosec²θ',
    variables: 'θ is an acute angle between 0° and 90°',
    application: 'Simplifying complex trigonometric equations and solving mandatory NCERT 4-mark proofs.',
  },
  {
    id: 'f-c10-m-4',
    classNum: '10',
    subjectId: 'maths',
    chapterTitle: 'Coordinate Geometry',
    title: 'Section Formula & Distance Formula',
    formula: 'Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]\nSection: x = (m₁x₂ + m₂x₁) / (m₁ + m₂), y = (m₁y₂ + m₂y₁) / (m₁ + m₂)',
    variables: 'Coordinates (x₁, y₁), (x₂, y₂), ratio m₁ : m₂',
    application: 'Distance between points, midpoint (1:1 ratio), trisection of line segment.',
  },

  // Class 10 Science
  {
    id: 'f-c10-s-1',
    classNum: '10',
    subjectId: 'science',
    chapterTitle: 'Electricity',
    title: "Ohm's Law & Electric Power",
    formula: 'V = I · R\nR = ρ · (l / A)\nP = V · I = I²R = V² / R\nHeat H = I²Rt (Joule Heating)',
    variables: 'V = Potential difference (Volts), I = Current (Amperes), R = Resistance (Ohms), ρ = Resistivity (Ω·m)',
    application: 'Calculating circuit currents, electrical power bills in kilowatt-hours (kWh), heating elements.',
  },
  {
    id: 'f-c10-s-2',
    classNum: '10',
    subjectId: 'science',
    chapterTitle: 'Light Reflection & Refraction',
    title: 'Mirror & Lens Formula with Magnification',
    formula: 'Mirror: 1/f = 1/v + 1/u, m = -v/u = hᵢ/hₒ\nLens: 1/f = 1/v - 1/u, m = +v/u = hᵢ/hₒ\nPower P = 1 / f(in meters)',
    variables: 'f = focal length, u = object distance (always negative), v = image distance, m = magnification',
    application: 'Solving ray optics ray diagram numericals, lens prescription in dioptres (D).',
  },

  // Class 12 Physics
  {
    id: 'f-c12-p-1',
    classNum: '12',
    subjectId: 'physics',
    chapterTitle: 'Electrostatics',
    title: "Coulomb's Law & Electric Potential Energy",
    formula: 'F = (1 / 4πε₀) · (q₁ q₂ / r²)\nU = (1 / 4πε₀) · (q₁ q₂ / r)\nCapacitance C = (K ε₀ A) / d',
    variables: 'ε₀ = 8.854 × 10⁻¹² F/m, q = charge, r = distance, K = dielectric constant',
    application: 'Electrostatic force, work done in assembling charges, parallel plate capacitors.',
  },
  {
    id: 'f-c12-p-2',
    classNum: '12',
    subjectId: 'physics',
    chapterTitle: 'Current Electricity',
    title: 'Drift Velocity & Kirchhoff Laws',
    formula: 'v_d = (e E τ) / m\nI = n e A v_d\nKirchhoff Loop: Σ ΔV = 0\nWheatstone: P / Q = R / S',
    variables: 'e = 1.6 × 10⁻¹⁹ C, τ = relaxation time, n = free electron density, A = cross-section area',
    application: 'Microscopic model of conduction, complex multi-loop circuit analysis.',
  },

  // Class 12 Chemistry
  {
    id: 'f-c12-c-1',
    classNum: '12',
    subjectId: 'chemistry',
    chapterTitle: 'Solutions',
    title: 'Colligative Properties Formulas',
    formula: 'Relative Lowering: (P° - P) / P° = x₂\nElevation in Boiling Point: ΔT_b = K_b · m\nDepression in Freezing Point: ΔT_f = K_f · m\nOsmotic Pressure: Π = i · C · R · T',
    variables: 'm = molality, K_b/K_f = molal elevation/depression constant, i = van t Hoff factor',
    application: 'Molar mass determination of non-volatile solutes, abnormal molar masses with association/dissociation.',
  },
  {
    id: 'f-c12-c-2',
    classNum: '12',
    subjectId: 'chemistry',
    chapterTitle: 'Chemical Kinetics',
    title: 'First Order Integrated Rate Law & Arrhenius Equation',
    formula: 'k = (2.303 / t) · log([R]₀ / [R])\nt_1/2 = 0.693 / k\nlog(k₂ / k₁) = (E_a / 2.303 R) · [(T₂ - T₁) / (T₁ T₂)]',
    variables: 'k = rate constant, [R]₀ = initial concentration, E_a = activation energy',
    application: 'Radioactive decay, half-life problems, temperature coefficient of reactions.',
  },
];
