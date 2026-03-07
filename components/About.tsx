import React from 'react';
import { Heart, Sunrise, Smile } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Sunrise size={28} />,
      title: "A Warm Welcome",
      description: "An atmosphere where you feel seen and valued from the moment you arrive."
    },
    {
      icon: <Heart size={28} />,
      title: "A Comfortable Stay",
      description: "A peaceful environment designed for you to rest, recharge, and find tranquility."
    },
    {
      icon: <Smile size={28} />,
      title: "Happy Memories",
      description: "Meaningful experiences that stay with you long after you've checked out."
    }
  ];

  return (
    <section id="our-story" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-gold font-medium tracking-widest text-xs uppercase mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-dark mb-8 tracking-tight">
              A Legacy of Heartfelt Hospitality
            </h2>
            <div className="w-24 h-1 bg-gold/30 mx-auto rounded-full"></div>
          </div>

          {/* Story Text */}
          <div className="space-y-8 text-lg md:text-xl text-gray-medium font-light leading-relaxed text-center md:text-left">
            <p>
              At <span className="font-serif italic text-gray-dark font-medium">Dhan-Sukh</span>, our story is rooted in a 65-year tradition of open doors and open hearts. 
              The name itself reflects our deepest values: <span className="text-gold font-medium">Dhan (Wealth)</span> and <span className="text-gold font-medium">Sukh (Happiness)</span>.
            </p>
            <p>
              To us, true wealth is not measured by what we possess, but by the abundance of happiness we can share with others. 
              This journey began with our grandparents and parents, who for over six decades hosted countless guests in their homes—always with a warm smile and at no cost.
            </p>
            <p>
              Today, we are proud to carry this legacy forward. For us, hospitality isn't just a service; it is in our blood. 
              We invite you to be a part of our continuing story.
            </p>
          </div>

          {/* Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {values.map((value, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-gray-bg border border-transparent hover:border-gold/20 transition-all duration-500 hover:shadow-airbnb">
                <div className="text-gold mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                  {value.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-dark mb-3">{value.title}</h4>
                <p className="text-gray-medium text-sm leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Signature Closing */}
          <div className="mt-20 text-center">
            <div className="inline-block p-10 rounded-[3rem] bg-gold-light/30 border border-gold/10 backdrop-blur-sm">
                <p className="font-serif italic text-2xl text-gray-dark mb-4">
                  "Service with a smile is a gift from our heart to yours."
                </p>
                <div className="flex items-center justify-center gap-2 text-gold">
                  <Heart size={16} fill="currentColor" />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">The Dhan-Sukh Family</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;