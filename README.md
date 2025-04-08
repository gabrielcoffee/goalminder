# Goalminder
A goal reminder web app. Set new goals, receive email reminders, and track your progress! <br>
[goalminderapp.online](https://goalminderapp.online)

## About
As someone with a lot of goals, whether professional, personal, or otherwise, I sometimes find it challenging to keep track of everything. In today's world full of distractions, it's never been so easy to lose sight of what really matters. That's why I created Goalminder, to get a few emails from time to time reminding me of my plans and also helping me keep track of the progress made. To focus on the signal, not the noise.

### Features
- Set goals in different areas like Finance, Hobbies, Fitness and others.
- Adjust the frequency of the reminders, the tone of the message etc.
- Receive Email reminders of these goals
- Each reminder you can report the progress you made.
- Analyse the reports from each goal with charts.

### TechStack
- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Firebase](https://firebase.google.com/) – auth and document database
- [Resend](https://resend.com/) – emails
- [Netlify](https://netlify.com/) – deployments
- [Figma](https://www.figma.com/) - ui/ux design

## Contributing

This project is mainly for personal and portfolio use, but feel free to fork it or open a pull request if you find something you'd like to improve. But keep in mind if you run the project locally, you'll need to create your own Firebase project.

#### 1. Clone the repository
```bash
git clone https://github.com/gabrielcoffee/goalminder.git
cd goalminder
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Set up Firebase
1. Create a new project at console.firebase.google.com, then enable:
2. Authentication (Email/Password or whichever provider you prefer)
3. Firestore Database
4. Storage (if your app uses it)

Get your Firebase config object from Project Settings > General > Web App config, then create a .env.local file at the root of your project with the following variables:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### 4. Run the project
```bash
npm run dev
```

## What did I learn?
I ended up learning a lot of valuable technical skills through this project:
- React: I built dynamic, reusable UI components, making the interface more interactive and responsive.
- Next.js: I explored server-side rendering and static site generation, improving both performance and SEO.
- Firebase: I gained hands-on experience with document databases, authentication, and image storage, learning a lot about cloud-based backend integration.
- Tailwind CSS: I learned how to efficiently style and structure pages using utility-first CSS.
- Figma: I improved my design workflow by creating intuitive interfaces and prototypes.

And just as importantly, I developed a few soft skills along the way:
- Effort: Debugging and building the system took way more time than I expected when I first sketched it out.
- Patience: Probably the most I’ve ever had to practice on a project—countless small things broke, but it was all worth it in the end.
- Searching: Having never used React or Firebase before, I spent a lot of time reading docs, forums, and examples to figure things out.


## Preview of some pages:
### Home page (not logged in)
<img width="800" alt="goalminder home page" src="https://github.com/user-attachments/assets/449277dc-25c3-428b-b133-1c7e741f06ab" />

### User's goals
<img width="800" alt="user goals" src="https://github.com/user-attachments/assets/c795697e-a945-4847-baa2-8fa2439628aa" />

### Goal Page (top)
<img width="800" alt="goal information" src="https://github.com/user-attachments/assets/3cebd104-e120-4f4a-828d-5c3ebea351db" />

### Goal Page (bottom)
<img width="800" alt="goal progress status information" src="https://github.com/user-attachments/assets/a9e60d5f-d577-4642-b7cf-feb1b4d2f323" />

## License
This project is licensed under the MIT License.​
