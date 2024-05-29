import myhorse1 from '~/assets/myhorse1.jpeg';
import myhorse2 from '~/assets/myhorse2.jpeg';
import ochiLarge from '~/assets/ochi.jpeg';
import ochiPlaceholder from '~/assets/ochi.jpeg';
import Partyhouse from '~/assets/partyhouse.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';



// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Party House"
        description={<>Design and development for a Company's portfolio Website. Horse is a startup in the field of E-Cycles. &nbsp; <b>Techs used</b> :  Nodejs, MongoDB(Atlas), Express, Ejs, Cloudinary</>}
        
        
        buttonText="Live Demo"
        buttonLink="https://partyhouse.onrender.com/listings"
        model={{
          type: 'laptop',
          alt: 'Party House app',
          textures: [
            {
              srcSet: `${Partyhouse} 1280w, ${Partyhouse} 2560w`,
              placeholder: Partyhouse,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="MyHorse"
        description={<>Design and development for a Company's portfolio Website. Horse is a startup in the field of E-Cycles. &nbsp; <b>Techs used</b> :  HTML, CSS, JavaScript, BootStrap</>}
        buttonText="Live Demo"
        buttonLink="https://myhorse.me"
        model={{
          type: 'phone',
          alt: 'MyHorse website',
          textures: [
            {
              srcSet: `${myhorse2} 375w, ${myhorse2} 750w`,
              placeholder: myhorse1,
            },
            {
              srcSet: `${myhorse1} 375w, ${myhorse1} 750w`,
              placeholder: myhorse2,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Ochi Here"
        description={<>Clone of OCHI.design. 'awwwarded' by www.awwwards.com as site of the DAY with a supper intractive Interface &nbsp; <b>Techs used</b> :  React, TailWind CSS</>} 
        buttonText="Live Demo"
        buttonLink="https://ochi-here.netlify.app/"
        model={{
          type: 'laptop',
          alt: 'https://ochi-here.netlify.app/',
          textures: [
            {
              srcSet: `${ochiLarge} 800w, ${ochiLarge} 1920w`,
              placeholder: ochiPlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};

