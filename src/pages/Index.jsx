import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const RandomPage = () => {
  const [count, setCount] = React.useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default RandomPage;