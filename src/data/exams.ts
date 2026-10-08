import { Exam } from '../types';

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'general-knowledge-101',
    title: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    category: 'General',
    description: 'Test your awareness of world geography, global history, international organizations, and landmark achievements.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Easy',
    icon: 'Globe',
    questions: [
      {
        id: 1,
        question: 'Which is the largest ocean on Earth by surface area?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctAnswer: 2,
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth’s surface area.'
      },
      {
        id: 2,
        question: 'In which year did the United Nations (UN) officially come into existence?',
        options: ['1919', '1945', '1950', '1939'],
        correctAnswer: 1,
        explanation: 'The United Nations was founded on October 24, 1945, after the end of World War II to promote international peace and cooperation.'
      },
      {
        id: 3,
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
        explanation: 'Canberra was chosen as the capital city of Australia in 1908 as a compromise between rival cities Sydney and Melbourne.'
      },
      {
        id: 4,
        question: 'Who was the first person to set foot on the Moon?',
        options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'Michael Collins'],
        correctAnswer: 2,
        explanation: 'Neil Armstrong stepped onto the lunar surface on July 20, 1969, during the Apollo 11 mission with the famous words, "That’s one small step for man, one giant leap for mankind."'
      },
      {
        id: 5,
        question: 'Which country is famously known as the "Land of the Rising Sun"?',
        options: ['China', 'Japan', 'South Korea', 'Thailand'],
        correctAnswer: 1,
        explanation: 'Japan is known as the Land of the Rising Sun because from China’s geographical perspective, the sun rises from the direction of Japan.'
      },
      {
        id: 6,
        question: 'What is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 1,
        explanation: 'The Nile River in northeastern Africa is traditionally considered the longest river in the world, measuring approximately 6,650 km (4,132 miles).'
      },
      {
        id: 7,
        question: 'Who painted the famous masterpiece "Mona Lisa"?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
        explanation: 'Leonardo da Vinci painted the Mona Lisa during the Italian Renaissance between 1503 and 1519.'
      },
      {
        id: 8,
        question: 'Which chemical element has the symbol "Au"?',
        options: ['Silver', 'Gold', 'Copper', 'Aluminum'],
        correctAnswer: 1,
        explanation: 'The chemical symbol Au comes from the Latin word "Aurum", which means gold.'
      },
      {
        id: 9,
        question: 'Which is the smallest continent by land area?',
        options: ['Europe', 'Antarctica', 'Australia', 'South America'],
        correctAnswer: 2,
        explanation: 'Australia is the smallest continent by land area, covering about 7.69 million square kilometers.'
      },
      {
        id: 10,
        question: 'Who was the primary author of the United States Declaration of Independence?',
        options: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'Alexander Hamilton'],
        correctAnswer: 1,
        explanation: 'Thomas Jefferson was chosen by the Committee of Five to draft the Declaration of Independence in June 1776.'
      }
    ]
  },
  {
    id: 'mathematics-foundations',
    title: 'Mathematics & Quantitative Aptitude',
    subject: 'Mathematics',
    category: 'Math',
    description: 'Sharpen your analytical problem-solving skills across arithmetic, algebra, percentages, geometry, and probability.',
    durationMinutes: 12,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Medium',
    icon: 'Calculator',
    questions: [
      {
        id: 1,
        question: 'If a triangle has angles measuring 50° and 70°, what is the measure of the third angle?',
        options: ['50°', '60°', '70°', '80°'],
        correctAnswer: 1,
        explanation: 'The sum of all internal angles in a triangle is always 180°. Therefore, 180° - (50° + 70°) = 180° - 120° = 60°.'
      },
      {
        id: 2,
        question: 'Solve for x: 3x + 15 = 45',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        explanation: 'Subtract 15 from both sides: 3x = 30. Then divide both sides by 3: x = 10.'
      },
      {
        id: 3,
        question: 'What is 25% of 240?',
        options: ['50', '60', '70', '80'],
        correctAnswer: 1,
        explanation: '25% is equal to 1/4. Calculating 240 / 4 gives 60.'
      },
      {
        id: 4,
        question: 'What is the value of 7 squared (7²)?',
        options: ['14', '42', '49', '56'],
        correctAnswer: 2,
        explanation: '7 squared is 7 multiplied by itself: 7 × 7 = 49.'
      },
      {
        id: 5,
        question: 'A car travels 180 km in 3 hours at a constant speed. What is its speed in km/h?',
        options: ['50 km/h', '60 km/h', '70 km/h', '90 km/h'],
        correctAnswer: 1,
        explanation: 'Speed = Distance / Time = 180 km / 3 hours = 60 km/h.'
      },
      {
        id: 6,
        question: 'What is the median of the numbers: 3, 9, 15, 2, 8?',
        options: ['3', '8', '9', '15'],
        correctAnswer: 1,
        explanation: 'Sort the numbers in ascending order: 2, 3, 8, 9, 15. The middle value is 8.'
      },
      {
        id: 7,
        question: 'What is the perimeter of a rectangle with length 12 cm and width 5 cm?',
        options: ['17 cm', '34 cm', '60 cm', '24 cm'],
        correctAnswer: 1,
        explanation: 'Perimeter of rectangle = 2 × (Length + Width) = 2 × (12 + 5) = 2 × 17 = 34 cm.'
      },
      {
        id: 8,
        question: 'If a fair 6-sided die is rolled, what is the probability of getting an even number?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'The even outcomes are {2, 4, 6}, which is 3 outcomes out of 6 possible. 3/6 simplifies to 1/2 (50%).'
      },
      {
        id: 9,
        question: 'What is the greatest common factor (GCF) of 24 and 36?',
        options: ['6', '8', '12', '18'],
        correctAnswer: 2,
        explanation: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The highest common factor is 12.'
      },
      {
        id: 10,
        question: 'What is the square root of 144?',
        options: ['11', '12', '13', '14'],
        correctAnswer: 1,
        explanation: '12 × 12 = 144, so √144 = 12.'
      }
    ]
  },
  {
    id: 'general-science-101',
    title: 'General Science & Natural Phenomena',
    subject: 'Science',
    category: 'Science',
    description: 'Explore core principles of physics, biology, chemistry, and environmental science that govern our universe.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Easy',
    icon: 'Atom',
    questions: [
      {
        id: 1,
        question: 'What organelle is known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswer: 2,
        explanation: 'Mitochondria generate most of the chemical energy needed to power the cell’s biochemical reactions (ATP).'
      },
      {
        id: 2,
        question: 'What is the speed of light in a vacuum approximately?',
        options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '1,000,000 km/s'],
        correctAnswer: 0,
        explanation: 'Light travels at approximately 299,792 kilometers per second (commonly rounded to 300,000 km/s or 3 × 10⁸ m/s).'
      },
      {
        id: 3,
        question: 'Which gas is most abundant in the Earth’s atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
        correctAnswer: 1,
        explanation: 'Nitrogen makes up roughly 78% of Earth’s atmosphere, followed by oxygen at approximately 21%.'
      },
      {
        id: 4,
        question: 'What is the pH level of pure, neutral water at 25°C?',
        options: ['0', '5', '7', '14'],
        correctAnswer: 2,
        explanation: 'Pure water has a neutral pH of 7 on the scale ranging from 0 (very acidic) to 14 (very alkaline).'
      },
      {
        id: 5,
        question: 'Which planet in our solar system has the most prominent ring system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: 1,
        explanation: 'Saturn has the most extensive and visually prominent ring system, composed mostly of ice particles and rocky debris.'
      },
      {
        id: 6,
        question: 'Which human blood type is considered the universal red blood cell donor?',
        options: ['A positive', 'B negative', 'AB positive', 'O negative'],
        correctAnswer: 3,
        explanation: 'Type O negative blood lacks A, B, and Rh antigens, making it safe for transfusions to individuals of almost any blood type.'
      },
      {
        id: 7,
        question: 'What fundamental force keeps planets orbiting around the Sun?',
        options: ['Electromagnetic force', 'Centrifugal force', 'Gravitational force', 'Nuclear force'],
        correctAnswer: 2,
        explanation: 'Gravity is the attractive force that keeps celestial bodies like planets locked in elliptical orbits around the Sun.'
      },
      {
        id: 8,
        question: 'What is the process by which green plants make food using sunlight?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'],
        correctAnswer: 1,
        explanation: 'Photosynthesis uses chlorophyll to convert water, carbon dioxide, and sunlight into glucose and oxygen.'
      },
      {
        id: 9,
        question: 'What is the chemical formula for ordinary table salt?',
        options: ['H2O', 'NaCl', 'CO2', 'KCl'],
        correctAnswer: 1,
        explanation: 'Common table salt consists of sodium (Na) and chlorine (Cl), forming Sodium Chloride (NaCl).'
      },
      {
        id: 10,
        question: 'Which layer of the atmosphere protects Earth from harmful ultraviolet (UV) radiation?',
        options: ['Troposphere', 'Ozone layer', 'Mesosphere', 'Exosphere'],
        correctAnswer: 1,
        explanation: 'The ozone layer (within the stratosphere) absorbs the majority of the Sun’s biologically harmful UV-B radiation.'
      }
    ]
  },
  {
    id: 'english-grammar-vocabulary',
    title: 'English Language & Verbal Proficiency',
    subject: 'English',
    category: 'Language',
    description: 'Assess your command over English grammar, vocabulary, idioms, sentence correction, and verbal reasoning.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Easy',
    icon: 'BookOpen',
    questions: [
      {
        id: 1,
        question: 'Identify the synonym of the word "BENEVOLENT":',
        options: ['Cruel', 'Kindhearted', 'Arrogant', 'Deceitful'],
        correctAnswer: 1,
        explanation: '"Benevolent" means well-meaning, generous, and kindly. Hence, "Kindhearted" is the correct synonym.'
      },
      {
        id: 2,
        question: 'Choose the correct form of the verb: "Neither the teacher nor the students ____ present yesterday."',
        options: ['was', 'were', 'is', 'are'],
        correctAnswer: 1,
        explanation: 'When subjects are connected by "neither... nor", the verb agrees with the subject closest to it ("students" is plural, so "were").'
      },
      {
        id: 3,
        question: 'What is the antonym of "OBSOLETE"?',
        options: ['Outdated', 'Antique', 'Contemporary', 'Ancient'],
        correctAnswer: 2,
        explanation: '"Obsolete" means no longer produced or used (out of date). Its opposite is "Contemporary" or modern.'
      },
      {
        id: 4,
        question: 'Which of the following sentences is grammatically correct?',
        options: [
          'She don’t have no money left.',
          'She does not have any money left.',
          'She hasn’t got no money left.',
          'She doesn’t has any money left.'
        ],
        correctAnswer: 1,
        explanation: '"She does not have any money left" uses standard subject-verb agreement and avoids double negatives.'
      },
      {
        id: 5,
        question: 'What does the idiom "Break the ice" mean?',
        options: [
          'To start a physical fight',
          'To initiate a conversation in an awkward or tense situation',
          'To clean a frozen lake',
          'To express deep sorrow'
        ],
        correctAnswer: 1,
        explanation: '"To break the ice" means to do or say something that relieves tension or awkwardness at the start of a meeting.'
      },
      {
        id: 6,
        question: 'Choose the correctly spelled word:',
        options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
        correctAnswer: 2,
        explanation: '"Accommodate" is spelled with double "c" and double "m".'
      },
      {
        id: 7,
        question: 'Identify the part of speech of "quickly" in: "He ran quickly to catch the bus."',
        options: ['Noun', 'Adjective', 'Adverb', 'Conjunction'],
        correctAnswer: 2,
        explanation: '"Quickly" modifies the action verb "ran", describing how he ran, making it an adverb.'
      },
      {
        id: 8,
        question: 'Select the correct preposition: "She has been working here ____ 2018."',
        options: ['for', 'since', 'from', 'in'],
        correctAnswer: 1,
        explanation: 'We use "since" to refer to a specific starting point in time in the past up until now.'
      },
      {
        id: 9,
        question: 'What is the plural form of "Crisis"?',
        options: ['Crisises', 'Crises', 'Crisi', 'Crisis'],
        correctAnswer: 1,
        explanation: 'The plural form of "crisis" (derived from Greek) is "crises".'
      },
      {
        id: 10,
        question: 'Complete the proverb: "A stitch in time saves ____."',
        options: ['five', 'ten', 'nine', 'all'],
        correctAnswer: 2,
        explanation: 'The complete traditional proverb is "A stitch in time saves nine", meaning dealing with problems immediately saves greater effort later.'
      }
    ]
  },
  {
    id: 'computer-basics-programming',
    title: 'Computer Basics & Software Engineering',
    subject: 'Computer Basics',
    category: 'Tech',
    description: 'Evaluate your knowledge of computer hardware, data structures, networking, web protocols, and programming fundamentals.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Medium',
    icon: 'Cpu',
    questions: [
      {
        id: 1,
        question: 'What does CPU stand for in computer systems?',
        options: [
          'Central Process Unit',
          'Central Processing Unit',
          'Computer Power Unit',
          'Core Processing Utility'
        ],
        correctAnswer: 1,
        explanation: 'CPU stands for Central Processing Unit, the primary component that executes computer program instructions.'
      },
      {
        id: 2,
        question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
        options: ['Stack', 'Queue', 'Binary Tree', 'Graph'],
        correctAnswer: 1,
        explanation: 'A Queue works on FIFO (First In, First Out), whereas a Stack works on LIFO (Last In, First Out).'
      },
      {
        id: 3,
        question: 'What is the default port number used by the standard HTTP protocol?',
        options: ['21', '22', '80', '443'],
        correctAnswer: 2,
        explanation: 'HTTP standard web traffic uses port 80 by default. Secure HTTP (HTTPS) uses port 443.'
      },
      {
        id: 4,
        question: 'Which of the following is an example of volatile memory?',
        options: ['ROM', 'Hard Disk Drive', 'RAM', 'Solid State Drive'],
        correctAnswer: 2,
        explanation: 'RAM (Random Access Memory) is volatile; it loses all stored data when computer power is turned off.'
      },
      {
        id: 5,
        question: 'In programming, what is the time complexity of searching an element in a sorted array using Binary Search?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'Binary Search halves the search space with each step, yielding a logarithmic time complexity of O(log n).'
      },
      {
        id: 6,
        question: 'Which protocol is used to automatically assign IP addresses to devices on a network?',
        options: ['DNS', 'DHCP', 'FTP', 'SMTP'],
        correctAnswer: 1,
        explanation: 'DHCP (Dynamic Host Configuration Protocol) assigns dynamic IP addresses and network parameters to devices.'
      },
      {
        id: 7,
        question: 'What does SQL stand for in database management?',
        options: [
          'Structured Question Language',
          'Structured Query Language',
          'Simple Query Language',
          'Sequential Query Logic'
        ],
        correctAnswer: 1,
        explanation: 'SQL stands for Structured Query Language, the standardized domain-specific language for relational databases.'
      },
      {
        id: 8,
        question: 'Which of the following programming languages is primarily statically typed by default?',
        options: ['JavaScript', 'Python', 'Java', 'PHP'],
        correctAnswer: 2,
        explanation: 'Java requires explicit type declarations and does compile-time type verification, making it statically typed.'
      },
      {
        id: 9,
        question: 'What does "git clone" do in version control?',
        options: [
          'Deletes an existing repository',
          'Creates a local copy of an existing remote repository',
          'Commits changes to the main branch',
          'Merges two divergent branches'
        ],
        correctAnswer: 1,
        explanation: '"git clone" creates a complete duplicate copy of a remote Git repository onto your local machine.'
      },
      {
        id: 10,
        question: 'Which HTTP status code signifies that a requested resource was not found?',
        options: ['200', '301', '404', '500'],
        correctAnswer: 2,
        explanation: 'Status code 404 indicates "Not Found", meaning the server cannot locate the requested endpoint.'
      }
    ]
  },
  {
    id: 'logical-reasoning-aptitude',
    title: 'Logical Reasoning & Analytical Thinking',
    subject: 'Reasoning',
    category: 'Aptitude',
    description: 'Challenge your critical thinking, pattern recognition, syllogisms, sequence deductions, and spatial logic.',
    durationMinutes: 12,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Medium',
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: 'Look at the number series: 2, 6, 12, 20, 30, ... What number should come next?',
        options: ['38', '40', '42', '44'],
        correctAnswer: 2,
        explanation: 'Differences between consecutive numbers increase by 2: +4, +6, +8, +10. Next difference is +12: 30 + 12 = 42.'
      },
      {
        id: 2,
        question: 'If CAT is coded as 3120, how is DOG coded in that same system (A=1, B=2, ...)?',
        options: ['4147', '4157', '4167', '4158'],
        correctAnswer: 1,
        explanation: 'Letters correspond to their alphabetical positions: D=4, O=15, G=7. Thus DOG is coded as 4157.'
      },
      {
        id: 3,
        question: 'Pointing to a photograph, a man says, "She is the daughter of my grandfather’s only son." Who is the girl to the man?',
        options: ['His mother', 'His sister', 'His aunt', 'His cousin'],
        correctAnswer: 1,
        explanation: 'Grandfather’s only son is the speaker’s father. The daughter of his father is his sister.'
      },
      {
        id: 4,
        question: 'Which word does NOT belong with the other three?',
        options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
        correctAnswer: 2,
        explanation: 'Triangle (3 sides), square (4 sides), and pentagon (5 sides) are all polygons with straight edges. A circle is curved.'
      },
      {
        id: 5,
        question: 'If all Roses are Flowers, and some Flowers fade quickly, which of the following is necessarily true?',
        options: [
          'All Roses fade quickly',
          'No Roses fade quickly',
          'Some Roses might fade quickly',
          'Roses never fade'
        ],
        correctAnswer: 2,
        explanation: 'Since roses belong to the set of flowers, and some flowers fade quickly, it is possible (or might be true) that some roses fade quickly, but neither all nor none is guaranteed.'
      },
      {
        id: 6,
        question: 'Complete the letter sequence: B, D, G, K, P, ...',
        options: ['S', 'U', 'V', 'W'],
        correctAnswer: 2,
        explanation: 'B(+2) -> D(+3) -> G(+4) -> K(+5) -> P(+6) -> V (16 + 6 = 22, which is V).'
      },
      {
        id: 7,
        question: 'A clock shows 3:15. What is the angle between the hour hand and the minute hand?',
        options: ['0°', '7.5°', '15°', '22.5°'],
        correctAnswer: 1,
        explanation: 'At 3:15, the minute hand is at 90°. The hour hand moves 0.5° per minute, so at 15 minutes it is at 90° + (15 × 0.5°) = 97.5°. Difference = 97.5° - 90° = 7.5°.'
      },
      {
        id: 8,
        question: 'If NORTH becomes SOUTH-WEST, what will EAST become under the same rotation?',
        options: ['NORTH-WEST', 'SOUTH-EAST', 'WEST', 'NORTH-EAST'],
        correctAnswer: 0,
        explanation: 'North to South-West is a clockwise rotation of 225° (or 135° counter-clockwise). Applying 135° counter-clockwise to East (90°) points to North-West (315°).'
      },
      {
        id: 9,
        question: 'In a row of 30 students, Rohit is 12th from the left. What is his position from the right end?',
        options: ['17th', '18th', '19th', '20th'],
        correctAnswer: 2,
        explanation: 'Position from right = (Total students - Position from left) + 1 = (30 - 12) + 1 = 18 + 1 = 19th.'
      },
      {
        id: 10,
        question: 'Book is to Reading as Fork is to ____:',
        options: ['Cooking', 'Eating', 'Kitchen', 'Cutting'],
        correctAnswer: 1,
        explanation: 'A book is a tool used for reading; a fork is an utensil used for eating.'
      }
    ]
  }
];
