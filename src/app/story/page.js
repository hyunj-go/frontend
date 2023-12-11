// import Markdown from 'react-markdown'

// const Story = async () => {  
//     const resp = await fetch(`${process.env.API_URL}/api/about-us?populate=*`);
//     const aboutus = await resp.json();
//     const story = aboutus.data;
//     const storyCont = story.attributes.content;
//     const storyBg = story.attributes.background.data.attributes.url;

//     return(
//         <>
//             <div className='inner'>
//                 <div className="our-story" id="story">
//                     <div className="six columns story-text u-pull-left" data-mh="story">
//                         <h1>{story.attributes.title}</h1>
//                         <p>{(story.attributes.date).split('T')[0]}</p>
//                         <div className="definition">
//                             <Markdown>{storyCont}</Markdown>
//                         </div>
//                         <div className="line-1 animated draw-line anim-two">
//                             <svg>
//                                 <path d="M123,5029 L123,5218" transform="translate(-122.000000, -5028.000000)"></path>
//                             </svg>
//                         </div>
//                         <div className="line-2 animated draw-line anim-two">
//                             <svg>
//                                 <path d="M442.5,4757 L662.520454,4757" transform="translate(-441.000000, -4756.000000)"></path>
//                             </svg>
//                         </div>
//                     </div>
//                     <div className="six columns story-overflow u-pull-right">
//                         <div className="story-img" style={{ 'backgroundImage':`url(${storyBg})`}}></div>
//                     </div>
//                     <div className="u-cf"></div>
//                 </div>


//             </div>
//         </>
//     )
// }

// export default Story
