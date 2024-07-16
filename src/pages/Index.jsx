import React from 'react';
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="mb-4">This is a basic homepage created with React and styled with Tailwind CSS (via Shadcn).</p>
      <Button variant="default">Get Started</Button>
    </div>
  );
};

export default HomePage;