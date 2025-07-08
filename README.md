# Modular Resume Builder

A personalized, component-based resume builder to streamline job applications and generate export-ready resumes in seconds.

## 🚀 Current State

The application is a fully functional resume builder with the following features:

### ✅ Implemented Features
- **User Authentication**: Sign up, login, and user management with Supabase
- **Modular Resume Sections**: Custom + Standard resume headings.
- **Drag & Drop Interface**: Reorder resume sections, & subsections with intuitive drag and drop
- **Real-time Preview**: Live preview of your resume as you edit
- **Collapsible Editor Panels**: Clean, organized editing interface
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: All data is saved to Supabase database for each users. Properly authenticated. 


## 📸 Screenshots

<div align="center">
  <img src="modular-resume1.png" alt="Resume Builder Interface" width="600" />
  <br/>
  <img src="modular-resume2.png" alt="Resume Preview" width="600" />
</div>

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, dnd-kit, Tailwind CSS 4, Radix UI components, Shadcn UI.
- **Database**: Supabase (PostgreSQL), Supabase Auth, Prisma client.

3. **Set up environment variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Future Todos

### 🔥 High Priority
- [ ] **PDF Export**: Add ability to export resumes as PDF
- [ ] **Multiple Templates**: Create different resume templates/styles
- [ ] **Resume Sharing**: Generate shareable links for resumes
- [ ] **Import/Export**: Allow importing from LinkedIn, JSON, PDF/Word formats, and GitHub for projects import.
- [ ] **Auto-save**: Implement real-time auto-save functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database powered by [Supabase](https://supabase.com/)
- Inspired by Jobright's Resume editor. 
