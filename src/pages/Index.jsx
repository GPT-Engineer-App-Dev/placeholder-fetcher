import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const RandomPage = () => {
  const [count, setCount] = React.useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Random Page</h1>
        
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Click Counter</CardTitle>
            <CardDescription>See how many times you can click!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-center">{count}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={incrementCount}>Increment</Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-gray-100 mt-8">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">© 2023 Random Page. All rights reserved.</p>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RandomPage;