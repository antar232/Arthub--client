"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CustomNavLink = ({ to, children, onClick }) => {
    const pathname = usePathname();
    const isActive = pathname === to;
    
    const baseStyles = "relative py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5";
    const activeStyles = "text-orange-500 font-semibold";
    const inactiveStyles = "text-gray-600 hover:text-orange-500";

    return (
        <Link
            href={to}
            onClick={onClick}
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
        >
            {children}
        </Link>
    );
};

export default CustomNavLink;