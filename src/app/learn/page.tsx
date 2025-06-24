import {   favProgrammingLanguage,
  yearsOfExperience,
  isTypescriptAwesome,
  jsFrameworks } from '@/hooks/useBasics';

export default function LearnPage() {
  // This runs when the component mounts
  if (typeof window !== 'undefined') {
    // Import and run your basics file
    import('@/hooks/useBasics');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">TypeScript Learning Playground</h1>
      <div className="space-y-4">
        <div className=" p-4 rounded">
          <h2 className="font-semibold">Basic Types Example:</h2>
          <p className="text-sm">
            <strong>Favorite Programming Language:</strong> {favProgrammingLanguage}
            </p>
            <p className="text-sm">
            <strong>Years of Experience:</strong> {yearsOfExperience}
            </p>
            <p className="text-sm">
            <strong>Is TypeScript Awesome?</strong> {isTypescriptAwesome ? 'Yes' : 'No'}
            </p>
            <p className="text-sm">
            <strong>JavaScript Frameworks:</strong> {jsFrameworks.join(', ')}
            </p>
        </div>
        <p className="text-sm text-gray-600">
          Open browser console and check the basics.ts file!
        </p>
      </div>
    </div>
  );
}
