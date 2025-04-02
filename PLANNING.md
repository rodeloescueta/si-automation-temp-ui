# SI Automation UI - Project Planning

## Project Overview

SI Automation UI is a Next.js-based application designed to automate various tasks and processes. The application integrates with external services like Attio CRM to enhance workflow automation.

## Architecture

### Tech Stack

- Next.js (App Router)
- TypeScript
- Shadcn UI Components (!important use shadcn@latest add ... - and do not use shadcn-ui@latest)
- PNPM for package management
- Attio CRM API Integration

### Directory Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   └── pitch-template-generator/
│       └── page.tsx       # Pitch template generator feature
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions and shared logic
│   ├── utils.ts         # General utilities
│   └── api/             # API integration logic
│       └── attio/       # Attio CRM API handlers
├── types/                # TypeScript type definitions
└── styles/              # Global styles and CSS modules
```

### Key Features (Initial Phase)

1. Pitch Template Generator
   - Record ID input field
   - Attio CRM data fetching
   - JSON data display
   - Template generation interface (future)
   - LinkedIn message formatting (future)

## Style Guide

### Code Conventions

- Use TypeScript strict mode
- Implement proper error handling
- Follow functional programming principles
- Use React Server Components where applicable
- Implement proper loading and error states

### Component Structure

- Separate concerns between data fetching and presentation
- Use custom hooks for complex logic
- Implement proper TypeScript interfaces
- Follow atomic design principles

### API Integration

- Use environment variables for sensitive data
- Implement proper error handling and rate limiting
- Cache API responses where appropriate
- Use TypeScript types for API responses

## Security Considerations

- Secure storage of API tokens
- Input validation and sanitization
- Rate limiting for API calls
- Proper error handling and logging

## Performance Guidelines

- Implement proper loading states
- Use proper caching strategies
- Optimize API calls
- Implement proper error boundaries

## Future Considerations

- Additional automation features
- Enhanced template customization
- Integration with other CRM systems
- Analytics and tracking
- User authentication and authorization
