import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HackerNewsStory = ({ story }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-4">
    <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
    <p className="text-gray-600 mb-2">Upvotes: {story.score}</p>
    <Button 
      className="bg-orange-500 hover:bg-orange-600 text-white"
      onClick={() => window.open(story.url, '_blank')}
    >
      Read More
    </Button>
  </div>
);

const SkeletonLoader = () => (
  <div className="bg-white p-4 rounded-lg shadow mb-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
  </div>
);

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const top100Ids = storyIds.slice(0, 100);

        const storyPromises = top100Ids.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const fetchedStories = await Promise.all(storyPromises);
        setStories(fetchedStories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Hacker News Top 100 Stories</h1>
        
        <Input
          type="text"
          placeholder="Search stories..."
          className="mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          Array(10).fill().map((_, index) => <SkeletonLoader key={index} />)
        ) : (
          filteredStories.map(story => (
            <HackerNewsStory key={story.id} story={story} />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;