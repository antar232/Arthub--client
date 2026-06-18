import React from 'react';

const ArtistCTA = () => {
  return (
    <section className="bg-[#E67E67] py-16 px-4 text-center container mx-auto rounded-2xl mt-12 text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Are You an Artist?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of artists selling directly to collectors worldwide. 
          Set your own prices, keep more of what you earn.
        </p>
        <button className="bg-[#E5E5E5] text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-white transition-all flex items-center gap-2 mx-auto">
          Start Selling Today <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

export default ArtistCTA;