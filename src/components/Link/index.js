import React from 'react';
import NextLink from 'next/link';

export default function Link({children, href, ...props}){
    return(
        <NextLink href={href} passHref>
            {/* props usada para caso tenha alguma estilização na tag */}
            <a {...props}>
                {children}
            </a>
        </NextLink>
    )
}