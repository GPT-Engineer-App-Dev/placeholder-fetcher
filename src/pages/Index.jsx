import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HackerNewsStory = ({ story }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
    <h2 className="text-xl font-semibold mb-2 text-gray-800">{story.title}</h2>
    <p className="text-gray-600 mb-2">Upvotes: {story.score}</p>
    <Button 
      className="bg-blue-500 hover:bg-blue-600 text-white"
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
  const [filter, setFilter] = useState('all');

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

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'highScore') return matchesSearch && story.score > 100;
    if (filter === 'recent') return matchesSearch && (Date.now() - story.time * 1000 < 24 * 60 * 60 * 1000);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Hacker News Top 100 Stories</h1>
        
        <div className="mb-6 flex space-x-4">
          <Input
            type="text"
            placeholder="Search stories..."
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            className={`${filter === 'all' ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            className={`${filter === 'highScore' ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
            onClick={() => setFilter('highScore')}
          >
            High Score
          </Button>
          <Button 
            className={`${filter === 'recent' ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
            onClick={() => setFilter('recent')}
          >
            Recent
          </Button>
        </div>

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