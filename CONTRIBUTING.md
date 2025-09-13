# Contributing to Warisan Budaya Jawa Timur

Thank you for your interest in contributing to the Cultural Heritage of East Java project! This document provides guidelines and information for contributors.

## 🎯 Project Vision

Our mission is to create an engaging, accessible, and educational platform that showcases the rich cultural heritage of East Java, Indonesia. We aim to preserve and promote traditional arts, crafts, and cultural practices through modern web technology.

## 🚀 Getting Started

### Development Setup

1. **Fork and clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/warisan-budaya-jawa-timur.git
   cd warisan-budaya-jawa-timur
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Development Workflow

1. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make your changes**
   - Follow our coding standards
   - Write clean, documented code
   - Test on multiple devices

3. **Commit your changes**
   \`\`\`bash
   git add .
   git commit -m "feat: add your feature description"
   \`\`\`

4. **Push and create PR**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

## 📋 Contribution Types

### 🎨 UI/UX Improvements
- Enhance visual design and user experience
- Improve accessibility and responsive design
- Add new animations and interactive elements
- Optimize performance and loading times

### 🏛️ Cultural Content
- Add new traditional arts and crafts
- Improve existing cultural descriptions
- Add historical context and significance
- Contribute authentic images and media

### 🔧 Technical Enhancements
- Fix bugs and improve code quality
- Add new features and functionality
- Optimize performance and SEO
- Enhance mobile experience

### 📚 Documentation
- Improve README and guides
- Add code comments and documentation
- Create tutorials and examples
- Translate content to other languages

## 🎨 Design Guidelines

### Visual Design Principles
- **Authenticity**: Respect Indonesian cultural aesthetics
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Performance**: Maintain fast loading times
- **Responsiveness**: Support all device sizes

### Color System
\`\`\`css
/* Primary Colors */
--primary: oklch(0.45 0.15 65);     /* Indonesian Gold */
--secondary: oklch(0.55 0.2 270);   /* Deep Blue */
--accent: oklch(0.6 0.15 160);      /* Natural Green */

/* Neutral Colors */
--background: oklch(1 0 0);         /* White */
--foreground: oklch(0.35 0 0);      /* Dark Gray */
--muted: oklch(0.97 0.01 85);       /* Light Beige */
\`\`\`

### Typography
- **Headings**: Manrope (display font)
- **Body**: Geist Sans (readable sans-serif)
- **Code**: Geist Mono (monospace)

### Animation Guidelines
- Use subtle, purposeful animations
- Maintain 60fps performance
- Provide reduced motion alternatives
- Test on lower-end devices

## 💻 Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type usage
- Document complex type definitions

### React Components
\`\`\`tsx
// Good component structure
interface ComponentProps {
  title: string
  description?: string
  className?: string
}

export function Component({ 
  title, 
  description, 
  className 
}: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
\`\`\`

### Styling with Tailwind
- Use utility classes over custom CSS
- Follow mobile-first responsive design
- Maintain consistent spacing scale
- Use semantic color tokens

### File Organization
\`\`\`
components/
├── common/           # Shared components
├── cultural/         # Culture-specific components
├── interactive/      # Interactive UI elements
├── layout/          # Layout components
└── ui/              # Base UI components
\`\`\`

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Test on mobile, tablet, and desktop
- [ ] Verify accessibility with screen readers
- [ ] Check performance with slow connections
- [ ] Test animations and interactions
- [ ] Validate responsive design breakpoints

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Commit Message Format

Use conventional commits for clear history:

\`\`\`
type(scope): description

feat(cultural): add traditional dance showcase
fix(navbar): resolve mobile menu navigation
docs(readme): update installation instructions
style(ui): improve button hover animations
perf(images): optimize cultural heritage photos
\`\`\`

### Commit Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🔍 Code Review Process

### Before Submitting PR
- [ ] Code follows project standards
- [ ] All tests pass locally
- [ ] Documentation is updated
- [ ] Changes are tested on multiple devices
- [ ] Accessibility requirements are met

### PR Description Template
\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on mobile devices
- [ ] Tested with screen readers
- [ ] Performance impact assessed

## Screenshots
Include screenshots for UI changes
\`\`\`

## 🌍 Cultural Sensitivity

### Content Guidelines
- Research cultural accuracy thoroughly
- Respect traditional practices and beliefs
- Use appropriate terminology and descriptions
- Cite sources for historical information
- Avoid cultural appropriation or misrepresentation

### Image and Media
- Use authentic, high-quality images
- Respect copyright and attribution requirements
- Ensure cultural context is preserved
- Avoid stereotypical representations

## 🏆 Recognition

Contributors will be recognized in:
- README acknowledgments
- GitHub contributors list
- Project documentation
- Special mentions for significant contributions

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: technical-support@warisanbudaya.com

### Mentorship
New contributors can request mentorship for:
- Understanding the codebase
- Learning cultural context
- Technical guidance
- Design feedback

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping preserve and promote Indonesian cultural heritage through technology! 🇮🇩
