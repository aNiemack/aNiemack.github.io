import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="h-[100vh] w-[100vw] bg-stone-900">
      <pre className="text-white p-0 m-0">
          <code>
            {`
              ______                     __       __         ___  ____             _   _     
             |_   _ \`.                  [  |     [  |       |_  ||_  _|           (_) / |_   
               | | \`. \\  .--.   __   _   | |.--.  | | .---.   | |_/ /    _ .--.   __ \`| |-'  
               | |  | |/ .'\`\\ \\[  | | |  | '/'\`\\ \\| |/ /__\\\\  |  __'.   [ \`.-. | [  | | |    
              _| |_.' /| \\__. | | \\_/ |, |  \\__/ || || \\__., _| |  \\ \\_  | | | |  | | | |,   
             |______.'  '.__.'  '.__.'_/[__;.__.'[___]'.__.'|____||____|[___||__][___]\\__/                                       
            `}
          </code>
        </pre>
        <pre className="text-white p-0 m-0">
          <code>
            {`
              ______                   _                                                    
            .' ____ \\                 / |_                                                  
            | (___ \\_|  _   __  .--. \`| |-'.---.  _ .--..--.   .--.                         
             _.____\`.  [ \\ [  ]( (\`\\] | | / /__\\\\[ \`.-. .-. | ( (\`\\]                        
            | \\____) |  \\ '/ /  \`'.'. | |,| \\__., | | | | | |  \`'.'.                        
             \\______.'[\\_:  /  [\\__) )\\__/ '.__.'[___||__||__][\\__) )
                       \\__.'
            `}
          </code>
        </pre>
      <div className="grid grid-cols-2 justify-items-center">
        
        <div className="text-white">world</div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
