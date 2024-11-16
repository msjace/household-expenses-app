I created a household expenses app using Next.js 15 and the new useActionState hook in React.

This is a lightweight app where each logged-in user can record their personal expenses and review them on the dashboard.


### expenses

I have made it simple to manage expenses. While I usually use Tanstack Table to create tables, this time I tried building one from scratch.


https://github.com/user-attachments/assets/13d7293e-501d-4eac-a3b4-534e23f84421

### dashboard

 I used nuqs to control the query parameters for the expense analysis period, as it is very convenient for this purpose.


https://github.com/user-attachments/assets/e3758789-2b62-41cf-9fa5-4052d22dfe79



### auth

This time, I implemented a login feature by leveraging the fact that the form action in useActionState can be used as a server action, allowing cookie management on the server side.

In Firebase Auth, the usual approach involves using onAuthStateChanged and wrapping components with an AuthProvider to manage login state and data handling. However, since this relies on client-side processing, I intentionally avoided using it in this implementation.

(Unlike solutions like Supabase, Firebase lacks official documentation for handling authentication on the server side for SSR scenarios.)

## Getting Started

Please set up Firebase and add the necessary information to the .env.development.local file.

```bash
touch .env.development.local
```

```bash
npm run dev
```

## Learn More

- [Next.js15](https://nextjs.org/blog/next-15)
- [useActionState](https://react.dev/reference/react/useActionState)
- [nuqs](https://nuqs.47ng.com/)
- [Firebase Auth provides server-side session cookie](https://firebase.google.com/docs/auth/admin/manage-cookies)
