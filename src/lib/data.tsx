import React from 'react';
import { PlaceHolderImages } from './placeholder-images';

// USERS
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  imageHint: string;
}

export const users: User[] = [
  { id: 'user-1', name: 'Алексей Вольнов', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl!, imageHint: PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageHint! },
  { id: 'user-2', name: 'Елена Миронова', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageUrl!, imageHint: PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageHint! },
  { id: 'user-3', name: 'Иван Петров', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageUrl!, imageHint: PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageHint! },
  { id: 'user-4', name: 'Мария Сидорова', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-4')?.imageUrl!, imageHint: PlaceHolderImages.find(img => img.id === 'user-avatar-4')?.imageHint! },
  { id: 'user-5', name: 'Дмитрий Козлов', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-5')?.imageUrl!, imageHint: PlaceHolderImages.find(img => img.id === 'user-avatar-5')?.imageHint! },
];

// POSTS
export type PostTopic = 'news' | 'programming' | 'design' | 'career';

export interface Post {
  id: string;
  title: string;
  content: React.ReactNode;
  author: User;
  createdAt: Date;
  topic: PostTopic;
  tags: string[];
  views: number;
  likes: number;
  commentsCount: number;
  imageUrl?: string;
  imageHint?: string;
}

const posts: Post[] = [
  {
    id: 'post-1',
    title: 'Глубокое погружение в React Server Components',
    author: users[0],
    createdAt: new Date('2024-07-20T10:00:00Z'),
    topic: 'programming',
    tags: ['react', 'nextjs', 'frontend', 'javascript'],
    views: 15200,
    likes: 830,
    commentsCount: 45,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-1')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-1')?.imageHint,
    content: (
      <>
        <p className="lead text-lg text-muted-foreground mb-6">
          React Server Components (RSC) — это новая архитектурная парадигма, которая меняет способ создания веб-приложений. Давайте разберемся, что это такое и как их использовать в Next.js 14.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Что такое Server Components?</h3>
        <p className="mb-4">
          В отличие от традиционных компонентов React, которые рендерятся на клиенте, серверные компоненты выполняются исключительно на сервере. Это позволяет им напрямую получать доступ к источникам данных (базы данных, файловая система) без необходимости создавать API-эндпоинты.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Преимущества</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Zero Bundle Size:</strong> Код серверных компонентов не попадает в клиентский бандл, что уменьшает размер JavaScript.</li>
          <li><strong>Прямой доступ к бэкенду:</strong> Упрощает получение данных и улучшает безопасность.</li>
          <li><strong>Автоматическое разделение кода:</strong> Клиентские компоненты загружаются только при необходимости.</li>
        </ul>
        <pre><code>
{`// Пример серверного компонента
async function MyServerComponent() {
  const data = await db.query('...');
  return <div>{data.message}</div>;
}`}
        </code></pre>
        <p className="mt-4">
          Интеграция с клиентскими компонентами происходит плавно. Вы можете импортировать клиентский компонент в серверный, и Next.js автоматически обработает "границу" между сервером и клиентом. Для получения дополнительной информации посетите <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-primary underline">официальный сайт React</a>.
        </p>
      </>
    ),
  },
  {
    id: 'post-2',
    title: 'UI/UX Тренды 2024: Брутализм и Аврора',
    author: users[1],
    createdAt: new Date('2024-07-19T14:30:00Z'),
    topic: 'design',
    tags: ['ui', 'ux', 'design-trends'],
    views: 8900,
    likes: 450,
    commentsCount: 22,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-2')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-2')?.imageHint,
    content: (
        <>
        <p className="text-lg text-muted-foreground mb-6">В мире дизайна постоянно появляются новые течения. В 2024 году на пике популярности два интересных стиля: нео-брутализм и градиенты "Аврора".</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Нео-брутализм</h3>
        <p className="mb-4">Это не тот грубый брутализм 90-х. Современная версия сочетает в себе честность HTML-структуры, высококонтрастные цвета и отсутствие излишних украшений, но с продуманной типографикой и композицией. Ключевые черты: чистые цвета, отсутствие градиентов, четкие тени.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Градиенты "Аврора"</h3>
        <p className="mb-4">В противовес брутализму, "Аврора" — это мягкие, размытые, переливающиеся градиенты, напоминающие северное сияние. Они создают ощущение воздушности, легкости и футуристичности. Часто используются в качестве фона для создания атмосферы.</p>
      </>
    ),
  },
  {
    id: 'post-3',
    title: 'Как пройти собеседование на позицию Senior Frontend Developer',
    author: users[3],
    createdAt: new Date('2024-07-18T09:00:00Z'),
    topic: 'career',
    tags: ['собеседование', 'карьера', 'frontend'],
    views: 25400,
    likes: 1200,
    commentsCount: 89,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-3')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-3')?.imageHint,
    content: (
        <>
        <p className="text-lg text-muted-foreground mb-6">Собеседование на позицию Senior — это не только проверка технических знаний, но и оценка вашего опыта, мышления и soft skills. Вот несколько советов.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">1. Системный дизайн</h3>
        <p className="mb-4">Будьте готовы спроектировать архитектуру приложения. Например, "спроектируйте ленту новостей как в Twitter". Важно не просто предложить решение, а обсудить компромиссы, масштабируемость, производительность.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">2. Глубокие знания JavaScript</h3>
        <p className="mb-4">Вопросы про event loop, прототипное наследование, замыкания и сборку мусора — обязательная программа. Вы должны понимать, как JS работает "под капотом".</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">3. Опыт и проекты</h3>
        <p className="mb-4">Рассказывайте о своих прошлых проектах, используя STAR-метод (Situation, Task, Action, Result). Какие были проблемы? Как вы их решили? Каков был результат для бизнеса?</p>
      </>
    ),
  },
  {
    id: 'post-4',
    title: 'Вышел Bun 1.1: Что нового?',
    author: users[2],
    createdAt: new Date('2024-07-21T12:00:00Z'),
    topic: 'news',
    tags: ['bun', 'javascript', 'performance'],
    views: 5600,
    likes: 320,
    commentsCount: 15,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-4')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-4')?.imageHint,
    content: (
      <p>Bun 1.1 принес множество улучшений производительности и совместимости с Node.js API. Главные нововведения...</p>
    ),
  },
  {
    id: 'post-5',
    title: 'Анализ данных на Python: с чего начать?',
    author: users[4],
    createdAt: new Date('2024-07-17T18:00:00Z'),
    topic: 'programming',
    tags: ['python', 'data-science', 'pandas'],
    views: 12300,
    likes: 710,
    commentsCount: 55,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-5')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-5')?.imageHint,
    content: (
      <p>Pandas, NumPy, Matplotlib — святая троица для любого начинающего аналитика данных. В этой статье мы разберем основы работы с Pandas.</p>
    ),
  },
  {
    id: 'post-6',
    title: 'CSS is Awesome: трюки, о которых вы могли не знать',
    author: users[1],
    createdAt: new Date('2024-07-16T11:45:00Z'),
    topic: 'programming',
    tags: ['css', 'frontend', 'animation'],
    views: 18900,
    likes: 980,
    commentsCount: 62,
    imageUrl: PlaceHolderImages.find(img => img.id === 'post-image-6')?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === 'post-image-6')?.imageHint,
    content: (
      <p>CSS развивается стремительно. Новые функции, такие как container queries, :has() и view transitions, открывают невероятные возможности.</p>
    ),
  },
  // Add more posts to have at least 10 for pagination
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `post-${7 + i}`,
    title: `Дополнительная статья ${7 + i}: Заголовок`,
    author: users[i % 5],
    createdAt: new Date(new Date().setDate(new Date().getDate() - (i + 3))),
    topic: (['programming', 'design', 'career', 'news'] as PostTopic[])[i % 4],
    tags: ['sample', `tag${i}`],
    views: 1000 + (i * 500),
    likes: 50 + (i * 20),
    commentsCount: 10 + i,
    content: <p>Это автоматически сгенерированная статья для демонстрации пагинации.</p>,
    imageUrl: PlaceHolderImages.find(img => img.id === `post-image-${(i % 6) + 1}`)?.imageUrl,
    imageHint: PlaceHolderImages.find(img => img.id === `post-image-${(i % 6) + 1}`)?.imageHint,
  })),
];


// QUESTIONS
export interface Question {
  id: string;
  title: string;
  content: React.ReactNode;
  author: User;
  createdAt: Date;
  tags: string[];
  views: number;
  votes: number;
  answersCount: number;
}

const questions: Question[] = [
  {
    id: 'q-1',
    title: 'Как правильно центрировать div в CSS?',
    author: users[2],
    createdAt: new Date('2024-07-20T15:00:00Z'),
    tags: ['css', 'html', 'layout'],
    views: 5234,
    votes: 25,
    answersCount: 3,
    content: (
      <>
        <p className="mb-4">Кажется, это вечный вопрос, но я до сих пор путаюсь. Какие есть современные и надежные способы отцентрировать элемент по горизонтали и вертикали внутри родительского блока?</p>
        <p>Я пробовал <code>margin: 0 auto;</code> для горизонтального, но для вертикального это не работает. Слышал про Flexbox и Grid, но какой способ предпочтительнее?</p>
        <pre><code>
{`<div class="parent">
  <div class="child">Нужно отцентрировать</div>
</div>`}
        </code></pre>
      </>
    ),
  },
  {
    id: 'q-2',
    title: 'TypeError: Cannot read properties of undefined в React. Что делать?',
    author: users[0],
    createdAt: new Date('2024-07-19T11:20:00Z'),
    tags: ['react', 'javascript', 'debugging'],
    views: 8912,
    votes: 12,
    answersCount: 2,
    content: (
      <>
        <p className="mb-4">Получаю ошибку <code>TypeError: Cannot read properties of undefined (reading 'name')</code> в своем компоненте. Я понимаю, что это значит, что я пытаюсь получить доступ к свойству объекта, который еще не определен, но не могу понять почему.</p>
        <p>Данные приходят из асинхронного запроса. Как правильно обрабатывать такие ситуации, чтобы избежать ошибки до того, как данные загрузятся?</p>
        <pre><code>
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return <h1>{user.name}</h1>; // Ошибка здесь
}`}
        </code></pre>
      </>
    ),
  },
    {
    id: 'q-3',
    title: 'Как оптимизировать SQL-запрос с несколькими JOIN?',
    author: users[4],
    createdAt: new Date('2024-07-18T19:40:00Z'),
    tags: ['sql', 'database', 'performance'],
    views: 4321,
    votes: 35,
    answersCount: 2,
    content: (
      <>
        <p className="mb-4">У меня есть сложный SQL-запрос, который объединяет 5 таблиц. Он работает очень медленно. Какие есть общие подходы к оптимизации таких запросов? Индексы на внешних ключах уже есть.</p>
        <p>Стоит ли использовать CTE (Common Table Expressions)? Поможет ли денормализация? База данных - PostgreSQL.</p>
      </>
    ),
  },
];


// ANSWERS
export interface Answer {
  id: string;
  questionId: string;
  content: React.ReactNode;
  author: User;
  createdAt: Date;
  votes: number;
}

const answers: Answer[] = [
  {
    id: 'ans-1',
    questionId: 'q-1',
    author: users[1],
    createdAt: new Date('2024-07-20T15:10:00Z'),
    votes: 42,
    content: (
      <>
        <p className="mb-4">Привет! Самый современный и простой способ — использовать CSS Flexbox.</p>
        <pre><code>
{`.parent {
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center;     /* Центрирование по вертикали */
  min-height: 100vh;         /* Пример высоты родителя */
}`}
        </code></pre>
        <p className="mt-4">Еще один отличный способ — CSS Grid:</p>
        <pre><code>
{`.parent {
  display: grid;
  place-items: center;
  min-height: 100vh;
}`}
        </code></pre>
        <p className="mt-4">Оба способа отлично подходят. Grid может быть даже лаконичнее для этой конкретной задачи.</p>
      </>
    ),
  },
  {
    id: 'ans-2',
    questionId: 'q-1',
    author: users[3],
    createdAt: new Date('2024-07-20T16:00:00Z'),
    votes: 15,
    content: (
        <p>Можно и по-старинке, с абсолютным позиционированием, если родитель имеет <code>position: relative;</code></p>
    ),
  },
  {
    id: 'ans-3',
    questionId: 'q-1',
    author: users[0],
    createdAt: new Date('2024-07-20T15:15:00Z'),
    votes: 5,
    content: (
        <p>Спасибо! Flexbox - то, что нужно. Grid тоже выглядит интересно, надо будет изучить.</p>
    ),
  },
  {
    id: 'ans-4',
    questionId: 'q-2',
    author: users[3],
    createdAt: new Date('2024-07-19T11:35:00Z'),
    votes: 38,
    content: (
      <>
        <p className="mb-4">Классическая ситуация при работе с асинхронными данными. Есть несколько способов решения:</p>
        <h3 className="text-xl font-bold mt-6 mb-2">1. Условный рендеринг</h3>
        <p className="mb-4">Просто не рендерите компонент, пока данные не загружены.</p>
        <pre><code>
{`if (!user) {
  return <div>Загрузка...</div>;
}

return <h1>{user.name}</h1>;`}
        </code></pre>
        <h3 className="text-xl font-bold mt-6 mb-2">2. Optional Chaining (Оператор опциональной последовательности)</h3>
        <p className="mb-4">Используйте <code>?.</code>, чтобы безопасно получить доступ к вложенным свойствам. Если <code>user</code> это <code>null</code> или <code>undefined</code>, выражение вернет <code>undefined</code> вместо ошибки.</p>
        <pre><code>
{`return <h1>{user?.name}</h1>;`}
        </code></pre>
        <p className="mt-4">Обычно комбинируют оба подхода: показывают индикатор загрузки, а для избежания редких пограничных случаев используют optional chaining.</p>
      </>
    ),
  },
  {
    id: 'ans-5',
    questionId: 'q-2',
    author: users[1],
    createdAt: new Date('2024-07-19T12:00:00Z'),
    votes: 8,
    content: (
      <p>Также важно задавать правильное начальное состояние. Вместо <code>useState(null)</code> можно использовать <code>useState()</code> (т.е. undefined) или <code>useState({})</code>. Но условный рендеринг - самый надежный способ.</p>
    ),
  },
    {
    id: 'ans-6',
    questionId: 'q-3',
    author: users[0],
    createdAt: new Date('2024-07-18T20:00:00Z'),
    votes: 22,
    content: (
      <>
        <p className="mb-4">Первое, что нужно сделать — использовать <code>EXPLAIN ANALYZE</code> для вашего запроса. Это покажет план выполнения и выявит "узкие места".</p>
        <p className="mb-4">Часто проблема в том, что PostgreSQL выбирает неоптимальный порядок соединения таблиц (JOIN order). Убедитесь, что статистика по таблицам актуальна (запустите <code>ANALYZE your_table;</code>).</p>
        <p>Иногда помогает переписать JOIN на <code>INNER JOIN</code> вместо <code>LEFT JOIN</code>, если это возможно по логике, или наоборот. CTE могут улучшить читаемость, но не всегда улучшают производительность (иногда наоборот, так как могут выступать как барьер для оптимизатора).</p>
      </>
    ),
  },
  {
    id: 'ans-7',
    questionId: 'q-3',
    author: users[3],
    createdAt: new Date('2024-07-19T09:00:00Z'),
    votes: 11,
    content: (
      <p>Проверьте, нет ли у вас соединений по полям с разными типами данных. Это может мешать использованию индексов. Также, если вы фильтруете по полю из одной из таблиц (в <code>WHERE</code>), убедитесь, что на нем есть индекс.</p>
    ),
  }
];

// Data fetching functions
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPosts(params: { page?: number; limit?: number; topic?: PostTopic | 'all', sort?: 'newest' | 'popular' }): Promise<{ posts: Post[]; totalPages: number }> {
  await sleep(500); // Simulate network delay
  const { page = 1, limit = 9, topic = 'all', sort = 'newest' } = params;

  let filteredPosts = topic === 'all' ? posts : posts.filter(p => p.topic === topic);

  if (sort === 'newest') {
    filteredPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (sort === 'popular') {
    filteredPosts.sort((a, b) => b.likes - a.likes);
  }

  const totalPages = Math.ceil(filteredPosts.length / limit);
  const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);

  return { posts: paginatedPosts, totalPages };
}

export async function getPostById(id: string): Promise<Post | undefined> {
  await sleep(300);
  return posts.find(p => p.id === id);
}

export async function getQuestions(params: { page?: number; limit?: number; sort?: 'newest' | 'popular' }): Promise<{ questions: Question[]; totalPages: number }> {
  await sleep(500);
  const { page = 1, limit = 10, sort = 'newest' } = params;

  let sortedQuestions = [...questions];

  if (sort === 'newest') {
    sortedQuestions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (sort === 'popular') {
    sortedQuestions.sort((a, b) => b.votes - a.votes);
  }

  const totalPages = Math.ceil(sortedQuestions.length / limit);
  const paginatedQuestions = sortedQuestions.slice((page - 1) * limit, page * limit);

  return { questions: paginatedQuestions, totalPages };
}

export async function getQuestionById(id: string): Promise<Question | undefined> {
  await sleep(300);
  return questions.find(q => q.id === id);
}

export async function getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
  await sleep(300);
  return answers.filter(a => a.questionId === questionId).sort((a,b) => b.votes - a.votes);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}
