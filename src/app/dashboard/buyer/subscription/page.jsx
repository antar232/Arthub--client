import React from 'react';

const Subscription = () => {
    const tiers = [
        { 
            name: "Free", 
            limit: "3 paintings", 
            price: "$0", 
            description: "For hobbyists starting their journey",
            bgColor: "bg-white",
            borderColor: "border-neutral-200",
            features: ["Public Profile", "Basic Analytics", "Community Access"]
        },
        { 
            name: "Pro", 
            limit: "9 paintings", 
            price: "$9.99", 
            description: "For active artists showcasing more work",
            bgColor: "bg-violet-50",
            borderColor: "border-violet-200",
            features: ["Everything in Free", "Priority Support", "Featured Gallery Badge", "Enhanced SEO"]
        },
        { 
            name: "Premium", 
            limit: "Unlimited", 
            price: "$19.99", 
            description: "For professionals scaling their brand",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            features: ["Everything in Pro", "Unlimited Uploads", "Personal Branding", "Advanced Insights", "Custom Portfolio Domain"]
        }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-neutral-900">Choose Your Plan</h2>
                <p className="text-neutral-500 mt-2">Elevate your digital art gallery and reach more collectors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier) => (
                    <div 
                        key={tier.name} 
                        className={`${tier.bgColor} ${tier.borderColor} border p-8 rounded-3xl flex flex-col transition-all hover:shadow-2xl hover:scale-105`}
                    >
                        <h3 className="text-2xl font-bold text-neutral-900">{tier.name}</h3>
                        <p className="text-sm text-neutral-600 mb-6 h-10">{tier.description}</p>
                        
                        <div className="mb-8">
                            <span className="text-5xl font-extrabold">{tier.price}</span>
                            <span className="text-neutral-500 font-medium">/mo</span>
                        </div>

                        {/* ফিচার লিস্ট */}
                        <ul className="mb-8 space-y-4 flex-1">
                            <li className="flex items-center gap-2 font-bold text-neutral-900">
                                <span className="text-green-600">★</span> Max {tier.limit}
                            </li>
                            {tier.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                                    <span className="text-neutral-400">✓</span> {feature}
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 rounded-xl font-bold transition ${tier.price === "$0" ? "bg-neutral-200 text-neutral-600 cursor-not-allowed" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}>
                            {tier.price === "$0" ? "Current Plan" : `Get Started with ${tier.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscription;